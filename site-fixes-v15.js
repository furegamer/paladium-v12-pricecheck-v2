(() => {
'use strict';
if(window.__PC_SITE_FIXES_V15__)return;
window.__PC_SITE_FIXES_V15__=true;
const WALLET='pricecheck:wallet',PB='pricecheck:pb';
const money=n=>Math.max(0,Math.round(Number(n)||0)).toLocaleString('fr-FR');
const setText=(sel,text)=>{const e=document.querySelector(sel);if(e)e.textContent=text};
async function hydrateWallet(){const p=window.PriceCheckPlayers;if(!p)return;try{const ok=await p.hydrateFromServer?.();if(!ok)return;const w=p.getWallet?.()??0,pb=p.getPB?.()??0;localStorage.setItem(WALLET,String(w));localStorage.setItem(PB,String(pb));const budget=document.querySelector('#budget');if(budget&&document.activeElement!==budget)budget.value=w||'';setText('#wallet',`${money(w)} P$`);setText('#balance',`${money(w)} P$`);setText('#sBudget',`${money(w)} P$`);setText('#pb',`${money(pb)} PB`)}catch(e){console.warn('[PriceCheck] wallet hydration',e)}}
function heartbeat(){window.PriceCheckPlayers?.upsert?.()}
function calculatorLabels(){if(!location.pathname.endsWith('/xp.html'))return;const labels=[['#xpLevel','Niveau sélectionné (1–100)'],['#rewardLevel','Niveau cible (1–100)'],['#pogLevel','Niveau POG (1–100)']];labels.forEach(([sel,label])=>{const e=document.querySelector(sel);if(e){e.setAttribute('aria-label',label);e.title=label}});const job=document.querySelector('#jobSelect');if(job)job.title='Choisis le métier, puis indique son niveau actuel.'}
function boot(){hydrateWallet();calculatorLabels();heartbeat();setInterval(hydrateWallet,15000);setInterval(heartbeat,30000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
