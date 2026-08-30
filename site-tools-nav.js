(()=>{'use strict';
  // Navigation cleanup + public Admin Shop entry.
  document.querySelectorAll('.pc-tools-nav').forEach(el=>el.remove());
  function addAdminShopLink(){
    const links=document.querySelector('.links');
    if(!links || links.querySelector('a[href="admin-shop.html"]')) return;
    const a=document.createElement('a');
    a.href='admin-shop.html';
    a.textContent='🛒 Admin Shop';
    a.setAttribute('aria-label','Ouvrir l’Admin Shop');
    links.appendChild(a);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addAdminShopLink);
  else addAdminShopLink();
})();
