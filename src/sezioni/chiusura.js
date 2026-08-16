import { esc, mappa, titoloRighe, mirino, raggi } from '../util.js';
import { chiusura } from '../dati/contenuti.js';
import { marchio, menu, linkWhatsApp, MESSAGGIO_WHATSAPP } from '../dati/sito.js';
import { lockup } from './testata.js';

export function sezioneChiusura() {
  return `
<section class="chiusura" id="contatto">
  <div class="gabbia chiusura__interno">
    <p class="intestazione__indice intestazione__indice--chiara">
      <span class="intestazione__numero">${esc(chiusura.numero)}</span><span class="intestazione__etichetta">${esc(chiusura.etichetta)}</span>
    </p>

    <div class="chiusura__campo">
      ${mirino('mirino--chiusura')}
      ${titoloRighe(chiusura.titolo, { classe: 'chiusura__titolo' })}
    </div>

    <div class="chiusura__base">
      <p class="chiusura__testo">${esc(chiusura.testo)}</p>
      <div class="chiusura__azioni">
        <a class="azione azione--whatsapp" href="${esc(linkWhatsApp())}" target="_blank" rel="noopener">
          <svg class="azione__whatsapp" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-2.6 4.03c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.75-1.8-.19-.44-.38-.38-.53-.39l-.45-.01Z"/></svg>
          ${esc(chiusura.azione)}
        </a>
        <p class="chiusura__nota">${esc(chiusura.nota)}</p>
      </div>
    </div>
  </div>

  <footer class="pie">
    <div class="gabbia pie__interno">
      ${lockup({ classe: 'marchio--pie' })}
      <p class="pie__payoff">${esc(marchio.descrittore)} · ${esc(marchio.payoff)}</p>
      <nav class="pie__navigazione" aria-label="Navigazione a piè di pagina">
        <ul>
          ${mappa(menu, (v) => `<li><a href="${esc(v.href)}">${esc(v.etichetta)}</a></li>`)}
          <li><a href="#contatto">Contatti</a></li>
        </ul>
      </nav>
      <p class="pie__coda">© ${new Date().getFullYear()} ${esc(marchio.nome)}</p>
    </div>
  </footer>
</section>`;
}

/** Contatto WhatsApp sempre raggiungibile: linguetta su desktop, barra su telefono. */
export function contattoFisso() {
  const href = esc(linkWhatsApp());
  return `
<a class="fisso fisso--linguetta" href="${href}" target="_blank" rel="noopener" data-fisso>
  <span class="fisso__icona" aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm-2.6 5.7c.15.01.34-.05.53.39.22.48.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.15.24.63 1.04 1.35 1.68.93.82 1.71 1.08 1.95 1.2.24.12.38.1.52-.06.14-.16.6-.71.76-.95.16-.24.32-.2.54-.12.22.08 1.42.67 1.66.79.24.12.4.18.46.28.06.11.06.59-.14 1.16-.2.57-1.17 1.09-1.64 1.16-.42.06-.95.08-1.53-.1-.35-.11-.8-.26-1.38-.51-2.43-1.04-4.01-3.48-4.13-3.64-.12-.16-.99-1.31-.99-2.51s.63-1.79.85-2.03c.22-.24.48-.3.64-.3l.45.01Z"/></svg>
  </span>
  <span class="fisso__parola">Scrivi su WhatsApp</span>
  <span class="via-schermo">Apre WhatsApp con un messaggio già pronto: “${esc(MESSAGGIO_WHATSAPP)}”</span>
</a>`;
}
