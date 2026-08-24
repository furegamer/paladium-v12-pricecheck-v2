(() => {
  'use strict';
  if (window.__PRICECHECK_UI_FIXES__) return;
  window.__PRICECHECK_UI_FIXES__ = true;

  const NAME_KEY = 'pricecheck:player-name';
  const name = () => String(localStorage.getItem(NAME_KEY) || '').trim().slice(0, 24);
  const esc = s => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  let rendering = false;

  const style = document.createElement('style');
  style.id = 'pricecheck-ui-fixes-style';
  style.textContent = `
    .pc-profile-slot{width:min(1100px,calc(100% - 28px));margin:10px auto 0;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;border:1px solid rgba(110,100,55,.28);border-radius:18px;background:linear-gradient(100deg,#f2eee0,#e9e2d2);color:#171717;box-shadow:0 6px 18px rgba(0,0,0,.08);cursor:pointer;transition:.18s ease;position:relative;z-index:2;overflow:hidden;isolation:isolate}
    .pc-profile-slot::before,.pricecheck-login-btn::before{content:"";position:absolute;z-index:-1;top:-80%;left:-45%;width:28%;height:260%;transform:translateX(-220%) rotate(18deg);background:linear-gradient(90deg,transparent,#ffffffb8,transparent);filter:blur(2px);pointer-events:none;animation:pricecheckDiscordShine 1.65s linear infinite}
    .pc-profile-slot:hover{transform:translateY(-1px);box-shadow:0 9px 24px rgba(0,0,0,.12)}
    .pc-profile-slot-main{display:flex;align-items:center;gap:12px;min-width:0}.pc-profile-slot-avatar{width:42px;height:42px;display:grid;place-items:center;flex:0 0 42px;border-radius:50%;background:linear-gradient(145deg,#b8783d,#dfc28e);font-size:22px}.pc-profile-slot-copy{min-width:0}.pc-profile-slot-name{font-size:18px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pc-profile-slot-label{font-size:10px;opacity:.62;text-transform:uppercase;letter-spacing:.12em;margin-top:2px}.pc-profile-slot-action{padding:8px 12px;border-radius:10px;background:#fff8;border:1px solid #6d5e3d33;font-size:12px;font-weight:900;white-space:nowrap}
    .pricecheck-login-btn{position:relative;overflow:hidden;isolation:isolate}
    .pc-reset-button{display:block!important;position:static!important;width:100%!important;min-height:46px!important;margin:12px 0 0!important;transform:none!important;float:none!important;clear:both!important}
    .pc-safe-image{display:grid!important;place-items:center!important;background:linear-gradient(145deg,#182236,#0d1421)!important;border-radius:12px}
    @keyframes pricecheckDiscordShine{0%{transform:translateX(-220%) rotate(18deg);opacity:0}8%{opacity:1}42%{opacity:1}55%{transform:translateX(620%) rotate(18deg);opacity:0}100%{transform:translateX(620%) rotate(18deg);opacity:0}}
    @media(max-width:700px){.pc-profile-slot{align-items:flex-start}.pc-profile-slot-action{display:none}.pc-profile-slot-name{font-size:16px}}
  `;
  document.head.appendChild(style);

  function profileTarget(){
    const current = name();
    const all = [...document.querySelectorAll('body *')];
    const known = new Set([current, current ? `👤 ${current}` : '', 'furegamerlevrai','👤 furegamerlevrai','FureGamer','👤 FureGamer','FureGamer le vrai','👤 FureGamer le vrai','FureGamerlevrai']);
    return all.find(el => {
      if (el.classList.contains('pc-profile-slot')) return true;
      if (el.children.length > 3) return false;
      const t = String(el.textContent || '').trim();
      return t && known.has(t);
    }) || null;
  }

  function renderProfile(){
    if (!document.body || rendering) return;
    rendering = true;
    try {
      const current = name();
      let target = profileTarget();
      if (target && target.closest('.pc-profile-slot')) target = target.closest('.pc-profile-slot');
      if (!target) {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        target = document.querySelector('.pc-profile-slot');
        if (!target) {
          target = document.createElement('div');
          target.className = 'pc-profile-slot';
          nav.insertAdjacentElement('afterend', target);
        }
      } else {
        target.classList.add('pc-profile-slot');
      }
      target.dataset.profileSlot = '1';
      const html = `<span class="pc-profile-slot-main"><span class="pc-profile-slot-avatar">👤</span><span class="pc-profile-slot-copy"><span class="pc-profile-slot-name">${current ? esc(current) : 'Mon profil'}</span><span class="pc-profile-slot-label">${current ? 'Ouvrir mon profil' : 'Choisir ton pseudo et tes niveaux'}</span></span></span><span class="pc-profile-slot-action">Profil →</span>`;
      if (target.innerHTML !== html) target.innerHTML = html;
      if (!target.dataset.bound) {
        target.dataset.bound = '1';
        target.addEventListener('click', () => { location.href = 'profile.html'; });
        target.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); location.href = 'profile.html'; } });
        target.tabIndex = 0;
        target.setAttribute('role','link');
      }
      document.querySelectorAll('.links a[href="profile.html"]').forEach(a => a.remove());
    } finally {
      rendering = false;
    }
  }

  function fixResetButtons(){
    document.querySelectorAll('button,a').forEach(el => {
      const text = String(el.textContent || '').trim().toLowerCase();
      if (text === 'réinitialiser' || text === 'reset') el.classList.add('pc-reset-button');
    });
  }

  function fixBrokenImages(){
    document.querySelectorAll('img').forEach(img => {
      if (img.dataset.pcSafeBound) return;
      img.dataset.pcSafeBound = '1';
      img.addEventListener('error', () => {
        img.classList.add('pc-safe-image');
        img.removeAttribute('src');
        img.alt = img.alt || 'Image indisponible';
        img.textContent = '🧱';
      }, {once:true});
      if (!img.getAttribute('src')) img.classList.add('pc-safe-image');
    });
  }

  function run(){ renderProfile(); fixResetButtons(); fixBrokenImages(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true}); else run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, {childList:true,subtree:true});
  window.addEventListener('storage', run);
})();
