# Three engineering case studies

These are independently inspectable portfolio projects, not claims of client
deployments, production adoption or commercial results. All payment scenarios
and retail inputs are synthetic. The AI demonstration uses deterministic
retrieval and extractive answers, not a paid model.

Evidence reviewed on September 12, 2026. The linked improvements are **unmerged
review branches**. Their passing checks do not mean the published portfolio or
production services include them. Links below pin source revisions so the
described behavior remains inspectable after a branch changes.

## 1. AtlasPay + Nexus: making payment failures inspectable

### Problem and scope

A payment client can retry after a timeout without knowing whether the first
request succeeded. An operator needs to distinguish unavailable source data
from a healthy system, rather than see plausible sample numbers during an outage.

AtlasPay's Python payment simulation and Nexus's Next.js/TypeScript console
form the integrated local walkthrough. AtlasPay also contains a **separate
Java 21 / Spring Boot authorization boundary**. The Java tests below do not
prove the entire Python-to-Nexus system runs through Java.

### Engineering decisions

- Bind an idempotency key to the original payment, issuer, amount and currency.
  An identical retry returns the stored decision; a changed request conflicts.
- Let a PostgreSQL unique constraint arbitrate concurrent first requests.
  `ON CONFLICT DO NOTHING` chooses a winner; a subsequent read under explicit
  READ COMMITTED isolation sees the committed decision. An in-process lock
  alone would not protect requests handled by different application instances.
- Write the authorization decision and outbox event in one database transaction.
  This protects atomic persistence, **not end-to-end exactly-once delivery**.
- Render Nexus using runtime API configuration. Build-time fixture rendering
  had prevented the container from honoring runtime credentials. The corrected
  path reports unavailable data and recovers when the upstream returns.

### Inspect the evidence

- [Java authorization implementation][java-service]: request comparison,
  conflict response, unique insertion and transactional outbox write.
- [Real PostgreSQL concurrency tests][java-concurrency]: two forced overlapping
  identical requests yield one decision/event; changed amounts yield one winner
  and one conflict; an outbox write failure rolls back the decision.
- [HTTP-to-PostgreSQL tests][java-http]: real HTTP retries, HTTP 409 conflict,
  HTTP 401 without credentials, HTTP 400 for zero amount, and a persisted
  simulated business decline returned with HTTP 200.
- [Nexus outage/recovery workflow][nexus-smoke]: an authenticated local stack,
  upstream shutdown, unavailable output without fixture fallback, and recovery.

### Reproduce and discuss

Follow the [pinned Java local walkthrough][java-walkthrough] for Java 21,
Maven and disposable local PostgreSQL. The Java CI run recorded
[14 passing tests with no skips][java-ci]. Separately, follow the
[Nexus local demo instructions][nexus-walkthrough] for the integrated Python
stack. Dependency downloads are required; no hosted database or issuer is needed.

**Useful review question:** Why must the losing transaction reread under
READ COMMITTED, and what changes if outbox delivery is retried after persistence?

