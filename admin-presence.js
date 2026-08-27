(() => {
  'use strict';
  const cfg=window.PRICECHECK_AUTH;
  if(!cfg?.supabaseUrl||!cfg?.supabaseAnonKey||!window.supabase)return;
  const client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
  const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const style=document.createElement('style');
  style.textContent='.admin-presence{margin:15px 0;padding:16px;border:1px solid #334155;border-radius:16px;background:linear-gradient(135deg,#0f172a,#111827);box-shadow:0 10px 30px #0003}.admin-presence h3{margin:0 0 10px}.admin-list{display:grid;gap:8px}.admin-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid #273449;border-radius:12px;background:#0b111d}.admin-name{font-weight:800}.admin-role{display:block;color:#94a3b8;font-size:11px;margin-top:2px}.admin-state{font-size:11px;font-weight:900;padding:5px 9px;border-radius:999px;white-space:nowrap}.admin-state.on{background:#064e3b;color:#86efac}.admin-state.off{background:#1e293b;color:#94a3b8}';
  document.head.appendChild(style);
  const box=document.createElement('section');
  box.className='admin-presence';
  box.innerHTML='<h3>🛡️ Équipe administrative</h3><div class="admin-list" id="adminPresenceList"><div class="muted">Chargement…</div></div>';
  const place=()=>{const status=document.querySelector('#status');if(status&&!box.isConnected)status.after(box)};
  place();setTimeout(place,500);
  async function heartbeat(){
    try{
      const {data:{session}}=await client.auth.getSession();
      if(!session)return;
      const {data:me}=await client.from('admins').select('user_id').eq('user_id',session.user.id).maybeSingle();
      if(me) await client.from('admin_presence').upsert({user_id:session.user.id,last_seen:new Date().toISOString()},{onConflict:'user_id'});
    }catch(e){console.debug('presence heartbeat unavailable',e)}
  }
  async function render(){
    place();
    try{
      const {data:admins,error}=await client.from('admins').select('user_id,role,created_at').order('created_at');
      if(error)throw error;
      const ids=(admins||[]).map(a=>a.user_id);
      let presence=[];
      if(ids.length){
        const {data,error:pe}=await client.from('admin_presence').select('user_id,last_seen').in('user_id',ids);
        if(pe)throw pe;
        presence=data||[];
      }
      const now=Date.now();
      const byId=new Map(presence.map(p=>[p.user_id,p]));
      const list=document.querySelector('#adminPresenceList');if(!list)return;
      list.innerHTML=(admins||[]).map((a,i)=>{
        const p=byId.get(a.user_id);
        const seen=p?new Date(p.last_seen).getTime():0;
        const on=Boolean(seen&&now-seen<90000);
        const label=a.role==='creator'?'Créateur':`Admin ${i+1}`;
        return `<div class="admin-row"><div><span class="admin-name">${esc(label)}</span><span class="admin-role">${on?'Actif récemment':'Aucune activité récente'}</span></div><span class="admin-state ${on?'on':'off'}">${on?'🟢 Connecté':'⚪ Pas connecté'}</span></div>`;
      }).join('')||'<div class="muted">Aucun administrateur.</div>';
    }catch(e){
      const list=document.querySelector('#adminPresenceList');
      if(list)list.innerHTML='<div class="muted">Impossible de récupérer le statut des admins.</div>';
    }
  }
  heartbeat();render();
  setInterval(heartbeat,30000);
  setInterval(render,15000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)heartbeat()});
})();