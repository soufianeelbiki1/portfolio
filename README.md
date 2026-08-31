# Engineering & Data Portfolio

This repository is the public presentation layer for the `soufianeelbiki1` GitHub portfolio.

The portfolio is intentionally built as a small set of deep, testable systems across four hiring tracks: **Payments & Distributed Systems, Data Analytics & Decision Science, Applied AI/ML, and Full-Stack Product Engineering**. Synthetic or simulated data is labeled as such, and unsupported production/deployment/accuracy claims are avoided.

## CV-ready project map

| Project | Primary hiring signal | Current evidence |
|---|---|---|
| **AtlasPay** | Payments / Backend / Distributed Systems | ISO 8583 + EMV boundaries, scoped ISO 20022 projection, routing, timeout/late/reversal semantics, durable idempotency, double-entry ledger, transactional outbox, reconciliation, observability, fault injection, PostgreSQL analytics |
| **AtlasAnalytics** | Data Analyst / Analytics Engineer / Data Scientist | DuckDB payments warehouse, explicit fact grains, payment/issuer/decline marts, rolling issuer baselines, executive findings, leakage-safe fraud/risk evaluation, cost-sensitive thresholds, calibration and PSI |
| **ExperimentLab** | Product Analyst / Data Scientist | Experiment warehouse, SRM checks, two-proportion inference, CUPED, bootstrap intervals, ship/hold decision policy, power and minimum-detectable-effect planning |
| **RetailIntel** | Data Analyst / Analytics Engineer | Retail star schema, product margin, inventory actions, supplier reliability, RFM, cohorts, promotion economics, dense SKU-day demand, time-safe forecast baseline, service-level safety stock and reorder recommendations |
| **AtlasRAG** | AI / LLM Engineer | Citation-first RAG, abstention, durable PostgreSQL ingestion, hybrid rank fusion, reranking contract, versioned regression evaluation, provider token/cost/latency accounting |
| **ForecastLab** | Applied ML / CV Engineering | Explainable passport-photo policy, geometry/quality rules, estimator boundaries, FastAPI signal inference, versioned evaluation, licensed held-out evaluation contract |
| **Nexus** | Full-Stack / Platform Engineering | Strict Next.js/TypeScript AtlasPay operator plane, authenticated live API source, runtime contract validation, fail-closed behavior, unavailable-state semantics, transaction/reconciliation workflows |

The **portfolio** repository and the **profile README** repository are presentation surfaces, not separate engineering projects to list as standalone CV projects.

## Data analytics & decision science track

### AtlasAnalytics

AtlasAnalytics is the main payments analytics project. It separates payment-level monetary facts from authorization-attempt operational facts, uses reproducible synthetic data, and provides decision-oriented SQL/Python evidence without pretending synthetic findings are production business results.

Implemented areas include:

- payment and issuer daily marts;
- decline taxonomy and issuer rolling baselines;
- reconciliation-aware payment analytics;
- measured synthetic executive findings;
- leakage-safe chronological risk evaluation;
- precision, recall, false-positive rate, alert rate and expected-cost threshold metrics;
- calibration bins and PSI score-distribution monitoring.

### ExperimentLab

ExperimentLab demonstrates experimentation reasoning beyond p-values:

- assignment integrity / SRM detection;
- confidence intervals and effect-size reporting;
- CUPED variance reduction with pre-treatment covariates;
- bootstrap uncertainty for skewed outcomes;
- explicit `ship`, `hold`, and `do_not_ship` decision policy;
- sample-size and minimum-detectable-effect planning with fixed-horizon caveats.

All current experiment data is reproducibly synthetic.

### RetailIntel

RetailIntel turns commercial facts into inventory and merchandising decisions:

- product-day margin and returns;
- inventory action and supplier reliability marts;
- customer RFM and acquisition cohorts;
- descriptive promotion/category economics with no causal-lift claim;
- dense SKU × calendar-day demand history including zero-demand days;
- trailing forecasts that use prior observations only;
- demand volatility, forecast error, service-level assumptions, safety stock, reorder point and recommended reorder quantity.

## Engineering tracks

### AtlasPay

AtlasPay remains the flagship engineering system. It is an engineering simulation, not a live payment processor. The strongest evidence is correctness under retries, duplicates, ambiguous timeouts, reversals, accounting invariants and at-least-once event delivery rather than CRUD feature count.

### AtlasRAG

AtlasRAG is evaluation-first rather than chat-UI-first. The current implementation includes durable replay-safe ingestion, citation/abstention semantics, hybrid rank fusion and reranking ports, versioned application-level RAG regression metrics, and provider operational accounting. A measured semantic/vector retriever remains future work and is not claimed as implemented.

### ForecastLab

ForecastLab currently evaluates precomputed image signals and deterministic estimator doubles. It has strong policy/evaluation/inference infrastructure, but does not claim real-world CV accuracy, ICAO certification or production pixel estimators before licensed held-out measurements exist.

### Nexus

Nexus consumes AtlasPay live operational data only when live configuration is valid. Once live mode is configured, errors render unavailable state rather than silently falling back to fixture telemetry. Richer network/issuer drill-down remains fixture-only until AtlasPay exposes durable network read models.

## Presentation rules

- Show implemented work as implemented and roadmap work as roadmap.
- Do not publish fake scale, traffic, latency, accuracy, business impact, or production claims.
- Do not publish a live-demo link until deployment is verified.
- Define analytical grain, currency/time semantics, statistical assumptions, and unavailable data explicitly.
- Synthetic data must remain clearly labeled synthetic.
- Explain failure modes, data limitations and decision use—not only architecture diagrams.
- Keep this presentation layer synchronized with merged source and green CI.

## Recommended CV selection

A CV should not list every repository. Choose the 3–5 projects that best match the target role:

- **Data Analyst / Analytics Engineer:** AtlasAnalytics, RetailIntel, ExperimentLab, AtlasPay analytics.
- **Data Scientist:** ExperimentLab, AtlasAnalytics risk evaluation, ForecastLab, AtlasRAG evaluation.
- **Backend / Payments:** AtlasPay, Nexus, AtlasRAG durability.
- **AI / LLM:** AtlasRAG, ForecastLab, AtlasPay as reliability evidence.
- **Full Stack:** Nexus, AtlasPay, plus one data/AI flagship relevant to the job.
