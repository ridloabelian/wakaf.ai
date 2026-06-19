# wakaf.ai — AI-Powered Waqf Management Platform

> **Domain:** [wakaf.ai](https://wakaf.ai)  
> **Tagline:** *Intelligent waqf orchestration for the modern world*  
> **Architecture:** Cloudflare Workers (Edge) + VPS (Core) + LSP BWI Certified

---

## 📋 Overview

wakaf.ai is a **production-grade AI platform** for managing Islamic endowment (waqf) operations. Built on a **hybrid edge-core architecture** that combines the global reach of **Cloudflare Workers** with the persistent compute of a **single VPS**.

Unlike the original [WAQF Agentic Workflow](https://github.com/ridloabelian/waqf-agentic-workflow) which required 6 on-premise nodes, wakaf.ai is designed for **reliability, affordability, and global accessibility** — running entirely on cloud infrastructure with a target monthly cost under **Rp 1.000.000**.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         wakaf.ai PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    CLOUDFLARE EDGE (Global)                      │    │
│  │                                                                  │    │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │    │
│  │   │ 9Router     │  │ AI Gateway  │  │ WAQF Queue Engine   │   │    │
│  │   │ (API Router)│  │ (LLM Proxy) │  │ (Durable Objects)   │   │    │
│  │   │             │  │             │  │                     │   │    │
│  │   │ • Routing   │  │ • Caching   │  │ • SS.001-010        │   │    │
│  │   │ • Load Bal  │  │ • Fallback  │  │ • Priority Queue    │   │    │
│  │   │ • Auth      │  │ • Analytics │  │ • Retry Logic       │   │    │
│  │   └─────────────┘  └─────────────┘  └─────────────────────┘   │    │
│  │                                                                  │    │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │    │
│  │   │ Auth/Edge   │  │ Rate Limit  │  │ Cache (KV + R2)     │   │    │
│  │   │ (Access)    │  │ (WAF)       │  │                     │   │    │
│  │   └─────────────┘  └─────────────┘  └─────────────────────┘   │    │
│  │                                                                  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                              │                                          │
│                              ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    VPS CORE (Jakarta)                            │    │
│  │                    Tencent Cloud — 2 vCPU / 8GB RAM              │    │
│  │                                                                  │    │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │    │
│  │   │   Odoo      │  │    N8N      │  │ Hermes Core Agent   │   │    │
│  │   │  (ERP)      │  │ (Workflow)  │  │ (SS.001-010)        │   │    │
│  │   │             │  │             │  │                     │   │    │
│  │   │ • Waqf DB   │  │ • Automate  │  │ • Manager Agent     │   │    │
│  │   │ • Accounting│  │ • Webhooks  │  │ • Task Dispatch     │   │    │
│  │   │ • Reporting │  │ • API Calls │  │ • State Machine     │   │    │
│  │   └─────────────┘  └─────────────┘  └─────────────────────┘   │    │
│  │                                                                  │    │
│  │   ┌─────────────┐  ┌─────────────┐                            │    │
│  │   │ PostgreSQL  │  │  Grafana    │                            │    │
│  │   │  (Database) │  │ (Dashboard) │                            │    │
│  │   └─────────────┘  └─────────────┘                            │    │
│  │                                                                  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 LSP BWI Certification Mapping

All 10 LSP BWI (Badan Wakaf Indonesia) certification schemes are implemented as **AI agent workflows**:

| Scheme | Code | Domain | Agent | Status |
|--------|------|--------|-------|--------|
| Perencanaan Pengelolaan & Pengembangan | SS.001 | Investment Planning | ✅ Active | |
| Pelaksanaan Pengelolaan & Pengembangan | SS.002 | Asset Management | ✅ Active | |
| Perencanaan Penerimaan Harta Benda | SS.003 | Donor Screening | ✅ Active | |
| Pelaksanaan Penerimaan Harta Benda | SS.004 | Asset Verification | ✅ Active | |
| Perencanaan Penjagaan Harta Benda | SS.005 | Security Planning | ✅ Active | |
| Pelaksanaan Penjagaan Harta Benda | SS.006 | Monitoring | ✅ Active | |
| Perencanaan Penyaluran Manfaat | SS.007 | Distribution Planning | ✅ Active | |
| Pelaksanaan Penyaluran Manfaat | SS.008 | Benefit Distribution | ✅ Active | |
| Penyajian Informasi Kinerja Keuangan | SS.009 | Financial Analytics | ✅ Active | |
| Penyusunan Laporan Keuangan | SS.010 | Report Generation | ✅ Active | |

---

## 🖥️ Infrastructure Spec

| Layer | Provider | Spec | Cost/Bulan |
|-------|----------|------|------------|
| **Edge** | Cloudflare Workers | Paid Plan (10M requests) | $5 (~Rp 75.000) |
| **Core** | Tencent Cloud (Jakarta) | 2 vCPU, 8GB RAM, 100GB SSD | Rp 185.000 |
| **Storage** | Cloudflare R2 | 1 GB (dokumen) | Free tier |
| **Database** | Cloudflare D1 | 500K rows/day | Free tier |
| **AI API** | OpenRouter | Pay-per-use | ~$30-50 (~Rp 450-750K) |
| **Domain** | Cloudflare Registrar | wakaf.ai | ~$12/tahun |
| **TOTAL** | | | **~Rp 710.000 - 1.010.000** |

---

## 🚀 Quick Start

### Prerequisites
- Cloudflare account (Workers Paid enabled)
- Tencent Cloud account (or VPS provider)
- GitHub account
- OpenRouter API key

### 1. Clone Repository
```bash
git clone https://github.com/ridloabelian/wakaf-ai.git
cd wakaf-ai
```

### 2. Setup Cloudflare Workers
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy all Workers
wrangler deploy --config workers/ai-gateway/wrangler.toml
wrangler deploy --config workers/queue/wrangler.toml
wrangler deploy --config workers/auth/wrangler.toml
```

### 3. Setup VPS (Ubuntu 24.04)
```bash
# SSH to VPS
ssh root@<vps-ip>

# Install Docker
apt update && apt install -y docker.io docker-compose

# Clone and run
git clone https://github.com/ridloabelian/wakaf-ai.git
cd wakaf-ai

# Copy environment template
cp .env.example .env
# Edit .env with your API keys

# Start services
docker-compose up -d
```

### 4. Configure Domain
1. Point `wakaf.ai` to Cloudflare
2. Add DNS records:
   - `A` record → VPS IP (for core API)
   - `CNAME` record → Workers subdomain (for edge)
3. Enable Cloudflare proxy (orange cloud)

---

## 📁 Repository Structure

```
wakaf-ai/
├── README.md                          # This file
├── PRD.md                             # Product Requirements Document
├── docs/
│   ├── architecture.md                # Detailed architecture
│   ├── lsp-bwi-mapping.md            # LSP BWI scheme details
│   ├── deployment-guide.md           # Step-by-step deployment
│   └── api-reference.md              # API documentation
├── workers/                           # Cloudflare Workers
│   ├── ai-gateway/                    # LLM proxy with caching
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── wrangler.toml
│   │   └── package.json
│   ├── queue/                         # Durable Objects queue
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── wrangler.toml
│   │   └── package.json
│   ├── auth/                          # Edge authentication
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── wrangler.toml
│   │   └── package.json
│   └── shared/                        # Shared utilities
│       ├── types.ts
│       └── constants.ts
├── vps/                               # VPS Core Services
│   ├── docker-compose.yml             # Main orchestration
│   ├── docker-compose.prod.yml        # Production override
│   ├── odoo/                          # Odoo ERP config
│   ├── n8n/                           # N8N workflow config
│   ├── hermes/                        # Hermes agent config
│   ├── postgres/                      # PostgreSQL config
│   └── grafana/                       # Grafana dashboards
├── scripts/                           # Automation scripts
│   ├── setup-vps.sh                   # VPS setup
│   ├── deploy-workers.sh              # Deploy all Workers
│   ├── health-check.sh                # Health monitoring
│   └── backup.sh                      # Backup script
├── .github/
│   └── workflows/                     # CI/CD pipelines
│       ├── validate.yml
│       ├── deploy-vps.yml
│       ├── deploy-workers.yml
│       └── health-check.yml
├── .env.example                       # Environment template
└── .gitignore
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Edge | Cloudflare Workers | Serverless compute |
| Edge | Durable Objects | Persistent queue |
| Edge | KV | Configuration cache |
| Edge | R2 | Document storage |
| Edge | D1 | Metadata database |
| Core | Docker Compose | Container orchestration |
| Core | Odoo 17 | ERP system |
| Core | N8N | Workflow automation |
| Core | PostgreSQL 16 | Primary database |
| Core | Grafana | Monitoring dashboard |
| AI | OpenRouter | Multi-model LLM API |
| AI | Claude (Anthropic) | Primary reasoning model |
| AI | GPT-4o (OpenAI) | Fallback model |
| AI | Llama 3.1 (Meta) | Cost-effective model |
| Orchestration | Hermes Agent | Multi-agent framework |
| Routing | 9Router | API load balancer |

---

## 📜 License

MIT License — Wakaf Produktif Initiative

---

> **Built by:** Ridlo Abelian  
> **Organization:** Amal Produktif  
> **Email:** admin@amalproduktif.com  
> **Domain:** [wakaf.ai](https://wakaf.ai)  
> **Related:** [WAQF Agentic Workflow](https://github.com/ridloabelian/waqf-agentic-workflow) (on-premise version)
