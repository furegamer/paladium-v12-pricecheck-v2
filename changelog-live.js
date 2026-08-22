(() => {
  'use strict';
  if (!location.pathname.endsWith('/changelog.html')) return;
  const ready=()=>{
    const main=document.querySelector('main')||document.body;if(main.querySelector('.pc-live-changelog'))return;
    const entry=document.createElement('section');entry.className='pc-live-changelog';
    entry.innerHTML='<div class="pc-live-date">22/08/2026 • 18:42 (UTC+2)</div><h2>V12.10 — Profils, classements & progression persistante</h2><ul><li>💾 Le niveau choisi pour chaque métier est maintenant enregistré automatiquement dans le navigateur.</li><li>🪓 Le niveau de POG est lui aussi mémorisé et restauré automatiquement.</li><li>🧹 Suppression de la navigation automatique 1→20 qui recréait le niveau 1 après suppression.</li><li>⛏️ La page POG affiche clairement le bloc le plus facile à casser pour le niveau sélectionné.</li><li>🏆 Ajout des classements communautaires : portefeuille, Mineur, Fermier, Chasseur, Alchimiste et POG.</li><li>🟢 Ajout du compteur de joueurs actifs sur le profil, basé sur un signal de présence de 90 secondes.</li><li>👤 Ajout d’une page Profil avec pseudo, portefeuille et niveaux.</li></ul><small>Seules les améliorations réellement mises en place sont annoncées comme terminées.</small>';
    const style=document.createElement('style');style.textContent='.pc-live-changelog{margin:0 0 20px;padding:18px;border:1px solid #334155;border-radius:17px;background:linear-gradient(135deg,#101827,#17112a)}.pc-live-changelog h2{margin:5px 0 10px}.pc-live-changelog ul{margin:0;padding-left:20px;color:#cbd5e1;line-height:1.7}.pc-live-changelog small,.pc-live-date{color:#94a3b8}.pc-live-date{font-size:12px;font-weight:800}';document.head.appendChild(style);main.prepend(entry);
  };if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
