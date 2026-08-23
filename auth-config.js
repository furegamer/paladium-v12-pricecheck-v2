window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/admin.html"
};

const playerStats = document.createElement('script');
playerStats.src = 'player-stats.js?v=14.0';
playerStats.defer = true;
document.head.appendChild(playerStats);

if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/paladium-v12-pricecheck-v2/') || location.pathname.endsWith('/paladium-v12-pricecheck-v2')) {
  const catalogFix = document.createElement('script'); catalogFix.src = 'catalog-fix.js?v=14.0'; catalogFix.defer = true; document.head.appendChild(catalogFix);
  const wood = document.createElement('script'); wood.src = 'wood-items.js?v=14.0'; wood.defer = true; document.head.appendChild(wood);
  const xpBottle = document.createElement('script'); xpBottle.src = 'xp-bottle.js?v=14.0'; xpBottle.defer = true; document.head.appendChild(xpBottle);
  const assets = document.createElement('script'); assets.src = 'catalog-assets-v14.js?v=14.0'; assets.defer = true; document.head.appendChild(assets);
}
if (location.pathname.endsWith('/budget.html')) {
  const budgetPB = document.createElement('script'); budgetPB.src = 'budget-pb.js?v=14.0'; budgetPB.defer = true; document.head.appendChild(budgetPB);
  const wood = document.createElement('script'); wood.src = 'wood-items.js?v=14.0'; wood.defer = true; document.head.appendChild(wood);
  const assets = document.createElement('script'); assets.src = 'catalog-assets-v14.js?v=14.0'; assets.defer = true; document.head.appendChild(assets);
}
if (location.pathname.endsWith('/xp.html')) {
  const xpUpgrade = document.createElement('script'); xpUpgrade.src = 'xp-upgrade.js?v=14.0'; xpUpgrade.defer = true; document.head.appendChild(xpUpgrade);
  const levels = document.createElement('script'); levels.src = 'levels-persistence.js?v=14.0'; levels.defer = true; document.head.appendChild(levels);
}
if (location.pathname.endsWith('/profile.html')) {
  const profileFix = document.createElement('script'); profileFix.src = 'profile-fix-v14.js?v=14.0'; profileFix.defer = true; document.head.appendChild(profileFix);
}
if (location.pathname.endsWith('/changelog.html')) {
  const changelog = document.createElement('script'); changelog.src = 'changelog-live.js?v=14.0'; changelog.defer = true; document.head.appendChild(changelog);
}