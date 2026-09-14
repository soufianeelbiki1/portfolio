import { build } from 'esbuild';
import { mkdir, readFile, writeFile, mkdtemp, rm, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

const temporary = await mkdtemp(join(tmpdir(), 'portfolio-render-'));
try {
  await mkdir('assets', { recursive: true });
  const shared = { bundle: true, jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'linked' };
  await build({ ...shared, entryPoints: ['src/render.tsx'], platform: 'node', format: 'cjs', outfile: join(temporary, 'render.cjs') });
  const { render } = await import(pathToFileURL(join(temporary, 'render.cjs')));
  await build({ ...shared, entryPoints: ['src/client.tsx'], platform: 'browser', format: 'esm', target: ['es2022'], minify: true, outfile: 'assets/portfolio.js' });
  const legalPath = 'assets/portfolio.js.LEGAL.txt';
  await writeFile(legalPath, (await readFile(legalPath, 'utf8')) + '\nReact Bits — SpotlightCard and Magnet, adapted from commit 3a1c7f2f9f94ed833934ab5c2635760b9e644583.\n\n' + await readFile('third-party/react-bits-LICENSE.md', 'utf8'));
  await cp('src/portfolio.css', 'assets/portfolio.css');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Soufiane Elbiki — Software Engineer</title>
<meta name="description" content="Java, Spring Boot, React and PostgreSQL. Explore Soufiane Elbiki's payment systems, data workflows and applied AI engineering projects.">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/assets/portfolio.css">
</head><body class="portfolio-home"><div id="portfolio-root">${render()}</div><script type="module" src="/assets/portfolio.js"></script></body></html>\n`;
  await writeFile('index.html', html);
  await writeFile('assets/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#b73c20"/><text x="9" y="44" font-family="Arial,sans-serif" font-size="35" font-weight="700" fill="#fff6e9">se.</text></svg>\n');
  const js = await readFile('assets/portfolio.js');
  const gzipKB = gzipSync(js).length / 1024;
  if (gzipKB > 90) throw new Error(`Interaction bundle exceeds 90 KiB gzip budget: ${gzipKB.toFixed(1)}`);
  // A static host can publish dist/ without exposing source or node_modules.
  await mkdir('dist', { recursive: true });
  for (const item of ['index.html', 'styles.css', 'assets', 'demos', 'third-party']) await cp(item, resolve('dist', item), { recursive: true });
  console.log(`Static HTML + local assets built. Client JS: ${gzipKB.toFixed(1)} KiB gzip. No runtime server or API needed.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
