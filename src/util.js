/* Piccole utilità condivise dai template. Nessuna dipendenza esterna. */

const MAPPA = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Rende sicuro un testo inserito nell'HTML. */
export const esc = (v = '') => String(v).replace(/[&<>"']/g, (c) => MAPPA[c]);

/** Unisce pezzi di HTML scartando i valori vuoti. */
export const unisci = (...pezzi) => pezzi.filter(Boolean).join('\n');

/** Ripete un template su una lista. */
export const mappa = (lista, fn) => lista.map(fn).join('\n');

/** Attributo opzionale: rendi='' se il valore è vuoto. */
export const se = (condizione, html) => (condizione ? html : '');

/** Gruppo di tre raggi, con le stesse proporzioni dell'icona del marchio.
    `dimensione` è l'altezza in pixel; la larghezza segue le proporzioni. */
export function raggi({ classe = '', dimensione = 28 } = {}) {
  const c = classe ? ` ${classe}` : '';
  const larghezza = Math.round(dimensione * 0.4);
  return `<svg class="raggi${c}" width="${larghezza}" height="${dimensione}" viewBox="0 0 40 100" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="8.3" stroke-linecap="round"><path d="M4.5 15.5 22.5 4.5"/><path d="M6 50h29"/><path d="M4.5 84.5 22.5 95.5"/></g></svg>`;
}

/** Quattro angoli del mirino: la cornice ricorrente del sito. */
export function mirino(classe = '') {
  return `<span class="mirino${classe ? ` ${classe}` : ''}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
}

/** Titolo su più righe con alternanza di peso tipografico. */
export function titoloRighe(righe, { classe = '', tag = 'h2' } = {}) {
  const corpo = righe
    .map((r) => {
      const testo = typeof r === 'string' ? r : r.testo;
      const peso = typeof r === 'string' ? 'leggero' : r.peso || 'leggero';
      return `<span class="riga"><span class="riga__testo riga__testo--${peso}">${esc(testo)}</span></span>`;
    })
    .join('');
  return `<${tag} class="titolo-righe${classe ? ` ${classe}` : ''}">${corpo}</${tag}>`;
}

/** Intestazione di sezione: numero in margine, etichetta, titolo, testo. */
export function intestazione({ numero, etichetta, titolo, testo, classe = '' }) {
  return `
  <header class="intestazione${classe ? ` ${classe}` : ''}">
    <p class="intestazione__indice"><span class="intestazione__numero">${esc(numero)}</span><span class="intestazione__etichetta">${esc(etichetta)}</span></p>
    ${titoloRighe(titolo, { classe: 'intestazione__titolo' })}
    ${se(testo, `<p class="intestazione__testo">${esc(testo)}</p>`)}
  </header>`;
}
