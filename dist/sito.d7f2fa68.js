/* =================================================================
   Sito in Vista — comportamenti di pagina.
   Nessuna libreria: il sito funziona anche senza questo file.
   ================================================================= */
(function () {
  'use strict';

  /* --- testata: sfondo quando la pagina scorre -------------------- */
  var testata = document.querySelector('[data-testata]');
  var fisso = document.querySelector('[data-fisso]');
  var apertura = document.getElementById('apertura');

  function allaScorsa() {
    var y = window.scrollY || 0;
    if (testata) {
      if (y > 12) testata.setAttribute('data-attaccata', '');
      else testata.removeAttribute('data-attaccata');
    }
    if (fisso) {
      var soglia = apertura ? apertura.offsetHeight * 0.6 : 400;
      if (y > soglia) fisso.setAttribute('data-visibile', '');
      else fisso.removeAttribute('data-visibile');
    }
  }

  var inAttesa = false;
  function programma() {
    if (inAttesa) return;
    inAttesa = true;
    window.requestAnimationFrame(function () {
      inAttesa = false;
      allaScorsa();
    });
  }
  window.addEventListener('scroll', programma, { passive: true });
  window.addEventListener('resize', programma, { passive: true });
  allaScorsa();

  /* --- menu del telefono ----------------------------------------- */
  var tasto = document.querySelector('[data-menu]');
  var navigazione = document.getElementById('navigazione');

  function chiudiMenu() {
    if (!tasto || !navigazione) return;
    tasto.setAttribute('aria-expanded', 'false');
    navigazione.removeAttribute('data-aperta');
  }

  if (tasto && navigazione) {
    tasto.addEventListener('click', function () {
      var aperto = tasto.getAttribute('aria-expanded') === 'true';
      tasto.setAttribute('aria-expanded', String(!aperto));
      if (aperto) navigazione.removeAttribute('data-aperta');
      else navigazione.setAttribute('data-aperta', '');
    });

    navigazione.addEventListener('click', function (e) {
      if (e.target.closest('a')) chiudiMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tasto.getAttribute('aria-expanded') === 'true') {
        chiudiMenu();
        tasto.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) chiudiMenu();
    });
  }

  /* --- comparse e voce di menu attiva ---------------------------- */
  if ('IntersectionObserver' in window) {
    var comparsa = new IntersectionObserver(
      function (voci) {
        voci.forEach(function (v) {
          if (!v.isIntersecting) return;
          v.target.setAttribute('data-visto', '');
          comparsa.unobserve(v.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    document
      .querySelectorAll('[data-comparsa], .conseguenza, .citazione')
      .forEach(function (el) {
        comparsa.observe(el);
      });

    /* voce di menu corrispondente alla sezione visibile */
    var voci = Array.prototype.slice.call(
      document.querySelectorAll('.navigazione__lista a[href^="#"]')
    );
    var sezioni = voci
      .map(function (a) {
        return document.querySelector(a.getAttribute('href'));
      })
      .filter(Boolean);

    if (sezioni.length) {
      var attiva = new IntersectionObserver(
        function (entrate) {
          entrate.forEach(function (e) {
            var voce = voci[sezioni.indexOf(e.target)];
            if (!voce) return;
            if (e.isIntersecting) {
              voci.forEach(function (a) {
                a.removeAttribute('aria-current');
              });
              voce.setAttribute('aria-current', 'true');
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      sezioni.forEach(function (s) {
        attiva.observe(s);
      });
    }
  }

  /* --- rete di sicurezza -----------------------------------------
     Se per qualsiasi motivo l'osservatore non entrasse in funzione,
     dopo il caricamento tutto torna comunque visibile.            */
  window.addEventListener('load', function () {
    window.setTimeout(function () {
      document.querySelectorAll('[data-comparsa]:not([data-visto])').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.setAttribute('data-visto', '');
      });
    }, 1200);
  });
})();
