const $=s=>document.querySelector(s);
const favKey='pricecheck:favorites',historyKey='pricecheck:history';
const getFav=()=>new Set(JSON.parse(localStorage.getItem(favKey)||'[]'));
const saveFav=s=>localStorage.setItem(favKey,JSON.stringify([...s]));
const getHistory=()=>JSON.parse(localStorage.getItem(historyKey)||'{}');
const name=new URLSearchParams(location.search).get('item');
let x=getItem(name);
const app=$('#app');
const authConfig=window.PRICECHECK_AUTH||{};
const supabaseClient=window.supabase&&authConfig.supabaseUrl&&authConfig.supabaseAnonKey?window.supabase.createClient(authConfig.supabaseUrl,authConfig.supabaseAnonKey):null;

const LOCAL_IMAGES={
'Pickaxe of the God':'images/pog.svg','Paladium':'images/paladium-ore.svg','Titane':'images/titane.svg','Améthyste':'images/amethyste.svg','Rubis':'images/rubis.svg','Saphir':'images/saphir.svg','Émeraude':'images/emeraude.svg','Obsidienne':'images/obsidienne.svg',"Perle de l'End":'images/perle-end.svg','Machine industrielle':'images/crusher.svg','Four amélioré':'images/four.svg','Pioche Paladium':'images/pioche-paladium.svg','Casque Paladium':'images/casque-paladium.svg','Plastron Paladium':'images/plastron-paladium.svg','Pomme dorée':'images/pomme-doree.svg','Pain':'images/pain.svg','Pioche en améthyste':'images/pickaxe-amethyste.svg','Pelle en améthyste':'images/shovel-amethyste.svg','Hache en améthyste':'images/axe-amethyste.svg','Pioche en titane':'images/pickaxe-titane.svg','Pelle en titane':'images/shovel-titane.svg','Hache en titane':'images/axe-titane.svg','Marteau en paladium':'images/hammer-paladium.svg','Pioche en paladium vert':'images/pickaxe-paladium-vert.svg','Hache en paladium vert':'images/axe-paladium-vert.svg','Pioche en endium':'images/pickaxe-endium.svg','Hache en endium':'images/axe-endium.svg','Palaforge':'images/palaforge.svg','Palafurnace':'images/palafurnace.svg','Crusher':'images/crusher.svg','Cobblebreaker':'images/cobblebreaker.svg','Aimant':'images/aimant.svg','Dollars Stone':'images/dollars-stone.svg','Entonnoir en Paladium':'images/hopper-paladium.svg','Small Ring en Paladium':'images/small-ring.svg'};
const imageFor=n=>LOCAL_IMAGES[n]||'images/default.svg';
const money=v=>Number(v||0).toLocaleString('fr-FR')+' $';
const median=values=>{const a=[...values].sort((p,q)=>p-q);if(!a.length)return 0;const m=Math.floor(a.length/2);return a.length%2?a[m]:Math.round((a[m-1]+a[m])/2)};
const groupedReports=rows=>{const map=new Map();rows.forEach(r=>{const p=Number(r.price);map.set(p,(map.get(p)||0)+1)});return [...map.entries()].sort((a,b)=>b[1]-a[1]||a[0]-b[0])};

async function loadReports(){
 if(!supabaseClient||!x)return;
 const box=$('#communityPrice');if(!box)return;
 box.innerHTML='<p class="muted">🔄 Vérification des prix communautaires…</p>';
 const {data,error}=await supabaseClient.from('price_report_public').select('price,created_at').eq('item_name',x[0]).order('created_at',{ascending:false}).limit(200);
 if(error){box.innerHTML='<h2>Prix communautaire</h2><p class="muted">⚠️ Impossible de charger les relevés.</p>'+reportForm();bindReportForm();return}
 const rows=data||[];
 if(!rows.length){box.innerHTML='<h2>Prix communautaire</h2><p class="muted">Aucun relevé pour <b>'+x[0]+'</b>.</p>'+reportForm();bindReportForm();return}
 const values=rows.map(r=>Number(r.price)),groups=groupedReports(rows),top=groups[0],med=median(values),confidence=rows.length>=10?'🟢 Élevée':rows.length>=4?'🟡 Moyenne':'🟠 Faible';
 box.innerHTML='<h2>Prix communautaire</h2><div class="report-summary"><div class="report-stat"><span>Prix conseillé</span><strong>'+money(med)+'</strong></div><div class="report-stat"><span>Relevés</span><strong>'+rows.length+'</strong></div><div class="report-stat"><span>Fiabilité</span><strong>'+confidence+'</strong></div></div><p class="muted small">Médiane des derniers relevés. Prix le plus signalé : <b>'+money(top[0])+'</b> ('+top[1]+' fois).</p>'+reportForm();
 bindReportForm();
}
function reportForm(){return '<div style="margin-top:16px"><h3>💰 Proposer un prix</h3><div class="price-report"><input id="communityPriceInput" type="number" min="1" max="1000000000" step="1" inputmode="numeric" placeholder="Ex : 1250"><button id="sendCommunityPrice" class="btn primary">Envoyer</button></div><div id="reportStatus" class="muted small" style="margin-top:8px">Les propositions sont vérifiées avant de devenir une référence.</div></div>'}
async function bindReportForm(){
 const send=$('#sendCommunityPrice');if(!send)return;
 send.onclick=async()=>{const input=$('#communityPriceInput'),status=$('#reportStatus'),price=Math.round(Number(input.value));if(!price||price<1){status.textContent='⚠️ Entre un prix supérieur à 0.';return}if(!supabaseClient){status.textContent='⚠️ Supabase indisponible.';return}send.disabled=true;const {data:{user}}=await supabaseClient.auth.getUser();if(!user){status.textContent='🔐 Connecte-toi avec Discord pour proposer un prix.';send.disabled=false;return}const {data:allowed}=await supabaseClient.rpc('can_submit_price_report',{p_item_name:x[0],p_price:price});if(allowed!==true){status.textContent='⏳ Attends environ 1 minute avant de renvoyer un prix pour cet item.';send.disabled=false;return}const {error}=await supabaseClient.from('price_reports').insert({item_name:x[0],price,user_id:user.id});if(error){status.textContent='❌ Le prix n’a pas pu être enregistré.';send.disabled=false;return}input.value='';status.textContent='✅ Prix enregistré !';await loadReports()}
}

