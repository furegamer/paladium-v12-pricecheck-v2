(() => {
  'use strict';

  if (!document.body || document.getElementById('budgetPlanner')) return;

  const esc = value => String(value ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const money = value => `${Math.round(Number(value) || 0).toLocaleString('fr-FR')} P$`;

  const style = document.createElement('style');
  style.textContent = `
    .budget-wrap{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(0,1.2fr);gap:14px}
    .budget-panel{padding:20px;border:1px solid #273449;border-radius:17px;background:linear-gradient(180deg,#101827,#0c1320)}
    .budget-panel h3{margin:0 0 7px}
    .budget-input-row{display:grid;grid-template-columns:1fr auto;gap:9px;align-items:center}
    .budget-input-row input{font-size:20px;font-weight:800}
    .budget-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
    .budget-stat{padding:12px;border:1px solid #273449;border-radius:12px;background:#0b111d}
    .budget-stat b{display:block;font-size:18px}
    .budget-stat span{display:block;color:#94a3b8;font-size:11px;margin-top:3px}
    .budget-result{display:grid;gap:8px;margin-top:12px}
    .budget-item{display:grid;grid-template-columns:44px 1fr auto;gap:10px;align-items:center;padding:10px;border:1px solid #273449;border-radius:13px;background:#0b111d}
    .budget-item img{width:44px;height:44px;object-fit:contain}
    .budget-item strong{display:block;font-size:14px}
    .budget-item small{color:#94a3b8}
    .budget-item .buy{font-weight:900;color:#c4b5fd;text-align:right;white-space:nowrap}
    .budget-empty{padding:22px;text-align:center;border:1px dashed #334155;border-radius:13px;color:#94a3b8}
    .budget-note{margin-top:10px;color:#94a3b8;font-size:11px;line-height:1.5}
    @media(max-width:850px){.budget-wrap{grid-template-columns:1fr}.budget-summary{grid-template-columns:1fr 1fr 1fr}}
    @media(max-width:600px){.budget-input-row{grid-template-columns:1fr}.budget-summary{grid-template-columns:1fr}.budget-item{grid-template-columns:42px 1fr}.budget-item .buy{grid-column:2;text-align:left}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'budgetPlanner';
  section.className = 'section';
  section.innerHTML = `
    <div class="section-head">
      <div>
        <h2>💰 Mon budget</h2>
        <p class="muted">Entre ton argent et PriceCheck te propose ce que tu peux acheter avec ce budget.</p>
      </div>
    </div>
    <div class="budget-wrap">
      <div class="budget-panel">
        <h3>🪙 Ton portefeuille</h3>
        <p class="muted small">Exemple : 25 000 P$</p>
        <div class="budget-input-row">
          <input id="budgetAmount" type="number" min="0" step="1" value="25000" inputmode="numeric" placeholder="Montant en P$" aria-label="Budget en P$">
          <button id="budgetReset" class="btn" type="button">Réinitialiser</button>
        </div>
        <div class="budget-summary">
          <div class="budget-stat"><b id="budgetCount">0</b><span>items abordables</span></div>
          <div class="budget-stat"><b id="budgetBest">—</b><span>meilleur achat</span></div>
          <div class="budget-stat"><b id="budgetLeft">0 P$</b><span>reste après 1 achat</span></div>
        </div>
        <p class="budget-note">Les calculs utilisent le prix affiché par PriceCheck. Ce sont des estimations communautaires, pas une garantie de prix du Market.</p>
      </div>
      <div class="budget-panel">
        <h3>🎯 Ce que tu peux acheter</h3>
        <div id="budgetResults" class="budget-result"></div>
      </div>
    </div>
  `;

  const infos = document.getElementById('infos');
  if (infos?.parentNode) infos.parentNode.insertBefore(section, infos);
  else document.querySelector('main')?.appendChild(section);

  const amount = document.getElementById('budgetAmount');
  const results = document.getElementById('budgetResults');
  const count = document.getElementById('budgetCount');
  const best = document.getElementById('budgetBest');
  const left = document.getElementById('budgetLeft');

  function imageFor(item){
    if (typeof localImageFor === 'function') return localImageFor(item[0]) || item[4] || 'images/default.svg';
    return item[4] || 'images/default.svg';
  }

  function render(){
    const budget = Math.max(0, Math.floor(Number(amount.value) || 0));
    const source = (typeof ITEMS === 'undefined' ? [] : ITEMS)
      .filter(x => x && x[2] !== 'Mobs' && Number(x[5]) > 0 && Number(x[5]) <= budget)
      .sort((a,b) => Number(a[5]) - Number(b[5]));

    count.textContent = source.length.toLocaleString('fr-FR');
    best.textContent = source.length ? esc(source[source.length - 1][0]) : '—';
    left.textContent = source.length ? money(budget - Number(source[0][5])) : money(budget);

    if (!source.length){
      results.innerHTML = `<div class="budget-empty">😕 Aucun item avec un prix affiché ne rentre dans ce budget.<br><span>Essaie d'augmenter le montant ou de consulter les estimations.</span></div>`;
      return;
    }

    // Mélange de petits achats, achats moyens et achat maximum pour donner des choix utiles.
    const picks = [];
    const add = item => { if (item && !picks.some(x => x[0] === item[0])) picks.push(item); };
    source.slice(0,3).forEach(add);
    source.slice(Math.max(0, Math.floor(source.length * .35)), Math.floor(source.length * .35) + 3).forEach(add);
    source.slice(-4).reverse().forEach(add);

    results.innerHTML = picks.slice(0,10).map(x => {
      const price = Number(x[5]);
      const qty = Math.max(1, Math.floor(budget / price));
      const spend = qty * price;
      const remaining = budget - spend;
      return `<div class="budget-item">
        <img src="${esc(imageFor(x))}" alt="${esc(x[0])}" loading="lazy" onerror="this.onerror=null;this.src='images/default.svg'">
        <div><strong>${esc(x[0])}</strong><small>${money(price)} l'unité • ${esc(x[2] || 'Item')}</small></div>
        <div class="buy">×${qty}<br><small>${money(remaining)} restant</small></div>
      </div>`;
    }).join('');
  }

  amount.addEventListener('input', render);
  document.getElementById('budgetReset').addEventListener('click', () => { amount.value = 25000; render(); });
  render();
})();
