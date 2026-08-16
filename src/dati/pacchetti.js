/* ------------------------------------------------------------------
   Pacchetti, valore del pacchetto consigliato e servizi extra.
   ------------------------------------------------------------------ */

export const introPacchetti = {
  numero: '05',
  etichetta: 'Pacchetti',
  titolo: ['Tre modi di partire.', 'Prezzo deciso prima.'],
  testo:
    'Nessun preventivo a sorpresa: qui sotto trovi cosa comprende ogni pacchetto e cosa no. Se il tuo caso esce da questi confini, te lo dico prima di cominciare.',
};

export const pacchetti = [
  {
    codice: 'essenziale',
    nome: 'Sito Essenziale',
    prezzo: '179',
    promessa: 'Voglio semplicemente esserci',
    sottotitolo: 'Una pagina sola, fatta bene.',
    consigliato: false,
    comprende: [
      'sito monopagina con 5–6 sezioni',
      'presentazione, servizi e fotografie',
      'mappa, contatti e pulsante WhatsApp',
      'testi essenziali e predisposizione Google',
      'un giro di modifiche',
    ],
    esclusi: 'Dominio e hosting esclusi.',
    azione: 'Chiedi informazioni',
    messaggio:
      'Ciao, sono interessato al pacchetto Sito Essenziale. Ti racconto la mia attività:',
  },
  {
    codice: 'professionale',
    nome: 'Sito Professionale',
    prezzo: '279',
    promessa: 'Voglio presentarmi bene',
    sottotitolo: 'Più spazio per servizi e lavori.',
    consigliato: false,
    comprende: [
      'fino a 5 pagine',
      'home, attività, servizi, gallery e contatti',
      'testi più approfonditi',
      'SEO locale di base',
      'un giro di modifiche',
    ],
    esclusi: 'Dominio e hosting esclusi.',
    azione: 'Chiedi informazioni',
    messaggio:
      'Ciao, sono interessato al pacchetto Sito Professionale. Ti racconto la mia attività:',
  },
  {
    codice: 'lancio',
    nome: 'Lancio in Vista',
    prezzo: '449',
    promessa: 'Voglio partire con una strategia',
    sottotitolo: 'Il sito, più tutto quello che gli sta attorno.',
    consigliato: true,
    etichetta: 'Scelta consigliata',
    comprende: [
      'mini-analisi di 3 concorrenti locali',
      'posizionamento e messaggio differenziante',
      'sito professionale fino a 5 pagine',
      '10 grafiche social',
      '10 didascalie pronte',
      'immagine profilo e copertina social',
      'volantino oppure biglietto da visita',
      'due giri di modifiche al sito',
    ],
    esclusi: 'Dominio e hosting esclusi.',
    azione: 'Parliamo di Lancio in Vista',
    messaggio:
      'Ciao, sono interessato al pacchetto Lancio in Vista. Ti racconto la mia attività:',
  },
];

/* Confronto onesto: il valore delle stesse voci acquistate separatamente. */
export const valore = {
  titolo: 'Perché Lancio in Vista conviene',
  premessa:
    'Le stesse voci, se le commissioni una alla volta, hanno ciascuna un prezzo. Messe insieme in un lavoro solo costano meno, perché si progettano una volta sola con la stessa testa e lo stesso materiale.',
  voci: [
    { voce: 'Sito strategico', prezzo: '299' },
    { voce: 'Analisi e posizionamento', prezzo: '99' },
    { voce: '10 post con didascalie', prezzo: '149' },
    { voce: 'Materiali coordinati', prezzo: '108' },
  ],
  totaleEtichetta: 'Valore complessivo separato',
  totale: 'oltre 600 €',
  prezzoEtichetta: 'Prezzo Lancio in Vista',
  prezzo: '449 €',
  nota: 'Non è uno sconto a tempo e non scade stanotte: è semplicemente quanto costerebbe comprare le stesse cose separatamente. I prezzi indicati sono i miei listini per le singole voci.',
};

export const introExtra = {
  numero: '06',
  etichetta: 'Servizi extra',
  titolo: ['Da aggiungere', 'solo se servono.'],
  testo:
    'Tre voci che si possono affiancare a qualsiasi pacchetto, oppure acquistare da sole. Sono già comprese in Lancio in Vista.',
};

export const extra = [
  {
    nome: 'Social Starter',
    prezzo: 'da 149 €',
    testo: '10 grafiche coordinate, 10 didascalie e ordine suggerito di pubblicazione.',
  },
  {
    nome: 'Volantino',
    prezzo: 'da 69 €',
    testo: 'Grafica coordinata pronta per la stampa, con messaggio e invito all’azione.',
  },
  {
    nome: 'Biglietto da visita',
    prezzo: 'da 49 €',
    testo: 'Fronte e retro coordinati al sito, pronti per la tipografia.',
  },
];

export const notaExtra =
  'Stampa, pubblicazione e gestione quotidiana dei social non sono comprese.';
