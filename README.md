# Engineering & Data Portfolio

A small index of the projects in this GitHub account. The repositories cover payment systems, operational tooling, analytics, experimentation, retail planning, RAG engineering and ML evaluation.

## Projects

| Project | Area | Main pieces |
|---|---|---|
| **AtlasPay** | Payments / backend | ISO 8583 + EMV, routing, timeout/reversal handling, PostgreSQL idempotency, double-entry ledger, transactional outbox, reconciliation, observability |
| **Nexus** | Full stack / operations | Next.js + TypeScript, AtlasPay operational API, runtime validation, degraded/unavailable states, transaction and reconciliation views |
| **AtlasAnalytics** | Payments analytics | DuckDB warehouse, payment/authorization grains, issuer and decline analysis, rolling baselines, risk thresholds, calibration, PSI |
| **ExperimentLab** | Product experimentation | SRM, treatment effects, CUPED, bootstrap intervals, power/MDE planning, ship/hold decision rules |
| **RetailIntel** | Retail analytics | margin and returns, supplier reliability, RFM/cohorts, SKU-day demand, forecast baseline, safety stock and reorder recommendations |
| **AtlasRAG** | RAG / backend | durable ingestion, citations, abstention, rank fusion, reranking interface, regression evaluation, provider usage accounting |
| **ForecastLab** | Applied ML | passport-photo rules, estimator interfaces, signal API, synthetic regression data, held-out evaluation tooling |

## Notes

The analytics repositories use generated data so the pipelines and tests are reproducible. AtlasPay is a payment-system simulation rather than a live processor. ForecastLab currently evaluates signals rather than claiming a finished raw-image model. Details and limitations live in each project README.

The website in this repository provides a visual version of the same project list.
