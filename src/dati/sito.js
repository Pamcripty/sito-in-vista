/* ------------------------------------------------------------------
   Sito in Vista — dati generali del sito
   Modifica qui: numero WhatsApp, dominio, testi del menu, metadata.
   ------------------------------------------------------------------ */

/* ⚠️  NUMERO WHATSAPP — UNICA COSTANTE DA COMPILARE ⚠️
   Formato internazionale, solo cifre: prefisso paese + numero,
   senza "+", senza spazi, senza zeri iniziali.
   Esempio per l'Italia: '393401234567'
   Finché resta vuota, i pulsanti aprono WhatsApp con il messaggio
   già scritto ma senza destinatario. */
export const NUMERO_WHATSAPP = '';

/* Messaggio già pronto nella chat quando il cliente scrive. */
export const MESSAGGIO_WHATSAPP = 'Ciao, vorrei capire quale sito è più adatto alla mia attività.';

/* Indirizzo pubblico del sito: serve per i metadata, la sitemap e
   l'anteprima social. Quando il sito viene pubblicato da GitHub Actions
   la variabile d'ambiente DOMINIO ha la precedenza, così l'indirizzo di
   GitHub Pages entra da solo senza dover modificare questo file. */
export const DOMINIO = process.env.DOMINIO || 'https://sitoinvista.it';

export const marchio = {
  nome: 'Sito in Vista',
  nomeLeggero: 'Sito in',
  nomeForte: 'Vista',
  descrittore: 'Siti web per piccole attività',
  payoff: 'Quando ti cercano, ci sei.',
  email: '',
};

export const meta = {
  titolo: 'Sito in Vista — Siti web per piccole attività',
  descrizione:
    'Siti web semplici, belli e professionali per artigiani, negozi e piccole attività. Mostra chi sei, cosa fai e come contattarti. Prezzi chiari a partire da 179 €.',
  lingua: 'it',
  autore: 'Sito in Vista',
  immagineSocial: '/social/anteprima.png',
  immagineSocialAlt:
    'Sito in Vista — Siti web per piccole attività. Quando ti cercano, ci sei.',
};

/* Voci del menu: l'href deve corrispondere all'id di una sezione. */
export const menu = [
  { etichetta: 'Il problema', href: '#problema' },
  { etichetta: 'Come lavoro', href: '#metodo' },
  { etichetta: 'Progetti', href: '#progetti' },
  { etichetta: 'Pacchetti', href: '#pacchetti' },
  { etichetta: 'Domande', href: '#domande' },
];

/* Costruisce il link WhatsApp. Se il numero non è ancora stato inserito
   il link apre comunque WhatsApp con il messaggio precompilato. */
export function linkWhatsApp(messaggio = MESSAGGIO_WHATSAPP) {
  const testo = encodeURIComponent(messaggio);
  const numero = String(NUMERO_WHATSAPP).replace(/\D/g, '');
  return numero ? `https://wa.me/${numero}?text=${testo}` : `https://wa.me/?text=${testo}`;
}
