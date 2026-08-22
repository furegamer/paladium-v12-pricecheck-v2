(() => {
  'use strict';
  const JOB_KEY='pricecheck:job-levels', POG_KEY='pricecheck:pog-level';
  const load=()=>{try{return JSON.parse(localStorage.getItem(JOB_KEY)||'{}')}catch{return{}}};
  const save=(job,value)=>{const x=load();x[job]=Math.max(1,Math.min(100,Math.round(Number(value)||1)));localStorage.setItem(JOB_KEY,JSON.stringify(x));window.PriceCheckPlayers?.upsert?.()};
  const run=()=>{
    const job=document.querySelector('#jobSelect'),level=document.querySelector('#xpLevel'),rewardJob=document.querySelector('#rewardJob'),rewardLevel=document.querySelector('#rewardLevel'),pog=document.querySelector('#pogLevel');
    if(job&&level){const restore=()=>{const x=load();level.value=x[job.value]||1};restore();job.addEventListener('change',restore);level.addEventListener('input',()=>save(job.value,level.value));}
    if(rewardJob&&rewardLevel){const restore=()=>{const x=load();rewardLevel.value=x[rewardJob.value]||1};restore();rewardJob.addEventListener('change',restore);rewardLevel.addEventListener('input',()=>save(rewardJob.value,rewardLevel.value));}
    if(pog){pog.value=localStorage.getItem(POG_KEY)||1;pog.addEventListener('input',()=>{pog.value=Math.max(1,Math.min(100,Math.round(Number(pog.value)||1)));localStorage.setItem(POG_KEY,pog.value);window.PriceCheckPlayers?.upsert?.()});}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
