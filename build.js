#!/usr/bin/env node
/* =================================================================
   Sito in Vista — generatore del sito statico.
   Nessuna dipendenza: solo Node. Produce la cartella dist/,
   che è già pronta da caricare su qualsiasi hosting.
   ================================================================= */

import { readFile, writeFile, mkdir, rm, readdir, copyFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { documento } from './src/layout.js';
import { testata } from './src/sezioni/testata.js';
import { sezioneApertura } from './src/sezioni/apertura.js';
import { sezioneProblema } from './src/sezioni/problema.js';
import { sezioneSoluzione } from './src/sezioni/soluzione.js';
import { sezioneProgetti } from './src/sezioni/progetti.js';
import { sezioneMetodo } from './src/sezioni/metodo.js';
import { sezionePacchetti, sezioneExtra } from './src/sezioni/pacchetti.js';
import { sezioneAdatto } from './src/sezioni/adatto.js';
import { sezioneDomande } from './src/sezioni/domande.js';
import { sezioneChiusura, contattoFisso } from './src/sezioni/chiusura.js';
import { NUMERO_WHATSAPP, DOMINIO, marchio, meta } from './src/dati/sito.js';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(QUI, 'src');
const DIST = path.join(QUI, 'dist');

const impronta = (testo) => createHash('sha256').update(testo).digest('hex').slice(0, 8);

async function copiaCartella(da, a) {
  await mkdir(a, { recursive: true });
  for (const voce of await readdir(da, { withFileTypes: true })) {
    const origine = path.join(da, voce.name);
    const destino = path.join(a, voce.name);
    if (voce.isDirectory()) await copiaCartella(origine, destino);
    else await copyFile(origine, destino);
  }
}

/* --- fogli di stile: concatenati in ordine di nome ---------------- */
async function raccogliCss() {
  const cartella = path.join(SRC, 'stile');
  const file = (await readdir(cartella)).filter((f) => f.endsWith('.css')).sort();
  const pezzi = [];
  for (const f of file) pezzi.push(await readFile(path.join(cartella, f), 'utf8'));
  return pezzi.join('\n');
}

/* --- corpo della pagina ------------------------------------------ */
function corpoPagina() {
  return [
    testata(),
    '<main id="contenuto">',
    sezioneApertura(),
    sezioneProblema(),
    sezioneSoluzione(),
    sezioneProgetti(),
    sezioneMetodo(),
    sezionePacchetti(),
    sezioneExtra(),
    sezioneAdatto(),
    sezioneDomande(),
    '</main>',
    sezioneChiusura(),
    contattoFisso(),
  ].join('\n');
}

/* --- marca gli elementi da far comparire in scorrimento ----------
   Elenca qui le classi che devono entrare con la comparsa: il
   marcatore data-comparsa viene aggiunto in fase di costruzione.  */
const CLASSI_COMPARSA = [
  'intestazione',
  'punto',
  'passo',
  'pacchetto',
  'valore',
  'extra__voce',
  'bilancia__lato',
  'gruppo',
  'progetto__testa',
  'progetto__visuale',
  'progetto__corpo',
];

function segnaComparse(html) {
  return html.replace(
    /<(header|div|li|article|aside|section)\s+class="([^"]*)"/g,
    (intero, tag, classi) => {
      const elenco = classi.split(/\s+/);
      return CLASSI_COMPARSA.some((c) => elenco.includes(c))
        ? `<${tag} data-comparsa class="${classi}"`
        : intero;
    }
  );
}

/* --- file di contorno -------------------------------------------- */
function manifesto() {
  return JSON.stringify(
    {
      name: marchio.nome,
      short_name: marchio.nome,
      description: meta.descrizione,
      lang: 'it',
      start_url: './',
      display: 'standalone',
      background_color: '#F8F2E6',
      theme_color: '#083B3D',
      icons: [
        { src: 'marchio/icona-sito-in-vista.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: 'marchio/icona-180.png', sizes: '180x180', type: 'image/png' },
        { src: 'marchio/icona-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  );
}

function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${DOMINIO.replace(/\/$/, '')}/sitemap.xml\n`;
}

function sitemap() {
  const url = DOMINIO.replace(/\/$/, '');
  const oggi = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}/</loc><lastmod>${oggi}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`;
}

/* --- costruzione -------------------------------------------------- */
async function costruisci() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const css = await raccogliCss();
  const js = await readFile(path.join(SRC, 'sito.js'), 'utf8');
  const icona = (await readFile(path.join(SRC, 'marchio', 'icona-tonda.svg'), 'utf8'))
    .replace(/\n\s*/g, '')
    .replace(/ role="img" aria-label="[^"]*"/, '');

  const nomeCss = `stile.${impronta(css)}.css`;
  const nomeJs = `sito.${impronta(js)}.js`;

  let corpo = corpoPagina().split('%ICONA%').join(icona);
  corpo = segnaComparse(corpo);

  const html = documento({
    corpo,
    css: nomeCss,
    js: nomeJs,
    versione: new Date().toISOString(),
  });

  await writeFile(path.join(DIST, 'index.html'), html);
  await writeFile(path.join(DIST, nomeCss), css);
  await writeFile(path.join(DIST, nomeJs), js);
  await writeFile(path.join(DIST, 'manifesto.webmanifest'), manifesto());
  await writeFile(path.join(DIST, 'robots.txt'), robots());
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap());

  await copiaCartella(path.join(SRC, 'font'), path.join(DIST, 'font'));
  await copiaCartella(path.join(SRC, 'marchio'), path.join(DIST, 'marchio'));

  const social = path.join(SRC, 'social');
  try {
    await stat(social);
    await copiaCartella(social, path.join(DIST, 'social'));
  } catch {
    /* l'anteprima social viene generata da `npm run immagini` */
  }

  const peso = (t) => `${(Buffer.byteLength(t) / 1024).toFixed(1)} kB`;
  console.log('  Sito in Vista — costruito in dist/');
  console.log(`  index.html  ${peso(html)}`);
  console.log(`  ${nomeCss}  ${peso(css)}`);
  console.log(`  ${nomeJs}  ${peso(js)}`);

  if (!String(NUMERO_WHATSAPP).replace(/\D/g, '')) {
    console.log('');
    console.log('  ⚠  NUMERO WHATSAPP NON ANCORA INSERITO');
    console.log('     Apri src/dati/sito.js e compila NUMERO_WHATSAPP.');
    console.log('     Finché è vuoto i pulsanti aprono WhatsApp senza destinatario.');
  }
}

costruisci().catch((e) => {
  console.error(e);
  process.exit(1);
});
