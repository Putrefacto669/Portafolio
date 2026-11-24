(function () {
  var clock = document.getElementById('clock');
  var mood = document.getElementById('mood');
  function tick() {
    try {
      var now = new Date();
      var hm = new Intl.DateTimeFormat('es-NI', { timeZone: 'America/Managua', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
      clock.textContent = hm;
      var h = parseInt(hm.slice(0, 2), 10);
      mood.textContent = (h >= 23 || h < 5) ? '· despierto, probablemente haciendo commits' : '· disponible para trabajo remoto';
    } catch (e) { clock.textContent = ''; }
  }
  tick(); setInterval(tick, 30000);

  var btn = document.getElementById('copy');
  var out = document.getElementById('copied');
  var email = document.getElementById('email');
  btn.addEventListener('click', function () {
    var text = email.textContent;
    function selectIt() {
      var r = document.createRange(); r.selectNodeContents(email);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      out.textContent = 'seleccionado, usa Ctrl+C';
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { out.textContent = 'copiado ✓'; }, selectIt);
    } else { selectIt(); }
    setTimeout(function () { out.textContent = ''; }, 2500);
  });
})();
