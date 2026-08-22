(() => {
  'use strict';
  if (window.__PRICECHECK_CATALOG_FIX__) return;
  window.__PRICECHECK_CATALOG_FIX__ = true;
  const refresh = async () => {
    const q = document.querySelector('#q');
    const grid = document.querySelector('#items');
    if (!q || !grid) return;
    try {
      if (typeof addCatalogExpansion === 'function') addCatalogExpansion();
      if (typeof syncRemoteCatalog === 'function') await syncRemoteCatalog();
      q.dispatchEvent(new Event('input', {bubbles:true}));
      const cat = document.querySelector('#cat');
      if (cat) cat.dispatchEvent(new Event('change', {bubbles:true}));
    } catch (e) {
      console.warn('PriceCheck catalogue refresh', e);
    }
  };
  window.addEventListener('pageshow', () => setTimeout(refresh, 40));
  window.addEventListener('focus', () => setTimeout(refresh, 80));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(refresh, 60), {once:true});
  else setTimeout(refresh, 60);
})();