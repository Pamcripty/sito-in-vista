#!/usr/bin/env node
/* Prova le interazioni vere: menu del telefono, ancore, contatto fisso. */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:4173/';
const ESEGUIBILE = process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const FUORI = '/tmp/interazioni';

let problemi = 0;
const segnala = (t) => { problemi += 1; console.log(`  ✗ ${t}`); };
const ok = (t) => console.log(`  ✓ ${t}`);

const browser = await chromium.launch({ executablePath: ESEGUIBILE });
await mkdir(FUORI, { recursive: true });

/* --- menu del telefono ------------------------------------------- */
{
  const pagina = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pagina.goto(BASE, { waitUntil: 'networkidle' });

  const tasto = pagina.locator('[data-menu]');
  await tasto.click();
  const apertoOra = await pagina.locator('#navigazione').isVisible();
  const aria = await tasto.getAttribute('aria-expanded');
  if (apertoOra && aria === 'true') ok('il menu si apre e dichiara aria-expanded=true');
  else segnala(`menu: visibile=${apertoOra} aria-expanded=${aria}`);
  await pagina.screenshot({ path: `${FUORI}/menu-aperto.png` });

  // Esc lo chiude
  await pagina.keyboard.press('Escape');
  const dopoEsc = await pagina.locator('#navigazione').isVisible();
  if (!dopoEsc) ok('Esc chiude il menu');
  else segnala('Esc non chiude il menu');

  // una voce porta alla sezione giusta e richiude il menu
  await tasto.click();
  await pagina.locator('#navigazione a[href="#pacchetti"]').click();
  await pagina.waitForTimeout(1200);
  const chiuso = !(await pagina.locator('#navigazione').isVisible());
  const posizione = await pagina.evaluate(() => {
    const s = document.getElementById('pacchetti').getBoundingClientRect().top;
    return Math.round(s);
  });
  if (chiuso) ok('scegliendo una voce il menu si richiude');
  else segnala('il menu resta aperto dopo la scelta');
  if (Math.abs(posizione) < 130) ok(`l’ancora #pacchetti arriva a ${posizione}px dal bordo alto`);
  else segnala(`l’ancora #pacchetti si ferma a ${posizione}px dal bordo alto`);

  // la barra WhatsApp compare dopo l'apertura
  const barra = await pagina.locator('[data-fisso]').getAttribute('data-visibile');
  if (barra !== null) ok('la barra WhatsApp è visibile dopo l’apertura');
  else segnala('la barra WhatsApp non compare');
  await pagina.screenshot({ path: `${FUORI}/telefono-pacchetti.png` });

  await pagina.close();
}

/* --- linguetta su desktop ---------------------------------------- */
{
  const pagina = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  await pagina.waitForTimeout(300);

  const primaDelloScorrimento = await pagina.locator('[data-fisso]').getAttribute('data-visibile');
  if (primaDelloScorrimento === null) ok('sulla copertina la linguetta resta nascosta');
  else segnala('la linguetta è già visibile sulla copertina');

  await pagina.evaluate(() => window.scrollTo(0, 2000));
  await pagina.waitForTimeout(600);
  const dopo = await pagina.locator('[data-fisso]').getAttribute('data-visibile');
  if (dopo !== null) ok('scorrendo la linguetta WhatsApp compare');
  else segnala('la linguetta non compare scorrendo');

  const attaccata = await pagina.locator('[data-testata]').getAttribute('data-attaccata');
  if (attaccata !== null) ok('la testata prende lo sfondo quando la pagina scorre');
  else segnala('la testata resta trasparente durante lo scorrimento');

  const voceAttiva = await pagina.evaluate(() => {
    const a = document.querySelector('.navigazione__lista a[aria-current="true"]');
    return a ? a.textContent.trim() : null;
  });
  if (voceAttiva) ok(`la voce di menu attiva è “${voceAttiva}”`);
  else segnala('nessuna voce di menu segnalata come attiva');

  await pagina.screenshot({ path: `${FUORI}/desktop-scorso.png` });

  // apertura di tutte le domande
  await pagina.evaluate(() =>
    document.querySelectorAll('.domanda').forEach((d) => { d.open = true; })
  );
  await pagina.locator('#domande').scrollIntoViewIfNeeded();
  await pagina.waitForTimeout(400);
  await pagina.locator('#domande').screenshot({ path: `${FUORI}/domande-aperte.png` });
  ok('domande aperte catturate per il controllo visivo');

  await pagina.close();
}

await browser.close();
console.log(problemi === 0 ? '\n✓ Interazioni a posto.\n' : `\n✗ ${problemi} problemi.\n`);
process.exit(problemi === 0 ? 0 : 1);
