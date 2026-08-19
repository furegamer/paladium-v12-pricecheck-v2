const ITEMS = [
['Pickaxe of the God',['Pog','POG'],'Outils','Unique','images/pog.png',150000,100000,220000,'∞','Évolutif',100,'Pioche évolutive haut de gamme.','Craft évolutif'],
['Paladium',['Pala'],'Minerais','Légendaire','images/paladium.png',1200,800,1700,null,null,8,'Minerai avancé de progression.','Minerai obtenu en jeu'],
['Titane',['Titanium'],'Minerais','Épique','images/titane.png',650,450,900,null,null,6,'Minerai de progression.','Minerai obtenu en jeu'],
['Améthyste',['Ame','Amé'],'Minerais','Rare','images/amethyste.png',300,200,450,null,null,1,'Minerai spécial de progression.','Minerai obtenu en jeu'],
['Rubis',['Ruby'],'Minerais','Rare','images/rubis.png',500,350,700,null,null,null,'Ressource précieuse du Palamod.','Selon la recette'],
['Saphir',['Saph'],'Minerais','Rare','images/saphir.png',450,300,650,null,null,null,'Ressource précieuse du Palamod.','Selon la recette'],
['Émeraude',['Emerald','Emer'],'Minerais','Peu commun','images/emeraude.png',280,180,400,null,null,null,'Ressource minérale verte.','Selon la recette'],
['Obsidienne',['Obsi'],'Ressources','Peu commun','images/obsidienne.png',100,60,160,null,null,null,'Ressource polyvalente.','Selon la recette'],
["Perle de l'End",['Perle','Ender Pearl'],'Ressources','Rare','images/perle-end.png',550,400,800,null,null,null,'Ressource de l’End.','Obtenue en jeu'],
['Machine industrielle',['Machine'],'Machines','Épique','images/machine.png',18000,12000,28000,null,null,null,'Machine de production.','Craft machine à confirmer'],
['Four amélioré',['Four'],'Machines','Rare','images/four.png',6500,4500,9000,null,null,null,'Four amélioré.','Craft machine à confirmer'],
['Pioche Paladium',['Pioche Pala'],'Outils','Légendaire','images/pioche-paladium.png',18000,13000,25000,4999,'+8',8,'Pioche Paladium : 4 999 de durabilité et +8 dégâts.','Craft via progression/Grinder'],
['Casque Paladium',['Casque Pala'],'Armures','Légendaire','images/casque-paladium.png',16000,11000,23000,4999,null,null,'Pièce d’armure Paladium.','Craft armure'],
['Plastron Paladium',['Plastron Pala'],'Armures','Légendaire','images/plastron-paladium.png',30000,22000,42000,4999,null,null,'Pièce d’armure Paladium.','Craft armure'],
['Pomme dorée',['Pomme','Golden Apple'],'Nourriture','Rare','images/pomme-doree.png',2500,1800,3500,null,null,null,'Nourriture spéciale.','Craft vanilla'],
['Pain',['Bread'],'Nourriture','Commun','images/pain.png',80,50,120,null,null,11,'Nourriture de base.','3 blés'],
['Pioche en améthyste',['Pioche Améthyste'],'Outils','Rare','images/default.png',900,600,1300,1999,'+5',null,'Outil en améthyste.','Table de craft'],
['Pelle en améthyste',['Pelle Améthyste'],'Outils','Rare','images/default.png',750,500,1100,1999,'+4',null,'Pelle en améthyste.','Table de craft'],
['Hache en améthyste',['Hache Améthyste'],'Outils','Rare','images/default.png',1000,700,1400,1999,'+6',null,'Hache en améthyste.','Table de craft'],
['Pioche en titane',['Pioche Titane'],'Outils','Épique','images/default.png',2200,1500,3200,2999,'+5.5',6,'Pioche en titane.','Table de craft'],
['Pelle en titane',['Pelle Titane'],'Outils','Épique','images/default.png',1900,1300,2800,2999,'+4.5',6,'Pelle en titane.','Table de craft'],
['Hache en titane',['Hache Titane'],'Outils','Épique','images/default.png',2500,1700,3600,2999,'+6.5',6,'Hache en titane.','Table de craft'],
['Marteau en paladium',['Hammer Paladium'],'Outils','Légendaire','images/default.png',12000,8000,17000,4999,null,null,'Marteau qui creuse une zone 3×3.','Grinder'],
['Pioche en paladium vert',['Pioche Pala Vert'],'Outils','Légendaire','images/default.png',19000,13000,27000,4999,'+8',null,'Pioche Paladium vert.','Craft avancé'],
['Hache en paladium vert',['Hache Pala Vert'],'Outils','Légendaire','images/default.png',21000,15000,30000,4999,'+9',null,'Hache Paladium vert.','Craft avancé'],
['Pioche en endium',['Pioche Endium'],'Outils','Unique','images/default.png',50000,35000,70000,4999,'+9.3',20,'Pioche Endium, niveau 20 Mineur.','Craft avancé'],
['Hache en endium',['Hache Endium'],'Outils','Unique','images/default.png',52000,36000,75000,4999,'+10.3',20,'Hache Endium très haut niveau.','Craft avancé'],
['Palaforge',['Forge Paladium'],'Machines','Légendaire','images/default.png',35000,24000,50000,null,null,14,'Machine de recyclage des outils et armures moddés.','1 findium + 4 palafurnaces + 4 blocs de briques'],
['Palafurnace',['Four Paladium'],'Machines','Épique','images/default.png',14000,9500,20000,null,null,null,'Four moddé pouvant être amélioré.','Craft machine'],
['Crusher',['Broyeur'],'Machines','Épique','images/default.png',12000,8000,18000,null,null,8,'Machine de traitement des fruits de minerais.','Craft machine'],
['Cobblebreaker',['Cobble Breaker'],'Machines','Épique','images/default.png',10000,7000,15000,null,null,null,'Machine de recyclage de cobble.','Craft machine'],
['Aimant',['Magnet'],'Ressources','Rare','images/default.png',3500,2300,5000,null,null,7,'Attire les objets au sol dans un rayon de 6 blocs.','2 lingots paladium + 5 blocs fer'],
['Dollars Stone',['Dollar Stone'],'Ressources','Épique','images/default.png',7000,4500,10000,null,null,8,'Vend automatiquement certains blocs au shop.','1 voidstone + 4 perles End + composants paladium/améthyste'],
['Entonnoir en Paladium',['Paladium Hopper'],'Machines','Légendaire','images/default.png',9000,6000,13000,null,null,9,'Transfère les objets par stack.','1 coffre titane + 5 lingots paladium'],
['Small Ring en Paladium',['Small Ring'],'Ressources','Épique','images/default.png',3000,2000,4500,400,null,null,'Ring pouvant rendre jusqu’à 400 de durabilité.','Palamachine']
];
const RARITY_ORDER={Commun:0,'Peu commun':1,Rare:2,'Épique':3,'Légendaire':4,Unique:5};
const RARITY_CLASS={Commun:'common','Peu commun':'uncommon',Rare:'rare',Épique:'epic',Légendaire:'legendary',Unique:'unique'};
const CATEGORIES=['Minerais','Ressources','Machines','Outils','Armures','Nourriture'];
function norm(v){return String(v??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[-_]/g,' ').replace(/\s+/g,' ').trim()}
function money(v){return Number(v||0).toLocaleString('fr-FR')+' $'}
function confidence(item){const width=(item[7]-item[6])/Math.max(item[5],1);return width<=.7?['Bonne','good']:width<=1.05?['Moyenne','medium']:['Faible','low']}
function getItem(name){const n=norm(name);return ITEMS.find(x=>norm(x[0])===n||x[1].some(a=>norm(a)===n))}

/* Charge le polish visuel après la feuille intégrée de V12.2. */
(function(){
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='ui-polish.css?v=12.3';
  document.head.appendChild(link);
})();