function rarityClass(r){return (RARITY_CLASS[r]||'').replace('rarity-','')}
function imgTag(n,cls=''){return '<img class="'+cls+'" src="'+imageFor(n)+'" alt="'+n.replaceAll('"','&quot;')+'" onerror="this.onerror=null;this.src=\'images/default.svg\'">'}
function craftPreview(){
 const slots=['Lingot de paladium','Lingot de paladium','Lingot de paladium','Lingot de paladium','Stick en paladium','Lingot de paladium','','Stick en paladium',''];
 return '<div class="craft-preview"><div class="craft-grid">'+slots.map(s=>'<div class="craft-cell">'+(s?imgTag(s):'')+'</div>').join('')+'</div><div class="arrow">→</div><div class="craft-result">'+imgTag(x[0])+'</div></div>'
}

function render(){
 if(!x){app.innerHTML='<section class="panel"><span class="tag">❌ Item introuvable</span><h1 class="title">Cet item n’existe pas encore</h1><p class="muted">Retourne au catalogue pour choisir un autre item.</p></section>';return}
 const fav=getFav(),isFav=fav.has(x[0]),conf=confidence(x),h=getHistory()[x[0]]||[],durability=x[8]&&x[8]!=='∞';
 const related=ITEMS.filter(a=>a!==x&&a[2]===x[2]).sort((a,b)=>Math.abs((a[5]||0)-(x[5]||0))-Math.abs((b[5]||0)-(x[5]||0))).slice(0,6);
 const crumb=$('#crumbItem');if(crumb)crumb.textContent=x[0];
 app.innerHTML='<section class="hero"><div class="hero-main"><div class="image-box">'+imgTag(x[0])+'</div><div><div class="eyebrow"><span class="rarity '+rarityClass(x[3])+'">'+x[3].toUpperCase()+'</span><span class="tag">'+x[2]+'</span></div><h1 class="title">'+x[0]+'</h1><p class="subtitle">'+x[11]+'</p><button id="favorite" class="favorite '+(isFav?'active':'')+'" title="Favori">'+(isFav?'★':'☆')+'</button></div></div><aside class="price-card"><div class="label">PRIX MOYEN</div><div class="value">'+money(x[5])+'</div><div class="delta">± '+money(Math.round((x[7]-x[6])/2))+' ('+Math.max(0,Math.round(((x[7]-x[6])/Math.max(1,x[5]))*1000)/10)+'%)</div></aside></section><section class="spec-strip"><div class="spec"><div class="sicon">▥</div><span>NIVEAU REQUIS</span><strong>'+((x[10]??'—'))+'</strong></div><div class="spec"><div class="sicon">⬡</div><span>DURABILITÉ</span><strong>'+((x[8]??'—'))+'</strong></div><div class="spec"><div class="sicon">⚔</div><span>VITESSE / DÉGÂTS</span><strong>'+((x[9]??'—'))+'</strong></div><div class="spec"><div class="sicon">⛏</div><span>EFFICIENCE</span><strong>'+((x[10]?Math.min(10,Math.max(1,Math.round(x[10]/2))):'—'))+'</strong></div><div class="spec"><div class="sicon">✦</div><span>ENCHANTABLE</span><strong class="good">Oui</strong></div></section><div class="two-col"><section class="panel"><h2>Craft / obtention</h2>'+craftPreview()+'<button id="openCraft" class="craft-btn">⚒ Voir le craft et l’obtention</button></section><section class="panel"><h2>Items proches</h2><div class="related-grid">'+related.map(a=>'<a class="related-card" href="item.html?item='+encodeURIComponent(a[0])+'">'+imgTag(a[0])+'<div class="name">'+a[0]+'</div><div class="tag" style="margin-top:6px">'+a[3]+'</div><div class="rprice">'+money(a[5])+'</div></a>').join('')+'</div></section></div><section class="info"><div class="panel"><h2>Informations</h2><p class="muted">'+x[11]+'</p></div><div class="panel mini"><div class="mini-label">Obtenu via</div><div class="mini-value">🧰 '+(x[12]||'Craft / obtention en jeu')+'</div></div><div class="panel mini"><div class="mini-label">Dernière vérification</div><div class="mini-value">✓ Données PriceCheck</div></div></section><section id="communityPrice" class="panel community"><p class="muted">🔄 Chargement des prix communautaires…</p></section><section class="panel" style="margin-top:20px"><h2>Prix observés</h2>'+(h.length?'<div class="history-bars">'+h.slice(-10).map(v=>'<div style="height:'+Math.max(8,Math.min(100,v.value/Math.max(...h.map(a=>a.value))*100))+'%" title="'+money(v.value)+' • '+v.date+'"></div>').join('')+'</div>':'<p class="muted">Aucune observation locale.</p>')+'</section>'+(durability?'<section class="panel" style="margin-top:20px"><h2>Valeur selon la durabilité</h2><input id="dur" type="range" min="0" max="100" value="100"><div class="durout"><b id="durPct">100%</b><strong id="durPrice">'+money(x[5])+'</strong></div></section>':'')+'<section class="panel" style="margin-top:20px"><h2>Alias</h2><div class="aliases">'+x[1].map(a=>'<span>'+a+'</span>').join('')+'</div></section>';
 $('#favorite').onclick=()=>{const s=getFav();s.has(x[0])?s.delete(x[0]):s.add(x[0]);saveFav(s);render()};
 $('#openCraft').onclick=()=>openCraftModal(x[0]);
 const dur=$('#dur');if(dur)dur.oninput=()=>{$('#durPct').textContent=dur.value+'%';$('#durPrice').textContent=money(Math.round(x[5]*(+dur.value/100)))};
 loadReports();
}

