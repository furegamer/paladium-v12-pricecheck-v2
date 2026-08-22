(() => {
  'use strict';
  const CFG=window.PRICECHECK_AUTH;if(!CFG?.supabaseUrl||!CFG?.supabaseAnonKey)return;
  const ID_KEY='pricecheck:player-id',NAME_KEY='pricecheck:player-name',WALLET_KEY='pricecheck:wallet',PB_KEY='pricecheck:pb',JOB_KEY='pricecheck:job-levels',POG_KEY='pricecheck:pog-level';
  const getId=()=>{let id=localStorage.getItem(ID_KEY);if(!id){id=crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(ID_KEY,id)}return id};
  const getName=()=>String(localStorage.getItem(NAME_KEY)||'').trim().slice(0,24);
  const getWallet=()=>Math.max(0,Math.round(Number(localStorage.getItem(WALLET_KEY)||0))),getPB=()=>Math.max(0,Math.round(Number(localStorage.getItem(PB_KEY)||0)));
  const getLevels=()=>{try{return JSON.parse(localStorage.getItem(JOB_KEY)||'{}')}catch{return{}}};
  const headers=()=>({apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${CFG.supabaseAnonKey}`,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates'});
  async function upsert(){const l=getLevels();const body={player_id:getId(),display_name:getName()||'Joueur',wallet:getWallet(),pb:getPB(),miner_level:Number(l.Mineur||1),farmer_level:Number(l.Fermier||1),hunter_level:Number(l.Chasseur||1),alchemist_level:Number(l.Alchimiste||1),pog_level:Number(localStorage.getItem(POG_KEY)||1),last_seen:new Date().toISOString()};try{const r=await fetch(`${CFG.supabaseUrl}/rest/v1/player_stats`,{method:'POST',headers:headers(),body:JSON.stringify(body),keepalive:true});if(!r.ok)console.warn('Player stats sync HTTP',r.status)}catch(e){console.warn('Player stats sync unavailable',e)}}
  async function api(path,options={}){const r=await fetch(`${CFG.supabaseUrl}/rest/v1/${path}`,{...options,headers:{...headers(),...(options.headers||{})}});if(!r.ok)throw new Error(`Supabase ${r.status}`);return r.json()}
  const setName=async n=>{const value=String(n).trim().slice(0,24);if(value)localStorage.setItem(NAME_KEY,value);else localStorage.removeItem(NAME_KEY);await upsert();renderProfileEntry();return value},setWallet=n=>{localStorage.setItem(WALLET_KEY,String(Math.max(0,Math.round(Number(n)||0))));renderProfileEntry();return upsert()},setPB=n=>{localStorage.setItem(PB_KEY,String(Math.max(0,Math.round(Number(n)||0))));renderProfileEntry();return upsert()};
  window.PriceCheckPlayers={upsert,api,getId,getName,getWallet,getPB,getLevels,setName,setWallet,setPB};

  const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function injectProfileStyles(){if(document.getElementById('pricecheck-profile-entry-styles'))return;const style=document.createElement('style');style.id='pricecheck-profile-entry-styles';style.textContent=`
    .pricecheck-profile-entry{width:100%;min-height:64px;display:flex!important;align-items:center;justify-content:space-between;gap:14px;padding:10px 18px!important;border-radius:18px;cursor:pointer!important;text-align:left;transition:.18s ease;}
    .pricecheck-profile-entry:hover{transform:translateY(-1px);box-shadow:0 8px 22px rgba(0,0,0,.08)}
    .pc-profile-main{display:flex;align-items:center;gap:12px;min-width:0}
    .pc-profile-avatar{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#b86b35,#e5c98f);font-size:23px;flex:none}
    .pc-profile-copy{min-width:0}.pc-profile-name{font-weight:900;font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pc-profile-label{font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:.12em;margin-top:2px}
    .pc-profile-stats{display:flex;justify-content:flex-end;gap:7px;flex-wrap:wrap}.pc-profile-chip{padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.42);font-size:11px;font-weight:800;white-space:nowrap}
    @media(max-width:700px){.pricecheck-profile-entry{align-items:flex-start}.pc-profile-stats{justify-content:flex-start}.pc-profile-chip{padding:6px 8px}.pc-profile-name{font-size:15px}}
  `;document.head.appendChild(style)}

  function findProfileTarget(){
    const name=getName();if(!name)return null;
    const all=[...document.querySelectorAll('body *')];
    const exact=all.find(el=>el.dataset?.profileEntry==='1');if(exact)return exact;
    const text=all.find(el=>{if(el.children.length>2)return false;const t=String(el.textContent||'').trim();return t===name||t===`👤 ${name}`||t===`👤${name}`});
    if(!text)return null;
    return text;
  }

  function renderProfileEntry(){
    const name=getName();if(!name||!document.body)return;
    injectProfileStyles();
    const target=findProfileTarget();if(!target)return;
    target.dataset.profileEntry='1';
    target.dataset.profileLink='1';
    target.setAttribute('role','link');target.setAttribute('tabindex','0');target.title='Ouvrir mon profil';
    target.classList.add('pricecheck-profile-entry');
    const l=getLevels();
    const jobs=[['M',l.Mineur],['F',l.Fermier],['A',l.Alchimiste],['C',l.Chasseur]].filter(([,v])=>Number(v)>0).map(([k,v])=>`${k} ${Number(v)}`).join(' · ')||'Métiers à renseigner';
    target.innerHTML=`<span class="pc-profile-main"><span class="pc-profile-avatar">👤</span><span class="pc-profile-copy"><span class="pc-profile-name">${esc(name)}</span><span class="pc-profile-label">Mon profil · ${jobs}</span></span></span><span class="pc-profile-stats"><span class="pc-profile-chip">💰 ${getWallet().toLocaleString('fr-FR')} P$</span><span class="pc-profile-chip">🪙 ${getPB().toLocaleString('fr-FR')} PB</span><span class="pc-profile-chip">⭐ POG ${Number(localStorage.getItem(POG_KEY)||1)}</span></span>`;
    if(!target.dataset.profileClickBound){target.dataset.profileClickBound='1';target.addEventListener('click',()=>{location.href='profile.html'});target.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();location.href='profile.html'}})}
    document.querySelectorAll('.links a[href="profile.html"]').forEach(a=>a.remove());
  }

  function boot(){
    upsert();
    renderProfileEntry();
    const observer=new MutationObserver(()=>renderProfileEntry());
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    setInterval(()=>{upsert();renderProfileEntry()},30000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
