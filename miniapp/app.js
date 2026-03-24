/* =============================================
   PHOENIX ELECTRIC — TELEGRAM MINI APP ENGINE
   app.js — The Brain
   ============================================= */

// ── Initialize Telegram WebApp ──
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Apply Telegram theme
if (tg.colorScheme === 'light') {
  document.body.classList.add('tg-theme-light');
}

// Safe area padding (for full-screen/notch devices)
if (tg.safeAreaInset) {
  document.body.style.paddingTop = tg.safeAreaInset.top + 'px';
}

// ── Generac Product Database (from your pricebook) ──
const GENERATORS = [
  { code: 'GEN_7KW',  model: '7kW Guardian',  kw: 7,  list: 5988.19, labor: 16 },
  { code: 'GEN_10KW', model: '10kW Guardian', kw: 10, list: 6688.19, labor: 16 },
  { code: 'GEN_14KW', model: '14kW Guardian', kw: 14, list: 8399.22, labor: 18 },
  { code: 'GEN_16KW', model: '16kW Guardian', kw: 16, list: 9099.22, labor: 18 },
  { code: 'GEN_20KW', model: '20kW Guardian', kw: 20, list: 10460.24, labor: 20 },
  { code: 'GEN_22KW', model: '22kW Guardian', kw: 22, list: 11510.24, labor: 20 },
  { code: 'GEN_24KW', model: '24kW Guardian', kw: 24, list: 12696.26, labor: 22 }
];

const INSTALL_PACKAGE = [
  { code: 'GEN_XFER_200', name: '200A Transfer Switch', list: 1800.37 },
  { code: 'GEN_PAD',      name: 'Composite Generator Pad', list: 684.82 },
  { code: 'GEN_ELEC_HOOK', name: 'Electrical Hookup Package', list: 1171.30 },
  { code: 'GEN_GAS_LINE', name: 'Gas Line Coordination', list: 700.00 },
  { code: 'GEN_PERMIT',   name: 'Generator Permit', list: 490.00 },
  { code: 'GEN_STARTUP',  name: 'Startup & Commissioning', list: 272.05 }
];

const MAINT_SERVICES = {
  annual:   { name: 'Annual Maintenance Service', price: '$253.62', code: 'GEN_MAINT' },
  battery:  { name: 'Battery Replacement', price: '$167.29', code: 'GEN_BATT' },
  wifi:     { name: 'WiFi Module Installation', price: '$303.21', code: 'GEN_WIFI' },
  'load-shed': { name: 'Load Shedding Module', price: '$684.82', code: 'GEN_LOAD_SHED' },
  warranty: { name: 'Extended Warranty Processing', price: '$105.00', code: 'GEN_WARRANTY_EXT' },
  repair:   { name: 'Repair / Troubleshooting', price: 'Quote required', code: 'GEN_REPAIR' }
};

// ── State ──
let state = {
  category: null,
  urgency: null,
  property: null,
  sqft: null,
  coverage: 'managed',
  selectedMaint: null,
  location: null
};

// ── Context Routing ──
// Check startapp parameter for multi-context routing
const startParam = tg.initDataUnsafe?.start_param || '';
const chatType = tg.initDataUnsafe?.chat_type || 'private';
const userName = tg.initDataUnsafe?.user?.first_name || '';

// Route to specific screen based on context
if (startParam === 'generator' || startParam === 'generac') {
  window.addEventListener('load', () => navigateTo('generator-sizing'));
} else if (startParam === 'maintenance' || startParam === 'maint') {
  window.addEventListener('load', () => navigateTo('maintenance'));
} else if (startParam === 'service') {
  window.addEventListener('load', () => navigateTo('service-request'));
}

// ── Navigation ──
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);

    // Telegram back button handling
    if (screenId === 'home') {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigateTo('home'));
    }

    // Haptic feedback
    if (tg.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light');
    }
  }
}

