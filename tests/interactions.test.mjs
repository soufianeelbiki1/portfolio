import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const bundle = await readFile(new URL('../assets/portfolio.js', import.meta.url), 'utf8');

// DOM integration checks against the generated production bundle. This does
// not claim browser layout, keyboard emulation, or screen-reader verification.
async function open(t, reduced = false) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error));
  virtualConsole.on('error', error => errors.push(error));
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'https://portfolio.test/', virtualConsole });
  const { window } = dom;
  const listeners = new Set();
  window.matchMedia = () => ({ matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) });
  let requests = 0;
  window.fetch = () => { requests++; throw new Error('The browser model must make no API calls'); };
  t.after(() => { window.close(); assert.deepEqual(errors, []); assert.equal(requests, 0); });
  window.eval(bundle);
  const waitFor = async predicate => {
    for (let i=0; i<50; i++) { if(predicate()) return; await new Promise(resolve=>setTimeout(resolve, 10)); }
    assert.fail('Hydrated view did not reach the expected state');
  };
  await waitFor(()=>!window.document.querySelector('.scenario-controls button').disabled);
  return { document: window.document, waitFor, updatePreference: value => { for(const listener of listeners) listener({ matches: value }); } };
}

test('HTML contains all project, contact and case-study paths without JavaScript', () => {
  const dom = new JSDOM(html); const document = dom.window.document;
  assert.equal(document.querySelectorAll('.snapshot').length, 6);
  assert.equal(document.querySelectorAll('.work-row').length, 3);
  assert.equal(document.querySelector('h1').textContent, 'Calm systems.Clear decisions.');
  assert.ok(document.querySelector('a[href="mailto:elbikisoufiane@gmail.com"]'));
  assert.ok(document.querySelector('a[href*="CASE_STUDIES.md"]'));
  assert.ok(document.querySelector('.lab-result').textContent.includes('One decision.'));
  assert.ok(document.querySelector('noscript').textContent.includes('JavaScript is off'));
  dom.window.close();
});

test('production hydration switches retry, conflict and outage with accurate source links', async t => {
  const { document, waitFor } = await open(t);
  const buttons = [...document.querySelectorAll('.scenario-controls button')];
  const state = () => document.querySelector('.state-label').textContent;
  for(const [index, expected, source] of [[1,'CONFLICT','AtlasPay/pull/38'],[2,'UNAVAILABLE','Nexus/pull/26'],[0,'REPLAY','AtlasPay/pull/38']]) {
    buttons[index].click(); await waitFor(()=>state()===expected);
    assert.equal(document.querySelectorAll('.scenario-controls [aria-pressed="true"]').length, 1);
    assert.equal(buttons[index].getAttribute('aria-pressed'), 'true');
    assert.ok(document.querySelector('.lab-bottom a').href.endsWith(source));
  }
  assert.equal(document.querySelector('.lab-result').getAttribute('aria-live'), 'polite');
});

test('reduced-motion preference disables decorative effects without disabling the model', async t => {
  const { document, waitFor } = await open(t, true);
  assert.equal(document.querySelector('.folio').dataset.reducedMotion, 'true');
  assert.equal(document.querySelector('.card-spotlight').dataset.motion, 'off');
  assert.equal(document.querySelector('.magnet').dataset.motion, 'off');
  assert.equal(document.querySelector('[aria-label="Pause decorative effects"]').disabled, true);
  document.querySelectorAll('.scenario-controls button')[1].click();
  await waitFor(()=>document.querySelector('.state-label').textContent==='CONFLICT');
});

test('a visitor can pause and resume decorative effects', async t => {
  const { document, waitFor } = await open(t);
  await waitFor(()=>document.querySelector('.folio').dataset.reducedMotion==='false');
  const toggle = document.querySelector('[aria-label="Pause decorative effects"]');
  toggle.click(); await waitFor(()=>document.querySelector('.folio').dataset.reducedMotion==='true');
  assert.equal(toggle.getAttribute('aria-pressed'), 'true');
  toggle.click(); await waitFor(()=>document.querySelector('.folio').dataset.reducedMotion==='false');
  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
});
