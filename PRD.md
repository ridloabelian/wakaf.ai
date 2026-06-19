---
name: wakaf-ai-prd
author: Ridlo Abelian
organization: Amal Produktif
date: 2026-06-19
version: 1.0.0
status: Draft
---

# wakaf.ai — Product Requirements Document (PRD)

## 1. Executive Summary

### 1.1 Product Vision
wakaf.ai adalah platform AI terintegrasi untuk pengelolaan wakaf produktif berbasis sertifikasi LSP BWI (Badan Wakaf Indonesia). Platform ini menggabungkan teknologi edge computing (Cloudflare Workers) dengan VPS core untuk menghasilkan sistem yang affordable, reliable, dan globally accessible.

### 1.2 Problem Statement
- **On-premise nodes rentan** — mati listrik = semua sistem down
- **Kompleksitas tinggi** — 6 node hardware = maintenance berat
- **Biaya tidak terduga** — listrik, hardware replacement, cooling
- **Skalabilitas terbatas** — upgrade hardware = beli device baru
- **Akses global sulit** — Tailscale mesh = latency tinggi untuk user internasional

### 1.3 Solution
- **Hybrid Edge-Core** — Cloudflare Workers untuk edge + VPS untuk core
- **Single VPS** — 1 server cloud yang selalu online
- **API-based AI** — No local LLM, pakai OpenRouter/Anthropic
- **Global CDN** — Cloudflare edge = akses cepat dari mana saja
- **Cost predictable** — ~Rp 1 juta/bulan fixed cost

---

## 2. Product Objectives

### 2.1 Business Objectives
| Objective | KPI | Target |
|-----------|-----|--------|
| Reduce infrastructure cost | Monthly cost | < Rp 1.000.000 |
| Improve uptime | Availability | > 99.5% |
| Global accessibility | Latency | < 200ms worldwide |
| LSP BWI compliance | Certification coverage | 10/10 schemes |

### 2.2 Technical Objectives
| Objective | Metric | Target |
|-----------|--------|--------|
| Edge offload | % requests handled by Workers | > 80% |
| API response time | P95 latency | < 500ms |
| Queue reliability | Message delivery | > 99.9% |
| Backup frequency | Automated backup | Every 6 hours |

---

## 3. User Personas

### 3.1 Nadzir (Waqf Manager)
- **Role:** Mengelola aset wakaf harian
- **Needs:** Dashboard kinerja, laporan keuangan, monitoring aset
- **Pain Points:** Susah generate laporan, tidak real-time
- **Usage:** Odoo ERP, Grafana dashboard

### 3.2 Wakif (Donor)
- **Role:** Mewakafkan harta benda
- **Needs:** Tracking harta wakaf, laporan penyaluran
- **Pain Points:** Tidak tahu harta wakafnya digunakan untuk apa
- **Usage:** Web portal, chatbot

### 3.3 Asesi (Certification Candidate)
- **Role:** Mengikuti sertifikasi LSP BWI
- **Needs:** Simulasi ujian, materi pembelajaran, evaluasi
- **Pain Points:** Tidak ada platform latihan interaktif
- **Usage:** AI tutor, quiz generator

### 3.4 Administrator IT
- **Role:** Maintain infrastruktur
- **Needs:** Monitoring, alerting, backup, deployment mudah
- **Pain Points:** 6 node on-premise = maintenance nightmare
- **Usage:** GitHub Actions, Grafana, logs

---

## 4. Functional Requirements

### 4.1 Core Modules (LSP BWI Schemes)

#### SS.001 — Perencanaan Pengelolaan & Pengembangan
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS001-1 | Analisis kelayakan investasi aset wakaf | High | Planned |
| SS001-2 | Perencanaan pengembangan aset (properti, saham, reksa dana) | High | Planned |
| SS001-3 | Simulasi ROI dengan AI | Medium | Planned |
| SS001-4 | Risk assessment otomatis | Medium | Planned |

