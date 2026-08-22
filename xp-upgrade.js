(() => {
  'use strict';
  if (!location.pathname.endsWith('/xp.html')) return;
  const JOB_KEY='pricecheck:job-levels', POG_KEY='pricecheck:pog-level';
  const loadJobs=()=>{try{return JSON.parse(localStorage.getItem(JOB_KEY)||'{}')}catch{return{}}};
  const saveJob=(job,level)=>{const x=loadJobs();x[job]=Math.max(1,Math.min(100,Number(level)||1));localStorage.setItem(JOB_KEY,JSON.stringify(x));window.PriceCheckPlayers?.upsert?.()};
  const ready=()=>{
    const hero=document.querySelector('.hero');
    if(hero&&!hero.querySelector('.pc-xp-update')){
      const box=document.createElement('div');box.className='pc-xp-update';
      box.innerHTML='<strong>⚡ XP & POG — actualisé</strong><span>22/08/2026 • données communautaires V12 revues pour PriceCheck</span><a href="budget.html">💰 Voir ce que tu peux acheter</a>';
      hero.appendChild(box);
      const style=document.createElement('style');style.textContent='.pc-xp-update{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:14px;padding:12px 14px;border:1px solid #334155;border-radius:14px;background:linear-gradient(135deg,#0d1421,#17112a);color:#cbd5e1;font-size:12px}.pc-xp-update strong{color:#ddd6fe}.pc-xp-update span{color:#94a3b8}.pc-xp-update a{margin-left:auto;padding:8px 10px;border-radius:9px;background:#7c3aed;color:#fff;text-decoration:none;font-weight:800}@media(max-width:640px){.pc-xp-update a{margin-left:0;width:100%;text-align:center}}';document.head.appendChild(style);
    }
    const job=document.querySelector('#jobSelect'), level=document.querySelector('#xpLevel'), rewardJob=document.querySelector('#rewardJob'), rewardLevel=document.querySelector('#rewardLevel'), pog=document.querySelector('#pogLevel'), levelNav=document.querySelector('#levelNav');
    // Suppression de la navigation 1→20 : le niveau choisi reste simplement enregistré dans le champ.
    if(levelNav) levelNav.remove();
    const jobs=loadJobs();
    if(job){const restore=()=>{const v=jobs[job.value];if(v){level.value=v}};restore();job.addEventListener('change',()=>{const x=loadJobs();if(x[job.value])level.value=x[job.value];saveJob(job.value,level.value)});level.addEventListener('input',()=>saveJob(job.value,level.value));}
    if(rewardJob&&rewardLevel){const restoreReward=()=>{const x=loadJobs();const v=x[rewardJob.value];if(v)rewardLevel.value=v};restoreReward();rewardJob.addEventListener('change',()=>{const x=loadJobs();if(x[rewardJob.value])rewardLevel.value=x[rewardJob.value];});rewardLevel.addEventListener('input',()=>{saveJob(rewardJob.value,rewardLevel.value);});}
    if(pog){const old=localStorage.getItem(POG_KEY);if(old) pog.value=old;pog.addEventListener('input',()=>{localStorage.setItem(POG_KEY,String(Math.max(1,Math.min(100,Number(pog.value)||1))));window.PriceCheckPlayers?.upsert?.()});}
    const renderEasy=()=>{
      const n=Math.max(1,Math.min(100,Number(pog?.value)||1));
      const blocks=typeof easiestPogBlocks==='function'?easiestPogBlocks(n):[];
      let box=document.querySelector('#pc-pog-easy');
      if(!box){box=document.createElement('div');box.id='pc-pog-easy';box.className='notice verified';document.querySelector('#pogEasy')?.appendChild(box)}
      const easy=blocks[0];box.innerHTML=easy?`⭐ <b>Bloc le plus facile à casser :</b> ${easy} <span style="opacity:.75">• dureté ${typeof POG_BLOCK_HARDNESS?.[easy]==='number'?POG_BLOCK_HARDNESS[easy]:'n.c.'}</span>`:'🔎 Aucun bloc OS documenté pour ce niveau.';
    };
    pog?.addEventListener('input',renderEasy);renderEasy();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
