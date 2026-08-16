import { esc, mappa, titoloRighe } from '../util.js';
import { problema } from '../dati/contenuti.js';

export function sezioneProblema() {
  const conseguenze = mappa(
    problema.conseguenze,
    (c, i) => `
      <li class="conseguenza" style="--posa:${i}">
        <span class="conseguenza__numero" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="conseguenza__corpo">
          <h3 class="conseguenza__titolo">${esc(c.titolo)}</h3>
          <p class="conseguenza__testo">${esc(c.testo)}</p>
        </div>
        <span class="conseguenza__scia" aria-hidden="true"></span>
      </li>`
  );

  return `
<section class="sezione sezione--problema" id="problema">
  <div class="gabbia">

    <header class="intestazione intestazione--larga">
      <p class="intestazione__indice"><span class="intestazione__numero">${esc(problema.numero)}</span><span class="intestazione__etichetta">${esc(problema.etichetta)}</span></p>
      ${titoloRighe(problema.titolo, { classe: 'intestazione__titolo intestazione__titolo--misurato' })}
      <p class="intestazione__testo intestazione__testo--spostato">${esc(problema.introduzione)}</p>
    </header>

    <ol class="conseguenze">
      ${conseguenze}
    </ol>

    <figure class="citazione">
      <blockquote>
        <span class="citazione__prima">${esc(problema.citazione.prima)}</span>
        <span class="citazione__dopo">${esc(problema.citazione.dopo)}</span>
      </blockquote>
    </figure>

  </div>
</section>`;
}
