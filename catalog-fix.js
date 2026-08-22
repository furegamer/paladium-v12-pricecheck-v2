(() => {
'use strict';
if(window.__PRICECHECK_CATALOG_FIX__)return;window.__PRICECHECK_CATALOG_FIX__=true;
const cleanNav=()=>document.querySelectorAll('.links a[href="budget.html"]').forEach(a=>a.remove());
const refresh=async()=>{cleanNav();const q=document.querySelector('#q'),grid=document.querySelector('#items');if(!q||!grid)return;try{if(typeof addCatalogExpansion==='function')addCatalogExpansion();if(typeof syncRemoteCatalog==='function')await syncRemoteCatalog();q.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#cat')?.dispatchEvent(new Event('change',{bubbles:true}));cleanNav()}catch(e){console.warn('PriceCheck catalogue refresh',e)}};
window.addEventListener('pageshow',()=>setTimeout(refresh,40));window.addEventListener('focus',()=>setTimeout(refresh,80));if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(refresh,60),{once:true});else setTimeout(refresh,60);
})();
