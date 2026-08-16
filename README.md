# Sito in Vista

Sito portfolio commerciale per **Sito in Vista** — siti web per piccole attività.
Pagina unica, statica, senza backend e senza dipendenze a pagamento.

> **Quando ti cercano, ci sei.**

---

## 1. La prima cosa da fare: il numero WhatsApp

Tutti i pulsanti di contatto passano da un'unica costante.

Apri **`src/dati/sito.js`** e compila:

```js
export const NUMERO_WHATSAPP = '';   // ← es. '393401234567'
```

Formato internazionale, **solo cifre**: prefisso paese + numero, senza `+`,
senza spazi, senza lo zero iniziale.

Finché resta vuota il sito funziona lo stesso, ma i pulsanti aprono WhatsApp
senza destinatario. `npm run build` te lo ricorda a ogni costruzione, e
`npm run verifica` lo segnala.

Nello stesso file trovi anche il messaggio precompilato:

```js
export const MESSAGGIO_WHATSAPP = 'Ciao, vorrei capire quale sito è più adatto alla mia attività.';
```

e il dominio pubblico (`DOMINIO`), usato per i metadata, la sitemap e
l'anteprima social.

---

## 2. Avviare il sito in locale

Serve **Node 18 o superiore**. Nient'altro: nessun pacchetto da installare
per costruire o pubblicare.

```bash
npm start          # costruisce e apre http://localhost:4173
```

Comandi separati:

```bash
npm run build      # genera dist/
npm run serve      # serve dist/ senza ricostruire
```

`npm start` va rilanciato dopo ogni modifica: la costruzione è istantanea.

---

## 3. Pubblicare

Il sito finito è tutto dentro **`dist/`**. Sono file statici: si pubblicano
ovunque, senza database e senza configurazioni.

- **Netlify / Vercel / Cloudflare Pages** — comando di build `npm run build`,
  cartella da pubblicare `dist`.
- **GitHub Pages** — pubblica il contenuto di `dist/` sul branch delle pagine.
- **Hosting tradizionale (FTP)** — carica il *contenuto* di `dist/` nella
  cartella pubblica (`public_html`, `www` o simile).

Prima di pubblicare, aggiorna `DOMINIO` in `src/dati/sito.js` con l'indirizzo
vero: da lì derivano `canonical`, Open Graph, `sitemap.xml` e `robots.txt`.

---

## 4. Dove si modifica cosa

Tutti i contenuti stanno in `src/dati/`. Non serve toccare il markup.

| File | Cosa contiene |
|---|---|
| `src/dati/sito.js` | numero WhatsApp, dominio, voci di menu, metadata |
| `src/dati/contenuti.js` | apertura, problema, soluzione, metodo, cliente adatto, chiusura |
| `src/dati/progetti.js` | i casi in portfolio |
| `src/dati/pacchetti.js` | i tre pacchetti, il conto del valore, i servizi extra |
| `src/dati/faq.js` | le 16 domande, raccolte in gruppi |

### Aggiungere un progetto

`src/dati/progetti.js` è un array: aggiungi un oggetto e la sezione si adatta
da sola. La struttura regge cinque casi e oltre.

```js
{
  numero: '04',
  nome: 'Nome del progetto',
  categoria: 'Categoria',
  link: 'https://esempio.it',      // vuoto = concept, il pulsante sparisce
  etichettaLink: 'esempio.it',
  stato: 'Online',
  variante: 'insegna',             // insegna | vetrina | cantiere
  concetto: 'La frase che riassume il progetto.',
  descrizione: 'Due righe di racconto.',
  scheda: [{ voce: 'Il punto di partenza', testo: '…' }],
}
```

La `variante` decide impianto, colori e composizione visiva:

- **`insegna`** — blocco scuro, diagramma di percorso a destra (usa `passiFlusso`)
- **`vetrina`** — campitura gialla a sinistra con il nome in grande
- **`cantiere`** — disegno tecnico delle pagine previste (usa `schemaPagine`)

