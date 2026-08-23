(() => {
  'use strict';
  if (window.__PC_XP_BOTTLES__) return;
  window.__PC_XP_BOTTLES__ = true;

  const defs = [
    ['Bouteille d’XP — Fermier — 1000 XP',['XP','Fermier','Fermeur','Farmer','XP Fermier 1000','Bouteille XP Fermier','Bouteille XP','1000 XP'],'Ressources','Rare','images/xp-fermier.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience du métier Fermier contenant exactement 1000 XP.','XP métier Fermier — 1000 XP uniquement'],
    ['Bouteille d’XP — Mineur — 1000 XP',['XP','Mineur','Miner','XP Mineur 1000','Bouteille XP Mineur','Bouteille XP','1000 XP'],'Ressources','Rare','images/xp-mineur.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience du métier Mineur contenant exactement 1000 XP.','XP métier Mineur — 1000 XP uniquement'],
    ['Bouteille d’XP — Alchimiste — 1000 XP',['XP','Alchimiste','Alchemist','XP Alchimiste 1000','Bouteille XP Alchimiste','Bouteille XP','1000 XP'],'Ressources','Rare','images/xp-alchimiste.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience du métier Alchimiste contenant exactement 1000 XP.','XP métier Alchimiste — 1000 XP uniquement'],
    ['Bouteille d’XP — Chasseur — 1000 XP',['XP','Chasseur','Hunter','XP Chasseur 1000','Bouteille XP Chasseur','Bouteille XP','1000 XP'],'Ressources','Rare','images/xp-chasseur.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience du métier Chasseur contenant exactement 1000 XP.','XP métier Chasseur — 1000 XP uniquement']
  ];

  function add() {
    if (typeof ITEMS === 'undefined' || !Array.isArray(ITEMS)) return false;
    let changed = false;
    for (const item of defs) {
      const existing = ITEMS.find(x => String(x?.[0] || '').toLowerCase() === item[0].toLowerCase());
      if (!existing) {
        ITEMS.push(item);
        changed = true;
      } else if (existing[4] !== item[4]) {
        existing[4] = item[4];
        changed = true;
      }
    }
    if (changed) document.dispatchEvent(new Event('pricecheck:catalog-updated'));
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => {
    if (add() || ++tries > 100) clearInterval(timer);
  }, 100);
  add();
})();