**Limits:** The tests cover a bounded authorization contract, not throughput or
distributed failover. The Java HTTP tests create only the outbox columns this
boundary writes; they do not run a publisher. Identifier/currency validation
improvements in [AtlasPay #39][java-validation] are a separate branch, not part
of this pinned Java revision. Browser/mobile verification of Nexus is pending.

## 2. RetailIntel: inventory recommendations with forecast evidence

### Problem and scope

A planner needs a queue of SKUs to investigate, not an unexplained instruction
to buy stock. Reorder quantities are only useful when the demand estimate,
supplier assumptions and forecast errors can be inspected together.

RetailIntel uses a local DuckDB warehouse and generated retail data. Inventory
snapshots and orders are generated separately: this sample is not a reconciled
inventory movement ledger or a purchasing integration.

### Engineering decisions

- Build a dense SKU/day history, including zero-demand days.
- Compare a trailing-seven-day mean with a seasonal-naive baseline on the same
  eligible observations. Predictions only use history before their target day.
- Report MAE in units, WAPE relative to actual demand, and mean error for bias.
  Preserve undefined WAPE as null when actual demand is zero.
- Pool SKU-day errors for category summaries; do not present these as forecasts
  of aggregate category demand or confidence for every individual SKU.
- Export input parameters, versions, dates and limitations with the JSON report.
  Ship SQL as package resources so the installed wheel runs outside its checkout.

### Inspect the evidence

- [Forecast SQL][retail-sql] and [regression tests][retail-tests]: known errors,
  matching populations, zero demand and future-data perturbation.
- [JSON report tests][retail-report-tests]: reproducibility, empty evaluation
  histories, undefined metrics and CLI behavior.
- [Installed-wheel regression][retail-wheel]: install the package and generate
  reports outside the source repository.
- [Business decision walkthrough][retail-walkthrough]: actual synthetic results,
  input assumptions and a planner's investigation sequence.

### Reproduce and discuss

Use the commands in the pinned walkthrough to generate the JSON and dashboard
in a fresh Python environment. The default sample is seed `20260831`, 600 orders
and 20 products. Compare identical inputs: the evaluation CLI's custom inputs
are not automatically applied to the dashboard CLI.

The recorded synthetic category WAPE ranges from **61.49% to 71.90%** for the
mean baseline, versus **79.26% to 103.30%** for seasonal naive. These are high
forecast errors, not accuracy percentages or demonstrated savings. A WAPE over
100% is valid. The lower-error baseline in this sample is not a proven policy.

**Useful review question:** What additional stock-movement, lead-time and cost
evidence would be required before turning a recommendation into a purchase order?

**Limits:** One generated final-seven-day scoring window, not a production
backtest. Multiple rolling windows and reconciled inventory are future work.
The dashboard changes in [RetailIntel #6][retail-pr] are not published and their
desktop/mobile usability remains unverified.

## 3. AtlasRAG: testing when to answer and when to abstain

### Problem and scope

A retrieval-backed answer can look credible while citing the wrong material.
A system that always refuses to answer is not useful either. The reference
implementation makes both mistakes observable with deterministic regression cases.

### Engineering decisions

- Keep retrieval, reranking, generation and evaluation behind separate boundaries.
- Evaluate citation IDs against hand-authored evidence expectations.
- Name the combined grounded/abstained outcome **evidence decision accuracy**:
  it includes answerable questions as well as questions that should be refused.
- Keep citation correctness separate from evidence-decision correctness. A
  grounded flag alone is not proof of the answer's meaning or factual accuracy.
- Use an extractive generator for the offline demonstration so tests need no
  external model credentials and are repeatable.

### Inspect the evidence

- [Evaluator implementation][rag-evaluator]: the populations and denominators
  for citation, evidence-decision and supported-answer metrics.
- [Regression tests][rag-tests]: the four-case reference contract, irrelevant
  citations, invalid examples, and the always-abstain failure example.
- [Report generator][rag-report]: per-case outcomes alongside aggregate metrics
  and explicit limits on what the measurements establish.

### Reproduce and discuss

Follow the [pinned README][rag-readme] to install the development dependencies,
run `pytest -q`, and generate an HTML report with
`python -m app.demo_report --output build/atlasrag-evaluation.html`.
The deterministic report needs no paid model. PostgreSQL integration tests
require their separate local database setup; skipped tests are not passed tests.

The default reference contract has four cases. Raising the evidence threshold
so every case abstains reduces evidence decision accuracy to **25%**, while
citation precision and recall become zero. This failure example is more
informative than presenting a perfect score on four hand-authored cases alone.

**Useful review question:** How can the grounded/abstained decision be correct
while citation precision is poor, and what evaluation would a real generator need?

**Limits:** No implemented semantic/vector retriever, no tenant isolation, and
no claim of general semantic groundedness. Supported-answer rate checks text
containment in cited evidence; it is not human evaluation of answer quality.
The naming correction in [AtlasRAG #11][rag-pr] is unmerged.

## Review order and release status

Start with one design decision, read its implementation and failure test, then
reproduce it locally. The public site's HTML reports are snapshots; they must
not be used as proof of the review branches' current runtime behavior.

No new cloud deployment accompanies this guide. Railway's zero-cost eligibility
is unverified; Vercel Hobby's commercial-use restriction still applies. Hosting
choices, browser verification and publication remain separate release gates.

[java-service]: https://github.com/soufianeelbiki1/AtlasPay/blob/2b3a606d1697f4e323fe385fa0cf914d8f6f3cfe/java-service/src/main/java/com/atlaspay/AuthorizationService.java
[java-concurrency]: https://github.com/soufianeelbiki1/AtlasPay/blob/2b3a606d1697f4e323fe385fa0cf914d8f6f3cfe/java-service/src/test/java/com/atlaspay/AuthorizationPostgresTest.java
[java-http]: https://github.com/soufianeelbiki1/AtlasPay/blob/2b3a606d1697f4e323fe385fa0cf914d8f6f3cfe/java-service/src/test/java/com/atlaspay/AuthorizationHttpPostgresTest.java
[java-walkthrough]: https://github.com/soufianeelbiki1/AtlasPay/blob/2b3a606d1697f4e323fe385fa0cf914d8f6f3cfe/java-service/docs/LOCAL_WALKTHROUGH.md
[java-ci]: https://github.com/soufianeelbiki1/AtlasPay/actions/runs/34709914274
[java-validation]: https://github.com/soufianeelbiki1/AtlasPay/pull/39
[nexus-smoke]: https://github.com/soufianeelbiki1/Nexus/blob/d060f45a28d10de342bb6861599de5c99f76bed3/.github/workflows/demo-smoke.yml
[nexus-walkthrough]: https://github.com/soufianeelbiki1/Nexus/blob/d060f45a28d10de342bb6861599de5c99f76bed3/docs/LOCAL_DEMO.md
[retail-sql]: https://github.com/soufianeelbiki1/RetailIntel/blob/400f9f41520feca7392d4a472049db23eb2c6792/src/retailintel/sql/marts/forecast_evaluation.sql
[retail-tests]: https://github.com/soufianeelbiki1/RetailIntel/blob/400f9f41520feca7392d4a472049db23eb2c6792/tests/test_forecast_evaluation.py
[retail-report-tests]: https://github.com/soufianeelbiki1/RetailIntel/blob/400f9f41520feca7392d4a472049db23eb2c6792/tests/test_evaluation_report.py
[retail-wheel]: https://github.com/soufianeelbiki1/RetailIntel/blob/400f9f41520feca7392d4a472049db23eb2c6792/tests/test_wheel_installation.py
[retail-walkthrough]: https://github.com/soufianeelbiki1/RetailIntel/blob/400f9f41520feca7392d4a472049db23eb2c6792/docs/DECISION_WALKTHROUGH.md
[retail-pr]: https://github.com/soufianeelbiki1/RetailIntel/pull/6
[rag-evaluator]: https://github.com/soufianeelbiki1/AtlasRAG/blob/880d6f36c0fefa7ea45bec899d37b74b9faa196c/app/rag_evaluation.py
[rag-tests]: https://github.com/soufianeelbiki1/AtlasRAG/blob/880d6f36c0fefa7ea45bec899d37b74b9faa196c/tests/test_rag_evaluation.py
[rag-report]: https://github.com/soufianeelbiki1/AtlasRAG/blob/880d6f36c0fefa7ea45bec899d37b74b9faa196c/app/demo_report.py
[rag-readme]: https://github.com/soufianeelbiki1/AtlasRAG/blob/880d6f36c0fefa7ea45bec899d37b74b9faa196c/README.md
[rag-pr]: https://github.com/soufianeelbiki1/AtlasRAG/pull/11
