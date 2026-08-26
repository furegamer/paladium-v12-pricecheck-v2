window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/index.html"
};
const visual=document.createElement('script');visual.src='site-visual-v16.js?v=17.0';visual.defer=true;document.head.appendChild(visual);
const playerStats=document.createElement('script');playerStats.src='player-stats.js?v=17.0';playerStats.defer=true;document.head.appendChild(playerStats);
const siteFixes=document.createElement('script');siteFixes.src='site-fixes-v15.js?v=17.0';siteFixes.defer=true;document.head.appendChild(siteFixes);
const vanillaItems=document.createElement('script');vanillaItems.src='vanilla-items.js?v=17.0';vanillaItems.defer=true;document.head.appendChild(vanillaItems);
if(location.pathname.endsWith('/index.html')||location.pathname.endsWith('/paladium-v12-pricecheck-v2/')||location.pathname.endsWith('/paladium-v12-pricecheck-v2'))for(const file of ['catalog-fix.js','wood-items.js','xp-bottle.js','catalog-assets-v14.js','price-reports.js']){const s=document.createElement('script');s.src=file+'?v=17.0';s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/budget.html'))for(const file of ['budget-pb.js','wood-items.js','catalog-assets-v14.js','budget-profile-sync.js']){const s=document.createElement('script');s.src=file+'?v=17.0';s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/xp.html'))for(const file of ['xp-upgrade.js','levels-persistence.js']){const s=document.createElement('script');s.src=file+'?v=17.0';s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/profile.html'))for(const file of ['profile-fix-v14.js','profile-fix-v16.js','profile-rankings.js']){const s=document.createElement('script');s.src=file+'?v=17.0';s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/changelog.html')){const s=document.createElement('script');s.src='changelog-live.js?v=17.0';s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/admin.html')){const presence=document.createElement('script');presence.src='admin-presence.js?v=17.0';presence.defer=true;document.head.appendChild(presence);const priceReports=document.createElement('script');priceReports.src='price-reports.js?v=17.0';priceReports.defer=true;document.head.appendChild(priceReports);const creatorAdmin=document.createElement('script');creatorAdmin.src='creator-admin.js?v=17.0';creatorAdmin.defer=true;document.head.appendChild(creatorAdmin)}