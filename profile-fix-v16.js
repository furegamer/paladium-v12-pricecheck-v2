(() => {
  'use strict';
  const waitForPlayers = (fn, tries=40) => { if (window.PriceCheckPlayers) return fn(window.PriceCheckPlayers); if (tries<=0) return; setTimeout(() => waitForPlayers(fn, tries-1), 150); };
  waitForPlayers(async p => {
    const id=p.getId();
    const money=n=>`${Math.round(Number(n)||0).toLocaleString('fr-FR')} P$`;
    const levels={wallet:'wallet',miner:'miner_level',farmer:'farmer_level',hunter:'hunter_level',alchemist:'alchemist_level',pog:'pog_level'};
    const label=k=>k==='wallet'?'Portefeuille':k==='pog'?'Niveau POG':`Métier ${k[0].toUpperCase()+k.slice(1)}`;
    const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    async function hydrate(){try{await p.hydrateFromServer();const w=document.querySelector('#wallet'),pb=document.querySelector('#pb');if(w)w.textContent=money(p.getWallet());if(pb)pb.textContent=`${p.getPB().toLocaleString('fr-FR')} PB`;}catch{}}
    async function activeCount(){try{const since=new Date(Date.now()-120000).toISOString();const rows=await p.api(`player_stats?select=player_id&last_seen=gte.${encodeURIComponent(since)}`);const el=document.querySelector('#online');if(el)el.textContent=String(rows.length)}catch{}}
    async function renderTop3(key){const board=document.querySelector('#board');if(!board)return;try{const col=levels[key]||'wallet';const rows=await p.api(`player_stats?select=player_id,display_name,wallet,pb,miner_level,farmer_level,hunter_level,alchemist_level,pog_level&order=${col}.desc&limit=3`);const out=[];for(let i=0;i<3;i++){const r=rows[i];if(r){const value=key==='wallet'?money(r.wallet):key==='pb'?`${Number(r.pb||0).toLocaleString('fr-FR')} PB`:`Niv. ${Number(r[col]||1)}`;out.push(`<div class="row ${r.player_id===id?'me':''}"><span class="rank">#${i+1}</span><span class="name">${esc(r.display_name||'Joueur')} ${r.player_id===id?'(toi)':''}<small>${label(key)}</small></span><span class="value">${value}</span></div>`)}else out.push(`<div class="row"><span class="rank">#${i+1}</span><span class="name">—<small>Place disponible</small></span><span class="value">—</span></div>`)}board.innerHTML=out.join('')}catch{board.innerHTML='<div class="notice">⚠️ Classement temporairement indisponible.</div>'}}
    document.querySelectorAll('.tab').forEach(btn=>{btn.addEventListener('click',()=>renderTop3(btn.dataset.rank),{capture:true})});
    await hydrate();
    await activeCount();
    await renderTop3(document.querySelector('.tab.active')?.dataset.rank||'wallet');
    setInterval(hydrate,30000);setInterval(activeCount,15000);
  });
})();
