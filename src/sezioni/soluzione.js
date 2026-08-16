import { esc, mappa, titoloRighe } from '../util.js';
import { soluzione } from '../dati/contenuti.js';

export function sezioneSoluzione() {
  const punti = mappa(
    soluzione.punti,
    (p, i) => `
      <li class="punto">
        <span class="punto__segno" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="punto__titolo">${esc(p.titolo)}</h3>
        <p class="punto__testo">${esc(p.testo)}</p>
      </li>`
  );

  return `
<section class="sezione sezione--soluzione" id="soluzione">
  <div class="gabbia soluzione__griglia">

    <header class="intestazione intestazione--incolonnata">
      <p class="intestazione__indice"><span class="intestazione__numero">${esc(soluzione.numero)}</span><span class="intestazione__etichetta">${esc(soluzione.etichetta)}</span></p>
      ${titoloRighe(soluzione.titolo, { classe: 'intestazione__titolo' })}
    </header>

    <div class="soluzione__discorso">
      ${mappa(soluzione.testo, (t, i) => `<p class="${i === 0 ? 'soluzione__attacco' : 'soluzione__seguito'}">${esc(t)}</p>`)}
    </div>

    <ol class="punti">
      ${punti}
    </ol>

  </div>
</section>`;
}
