export interface Env {
  CACHE: KVNamespace;
  RATE_LIMITER: DurableObjectNamespace;
  KIMI_API_KEY: string;
  OPENROUTER_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  OPENAI_API_KEY: string;
  VPS_IP: string;
}

interface LLMRequest {
  model: string;
  messages: Array<{role: string; content: string}>;
  temperature?: number;
  max_tokens?: number;
}

interface LLMResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {role: string; content: string};
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Provider configurations
const PROVIDERS = {
  kimi: {
    url: 'https://api.kimi.com/code/v1/chat/completions',
    authHeader: (key: string) => `Bearer ${key}`,
    models: ['kimi-coding', 'kimi-chat']
  },
  openrouter: {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    authHeader: (key: string) => `Bearer ${key}`,
    models: ['anthropic/claude-3.5-sonnet', 'openai/gpt-4o', 'meta-llama/llama-3.1-70b']
  },
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    authHeader: (key: string) => `x-api-key: ${key}`,
    models: ['claude-3-5-sonnet-20241022']
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    authHeader: (key: string) => `Bearer ${key}`,
    models: ['gpt-4o', 'gpt-4o-mini']
  }
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    // Only accept POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Auth check
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimiter = env.RATE_LIMITER.get(env.RATE_LIMITER.idFromName(clientIP));
    const rateCheck = await rateLimiter.fetch(request.url);
    if (rateCheck.status === 429) {
      return new Response('Rate limited', { status: 429 });
    }

    // Route based on subdomain
    const hostname = url.hostname;
    
    // wakaf.ai → Cloudflare Pages (homepage)
    if (hostname === 'wakaf.ai' || hostname === 'www.wakaf.ai') {
      return fetch(request);
    }
    
    // api.wakaf.ai → VPS backend
    if (hostname === 'api.wakaf.ai') {
      return routeToVPS(request, env);
    }
    
    // grafana.wakaf.ai → VPS monitoring
    if (hostname === 'grafana.wakaf.ai') {
      return routeToVPS(request, env, 3000);
    }
    
    // Parse request
    const body: LLMRequest = await request.json();
    
    // Generate cache key
    const cacheKey = await generateCacheKey(body);
    
    // Check cache
    const cached = await env.CACHE.get(cacheKey);
    if (cached) {
      const cachedResponse = JSON.parse(cached) as LLMResponse;
      return jsonResponse(cachedResponse, { 'X-Cache': 'HIT' });
    }

    // Try providers in order
    let lastError: Error | null = null;
    const providers = ['kimi', 'openrouter', 'anthropic', 'openai'] as const;
    
    for (const providerName of providers) {
      try {
        const response = await callProvider(providerName, body, env);
        
        // Cache successful response
        await env.CACHE.put(cacheKey, JSON.stringify(response), { expirationTtl: 3600 });
        
        return jsonResponse(response, { 'X-Cache': 'MISS', 'X-Provider': providerName });
      } catch (error) {
        lastError = error as Error;
        console.error(`Provider ${providerName} failed:`, error);
        continue;
      }
    }

    // All providers failed
    return new Response(
      JSON.stringify({ error: 'All providers failed', detail: lastError?.message }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

async function routeToVPS(request: Request, env: Env, port: number = 8080): Promise<Response> {
  const vpsIP = env.VPS_IP || '100.101.211.85';
  const targetUrl = new URL(request.url);
  targetUrl.hostname = vpsIP;
  targetUrl.port = port.toString();
  
  const modifiedRequest = new Request(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body
  });
  
  return fetch(modifiedRequest);
}

async function generateCacheKey(request: LLMRequest): Promise<string> {
  const keyData = JSON.stringify({
    model: request.model,
    messages: request.messages,
    temperature: request.temperature,
    max_tokens: request.max_tokens
  });
  
  const encoder = new TextEncoder();
  const data = encoder.encode(keyData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function callProvider(
  provider: keyof typeof PROVIDERS,
  request: LLMRequest,
  env: Env
): Promise<LLMResponse> {
  const config = PROVIDERS[provider];
  
  let apiKey: string = '';
  switch (provider) {
    case 'kimi':
      apiKey = env.KIMI_API_KEY;
      break;
    case 'openrouter':
      apiKey = env.OPENROUTER_API_KEY;
      break;
    case 'anthropic':
      apiKey = env.ANTHROPIC_API_KEY;
      break;
    case 'openai':
      apiKey = env.OPENAI_API_KEY;
      break;
  }

  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.authHeader(apiKey),
      'HTTP-Referer': 'https://wakaf.ai',
      'X-Title': 'wakaf.ai'
    },
    body: JSON.stringify({
      model: request.model || config.models[0],
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.max_tokens || 1000
    })
  });

  if (!response.ok) {
    throw new Error(`Provider ${provider} returned ${response.status}`);
  }

  return await response.json() as LLMResponse;
}

function jsonResponse(data: unknown, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...extraHeaders
    }
  });
}

// Rate limiter Durable Object
export class RateLimiter {
  private requests: number[] = [];
  
  async fetch(request: Request): Promise<Response> {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window
    
    // Remove old requests
    this.requests = this.requests.filter(time => time > windowStart);
    
    // Check limit (100 requests per minute)
    if (this.requests.length >= 100) {
      return new Response('Rate limited', { status: 429 });
    }
    
    // Add current request
    this.requests.push(now);
    
    return new Response('OK', { status: 200 });
  }
}
