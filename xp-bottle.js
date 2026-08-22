(() => {
  const add = () => {
    if (!Array.isArray(window.ITEMS)) return false;
    if (!window.ITEMS.some(x => /bouteille.*xp|xp.*1000/i.test(String(x?.[0]||'')))) {
      window.ITEMS.push(['Bouteille d’XP — 1000 XP',['XP 1000','Bouteille XP 1000'],'Ressources','Rare','images/xp-bottle-1000.svg',850,600,1200,null,'1000 XP',null,'Bouteille d’expérience contenant exactement 1000 XP.','Objet XP — 1000 XP uniquement']);
    }
    return true;
  };
  if (!add()) { let n=0; const t=setInterval(()=>{if(add()||++n>30)clearInterval(t)},100); }
})();
