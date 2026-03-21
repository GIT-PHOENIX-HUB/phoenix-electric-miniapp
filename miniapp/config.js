/* =============================================
   PHOENIX ELECTRIC -- CONFIGURATION
   Environment-aware config for miniapp
   ============================================= */

const CONFIG = {
  ECHO_API_URL: 'http://localhost:18790/api',
  ECHO_WS_URL: 'ws://localhost:18790/ws',
  GATEWAY_TOKEN: '',
  TELEGRAM_BOT_USERNAME: 'PhoenixElectricBot',
  ENABLE_PUSH: true,
  ENABLE_GPS: true,
  DEBUG: false,
  MINIAPP_URL: 'https://echo.phoenixelectric.life/miniapp',
  PHONE_NUMBER: '(720) 955-0284',
  PHONE_TEL: '+17209550284',
  LICENSE_NUMBER: '101501',
  COMPANY_NAME: 'Phoenix Electric LLC',
  SERVICE_AREA: 'Denver Metro & Northern Colorado',
  WS_HEARTBEAT_INTERVAL: 25000,
  WS_RECONNECT_BASE: 1000,
  WS_RECONNECT_MAX: 30000,
  RATE_LIMIT_WINDOW: 60000,
  RATE_LIMIT_MAX: 30,
};

// Override from environment / query params if running in dev
(function applyOverrides() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') CONFIG.DEBUG = true;
    const apiUrl = params.get('api_url');
    if (apiUrl) CONFIG.ECHO_API_URL = apiUrl;
    const wsUrl = params.get('ws_url');
    if (wsUrl) CONFIG.ECHO_WS_URL = wsUrl;

    // Auto-detect production
    const host = window.location.hostname;
    if (host === 'echo.phoenixelectric.life') {
      CONFIG.ECHO_API_URL = 'https://echo.phoenixelectric.life/api';
      CONFIG.ECHO_WS_URL = 'wss://echo.phoenixelectric.life/ws';
    }
  }
})();

// Node.js environment support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
