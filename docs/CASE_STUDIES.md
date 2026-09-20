# Three engineering case studies

These are independently inspectable portfolio projects, not claims of client
deployments, production adoption or commercial results. All payment scenarios
and retail inputs are synthetic. The AI demonstration uses deterministic
retrieval and extractive answers, not a paid model.

Evidence reviewed on September 20, 2026. AtlasRAG's metric correction,
decision-breakdown safeguards and RetailIntel's decision evidence are merged to
main. AtlasPay #37 and #39 are integrated into #38, not main; Nexus remains on
its review branch. Passing checks do not mean the published portfolio or
production services include those branches.
Links below pin source revisions so the behavior remains inspectable after a
branch changes.

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
- Validate input before consulting that key. Rejected input must not consume
  the key, and an existing decision must not turn an invalid retry into a success.
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
  simulated business decline returned with HTTP 200. Six invalid-input sequences
  verify rejection, correction with the same key, invalid retry and unchanged
  persistence; further cases check 128/129-character boundaries.
- [Flagship README][atlaspay-readme]: reviewer-oriented Java navigation, direct
  reproduction links and explicit simulation/finite-trial limits. Root CI keeps
  every local README link resolvable inside the repository.
- [Nexus outage/recovery workflow][nexus-smoke]: an authenticated local stack,
  upstream shutdown, unavailable output without fixture fallback, and recovery.
- [Nexus combined CI][nexus-ci]: a clean Node 24 install, 21 tests, production
  build, non-root container, dependency audit and runtime smoke checks.

### Reproduce and discuss

Follow the [pinned Java local walkthrough][java-walkthrough] for Java 21,
Maven and disposable local PostgreSQL. The Java CI run recorded
[36 passing tests with no skips][java-ci], including 12 HTTP/database cases,
three concurrency/rollback cases and 14 MVC cases. [Root CI][atlaspay-root-ci]
also recorded 105 Python/PostgreSQL tests plus the README-link and container
checks. Separately, follow the
[Nexus local demo instructions][nexus-walkthrough] for the integrated Python
stack. Dependency downloads are required; no hosted database or issuer is needed.

**Useful review question:** Why must the losing transaction reread under
READ COMMITTED, and what changes if outbox delivery is retried after persistence?