#### SS.002 — Pelaksanaan Pengelolaan & Pengembangan
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS002-1 | Monitoring real-time aset wakaf | High | Planned |
| SS002-2 | Maintenance scheduling | Medium | Planned |
| SS002-3 | Performance tracking & reporting | High | Planned |
| SS002-4 | Optimasi portfolio dengan AI | Medium | Planned |

#### SS.003 — Perencanaan Penerimaan Harta Benda
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS003-1 | Screening calon wakif (KYC) | High | Planned |
| SS003-2 | Due diligence harta benda | High | Planned |
| SS003-3 | Legal compliance check | High | Planned |
| SS003-4 | Perencanaan proses penerimaan | Medium | Planned |

#### SS.004 — Pelaksanaan Penerimaan Harta Benda
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS004-1 | Verifikasi fisik & legal harta | High | Planned |
| SS004-2 | Registrasi database wakaf | High | Planned |
| SS004-3 | Dokumentasi penerimaan | Medium | Planned |
| SS004-4 | Sertifikat & legalisasi | Medium | Planned |

#### SS.005 — Perencanaan Penjagaan Harta Benda
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS005-1 | Perencanaan sistem keamanan | Medium | Planned |
| SS005-2 | Risk assessment aset | Medium | Planned |
| SS005-3 | Insurance planning | Low | Planned |
| SS005-4 | Compliance audit planning | Medium | Planned |

#### SS.006 — Pelaksanaan Penjagaan Harta Benda
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS006-1 | Real-time monitoring keamanan | Medium | Planned |
| SS006-2 | Maintenance rutin | Medium | Planned |
| SS006-3 | Compliance audit execution | Medium | Planned |
| SS006-4 | Incident response | High | Planned |

#### SS.007 — Perencanaan Penyaluran Manfaat
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS007-1 | Perencanaan penyaluran manfaat | High | Planned |
| SS007-2 | Beneficiary screening | High | Planned |
| SS007-3 | Impact assessment | Medium | Planned |
| SS007-4 | Distribution strategy | Medium | Planned |

#### SS.008 — Pelaksanaan Penyaluran Manfaat
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS008-1 | Distribusi manfaat | High | Planned |
| SS008-2 | Monitoring penerima manfaat | High | Planned |
| SS008-3 | Feedback collection | Medium | Planned |
| SS008-4 | Reporting penyaluran | High | Planned |

#### SS.009 — Penyajian Informasi Kinerja Keuangan
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS009-1 | Analisis kinerja keuangan real-time | High | Planned |
| SS009-2 | Dashboard interaktif | High | Planned |
| SS009-3 | Performance metrics | High | Planned |
| SS009-4 | Trend analysis dengan AI | Medium | Planned |

#### SS.010 — Penyusunan Laporan Keuangan
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| SS010-1 | Generasi laporan otomatis | High | Planned |
| SS010-2 | Audit trail | High | Planned |
| SS010-3 | Compliance reporting | High | Planned |
| SS010-4 | Financial statement preparation | High | Planned |

### 4.2 Platform Features

#### 4.2.1 AI Gateway
| ID | Requirement | Priority |
|----|-------------|----------|
| AG-1 | Proxy ke multiple LLM providers (OpenRouter, Anthropic, OpenAI) | High |
| AG-2 | Response caching untuk cost reduction | High |
| AG-3 | Automatic fallback jika provider down | High |
| AG-4 | Rate limiting per user/API key | High |
| AG-5 | Usage analytics & cost tracking | Medium |
| AG-6 | Model selection berdasarkan task complexity | Medium |

#### 4.2.2 Queue Engine
| ID | Requirement | Priority |
|----|-------------|----------|
| QE-1 | Priority queue per LSP BWI scheme | High |
| QE-2 | Retry logic dengan exponential backoff | High |
| QE-3 | Dead letter queue untuk failed tasks | High |
| QE-4 | Queue monitoring & alerting | Medium |
| QE-5 | Scheduled/delayed tasks | Medium |

