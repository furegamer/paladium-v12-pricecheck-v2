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
  const setName=n=>{const value=String(n).trim().slice(0,24);if(value)localStorage.setItem(NAME_KEY,value);else localStorage.removeItem(NAME_KEY);return upsert()},setWallet=n=>{localStorage.setItem(WALLET_KEY,String(Math.max(0,Math.round(Number(n)||0))));return upsert()},setPB=n=>{localStorage.setItem(PB_KEY,String(Math.max(0,Math.round(Number(n)||0))));return upsert()};
  window.PriceCheckPlayers={upsert,api,getId,getName,getWallet,getPB,getLevels,setName,setWallet,setPB};
  const addProfileLink=()=>document.querySelectorAll('.links').forEach(l=>{if(!l.querySelector('a[href="profile.html"]'))l.insertAdjacentHTML('beforeend','<a href="profile.html">👤 Profil</a>')});
  async function boot(){addProfileLink();await upsert();setInterval(upsert,30000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
