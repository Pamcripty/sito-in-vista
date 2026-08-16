/* Avvio del browser condiviso dagli strumenti di controllo.

   In locale il contenitore ha già Chromium installato in una posizione
   nota, e la si usa direttamente. Su GitHub Actions (o su una macchina
   qualsiasi dopo `npx playwright install chromium`) quella posizione non
   esiste: in quel caso decide Playwright.

   Si può forzare un percorso con la variabile d'ambiente CHROMIUM. */

import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const CANDIDATI = [
  process.env.CHROMIUM,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
].filter(Boolean);

export function apriBrowser(opzioni = {}) {
  const trovato = CANDIDATI.find((p) => existsSync(p));
  return chromium.launch(trovato ? { ...opzioni, executablePath: trovato } : opzioni);
}
