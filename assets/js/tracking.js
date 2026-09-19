/* ============================================================
   IG 74 ÉTANCHÉITÉ SERVICES — Hooks de suivi (préparation, non connecté)
   Repris du socle MF Building (logique générique, aucune donnée
   propre à MF). Pousse les événements dans window.dataLayer
   uniquement. Aucun appel réseau, aucun GA4/GTM/Ads chargé ici.
   Aucune donnée personnelle (PII) n'est jamais envoyée.

   À connecter à un futur conteneur GTM/GA4 IG74 une fois créé et
   validé par le client — aucun identifiant MF Building n'est
   repris (voir rapport final).

   Convention data-* :
   data-track="<event_name>"        déclenche l'événement au clic
   data-track-location="<zone>"     force la valeur de link_location
   data-service="<slug>"            nom du service pour service_click
   ============================================================ */
window.trackEvent = window.trackEvent || function (name, data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({
    event: name,
    page_path: window.location.pathname,
    page_title: document.title
  }, data || {}));
};

(function () {
  var LOCATION_SELECTORS = [
    ['.mobile-cta-bar', 'sticky_mobile'],
    ['.topbar', 'topbar'],
    ['header', 'header'],
    ['.hero, .svc-hero, .legal-hero, .contact-hero', 'hero'],
    ['#contact, .contact-grid', 'contact_section'],
    ['.aside', 'content'],
    ['footer', 'footer']
  ];

  function inferLocation(el) {
    var explicit = el.closest('[data-track-location]');
    if (explicit) return explicit.getAttribute('data-track-location');
    for (var i = 0; i < LOCATION_SELECTORS.length; i++) {
      if (el.closest(LOCATION_SELECTORS[i][0])) return LOCATION_SELECTORS[i][1];
    }
    return 'content';
  }

  document.addEventListener('click', function (ev) {
    var tel = ev.target.closest('a[href^="tel:"]');
    if (tel) { trackEvent('phone_click', { link_location: inferLocation(tel) }); return; }

    var mail = ev.target.closest('a[href^="mailto:"]');
    if (mail) { trackEvent('contact_click', { link_location: inferLocation(mail) }); return; }

    var el = ev.target.closest('[data-track]');
    if (!el) return;

    var name = el.getAttribute('data-track');
    var data = { link_location: inferLocation(el) };

    if (name === 'quote_click') data.cta_text = (el.textContent || '').trim();
    if (name === 'service_click') {
      data.service_name = el.getAttribute('data-service') || '';
      data.destination = el.getAttribute('href') || '';
    }
    trackEvent(name, data);
  });
})();
