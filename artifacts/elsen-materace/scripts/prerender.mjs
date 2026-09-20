// Wstrzykuje wyrenderowany HTML do szablonu wygenerowanego przez `vite build`.
// Uruchamiane po obu buildach (klient + ssr), na końcu skryptu `build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist', 'public');
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js');

const ORIGIN = 'https://elsen.com.pl';

// Trasa -> plik wyjściowy i adres kanoniczny. Szablon niesie kanoniczny adres strony
// głównej, więc bez podmiany każda podstrona wskazywałaby na "/" i wypadałaby z indeksu.
// `canonical: null` znaczy: usuń znacznik — 404 i strona podziękowania nie mają być indeksowane.
const ROUTES = [
  { url: '/', out: 'index.html', canonical: `${ORIGIN}/` },
  { url: '/dziekujemy', out: path.join('dziekujemy', 'index.html'), canonical: null, noindex: true },
  { url: '/polityka-prywatnosci', out: path.join('polityka-prywatnosci', 'index.html'), canonical: `${ORIGIN}/polityka-prywatnosci/` },
  // Serwowana przez Apache jako ErrorDocument 404 — stąd plik w korzeniu, nie katalog.
  { url: '/404', out: '404.html', canonical: null, noindex: true },
];

const templatePath = path.join(clientDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[prerender] brak dist/public/index.html — najpierw `vite build`');
  process.exit(1);
}
if (!fs.existsSync(serverEntry)) {
  console.error('[prerender] brak dist/server/entry-server.js — najpierw `vite build --ssr`');
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');

/* Arkusz stylów blokuje renderowanie: przeglądarka nie pokaże nic, dopóki go nie pobierze.
   Na telefonie kosztowało to kilka sekund. Wbudowujemy go w HTML — jedno żądanie mniej
   na ścieżce krytycznej. Odwołania w CSS są absolutne (/fonts/...), więc działają bez zmian. */
const linkRe = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/;
const linkMatch = template.match(linkRe);
if (linkMatch) {
  const cssPath = path.join(clientDir, linkMatch[1].replace(/^\//, ''));
  if (fs.existsSync(cssPath)) {
    const css = fs.readFileSync(cssPath, 'utf8').replace(/<\/style/gi, '<\\/style');
    template = template.replace(linkRe, `<style>${css}</style>`);
    console.log(`[prerender] CSS wbudowany w HTML (${(css.length / 1024).toFixed(1)} kB) — usunieto zadanie blokujace`);
  } else {
    console.warn(`[prerender] nie znaleziono ${cssPath} — CSS zostaje jako osobne zadanie`);
  }
} else {
  console.warn('[prerender] nie znaleziono znacznika <link rel="stylesheet"> — pomijam wbudowanie CSS');
}

const { render } = await import(pathToFileURL(serverEntry).href);

const PLACEHOLDER = '<div id="root"></div>';
if (!template.includes(PLACEHOLDER)) {
  console.error(`[prerender] nie znaleziono ${PLACEHOLDER} w szablonie`);
  process.exit(1);
}

const CANONICAL_RE = /\s*<link rel="canonical" href="[^"]*" \/>/;
const OG_URL_RE = /(<meta property="og:url" content=")[^"]*(" \/>)/;
const ROBOTS_RE = /(<meta name="robots" content=")[^"]*(" \/>)/;

for (const { url, out, canonical, noindex } of ROUTES) {
  const appHtml = render(url);
  let html = template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`);

  if (canonical) {
    html = html.replace(CANONICAL_RE, `
    <link rel="canonical" href="${canonical}" />`);
    html = html.replace(OG_URL_RE, `$1${canonical}$2`);
  } else {
    html = html.replace(CANONICAL_RE, '');
  }

  if (noindex) {
    html = html.replace(ROBOTS_RE, '$1noindex, follow$2');
  }
  const dest = path.join(clientDir, out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html, 'utf8');
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`[prerender] ${url.padEnd(24)} -> ${out.padEnd(34)} ${kb} kB`);
}

// Katalog serwerowy jest potrzebny tylko w trakcie budowania.
fs.rmSync(path.join(root, 'dist', 'server'), { recursive: true, force: true });
console.log('[prerender] gotowe');
