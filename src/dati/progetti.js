/* ------------------------------------------------------------------
   Progetti in portfolio.
   La struttura è pensata per crescere fino a cinque casi (e oltre):
   aggiungi un oggetto all'array e la sezione si adatta da sola.

   variante  → determina la composizione visiva e il ritmo del blocco.
               'insegna'   blocco scuro a tutta larghezza
               'vetrina'   blocco chiaro con campitura gialla
               'cantiere'  blocco a disegno tecnico (concept)
               Se aggiungi progetti oltre il terzo, le varianti si
               ripetono in ciclo mantenendo l'alternanza.
   ------------------------------------------------------------------ */

export const progetti = [
  {
    numero: '01',
    nome: 'FammiUnKilo',
    categoria: 'Landing page, conversione e WhatsApp',
    link: 'https://fammiunkilo.it',
    etichettaLink: 'fammiunkilo.it',
    stato: 'Online',
    variante: 'insegna',
    concetto: 'Dal messaggio alla richiesta, senza giri inutili.',
    descrizione:
      'Una pagina diretta e riconoscibile, costruita per accompagnare chi arriva fino al contatto.',
    scheda: [
      {
        voce: 'Il punto di partenza',
        testo:
          'Traffico che arriva da un messaggio o da un profilo social e si disperde prima di chiedere qualcosa.',
      },
      {
        voce: 'La scelta progettuale',
        testo:
          'Una sola pagina, una sola strada: promessa in apertura, prova nel mezzo, contatto sempre raggiungibile.',
      },
      {
        voce: 'Cosa si vede',
        testo:
          'Gerarchia netta, contrasti alti, nessuna distrazione laterale. Il pulsante di contatto non esce mai dal campo visivo.',
      },
    ],
    passiFlusso: ['Messaggio', 'Pagina', 'Richiesta'],
  },
  {
    numero: '02',
    nome: 'ZUM',
    nomeSecondario: 'Zumbox',
    categoria: 'Brand, prodotto ed e-commerce',
    link: 'https://zumbox.it',
    etichettaLink: 'zumbox.it',
    stato: 'Online',
    variante: 'vetrina',
    concetto: 'Un prodotto nuovo aveva bisogno di un mondo tutto suo.',
    descrizione:
      'Identità energica, racconto del prodotto ed esperienza progettata per vendere online.',
    dicitura: 'Progetto speciale — e-commerce fuori dai pacchetti base.',
    scheda: [
      {
        voce: 'Il punto di partenza',
        testo:
          'Un prodotto che nessuno stava cercando per nome: prima di vendere bisognava farlo capire.',
      },
      {
        voce: 'La scelta progettuale',
        testo:
          'Un linguaggio visivo pieno e riconoscibile, costruito attorno al prodotto e non attorno al negozio.',
      },
      {
        voce: 'Cosa si vede',
        testo:
          'Colore deciso, fotografia di prodotto in primo piano, percorso d’acquisto breve e senza attriti.',
      },
    ],
  },
  {
    numero: '03',
    nome: 'CasaChiara',
    nomeSecondario: 'Imbiancature',
    categoria: 'Artigiani e servizi locali',
    link: '',
    etichettaLink: '',
    stato: 'Concept dimostrativo in preparazione',
    variante: 'cantiere',
    concetto:
      'Mostrare lavori reali, spiegare i servizi e trasformare una ricerca locale in una richiesta di preventivo.',
    descrizione:
      'Il caso tipico dell’artigiano di zona: mestiere solido, presenza online quasi inesistente. Questo concept mostra come si presenta un lavoro quando smette di vivere solo nelle fotografie del telefono.',
    scheda: [
      {
        voce: 'Il punto di partenza',
        testo:
          'Un nome che gira per passaparola, una scheda Google incompleta e nessun posto dove far vedere i lavori finiti.',
      },
      {
        voce: 'La scelta progettuale',
        testo:
          'Servizi in chiaro, zona di intervento dichiarata, prima e dopo dei cantieri, richiesta di preventivo a due tocchi.',
      },
      {
        voce: 'Cosa si vede',
        testo:
          'Struttura essenziale pensata per il telefono: chi siamo, cosa facciamo, dove lavoriamo, come chiamarci.',
      },
    ],
    schemaPagine: ['Chi siamo', 'Servizi', 'Lavori', 'Zona', 'Preventivo'],
  },
];

export const introProgetti = {
  numero: '03',
  etichetta: 'Progetti',
  titolo: ['Tre lavori,', 'tre problemi diversi.'],
  testo:
    'Non tre volte lo stesso sito con un colore cambiato. Ogni attività arriva con una domanda sua, e il progetto parte da lì.',
};
