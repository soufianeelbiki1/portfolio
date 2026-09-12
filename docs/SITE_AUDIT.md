# Project hub audit

Source reviewed: portfolio main `fbad73f4c3f530a8840e13336830635a4825cc47`,
2026-09-12. This is a source/navigation audit, not public browser verification.
No hosting configuration or public copy changed during the audit.

## Findings and implementation order

1. **Java is hidden in the main presentation.** README mentions the Java 21 /
   Spring Boot authorization boundary, but the AtlasPay feature card only names
   FastAPI. Present the Java boundary alongside the Python system without
   implying Java owns the entire payment simulation. Link reproducible HTTP,
   replay, concurrency and rollback evidence; the new correctness work remains
   in unmerged AtlasPay #38/#39 and must be labelled accordingly.
2. **Contact currently means GitHub only.** The main page has no email or
   LinkedIn contact path. Add an accessible contact section using confirmed
   personal details, with a direct email link rather than a paid form backend.
   Verify keyboard and mobile behavior before publishing. Do not send outreach.
3. **Static reports are labelled LIVE.** The six demo pages contain fixed HTML
   snapshots rather than interactive product sessions. Replace runtime-looking
   badges with accurate snapshot labels and separate them from an actual live
   console. Never equate historical CI success with public end-to-end health.
4. **Report provenance is incomplete.** RetailIntel and AtlasRAG snapshots show
   metrics and say they derive from merged behavior, but do not pin the exact
   generator commit/command. Add traceable generation metadata, and prefer
   generating snapshots from source over manually maintaining result numbers.
   Do not present newer unmerged evaluation reports as published behavior.
5. **AtlasRAG metric label is misleading here too.** The portfolio snapshot and
   main page call the combined decision score "Abstention accuracy." AtlasRAG
   #11 corrects it to evidence decision accuracy. Update both surfaces together
   after source/report regeneration and desktop/mobile verification.
6. **Navigation coverage was shallow.** Prior CI checked that demo files exist,
   but did not inspect links inside each demo. The new offline tests resolve all
   local anchors/pages/styles/scripts/images across all HTML pages, reject
   root-escaping paths, duplicate IDs and empty placeholders, and prove failure
   detection using temporary fixtures. External/contact destinations still need
   public verification; passing these tests is not an accessibility audit.

## Visual direction for the next implementation

Keep a restrained editorial engineering identity: strong typography, generous
spacing, architecture/evidence panels and a single accent rather than repeated
gradient cards. Choose explicit visual references before implementation. Give
AtlasPay + Nexus, RetailIntel and AtlasRAG distinct, scannable case studies:
problem, design choice, demonstrated behavior, limitations, reproduce, source.
Put supporting experiments behind a smaller project index. Avoid manufactured
experience, production adoption, benchmark numbers, client testimonials or a
"senior" label unsupported by the user's actual record.

## Publishing gates

Netlify Free remains a candidate pending account access and exact plan/settings
verification. Vercel Hobby commercial use remains unresolved for freelance
service marketing. Railway releases remain held while billing/quota are unknown.
No paid domains, functions, models, APIs or cloud resources. Verify desktop and
mobile layout, keyboard navigation, contact links and demo interactions in a
supported browser before publishing UI changes.
