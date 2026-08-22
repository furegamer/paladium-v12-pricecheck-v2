(() => {
  'use strict';
  const CFG = window.PRICECHECK_AUTH;
  if (!CFG?.supabaseUrl || !CFG?.supabaseAnonKey) return;

  const ID_KEY='pricecheck:player-id';
  const NAME_KEY='pricecheck:player-name';
  const WALLET_KEY='pricecheck:wallet';
  const JOB_KEY='pricecheck:job-levels';
  const POG_KEY='pricecheck:pog-level';
  const getId=()=>{let id=localStorage.getItem(ID_KEY);if(!id){id=crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(ID_KEY,id)}return id};
  const getName=()=>localStorage.getItem(NAME_KEY)||`Joueur-${getId().slice(0,4).toUpperCase()}`;
  const getWallet=()=>Math.max(0,Math.round(Number(localStorage.getItem(WALLET_KEY)||0)));
  const getLevels=()=>{try{return JSON.parse(localStorage.getItem(JOB_KEY)||'{}')}catch{return{}}};
  const headers=()=>({apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${CFG.supabaseAnonKey}`,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates'});
  async function upsert(){
    const levels=getLevels();
    const body={player_id:getId(),display_name:getName(),wallet:getWallet(),miner_level:Number(levels.Mineur||1),farmer_level:Number(levels.Fermier||1),hunter_level:Number(levels.Chasseur||1),alchemist_level:Number(levels.Alchimiste||1),pog_level:Number(localStorage.getItem(POG_KEY)||1),last_seen:new Date().toISOString()};
    try{await fetch(`${CFG.supabaseUrl}/rest/v1/player_stats`,{method:'POST',headers:headers(),body:JSON.stringify(body),keepalive:true})}catch(e){console.warn('Player stats sync unavailable',e)}
  }
  async function api(path,options={}){const r=await fetch(`${CFG.supabaseUrl}/rest/v1/${path}`,{...options,headers:{...headers(),...(options.headers||{})}});if(!r.ok)throw new Error(`Supabase ${r.status}`);return r.json()}
  function addProfileLink(){document.querySelectorAll('.links').forEach(l=>{if(!l.querySelector('a[href="profile.html"]'))l.insertAdjacentHTML('beforeend','<a href="profile.html">👤 Profil</a>')})}
  async function boot(){addProfileLink();await upsert();setInterval(upsert,30000);window.PriceCheckPlayers={upsert,api,getId,getName,setName:n=>{localStorage.setItem(NAME_KEY,String(n).trim().slice(0,24)||getName());return upsert()}}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
