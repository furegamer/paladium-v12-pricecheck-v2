(() => {
  'use strict';
  if (!location.pathname.endsWith('/changelog.html')) return;
  const ready = () => {
    const main = document.querySelector('main') || document.body;
    if (main.querySelector('.pc-live-changelog')) return;
    const entry = document.createElement('section');
    entry.className = 'pc-live-changelog';
    entry.innerHTML = '<div class="pc-live-date">22/08/2026 • 13:55 (UTC+2)</div><h2>V13.1 — Market & catalogue</h2><ul><li>💰 Le portefeuille ouvre maintenant une page dédiée pour voir ce qui est achetable avec ton budget.</li><li>🛒 Les recommandations classent les achats accessibles selon leur prix et une confiance estimée.</li><li>📚 Correction du rafraîchissement du catalogue après navigation retour/avant ou restauration mobile.</li><li>⚡ Actualisation visuelle de la page XP & POG avec une indication claire de la date de revue.</li></ul><small>Seules les améliorations réellement déployées sont listées ici.</small>';
    const style = document.createElement('style');
    style.textContent = '.pc-live-changelog{margin:0 0 20px;padding:18px;border:1px solid #334155;border-radius:17px;background:linear-gradient(135deg,#101827,#17112a)}.pc-live-changelog h2{margin:5px 0 10px}.pc-live-changelog ul{margin:0;padding-left:20px;color:#cbd5e1;line-height:1.7}.pc-live-changelog small,.pc-live-date{color:#94a3b8}.pc-live-date{font-size:12px;font-weight:800}';
    document.head.appendChild(style);
    main.prepend(entry);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true}); else ready();
})();
