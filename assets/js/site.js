/* ============================================================
   IG 74 ÉTANCHÉITÉ SERVICES — Comportements communs à toutes
   les pages : menu mobile, apparition au scroll, ombre du header.
   ============================================================ */
(function () {
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  if (burger) {
    burger.addEventListener('click', function () {
      document.body.classList.toggle('mobile-open');
      nav.classList.toggle('mobile-open');
    });
  }
  document.querySelectorAll('.navlinks a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.body.classList.remove('mobile-open');
      nav.classList.remove('mobile-open');
    });
  });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  var hdr = document.querySelector('header');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('scrolled', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
