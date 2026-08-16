import { esc, mappa, se, titoloRighe, raggi } from '../util.js';
import { progetti, introProgetti } from '../dati/progetti.js';

/* --- composizioni visive, una per variante ------------------------- */

function visualeFlusso(p) {
  const tappe = p.passiFlusso ?? ['Messaggio', 'Pagina', 'Richiesta'];
  return `
    <div class="visuale visuale--flusso">
      <p class="visuale__didascalia">Il percorso del visitatore</p>
      <ol class="flusso">
        ${mappa(
          tappe,
          (t, i) => `<li class="flusso__tappa${i === tappe.length - 1 ? ' flusso__tappa--meta' : ''}">
            <span class="flusso__punto" aria-hidden="true"></span>
            <span class="flusso__nome">${esc(t)}</span>
          </li>`
        )}
      </ol>
    </div>`;
}

function visualeMarca(p) {
  return `
    <div class="visuale visuale--marca">
      <span class="marca__parola" aria-hidden="true" data-decorativo>${esc(p.nome)}</span>
      <svg class="marca__scatola" viewBox="0 0 200 170" aria-hidden="true" focusable="false">
        <path d="M100 12 188 52 100 92 12 52Z" fill="currentColor" opacity=".92"/>
        <path d="M12 52v66l88 40V92Z" fill="currentColor" opacity=".62"/>
        <path d="M188 52v66l-88 40V92Z" fill="currentColor" opacity=".38"/>
      </svg>
      ${raggi({ classe: 'marca__raggi', dimensione: 46 })}
    </div>`;
}

function visualeSchema(p) {
  const pagine = p.schemaPagine ?? [];
  return `
    <div class="visuale visuale--schema">
      <p class="visuale__didascalia">Struttura prevista — 5 pagine</p>
      <ol class="schema">
        ${mappa(
          pagine,
          (nome, i) => `<li class="schema__voce">
            <span class="schema__telaio" aria-hidden="true">
              <i class="schema__barra"></i>
              <i class="schema__blocco"></i>
              <i class="schema__riga"></i>
              <i class="schema__riga schema__riga--corta"></i>
              <i class="schema__coppia"><b></b><b></b></i>
            </span>
            <span class="schema__nome"><span class="schema__ordine">${String(i + 1).padStart(2, '0')}</span>${esc(nome)}</span>
          </li>`
        )}
      </ol>
    </div>`;
}

const VISUALI = { insegna: visualeFlusso, vetrina: visualeMarca, cantiere: visualeSchema };
const VARIANTI = ['insegna', 'vetrina', 'cantiere'];

/* --- blocco progetto ---------------------------------------------- */

function progetto(p, indice) {
  const variante = p.variante ?? VARIANTI[indice % VARIANTI.length];
  const visuale = (VISUALI[variante] ?? visualeFlusso)(p);
  const online = Boolean(p.link);

  const scheda = mappa(
    p.scheda ?? [],
    (s) => `
      <div class="scheda__voce">
        <dt class="scheda__etichetta">${esc(s.voce)}</dt>
        <dd class="scheda__testo">${esc(s.testo)}</dd>
      </div>`
  );

  return `
  <article class="progetto progetto--${esc(variante)}" id="progetto-${esc(p.numero)}">
    <div class="gabbia progetto__interno">

      <div class="progetto__testa">
        <span class="progetto__numero" aria-hidden="true">${esc(p.numero)}</span>
        <p class="progetto__categoria">${esc(p.categoria)}</p>
        <h3 class="progetto__nome">
          <span class="progetto__nome-principale">${esc(p.nome)}</span>
          ${se(p.nomeSecondario, `<span class="progetto__nome-secondario">${esc(p.nomeSecondario)}</span>`)}
        </h3>
        <p class="progetto__concetto">${esc(p.concetto)}</p>
      </div>

      <div class="progetto__visuale">
        ${visuale}
      </div>

      <div class="progetto__corpo">
        <p class="progetto__descrizione">${esc(p.descrizione)}</p>
        ${se(p.dicitura, `<p class="progetto__dicitura"><span aria-hidden="true" class="progetto__dicitura-segno"></span>${esc(p.dicitura)}</p>`)}
        <dl class="scheda">${scheda}</dl>
      </div>

      <div class="progetto__pie">
        <p class="progetto__stato">${esc(p.stato)}</p>
        ${se(
          online,
          `<a class="progetto__link" href="${esc(p.link)}" target="_blank" rel="noopener">
            <span>Visita ${esc(p.etichettaLink || p.nome)}</span>
            <span class="progetto__link-freccia" aria-hidden="true"></span>
            <span class="via-schermo">(si apre in una nuova scheda)</span>
          </a>`
        )}
      </div>

    </div>
  </article>`;
}

export function sezioneProgetti() {
  return `
<section class="sezione sezione--progetti" id="progetti">
  <div class="gabbia">
    <header class="intestazione intestazione--incolonnata">
      <p class="intestazione__indice"><span class="intestazione__numero">${esc(introProgetti.numero)}</span><span class="intestazione__etichetta">${esc(introProgetti.etichetta)}</span></p>
      ${titoloRighe(introProgetti.titolo, { classe: 'intestazione__titolo' })}
      <p class="intestazione__testo">${esc(introProgetti.testo)}</p>
    </header>
  </div>
  <div class="progetti">
    ${mappa(progetti, progetto)}
  </div>
</section>`;
}
