#!/usr/bin/env node
/* Cattura le schermate del sito per il controllo visivo.
   Solo strumento di lavoro: non serve per pubblicare. */

import { apriBrowser } from './browser.js';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:4173/';
const FUORI = process.env.FUORI || '/tmp/schermate';
const SOLO = process.argv[2];

const VISTE = [
  { nome: 'desktop', larghezza: 1440, altezza: 900 },
  { nome: 'laptop', larghezza: 1180, altezza: 800 },
  { nome: 'tablet', larghezza: 820, altezza: 1100 },
  { nome: 'telefono', larghezza: 390, altezza: 844 },
  { nome: 'telefono-piccolo', larghezza: 320, altezza: 720 },
];

const browser = await apriBrowser();
await mkdir(FUORI, { recursive: true });

for (const v of VISTE) {
  if (SOLO && v.nome !== SOLO) continue;
  const pagina = await browser.newPage({
    viewport: { width: v.larghezza, height: v.altezza },
    deviceScaleFactor: 1,
  });
  const errori = [];
  pagina.on('console', (m) => m.type() === 'error' && errori.push(m.text()));
  pagina.on('pageerror', (e) => errori.push(String(e)));

  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  await pagina.waitForTimeout(900);

  // apre tutte le domande così si vede anche il contenuto aperto
  await pagina.screenshot({ path: path.join(FUORI, `${v.nome}-intero.png`), fullPage: true });

  // riquadri sopra la piega
  await pagina.screenshot({ path: path.join(FUORI, `${v.nome}-apertura.png`) });

  // controllo scorrimento orizzontale
  const misure = await pagina.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    corpo: document.body.scrollWidth,
  }));

  console.log(
    `${v.nome.padEnd(18)} ${v.larghezza}px  scrollWidth=${misure.scroll} clientWidth=${misure.client}` +
      (misure.scroll > misure.client + 1 ? '  ⚠ OVERFLOW' : '  ok') +
      (errori.length ? `  ⚠ errori: ${errori.join(' | ')}` : '')
  );

  await pagina.close();
}

await browser.close();
