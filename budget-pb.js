(() => {
  if (!location.pathname.endsWith('/budget.html')) return;
  const PB_KEY='pricecheck:pb';
  const money=n=>Math.max(0,Math.round(Number(n)||0)).toLocaleString('fr-FR');
  const ready=()=>{
    const aside=document.querySelector('.panel');
    if(!aside||aside.querySelector('#pc-budget-pb')) return !!aside;
    const box=document.createElement('div');box.id='pc-budget-pb';box.className='notice';
    box.innerHTML=`<strong>🪙 Mes PB</strong><div id="pc-pb-value" style="font-size:24px;font-weight:950;margin:5px 0 9px">${money(localStorage.getItem(PB_KEY))} PB</div><input id="pc-pb-input" class="input" type="number" min="0" step="1" placeholder="Nombre de PB"><button id="pc-pb-save" style="margin-top:8px;width:100%;padding:10px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:900;cursor:pointer">Enregistrer mes PB</button><small style="display:block;margin-top:7px;color:#94a3b8">Les PB sont séparés de ton portefeuille en P$.</small>`;
    aside.appendChild(box);
    const input=box.querySelector('#pc-pb-input');input.value=localStorage.getItem(PB_KEY)||'';
    box.querySelector('#pc-pb-save').onclick=async()=>{const v=Math.max(0,Math.round(Number(input.value)||0));localStorage.setItem(PB_KEY,String(v));box.querySelector('#pc-pb-value').textContent=`${money(v)} PB`;await window.PriceCheckPlayers?.setPB?.(v)};
    return true;
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
