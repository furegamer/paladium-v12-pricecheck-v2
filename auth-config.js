window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/admin.html"
};

// Modules de la page d'accueil.
if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/paladium-v12-pricecheck-v2/') || location.pathname.endsWith('/paladium-v12-pricecheck-v2')) {
  const budget = document.createElement('script');
  budget.src = 'budget-planner.js?v=12.9.1';
  budget.defer = false;
  document.head.appendChild(budget);

  const hud = document.createElement('script');
  hud.src = 'pricecheck-hud.js?v=12.9.1';
  hud.defer = false;
  document.head.appendChild(hud);
}
