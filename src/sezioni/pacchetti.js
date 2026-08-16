import { esc, mappa, se, titoloRighe, mirino } from '../util.js';
import { introPacchetti, pacchetti, valore, introExtra, extra, notaExtra } from '../dati/pacchetti.js';
import { linkWhatsApp } from '../dati/sito.js';

function pacchetto(p) {
  const consigliato = Boolean(p.consigliato);
  return `
  <article class="pacchetto${consigliato ? ' pacchetto--consigliato' : ''}" id="pacchetto-${esc(p.codice)}">
    ${se(consigliato, mirino('mirino--pacchetto'))}
    ${se(consigliato, `<p class="pacchetto__etichetta">${esc(p.etichetta)}</p>`)}

    <header class="pacchetto__testa">
      <h3 class="pacchetto__nome">${esc(p.nome)}</h3>
      <p class="pacchetto__sottotitolo">${esc(p.sottotitolo)}</p>
      <p class="pacchetto__prezzo"><span class="pacchetto__cifra">${esc(p.prezzo)}</span><span class="pacchetto__valuta">€</span></p>
      <p class="pacchetto__promessa"><span class="pacchetto__virgolette" aria-hidden="true">“</span>${esc(p.promessa)}<span class="pacchetto__virgolette" aria-hidden="true">”</span></p>
    </header>

    <div class="pacchetto__corpo">
      <p class="pacchetto__titoletto">Comprende</p>
      <ul class="pacchetto__voci">
        ${mappa(p.comprende, (v) => `<li><span class="pacchetto__spunta" aria-hidden="true"></span>${esc(v)}</li>`)}
      </ul>
    </div>

    <footer class="pacchetto__pie">
      <p class="pacchetto__esclusi">${esc(p.esclusi)}</p>
      <a class="azione ${consigliato ? 'azione--chiara' : 'azione--contorno'} pacchetto__azione" href="${esc(linkWhatsApp(p.messaggio))}" target="_blank" rel="noopener">
        ${esc(p.azione)}<span class="azione__freccia" aria-hidden="true"></span>
      </a>
    </footer>
  </article>`;
}

function bloccoValore() {
  return `
  <aside class="valore" aria-labelledby="valore-titolo">
    <div class="valore__testa">
      <p class="valore__indice" aria-hidden="true">05·b</p>
      <h3 class="valore__titolo" id="valore-titolo">${esc(valore.titolo)}</h3>
      <p class="valore__premessa">${esc(valore.premessa)}</p>
      <p class="valore__nota">${esc(valore.nota)}</p>
    </div>

    <dl class="conto">
      ${mappa(
        valore.voci,
        (v) => `<div class="conto__riga">
          <dt class="conto__voce">${esc(v.voce)}</dt>
          <dd class="conto__cifra">${esc(v.prezzo)} €</dd>
        </div>`
      )}
      <div class="conto__riga conto__riga--somma">
        <dt class="conto__voce">${esc(valore.totaleEtichetta)}</dt>
        <dd class="conto__cifra">${esc(valore.totale)}</dd>
      </div>
      <div class="conto__riga conto__riga--prezzo">
        <dt class="conto__voce">${esc(valore.prezzoEtichetta)}</dt>
        <dd class="conto__cifra">${esc(valore.prezzo)}</dd>
      </div>
    </dl>
  </aside>`;
}

export function sezionePacchetti() {
  return `
<section class="sezione sezione--pacchetti" id="pacchetti">
  <div class="gabbia">
    <header class="intestazione intestazione--affiancata">
      <div>
        <p class="intestazione__indice"><span class="intestazione__numero">${esc(introPacchetti.numero)}</span><span class="intestazione__etichetta">${esc(introPacchetti.etichetta)}</span></p>
        ${titoloRighe(introPacchetti.titolo, { classe: 'intestazione__titolo' })}
      </div>
      <p class="intestazione__testo">${esc(introPacchetti.testo)}</p>
    </header>

    <div class="listino">
      ${mappa(pacchetti, pacchetto)}
    </div>

    ${bloccoValore()}
  </div>
</section>`;
}

export function sezioneExtra() {
  return `
<section class="sezione sezione--extra" id="extra">
  <div class="gabbia">
    <header class="intestazione intestazione--affiancata">
      <div>
        <p class="intestazione__indice"><span class="intestazione__numero">${esc(introExtra.numero)}</span><span class="intestazione__etichetta">${esc(introExtra.etichetta)}</span></p>
        ${titoloRighe(introExtra.titolo, { classe: 'intestazione__titolo' })}
      </div>
      <p class="intestazione__testo">${esc(introExtra.testo)}</p>
    </header>

    <ul class="extra">
      ${mappa(
        extra,
        (e, i) => `<li class="extra__voce">
          <span class="extra__ordine" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="extra__nome">${esc(e.nome)}</h3>
          <p class="extra__prezzo">${esc(e.prezzo)}</p>
          <p class="extra__testo">${esc(e.testo)}</p>
        </li>`
      )}
    </ul>

    <p class="extra__nota">${esc(notaExtra)}</p>
  </div>
</section>`;
}
