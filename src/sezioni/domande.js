import { esc, mappa, titoloRighe } from '../util.js';
import { introFaq, gruppiFaq, totaleFaq } from '../dati/faq.js';

export function sezioneDomande() {
  let contatore = 0;

  const gruppi = mappa(
    gruppiFaq,
    (g, gi) => `
    <section class="gruppo" aria-labelledby="gruppo-${gi}">
      <h3 class="gruppo__titolo" id="gruppo-${gi}">
        <span class="gruppo__segno" aria-hidden="true"></span>${esc(g.titolo)}
      </h3>
      <div class="gruppo__voci">
        ${mappa(g.voci, (v) => {
          contatore += 1;
          const n = String(contatore).padStart(2, '0');
          return `
          <details class="domanda">
            <summary class="domanda__testa">
              <span class="domanda__numero" aria-hidden="true">${n}</span>
              <span class="domanda__testo">${esc(v.domanda)}</span>
              <span class="domanda__croce" aria-hidden="true"><i></i><i></i></span>
            </summary>
            <div class="domanda__risposta">
              ${mappa(v.risposta, (p) => `<p>${esc(p)}</p>`)}
            </div>
          </details>`;
        })}
      </div>
    </section>`
  );

  return `
<section class="sezione sezione--domande" id="domande">
  <div class="gabbia domande__griglia">
    <div class="domande__lato">
      <header class="intestazione intestazione--incolonnata">
        <p class="intestazione__indice"><span class="intestazione__numero">${esc(introFaq.numero)}</span><span class="intestazione__etichetta">${esc(introFaq.etichetta)}</span></p>
        ${titoloRighe(introFaq.titolo, { classe: 'intestazione__titolo intestazione__titolo--medio' })}
        <p class="intestazione__testo">${esc(introFaq.testo)}</p>
      </header>
      <p class="domande__conteggio" aria-hidden="true"><span>${totaleFaq}</span> domande</p>
    </div>

    <div class="domande__elenco">
      ${gruppi}
    </div>
  </div>
</section>`;
}
