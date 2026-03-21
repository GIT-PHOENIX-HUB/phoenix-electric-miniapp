/* =============================================
   PHOENIX ELECTRIC -- DESIGN SYSTEM
   SVG icons, theme tokens, dark/light mode
   ============================================= */

const DesignSystem = (function () {
  'use strict';

  // ---- Theme tokens injected as CSS custom properties ----
  const TOKENS = {
    // Colors
    '--px-color-primary': '#FF1A1A',
    '--px-color-primary-dark': '#C81414',
    '--px-color-gold': '#D4AF37',
    '--px-color-gold-dark': '#B8960B',
    '--px-color-bg': '#0a0a0a',
    '--px-color-surface': '#1a1a1a',
    '--px-color-surface-hover': '#2a2a2a',
    '--px-color-surface-elevated': '#2d2d2d',
    '--px-color-text': '#ffffff',
    '--px-color-text-muted': '#999999',
    '--px-color-text-inverse': '#0a0a0a',
    '--px-color-success': '#00C9A7',
    '--px-color-warning': '#F59E0B',
    '--px-color-danger': '#EF4444',
    '--px-color-info': '#3B82F6',
    '--px-color-border': 'rgba(255,255,255,0.1)',
    '--px-color-border-light': 'rgba(255,255,255,0.05)',
    // Spacing
    '--px-space-xs': '4px',
    '--px-space-sm': '8px',
    '--px-space-md': '16px',
    '--px-space-lg': '24px',
    '--px-space-xl': '32px',
    '--px-space-xxl': '48px',
    // Typography
    '--px-font-primary': '"Inter", system-ui, -apple-system, sans-serif',
    '--px-font-display': '"Cinzel", Georgia, serif',
    '--px-font-size-xs': '11px',
    '--px-font-size-sm': '12px',
    '--px-font-size-md': '14px',
    '--px-font-size-lg': '16px',
    '--px-font-size-xl': '18px',
    '--px-font-size-xxl': '24px',
    '--px-font-size-hero': '26px',
    // Border radius
    '--px-radius-sm': '6px',
    '--px-radius-md': '8px',
    '--px-radius-lg': '12px',
    '--px-radius-xl': '16px',
    '--px-radius-full': '9999px',
    // Shadows
    '--px-shadow-sm': '0 2px 8px rgba(0,0,0,0.2)',
    '--px-shadow-md': '0 4px 16px rgba(0,0,0,0.3)',
    '--px-shadow-lg': '0 8px 32px rgba(0,0,0,0.4)',
    '--px-shadow-glow-red': '0 4px 20px rgba(255,26,26,0.25)',
    '--px-shadow-glow-gold': '0 4px 20px rgba(212,175,55,0.25)',
  };

  const LIGHT_OVERRIDES = {
    '--px-color-bg': '#f5f5f5',
    '--px-color-surface': '#ffffff',
    '--px-color-surface-hover': '#eeeeee',
    '--px-color-surface-elevated': '#f8f8f8',
    '--px-color-text': '#1a1a1a',
    '--px-color-text-muted': '#666666',
    '--px-color-text-inverse': '#ffffff',
    '--px-color-border': 'rgba(0,0,0,0.1)',
    '--px-color-border-light': 'rgba(0,0,0,0.05)',
    '--px-shadow-sm': '0 2px 8px rgba(0,0,0,0.08)',
    '--px-shadow-md': '0 4px 16px rgba(0,0,0,0.1)',
    '--px-shadow-lg': '0 8px 32px rgba(0,0,0,0.15)',
  };

  // ---- SVG Icon Library (no emoji!) ----
  const ICONS = {
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
    'code-book': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    calculator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    emergency: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    services: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    products: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>',
    'bookmark-filled': '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    generator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><path d="M14 10h4v4h-4z"/><line x1="2" y1="18" x2="6" y2="22"/><line x1="22" y1="18" x2="18" y2="22"/></svg>',
    evCharger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="16" rx="2"/><polygon points="10 7 14 12 10 12 14 17" fill="none"/><line x1="10" y1="18" x2="10" y2="22"/><line x1="14" y1="18" x2="14" y2="22"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>',
    panel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="7" y1="8" x2="10" y2="8"/><line x1="14" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="10" y2="16"/><line x1="14" y1="16" x2="17" y2="16"/></svg>',
    outlet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="9" x2="9" y2="12"/><line x1="15" y1="9" x2="15" y2="12"/><path d="M9 15h6"/></svg>',
    wire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h4"/><path d="M16 12h4"/><path d="M8 8c0 0 2 4 4 4s4-4 4-4"/><path d="M8 16c0 0 2-4 4-4s4 4 4 4"/></svg>',
    conduit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v20"/><path d="M18 2v20"/><path d="M6 6h12"/><path d="M6 18h12"/><path d="M6 12h12"/></svg>',
    safety: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    notification: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
  };

  /**
   * Create an SVG icon string.
   * @param {string} name - Icon name from the ICONS registry
   * @param {number} [size=20] - Width/height in px
   * @returns {string} HTML string
   */
  function createIcon(name, size) {
    size = size || 20;
    const svg = ICONS[name];
    if (!svg) {
      if (CONFIG && CONFIG.DEBUG) {
        console.warn('[DesignSystem] Unknown icon: ' + name);
      }
      return '<span class="px-icon-missing"></span>';
    }
    return '<span class="px-icon" style="width:' + size + 'px;height:' + size + 'px;display:inline-flex;align-items:center;justify-content:center;" aria-hidden="true">' +
      svg.replace('<svg ', '<svg width="' + size + '" height="' + size + '" ') +
      '</span>';
  }

  /** Inject design tokens as CSS custom properties on :root */
  function injectTokens(isDark) {
    var root = document.documentElement;
    var tokens = isDark !== false ? TOKENS : Object.assign({}, TOKENS, LIGHT_OVERRIDES);
    Object.keys(tokens).forEach(function (key) {
      root.style.setProperty(key, tokens[key]);
    });
  }

  /** Sync theme with Telegram themeParams */
  function syncTelegramTheme() {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (!tg) {
      injectTokens(true);
      return;
    }
    var isDark = tg.colorScheme !== 'light';
    injectTokens(isDark);

    // Override with Telegram theme params if available
    var tp = tg.themeParams;
    if (tp) {
      if (tp.bg_color) document.documentElement.style.setProperty('--px-color-bg', tp.bg_color);
      if (tp.secondary_bg_color) document.documentElement.style.setProperty('--px-color-surface', tp.secondary_bg_color);
      if (tp.text_color) document.documentElement.style.setProperty('--px-color-text', tp.text_color);
      if (tp.hint_color) document.documentElement.style.setProperty('--px-color-text-muted', tp.hint_color);
      if (tp.button_color) document.documentElement.style.setProperty('--px-color-primary', tp.button_color);
      if (tp.link_color) document.documentElement.style.setProperty('--px-color-info', tp.link_color);
    }
  }

  function cleanup() {
    // Nothing stateful to clean up in design system
  }

  return {
    createIcon: createIcon,
    injectTokens: injectTokens,
    syncTelegramTheme: syncTelegramTheme,
    TOKENS: TOKENS,
    ICONS: ICONS,
    cleanup: cleanup,
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DesignSystem;
}
