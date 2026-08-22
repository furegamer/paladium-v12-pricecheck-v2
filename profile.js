(() => {
  'use strict';
  if (!location.pathname.endsWith('/profile.html')) return;
  const start=()=>{
    const p=window.PriceCheckPlayers;
    if(!p){setTimeout(start,100);return}
    const id=p.getId(), name=document.querySelector('#name');
    if(!name)return;
    name.value=localStorage.getItem('pricecheck:player-name')||p.getName();
    document.querySelector('#save').onclick=async()=>{const n=name.value.trim()||p.getName();localStorage.setItem('pricecheck:player-name',n.slice(0,24));await p.upsert();name.value=localStorage.getItem('pricecheck:player-name')};
    const local=()=>{let j={};try{j=JSON.parse(localStorage.getItem('pricecheck:job-levels')||'{}')}catch{};document.querySelector('#wallet').textContent=`${Math.round(Number(localStorage.getItem('pricecheck:wallet')||0)).toLocaleString('fr-FR')} P$`;for(const [id,key] of [['miner','Mineur'],['farmer','Fermier'],['hunter','Chasseur'],['alchemist','Alchimiste']])document.querySelector('#'+id).textContent=`Niv. ${j[key]||1}`;document.querySelector('#pog').textContent=`Niv. ${localStorage.getItem('pricecheck:pog-level')||1}`};
    local();
    const cols={wallet:'wallet',miner:'miner_level',farmer:'farmer_level',hunter:'hunter_level',alchemist:'alchemist_level',pog:'pog_level'};
    const esc=s=>String(s||'Joueur').replace(/[<>]/g,'');
    async function render(key){const board=document.querySelector('#board');try{const rows=await p.api(`player_stats?select=player_id,display_name,wallet,miner_level,farmer_level,hunter_level,alchemist_level,pog_level&order=${cols[key]}.desc&limit=50`);board.innerHTML=rows.length?rows.map((r,i)=>`<div class="row ${r.player_id===id?'me':''}"><span class="rank">#${i+1}</span><span class="name">${esc(r.display_name)} ${r.player_id===id?'(toi)':''}<small>${key==='wallet'?'Portefeuille':key==='pog'?'Niveau POG':`Métier ${key==='miner'?'Mineur':key==='farmer'?'Fermier':key==='hunter'?'Chasseur':'Alchimiste'}`}</small></span><span class="value">${key==='wallet'?`${Number(r.wallet||0).toLocaleString('fr-FR')} P$`:`Niv. ${r[cols[key]]||1}`}</span></div>`).join(''):'<div class="muted">Aucun joueur enregistré pour le moment.</div>'}catch(e){board.innerHTML='<div class="notice">⚠️ Le classement est momentanément indisponible. Ton profil local continue de fonctionner.</div>'}}
    document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.rank)});
    async function online(){try{const rows=await p.api(`player_stats?select=player_id&last_seen=gte.${encodeURIComponent(new Date(Date.now()-90000).toISOString())}`);document.querySelector('#online').textContent=rows.length}catch{document.querySelector('#online').textContent='—'}}
    render('wallet');online();setInterval(online,30000);
  };
  start();
})();
