import { esc, mappa, titoloRighe, raggi, mirino } from '../util.js';
import { apertura } from '../dati/contenuti.js';

export function sezioneApertura() {
  const azioni = mappa(
    apertura.azioni,
    (a) =>
      `<a class="azione azione--${a.tipo}" href="${esc(a.href)}">${esc(a.etichetta)}<span class="azione__freccia" aria-hidden="true"></span></a>`
  );

  const evidenze = mappa(
    apertura.evidenze,
    (e, i) => `<li class="evidenza">
        <span class="evidenza__indice" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <span class="evidenza__corpo">
          <strong class="evidenza__titolo">${esc(e.titolo)}</strong>
          <span class="evidenza__nota">${esc(e.nota)}</span>
        </span>
      </li>`
  );

  return `
<section class="apertura" id="apertura">
  <div class="apertura__reticolo" aria-hidden="true"></div>

  <div class="gabbia apertura__interno">
    <div class="apertura__riga-alta">
      <p class="apertura__sovratitolo">
        ${raggi({ classe: 'raggi--sovratitolo', dimensione: 30 })}
        <span>${esc(apertura.sovratitolo)}</span>
      </p>
      <p class="apertura__destinatari">${esc(apertura.destinatari)}</p>
    </div>

    <div class="apertura__campo">
      ${mirino('mirino--apertura')}
      ${titoloRighe(apertura.titolo, { classe: 'apertura__titolo', tag: 'h1' })}
    </div>

    <div class="apertura__base">
      <p class="apertura__testo">${esc(apertura.testo)}</p>
      <div class="apertura__azioni">${azioni}</div>
    </div>
  </div>

  <div class="fascia-evidenze">
    <ul class="evidenze gabbia">
      ${evidenze}
    </ul>
  </div>
</section>`;
}