async function openCraftModal(itemName){
 let modal=document.querySelector('#craftModal');if(!modal){modal=document.createElement('div');modal.id='craftModal';document.body.appendChild(modal)}
 modal.className='modal';modal.innerHTML='<div class="modal-card"><button id="closeCraft" class="btn">✕ Fermer</button><div id="craftContent" style="margin-top:15px">🔄 Chargement…</div></div>';
 $('#closeCraft').onclick=()=>modal.remove();
 if(!supabaseClient){$('#craftContent').innerHTML='<h2>Craft / obtention</h2><p class="muted">Supabase est indisponible pour charger cette recette.</p>';return}
 const {data,error}=await supabaseClient.from('craft_recipes').select('station,result_count,grid,notes').eq('item_name',itemName).maybeSingle();
 const box=$('#craftContent');if(error||!data){box.innerHTML='<h2>Craft / obtention</h2><p class="muted">Aucune recette détaillée enregistrée pour cet item.</p>';return}
 const grid=Array.isArray(data.grid)?data.grid:Array(9).fill(null);
 box.innerHTML='<h2>🛠️ '+itemName+'</h2><p class="muted">'+(data.station||'Table de craft')+'</p><div class="recipe-grid">'+grid.map(c=>c?'<button class="recipe-cell" data-craft-item="'+encodeURIComponent(c.name)+'">'+(imageFor(c.name)?imgTag(c.name):'📦')+'<b>'+c.name+'</b><span>×'+(c.count||1)+'</span></button>':'<div class="recipe-cell"></div>').join('')+'</div><p class="muted small">Résultat : '+(data.result_count||1)+' × '+itemName+(data.notes?'<br>'+data.notes:'')+'</p>';
 box.querySelectorAll('[data-craft-item]').forEach(b=>b.onclick=()=>openCraftModal(decodeURIComponent(b.dataset.craftItem)));
}

async function syncRemoteItem(){
 try{const cfgText=await fetch('auth-config.js?v=12.3',{cache:'no-store'}).then(r=>r.text()),url=(cfgText.match(/supabaseUrl:\s*["']([^"']+)/)||[])[1],key=(cfgText.match(/supabaseAnonKey:\s*["']([^"']+)/)||[])[1];if(!url||!key)return;const r=await fetch(url+'/rest/v1/items?select=*&name=eq.'+encodeURIComponent(name),{headers:{apikey:key,Authorization:'Bearer '+key}});if(!r.ok)return;const rows=await r.json();if(!rows.length)return;const row=rows[0];x=[row.name,row.aliases||[],row.category,row.rarity,imageFor(row.name),row.price,row.min_price,row.max_price,row.durability,row.damage,row.level,row.description,row.craft_text];const i=ITEMS.findIndex(a=>norm(a[0])===norm(row.name));if(i>=0)ITEMS[i]=x;else ITEMS.push(x)}catch(e){console.warn('Données distantes indisponibles',e)}
}
(async()=>{await syncRemoteItem();render()})();