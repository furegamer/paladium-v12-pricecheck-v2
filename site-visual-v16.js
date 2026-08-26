(() => {
  'use strict';
  if (document.getElementById('pc-visual-v16')) return;
  const style = document.createElement('style');
  style.id = 'pc-visual-v16';
  style.textContent = `
    :root{--pc-gold:#d7b66f;--pc-cream:#f4efdf;--pc-brown:#3a2b1c}
    body.pc-shop-bg{background-color:#0b0b0c;background-image:radial-gradient(circle at 15% 8%,rgba(215,182,111,.16),transparent 28%),radial-gradient(circle at 85% 18%,rgba(123,92,45,.16),transparent 30%),linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:auto,auto,32px 32px,32px 32px;background-attachment:fixed}
    .pc-shop-bg .panel,.pc-shop-bg .item-card,.pc-shop-bg .stat{box-shadow:0 12px 34px rgba(0,0,0,.22)}
    .pc-shop-banner{margin:0 0 22px;padding:24px;border:1px solid rgba(215,182,111,.45);border-radius:20px;background:linear-gradient(135deg,rgba(58,43,28,.95),rgba(18,16,14,.92)),repeating-linear-gradient(90deg,transparent 0 14px,rgba(215,182,111,.04) 14px 28px);color:#fff8e7;overflow:hidden;position:relative}
    .pc-shop-banner:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 0 35%,rgba(255,255,255,.08) 45%,transparent 55%);transform:translateX(-120%);animation:pcShopSweep 5s linear infinite;pointer-events:none}
    .pc-shop-banner h2{margin:0;font-size:clamp(24px,4vw,38px);letter-spacing:-1px}.pc-shop-banner p{margin:7px 0 0;color:#dccda9}.pc-shop-chip{display:inline-block;margin-bottom:9px;padding:6px 9px;border-radius:999px;background:rgba(215,182,111,.15);border:1px solid rgba(215,182,111,.35);font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em}
    @keyframes pcShopSweep{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
    @media(max-width:650px){.pc-shop-banner{padding:18px}}
  `;
  document.head.appendChild(style);
  document.body.classList.add('pc-shop-bg');
  const main=document.querySelector('main');
  if(main && !document.querySelector('.pc-shop-banner')){
    const banner=document.createElement('section');banner.className='pc-shop-banner';
    banner.innerHTML='<span class="pc-shop-chip">⛏ PriceCheck V12</span><h2>Le marché communautaire, en un coup d’œil.</h2><p>Prix, propositions des joueurs, budget, niveaux et outils de calcul réunis au même endroit.</p>';
    main.insertBefore(banner,main.firstElementChild);
  }
})();
