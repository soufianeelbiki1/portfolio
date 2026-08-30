# Engineering & Data Portfolio

This repository is the public presentation layer for the `soufianeelbiki1` portfolio.

It presents a small set of deep systems through different hiring lenses instead of creating unrelated tutorial projects for every role: **Payments & Distributed Systems, Data Analytics & Decision Science, Applied AI/ML, and Full-Stack Product Engineering**.

## Portfolio map

- **AtlasPay** — payments, backend, distributed systems, reliability, and the first CI-tested payments analytics warehouse marts
- **AtlasRAG** — retrieval, durable ingestion, RAG evaluation, provider usage/cost/latency accounting, AI/LLM engineering
- **ForecastLab** — applied ML policy, inference contracts, explainability, and held-out evaluation infrastructure
- **Nexus** — AtlasPay operator/control-plane experience with fail-closed authenticated API consumption and explicit unavailable-data semantics

## Data hiring track

The implemented foundation is inside AtlasPay: PostgreSQL marts for payment cohorts/current status composition, lifecycle-operation timing, outbox reliability, and ledger debit-credit controls. The next portfolio projects are intentionally decision-oriented rather than generic notebooks:

1. **Payments Analytics Warehouse** — extend AtlasPay with durable authorization/network facts, decline taxonomy, issuer performance, timeout/reversal cohorts, synthetic demo data, and an executive operations dashboard.
2. **Product Experimentation Lab** — assignment integrity, SRM checks, funnel/retention cohorts, CUPED, bootstrap confidence intervals, guardrails, multiple-testing caveats, and a reproducible ship/no-ship memo.
3. **Retail Decision Intelligence** — star schema across orders/customers/products/inventory/promotions/returns/suppliers, margin/RFM/cohort analysis, demand forecasting with time validation, and reorder scenarios.
4. **Risk & Fraud Monitoring** — leakage-safe temporal validation, precision-recall and expected-cost thresholding, calibration, drift/PSI monitoring, explainability, and analyst investigation queues.
5. **Public Data Operations** — real open-data ingestion with provenance, incremental loads, schema-change checks, reproducible SQL/Python reporting, and time-series/geospatial analysis where useful.

Every analytics project should include a business question, source provenance, data dictionary, analytical model, non-trivial SQL, Python/statistics, data-quality checks, reproducible pipeline, decision-facing dashboard/report, and explicit limitations. Synthetic data must be labeled synthetic and quantified findings must come from reproducible data.

## Presentation rules

- Show implemented work as implemented and roadmap work as roadmap.
- Do not publish fake scale, traffic, latency, accuracy, business impact, or production claims.
- Do not publish a live-demo link until the deployment is verified.
- Define analytical grain, currency/time semantics, statistical assumptions, and unavailable data explicitly.
- Explain architecture, failure modes, testing, trade-offs, operational behavior, and decision implications.
- Keep project status synchronized with the underlying repositories and CI.

The site remains dependency-light so content, accessibility, evidence, and truthful case-study presentation stay more important than frontend framework complexity.
