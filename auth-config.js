window.PRICECHECK_AUTH = {
  supabaseUrl: "https://ndotuykgdumuessfvtwv.supabase.co",
  supabaseAnonKey: "sb_publishable_bDnqyzZEqoHIsy9IWWfdKg_6JVIy0nW",
  loginRedirect: "https://furegamer.github.io/paladium-v12-pricecheck-v2/index.html"
};

const playerStats = document.createElement('script');
playerStats.src = 'player-stats.js?v=14.3';
playerStats.defer = true;
document.head.appendChild(playerStats);

const vanillaItems = document.createElement('script');
vanillaItems.src = 'vanilla-items.js?v=14.5';
vanillaItems.defer = true;
document.head.appendChild(vanillaItems);

if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/paladium-v12-pricecheck-v2/') || location.pathname.endsWith('/paladium-v12-pricecheck-v2')) {
  const catalogFix = document.createElement('script'); catalogFix.src = 'catalog-fix.js?v=14.3'; catalogFix.defer = true; document.head.appendChild(catalogFix);
  const wood = document.createElement('script'); wood.src = 'wood-items.js?v=14.3'; wood.defer = true; document.head.appendChild(wood);
  const xpBottle = document.createElement('script'); xpBottle.src = 'xp-bottle.js?v=14.3'; xpBottle.defer = true; document.head.appendChild(xpBottle);
  const assets = document.createElement('script'); assets.src = 'catalog-assets-v14.js?v=14.3'; assets.defer = true; document.head.appendChild(assets);
  const priceReports = document.createElement('script'); priceReports.src = 'price-reports.js?v=14.4'; priceReports.defer = true; document.head.appendChild(priceReports);
}
if (location.pathname.endsWith('/budget.html')) {
  const budgetPB = document.createElement('script'); budgetPB.src = 'budget-pb.js?v=14.3'; budgetPB.defer = true; document.head.appendChild(budgetPB);
  const wood = document.createElement('script'); wood.src = 'wood-items.js?v=14.3'; wood.defer = true; document.head.appendChild(wood);
  const assets = document.createElement('script'); assets.src = 'catalog-assets-v14.js?v=14.3'; assets.defer = true; document.head.appendChild(assets);
}
if (location.pathname.endsWith('/xp.html')) {
  const xpUpgrade = document.createElement('script'); xpUpgrade.src = 'xp-upgrade.js?v=14.3'; xpUpgrade.defer = true; document.head.appendChild(xpUpgrade);
  const levels = document.createElement('script'); levels.src = 'levels-persistence.js?v=14.3'; levels.defer = true; document.head.appendChild(levels);
}
if (location.pathname.endsWith('/profile.html')) {
  const profileFix = document.createElement('script'); profileFix.src = 'profile-fix-v14.js?v=14.3'; profileFix.defer = true; document.head.appendChild(profileFix);
}
if (location.pathname.endsWith('/changelog.html')) {
  const changelog = document.createElement('script'); changelog.src = 'changelog-live.js?v=14.3'; changelog.defer = true; document.head.appendChild(changelog);
}

if (location.pathname.endsWith('/admin.html')) {
  const setupAdminPriceContext = () => {
    const form = document.querySelector('#form');
    const nameInput = document.querySelector('#name');
    if (!form || !nameInput || document.querySelector('#priceContext')) return;
    const style = document.createElement('style');
    style.id = 'price-context-style';
    style.textContent = `#priceContext{display:flex;align-items:center;gap:12px;margin:0 0 16px;padding:14px 16px;border:1px solid #8b5cf655;border-radius:14px;background:linear-gradient(135deg,#8b5cf614,#22d3ee0d);box-shadow:0 8px 28px #0003}#priceContext .pc-icon{width:46px;height:46px;display:grid;place-items:center;flex:none;border-radius:12px;background:#121b2a;border:1px solid #334155;color:#c4b5fd;font-weight:900;overflow:hidden}#priceContext img{width:38px;height:38px;object-fit:contain}#priceContext .pc-copy{min-width:0}#priceContext .pc-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;font-weight:800}#priceContext .pc-name{font-size:18px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#priceContext .pc-help{font-size:12px;color:#94a3b8;margin-top:2px}.price-field-highlight{border-color:#8b5cf688!important;box-shadow:0 0 0 2px #8b5cf611}`;
    document.head.appendChild(style);
    const context = document.createElement('div');
    context.id = 'priceContext';
    context.innerHTML = '<div class="pc-icon" id="priceContextIcon">💰</div><div class="pc-copy"><div class="pc-label">Prix en cours de modification</div><div class="pc-name" id="priceContextName">Aucun objet sélectionné</div><div class="pc-help">Le prix ci-dessous sera enregistré pour cet objet uniquement.</div></div>';
    form.insertBefore(context, form.firstElementChild);
    const updateContext = (item) => {
      const name = typeof item === 'string' ? item : (item?.name || nameInput.value.trim());
      const image = typeof item === 'object' ? item.image : '';
      document.querySelector('#priceContextName').textContent = name || 'Aucun objet sélectionné';
      const icon = document.querySelector('#priceContextIcon');
      icon.innerHTML = image ? `<img src="${image}" alt="">` : '💰';
      ['#price','#minPrice','#maxPrice'].forEach(sel => {
        const input = document.querySelector(sel);
        if (input) {
          input.classList.toggle('price-field-highlight', !!name);
          input.title = name ? `Prix de : ${name}` : 'Sélectionne un objet';
          input.setAttribute('aria-label', name ? `Prix de ${name}` : 'Prix de l’objet');
        }
      });
    };
    nameInput.addEventListener('input', () => updateContext(nameInput.value));
    document.addEventListener('click', (event) => {
      const itemButton = event.target.closest('.itembtn');
      if (itemButton) updateContext(itemButton.firstChild?.textContent?.trim() || itemButton.textContent.trim().split('\n')[0]);
      if (event.target.closest('#newItem')) updateContext('Nouvel objet');
    });
    updateContext(nameInput.value);
  };
  const priceReports = document.createElement('script'); priceReports.src = 'price-reports.js?v=14.4'; priceReports.defer = true; document.head.appendChild(priceReports);
  const creatorAdmin = document.createElement('script'); creatorAdmin.src = 'creator-admin.js?v=14.5'; creatorAdmin.defer = true; document.head.appendChild(creatorAdmin);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupAdminPriceContext, {once:true});
  else setupAdminPriceContext();
}