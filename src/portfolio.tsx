import { useEffect, useState } from 'react';
import SpotlightCard from './components/react-bits/SpotlightCard';
import Magnet from './components/react-bits/Magnet';

const github = 'https://github.com/soufianeelbiki1/';
const evidence = `${github}portfolio/blob/b6ae772ab2cec4c8ac43aaaee1752cfbd9920797/docs/CASE_STUDIES.md`;
const scenarios = {
  retry: { label: 'Same request', code: '200', state: 'REPLAY', title: 'Two requests. One decision.', note: 'An identical retry returns the original authorization. The database keeps one decision and one event.', request: 'key: demo-01 · amount: 120.00', response: 'original decision returned', color: 'mint', steps: ['Request repeated', 'Key matched', 'Original returned'], source: `${github}AtlasPay/pull/38` },
  conflict: { label: 'Changed amount', code: '409', state: 'CONFLICT', title: 'A retry is not a new payment.', note: 'Reusing the key with a different amount produces a conflict. The first decision remains unchanged.', request: 'key: demo-01 · amount: 180.00', response: 'conflict · original unchanged', color: 'orange', steps: ['Amount changed', 'Payload differs', 'Write rejected'], source: `${github}AtlasPay/pull/38` },
  outage: { label: 'API unavailable', code: '—', state: 'UNAVAILABLE', title: 'Make missing data visible.', note: 'When AtlasPay is unavailable, Nexus shows an unavailable state. It does not substitute synthetic values for live data.', request: 'Nexus → AtlasPay · no response', response: 'unavailable · no fixture fallback', color: 'lilac', steps: ['API unavailable', 'Read failed', 'State shown'], source: `${github}Nexus/pull/26` }
} as const;
type Scenario = keyof typeof scenarios;

function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>; }

function FailureLab({ reduced }: { reduced: boolean }) {
  const [selection, setSelection] = useState<Scenario>('retry');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const scenario = scenarios[selection];
  return <SpotlightCard className={`lab lab-${scenario.color}`} disabled={reduced}>
    <div className="lab-top"><span className="mono">SYSTEM NOTES / 001</span><span className="model-label">BROWSER MODEL</span></div>
    <div className="lab-signal" aria-hidden="true"><span className="signal-ring ring-one"/><span className="signal-ring ring-two"/><span className="signal-ring ring-three"/><span className="signal-axis"/><span className="signal-code">{scenario.code}</span></div>
    <div className="scenario-controls" role="group" aria-label="Explore a failure scenario">
      {(Object.keys(scenarios) as Scenario[]).map(key => <button key={key} type="button" disabled={!ready} aria-pressed={selection === key} onClick={() => setSelection(key)}>{scenarios[key].label}</button>)}
    </div>
    <div className="lab-result" role="status" aria-live="polite" aria-atomic="true">
      <div className="mono state-label">{scenario.state}</div><h3>{scenario.title}</h3><p>{scenario.note}</p>
      <ol className="trace">{scenario.steps.map((step, i) => <li key={step}><span className="mono">0{i + 1}</span>{step}</li>)}</ol>
      <div className="payload"><div><span>IN</span><code>{scenario.request}</code></div><div><span>OUT</span><code>{scenario.response}</code></div></div>
    </div>
    <div className="lab-bottom"><span>Illustrative states. No backend calls.</span><a href={scenario.source}>Inspect implementation <Arrow diagonal/></a></div>
    <noscript><p className="no-script-note">JavaScript is off. The example above shows an identical retry; all case studies and source links remain available.</p></noscript>
  </SpotlightCard>;
}

