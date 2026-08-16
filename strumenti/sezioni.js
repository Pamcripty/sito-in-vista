#!/usr/bin/env node
/* Cattura una schermata per ogni sezione, così si controllano una a una. */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:4173/';
const FUORI = process.env.FUORI || '/tmp/sezioni';
const LARGHEZZA = Number(process.env.L || 1440);
const ALTEZZA = Number(process.env.H || 900);
const ESEGUIBILE = process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const BERSAGLI = process.env.SEL
  ? process.env.SEL.split(',')
  : [
      '#problema',
      '#soluzione',
      '.progetto--insegna',
      '.progetto--vetrina',
      '.progetto--cantiere',
      '#metodo',
      '.listino',
      '.valore',
      '#extra',
      '#adatto',
      '#domande',
      '#contatto',
    ];

const browser = await chromium.launch({ executablePath: ESEGUIBILE });
const pagina = await browser.newPage({ viewport: { width: LARGHEZZA, height: ALTEZZA } });
await mkdir(FUORI, { recursive: true });

await pagina.goto(BASE, { waitUntil: 'networkidle' });
await pagina.waitForTimeout(400);
// mostra subito tutto: le comparse non devono falsare il controllo
await pagina.evaluate(() => {
  document
    .querySelectorAll('[data-comparsa], .conseguenza, .citazione')
    .forEach((e) => e.setAttribute('data-visto', ''));
  // gli elementi fissi coprirebbero i ritagli di sezione
  const nascondi = document.createElement('style');
  nascondi.textContent = '.testata,.fisso,.salta{display:none !important}';
  document.head.appendChild(nascondi);
});
await pagina.waitForTimeout(700);

for (const sel of BERSAGLI) {
  const el = await pagina.$(sel);
  if (!el) {
    console.log(`⚠ non trovato: ${sel}`);
    continue;
  }
  await el.scrollIntoViewIfNeeded();
  await pagina.waitForTimeout(250);
  const nome = sel.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  await el.screenshot({ path: path.join(FUORI, `${LARGHEZZA}-${nome}.png`) });
  const box = await el.boundingBox();
  console.log(`${sel.padEnd(24)} ${Math.round(box.width)}×${Math.round(box.height)}`);
}

await browser.close();
