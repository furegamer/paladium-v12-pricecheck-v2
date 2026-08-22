window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/admin.html"
};

const playerStats = document.createElement('script');
playerStats.src = 'player-stats.js?v=12.11';
playerStats.defer = false;
document.head.appendChild(playerStats);

if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/paladium-v12-pricecheck-v2/') || location.pathname.endsWith('/paladium-v12-pricecheck-v2')) {
  const budget = document.createElement('script'); budget.src = 'budget-planner.js?v=13.2'; budget.defer = false; document.head.appendChild(budget);
  const hud = document.createElement('script'); hud.src = 'pricecheck-hud.js?v=13.2'; hud.defer = false; document.head.appendChild(hud);
  const catalogFix = document.createElement('script'); catalogFix.src = 'catalog-fix.js?v=13.2'; catalogFix.defer = false; document.head.appendChild(catalogFix);
  const xpBottle = document.createElement('script'); xpBottle.src = 'xp-bottle.js?v=12.11'; xpBottle.defer = false; document.head.appendChild(xpBottle);
}

if (location.pathname.endsWith('/budget.html')) {
  const budgetPB = document.createElement('script'); budgetPB.src = 'budget-pb.js?v=12.11'; budgetPB.defer = false; document.head.appendChild(budgetPB);
}

if (location.pathname.endsWith('/xp.html')) {
  const xpUpgrade = document.createElement('script'); xpUpgrade.src = 'xp-upgrade.js?v=12.11'; xpUpgrade.defer = false; document.head.appendChild(xpUpgrade);
}

if (location.pathname.endsWith('/changelog.html')) {
  const changelog = document.createElement('script'); changelog.src = 'changelog-live.js?v=13.2'; changelog.defer = false; document.head.appendChild(changelog);
}
