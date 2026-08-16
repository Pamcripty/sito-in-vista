#!/usr/bin/env node
/* =================================================================
   Genera le immagini derivate dal marchio:
   - src/social/anteprima.png   (1200×630, anteprima per WhatsApp e social)
   - src/marchio/favicon-32.png (icona di riserva per i browser vecchi)
   - src/marchio/icona-180.png  (icona per iPhone e iPad)
   - src/marchio/icona-512.png  (icona per l'installazione su telefono)

   Va rilanciato solo se cambiano il marchio o i testi dell'anteprima.
   ================================================================= */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const RADICE = path.join(QUI, '..');
const ESEGUIBILE = process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({ executablePath: ESEGUIBILE });

/* --- anteprima social ------------------------------------------- */
await mkdir(path.join(RADICE, 'src', 'social'), { recursive: true });
{
  const pagina = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await pagina.goto(pathToFileURL(path.join(QUI, 'anteprima.html')).href, {
    waitUntil: 'networkidle',
  });
  await pagina.waitForTimeout(400);
  await pagina.screenshot({ path: path.join(RADICE, 'src', 'social', 'anteprima.png') });
  console.log('  src/social/anteprima.png      1200×630');
  await pagina.close();
}

/* --- icone quadrate --------------------------------------------- */
const ICONE = [
  { file: 'favicon-32.png', lato: 32, sorgente: 'favicon.svg' },
  { file: 'icona-180.png', lato: 180, sorgente: 'icona-tonda.svg' },
  { file: 'icona-512.png', lato: 512, sorgente: 'icona-sito-in-vista.svg' },
];

for (const i of ICONE) {
  const pagina = await browser.newPage({
    viewport: { width: i.lato, height: i.lato },
    deviceScaleFactor: 1,
  });
  const svg = pathToFileURL(path.join(RADICE, 'src', 'marchio', i.sorgente)).href;
  await pagina.setContent(
    `<style>html,body{margin:0;background:transparent}img{display:block;width:${i.lato}px;height:${i.lato}px}</style><img src="${svg}">`,
    { waitUntil: 'networkidle' }
  );
  await pagina.screenshot({
    path: path.join(RADICE, 'src', 'marchio', i.file),
    omitBackground: true,
  });
  console.log(`  src/marchio/${i.file.padEnd(18)} ${i.lato}×${i.lato}`);
  await pagina.close();
}

await browser.close();
console.log('\n  Rilancia `npm run build` per copiarle in dist/.');
