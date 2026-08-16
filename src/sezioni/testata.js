import { esc, mappa } from '../util.js';
import { marchio, menu, linkWhatsApp } from '../dati/sito.js';

/** Lockup del marchio: icona + parola. */
export function lockup({ classe = '', href = '#apertura' } = {}) {
  return `<a class="marchio${classe ? ` ${classe}` : ''}" href="${esc(href)}">
      <span class="marchio__icona" aria-hidden="true">%ICONA%</span>
      <span class="marchio__parola"><span class="marchio__leggero">${esc(marchio.nomeLeggero)}</span><span class="marchio__forte">${esc(marchio.nomeForte)}</span></span>
      <span class="via-schermo">${esc(marchio.nome)} — torna all’inizio</span>
    </a>`;
}

export function testata() {
  return `
<a class="salta" href="#contenuto">Salta al contenuto</a>
<header class="testata" data-testata>
  <div class="testata__interno">
    ${lockup({ classe: 'marchio--testata' })}
    <nav class="navigazione" id="navigazione" aria-label="Navigazione principale">
      <ul class="navigazione__lista">
        ${mappa(menu, (v) => `<li><a href="${esc(v.href)}">${esc(v.etichetta)}</a></li>`)}
      </ul>
    </nav>
    <div class="testata__coda">
      <a class="testata__azione" href="${esc(linkWhatsApp())}" target="_blank" rel="noopener">
        <span aria-hidden="true" class="testata__pallino"></span>Scrivimi
      </a>
      <button class="menu-tasto" type="button" aria-expanded="false" aria-controls="navigazione" data-menu>
        <span class="menu-tasto__barre" aria-hidden="true"><i></i><i></i></span>
        <span class="menu-tasto__parola" data-chiuso>Menu</span>
        <span class="menu-tasto__parola" data-aperto>Chiudi</span>
      </button>
    </div>
  </div>
</header>`;
}
