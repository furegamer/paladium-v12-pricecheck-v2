(()=>{
  const q=s=>document.querySelector(s);
  const cfg=window.PRICECHECK_AUTH||{};
  if(!window.supabase||!cfg.supabaseUrl||!cfg.supabaseAnonKey)return;
  const client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>`${Number(n||0).toLocaleString('fr-FR')} P$`;

  async function submitReport(){
    const item=q('#marketItem'), input=q('#observedPrice');
    if(!item||!input)return;
    const price=Math.round(Number(input.value));
    if(!price||price<0)return;
    try{
      const {data:{session}}=await client.auth.getSession();
      if(!session?.user)return;
      const {error}=await client.from('price_reports').insert({user_id:session.user.id,item_name:item.value,price});
      if(error)console.warn('Price report:',error.message);
    }catch(e){console.warn('Price report unavailable',e)}
  }

  function setupPublic(){
    const button=q('#recordPrice');
    if(!button||button.dataset.reportBound)return;
    button.dataset.reportBound='1';
    button.addEventListener('click',()=>setTimeout(submitReport,0));
  }

  async function isAdmin(){
    const {data:{session}}=await client.auth.getSession();
    if(!session?.user)return null;
    const {data}=await client.from('admins').select('user_id').eq('user_id',session.user.id).maybeSingle();
    return data?session.user:null;
  }

  function injectAdminPanel(){
    if(q('#priceReportsPanel')||!q('#panel'))return;
    const style=document.createElement('style');
    style.textContent=`#priceReportsPanel{margin:15px 0;padding:18px;border:1px solid #8b5cf655;border-radius:17px;background:linear-gradient(145deg,#15162a,#0d1020);box-shadow:0 12px 38px #0005}#priceReportsPanel h2{margin:0 0 5px}.pr-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.pr-filter{max-width:260px}.pr-list{display:grid;gap:9px}.pr-card{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:13px;border:1px solid #302a56;border-radius:13px;background:#0a0d18}.pr-card.pending{border-color:#fbbf2455}.pr-card.accepted{border-color:#34d39955}.pr-card.rejected{border-color:#fb718555}.pr-meta{color:#94a3b8;font-size:12px;margin-top:4px}.pr-actions{display:flex;gap:7px;flex-wrap:wrap}.pr-btn{border:1px solid #302a56;background:#111827;color:#fff;padding:8px 10px;border-radius:9px;cursor:pointer}.pr-btn.accept{background:#065f46;border-color:#34d39977}.pr-btn.reject{background:#4c0519;border-color:#fb718577}@media(max-width:700px){.pr-card{grid-template-columns:1fr}.pr-filter{max-width:none}}`;
    document.head.appendChild(style);
    const panel=document.createElement('section');panel.id='priceReportsPanel';
    panel.innerHTML=`<h2>🧾 Prix proposés par la communauté</h2><p class="muted">Ici tu vois qui a proposé quel prix pour quel item. Tu peux accepter ou refuser chaque proposition.</p><div class="pr-toolbar"><select id="priceReportFilter" class="pr-filter"><option value="pending">En attente</option><option value="accepted">Acceptés</option><option value="rejected">Refusés</option><option value="all">Tous</option></select><button class="btn" id="priceReportRefresh">🔄 Actualiser</button></div><div id="priceReportList" class="pr-list"><p class="muted">Chargement…</p></div>`;
    const target=q('#panel');target.insertBefore(panel,target.firstElementChild);
    q('#priceReportFilter').onchange=loadReports;q('#priceReportRefresh').onclick=loadReports;
    loadReports();
  }

  async function loadReports(){
    const list=q('#priceReportList'),filter=q('#priceReportFilter')?.value||'pending';if(!list)return;
    let query=client.from('price_reports').select('id,item_name,price,user_id,created_at,status,reviewed_at').order('created_at',{ascending:false}).limit(100);
    if(filter!=='all')query=query.eq('status',filter);
    const {data,error}=await query;
    if(error){list.innerHTML=`<p class="muted">❌ Impossible de charger les propositions : ${esc(error.message)}</p>`;return}
    if(!data?.length){list.innerHTML='<p class="muted">Aucune proposition dans cette catégorie.</p>';return}
    const ids=[...new Set(data.map(r=>r.user_id).filter(Boolean))];
    const users={};
    if(ids.length){
      const {data:profiles}=await client.from('profiles').select('id,username,display_name').in('id',ids);
      (profiles||[]).forEach(p=>users[p.id]=p.display_name||p.username);
    }
    list.innerHTML=data.map(r=>{const who=users[r.user_id]||`Joueur ${String(r.user_id||'').slice(0,8)}`;const date=new Date(r.created_at).toLocaleString('fr-FR');const pending=r.status==='pending';return `<article class="pr-card ${esc(r.status)}"><div><b>${esc(r.item_name)}</b> · <strong>${money(r.price)}</strong><div class="pr-meta">👤 ${esc(who)} · 📅 ${esc(date)} · ${r.status==='pending'?'⏳ En attente':r.status==='accepted'?'✅ Accepté':'❌ Refusé'}</div></div><div class="pr-actions">${pending?`<button class="pr-btn accept" data-accept="${r.id}" data-item="${esc(r.item_name)}" data-price="${r.price}">✅ Accepter</button><button class="pr-btn reject" data-reject="${r.id}">❌ Refuser</button>`:''}</div></article>`}).join('');
    list.querySelectorAll('[data-accept]').forEach(b=>b.onclick=()=>review(b.dataset.accept,'accepted',b.dataset.item,Number(b.dataset.price)));
    list.querySelectorAll('[data-reject]').forEach(b=>b.onclick=()=>review(b.dataset.reject,'rejected'));
  }

  async function review(id,status,item,price){
    const user=await isAdmin();if(!user)return;
    if(status==='accepted'&&!confirm(`Accepter ${money(price)} pour « ${item} » ?`))return;
    if(status==='rejected'&&!confirm('Refuser cette proposition ?'))return;
    const {error}=await client.from('price_reports').update({status,reviewed_by:user.id,reviewed_at:new Date().toISOString()}).eq('id',id);
    if(error){alert('Erreur : '+error.message);return}
    if(status==='accepted'&&item){
      const {error:ie}=await client.from('items').update({price}).eq('name',item);
      if(ie)alert('Proposition acceptée, mais le prix de l’item n’a pas pu être mis à jour : '+ie.message);
    }
    loadReports();
  }

  async function boot(){
    if(location.pathname.endsWith('/admin.html')){
      const user=await isAdmin();
      if(user){
        const wait=()=>{if(q('#panel'))injectAdminPanel();else setTimeout(wait,150)};wait();
      }
    }else setupPublic();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
