(() => {
  const base = 'https://furegamer.github.io/paladium-v12-pricecheck-v2/';
  const ensureMeta = (name, content, property = false) => {
    const attr = property ? 'property' : 'name';
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  };
  const title = 'Paladium V12 PriceCheck — prix, crafts et catalogue';
  document.title = title;
  ensureMeta('description', 'Paladium V12 PriceCheck : catalogue communautaire des items Paladium, prix estimés, crafts, raretés, durabilité et historique des prix.');
  ensureMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  ensureMeta('og:title', title, true);
  ensureMeta('og:description', 'Prix, crafts, items et outils pour Paladium V12.', true);
  ensureMeta('og:type', 'website', true);
  ensureMeta('og:url', location.href.split('#')[0], true);
  ensureMeta('og:site_name', 'Paladium V12 PriceCheck', true);
  ensureMeta('twitter:card', 'summary');
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = location.href.split('#')[0];
  if (!document.head.querySelector('#pricecheck-schema')) {
    const script = document.createElement('script');
    script.id = 'pricecheck-schema'; script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context':'https://schema.org', '@type':'WebSite', name:'Paladium V12 PriceCheck', url:base,
      description:'Catalogue communautaire Paladium V12 avec prix estimés, crafts, items et historique.',
      potentialAction:{'@type':'SearchAction',target:base+'?q={search_term_string}', 'query-input':'required name=search_term_string'}
    });
    document.head.appendChild(script);
  }
})();
