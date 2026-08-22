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
    .pc-hud{position:fixed;top:76px;right:14px;z-index:19;display:flex;align-items:center;gap:8px;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;pointer-events:none}
    .pc-hud *{box-sizing:border-box}
    .pc-wallet{pointer-events:auto;border:1px solid rgba(148,163,184,.22);box-shadow:0 12px 32px rgba(0,0,0,.35),inset 0 1px rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:flex;align-items:center;gap:10px;min-width:190px;padding:9px 12px;border-radius:14px;background:linear-gradient(135deg,rgba(14,20,33,.96),rgba(27,19,49,.94));color:#fff}
    .pc-wallet-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:linear-gradient(135deg,#7c3aed,#0891b2);font-size:18px;font-weight:900;box-shadow:0 0 20px rgba(124,58,237,.28)}
    .pc-wallet-label{font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:800}
    .pc-wallet-value{font-size:16px;font-weight:950;line-height:1.15;margin-top:2px}
    .pc-wallet-edit{margin-left:auto;border:0;background:transparent;color:#94a3b8;font-size:15px;padding:5px;border-radius:8px;cursor:pointer}.pc-wallet-edit:hover{background:rgba(255,255,255,.08);color:#fff}
    .pc-wallet-dialog{position:fixed;inset:0;z-index:10000;display:none;place-items:center;background:rgba(2,6,23,.68);backdrop-filter:blur(6px)}
    .pc-wallet-dialog.open{display:grid}.pc-wallet-box{width:min(380px,calc(100% - 28px));padding:22px;border:1px solid rgba(139,92,246,.35);border-radius:20px;background:linear-gradient(160deg,#111827,#0b1020);box-shadow:0 25px 80px rgba(0,0,0,.55);color:#fff}.pc-wallet-box h3{margin:0 0 7px;font-size:22px}.pc-wallet-box p{margin:0 0 16px;color:#94a3b8;font-size:13px}.pc-wallet-input{width:100%;padding:13px 14px;border:1px solid #334155;border-radius:12px;background:#080d18;color:#fff;outline:0;font-size:16px}.pc-wallet-actions{display:flex;gap:8px;margin-top:12px}.pc-wallet-actions button{flex:1;padding:11px;border-radius:11px;border:1px solid #334155;background:#111827;color:#fff;cursor:pointer}.pc-wallet-actions .save{border:0;background:linear-gradient(135deg,#7c3aed,#0891b2);font-weight:800}
    @media(max-width:900px){.pc-hud{top:72px;right:10px}.pc-wallet{min-width:170px}}
    @media(max-width:640px){.pc-hud{top:70px;right:8px;max-width:calc(100vw - 16px)}.pc-wallet{min-width:0;width:min(230px,calc(100vw - 16px));padding:7px 9px}.pc-wallet-icon{width:30px;height:30px}.pc-wallet-value{font-size:14px}.pc-wallet-label{font-size:8px}}
  `;
  document.head.appendChild(style);

  const mount = () => {
    if (document.querySelector('.pc-hud')) return;
    const hud = document.createElement('div');
    hud.className = 'pc-hud';
    hud.innerHTML = `
      <div class="pc-wallet" title="Solde PriceCheck local">
        <div class="pc-wallet-icon">P$</div>
        <div><div class="pc-wallet-label">Mon portefeuille</div><div class="pc-wallet-value" data-wallet-value>${fmt(getWallet())}</div></div>
        <button class="pc-wallet-edit" type="button" aria-label="Modifier mon solde">✎</button>
      </div>`;
    document.body.appendChild(hud);

    const dialog = document.createElement('div');
    dialog.className = 'pc-wallet-dialog';
    dialog.innerHTML = `<div class="pc-wallet-box" role="dialog" aria-modal="true" aria-labelledby="pc-wallet-title"><h3 id="pc-wallet-title">💰 Mon portefeuille</h3><p>Indique ton argent disponible pour que PriceCheck l'affiche en permanence.</p><input class="pc-wallet-input" inputmode="numeric" type="number" min="0" step="1" placeholder="Ex. 25000"><div class="pc-wallet-actions"><button type="button" data-wallet-cancel>Annuler</button><button type="button" class="save" data-wallet-save>Enregistrer</button></div></div>`;
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
