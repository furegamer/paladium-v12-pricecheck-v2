window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/admin.html"
};

// Modules de l'interface.
if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/paladium-v12-pricecheck-v2/') || location.pathname.endsWith('/paladium-v12-pricecheck-v2')) {
  const budget = document.createElement('script');
  budget.src = 'budget-planner.js?v=13.1';
  budget.defer = false;
  document.head.appendChild(budget);

  const hud = document.createElement('script');
  hud.src = 'pricecheck-hud.js?v=13.1';
  hud.defer = false;
  document.head.appendChild(hud);

  const catalogFix = document.createElement('script');
  catalogFix.src = 'catalog-fix.js?v=13.1';
  catalogFix.defer = false;
  document.head.appendChild(catalogFix);
}

if (location.pathname.endsWith('/xp.html')) {
  const xpUpgrade = document.createElement('script');
  xpUpgrade.src = 'xp-upgrade.js?v=13.1';
  xpUpgrade.defer = false;
  document.head.appendChild(xpUpgrade);
}

if (location.pathname.endsWith('/changelog.html')) {
  const changelog = document.createElement('script');
  changelog.src = 'changelog-live.js?v=13.1';
  changelog.defer = false;
  document.head.appendChild(changelog);
}
