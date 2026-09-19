# Recruiter-readiness backlog and evidence

Updated: 2026-09-19. Backend-first full-stack/platform engineering: Java/Spring
Boot, TypeScript/React/Next.js, PostgreSQL, data workflows and reliability.
Budget: zero additional spend. Simulations and synthetic results stay labelled.

## Latest completed work

[RetailIntel #6](https://github.com/soufianeelbiki1/RetailIntel/pull/6) now
connects the forecast evaluation to the replenishment decision at
`0ede0d6ce04699917b71f9b557cd24e94a79ea3f`. The policy uses the same
prior-only seven-day mean that the holdout scores, rather than a separate
unscored 28-day mean. Demand is selected at or before the inventory snapshot,
and evidence observed after that snapshot is withheld. The queue places both
baselines' SKU-level MAE, WAPE and sample count beside the proposed order while
retaining the separate 28-day volatility input for safety stock.

The exact local gate passes **33 tests**, lint, formatting, compilation,
deterministic JSON/dashboard generation and dependency checks. The
[exact-head CI](https://github.com/soufianeelbiki1/RetailIntel/actions/runs/34812439971)
passes the same 33 tests on Python 3.11 and 3.12 plus lint and formatting. New
regressions cover formula equivalence, lagged snapshots, matching evidence rows
and unscored point-in-time states. The PR stays draft because real
desktop/mobile and keyboard verification is still unavailable; no deployment
or paid resource was used.

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

[Nexus #25](https://github.com/soufianeelbiki1/Nexus/pull/25) is merged into the
existing **#26 review branch, not main**, at
`372a9a41607cd07c59e4cfefbecc7c046383a313`. The top-level README now gives a
short operator walkthrough, links implementation evidence, labels the hosted
stack as a simulation and distinguishes a finite Railway trial from permanent
hosting. A new test prevents broken local README/operator-guide links.

[Combined-head Nexus CI](https://github.com/soufianeelbiki1/Nexus/actions/runs/34782889919)
passes a clean Node 24 install, TypeScript, **21 tests**, production build and
non-root container. The [security/runtime checks](https://github.com/soufianeelbiki1/Nexus/actions/runs/34782889920)
and [authenticated outage/recovery demo](https://github.com/soufianeelbiki1/Nexus/actions/runs/34782889913)
also pass. The [Vercel preview](https://nexus-mchodvzdz-soufiane15.vercel.app/)
was rechecked in a real 1363×936 browser on 2026-09-19: live authenticated data
rendered with no horizontal overflow, semantic landmarks were exposed, and a
reload advanced the producer timestamp from 09:08:29 to 09:09:33, proving
runtime data was not frozen at build. Vercel reported no runtime error cluster
or warning/error/fatal log for the exact preview in the preceding 24 hours.
Mobile geometry remains unverified. The search/outcome filter is deliberately a
fixture-development interaction; the authenticated live view instead exposes
privacy-safe aggregates without identifier-bearing transaction rows.

[AtlasPay #37](https://github.com/soufianeelbiki1/AtlasPay/pull/37) and
[AtlasPay #39](https://github.com/soufianeelbiki1/AtlasPay/pull/39) are merged
into the existing **#38 review branch, not main**, at
`9e04930d863abd88a0c6813c8c32aa878869e204`. The root README now leads with the
Java/Spring Boot boundary, links directly to the reproducible retry/HTTP
evidence, separates Python and Java startup paths and states finite-trial hosting
limits. A regression test rejects broken or repository-escaping local README
links. Validation and idempotency behavior remain tested together.

[Combined-head Java 21 CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/34785966552)
passes **36 tests, zero failures/errors/skips**: 12 real-server HTTP/PostgreSQL
cases, three PostgreSQL concurrency/rollback cases, 14 MVC cases, three service
cases and four authentication cases. [Root CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/34785966473)
passes lint/format, all migrations, **105 Python/PostgreSQL tests**, runtime-image
build and non-root verification. Local diff, format and README-link checks pass;
Maven/Docker execution is CI-based, not falsely claimed local. The
[walkthrough](https://github.com/soufianeelbiki1/AtlasPay/blob/9e04930d863abd88a0c6813c8c32aa878869e204/java-service/docs/LOCAL_WALKTHROUGH.md)
and [three case studies](CASE_STUDIES.md) describe the combined evidence.

AtlasPay main stays at `7990d04f2485b9cf46ab5c540b0418a128b48a7b`.
No production merge, deployment, hosted database/API/model call or paid resource.

## Current release state

| Work | State and evidence | Remaining gate |
| --- | --- | --- |
| [Portfolio #11](https://github.com/soufianeelbiki1/portfolio/pull/11) | Draft React Bits redesign; static HTML/React/TypeScript; 20 Python and four DOM tests, typecheck and build rechecked locally | Real desktop/mobile, keyboard, reduced-motion and contact-path verification; eligible hosting |
| [AtlasPay #38](https://github.com/soufianeelbiki1/AtlasPay/pull/38) | Ready combined Java correctness/presentation branch at `9e04930d863abd88a0c6813c8c32aa878869e204`; 36 Java and 105 Python/PostgreSQL tests plus container checks pass | Current zero-cost main deployment effects |
| [AtlasPay #37](https://github.com/soufianeelbiki1/AtlasPay/pull/37) | Merged into #38 review branch; not main | Released only when #38 clears its deployment gate |
| [Nexus #26](https://github.com/soufianeelbiki1/Nexus/pull/26) | Ready at `372a9a41607cd07c59e4cfefbecc7c046383a313`; reproducible Node 24, dynamic rendering, truthful operator guide and all six checks pass; desktop preview and live refresh reverified 2026-09-19 | Mobile browser QA and final production deployment effects |
| [Nexus #25](https://github.com/soufianeelbiki1/Nexus/pull/25) | Merged into #26 review branch; not main | Released only when #26 clears its remaining gates |
| [RetailIntel #6](https://github.com/soufianeelbiki1/RetailIntel/pull/6) | Draft at `0ede0d6ce04699917b71f9b557cd24e94a79ea3f`; evaluated policy mean, point-in-time guards, per-SKU queue evidence, installed wheel and JSON report; exact-head Python 3.11/3.12 CI passes 33 tests | Desktop/mobile table and keyboard QA; release-effect verification |

All scoped open PRs, latest file diffs, checks and comments were inspected before
this change, including dependency PRs. No review comments were pending. Do not
blindly merge runtime-major upgrades: Nexus Node 26 suggestions conflict with
the reviewed Node 24 runtime alignment. Nexus #27 and #28 currently fail because
Dependabot split peer-dependent React type/runtime upgrades; #29 is green but
must not be treated as proof that the red fragments are independently safe.
Recheck heads before every write/merge.

## Already merged to main

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

1. **Browser:** the local portfolio preview still returns
   `ERR_BLOCKED_BY_CLIENT`. The public Nexus preview works, but the supported
   browser exposes only a fixed 1363×936 viewport. Nexus has explicit 820 px and
   520 px CSS breakpoints, but code inspection is not mobile browser evidence.
   DOM tests and static builds do not establish responsive geometry, real
   keyboard traversal or mail-client behavior. No alternate control/network
   bypass or unverified UI merge.
2. **Railway:** the user's matching project screenshot confirmed a finite Trial
   on 2026-09-12, not permanent free hosting or today's allowance. Read-only
   recheck on 2026-09-13 shows AtlasPay Python and Java still track **main**, with
   `checkSuites=false` and health checks. Only production is listed. No service,
   variable, deployment or billing setting was changed. The latest deployments
   for both AtlasPay services still reference the unchanged main commit above.
   Current remaining credit
   and release effects must be verified before merging to main.
3. **Vercel:** read-only recheck on 2026-09-13 shows Hobby; Nexus is GitHub-linked,
   `soufiane-portfolio` is not. [Hobby rules](https://vercel.com/docs/plans/hobby)
   require non-commercial personal use; do not publish freelance-services
   marketing without eligible terms. Nexus's automatic personal-project preview
   was inspected; the commercial portfolio was not deployed.
4. **Alternative hosting:** Netlify Free remains a candidate, not a connected,
   account-verified release route. Do not create accounts, enable auto-recharge,
   upgrade, buy domains or provision resources. Keep demos static/local where
   possible; inspect costs and side effects before any cloud action.
5. **GitHub metadata:** descriptions/topics were empty in the prior scoped audit;
   the connected interface has no metadata-edit operation. Manual About/settings
   curation is separate from code work. Do not repeat this request every run.

## Next priorities

1. Recover a permitted portfolio preview and verify desktop/mobile layout,
   keyboard navigation, reduced motion, three scenario controls and contact
   links. Keep #11 draft until actual browser evidence exists. Do not add effects.
2. Verify a no-cost release route, then release the consolidated AtlasPay #38.
   Verify Nexus #26 on mobile before its main release; fixture-only filters are
   covered by CI and are not represented as live authenticated functionality.
   No bypass, forced push, silently disabled service or trial/plan change.
3. Verify RetailIntel's updated queue and uncertainty evidence in a real
   desktop/mobile browser, then release the coherent data/business case study;
   no further dashboard feature scope first.
4. Refresh public evidence entry points to the verified revisions; curate the
   supporting repositories only where they add distinct evidence. Never invent
   client adoption, scale, production benchmarks or personal experience.

Completion: three polished reproducible flagship case studies, a distinctive
responsive portfolio with working contacts, curated profile, reliable CI and
permitted zero-cost verified demos. Then switch to targeted maintenance.

Historical details are preserved in the [September 12–13 archive](progress/2026-09-12-13.md).
The latest merge and verification trail is in the
[September 14 log](progress/2026-09-14.md). The current Vercel and PR audit is in
the [September 19 log](progress/2026-09-19.md).
