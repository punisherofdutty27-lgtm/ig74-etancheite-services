/* ============================================================
   IG 74 ÉTANCHÉITÉ SERVICES — Formulaire de devis multi-étapes
   Logique de wizard reprise du socle MF Building (comportement
   éprouvé : choix guidé, validation par étape, suivi).

   Différence volontaire : le formulaire n'a pas encore de
   destination d'envoi validée (aucun compte Formspree/e-mail
   IG74 fourni). Tant que #devisform ne porte pas
   data-endpoint-ready="true", la soumission n'essaie pas
   d'envoyer les données ailleurs : elle affiche un message
   neutre au lieu d'un faux succès ou d'un vrai envoi vers un
   endpoint tiers non autorisé pour IG74.
   ============================================================ */
(function () {
  var form = document.getElementById('devisform');
  if (!form) return;

  var track = function (name, data) { (window.trackEvent || function () {})(name, data); };

  var steps = [].slice.call(form.querySelectorAll('.form-step'));
  var fpSteps = [].slice.call(document.querySelectorAll('#formProgress .fp-step'));

  function showStep(n) {
    steps.forEach(function (s) { s.classList.toggle('active', +s.dataset.step === n); });
    fpSteps.forEach(function (p) {
      var v = +p.dataset.step;
      p.classList.toggle('active', v === n);
      p.classList.toggle('done', v < n);
    });
    track('form_step', { step: n });
  }

  var formStarted = false;
  function markStart() { if (!formStarted) { formStarted = true; track('form_start', {}); } }

  var choiceBtns = [].slice.call(form.querySelectorAll('.choice-btn'));
  var fProbleme = document.getElementById('fProbleme');
  var step1Next = document.getElementById('step1Next');

  choiceBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      markStart();
      choiceBtns.forEach(function (x) { x.classList.remove('selected'); x.setAttribute('aria-checked', 'false'); });
      b.classList.add('selected'); b.setAttribute('aria-checked', 'true');
      fProbleme.value = b.dataset.value;
      step1Next.disabled = false;
    });
  });

  var localisation = document.getElementById('localisation');
  step1Next.addEventListener('click', function () { if (fProbleme.value) showStep(2); });
  document.getElementById('step2Next').addEventListener('click', function () {
    if (localisation.value.trim()) { showStep(3); } else { localisation.focus(); }
  });
  document.getElementById('step2Back').addEventListener('click', function () { showStep(1); });
  document.getElementById('step3Back').addEventListener('click', function () { showStep(2); });

  function resetWizard() {
    showStep(1);
    choiceBtns.forEach(function (x) { x.classList.remove('selected'); x.setAttribute('aria-checked', 'false'); });
    fProbleme.value = '';
    step1Next.disabled = true;
    formStarted = false;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    var ok = document.getElementById('formok');
    var err = document.getElementById('formerr');
    var pending = document.getElementById('formpending');
    ok.style.display = 'none'; err.style.display = 'none';
    if (pending) pending.style.display = 'none';

    if (form.dataset.endpointReady !== 'true') {
      /* Aucune destination d'envoi validée pour IG74 : on ne simule
         pas un envoi réussi et on n'appelle aucun service tiers. */
      track('form_submit_attempt', {});
      if (pending) pending.style.display = 'block';
      return;
    }

    var t = btn.textContent; btn.disabled = true; btn.textContent = '…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (r.ok) {
          form.reset(); resetWizard(); ok.style.display = 'block';
          track('form_submit', {});
          track('generate_lead', {});
        } else { err.style.display = 'block'; }
      })
      .catch(function () { err.style.display = 'block'; })
      .finally(function () { btn.disabled = false; btn.textContent = t; });
  });
})();