function ArchitectureMark({ variant }: { variant: 'payments' | 'retail' | 'rag' }) {
  return <div className={`architecture-mark ${variant}`} aria-hidden="true">{variant === 'payments' ? <><span>REQUEST</span><i/><b>↻</b><i/><span>DECISION</span></> : variant === 'retail' ? <><span className="mini-bars">{[24,46,35,70,48,91,57].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</span><span>OBSERVE / COMPARE</span></> : <><b>[01]</b><span className="evidence-lines"><i/><i/><i/></span><b>↗</b></>}</div>;
}

const snapshots = [
  ['atlaspay-nexus','AtlasPay + Nexus','Payment operations','Accepted, timeout and late-response paths.'],
  ['retailintel','RetailIntel','Inventory decisions','Synthetic demand, safety stock and replenishment.'],
  ['atlasrag','AtlasRAG','Evidence evaluation','Evidence decision accuracy, answerable grounding and safe abstention.'],
  ['atlasanalytics-risk','AtlasAnalytics','Risk evaluation','Chronological holdout, threshold trade-offs and PSI monitoring.'],
  ['experimentlab','ExperimentLab','Experiment decisions','Sample Ratio Mismatch, intervals and guardrails.'],
  ['forecastlab','ForecastLab','Photo policy evaluation','Synthetic observations; raw-image inference remains future work.']
];

export function Portfolio() {
  const [systemReduced, setSystemReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    const update = () => setSystemReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const reduced = systemReduced || paused;
  return <div className="folio" data-reduced-motion={reduced ? 'true' : 'false'}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="folio-header"><div className="folio-wrap nav-row">
      <a className="signature" href="#top" aria-label="Soufiane Elbiki, back to top"><span className="signature-mark" aria-hidden="true">se.</span><span>Soufiane Elbiki<span className="signature-caption">SOFTWARE ENGINEER</span></span></a>
      <nav aria-label="Primary"><a href="#systems">Selected work</a><a href="#demos">Snapshots</a><a href="#contact">Contact <Arrow diagonal/></a></nav>
    </div></header>
    <main id="main">
      <section className="folio-wrap intro" id="top" aria-labelledby="intro-heading">
        <div className="intro-meta mono"><span>BASED IN MOROCCO</span><span>BACKEND / FULL STACK / DATA</span><span className="edition">ENGINEERING FIELD NOTES — 01</span></div>
        <div className="intro-grid"><div><p className="intro-eyebrow"><span aria-hidden="true">✳</span> Thoughtful software. Visible decisions.</p>
          <h1 id="intro-heading">Calm systems.<br/><span>Clear decisions.</span></h1>
          <p className="intro-copy">I’m Soufiane. I build backend systems and the interfaces that make them understandable, especially when something goes wrong.</p>
          <div className="intro-actions"><a className="folio-button solid" href="#systems">Explore selected work <Arrow/></a><a className="plain-link" href={`${github}soufianeelbiki1`}>GitHub <Arrow diagonal/></a></div>
          <div className="stack-line mono"><span>JAVA / SPRING BOOT</span><span>REACT / NEXT.JS</span><span>POSTGRESQL</span></div>
        </div><div className="intro-aside"><div className="field-stamp" aria-hidden="true"><span>BUILD</span><b>↗</b><span>OBSERVE<br/>REFINE</span></div><p>From a payment retry<br/>to an uncertain forecast.<br/><strong>The behavior matters.</strong></p><span className="mono aside-index">SCROLL TO EXPLORE ↓</span></div></div>
      </section>
      <section className="system-section" id="systems" aria-labelledby="system-heading"><div className="folio-wrap">
        <div className="section-label mono"><span>01 / SYSTEMS THAT EXPLAIN THEMSELVES</span><span>ATLASPAY + NEXUS</span></div>
        <div className="system-grid"><div className="system-copy"><h2 id="system-heading">What happens <br/>on the <em>second</em> <br/>request?</h2><p>The interesting part of a system is often the part you hope never happens. Explore three small failure scenarios, then inspect the actual code and tests.</p>
          <div className="boundary-note"><span className="mono">THE IMPLEMENTATION</span><p>FastAPI payment simulation with a Java 21 / Spring Boot authorization boundary. Nexus adds a Next.js operator view with runtime contract validation.</p></div>
          <div className="folio-chips"><span className="chip">Java 21</span><span className="chip">Spring Boot</span><span className="chip">PostgreSQL</span><span className="chip">Next.js</span></div>
          <a className="plain-link" href={`${evidence}#1-atlaspay--nexus-making-payment-failures-inspectable`}>Read the engineering case study <Arrow diagonal/></a>
        </div><FailureLab reduced={reduced}/></div>
      </div></section>
      <section className="folio-wrap selected-work" aria-labelledby="work-heading">
        <div className="work-heading"><div><span className="section-label mono">02 / SELECTED WORK</span><h2 id="work-heading">Three problems.<br/>Different kinds of care.</h2></div><p>Implementation choices, reproducible checks and the limits of each experiment.</p></div>
        <article className="work-row" id="payments"><div className="work-number mono">01</div><div className="work-main"><span className="work-type mono">PAYMENTS & OPERATIONS</span><h3>AtlasPay <span>+ Nexus</span></h3><p>Preserve payment intent through retries and make failure states visible to an operator.</p><details><summary>Inside the design <span aria-hidden="true">+</span></summary><div className="decision-text"><p>ISO 8583 simulation, double-entry accounting and a transactional outbox. The Java authorization work verifies concurrent retries and rollback against real PostgreSQL; the Python-to-Nexus demo checks unavailable and recovery states.</p><p className="review-note">Latest correctness changes are in AtlasPay #38/#39 and Nexus #26. The browser model above is illustrative; these changes are not presented as deployed.</p><a href={evidence}>Pinned tests & reproduction <Arrow diagonal/></a></div></details><div className="work-links"><a href={`${github}AtlasPay`}>AtlasPay source <Arrow diagonal/></a><a href={`${github}Nexus`}>Nexus source <Arrow diagonal/></a></div></div><ArchitectureMark variant="payments"/></article>
        <article className="work-row" id="retail"><div className="work-number mono">02</div><div className="work-main"><span className="work-type mono">DATA & BUSINESS DECISIONS</span><h3>RetailIntel</h3><p>An inventory queue that makes forecast error and purchasing assumptions part of the decision.</p><details><summary>Inside the design <span aria-hidden="true">+</span></summary><div className="decision-text"><p>DuckDB transformations compare prior-only forecasting baselines using MAE and WAPE. Reproducible JSON reports carry input parameters and limitations alongside the result.</p><p className="review-note">Synthetic data. Forecast evaluation and dashboard changes remain in RetailIntel #6. No real-world savings or optimal inventory claim.</p><a href={evidence}>Pinned tests & reproduction <Arrow diagonal/></a></div></details><div className="work-links"><a href={`${github}RetailIntel`}>RetailIntel source <Arrow diagonal/></a><a href="/demos/retailintel.html">Report snapshot <Arrow/></a></div></div><ArchitectureMark variant="retail"/></article>
        <article className="work-row" id="retrieval"><div className="work-number mono">03</div><div className="work-main"><span className="work-type mono">APPLIED AI & EVALUATION</span><h3>AtlasRAG</h3><p>A citation-aware retrieval service that can say “not enough evidence” and prove why.</p><details><summary>Inside the design <span aria-hidden="true">+</span></summary><div className="decision-text"><p>Stable chunk IDs, lexical retrieval and deterministic evidence evaluation. An always-abstain counterexample ensures that refusing every question cannot look like a perfect system.</p><p className="review-note">Semantic/vector retrieval is still planned. The metric naming correction (#11) and failure breakdown (#12) are merged. Four synthetic regression cases do not establish broad model accuracy.</p><a href={evidence}>Pinned tests & reproduction <Arrow diagonal/></a></div></details><div className="work-links"><a href={`${github}AtlasRAG`}>AtlasRAG source <Arrow diagonal/></a><a href="/demos/atlasrag.html">Report snapshot <Arrow/></a></div></div><ArchitectureMark variant="rag"/></article>
      </section>
      <section className="archive-section" id="demos" aria-labelledby="demos-heading"><div className="folio-wrap"><div className="archive-heading"><div><span className="section-label mono">03 / OPEN THE NOTEBOOK</span><h2 id="demos-heading">The snapshot archive.</h2></div><p>These are fixed HTML snapshots, not live backend sessions. Each documents a synthetic scenario that you can reproduce from source.</p></div><div className="snapshot-list">{snapshots.map(([slug, repo, title, description], i) => <article className="snapshot" key={slug}><span className="mono snapshot-num">0{i+1}</span><div><h3><a href={`/demos/${slug}.html`}>{title} <Arrow/></a></h3><p>{description}</p></div><span className="status">STATIC</span><a className="snapshot-source" href={`${github}${repo === 'AtlasPay + Nexus' ? 'AtlasPay' : repo}`} aria-label={`${repo} source`}>{repo} <Arrow diagonal/></a></article>)}</div></div></section>
      <section className="folio-wrap approach" id="projects" aria-labelledby="approach-heading"><div><span className="section-label mono">04 / HOW I WORK</span><h2 id="approach-heading">Make it work.<br/>Make it explainable.</h2><p>Java and Spring Boot at the backend. React and Next.js where people interact. PostgreSQL, data workflows and operational checks connecting the pieces.</p></div><ol><li><span className="mono">01</span><div><h3>Start with the boundary.</h3><p>What must hold true? What should happen on a duplicate, timeout or partial failure?</p></div></li><li><span className="mono">02</span><div><h3>Leave a runnable trail.</h3><p>Local stacks, explicit inputs and tests that demonstrate meaningful behavior.</p></div></li><li><span className="mono">03</span><div><h3>Show the trade-off.</h3><p>Clear decisions and honest limitations, so the next engineer can reason about the system.</p></div></li></ol></section>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="folio-wrap"><div className="contact-meta mono"><span>LET’S BUILD SOMETHING USEFUL</span><span>INTERNATIONAL REMOTE / SCOPED PROJECTS</span></div><div className="contact-row"><h2 id="contact-heading">A good problem<br/>starts a conversation.</h2><a className="contact-arrow" href="mailto:elbikisoufiane@gmail.com" aria-label="Email Soufiane"><Magnet disabled={reduced}><Arrow diagonal/></Magnet></a></div><a className="email-link" href="mailto:elbikisoufiane@gmail.com">elbikisoufiane@gmail.com</a><p>Tell me about the system, the team and what needs to work better.</p></div></section>
    </main>
    <footer className="folio-wrap folio-footer"><span>Soufiane Elbiki · Engineering field notes</span><div><button type="button" disabled={systemReduced} aria-pressed={paused} aria-label="Pause decorative effects" onClick={()=>setPaused(!paused)}>Effects {reduced ? 'off' : 'on'}{systemReduced ? ' (device)' : ''}</button><a href={`${github}soufianeelbiki1`}>GitHub <Arrow diagonal/></a><a href="#top">Back to top ↑</a></div></footer>
  </div>;
}
