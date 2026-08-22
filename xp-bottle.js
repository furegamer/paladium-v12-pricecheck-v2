(() => {
  'use strict';
  const add = () => {
    if (!Array.isArray(window.ITEMS)) return false;
    const defs = [
      ['Bouteille d’XP — Fermier — 1000 XP',['XP Fermier 1000','Bouteille XP Fermier','XP 1000'],'Ressources','Rare','images/xp-bottle-1000.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience dédiée au métier Fermier, contenant exactement 1000 XP.','XP métier Fermier — 1000 XP uniquement'],
      ['Bouteille d’XP — Mineur — 1000 XP',['XP Mineur 1000','Bouteille XP Mineur','XP 1000'],'Ressources','Rare','images/xp-bottle-1000.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience dédiée au métier Mineur, contenant exactement 1000 XP.','XP métier Mineur — 1000 XP uniquement'],
      ['Bouteille d’XP — Alchimiste — 1000 XP',['XP Alchimiste 1000','Bouteille XP Alchimiste','XP 1000'],'Ressources','Rare','images/xp-bottle-1000.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience dédiée au métier Alchimiste, contenant exactement 1000 XP.','XP métier Alchimiste — 1000 XP uniquement'],
      ['Bouteille d’XP — Chasseur — 1000 XP',['XP Chasseur 1000','Bouteille XP Chasseur','XP 1000'],'Ressources','Rare','images/xp-bottle-1000.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience dédiée au métier Chasseur, contenant exactement 1000 XP.','XP métier Chasseur — 1000 XP uniquement']
    ];
    for (const item of defs) {
      if (!window.ITEMS.some(x => String(x?.[0]||'').toLowerCase() === item[0].toLowerCase())) window.ITEMS.push(item);
    }
    return true;
  };
  if (!add()) { let n=0; const t=setInterval(()=>{if(add()||++n>40)clearInterval(t)},100); }
})();
