(() => {
  if (document.querySelector('.pc-tools-nav')) return;
  const nav=document.createElement('nav');
  nav.className='pc-tools-nav';
  nav.innerHTML='<a href="index.html">🏠 Accueil</a><a href="settings.html">⚙️ Réglages</a><a href="wiki.html">📚 Wiki</a><a href="commands.html">⌨️ Commandes</a>';
  const style=document.createElement('style');
  style.textContent='.pc-tools-nav{position:fixed;right:14px;bottom:14px;z-index:9999;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;max-width:calc(100% - 28px);padding:7px;border:1px solid #334155;border-radius:14px;background:#080b12e8;backdrop-filter:blur(14px);box-shadow:0 12px 35px #0006}.pc-tools-nav a{padding:8px 10px;border-radius:9px;background:#111827;border:1px solid #273449;color:#e2e8f0;text-decoration:none;font:700 12px system-ui}.pc-tools-nav a:hover{border-color:#8b5cf6;background:#182033}@media(max-width:600px){.pc-tools-nav{left:8px;right:8px;bottom:8px;justify-content:center}.pc-tools-nav a{font-size:11px;padding:7px 8px}}';
  document.head.appendChild(style);document.body.appendChild(nav);
})();
