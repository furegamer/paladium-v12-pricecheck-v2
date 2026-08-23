(() => {
  'use strict';
  if (window.__PRICECHECK_XP_BOTTLES__) return;
  window.__PRICECHECK_XP_BOTTLES__ = true;
  if (typeof ITEMS === 'undefined') return;

  const bottles = [
    ['Bouteille XP Mineur — 1000 XP', ['XP','Mineur','Miner','Bouteille XP','XP bottle','1000 XP'], 'Métiers', 'Rare', 'images/xp-mineur.svg'],
    ['Bouteille XP Fermier — 1000 XP', ['XP','Fermier','Farmer','Fermeur','Bouteille XP','XP bottle','1000 XP'], 'Métiers', 'Rare', 'images/xp-fermier.svg'],
    ['Bouteille XP Alchimiste — 1000 XP', ['XP','Alchimiste','Alchemist','Bouteille XP','XP bottle','1000 XP'], 'Métiers', 'Rare', 'images/xp-alchimiste.svg'],
    ['Bouteille XP Chasseur — 1000 XP', ['XP','Chasseur','Hunter','Bouteille XP','XP bottle','1000 XP'], 'Métiers', 'Rare', 'images/xp-chasseur.svg']
  ];

  const existing = new Set(ITEMS.map(x => String(x[0]).toLowerCase()));
  for (const [name, aliases, category, rarity, image] of bottles) {
    if (existing.has(name.toLowerCase())) continue;
    ITEMS.push([
      name, aliases, category, rarity, image,
      0, 0, 0, null, null, null,
      'Bouteille contenant exactement 1000 XP pour le métier indiqué.',
      'Valeur/prix à documenter'
    ]);
  }
  document.dispatchEvent(new Event('pricecheck:catalog-updated'));
})();
