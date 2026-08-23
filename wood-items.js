(() => {
  'use strict';
  const woods = [
    ['Bois de Jacaranda',['Jacaranda','Bois Jacaranda'],'Blocs','Rare','images/wood-jacaranda.svg',320,220,480,null,null,null,'Bois moddé décoratif de couleur violette. Estimation communautaire.','Variété de bois · estimation'],
    ['Bois d’Acajou',['Acajou','Bois Acajou'],'Blocs','Rare','images/wood-acajou.svg',300,200,450,null,null,null,'Bois moddé décoratif aux tons rouges. Estimation communautaire.','Variété de bois · estimation'],
    ['Bois d’Ébène',['Ébène','Bois Ebène'],'Blocs','Épique','images/wood-ebene.svg',420,280,620,null,null,null,'Bois sombre moddé pour la construction et la décoration.','Variété de bois · estimation'],
    ['Bois de Palmier',['Palmier','Bois Palmier'],'Blocs','Peu commun','images/wood-palmier.svg',180,120,280,null,null,null,'Bois moddé aux tons chauds. Estimation communautaire.','Variété de bois · estimation'],
    ['Bois de Baobab',['Baobab','Bois Baobab'],'Blocs','Rare','images/wood-baobab.svg',260,170,390,null,null,null,'Bois moddé massif pour les constructions.','Variété de bois · estimation'],
    ['Bois de Sakura',['Sakura','Bois Sakura'],'Blocs','Rare','images/wood-sakura.svg',350,230,520,null,null,null,'Bois moddé décoratif inspiré du cerisier.','Variété de bois · estimation'],
    ['Bambou moddé',['Bambou','Bois Bambou'],'Blocs','Peu commun','images/wood-bambou.svg',140,90,220,null,null,null,'Bloc de bambou moddé pour les constructions et décors.','Variété de bois · estimation'],
    ['Bois d’Acacia',['Acacia','Bois Acacia'],'Blocs','Peu commun','images/wood-acacia.svg',160,100,250,null,null,null,'Bois décoratif supplémentaire pour varier les constructions.','Variété de bois · estimation']
  ];
  if (typeof ITEMS === 'undefined') return;
  let changed = false;
  const normLocal = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  for (const item of woods) {
    if (!ITEMS.some(x => normLocal(x[0]) === normLocal(item[0]))) { ITEMS.push(item); changed = true; }
  }
  if (changed) document.dispatchEvent(new Event('pricecheck:catalog-updated'));
})();
