// Wstrzykuje wyrenderowany HTML do szablonu wygenerowanego przez `vite build`.
// Uruchamiane po obu buildach (klient + ssr), na końcu skryptu `build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist', 'public');
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js');

// Trasa -> plik wyjściowy. Strona główna nadpisuje index.html,
// pozostałe trafiają do własnych katalogów, żeby serwer statyczny je znalazł.
const ROUTES = [
  { url: '/', out: 'index.html' },
  { url: '/dziekujemy', out: path.join('dziekujemy', 'index.html') },
  { url: '/polityka-prywatnosci', out: path.join('polityka-prywatnosci', 'index.html') },
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

for (const { url, out } of ROUTES) {
  const appHtml = render(url);
  const html = template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`);
  const dest = path.join(clientDir, out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html, 'utf8');
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`[prerender] ${url.padEnd(24)} -> ${out.padEnd(34)} ${kb} kB`);
}

// Katalog serwerowy jest potrzebny tylko w trakcie budowania.
fs.rmSync(path.join(root, 'dist', 'server'), { recursive: true, force: true });
console.log('[prerender] gotowe');
