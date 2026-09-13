# Recruiter-readiness backlog and evidence

Updated: 2026-09-13. Backend-first full-stack/platform engineering: Java/Spring
Boot, TypeScript/React/Next.js, PostgreSQL, data workflows and reliability.
Budget: zero additional spend. Simulations and synthetic results stay labelled.

## Latest completed work

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
was verified in a real 1363×936 browser: live authenticated data rendered with
no horizontal overflow, semantic landmarks were exposed, and a reload advanced
the producer timestamp, proving runtime data was not frozen at build. Mobile and
the conditional transaction filter remain unverified.

[AtlasPay #39](https://github.com/soufianeelbiki1/AtlasPay/pull/39) is merged into
the existing **#38 review branch, not main**, at
`e6ba5557e8572a4c013a40bfe0b407129916daa8`. Validation and idempotency behavior
are now tested together. Eight added HTTP/database cases verify rejected input
does not consume a key, invalid retries still validate, corrected/identical
requests preserve one decision/event, and identifier length boundaries persist
without truncation. No unrelated changes or workflow modifications.

[Combined-head Java 21 CI](https://github.com/soufianeelbiki1/AtlasPay/actions/runs/34761993013)
passes **36 tests, zero failures/errors/skips**: 12 real-server HTTP/PostgreSQL
cases, three PostgreSQL concurrency/rollback cases, 14 MVC cases, three service
cases and four authentication cases. Root Python and container checks also pass.
Local diff/whitespace checks pass and the reviewed local/remote trees match;
Maven/Docker execution is CI-based, not falsely claimed local. The
[walkthrough](https://github.com/soufianeelbiki1/AtlasPay/blob/e6ba5557e8572a4c013a40bfe0b407129916daa8/java-service/docs/LOCAL_WALKTHROUGH.md)
and [three case studies](CASE_STUDIES.md) describe the combined evidence.

AtlasPay main stays at `7990d04f2485b9cf46ab5c540b0418a128b48a7b`.
No production merge, deployment, hosted database/API/model call or paid resource.

## Current release state

| Work | State and evidence | Remaining gate |
| --- | --- | --- |
| [Portfolio #11](https://github.com/soufianeelbiki1/portfolio/pull/11) | Draft React Bits redesign; static HTML/React/TypeScript; 20 Python and four DOM tests, typecheck and build rechecked locally | Real desktop/mobile, keyboard, reduced-motion and contact-path verification; eligible hosting |
| [AtlasPay #38](https://github.com/soufianeelbiki1/AtlasPay/pull/38) | Ready combined Java correctness branch; 36 Java tests and root/container checks pass | Current zero-cost main deployment effects |
| [AtlasPay #37](https://github.com/soufianeelbiki1/AtlasPay/pull/37) | Ready documentation PR; checks pass | Same main auto-deployment gate |
| [Nexus #26](https://github.com/soufianeelbiki1/Nexus/pull/26) | Ready at `372a9a41607cd07c59e4cfefbecc7c046383a313`; reproducible Node 24, dynamic rendering, truthful operator guide and all six checks pass; desktop preview verified | Mobile/filter QA and production API/deployment effects |
| [Nexus #25](https://github.com/soufianeelbiki1/Nexus/pull/25) | Merged into #26 review branch; not main | Released only when #26 clears its remaining gates |
| [RetailIntel #6](https://github.com/soufianeelbiki1/RetailIntel/pull/6) | Draft at `400f9f41520feca7392d4a472049db23eb2c6792`; baseline evaluation, installed wheel, JSON report and uncertainty table; Python 3.11/3.12 CI pass | Desktop/mobile table and keyboard QA; release-effect verification |

All scoped open PRs, latest file diffs, checks and comments were inspected before
this change, including dependency PRs. No review comments were pending. Do not
blindly merge runtime-major upgrades: Nexus Node 26 suggestions conflict with
the reviewed Node 24 runtime alignment. Recheck heads before every write/merge.

## Already merged to main

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

1. **Browser:** supported browser still returns `ERR_BLOCKED_BY_CLIENT` for the
   local portfolio preview (rechecked 2026-09-13). DOM tests and static builds do
   not establish responsive geometry, real keyboard traversal or mail-client
   behavior. No alternate control/network bypass or unverified UI merge.
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
2. Verify a no-cost release route, then integrate AtlasPay #37/#38. Verify Nexus
   #26 on mobile and its conditional filter before its main release. No bypass,
   forced push, silently disabled service or trial/plan change.
3. Verify RetailIntel's uncertainty table and release the existing coherent
   data/business case study; no further dashboard feature scope first.
4. Refresh public evidence entry points to the verified revisions; curate the
   supporting repositories only where they add distinct evidence. Never invent
   client adoption, scale, production benchmarks or personal experience.

Completion: three polished reproducible flagship case studies, a distinctive
responsive portfolio with working contacts, curated profile, reliable CI and
permitted zero-cost verified demos. Then switch to targeted maintenance.

Historical details are preserved in the [September 12–13 archive](progress/2026-09-12-13.md).
