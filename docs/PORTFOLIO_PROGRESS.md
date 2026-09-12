# Recruiter-readiness backlog and evidence

Updated: 2026-09-12. Positioning: backend-first full-stack/platform engineering; Java/Spring Boot, TypeScript/Next.js, PostgreSQL, reliability and data workflows. Budget: zero additional spend. Project simulations and synthetic data must remain explicitly labelled.

## Progress / evidence

- Profile presentation previously published: [profile README](https://github.com/soufianeelbiki1/soufianeelbiki1). Do not infer professional scale or adoption from portfolio demos.
- AtlasPay flagship introduction: [draft #37](https://github.com/soufianeelbiki1/AtlasPay/pull/37), head `012f456b1806c1cb02f0b5f65e12247f40cd5ef4`. README diff reviewed; no inline comments; test and container checks successful. Not merged: Railway main auto-deployment budget eligibility remains unverified.
- Nexus operator walkthrough: [draft #25](https://github.com/soufianeelbiki1/Nexus/pull/25), head `7e410576559cc98f0944db1f7c7ef7c3f197c85e`. README diff reviewed; no inline comments. Build and container checks fail during dependency installation, not application tests.
- Nexus reproducible-build fix: [draft #26](https://github.com/soufianeelbiki1/Nexus/pull/26), commit `4a5fb9da9d9ecc29ec193e03be9cae0b083fd182`. Compatible React DOM types pinned, npm-generated dependency lock committed, Node 24 aligned in engines/CI/Docker, npm ci used in builds/audits/local instructions, lockfile changes trigger security checks. No forced peer resolution. Local clean install, typecheck, 20 tests and production build passed. Docker is unavailable locally. Remote build, container, dependency audit and runtime-smoke checks now pass; integrated demo check is still pending. Vercel automatically produced a READY [personal-demo preview](https://nexus-2fcsyova2-soufiane15.vercel.app) for this exact commit; public interactions are unverified (public fetch was blocked). No production merge or explicit deployment performed.

## Release gates / blockers

1. Inspect latest PR heads, diffs, checks and review comments before writes; do not create duplicate fix PRs. No active-run overlap.
2. Never bypass protected workflow approvals or required checks. Recheck exact head SHA before merging.
3. Railway billing and quota remain unverified; historical main tracking had checkSuites=false. Do not merge AtlasPay into an unverified auto-deployment path or change/shut down existing infrastructure.
4. Vercel team remains Hobby and Nexus project remains Node 24 (checked 2026-09-12). Personal-demo previews do not establish eligibility for a commercial freelance-services site. [Hobby rules](https://vercel.com/docs/plans/hobby) restrict use to non-commercial personal projects; verify a commercial-compatible free static route before publishing service marketing. No upgrades, trials, paid calls, paid resources or domains.
5. Deployment READY is not end-to-end proof. Test source unavailable/recovery states, credentials staying server-side, and key interactions. Any UI change requires desktop/mobile browser and accessibility verification.

## Ordered backlog

- **Next:** Finish #26 remote checks, inspect any failures, then verify no-cost release side effects before merge. Rebase/recheck #25 without losing its walkthrough.
- **AtlasPay + Nexus:** Make the Java service reproducible in an integrated local walkthrough. Verify authorization/idempotency/accounting boundaries from actual code and tests; show an operator investigation and outage/recovery, not invented production metrics.
- **RetailIntel:** Audit actual pipeline and demo; deliver a business decision walkthrough with reproducible synthetic inputs, data-quality checks and reconciled outputs.
- **AtlasRAG:** Audit retrieval/evaluation and citation correctness; add reproducible offline evaluation and honest failure examples with no paid model/API requirement.
- **Portfolio:** Audit existing static demos and contact paths, choose explicit visual references, implement a distinctive responsive design with three evidence-backed case studies. Publish only through confirmed zero-cost, permitted hosting.
- **Supporting repositories:** Curate AtlasAnalytics, ExperimentLab and ForecastLab around demonstrated engineering evidence rather than additional project count.

## Completion criteria

Three polished reproducible flagship case studies; distinctive responsive portfolio; working contact paths; curated GitHub profile; reliable CI; permitted zero-cost deployments and actual verified URLs. Once reached, switch to targeted maintenance rather than feature churn.