Se ometti `variante`, le tre si alternano da sole in ciclo.

### Aggiungere una domanda

In `src/dati/faq.js`, dentro il gruppo giusto. La numerazione progressiva e il
conteggio in pagina si aggiornano da soli, e così pure i dati strutturati
`FAQPage`.

---

## 5. Come è fatto

```
build.js              generatore (solo Node, nessuna dipendenza)
serve.js              server statico per il lavoro in locale
src/
  dati/               tutti i testi e i prezzi
  sezioni/            una funzione per sezione, restituisce HTML
  stile/              fogli di stile numerati, concatenati in ordine
  font/               Jost e Instrument Serif in locale (SIL OFL)
  marchio/            icona, favicon, icone per il telefono
  social/             anteprima 1200×630
  layout.js           testata del documento, metadata, dati strutturati
  sito.js             comportamenti di pagina (il sito funziona anche senza)
strumenti/            controlli e generazione immagini (solo in sviluppo)
dist/                 il sito costruito — questo si pubblica
```

**Scelte tecniche**

- HTML statico generato a monte: niente contenuti costruiti dal browser,
  quindi Google legge tutto e la pagina compare subito.
- Nessuna libreria: circa 60 kB di CSS e 5 kB di JavaScript, non minificati
  per restare leggibili. I font pesano circa 70 kB in tutto.
- I nomi dei file di CSS e JavaScript contengono un'impronta del contenuto:
  quando pubblichi una modifica, i browser la vedono subito.
- Il JavaScript è un miglioramento, non un requisito: senza di esso restano
  leggibili tutti i contenuti, le domande si aprono lo stesso (`<details>`
  nativo) e i pulsanti funzionano.
- Grafica interamente in CSS e SVG: nessuna fotografia d'archivio.

---

## 6. Controlli

```bash
npm run verifica     # controllo automatico su 13 larghezze
```

Verifica: assenza di scorrimento orizzontale e di elementi fuori riquadro da
320 a 1920 px, contrasto dei testi secondo WCAG AA, contorni di messa a fuoco
su ogni elemento attivabile, apertura delle domande da tastiera, ancore e link
esterni, comportamento senza JavaScript, errori in console.

```bash
node strumenti/prova-interazioni.js   # menu del telefono, ancore, contatto fisso
node strumenti/schermate.js           # schermate a cinque larghezze → /tmp/schermate
node strumenti/sezioni.js             # una schermata per sezione → /tmp/sezioni
```

Questi strumenti usano Playwright, che è l'unica dipendenza di sviluppo
(`npm install`). Per costruire e pubblicare non serve.

---

## 7. Immagini del marchio

Favicon, icone per il telefono e anteprima social sono generate dall'icona:

```bash
npm run immagini     # rigenera src/social/ e i PNG in src/marchio/
npm run build        # le copia in dist/
```

Rilancialo solo se cambia il marchio o il testo dell'anteprima
(`strumenti/anteprima.html`).

---

## 8. Nota sui file del marchio

I file originali `logo-sito-in-vista.svg` e `icona-sito-in-vista.svg` non erano
raggiungibili dall'ambiente in cui il sito è stato costruito: il marchio in
`src/marchio/` è stato **ricostruito in SVG** partendo dalle immagini fornite,
rispettando geometria e tavolozza.

Per usare gli originali basta sostituire i file in `src/marchio/`
mantenendo i nomi, poi rilanciare `npm run immagini && npm run build`.
Il lettering "Sito in **Vista**" nella testata è testo vero (Jost 300 + 700),
non un'immagine: resta nitido a ogni dimensione ed è leggibile dai motori di
ricerca.

---

## 9. Cosa non c'è, di proposito

Nessun conto alla rovescia, nessuna scorta in esaurimento, nessuna recensione
inventata, nessun numero di clienti non verificabile, nessuna promessa di
prima posizione su Google. Il confronto di valore nella sezione pacchetti è
dichiarato per quello che è — il prezzo delle stesse voci acquistate
separatamente — e non finge di essere uno sconto a tempo.
