/* ============================================================
   IG 74 ÉTANCHÉITÉ SERVICES — Configuration centrale du site
   Toutes les données d'identité/contact affichées sur le site
   viennent d'ici. Tant que téléphone/e-mail/domaine ne sont pas
   fournis par le client, ils restent à `null` : aucune valeur
   n'est inventée, et les éléments correspondants (data-ig74=...)
   s'affichent avec un texte neutre au lieu d'un lien tel:/mailto:.

   Pour activer le téléphone ou l'e-mail plus tard, il suffit de
   renseigner IG74_CONFIG.phone / .email ci-dessous : la mise à
   jour se propage automatiquement à toutes les pages du site.
   ============================================================ */
window.IG74_CONFIG = {
  brand: "IG 74 Étanchéité Services",
  siren: "890 019 482",
  address: "267 Chemin des Voies",
  postalCode: "74140",
  city: "Sciez",
  zoneShort: "Sciez, Thonon-les-Bains, Évian-les-Bains",
  zoneLong: "Sciez, Thonon-les-Bains, Évian-les-Bains et dans toute la Haute-Savoie et la Savoie",
  phone: null,   // À COMPLÉTER — ex: "+33 4 50 00 00 00"
  email: null,   // À COMPLÉTER — ex: "contact@ig74-etancheite.fr"
  domain: null   // À COMPLÉTER — nom de domaine définitif une fois choisi
};

(function () {
  var cfg = window.IG74_CONFIG;

  document.querySelectorAll('[data-ig74="phone"]').forEach(function (el) {
    if (cfg.phone) {
      el.textContent = cfg.phone;
      el.setAttribute('href', 'tel:' + cfg.phone.replace(/[^0-9+]/g, ''));
    } else {
      el.textContent = 'Téléphone à venir';
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
    }
  });

  document.querySelectorAll('[data-ig74="email"]').forEach(function (el) {
    if (cfg.email) {
      el.textContent = cfg.email;
      el.setAttribute('href', 'mailto:' + cfg.email);
    } else {
      el.textContent = 'E-mail à venir';
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
    }
  });

  document.querySelectorAll('[data-ig74="phone-cta"]').forEach(function (el) {
    if (cfg.phone) {
      el.setAttribute('href', 'tel:' + cfg.phone.replace(/[^0-9+]/g, ''));
    }
    /* sans numéro validé : le lien pointe vers la page de contact
       (comportement déjà défini dans le HTML), pas de tel: fictif */
  });

  document.querySelectorAll('[data-ig74="address"]').forEach(function (el) {
    el.textContent = cfg.address + ' · ' + cfg.postalCode + ' ' + cfg.city;
  });

  document.querySelectorAll('[data-ig74="year"]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