#### 4.2.3 Authentication & Security
| ID | Requirement | Priority |
|----|-------------|----------|
| AUTH-1 | JWT-based authentication | High |
| AUTH-2 | Role-based access control (RBAC) | High |
| AUTH-3 | API key management | High |
| AUTH-4 | Audit log semua actions | High |
| AUTH-5 | DDoS protection via Cloudflare | High |

---

## 5. Non-Functional Requirements

### 5.1 Performance
| Requirement | Target |
|-------------|--------|
| API response time (P95) | < 500ms |
| Edge cache hit ratio | > 80% |
| Queue processing latency | < 5s |
| Dashboard load time | < 2s |

### 5.2 Reliability
| Requirement | Target |
|-------------|--------|
| Uptime SLA | > 99.5% |
| Data backup frequency | Every 6 hours |
| Recovery time objective (RTO) | < 4 hours |
| Recovery point objective (RPO) | < 6 hours |

### 5.3 Scalability
| Requirement | Target |
|-------------|--------|
| Concurrent users | 100+ |
| API requests/day | 100,000+ |
| Queue messages/day | 10,000+ |
| Storage growth | 10GB/month |

### 5.4 Security
| Requirement | Target |
|-------------|--------|
| Data encryption at rest | AES-256 |
| Data encryption in transit | TLS 1.3 |
| API authentication | JWT + API key |
| Audit retention | 1 year |

---

## 6. Architecture

### 6.1 Edge Layer (Cloudflare Workers)
```
┌─────────────────────────────────────────────────┐
│              CLOUDFLARE EDGE                      │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ 9Router     │  │ AI Gateway              │  │
│  │ (API Router)│  │ • OpenRouter proxy      │  │
│  │ • Routing   │  │ • Response caching      │  │
│  │ • Load bal  │  │ • Fallback logic        │  │
│  │ • Auth      │  │ • Cost analytics        │  │
│  └─────────────┘  └─────────────────────────┘  │
│  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Queue Engine│  │ Auth/Edge               │  │
│  │ • Durable   │  │ • JWT validation        │  │
│  │   Objects   │  │ • Rate limiting         │  │
│  │ • Priority  │  │ • WAF rules             │  │
│  │   queue     │  │ • Bot detection         │  │
│  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 6.2 Core Layer (VPS)
```
┌─────────────────────────────────────────────────┐
│              VPS CORE (Tencent)                 │
│              2 vCPU / 8GB RAM / 100GB            │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌────────┐ │
│  │ Odoo 17     │  │ N8N         │  │ Hermes │ │
│  │ • ERP       │  │ • Workflow  │  │ • Core │ │
│  │ • Waqf DB   │  │ • Webhooks  │  │ Agent  │ │
│  │ • Accounting│  │ • API calls │  │        │ │
│  └─────────────┘  └─────────────┘  └────────┘ │
│  ┌─────────────┐  ┌─────────────┐               │
│  │ PostgreSQL  │  │ Grafana     │               │
│  │ 16          │  │ • Dashboard │               │
│  └─────────────┘  └─────────────┘               │
└─────────────────────────────────────────────────┘
```

### 6.3 Data Flow
```
User Request → Cloudflare DNS → Workers (Edge)
                   │
                   ├── Auth check (KV)
                   ├── Rate limit (WAF)
                   └── Route to:
                       ├── AI Gateway (LLM API)
                       ├── Queue Engine (async tasks)
                       └── VPS Core (Odoo/N8N/Hermes)
                              │
                              ├── PostgreSQL (data)
                              ├── R2 (documents)
                              └── D1 (metadata)
