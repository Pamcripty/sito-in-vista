import { esc, mappa, titoloRighe } from '../util.js';
import { adatto } from '../dati/contenuti.js';

export function sezioneAdatto() {
  return `
<section class="sezione sezione--adatto" id="adatto">
  <div class="gabbia">
    <header class="intestazione intestazione--affiancata">
      <div>
        <p class="intestazione__indice"><span class="intestazione__numero">${esc(adatto.numero)}</span><span class="intestazione__etichetta">${esc(adatto.etichetta)}</span></p>
        ${titoloRighe(adatto.titolo, { classe: 'intestazione__titolo' })}
      </div>
      <p class="intestazione__testo">${esc(adatto.testo)}</p>
    </header>

    <div class="bilancia">
      <div class="bilancia__lato bilancia__lato--si">
        <h3 class="bilancia__titolo">${esc(adatto.positivo.titolo)}</h3>
        <ul class="bilancia__lista">
          ${mappa(
            adatto.positivo.voci,
            (v) => `<li><svg class="segno segno--si" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 13.5 9 19 21 5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>${esc(v)}</li>`
          )}
        </ul>
      </div>

      <div class="bilancia__lato bilancia__lato--no">
        <h3 class="bilancia__titolo">${esc(adatto.negativo.titolo)}</h3>
        <ul class="bilancia__lista">
          ${mappa(
            adatto.negativo.voci,
            (v) => `<li><svg class="segno segno--no" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>${esc(v)}</li>`
          )}
        </ul>
        <p class="bilancia__nota">${esc(adatto.negativo.nota)}</p>
      </div>
    </div>
  </div>
</section>`;
}
