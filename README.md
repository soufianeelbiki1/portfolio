# Engineering project site

Public project hub for Soufiane Elbiki's engineering repositories.

Existing published site: https://soufiane-portfolio-delta.vercel.app

This branch's React Bits design has not been published there.

## Build the portfolio

Node 24 and Python 3.11+:

```sh
npm ci --ignore-scripts
npm run typecheck
npm run build
npm test
node --test tests/interactions.test.mjs
python3 -m http.server 8767 --directory dist
```

Edit `src/portfolio.tsx` and `src/portfolio.css`, then build. `index.html` and
`assets/` are committed generated output; CI checks that they match the source.
`dist/` contains only publishable static files. All content and links render
without JavaScript; hydration adds the scenario selector and decorative effects.
The interactive model never calls a backend and is not an integration test.

The free React Bits SpotlightCard and Magnet components are adapted with motion
preferences and stable keyboard/touch targets. See [design decisions and source
attribution](docs/DESIGN.md) and the retained [license](third-party/react-bits-LICENSE.md).
There are no Pro components, analytics, remote fonts, paid APIs or runtime server.

The site focuses on payment systems, operational tooling, analytics, experimentation, retail planning, retrieval systems and ML evaluation. Public browser pages make deterministic project scenarios viewable without local setup.

## Start with three engineering case studies

Read the [reviewer guide](docs/CASE_STUDIES.md) for the problem, design decisions,
failure-path tests, reproducible run instructions and limitations of:

1. AtlasPay + Nexus: payment retries and operator visibility, including the separate Java/Spring Boot authorization boundary.
2. RetailIntel: inventory decisions with measured forecast error, not invented savings.
3. AtlasRAG: evidence decisions and citation regression tests without paid model calls.

The guide pins evidence to source revisions and distinguishes unmerged review
branches from the published website. A static snapshot is not a live backend.

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
