(() => {
  'use strict';
  if (!location.pathname.endsWith('/xp.html')) return;
  const ready = () => {
    const hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.pc-xp-update')) return;
    const box = document.createElement('div');
    box.className = 'pc-xp-update';
    box.innerHTML = '<strong>⚡ XP & POG — actualisé</strong><span>22/08/2026 • données communautaires V12 revues pour PriceCheck</span><a href="budget.html">💰 Voir ce que tu peux acheter</a>';
    hero.appendChild(box);
    const style = document.createElement('style');
    style.textContent = '.pc-xp-update{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:14px;padding:12px 14px;border:1px solid #334155;border-radius:14px;background:linear-gradient(135deg,#0d1421,#17112a);color:#cbd5e1;font-size:12px}.pc-xp-update strong{color:#ddd6fe}.pc-xp-update span{color:#94a3b8}.pc-xp-update a{margin-left:auto;padding:8px 10px;border-radius:9px;background:#7c3aed;color:#fff;text-decoration:none;font-weight:800}@media(max-width:640px){.pc-xp-update a{margin-left:0;width:100%;text-align:center}}';
    document.head.appendChild(style);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true}); else ready();
})();
