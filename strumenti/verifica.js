#!/usr/bin/env node
/* =================================================================
   Controllo automatico del sito costruito:
   - nessuno scorrimento orizzontale a nessuna larghezza
   - nessun elemento che sborda dal riquadro
   - contrasto del testo sufficiente (WCAG AA)
   - contorni di messa a fuoco visibili con la tastiera
   - le domande si aprono e si chiudono da tastiera
   - i link esterni e le ancore puntano a qualcosa di reale
   - nessun errore in console
   ================================================================= */

import { apriBrowser } from './browser.js';

const BASE = process.env.BASE || 'http://localhost:4173/';
const LARGHEZZE = [320, 360, 390, 430, 540, 768, 820, 1024, 1180, 1280, 1440, 1680, 1920];

let problemi = 0;
const segnala = (t) => {
  problemi += 1;
  console.log(`  ✗ ${t}`);
};
const ok = (t) => console.log(`  ✓ ${t}`);

const browser = await apriBrowser();

/* ---------------------------------------------------------------- */
console.log('\nLARGHEZZE — scorrimento orizzontale e sbordamenti');
for (const larghezza of LARGHEZZE) {
  const pagina = await browser.newPage({ viewport: { width: larghezza, height: 900 } });
  const errori = [];
  pagina.on('pageerror', (e) => errori.push(String(e)));
  pagina.on('console', (m) => m.type() === 'error' && errori.push(m.text()));

  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  await pagina.evaluate(() =>
    document.querySelectorAll('[data-comparsa]').forEach((e) => e.setAttribute('data-visto', ''))
  );
  await pagina.waitForTimeout(300);

  const esito = await pagina.evaluate(() => {
    const doc = document.documentElement;
    const larghezza = doc.clientWidth;
    const sbordati = [];
    document.querySelectorAll('main *, header *, .chiusura *').forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position === 'fixed' || s.display === 'none') return;
      const b = el.getBoundingClientRect();
      if (b.width === 0) return;
      // gli angoli del mirino escono di proposito: sono decorativi
      if (el.closest('.mirino')) return;
      if (b.right > larghezza + 1 || b.left < -1) {
        sbordati.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} (${Math.round(b.left)}→${Math.round(b.right)})`);
      }
    });
    return {
      scroll: doc.scrollWidth,
      client: larghezza,
      sbordati: [...new Set(sbordati)].slice(0, 6),
    };
  });

  const scorre = esito.scroll > esito.client + 1;
  if (scorre) segnala(`${larghezza}px — scorrimento orizzontale (${esito.scroll} > ${esito.client})`);
  if (esito.sbordati.length) segnala(`${larghezza}px — fuori riquadro: ${esito.sbordati.join(', ')}`);
  if (errori.length) segnala(`${larghezza}px — errori: ${errori.join(' | ')}`);
  if (!scorre && !esito.sbordati.length && !errori.length) ok(`${larghezza}px`);

  await pagina.close();
}

/* ---------------------------------------------------------------- */
console.log('\nCONTRASTO — testo contro il proprio sfondo (WCAG AA)');
{
  const pagina = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  const scarsi = await pagina.evaluate(() => {
    const canale = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const luce = ([r, g, b]) => 0.2126 * canale(r) + 0.7152 * canale(g) + 0.0722 * canale(b);
    const leggi = (s) => (s.match(/[\d.]+/g) || []).map(Number);
    const fondi = (sopra, sotto) => {
      const a = sopra[3] ?? 1;
      return [0, 1, 2].map((i) => sopra[i] * a + sotto[i] * (1 - a));
    };
    const sfondo = (el) => {
      let n = el;
      const pila = [];
      while (n && n !== document.documentElement) {
        const c = leggi(getComputedStyle(n).backgroundColor);
        if (c.length >= 3 && (c[3] === undefined || c[3] > 0)) {
          pila.push(c);
          if ((c[3] ?? 1) === 1) break;
        }
        n = n.parentElement;
      }
      let base = [248, 242, 230];
      for (let i = pila.length - 1; i >= 0; i -= 1) base = fondi(pila[i], base);
      return base;
    };
    const fuori = [];
    document.querySelectorAll('p, h1, h2, h3, a, li, dt, dd, span, strong, summary, button').forEach((el) => {
      if (!el.textContent.trim()) return;
      // gli elementi marcati data-decorativo sono texture, non testo da leggere
      if (el.closest('.via-schermo, .salta, [data-decorativo]')) return;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return;
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      // considera solo gli elementi che contengono testo diretto
      const proprio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!proprio) return;
      // testo disegnato con il solo contorno: il colore non è misurabile
      const alfaTesto = leggi(s.color)[3];
      if (alfaTesto === 0) return;
      const testo = fondi(leggi(s.color), sfondo(el));
      const dietro = sfondo(el);
      const l1 = luce(testo);
      const l2 = luce(dietro);
      const rapporto = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const px = parseFloat(s.fontSize);
      const grande = px >= 24 || (px >= 18.66 && Number(s.fontWeight) >= 700);
      const soglia = grande ? 3 : 4.5;
      if (rapporto < soglia) {
        fuori.push({
          testo: el.textContent.trim().slice(0, 44),
          classe: String(el.className).split(' ')[0],
          rapporto: rapporto.toFixed(2),
          soglia,
          px: Math.round(px),
        });
      }
    });
    return fuori;
  });

  if (!scarsi.length) ok('tutti i testi superano la soglia AA');
  for (const s of scarsi.slice(0, 20)) {
    segnala(`contrasto ${s.rapporto} (serve ${s.soglia}) — .${s.classe} ${s.px}px — “${s.testo}”`);
  }
  await pagina.close();
}

/* ---------------------------------------------------------------- */
console.log('\nTASTIERA — messa a fuoco e domande');
{
  const pagina = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await pagina.goto(BASE, { waitUntil: 'networkidle' });

  // il primo TAB deve raggiungere il salta-contenuto
  await pagina.keyboard.press('Tab');
  const primo = await pagina.evaluate(() => document.activeElement.className);
  if (primo.includes('salta')) ok('il primo TAB raggiunge “Salta al contenuto”');
  else segnala(`il primo TAB raggiunge .${primo} invece del salta-contenuto`);

  // contorno di messa a fuoco visibile su un campione di elementi
  const senzaContorno = await pagina.evaluate(() => {
    const fuori = [];
    document.querySelectorAll('a[href], button, summary').forEach((el) => {
      if (!el.getClientRects().length) return;
      el.focus();
      const s = getComputedStyle(el);
      const spesso = parseFloat(s.outlineWidth) || 0;
      if (s.outlineStyle === 'none' || spesso < 1) {
        fuori.push(String(el.className).split(' ')[0] || el.tagName);
      }
    });
    document.activeElement.blur();
    return [...new Set(fuori)];
  });
  if (!senzaContorno.length) ok('ogni elemento attivabile mostra un contorno di messa a fuoco');
  else segnala(`senza contorno di messa a fuoco: ${senzaContorno.join(', ')}`);

  // apertura/chiusura delle domande con Invio
  const primaDomanda = pagina.locator('.domanda').first();
  await primaDomanda.locator('summary').focus();
  await pagina.keyboard.press('Enter');
  const aperta = await primaDomanda.evaluate((el) => el.open);
  await pagina.keyboard.press('Enter');
  const chiusa = await primaDomanda.evaluate((el) => !el.open);
  if (aperta && chiusa) ok('le domande si aprono e si chiudono con Invio');
  else segnala(`domande da tastiera: apertura=${aperta} chiusura=${chiusa}`);

  const quante = await pagina.locator('.domanda').count();
  if (quante === 16) ok('16 domande presenti');
  else segnala(`domande presenti: ${quante} (attese 16)`);

  await pagina.close();
}

/* ---------------------------------------------------------------- */
console.log('\nCOLLEGAMENTI — ancore, link esterni, WhatsApp');
{
  const pagina = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  const esito = await pagina.evaluate(() => {
    const rotte = [];
    const esterni = [];
    const whatsapp = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        if (!document.querySelector(href)) rotte.push(href);
      } else if (href.includes('wa.me')) {
        whatsapp.push(href);
      } else if (/^https?:/.test(href)) {
        if (a.target === '_blank' && !/noopener/.test(a.rel)) esterni.push(`${href} senza rel=noopener`);
      }
    });
    return {
      rotte: [...new Set(rotte)],
      esterni,
      whatsapp: [...new Set(whatsapp)],
      titoli: document.querySelectorAll('h1').length,
    };
  });

  if (!esito.rotte.length) ok('tutte le ancore puntano a una sezione esistente');
  else segnala(`ancore rotte: ${esito.rotte.join(', ')}`);

  if (!esito.esterni.length) ok('i link esterni hanno rel=noopener');
  else segnala(esito.esterni.join(', '));

  if (esito.titoli === 1) ok('un solo h1 nella pagina');
  else segnala(`h1 presenti: ${esito.titoli}`);

  const senzaNumero = esito.whatsapp.filter((h) => /wa\.me\/\?/.test(h));
  if (senzaNumero.length) {
    console.log(`  ⚠ ${senzaNumero.length} link WhatsApp senza destinatario: inserisci NUMERO_WHATSAPP in src/dati/sito.js`);
  } else {
    ok(`${esito.whatsapp.length} link WhatsApp con destinatario`);
  }

  await pagina.close();
}

/* ---------------------------------------------------------------- */
console.log('\nSENZA JAVASCRIPT');
{
  const contesto = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const pagina = await contesto.newPage();
  await pagina.goto(BASE, { waitUntil: 'load' });
  const visibile = await pagina.evaluate(() => {
    const campione = [...document.querySelectorAll('[data-comparsa]')];
    const nascosti = campione.filter((e) => Number(getComputedStyle(e).opacity) < 0.5);
    return { totale: campione.length, nascosti: nascosti.length };
  });
  if (!visibile.nascosti) ok(`i ${visibile.totale} blocchi restano visibili senza JavaScript`);
  else segnala(`${visibile.nascosti} blocchi invisibili senza JavaScript`);
  await contesto.close();
}

await browser.close();

console.log(
  problemi === 0
    ? '\n✓ Nessun problema rilevato.\n'
    : `\n✗ ${problemi} problemi da sistemare.\n`
);
process.exit(problemi === 0 ? 0 : 1);
