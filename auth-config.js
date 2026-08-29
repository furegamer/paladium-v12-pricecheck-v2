window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/index.html"
};
const PC_V="22.0";
for(const file of ['minecraft-paladium-theme.js','site-visual-v16.js','player-stats.js','site-fixes-v15.js','vanilla-items.js','audio-theme.js','site-tools-nav.js','site-polish-v21.js']){const s=document.createElement('script');s.src=file+'?v='+PC_V;s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/index.html')||location.pathname.endsWith('/paladium-v12-pricecheck-v2/')||location.pathname.endsWith('/paladium-v12-pricecheck-v2'))for(const file of ['catalog-fix.js','wood-items.js','xp-bottle.js','catalog-assets-v14.js','price-reports.js']){const s=document.createElement('script');s.src=file+'?v='+PC_V;s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/budget.html'))for(const file of ['budget-pb.js','wood-items.js','catalog-assets-v14.js','budget-profile-sync.js']){const s=document.createElement('script');s.src=file+'?v='+PC_V;s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/xp.html'))for(const file of ['xp-upgrade.js','levels-persistence.js']){const s=document.createElement('script');s.src=file+'?v='+PC_V;s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/profile.html'))for(const file of ['profile-fix-v14.js','profile-fix-v16.js','profile-rankings.js']){const s=document.createElement('script');s.src=file+'?v='+PC_V;s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/changelog.html')){const s=document.createElement('script');s.src='changelog-live.js?v='+PC_V;s.defer=true;document.head.appendChild(s)}
if(location.pathname.endsWith('/admin.html'))for(const file of ['admin-presence.js','price-reports.js','creator-admin.js','admin-price-context.js']){const s=document.createElement('script');s.src=file+'?v='+PC_V;s.defer=true;document.head.appendChild(s)}
