# Engineering project site

Public project hub for Soufiane Elbiki's engineering repositories.

Live site: https://soufiane-portfolio-delta.vercel.app

The site focuses on payment systems, operational tooling, analytics, experimentation, retail planning, retrieval systems and ML evaluation. It includes direct browser demos for project outputs that can be published safely as deterministic static reports.

## Browser demos

- AtlasAnalytics risk threshold evaluation: `/demos/atlasanalytics-risk.html`
- ExperimentLab experiment decision report: `/demos/experimentlab.html`
- RetailIntel inventory dashboard is implemented on PR #5 and is kept out of the live-demo list until the repository state is merged and stable.

## Project repositories

- AtlasPay — payment-system simulation with durable idempotency, double-entry accounting, transactional outbox, reconciliation and network failure scenarios.
- Nexus — Next.js/TypeScript operations console for AtlasPay.
- AtlasAnalytics — DuckDB payments analytics and risk evaluation.
- ExperimentLab — experiment validity, uncertainty, power and decision tooling.
- RetailIntel — retail warehouse, forecasting baseline and replenishment decisions.
- AtlasRAG — durable RAG ingestion, retrieval, citations and regression evaluation.
- ForecastLab — passport-photo compliance policy and evaluation tooling.

## Scope

The data-oriented examples use generated data for reproducibility. AtlasPay is a simulation and does not process real money or connect to a live card network. ForecastLab does not claim real-world raw-image accuracy. The browser demos preserve those boundaries instead of presenting synthetic results as production evidence.
