# Engineering project site

Public project hub for Soufiane Elbiki's engineering repositories.

Live site: https://soufiane-portfolio-delta.vercel.app

The site focuses on payment systems, operational tooling, analytics, experimentation, retail planning, retrieval systems and ML evaluation. Public browser pages make deterministic project scenarios viewable without local setup.

## Browser demos

- AtlasPay + Nexus integrated-system walkthrough: `/demos/atlaspay-nexus.html`
- AtlasAnalytics risk threshold evaluation: `/demos/atlasanalytics-risk.html`
- ExperimentLab experiment decision report: `/demos/experimentlab.html`
- RetailIntel inventory decision dashboard: `/demos/retailintel.html`
- AtlasRAG regression evaluation: `/demos/atlasrag.html`
- ForecastLab compliance policy evaluation: `/demos/forecastlab.html`

## Project repositories

- AtlasPay — Python payment-system simulation plus a Java 21/Spring Boot 3 authorization boundary, durable idempotency, double-entry accounting, transactional outbox, restartable Spring Batch reconciliation and network failure scenarios.
- Nexus — Next.js/TypeScript operations console for AtlasPay.
- AtlasAnalytics — DuckDB payments analytics and risk evaluation.
- ExperimentLab — experiment validity, uncertainty, power and decision tooling.
- RetailIntel — retail warehouse, forecasting baseline and replenishment decisions.
- AtlasRAG — durable RAG ingestion, retrieval, citations and regression evaluation.
- ForecastLab — passport-photo compliance policy and evaluation tooling.

## Scope

The data-oriented examples use generated data for reproducibility. AtlasPay is a simulation and does not process real money or connect to a live card network. The Java module documents at-least-once event semantics, restartable reconciliation batches and is not a live issuer integration. AtlasRAG and ForecastLab retain explicit evaluation limits rather than presenting synthetic results as production evidence.
