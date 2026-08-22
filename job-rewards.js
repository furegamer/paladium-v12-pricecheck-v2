/* Récompenses des métiers — données documentées depuis le wiki Paladium Java.
   Les niveaux 21→100 ne sont pas inventés : le wiki consulté documente ici les récompenses 2→20. */
const JOB_REWARDS = {
  Mineur: {
    1:{rewards:['Départ du métier'],crafts:['Pioche en améthyste / Pelle en améthyste']},
    2:{rewards:['10 Paladium','10 Trixium','1 000 $'],crafts:['Voidstone']},
    3:{rewards:['15 Paladium','15 Trixium','1 500 $','2 Findium'],crafts:['Excavatrice en Améthyste']},
    4:{rewards:['20 Paladium','20 Trixium','2 000 $'],crafts:['Outil de construction en améthyste']},
    5:{rewards:['25 Paladium','25 Trixium','2 500 $','16 lingots d’améthyste'],crafts:['CobbleBreaker']},
    6:{rewards:['30 Paladium','30 Trixium','3 000 $','Pioche en Paladium enchantée'],crafts:['Voidstone Minage']},
    7:{rewards:['35 Paladium','35 Trixium','3 500 $'],crafts:['Aimant']},
    8:{rewards:['40 Paladium','40 Trixium','4 000 $'],crafts:['Dollars Stone']},
    9:{rewards:['45 Paladium','45 Trixium','4 500 $','Speed Modifier'],crafts:['Entonnoir en Paladium']},
    10:{rewards:['50 Paladium','50 Trixium','5 000 $'],crafts:['Amélioration améthyste du CobbleBreaker']},
    11:{rewards:['55 Paladium','55 Trixium','5 500 $','Armure enchantée'],crafts:['Excavatrice en Titane']},
    12:{rewards:['60 Paladium','60 Trixium','6 000 $'],crafts:['Bouteille d’XP','Outil de construction en Titane','Experience Bottler']},
    13:{rewards:['65 Paladium','65 Trixium','6 500 $','Obsidienne'],crafts:['Amélioration titane du CobbleBreaker']},
    14:{rewards:['70 Paladium','70 Trixium','7 000 $'],crafts:['Palaforge']},
    15:{rewards:['75 Paladium','75 Trixium','7 500 $'],crafts:['Excavatrice en Paladium']},
    16:{rewards:['80 Paladium','80 Trixium','8 000 $','Wither Skull'],crafts:['Amélioration paladium du CobbleBreaker']},
    17:{rewards:['85 Paladium','85 Trixium','8 500 $'],crafts:['Outil de construction en Paladium','Amélioration de vitesse du contrôleur de spawner']},
    18:{rewards:['90 Paladium','90 Trixium','9 000 $'],crafts:['Cave Block en Endium','Withered Reinforced Pistons']},
    19:{rewards:['95 Paladium','95 Trixium','9 500 $','Bonbon','Wither Receptacle'],crafts:['Le Trône du Mineur']},
    20:{rewards:['105 Paladium','105 Trixium','10 500 $','Pépite d’Endium'],crafts:['Outil de construction en Endium','Pioche en Endium','Minerai d’Endium']}
  },
  Fermier: {
    1:{rewards:['Départ du métier'],crafts:[]},
    2:{rewards:['10 Paladium','10 Trixium','1 000 $'],crafts:['Grande houe en améthyste']},
    3:{rewards:['15 Paladium','15 Trixium','1 500 $','2 Findium'],crafts:['Seedplanter en améthyste']},
    4:{rewards:['20 Paladium','20 Trixium','2 000 $'],crafts:['Grass Breaker']},
    5:{rewards:['25 Paladium','25 Trixium','2 500 $','16 Amethyst'],crafts:['Grande houe en titane']},
    6:{rewards:['30 Paladium','30 Trixium','3 000 $','2 Furnace Upgrade'],crafts:['Seedplanter en titane']},
    7:{rewards:['35 Paladium','35 Trixium','3 500 $','Titane Hoe','64 Eggplant Seed'],crafts:['Eggplant']},
    8:{rewards:['40 Paladium','40 Trixium','4 000 $'],crafts:['Crusher']},
    9:{rewards:['45 Paladium','45 Trixium','4 500 $','Compressed Amethyst'],crafts:['Graine d’herbe colorée']},
    10:{rewards:['50 Paladium','50 Trixium','5 000 $'],crafts:['Graine de racinier']},
    11:{rewards:['55 Paladium','55 Trixium','5 500 $','Full Travel','Slimy Helmet'],crafts:['Herbe colorée']},
    12:{rewards:['60 Paladium','60 Trixium','6 000 $'],crafts:['Chervil']},
    13:{rewards:['65 Paladium','65 Trixium','6 500 $','64 Chervil Seed'],crafts:['Grande houe en Paladium']},
    14:{rewards:['70 Paladium','70 Trixium','7 000 $'],crafts:['Totem de Fertilité']},
    15:{rewards:['75 Paladium','75 Trixium','7 500 $'],crafts:['Seedplanter en Paladium']},
    16:{rewards:['80 Paladium','80 Trixium','8 000 $','Paladium Chest'],crafts:['Kiwano']},
    17:{rewards:['85 Paladium','85 Trixium','8 500 $','64 Kiwano Seed'],crafts:['Grande houe en Paladium vert']},
    18:{rewards:['90 Paladium','90 Trixium','9 000 $'],crafts:['Seedplanter en Paladium vert']},
    19:{rewards:['95 Paladium','95 Trixium','9 500 $','Bonbon','5 Green Paladium'],crafts:['Le Trône du Fermier']},
    20:{rewards:['105 Paladium','105 Trixium','10 500 $','Pépite d’Endium'],crafts:['Grande houe en Endium','Hache en Endium','Seedplanter en Endium','Orangeblue','Endium Chestplate']}
  },
  Chasseur: {
    1:{rewards:['Départ du métier'],crafts:[]},
    2:{rewards:['10 Paladium','10 Trixium','1 000 $'],crafts:['Bateau en bambou']},
    3:{rewards:['15 Paladium','15 Trixium','1 500 $','5 Titanium Ingot'],crafts:['Cage à familier']},
    4:{rewards:['20 Paladium','20 Trixium','2 000 $'],crafts:['Canne à pêche en Paladium']},
    5:{rewards:['25 Paladium','25 Trixium','2 500 $','5 Diamond String'],crafts:['Marteau des cavernes']},
    6:{rewards:['30 Paladium','30 Trixium','3 000 $','1 épée Paladium enchantée'],crafts:['Spawner cassé']},
    7:{rewards:['35 Paladium','35 Trixium','3 500 $'],crafts:['Mini Golem']},
    8:{rewards:['40 Paladium','40 Trixium','4 000 $','16 Amethyst'],crafts:['Obsidienne infusée (diamant)']},
    9:{rewards:['45 Paladium','45 Trixium','4 500 $'],crafts:['Infernal Knocker']},
    10:{rewards:['50 Paladium','50 Trixium','5 000 $','2 Empty Bow Modifier'],crafts:['Chercheur de spawner']},
    11:{rewards:['55 Paladium','55 Trixium','5 500 $'],crafts:['XP Stealer']},
    12:{rewards:['60 Paladium','60 Trixium','6 000 $','16 Blaze Rod'],crafts:['Obsidienne infusée (améthyste)']},
    13:{rewards:['65 Paladium','65 Trixium','6 500 $'],crafts:['Épée de capture']},
    14:{rewards:['70 Paladium','70 Trixium','7 000 $'],crafts:['Pierre de capture']},
    15:{rewards:['75 Paladium','75 Trixium','7 500 $'],crafts:['Amélioration de butin']},
    16:{rewards:['80 Paladium','80 Trixium','8 000 $','1 Elephant Tusk'],crafts:['Obsidienne infusée (titane)']},
    17:{rewards:['85 Paladium','85 Trixium','8 500 $'],crafts:['Clé en Paladium']},
    18:{rewards:['90 Paladium','90 Trixium','9 000 $'],crafts:['Étiquette en Endium']},
    19:{rewards:['95 Paladium','95 Trixium','9 500 $','Bonbon','Skeleton Skull'],crafts:['Le Trône du Chasseur','Overwhelmed']},
    20:{rewards:['105 Paladium','105 Trixium','10 500 $','Pépite d’Endium'],crafts:['Casque et épée en Endium','Obsidienne infusée (Paladium)','Poudre de Wither']}
  },
  Alchimiste: {
    1:{rewards:['Départ du métier'],crafts:[]},
    2:{rewards:['10 Paladium','10 Trixium','1 000 $'],crafts:['Tank en or']},
    3:{rewards:['15 Paladium','15 Trixium','1 500 $','5 bâtons de Blaze'],crafts:['Alchemy Creator']},
    4:{rewards:['20 Paladium','20 Trixium','2 000 $','64 Jacaranda'],crafts:['Bloc de chaudron','Cœur de chaudron']},
    5:{rewards:['25 Paladium','25 Trixium','2 500 $','5 Lightning Potion'],crafts:['Bois de Jacaranda brillant']},
    6:{rewards:['30 Paladium','30 Trixium','3 000 $','64 Judeecercis'],crafts:['Bloc du portail en améthyste','Clé de portail en améthyste']},
    7:{rewards:['35 Paladium','35 Trixium','3 500 $'],crafts:['Tank en améthyste']},
    8:{rewards:['40 Paladium','40 Trixium','4 000 $','64 minerai de quartz'],crafts:['Bois de Judeecercis brillant','Totem fleuri']},
    9:{rewards:['45 Paladium','45 Trixium','4 500 $'],crafts:['Bloc de portail en titane','Clé de portail en titane']},
    10:{rewards:['50 Paladium','50 Trixium','5 000 $','64 feuilles d’érable','16 Lightning Potion'],crafts:['Tank en titane']},
    11:{rewards:['55 Paladium','55 Trixium','5 500 $'],crafts:['Bois d’érable brillant']},
    12:{rewards:['60 Paladium','60 Trixium','6 000 $','10 quartz compressé'],crafts:['Bloc de portail en Paladium','Clé de portail en Paladium']},
    13:{rewards:['65 Paladium','65 Trixium','6 500 $'],crafts:[]},
    14:{rewards:['70 Paladium','70 Trixium','7 000 $'],crafts:[]},
    15:{rewards:['75 Paladium','75 Trixium','7 500 $','2 Extrapolated Bucket'],crafts:['Amélioration de slime du spawner controller']},
    16:{rewards:['80 Paladium','80 Trixium','8 000 $'],crafts:['Tank en Paladium']},
    17:{rewards:['85 Paladium','85 Trixium','8 500 $'],crafts:[]},
    18:{rewards:['90 Paladium','90 Trixium','9 000 $'],crafts:['Débloqueur d’améliorations']},
    19:{rewards:['95 Paladium','95 Trixium','9 500 $','Bonbon','Tête de Wither Skeleton'],crafts:['Trône de l’Alchimiste']},
    20:{rewards:['105 Paladium','105 Trixium','10 500 $','Pépite d’Endium'],crafts:['Bloc et clé du portail en Endium','Bloc d’angle du portail en Endium','Cœur en Endium','Pollen en Endium','Jambières en Endium','Bottes en Endium']}
  }
};

/* Blocs OS par palier POG + dureté vanilla approximative pour recommander le plus facile.
   Quand plusieurs blocs sont OS, le site les classe par dureté. */
const POG_BLOCK_HARDNESS = {
  'Neige':0.1,'Feuilles':0.2,'Cactus':0.4,'Roche du Nether':0.4,'Terre':0.5,'Sable':0.5,
  'Sable des âmes':0.5,'Sable rouge':0.5,'Gravier':0.6,'Glace':0.5,'Laine':0.8,'Grès':0.8,
  'Terres cuites':1.25,'Roche':1.5
};
function jobRewards(job, level){return JOB_REWARDS[job]?.[Math.max(1,Math.min(20,Number(level)||1))]||null;}
function easiestPogBlocks(level){
  const tier=typeof pogTier==='function'?pogTier(level):null;
  if(!tier) return [];
  return tier.blocks.slice().sort((a,b)=>(POG_BLOCK_HARDNESS[a]??99)-(POG_BLOCK_HARDNESS[b]??99));
}
