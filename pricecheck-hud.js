(() => {
  'use strict';
  if (window.__PRICECHECK_HUD__) return;
  window.__PRICECHECK_HUD__ = true;

  const STORAGE = 'pricecheck:wallet';
  const fmt = n => `${Math.max(0, Math.round(Number(n) || 0)).toLocaleString('fr-FR')} P$`;
  const getWallet = () => Number(localStorage.getItem(STORAGE) || 0);
  const setWallet = n => localStorage.setItem(STORAGE, String(Math.max(0, Math.round(Number(n) || 0))));

  const style = document.createElement('style');
  style.textContent = `
    .pc-hud{position:fixed;top:78px;right:18px;z-index:19;display:flex;align-items:center;pointer-events:none;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
    .pc-hud *{box-sizing:border-box}
    .pc-wallet{pointer-events:auto;position:relative;display:flex;align-items:center;gap:11px;width:246px;min-height:64px;padding:9px 10px 9px 11px;border:1px solid rgba(148,163,184,.24);border-radius:16px;background:linear-gradient(135deg,rgba(10,16,28,.98),rgba(25,18,42,.98));box-shadow:0 12px 34px rgba(0,0,0,.38),inset 0 1px rgba(255,255,255,.07),0 0 0 1px rgba(124,58,237,.06);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#fff;overflow:hidden}
    .pc-wallet:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#8b5cf6,#22d3ee)}
    .pc-wallet-icon{width:40px;height:40px;flex:0 0 40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(145deg,#8b5cf6,#06b6d4);color:#fff;font-size:16px;font-weight:1000;box-shadow:0 0 22px rgba(139,92,246,.28),inset 0 1px rgba(255,255,255,.18)}
    .pc-wallet-info{min-width:0;display:flex;flex-direction:column;gap:2px}
    .pc-wallet-label{display:flex;align-items:center;gap:6px;color:#94a3b8;font-size:9px;text-transform:uppercase;letter-spacing:.13em;font-weight:900;line-height:1}
    .pc-wallet-dot{width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399;display:inline-block}
    .pc-wallet-value{font-size:19px;font-weight:950;line-height:1.1;letter-spacing:-.3px;white-space:nowrap}
    .pc-wallet-edit{margin-left:auto;flex:0 0 34px;width:34px;height:34px;display:grid;place-items:center;border:1px solid rgba(148,163,184,.18);background:#111827;color:#cbd5e1;font-size:15px;border-radius:10px;cursor:pointer;transition:.16s ease}
    .pc-wallet-edit:hover{background:#1e293b;color:#fff;border-color:#8b5cf688;transform:translateY(-1px)}
    .pc-wallet-edit:active{transform:scale(.95)}
    .pc-wallet-market{position:absolute;right:12px;top:7px;color:#64748b;font-size:7px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
    .pc-wallet-dialog{position:fixed;inset:0;z-index:10000;display:none;place-items:center;background:rgba(2,6,23,.72);backdrop-filter:blur(7px)}
    .pc-wallet-dialog.open{display:grid}
    .pc-wallet-box{width:min(390px,calc(100% - 28px));padding:22px;border:1px solid rgba(139,92,246,.38);border-radius:20px;background:linear-gradient(160deg,#111827,#0b1020);box-shadow:0 25px 80px rgba(0,0,0,.55);color:#fff}
    .pc-wallet-box h3{margin:0 0 7px;font-size:22px}.pc-wallet-box p{margin:0 0 16px;color:#94a3b8;font-size:13px;line-height:1.5}
    .pc-wallet-input{width:100%;padding:13px 14px;border:1px solid #334155;border-radius:12px;background:#080d18;color:#fff;outline:0;font-size:16px}.pc-wallet-input:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px #8b5cf622}
    .pc-wallet-actions{display:flex;gap:8px;margin-top:12px}.pc-wallet-actions button{flex:1;padding:11px;border-radius:11px;border:1px solid #334155;background:#111827;color:#fff;cursor:pointer}.pc-wallet-actions .save{border:0;background:linear-gradient(135deg,#7c3aed,#0891b2);font-weight:800}
    @media(max-width:900px){.pc-hud{top:72px;right:12px}.pc-wallet{width:225px}}
    @media(max-width:640px){.pc-hud{top:68px;right:8px;left:8px;justify-content:flex-end}.pc-wallet{width:min(225px,calc(100vw - 16px));min-height:58px;padding:7px 8px}.pc-wallet-icon{width:35px;height:35px;flex-basis:35px}.pc-wallet-value{font-size:16px}.pc-wallet-market{display:none}.pc-wallet-label{font-size:8px}}
  `;
  document.head.appendChild(style);

  const mount = () => {
    if (document.querySelector('.pc-hud')) return;
    const hud = document.createElement('div');
    hud.className = 'pc-hud';
    hud.innerHTML = `
      <div class="pc-wallet" title="Solde PriceCheck local">
        <span class="pc-wallet-market">MARKET</span>
        <div class="pc-wallet-icon">P$</div>
        <div class="pc-wallet-info">
          <div class="pc-wallet-label"><span class="pc-wallet-dot"></span>Solde disponible</div>
          <div class="pc-wallet-value" data-wallet-value>${fmt(getWallet())}</div>
        </div>
        <button class="pc-wallet-edit" type="button" aria-label="Modifier mon solde" title="Modifier le solde">✎</button>
      </div>`;
    document.body.appendChild(hud);

    const dialog = document.createElement('div');
    dialog.className = 'pc-wallet-dialog';
    dialog.innerHTML = `<div class="pc-wallet-box" role="dialog" aria-modal="true" aria-labelledby="pc-wallet-title"><h3 id="pc-wallet-title">💰 Solde du Market</h3><p>Renseigne ton argent disponible en P$ pour utiliser le calculateur d'achats PriceCheck.</p><input class="pc-wallet-input" inputmode="numeric" type="number" min="0" step="1" placeholder="Ex. 25000"><div class="pc-wallet-actions"><button type="button" data-wallet-cancel>Annuler</button><button type="button" class="save" data-wallet-save>Enregistrer</button></div></div>`;
    document.body.appendChild(dialog);

    const valueEl = hud.querySelector('[data-wallet-value]');
    const input = dialog.querySelector('.pc-wallet-input');
    const open = () => { input.value = getWallet(); dialog.classList.add('open'); setTimeout(() => input.focus(), 30); };
    const close = () => dialog.classList.remove('open');
    const refresh = () => { valueEl.textContent = fmt(getWallet()); };
    hud.querySelector('.pc-wallet-edit').addEventListener('click', open);
    dialog.querySelector('[data-wallet-cancel]').addEventListener('click', close);
    dialog.querySelector('[data-wallet-save]').addEventListener('click', () => { setWallet(input.value); refresh(); close(); });
    dialog.addEventListener('click', e => { if (e.target === dialog) close(); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { setWallet(input.value); refresh(); close(); } if (e.key === 'Escape') close(); });
    window.addEventListener('storage', refresh);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once:true });
  else mount();
})();