#!/bin/bash
# wakaf.ai deployment script
# Run this from ~/github/wakaf.ai

set -e

echo "🚀 Deploying wakaf.ai..."

# Check if we're in the right directory
if [ ! -d "homepage" ]; then
    echo "❌ Error: Run this from ~/github/wakaf.ai"
    exit 1
fi

# Deploy Pages (homepage)
echo "📄 Deploying Pages..."
npx wrangler pages deploy homepage --project-name wakaf-ai --branch main

# Add custom domain (will prompt if fails)
echo "🔗 Adding custom domain wakaf.ai..."
npx wrangler pages domain add wakaf-ai wakaf.ai || echo "⚠️  Domain add failed, do manually"

echo "✅ Done!"
echo ""
echo "Next steps:"
echo "1. Check https://wakaf-ai.pages.dev"
echo "2. Add custom domain in dashboard: https://dash.cloudflare.com"
echo "3. Deploy Workers: cd workers/ai-gateway && npx wrangler deploy"
