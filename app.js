const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const favKey='pricecheck:favorites';const historyKey='pricecheck:history';
const favorites=()=>new Set(JSON.parse(localStorage.getItem(favKey)||'[]'));const saveFavorites=s=>localStorage.setItem(favKey,JSON.stringify([...s]));const history=()=>JSON.parse(localStorage.getItem(historyKey)||'{}');const saveHistory=h=>localStorage.setItem(historyKey,JSON.stringify(h));

// Version affichée partout où le badge « nouvelle interface » est utilisé.
// Pour une prochaine mise à jour, il suffit de changer cette valeur.
const PRICECHECK_VERSION='V12.8';
function updateVersionBadge(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while(node=walker.nextNode()){
    if(node.nodeValue.includes('🚀 V12.2 • nouvelle interface')){
      node.nodeValue=node.nodeValue.replaceAll('🚀 V12.2 • nouvelle interface',`🚀 ${PRICECHECK_VERSION} • nouvelle interface`);
    }
  }
}

// Les images locales du dépôt restent prioritaires : une image Supabase ancienne ne doit plus remplacer l'icône du catalogue.
const LOCAL_IMAGES={
  'Pickaxe of the God':'images/pog.svg','Paladium':'images/paladium-ore.svg','Titane':'images/titane.svg','Améthyste':'images/amethyste.svg','Rubis':'images/rubis.svg','Saphir':'images/saphir.svg','Émeraude':'images/emeraude.svg','Obsidienne':'images/obsidienne.svg',"Perle de l'End":'images/perle-end.svg','Machine industrielle':'images/crusher.svg','Four amélioré':'images/four.svg','Pioche Paladium':'images/pioche-paladium.svg','Casque Paladium':'images/casque-paladium.svg','Plastron Paladium':'images/plastron-paladium.svg','Pomme dorée':'images/pomme-doree.svg','Pain':'images/pain.svg','Pioche en améthyste':'images/pickaxe-amethyste.svg','Pelle en améthyste':'images/shovel-amethyste.svg','Hache en améthyste':'images/axe-amethyste.svg','Pioche en titane':'images/pickaxe-titane.svg','Pelle en titane':'images/shovel-titane.svg','Hache en titane':'images/axe-titane.svg','Marteau en paladium':'images/hammer-paladium.svg','Pioche en paladium vert':'images/pickaxe-paladium-vert.svg','Hache en paladium vert':'images/axe-paladium-vert.svg','Pioche en endium':'images/pickaxe-endium.svg','Hache en endium':'images/axe-endium.svg','Palaforge':'images/palaforge.svg','Palafurnace':'images/palafurnace.svg','Crusher':'images/crusher.svg','Cobblebreaker':'images/cobblebreaker.svg','Aimant':'images/aimant.svg','Dollars Stone':'images/dollars-stone.svg','Entonnoir en Paladium':'images/hopper-paladium.svg','Small Ring en Paladium':'images/small-ring.svg'
};
const localImageFor=name=>LOCAL_IMAGES[name]||null;
