(function() {
  const LOADER_ID = 'custom-page-loader-v1';

  function createLoaderElement(message) {
    // style (inséré une seule fois)
    if (!document.getElementById('cpl-styles')) {
      const style = document.createElement('style');
      style.id = 'cpl-styles';
      style.textContent = `
        #${LOADER_ID} {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.65);
          color: #fff;
          z-index: 999999;
          transition: opacity 320ms ease, visibility 320ms ease;
          opacity: 1;
          visibility: visible;
          -webkit-font-smoothing: antialiased;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        #${LOADER_ID}.cpl--hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        #${LOADER_ID} .cpl__box {
          text-align: center;
          padding: 18px 26px;
          border-radius: 10px;
          backdrop-filter: blur(4px);
          max-width: 90%;
        }
        #${LOADER_ID} .cpl__spinner {
          width: 48px;
          height: 48px;
          border: 6px solid rgba(255,255,255,0.18);
          border-top-color: #ffffff;
          border-radius: 50%;
          display: inline-block;
          margin-bottom: 12px;
          animation: cpl-spin 1s linear infinite;
        }
        @keyframes cpl-spin { to { transform: rotate(360deg); } }
        #${LOADER_ID} .cpl__message {
          font-size: 14px;
          line-height: 1.2;
        }
        @media (max-width:420px) {
          #${LOADER_ID} .cpl__box { padding: 14px 18px; }
          #${LOADER_ID} .cpl__spinner { width: 36px; height: 36px; border-width:5px; }
        }
      `;
      document.head.appendChild(style);
    }

    // overlay
    const overlay = document.createElement('div');
    overlay.id = LOADER_ID;
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.innerHTML = `
      <div class="cpl__box" aria-hidden="false">
        <div class="cpl__spinner" aria-hidden="true"></div>
        <div class="cpl__message">${message}</div>
      </div>
    `;
    return overlay;
  }

  // expose functions globally
  window.openPageLoader = function(message) {
    if (document.getElementById(LOADER_ID)) return;
    const el = createLoaderElement(message);
    document.body.appendChild(el);
  };

  window.closePageLoader = function() {
    const el = document.getElementById(LOADER_ID);
    if (!el) return;
    // animation: ajouter classe puis supprimer après transition
    el.classList.add('cpl--hidden');
    el.addEventListener('transitionend', function remove() {
      if (el.parentNode) el.parentNode.removeChild(el);
      el.removeEventListener('transitionend', remove);
    });
  };

  // créer et afficher automatiquement au chargement complet de la page
  window.addEventListener('load', function() {
    // ajoute l'écran de chargement dès que la page a été complètement chargée
    //openPageLoader("eee");
    // note: il restera jusqu'à ce que closePageLoader() soit appelé
  });
})();