**Limits:** The tests cover a bounded authorization contract, not throughput or
distributed failover. The Java HTTP tests create only the outbox columns this
boundary writes; they do not run a publisher. Identifier/currency validation
from [AtlasPay #39][java-validation] and the presentation/link safeguards from
[AtlasPay #37][atlaspay-presentation] are now integrated into the #38 review
branch and included in this pinned revision. It is not on main or deployed.
The [combined preview][nexus-preview] rendered live authenticated data in a real
1363×936 browser without horizontal overflow, and a reload advanced its producer
timestamp. Mobile layout and the conditional transaction filter remain unverified.

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
- Use the prior-only seven-day mean in the replenishment formula and compare
  that exact policy input with seasonal naive on the same eligible observations.
  Predictions only use history before their target day.
- Select demand at or before each inventory snapshot and withhold forecast
  evidence observed after that decision date.
- Report MAE in units, WAPE relative to actual demand, and mean error for bias.
  Preserve undefined WAPE as null when actual demand is zero.
- Pool SKU-day errors for category summaries; do not present these as forecasts
  of aggregate category demand or confidence for every individual SKU.
- Export input parameters, versions, dates and limitations with the JSON report.
  Ship SQL as package resources so the installed wheel runs outside its checkout.
- Give the report and dashboard one set of generator defaults and CLI options.
  Print seed, order count, demand range, inventory snapshot and evaluation cutoff
  in the dashboard so a reviewer can detect mismatched decision evidence.

### Inspect the evidence

- [Forecast SQL][retail-sql] and [regression tests][retail-tests]: known errors,
  matching populations, zero demand and future-data perturbation.
- [Replenishment SQL][retail-policy] and [policy/dashboard tests][retail-policy-tests]:
  formula equivalence, lagged snapshots, matching SKU evidence and explicit
  unscored states when evaluation occurs after the inventory decision.
- [JSON report tests][retail-report-tests]: reproducibility, empty evaluation
  histories, undefined metrics and CLI behavior.
- [Dashboard provenance tests][retail-dashboard-tests]: custom inputs, visible
  point-in-time cutoffs, ambiguous caller-supplied metadata and non-destructive
  invalid-input handling.
- [Installed-wheel regression][retail-wheel]: install the package and generate
  reports outside the source repository.
- [Business decision walkthrough][retail-walkthrough]: actual synthetic results,
  input assumptions and a planner's investigation sequence.

### Reproduce and discuss

Use the commands in the pinned walkthrough to generate the JSON and dashboard
in a fresh Python environment. The default sample is seed `20260831`, 600 orders
and 20 products. Both commands accept the same `--seed` and `--order-count`;
use identical values and verify the dashboard's visible provenance before
comparing it with the JSON.

The recorded synthetic category WAPE ranges from **61.49% to 71.90%** for the
mean baseline, versus **79.26% to 103.30%** for seasonal naive. These are high
forecast errors, not accuracy percentages or demonstrated savings. A WAPE over
100% is valid. The lower-error baseline in this sample is not a proven policy.

**Useful review question:** What additional stock-movement, lead-time and cost
evidence would be required before turning a recommendation into a purchase order?

**Limits:** One generated final-seven-day scoring window, not a production
backtest. The 28-day demand standard deviation remains a separate safety-stock
assumption; forecast scores do not validate it. Multiple rolling windows and
reconciled inventory are future work. [RetailIntel #6][retail-pr] is merged to
main. Its generated dashboard passed Chromium checks at desktop, phone portrait
and phone landscape widths with keyboard-scrollable tables and zero axe WCAG
2.0/2.1 A/AA violations. It is still a local static artifact, not a hosted
retail integration.

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
- Split that aggregate into answerable-grounding and safe-abstention rates, then
  count false abstentions and unsafe evidence responses separately.
- Keep citation correctness separate from evidence-decision correctness. A
  grounded flag alone is not proof of the answer's meaning or factual accuracy.
- Let a relevant chunk contribute at most one citation hit. Duplicate citations
  remain in the precision denominator and cannot inflate recall above 100%.
- Use an extractive generator for the offline demonstration so tests need no
  external model credentials and are repeatable.

### Inspect the evidence

- [Evaluator implementation][rag-evaluator]: the populations and denominators
  for citation, evidence-decision and supported-answer metrics.
- [Regression tests][rag-tests]: the four-case reference contract, irrelevant
  and duplicate citations, invalid examples, the always-abstain failure example,
  and separate unsafe-evidence/false-abstention counts.
- [Report generator][rag-report]: per-case outcomes alongside aggregate metrics
  and explicit limits on what the measurements establish. Green/red outcomes
  represent this deterministic contract, not human quality judgment.

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
A duplicate relevant citation contributes one recall hit and lowers precision,
so neither metric can be made flattering by repeating a chunk.

**Useful review question:** How can the grounded/abstained decision be correct
while citation precision is poor, and what evaluation would a real generator need?

**Limits:** No implemented semantic/vector retriever, no tenant isolation, and
no claim of general semantic groundedness. Supported-answer rate checks text
containment in cited evidence; it is not human evaluation of answer quality.
The naming correction in [AtlasRAG #11][rag-name-pr] and the failure breakdown
in [AtlasRAG #12][rag-pr] are merged to main. The latest
[post-merge checks][rag-ci] passed all 44 tests on Python 3.11 and 3.12 with
PostgreSQL. This is test evidence, not a hosted deployment.

## Review order and release status

Start with one design decision, read its implementation and failure test, then
reproduce it locally. The public site's HTML reports are snapshots; they must
not be used as proof of the review branches' current runtime behavior.

No new cloud deployment accompanies this guide. Railway's finite trial was
confirmed by the user's screenshot; current allowance and release side effects
still require verification. Vercel Hobby's commercial-use restriction remains a
gate for freelance-services marketing. Hosting choices, browser verification and
publication remain separate release gates.

[java-service]: https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/java-service/src/main/java/com/atlaspay/AuthorizationService.java
[java-concurrency]: https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/java-service/src/test/java/com/atlaspay/AuthorizationPostgresTest.java
[java-http]: https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/java-service/src/test/java/com/atlaspay/AuthorizationHttpPostgresTest.java
[java-walkthrough]: https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/java-service/docs/LOCAL_WALKTHROUGH.md
[atlaspay-readme]: https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/README.md
[java-ci]: https://github.com/soufianeelbiki1/AtlasPay/actions/runs/34785966552
[atlaspay-root-ci]: https://github.com/soufianeelbiki1/AtlasPay/actions/runs/34785966473
[atlaspay-presentation]: https://github.com/soufianeelbiki1/AtlasPay/pull/37
[java-validation]: https://github.com/soufianeelbiki1/AtlasPay/pull/39
[nexus-smoke]: https://github.com/soufianeelbiki1/Nexus/blob/372a9a41607cd07c59e4cfefbecc7c046383a313/.github/workflows/demo-smoke.yml
[nexus-walkthrough]: https://github.com/soufianeelbiki1/Nexus/blob/372a9a41607cd07c59e4cfefbecc7c046383a313/docs/LOCAL_DEMO.md
[nexus-ci]: https://github.com/soufianeelbiki1/Nexus/actions/runs/34782889919
[nexus-preview]: https://nexus-mchodvzdz-soufiane15.vercel.app/
[retail-sql]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/src/retailintel/sql/marts/forecast_evaluation.sql
[retail-tests]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/tests/test_forecast_evaluation.py
[retail-policy]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/src/retailintel/sql/marts/replenishment_recommendation.sql
[retail-policy-tests]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/tests/test_replenishment.py
[retail-report-tests]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/tests/test_evaluation_report.py
[retail-dashboard-tests]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/tests/test_dashboard.py
[retail-wheel]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/tests/test_wheel_installation.py
[retail-walkthrough]: https://github.com/soufianeelbiki1/RetailIntel/blob/878526db1753ecca415f4f06dc717e8d90a1f9b9/docs/DECISION_WALKTHROUGH.md
[retail-pr]: https://github.com/soufianeelbiki1/RetailIntel/pull/6
[rag-evaluator]: https://github.com/soufianeelbiki1/AtlasRAG/blob/18ac326741cae5db33fabb5f3c6a9b6a1047a025/app/rag_evaluation.py
[rag-tests]: https://github.com/soufianeelbiki1/AtlasRAG/blob/18ac326741cae5db33fabb5f3c6a9b6a1047a025/tests/test_rag_evaluation.py
[rag-report]: https://github.com/soufianeelbiki1/AtlasRAG/blob/18ac326741cae5db33fabb5f3c6a9b6a1047a025/app/demo_report.py
[rag-readme]: https://github.com/soufianeelbiki1/AtlasRAG/blob/18ac326741cae5db33fabb5f3c6a9b6a1047a025/README.md
[rag-name-pr]: https://github.com/soufianeelbiki1/AtlasRAG/pull/11
[rag-pr]: https://github.com/soufianeelbiki1/AtlasRAG/pull/12
[rag-ci]: https://github.com/soufianeelbiki1/AtlasRAG/actions/runs/34795357503