```

---

## 7. Infrastructure

### 7.1 Resource Allocation (VPS 2 vCPU)
| Service | CPU | RAM | Priority |
|---------|-----|-----|----------|
| PostgreSQL | 0.5 vCPU | 1.5 GB | High |
| Odoo | 0.5 vCPU | 1.5 GB | High |
| N8N | 0.5 vCPU | 1 GB | Medium |
| Hermes Core | 0.25 vCPU | 2 GB | High |
| Grafana | 0.25 vCPU | 0.5 GB | Low |
| System | — | 1.5 GB | — |
| **Total** | **2 vCPU** | **8 GB** | |

### 7.2 Cloudflare Workers Limits
| Resource | Limit | Usage |
|----------|-------|-------|
| Requests/month | 10M | ~500K (5%) |
| CPU time/request | 50ms | ~30ms |
| Durable Objects | 100K | ~1K |
| KV reads/day | 100K | ~50K |
| R2 storage | 1GB | ~500MB |
| D1 rows/day | 500K | ~10K |

---

## 8. Development Roadmap

### Phase 1: MVP (Month 1-2)
- [ ] Setup Cloudflare Workers (AI Gateway, Auth)
- [ ] Deploy VPS (Odoo, PostgreSQL, N8N)
- [ ] Implement SS.009 + SS.010 (Keuangan)
- [ ] Basic dashboard (Grafana)
- [ ] Domain setup (wakaf.ai)

### Phase 2: Core Features (Month 3-4)
- [ ] Implement SS.001 + SS.002 (Pengelolaan)
- [ ] Implement SS.003 + SS.004 (Penerimaan)
- [ ] Queue Engine (Durable Objects)
- [ ] Advanced caching
- [ ] Mobile-responsive UI

### Phase 3: Full LSP BWI (Month 5-6)
- [ ] Implement SS.005 + SS.006 (Penjagaan)
- [ ] Implement SS.007 + SS.008 (Penyaluran)
- [ ] AI Tutor untuk asesi
- [ ] Laporan otomatis (SS.010)
- [ ] Integration testing

### Phase 4: Scale & Optimize (Month 7+)
- [ ] Performance optimization
- [ ] Multi-tenant support
- [ ] API marketplace
- [ ] Community features
- [ ] Internationalization

---

## 9. Success Metrics

### 9.1 Technical Metrics
| Metric | Baseline | Target (6 months) |
|--------|----------|-------------------|
| Uptime | — | 99.5% |
| API latency (P95) | — | < 500ms |
| Edge cache hit | — | > 80% |
| Error rate | — | < 0.1% |
| Backup success | — | 100% |

### 9.2 Business Metrics
| Metric | Baseline | Target (6 months) |
|--------|----------|-------------------|
| Monthly cost | — | < Rp 1.000.000 |
| Active users | 0 | 50+ |
| Waqf assets managed | 0 | 100+ |
| LSP BWI asesi | 0 | 20+ |
| API requests/day | 0 | 10,000+ |

---

## 10. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| VPS downtime | High | Medium | Backup VPS, automated failover |
| API cost spike | Medium | High | Caching, rate limits, budget alerts |
| Cloudflare Workers limits | Medium | Low | Monitor usage, upgrade plan |
| Data breach | High | Low | Encryption, audit logs, RBAC |
| LSP BWI scheme changes | Medium | Low | Modular architecture, easy update |
| Vendor lock-in (Tencent) | Medium | Medium | Docker-based, portable configs |

---

## 11. Appendices

### Appendix A: Glossary
- **Waqf:** Islamic endowment (harta yang didedikasikan untuk kepentingan umum)
- **Nadzir:** Pengelola wakaf
- **Wakif:** Pemberi harta wakaf
- **LSP BWI:** Lembaga Sertifikasi Profesi Badan Wakaf Indonesia
- **SS.001-010:** Skema sertifikasi LSP BWI

### Appendix B: References
- [LSP BWI Skema Sertifikasi](https://www.lspbwi.com/skema.php)
- [WAQF Agentic Workflow (On-premise)](https://github.com/ridloabelian/waqf-agentic-workflow)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [OpenRouter API Documentation](https://openrouter.ai/docs)

### Appendix C: Team
| Role | Name | Contact |
|------|------|---------|
| Product Owner | Ridlo Abelian | admin@amalproduktif.com |
| Lead Developer | — | — |
| AI Engineer | — | — |
| DevOps | — | — |

---

> **Document Version:** 1.0.0  
> **Last Updated:** 2026-06-19  
> **Status:** Draft — Awaiting Review  
> **Next Review Date:** 2026-07-19
