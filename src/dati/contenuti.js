/* ------------------------------------------------------------------
   Testi delle sezioni narrative.
   ------------------------------------------------------------------ */

export const apertura = {
  sovratitolo: 'Siti web per piccole attività',
  destinatari: 'Artigiani · Negozi · Professionisti · Attività locali',
  titolo: [
    { testo: 'Quando ti cercano,', peso: 'leggero' },
    { testo: 'ci sei.', peso: 'forte' },
  ],
  testo:
    'Un sito semplice, bello e professionale per mostrare subito chi sei, cosa fai e come contattarti. Senza spendere migliaia di euro e senza perderti nei tecnicismi.',
  azioni: [
    { etichetta: 'Guarda i progetti', href: '#progetti', tipo: 'primaria' },
    { etichetta: 'Scopri i pacchetti', href: '#pacchetti', tipo: 'secondaria' },
  ],
  evidenze: [
    { titolo: 'Pensato per il telefono', nota: 'Lì ti guardano davvero' },
    { titolo: 'WhatsApp integrato', nota: 'Il contatto che usano già' },
    { titolo: 'Un prezzo chiaro', nota: 'Deciso prima, non dopo' },
  ],
};

export const problema = {
  numero: '01',
  etichetta: 'Il problema',
  titolo: [
    'Il vero problema non è non avere un sito.',
    'È ciò che trova il cliente quando prova a fidarsi di te.',
  ],
  introduzione:
    'Qualcuno ha fatto il tuo nome. Il cliente lo cerca sul telefono, di sera, mentre decide. Quello che vede in quei venti secondi vale quanto vent’anni di mestiere.',
  conseguenze: [
    {
      titolo: 'Trova poco o nulla',
      testo:
        'Non capisce se l’attività è ancora attiva, quali servizi offre o dove lavora.',
    },
    {
      titolo: 'Le informazioni sono sparse',
      testo:
        'Qualche fotografia, un vecchio post e nessun percorso chiaro per contattare l’attività.',
    },
    {
      titolo: 'Un concorrente sembra più affidabile',
      testo:
        'Non perché lavori meglio, ma perché si presenta in modo più professionale.',
    },
  ],
  citazione: {
    prima: 'Il passaparola porta il tuo nome fino a qualcuno.',
    dopo: 'Il sito gli dà un motivo per scegliere te.',
  },
};

export const soluzione = {
  numero: '02',
  etichetta: 'La soluzione',
  titolo: ['Non ti serve un sito enorme.', 'Ti serve quello giusto.'],
  testo: [
    'Sito in Vista realizza siti per artigiani, negozi, professionisti e piccole attività che vogliono presentarsi bene senza acquistare funzioni inutili.',
    'Niente pannelli da imparare, niente abbonamenti a strumenti che non useresti mai. Una pagina — o poche pagine — che fanno bene tre cose.',
  ],
  punti: [
    {
      chiave: 'Racconta',
      titolo: 'Racconta l’attività con parole semplici',
      testo:
        'Chi sei, da quanto lavori, in che zona, cosa ti distingue. Scritto come parleresti a un cliente, non come un depliant.',
    },
    {
      chiave: 'Mostra',
      titolo: 'Mostra servizi, lavori e fotografie',
      testo:
        'L’elenco chiaro di ciò che fai e le immagini dei lavori finiti: la prova che vale più di qualsiasi aggettivo.',
    },
    {
      chiave: 'Porta',
      titolo: 'Porta il visitatore direttamente al contatto',
      testo:
        'Telefono, WhatsApp, mappa. Sempre a portata di pollice, in ogni punto della pagina.',
    },
  ],
};

export const metodo = {
  numero: '04',
  etichetta: 'Come lavoro',
  titolo: ['Tu conosci la tua attività.', 'Al sito pensa Sito in Vista.'],
  testo:
    'Quattro passaggi, nessuna sorpresa. Il tuo impegno si concentra quasi tutto nel primo.',
  passi: [
    {
      titolo: 'Raccolta',
      testo:
        'Servizi, zona, contatti, fotografie e obiettivi. Bastano poche risposte mirate: alle domande giuste ci penso io.',
    },
    {
      titolo: 'Prima bozza',
      testo:
        'Preparazione della prima bozza, pensata soprattutto per telefono — perché è lì che il tuo cliente ti guarderà.',
    },
    {
      titolo: 'Modifiche',
      testo:
        'Raccolta delle modifiche previste dal pacchetto. Le rivediamo insieme, in blocco, senza scambi infiniti.',
    },
    {
      titolo: 'Pubblicazione',
      testo:
        'Collegamento di dominio, contatti, mappa e WhatsApp e pubblicazione. Da quel momento sei in vista.',
    },
  ],
};

export const adatto = {
  numero: '07',
  etichetta: 'Facciamo chiarezza',
  titolo: ['A chi serve davvero', 'e a chi no.'],
  testo:
    'Preferisco dirlo prima: un pacchetto onesto è un pacchetto con dei confini. Se ti riconosci nella colonna di sinistra, siamo nel posto giusto.',
  positivo: {
    titolo: 'Il servizio è indicato per chi',
    voci: [
      'è un artigiano, professionista o piccola attività;',
      'ha soltanto social, scheda Google o quasi nulla;',
      'vuole mostrare servizi, fotografie e contatti;',
      'cerca semplicità, chiarezza e costi accessibili.',
    ],
  },
  negativo: {
    titolo: 'Non è il pacchetto standard adatto a chi cerca',
    voci: [
      'e-commerce articolato;',
      'prenotazioni complesse;',
      'software personalizzato;',
      'database o area riservata;',
      'SEO avanzata;',
      'gestione quotidiana di social, messaggi o campagne.',
    ],
    nota: 'Queste esigenze non sono un “no”: possono essere preventivate separatamente.',
  },
};

export const chiusura = {
  numero: '09',
  etichetta: 'Parliamone',
  titolo: [
    { testo: 'Mettiamo la tua', peso: 'leggero' },
    { testo: 'attività a fuoco.', peso: 'forte' },
  ],
  testo:
    'Racconta che cosa fai, in quale città lavori e che cosa vorresti mostrare. Da lì capiremo quale sito ti serve davvero.',
  azione: 'Scrivi su WhatsApp',
  nota: 'Nessun impegno, nessun preventivo automatico: prima si capisce, poi si decide.',
};
