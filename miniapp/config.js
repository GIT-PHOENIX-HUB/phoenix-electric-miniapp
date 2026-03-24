/**
 * Phoenix Electric Mini App — Configuration
 */
const CONFIG = {
  botUsername: 'PhoenixEchoBot',
  apiBaseUrl: (() => {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:3000';
    return 'https://echo.phoenixelectric.life';
  })(),
  company: {
    name: 'Phoenix Electric LLC',
    phone: '(720) 955-0284',
    license: 'Colorado #101501',
    serviceArea: 'Denver Metro & Northern Colorado'
  }
};
Object.freeze(CONFIG);
Object.freeze(CONFIG.company);
