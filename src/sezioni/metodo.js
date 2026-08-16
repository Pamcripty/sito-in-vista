import { esc, mappa, titoloRighe } from '../util.js';
import { metodo } from '../dati/contenuti.js';

export function sezioneMetodo() {
  const passi = mappa(
    metodo.passi,
    (p, i) => `
      <li class="passo">
        <span class="passo__tacca" aria-hidden="true"></span>
        <span class="passo__numero">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="passo__titolo">${esc(p.titolo)}</h3>
        <p class="passo__testo">${esc(p.testo)}</p>
      </li>`
  );

  return `
<section class="sezione sezione--metodo" id="metodo">
  <div class="gabbia">
    <header class="intestazione intestazione--affiancata">
      <div>
        <p class="intestazione__indice"><span class="intestazione__numero">${esc(metodo.numero)}</span><span class="intestazione__etichetta">${esc(metodo.etichetta)}</span></p>
        ${titoloRighe(metodo.titolo, { classe: 'intestazione__titolo' })}
      </div>
      <p class="intestazione__testo">${esc(metodo.testo)}</p>
    </header>

    <ol class="passi">
      <span class="passi__binario" aria-hidden="true"></span>
      ${passi}
    </ol>
  </div>
</section>`;
}
