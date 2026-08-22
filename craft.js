// Système de craft interactif — V12.3
(function(){
  const FALLBACK_IMAGE='images/default.svg';
  function esc(v){return String(v??'').replace(/[&<>\"]/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[s]));}
  function normName(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
  function imageFor(name){
    const found=(window.ITEMS||[]).find(a=>normName(a[0])===normName(name));
    return found?.[4]||FALLBACK_IMAGE;
  }
  async function getRecipe(itemName){
    if(!window.supabaseClient && window.supabase && window.PRICECHECK_AUTH?.supabaseUrl && window.PRICECHECK_AUTH?.supabaseAnonKey){
      window.supabaseClient=window.supabase.createClient(window.PRICECHECK_AUTH.supabaseUrl,window.PRICECHECK_AUTH.supabaseAnonKey);
    }
    if(!window.supabaseClient)return null;
    const {data,error}=await window.supabaseClient.from('craft_recipes').select('item_name,station,result_count,grid,notes').eq('item_name',itemName).maybeSingle();
    if(error) throw error;
    return data||null;
  }
  function ingredientCell(c){
    if(!c)return '<div class="craft-cell empty">—</div>';
    const name=typeof c==='string'?c:c.name;
    const count=typeof c==='object'?(c.count||c.quantity||1):1;
    return `<button class="craft-cell ingredient" data-craft-item="${esc(name)}"><img src="${esc(imageFor(name))}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"><span>${esc(name)}</span><b>×${esc(count)}</b></button>`;
  }
  function ensureModal(){
    if(document.getElementById('craftModal'))return;
    const style=document.createElement('style');
    style.textContent=`.craft-open{width:100%;font-size:16px}.craft-modal{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:18px;background:#000b;backdrop-filter:blur(6px)}.craft-modal.show{display:flex}.craft-window{width:min(720px,100%);max-height:90vh;overflow:auto;background:#0d1420;border:1px solid #334155;border-radius:20px;box-shadow:0 25px 80px #000b;padding:20px}.craft-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.craft-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:480px;margin:18px auto}.craft-cell{min-height:88px;border:1px solid #273449;border-radius:12px;background:#111a2a;color:#f8fafc;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:7px;text-align:center}.craft-cell.empty{background:#0b111d;color:#64748b}.craft-cell.ingredient{cursor:pointer;font:inherit}.craft-cell.ingredient:hover{border-color:#8b5cf6;transform:translateY(-1px)}.craft-cell img{width:48px;height:48px;object-fit:contain}.craft-cell span{font-size:11px;margin-top:4px}.craft-cell b{font-size:11px;color:#c4b5fd}.craft-result{display:flex;align-items:center;justify-content:center;gap:10px;padding:12px;border:1px solid #273449;border-radius:12px;background:#0b111d}.craft-result img{width:52px;height:52px;object-fit:contain}@media(max-width:500px){.craft-grid{gap:5px}.craft-cell{min-height:70px}.craft-cell img{width:38px;height:38px}.craft-window{padding:14px}}`;
    document.head.appendChild(style);
    const modal=document.createElement('div');
    modal.id='craftModal'; modal.className='craft-modal';
    modal.innerHTML='<div class="craft-window"><div id="craftModalContent"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeCraft()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCraft()});
  }
  function closeCraft(){document.getElementById('craftModal')?.classList.remove('show')}
  async function openCraft(itemName){
    ensureModal();
    const modal=document.getElementById('craftModal'), content=document.getElementById('craftModalContent');
    modal.classList.add('show'); content.innerHTML='<p class="muted">🔄 Chargement du craft…</p>';
    try{
      const r=await getRecipe(itemName);
      if(!r){content.innerHTML=`<div class="craft-top"><div><span class="pill">🛠️ Craft / obtention</span><h2>${esc(itemName)}</h2></div><button class="btn" onclick="window.closeCraft()">✕</button></div><p class="muted">Aucune recette détaillée n’est encore enregistrée pour cet item.</p>`;return;}
      const grid=Array.isArray(r.grid)?r.grid:Array(9).fill(null);
      content.innerHTML=`<div class="craft-top"><div><span class="pill">🛠️ ${esc(r.station||'Table de craft')}</span><h2>Comment fabriquer ${esc(itemName)} ?</h2></div><button class="btn" onclick="window.closeCraft()">✕</button></div><div class="craft-grid">${grid.map(ingredientCell).join('')}</div><div class="craft-result"><img src="${esc(imageFor(itemName))}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"><div><b>Résultat</b><br>${esc(r.result_count||1)} × ${esc(itemName)}</div></div>${r.notes?`<p class="muted">${esc(r.notes)}</p>`:''}<p class="muted small">💡 Clique sur un ingrédient pour voir comment le fabriquer à son tour.</p>`;
      content.querySelectorAll('[data-craft-item]').forEach(btn=>btn.addEventListener('click',()=>openCraft(btn.dataset.craftItem)));
    }catch(e){console.error(e);content.innerHTML='<p class="muted">❌ Impossible de charger la recette pour le moment.</p><button class="btn" onclick="window.closeCraft()">Fermer</button>'}
  }
  window.closeCraft=closeCraft;
  window.openCraft=openCraft;
  window.loadCraft=function(){
    const box=document.getElementById('craftBox'); if(!box||!window.x)return;
    box.innerHTML=`<button class="btn primary craft-open" id="openCraftButton">🛠️ Voir le craft et l’obtention</button><p class="muted small" style="margin:9px 0 0">Ouvre la recette, les ingrédients et les étapes nécessaires. Les ingrédients cliquables permettent de remonter leur propre craft.</p>`;
    document.getElementById('openCraftButton').onclick=()=>openCraft(window.x[0]);
    ensureModal();
  };
})();
