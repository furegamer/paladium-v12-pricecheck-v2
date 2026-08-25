(() => {
  if (!location.pathname.endsWith('/budget.html')) return;
  const PB_KEY='pricecheck:pb', WALLET_KEY='pricecheck:wallet';
  const money=n=>Math.max(0,Math.round(Number(n)||0)).toLocaleString('fr-FR');
  const walletValue=()=>Math.max(0,Math.round(Number(localStorage.getItem(WALLET_KEY)||0)));
  const syncWalletFromProfile=async()=>{
    const p=window.PriceCheckPlayers;
    if(!p) return;
    try{
      const id=p.getId();
      const rows=await p.api(`player_stats?select=wallet&player_id=eq.${encodeURIComponent(id)}&limit=1`);
      if(rows?.length && Number.isFinite(Number(rows[0].wallet))){
        localStorage.setItem(WALLET_KEY,String(Math.max(0,Math.round(Number(rows[0].wallet)))));
        const input=document.querySelector('#budget');
        if(input && document.activeElement!==input) input.value=walletValue()||'';
        const balance=document.querySelector('#balance');
        if(balance) balance.textContent=`${money(walletValue())} P$`;
        const summary=document.querySelector('#sBudget');
        if(summary) summary.textContent=`${money(walletValue())} P$`;
      }
    }catch(e){console.warn('Budget/profile wallet sync unavailable',e)}
  };
  const ready=()=>{
    const aside=document.querySelector('.panel');
    if(aside&&!aside.querySelector('#pc-budget-pb')){
      const box=document.createElement('div');box.id='pc-budget-pb';box.className='notice';
      box.innerHTML=`<strong>🪙 Mes PB</strong><div id="pc-pb-value" style="font-size:24px;font-weight:950;margin:5px 0 9px">${money(localStorage.getItem(PB_KEY))} PB</div><input id="pc-pb-input" class="input" type="number" min="0" step="1" placeholder="Nombre de PB"><button id="pc-pb-save" style="margin-top:8px;width:100%;padding:10px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:900;cursor:pointer">Enregistrer mes PB</button><small style="display:block;margin-top:7px;color:#94a3b8">Les PB sont séparés de ton portefeuille en P$.</small>`;
      aside.appendChild(box);
      const input=box.querySelector('#pc-pb-input');input.value=localStorage.getItem(PB_KEY)||'';
      box.querySelector('#pc-pb-save').onclick=async()=>{const v=Math.max(0,Math.round(Number(input.value)||0));localStorage.setItem(PB_KEY,String(v));box.querySelector('#pc-pb-value').textContent=`${money(v)} PB`;await window.PriceCheckPlayers?.setPB?.(v)};
    }
    const budget=document.querySelector('#budget');
    if(budget&&!budget.dataset.walletSync){
      budget.dataset.walletSync='1';
      budget.value=walletValue()||'';
      budget.title='Ce montant correspond à ton portefeuille PriceCheck.';
      budget.addEventListener('change',async()=>{const v=Math.max(0,Math.round(Number(budget.value)||0));localStorage.setItem(WALLET_KEY,String(v));await window.PriceCheckPlayers?.setWallet?.(v);});
    }
    void syncWalletFromProfile();
  };
  const boot=()=>{ready();setTimeout(ready,500);setTimeout(syncWalletFromProfile,1800)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.addEventListener('storage',e=>{if(e.key===WALLET_KEY){const input=document.querySelector('#budget');if(input&&document.activeElement!==input)input.value=walletValue()||'';}});
})();
