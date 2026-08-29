(() => {
  'use strict';
  // The old floating tools bar duplicated navigation and kept an unwanted Accueil button.
  // Navigation is now handled by the main header/profile instead.
  document.querySelectorAll('.pc-tools-nav').forEach(el => el.remove());
})();
