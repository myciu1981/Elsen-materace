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
// `title` i `description` z tego samego powodu: szablon niesie tytuł i opis strony głównej,
// a podstrona z identycznym tytułem wygląda dla Google jak słabsza kopia strony głównej.
// Brak pól = zostają wartości z szablonu (strona główna).
const ROUTES = [
  { url: '/', out: 'index.html', canonical: `${ORIGIN}/` },
  {
    url: '/dziekujemy', out: path.join('dziekujemy', 'index.html'), canonical: null, noindex: true,
    title: 'Dziękujemy za zapytanie — ELSEN Materace',
    description: 'Otrzymaliśmy Twoje zapytanie o materac na wymiar. Odezwiemy się z wyceną.',
  },
  {
    url: '/polityka-prywatnosci', out: path.join('polityka-prywatnosci', 'index.html'), canonical: `${ORIGIN}/polityka-prywatnosci/`,
    title: 'Polityka prywatności — ELSEN Materace',
    description: 'Jak ELSEN Materace przetwarza dane osobowe z formularza wyceny: cel, podstawa prawna (RODO), okres przechowywania i prawa użytkownika.',
  },
  // Serwowana przez Apache jako ErrorDocument 404 — stąd plik w korzeniu, nie katalog.
  {
    url: '/404', out: '404.html', canonical: null, noindex: true,
    title: 'Nie znaleziono strony — ELSEN Materace',
    description: 'Strona o tym adresie nie istnieje. Wróć na stronę główną ELSEN Materace.',
  },
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
const TITLE_RE = /<title>[^<]*<\/title>/;
const DESCRIPTION_RE = /(<meta name="description" content=")[^"]*(" \/>)/;
const SOCIAL_TITLE_RE = /(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(" \/>)/g;
const SOCIAL_DESCRIPTION_RE = /(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(" \/>)/g;

// Znaczniki, których prerender musi dotknąć. Gdy któregoś zabraknie w szablonie,
// podmiana cicho by nie zadziałała i podstrona znów dostałaby tytuł strony głównej.
for (const [name, re] of Object.entries({ TITLE_RE, DESCRIPTION_RE, SOCIAL_TITLE_RE, SOCIAL_DESCRIPTION_RE })) {
  re.lastIndex = 0;
  if (!re.test(template)) {
    console.error(`[prerender] szablon nie pasuje do ${name}`);
    process.exit(1);
  }
  re.lastIndex = 0;
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const { url, out, canonical, noindex, title, description } of ROUTES) {
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

  // Funkcje zamiast łańcuchów zastępczych — `$` w treści nie zostanie wtedy potraktowany jako grupa.
  if (title) {
    const t = escapeAttr(title);
    html = html.replace(TITLE_RE, () => `<title>${t}</title>`);
    html = html.replace(SOCIAL_TITLE_RE, (_, a, b) => `${a}${t}${b}`);
  }
  if (description) {
    const d = escapeAttr(description);
    html = html.replace(DESCRIPTION_RE, (_, a, b) => `${a}${d}${b}`);
    html = html.replace(SOCIAL_DESCRIPTION_RE, (_, a, b) => `${a}${d}${b}`);
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