// ── Service Request Form ──
function selectCategory(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.category = btn.dataset.cat;
  if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function selectUrgency(btn) {
  btn.parentElement.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.urgency = btn.dataset.urgency;
  if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function selectProperty(btn) {
  btn.parentElement.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.property = btn.dataset.prop;
  if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function shareLocation() {
  if (tg.LocationManager) {
    tg.LocationManager.init(() => {
      if (tg.LocationManager.isLocationAvailable) {
        tg.LocationManager.getLocation((loc) => {
          if (loc) {
            state.location = { lat: loc.latitude, lng: loc.longitude };
            document.querySelector('.location-btn').textContent = '✓ Location Shared';
            document.querySelector('.location-btn').style.borderColor = 'var(--success)';
            document.querySelector('.location-btn').style.color = 'var(--success)';
            if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
          }
        });
      } else {
        tg.showAlert('Location access is not available. Please enter your address manually.');
      }
    });
  } else {
    tg.showAlert('Location sharing requires opening this app on a mobile device.');
  }
}

function submitServiceRequest() {
  const name = document.getElementById('service-name').value.trim();
  const phone = document.getElementById('service-phone').value.trim();
  const address = document.getElementById('service-address').value.trim();
  const notes = document.getElementById('service-notes').value.trim();

  if (!state.category) {
    tg.showAlert('Please select a service category.');
    return;
  }
  if (!name || !phone) {
    tg.showAlert('Please enter your name and phone number.');
    return;
  }

  const data = {
    type: 'service_request',
    category: state.category,
    urgency: state.urgency || 'flexible',
    property: state.property || 'residential',
    name: name,
    phone: phone,
    address: address,
    notes: notes,
    location: state.location,
    telegramUser: tg.initDataUnsafe?.user || null,
    timestamp: new Date().toISOString()
  };

  sendToBot(data, 'Service request submitted! Phoenix Electric will contact you shortly.');
}

// ── Generator Sizing Engine ──
function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.sqft = parseInt(btn.dataset.sqft);
  if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function selectCoverage(btn) {
  btn.parentElement.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.coverage = btn.dataset.coverage;
  if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function calculateGenerator() {
  // Calculate total load from checked circuits
  const checks = document.querySelectorAll('.circuit-grid input:checked');
  let totalWatts = 0;
  let selectedCircuits = [];

  checks.forEach(cb => {
    totalWatts += parseInt(cb.value);
    selectedCircuits.push(cb.dataset.label);
  });

  if (totalWatts === 0 && !state.sqft) {
    tg.showAlert('Please select your home size or check at least one circuit.');
    return;
  }

  // Add base house load if sqft selected (lighting, misc circuits)
  if (state.sqft) {
    const baseLoad = Math.round(state.sqft * 0.5); // ~0.5W per sqft base
    totalWatts += baseLoad;
  }

  // Apply coverage multiplier
  let multiplier = 1.0;
  if (state.coverage === 'essential') multiplier = 0.75;    // Run at 75% — just essentials
  if (state.coverage === 'managed') multiplier = 1.0;       // Smart load management
  if (state.coverage === 'full') multiplier = 1.25;          // Full headroom

  const adjustedWatts = Math.round(totalWatts * multiplier);
  const requiredKW = Math.ceil(adjustedWatts / 1000);

  // Find recommended generator (next size up from required)
  let recommended = GENERATORS[GENERATORS.length - 1]; // Default to largest
  let alternative = null;

  for (let i = 0; i < GENERATORS.length; i++) {
    if (GENERATORS[i].kw >= requiredKW) {
      recommended = GENERATORS[i];
      // Alternative is one size up if available
      if (i + 1 < GENERATORS.length) {
        alternative = GENERATORS[i + 1];
      }
      // If this is the smallest, also show previous as alt isn't helpful
      // Show the one below as budget option if it's close
      if (i > 0 && !alternative) {
        alternative = GENERATORS[i - 1];
      }
      break;
    }
  }

  // If required is more than the 7kW but we picked 7kW, bump up
  if (requiredKW > recommended.kw) {
    recommended = GENERATORS[GENERATORS.length - 1];
    alternative = GENERATORS[GENERATORS.length - 2];
  }

  // If no alternative set, pick one size up
  if (!alternative && recommended !== GENERATORS[GENERATORS.length - 1]) {
    const idx = GENERATORS.indexOf(recommended);
    alternative = GENERATORS[idx + 1] || GENERATORS[idx - 1];
  }

  // Render results
  const resultsEl = document.getElementById('sizing-results');
  resultsEl.style.display = 'block';

  // Load summary
  document.getElementById('load-summary').innerHTML =
    `Estimated load: <strong>${(adjustedWatts / 1000).toFixed(1)} kW</strong> (${adjustedWatts.toLocaleString()}W)<br>` +
    `Circuits selected: ${selectedCircuits.length > 0 ? selectedCircuits.join(', ') : 'Based on home size'}<br>` +
    `Coverage: ${state.coverage === 'essential' ? 'Essentials Only' : state.coverage === 'full' ? 'Full Whole Home' : 'Managed Whole Home'}`;

  // Recommended generator card
  const installSubtotal = INSTALL_PACKAGE.reduce((sum, item) => sum + item.list, 0);

  document.getElementById('recommended-gen').innerHTML = `
    <div class="gen-badge">★ Recommended</div>
    <div class="gen-model">Generac ${recommended.model}</div>
    <div class="gen-detail">${recommended.kw} kW — Powers ${recommended.kw >= 20 ? 'large homes, dual HVAC, pools' : recommended.kw >= 14 ? 'average to large homes with A/C' : 'essential circuits and select appliances'}</div>
    <div class="gen-detail">${recommended.labor} hours typical install time</div>
    <div class="gen-price">$${recommended.list.toLocaleString(undefined, {minimumFractionDigits: 2})} <small>generator unit</small></div>
  `;

  // Alternative card
  if (alternative) {
    document.getElementById('alt-gen').innerHTML = `
      <div class="gen-badge">${alternative.kw > recommended.kw ? '↑ Next Size Up' : '↓ Budget Option'}</div>
      <div class="gen-model">Generac ${alternative.model}</div>
      <div class="gen-detail">${alternative.kw} kW — ${alternative.kw > recommended.kw ? 'Extra headroom for future additions' : 'Lower cost, covers core circuits'}</div>
      <div class="gen-price">$${alternative.list.toLocaleString(undefined, {minimumFractionDigits: 2})} <small>generator unit</small></div>
    `;
    document.getElementById('alt-gen').style.display = 'block';
  } else {
    document.getElementById('alt-gen').style.display = 'none';
  }

  // Package breakdown
  let packageHTML = `
    <div class="pkg-item">
      <span class="pkg-label">Generac ${recommended.model}</span>
      <span class="pkg-cost">$${recommended.list.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
    </div>
  `;

  INSTALL_PACKAGE.forEach(item => {
    packageHTML += `
      <div class="pkg-item">
        <span class="pkg-label">${item.name}</span>
        <span class="pkg-cost">$${item.list.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
      </div>
    `;
  });

  document.getElementById('package-items').innerHTML = packageHTML;

  const grandTotal = recommended.list + installSubtotal;
  document.getElementById('package-total').innerHTML = `
    <span class="total-label">Estimated Total</span>
    <span class="total-amount">$${grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
  `;

  // Scroll to results
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');

  // Store for submission
  state.genResult = {
    recommended: recommended,
    alternative: alternative,
    totalWatts: adjustedWatts,
    requiredKW: requiredKW,
    circuits: selectedCircuits,
    coverage: state.coverage,
    sqft: state.sqft,
    packageTotal: grandTotal
  };
}

function submitGeneratorLead() {
  const name = document.getElementById('gen-name').value.trim();
  const phone = document.getElementById('gen-phone').value.trim();

  if (!name || !phone) {
    tg.showAlert('Please enter your name and phone number.');
    return;
  }
  if (!state.genResult) {
    tg.showAlert('Please calculate your generator size first.');
    return;
  }

  const data = {
    type: 'generator_lead',
    name: name,
    phone: phone,
    recommended: state.genResult.recommended.model,
    recommendedKW: state.genResult.recommended.kw,
    recommendedPrice: state.genResult.recommended.list,
    alternative: state.genResult.alternative ? state.genResult.alternative.model : null,
    totalLoadWatts: state.genResult.totalWatts,
    requiredKW: state.genResult.requiredKW,
    circuits: state.genResult.circuits,
    coverage: state.genResult.coverage,
    sqft: state.sqft,
    estimatedPackageTotal: state.genResult.packageTotal,
    telegramUser: tg.initDataUnsafe?.user || null,
    timestamp: new Date().toISOString()
  };

  sendToBot(data, `Generator quote request submitted! We recommend the Generac ${state.genResult.recommended.model}. Phoenix Electric will contact you with a detailed proposal.`);
}

// ── Maintenance ──
function selectMaintService(serviceKey) {
  state.selectedMaint = serviceKey;
  const service = MAINT_SERVICES[serviceKey];

  // Highlight selected card
  document.querySelectorAll('.maint-card').forEach(c => c.classList.remove('selected'));
  // Find the clicked card by matching the serviceKey
  const cards = document.querySelectorAll('.maint-card');
  cards.forEach(card => {
    if (card.getAttribute('onclick') && card.getAttribute('onclick').includes(serviceKey)) {
      card.classList.add('selected');
    }
  });

  // Show form
  const form = document.getElementById('maint-form');
  form.style.display = 'block';
  document.getElementById('maint-service-name').textContent = `Book: ${service.name} — ${service.price}`;
  form.scrollIntoView({ behavior: 'smooth' });
  if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function submitMaintRequest() {
  const name = document.getElementById('maint-name').value.trim();
  const phone = document.getElementById('maint-phone').value.trim();
  const model = document.getElementById('maint-model').value.trim();
  const address = document.getElementById('maint-address').value.trim();
  const notes = document.getElementById('maint-notes').value.trim();

  if (!name || !phone) {
    tg.showAlert('Please enter your name and phone number.');
    return;
  }

  const service = MAINT_SERVICES[state.selectedMaint];
  const data = {
    type: 'maintenance_request',
    service: service.name,
    serviceCode: service.code,
    servicePrice: service.price,
    name: name,
    phone: phone,
    generatorModel: model,
    address: address,
    notes: notes,
    telegramUser: tg.initDataUnsafe?.user || null,
    timestamp: new Date().toISOString()
  };

  sendToBot(data, `${service.name} request submitted! We'll contact you to schedule your appointment.`);
}

// ── Send Data to Bot Backend ──
function sendToBot(data, successMessage) {
  // Disable submit buttons while sending
  document.querySelectorAll('.submit-btn').forEach(btn => btn.classList.add('loading'));

  // METHOD 1: Use Telegram.WebApp.sendData for keyboard-button launched apps
  // This sends data directly to the bot as a service message
  // Only works when Mini App is launched from a keyboard button

  // METHOD 2: POST to your backend (works from all launch methods)
  // Your VPS at echo.phoenixelectric.life handles the relay
  const backendUrl = getBackendUrl() + '/api/miniapp/submit';

  fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': tg.initData // For server-side validation
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      showSuccess(successMessage);
    } else {
      // Backend returned an error — try sendData as fallback (keyboard button launches only)
      try {
        tg.sendData(JSON.stringify(data));
        showSuccess(successMessage);
      } catch (e) {
        // Both methods failed — tell the customer the truth
        tg.showAlert('We couldn\'t submit your request right now. Please call us directly at (720) 955-0284.');
        document.querySelectorAll('.submit-btn').forEach(btn => btn.classList.remove('loading'));
      }
    }
  })
  .catch(() => {
    // Network error — try sendData as fallback
    try {
      tg.sendData(JSON.stringify(data));
      showSuccess(successMessage);
    } catch (e) {
      tg.showAlert('Connection issue. Please call us directly at (720) 955-0284.');
      document.querySelectorAll('.submit-btn').forEach(btn => btn.classList.remove('loading'));
    }
  });
}

function getBackendUrl() {
  if (typeof CONFIG !== 'undefined' && CONFIG.apiBaseUrl) {
    return CONFIG.apiBaseUrl;
  }
  const currentHost = window.location.hostname;
  if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  return 'https://echo.phoenixelectric.life';
}

function showSuccess(message) {
  document.querySelectorAll('.submit-btn').forEach(btn => btn.classList.remove('loading'));
  document.getElementById('success-message').textContent = message;
  navigateTo('success');
  if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
}

// ── Theme Change Listener ──
tg.onEvent('themeChanged', () => {
  if (tg.colorScheme === 'light') {
    document.body.classList.add('tg-theme-light');
  } else {
    document.body.classList.remove('tg-theme-light');
  }
});

// ── Viewport Change Listener ──
tg.onEvent('viewportChanged', (event) => {
  // Handle keyboard showing/hiding
  if (!event.isStateStable) return;
});

// ── Main Button (Telegram native bottom button) ──
// We use our own submit buttons instead, but this is available
// tg.MainButton.setText('Submit Request');
// tg.MainButton.show();

// Debug logging removed for production — use browser DevTools if needed
