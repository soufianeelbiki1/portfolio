# Recruiter-readiness backlog and evidence

Updated: 2026-09-20. Backend-first full-stack/platform engineering: Java/Spring
Boot, TypeScript/React/Next.js, PostgreSQL, data workflows and reliability.
Budget: zero additional spend. Simulations and synthetic results stay labelled.

## Latest completed work

[RetailIntel #6](https://github.com/soufianeelbiki1/RetailIntel/pull/6) is merged
to main at `878526db1753ecca415f4f06dc717e8d90a1f9b9`. It connects the forecast
evaluation to the replenishment decision. The policy uses the same
prior-only seven-day mean that the holdout scores, rather than a separate
unscored 28-day mean. Demand is selected at or before the inventory snapshot,
and evidence observed after that snapshot is withheld. The queue places both
baselines' SKU-level MAE, WAPE and sample count beside the proposed order while
retaining the separate 28-day volatility input for safety stock. Its JSON and
dashboard commands now share generator defaults and custom-input options; the
dashboard prints seed, order count, demand range, inventory snapshot and
evaluation cutoff instead of silently allowing incomparable samples.

The reviewed head passes **35 tests**, lint, formatting, installed-wheel
deterministic JSON/dashboard generation and dependency checks in
[exact-head CI](https://github.com/soufianeelbiki1/RetailIntel/actions/runs/35489079697)
on Python 3.11 and 3.12. A real Chromium pass at 1440×1000, 390×844 and
844×390 found zero page overflow, clipped regions, console/page errors or axe
WCAG 2.0/2.1 A/AA violations. Each wide table is a labelled, keyboard-focusable
scroll region and keyboard horizontal scrolling was exercised. No deployment,
hosted API/model/database or paid resource accompanied the merge.

[AtlasRAG #12](https://github.com/soufianeelbiki1/AtlasRAG/pull/12) is merged to
main at `18ac326741cae5db33fabb5f3c6a9b6a1047a025`. Duplicate relevant citations
can no longer inflate recall above 100%: each expected chunk contributes at most
one hit while every duplicate stays in the precision denominator. The evaluator
now separates answerable-grounding and safe-abstention rates and counts false
abstentions and unsafe evidence responses, so opposite failure modes cannot hide
inside one aggregate. The deterministic report exposes the same case-level
outcomes and retains its synthetic-data and non-semantic-evaluation limits.

[Post-merge CI](https://github.com/soufianeelbiki1/AtlasRAG/actions/runs/34795357503)
passes **44 tests** on both Python 3.11 and 3.12 with PostgreSQL, plus dependency,
lint, formatting and compilation checks. No deployment, hosted model/API call or
paid resource accompanied the merge.

[Nexus #26](https://github.com/soufianeelbiki1/Nexus/pull/26), including the
previously consolidated #25 documentation, is merged to main at
[`65c72e2`](https://github.com/soufianeelbiki1/Nexus/commit/65c72e204c0fb6b3b281483ffd35872c05335df4).
It ships reproducible Node 24 builds, runtime-only authenticated rendering,
fail-closed outage/recovery checks and a truthful operator walkthrough. A visual
review found cramped route diagnostics on narrow phones; the merged fix stacks
those long values below 520 px and adds a responsive regression.

[Post-merge CI](https://github.com/soufianeelbiki1/Nexus/actions/runs/35501857214)
passes a clean install, TypeScript, **22 tests**, production build and non-root
container. [Security/runtime checks](https://github.com/soufianeelbiki1/Nexus/actions/runs/35501857277)
and the [authenticated outage/recovery demo](https://github.com/soufianeelbiki1/Nexus/actions/runs/35501857231)
also pass. The [production dashboard](https://nexus-soufiane15.vercel.app/) was
verified at 1440×1000, 390×844, 844×390 and 320×568 with live `atlaspay-api`
provenance, changing timestamps, no overflow/clipping or console errors and zero
axe WCAG A/AA violations. Fixture search/outcome filters are not presented as
live authenticated functionality.

[AtlasPay #37](https://github.com/soufianeelbiki1/AtlasPay/pull/37) and
[AtlasPay #39](https://github.com/soufianeelbiki1/AtlasPay/pull/39) are merged
into the existing **#38 review branch, not main**, at
`968bd5703360f346438ed6c7b2afb1c24d197a7d`. The root README now leads with the
Java/Spring Boot boundary, links directly to the reproducible retry/HTTP
evidence, separates Python and Java startup paths and states finite-trial hosting
limits. A regression test rejects broken or repository-escaping local README
links. Validation and idempotency behavior remain tested together. The
[cloud architecture notes](https://github.com/soufianeelbiki1/AtlasPay/blob/968bd5703360f346438ed6c7b2afb1c24d197a7d/docs/CLOUD_PLATFORM_ARCHITECTURE.md)
now record the live Railway watch paths that isolate Java and Python builds.

[Combined-head Java 21 CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35436564888)
passes **36 tests, zero failures/errors/skips**: 12 real-server HTTP/PostgreSQL
cases, three PostgreSQL concurrency/rollback cases, 14 MVC cases, three service
cases and four authentication cases. [Root CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35436564884)
passes lint/format, all migrations, **105 Python/PostgreSQL tests**, runtime-image
build and non-root verification. Local diff, format and README-link checks pass;
Maven/Docker execution is CI-based, not falsely claimed local. The
[walkthrough](https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/java-service/docs/LOCAL_WALKTHROUGH.md)
and [three case studies](CASE_STUDIES.md) describe the combined evidence.

AtlasPay main is now `e9e46c022e756c0bc60dca2a3229aacc2e79525b` after the
workflow-only [setup-java v6](https://github.com/soufianeelbiki1/AtlasPay/pull/30)
[setup-python v7](https://github.com/soufianeelbiki1/AtlasPay/pull/24) and
[checkout v7](https://github.com/soufianeelbiki1/AtlasPay/pull/23) updates.
Both Railway services recorded all three revisions as `SKIPPED`; their running
deployments remain on `7990d04f2485b9cf46ab5c540b0418a128b48a7b`. No runtime
deployment, hosted database/API/model call or paid resource accompanied the
merges. This is direct evidence that the monorepo watch paths ignore unrelated
changes, while `checkSuites=false` remains a separate release risk.

On 2026-09-19, all 13 then-open pull requests were re-reviewed at their exact
heads. [Nexus #11](https://github.com/soufianeelbiki1/Nexus/pull/11),
[#27](https://github.com/soufianeelbiki1/Nexus/pull/27) and
[#28](https://github.com/soufianeelbiki1/Nexus/pull/28) were closed without
merging: the first conflicts with the reviewed Node 24 runtime direction, while
the latter two fail CI, security and integrated-demo checks as isolated
runtime/type peer updates. A fresh recheck found all ten remaining PRs mergeable,
correcting the earlier transient conflict state for AtlasPay #22/#25.
[AtlasPay #22](https://github.com/soufianeelbiki1/AtlasPay/pull/22) and
[#25](https://github.com/soufianeelbiki1/AtlasPay/pull/25) were then closed
without merging: the former is an unplanned Python 3.11 → 3.14 runtime migration,
and the latter is a dev-only pytest range change whose watched
`pyproject.toml` would still trigger a Railway deployment. Seven PRs remain
open after the reviewed RetailIntel #6 merge; their last inspected exact-head
workflows were green and no human feedback was unresolved.

## Current release state

| Work | State and evidence | Remaining gate |
| --- | --- | --- |
| [Portfolio #11](https://github.com/soufianeelbiki1/portfolio/pull/11) | Draft React Bits redesign; static HTML/React/TypeScript; 20 Python and four DOM tests, typecheck and build rechecked locally; Chromium passed desktop, phone portrait/landscape, keyboard interactions, reduced/coarse-pointer behavior and WCAG checks | Eligible zero-cost commercial hosting; real mail-client delivery remains outside automated verification |
| [AtlasPay #38](https://github.com/soufianeelbiki1/AtlasPay/pull/38) | Ready combined Java correctness/presentation branch at `968bd5703360f346438ed6c7b2afb1c24d197a7d`; isolated Railway watch paths, 36 Java and 105 Python/PostgreSQL tests plus container checks pass | Remaining Java deployment allowance and `checkSuites=false` release risk |
| [AtlasPay #37](https://github.com/soufianeelbiki1/AtlasPay/pull/37) | Merged into #38 review branch; not main | Released only when #38 clears its deployment gate |
| [Nexus #26](https://github.com/soufianeelbiki1/Nexus/pull/26) | Merged at `65c72e204c0fb6b3b281483ffd35872c05335df4`; all three post-merge workflow groups pass; production is browser-verified from desktop through 320 px | Personal project evidence on finite Vercel Hobby limits; no production-adoption claim |
| [Nexus #25](https://github.com/soufianeelbiki1/Nexus/pull/25) | Released through #26 | None |
| [RetailIntel #6](https://github.com/soufianeelbiki1/RetailIntel/pull/6) | Merged at `878526db1753ecca415f4f06dc717e8d90a1f9b9`; 35 tests passed on Python 3.11/3.12; desktop/phone Chromium, keyboard scrolling and axe WCAG checks passed | Local static artifact only; no hosted retail integration claimed |

All scoped open PRs, latest file diffs, checks, comments, reviews and review
threads were inspected before this change. No human review feedback was
pending. The obsolete Node 26 and failing split-peer Nexus branches were closed
recoverably, not deleted or merged. Recheck the remaining Dependabot heads
against the now-merged lockfile/runtime baseline before any further merge.

## Already merged to main

- [RetailIntel #6](https://github.com/soufianeelbiki1/RetailIntel/pull/6):
  auditable synthetic inputs, point-in-time policy/evaluation alignment,
  installed-wheel execution and accessible dashboard tables. Merge
  `878526db1753ecca415f4f06dc717e8d90a1f9b9`; exact-head CI passed 35 tests
  on Python 3.11/3.12 and the generated dashboard passed desktop/phone Chromium
  geometry, keyboard and axe WCAG checks. No deployment accompanied the merge.
- [AtlasPay #23](https://github.com/soufianeelbiki1/AtlasPay/pull/23): all root,
  Java and security workflow checkout steps upgraded to the Node 24-based v7
  release. Merge `e9e46c022e756c0bc60dca2a3229aacc2e79525b`;
  [root CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35456732363),
  [Java CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35456732405)
  and [security CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35456732372)
  passed. Railway marked the commit `SKIPPED` for both services.
- [AtlasPay #24](https://github.com/soufianeelbiki1/AtlasPay/pull/24): root and
  security workflows upgraded to `actions/setup-python@v7` without changing
  Python 3.11 or pip caching. Merge
  `fa662a25fa429a8129a4497a242a856039bee61d`;
  [post-merge root CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35454293378)
  passed 104 PostgreSQL tests and container checks, while
  [security CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35454293388)
  passed dependency audit and runtime health smoke. Railway marked the commit
  `SKIPPED` for both services.
- [AtlasPay #30](https://github.com/soufianeelbiki1/AtlasPay/pull/30): Java CI
  setup action upgraded to the Node 24-based v6 release without changing Java
  21, Temurin or Maven caching. Merge
  `cfc0f6058d2c416187c87e4965d8ba971f3d1913`;
  [post-merge Java CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35450638739)
  and [root CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/35450638713)
  passed. Railway marked the commit `SKIPPED` for both services, leaving their
  active September 8 deployments unchanged.
- [AtlasRAG #12](https://github.com/soufianeelbiki1/AtlasRAG/pull/12): bounded
  citation recall and separate evidence-decision failure modes. Merge
  `18ac326741cae5db33fabb5f3c6a9b6a1047a025`;
  [post-merge CI](https://github.com/soufianeelbiki1/AtlasRAG/actions/runs/34795357503)
  passed 44 tests on Python 3.11 and 3.12 with PostgreSQL.
- [Portfolio #10](https://github.com/soufianeelbiki1/portfolio/pull/10): source
  audit, navigation tests and durable backlog; no site deployment.
- [AtlasRAG #11](https://github.com/soufianeelbiki1/AtlasRAG/pull/11): truthful
  evidence-decision metric and always-abstain counterexample. Merge
  `bfbd979a5b2bde2d14a777be87ac3c6569d0e0ee`;
  [post-merge CI](https://github.com/soufianeelbiki1/AtlasRAG/actions/runs/34744313209)
  passed 42 tests on Python 3.11 and 3.12 with PostgreSQL.
- [Profile #8](https://github.com/soufianeelbiki1/soufianeelbiki1/pull/8): curated,
  status-labelled evidence links and removal of unrelated temporary tooling.
  Merge `468285f7e3e47807f84a3a100668b10ede1863cb`; five evidence links verified.
- [ForecastLab #10](https://github.com/soufianeelbiki1/ForecastLab/pull/10): duplicate
  manifest/locator/license-reference/frame safeguards. Merge
  `59b5d119dad82a486914051e967aeb2b9da7c311`;
  [post-merge CI](https://github.com/soufianeelbiki1/ForecastLab/actions/runs/34755564721)
  passed all 32 tests. No person-identity deduplication claim.

## Exact blockers and budget rules

1. **Browser:** a local Chromium route now verifies portfolio and RetailIntel
   layouts at desktop, phone portrait and phone landscape widths, including
   keyboard interactions, reduced/coarse-pointer behavior, overflow/clipping,
   console errors and axe WCAG checks. The portfolio email control retains the
   intended `mailto:` URL; opening a real mail application and delivery remain
   outside automated verification. Nexus now passes the same geometry and axe
   checks through 320 px on its production deployment.
2. **Railway:** the user's matching project screenshot confirmed a finite Trial
   on 2026-09-12, not permanent free hosting or today's allowance. Live recheck
   on 2026-09-19 shows AtlasPay Python and Java healthy, actively consuming
   resources and still tracking **main** with `checkSuites=false`. Exact watch
   paths now prevent an unrelated or Java-only change from rebuilding the
   Python API. The workflow-only #30, #24 and #23 merges produced explicit
   `SKIPPED` records for both services without replacing their active
   deployments. The
   official Wait for CI requirements are met, but the available control path
   stages that setting as an environment change whose acceptance triggers a
   deployment. The staged investigation was discarded and production was
   re-read unchanged. The exact remaining credit is still unavailable; #38
   contains Java runtime changes and would still deploy that service. Verify
   the allowance before merging to main.
3. **Vercel:** the official [Hobby rules](https://vercel.com/docs/plans/hobby),
   last updated 2026-09-14 and rechecked 2026-09-20, still restrict Hobby to
   non-commercial personal use. A read-only portfolio deployment query found no
   deployment newer than 2026-08-31. Nexus is GitHub-linked; the portfolio is
   not. Do not publish freelance-services marketing without eligible terms.
4. **Alternative hosting:** Netlify Free remains a candidate, not a connected,
   account-verified release route. Do not create accounts, enable auto-recharge,
   upgrade, buy domains or provision resources. Keep demos static/local where
   possible; inspect costs and side effects before any cloud action.
5. **GitHub metadata:** descriptions/topics were empty in the prior scoped audit;
   the connected interface has no metadata-edit operation. Manual About/settings
   curation is separate from code work. Do not repeat this request every run.

## Next priorities

1. Establish an eligible zero-cost commercial hosting route for the portfolio,
   then review and release #11 without changing its verified UI scope.
2. Verify a no-cost release route, then release the consolidated AtlasPay #38.
   Nexus fixture-only filters remain covered by CI and are not represented as
   live authenticated functionality.
   No bypass, forced push, silently disabled service or trial/plan change.
3. Refresh public evidence entry points to the verified revisions; curate the
   supporting repositories only where they add distinct evidence. Never invent
   client adoption, scale, production benchmarks or personal experience.

Completion: three polished reproducible flagship case studies, a distinctive
responsive portfolio with working contacts, curated profile, reliable CI and
permitted zero-cost verified demos. Then switch to targeted maintenance.

Historical details are preserved in the [September 12–13 archive](progress/2026-09-12-13.md).
The latest merge and verification trail is in the
[September 20 log](progress/2026-09-20.md). The preceding Vercel and PR audit is
in the [September 19 log](progress/2026-09-19.md).
