import { esc } from './util.js';
import { meta, marchio, DOMINIO, linkWhatsApp } from './dati/sito.js';
import { pacchetti } from './dati/pacchetti.js';
import { gruppiFaq } from './dati/faq.js';

/** Dati strutturati: attività + domande frequenti. Solo contenuti veri. */
function datiStrutturati() {
  const servizio = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: marchio.nome,
    slogan: marchio.payoff,
    description: meta.descrizione,
    url: DOMINIO,
    areaServed: { '@type': 'Country', name: 'Italia' },
    serviceType: 'Realizzazione siti web per piccole attività',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pacchetti',
      itemListElement: pacchetti.map((p) => ({
        '@type': 'Offer',
        name: p.nome,
        price: p.prezzo,
        priceCurrency: 'EUR',
       description: p.promessa,
      })),
    },
  };

  const domande = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: gruppiFaq.flatMap((g) =>
      g.voci.map((v) => ({
        '@type': 'Question',
        name: v.domanda,
        acceptedAnswer: { '@type': 'Answer', text: v.risposta.join(' ') },
      }))
    ),
  };

  return [servizio, domande]
    .map(
      (d) =>
        `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`
    )
    .join('\n  ');
}

export function documento({ corpo, css, js, versione }) {
  const url = DOMINIO.replace(/\/$/, '');
  const immagine = `${url}${meta.immagineSocial}`;

  return `<!doctype html>
<html lang="${esc(meta.lingua)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(meta.titolo)}</title>
  <meta name="description" content="${esc(meta.descrizione)}">
  <meta name="author" content="${esc(meta.autore)}">
  <meta name="theme-color" content="#F8F2E6" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#083B3D" media="(prefers-color-scheme: dark)">
  <link rel="canonical" href="${esc(url)}/">

  <link rel="icon" href="/marchio/favicon.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/marchio/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/marchio/icona-180.png">
  <link rel="manifest" href="/manifesto.webmanifest">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(marchio.nome)}">
  <meta property="og:locale" content="it_IT">
  <meta property="og:title" content="${esc(meta.titolo)}">
  <meta property="og:description" content="${esc(meta.descrizione)}">
  <meta property="og:url" content="${esc(url)}/">
  <meta property="og:image" content="${esc(immagine)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(meta.immagineSocialAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(meta.titolo)}">
  <meta name="twitter:description" content="${esc(meta.descrizione)}">
  <meta name="twitter:image" content="${esc(immagine)}">

  <link rel="preload" href="/font/jost-200-700-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/${esc(css)}">

  <!-- Le comparse in scorrimento si attivano solo se lo script può gestirle. -->
  <script>if('IntersectionObserver' in window)document.documentElement.setAttribute('data-script','')</script>

  ${datiStrutturati()}
</head>
<body>
${corpo}
<script src="/${esc(js)}" defer></script>
<!-- Sito in Vista — build ${esc(versione)} -->
</body>
</html>
`;
}

export { linkWhatsApp };
