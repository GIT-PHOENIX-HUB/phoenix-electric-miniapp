/* =============================================
   PHOENIX ELECTRIC — MINI APP BACKEND HANDLER
   Add this route to your gateway server
   ============================================= */

import crypto from 'crypto';

// Add to your express app on echo.phoenixelectric.life
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Don't hardcode!
const SHANE_CHAT_ID = process.env.NOTIFICATION_CHAT_ID;

/**
 * Validate Telegram Mini App initData using HMAC-SHA256.
 * See: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
function validateTelegramInitData(initData, botToken) {
  if (!initData || !botToken) return false;

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return false;

  params.delete('hash');
  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `${key}=${val}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const computedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  return computedHash === hash;
}

// Mini App submission endpoint
app.post('/api/miniapp/submit', express.json(), async (req, res) => {
  try {
    // Validate Telegram initData — reject unauthenticated requests
    const initData = req.headers['x-telegram-init-data'];
    if (!validateTelegramInitData(initData, BOT_TOKEN)) {
      console.warn('[MiniApp] Rejected request: invalid or missing Telegram initData');
      return res.status(403).json({ error: 'Invalid Telegram authentication' });
    }

    const data = req.body;

    // Format notification message
    let message = '';

    switch (data.type) {
      case 'service_request':
        message = formatServiceRequest(data);
        break;
      case 'generator_lead':
        message = formatGeneratorLead(data);
        break;
      case 'maintenance_request':
        message = formatMaintenanceRequest(data);
        break;
      default:
        message = `📨 Mini App Submission:\n${JSON.stringify(data, null, 2)}`;
    }

    // Send to Shane's DM
    await sendTelegramMessage(SHANE_CHAT_ID, message);
    res.json({ success: true });
  } catch (error) {
    console.error('[MiniApp] Submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function formatServiceRequest(data) {
  const urgencyEmoji = {
    emergency: '🚨 EMERGENCY',
    soon: '⚡ This Week',
    flexible: '📅 Flexible'
  };
  const catEmoji = {
    lighting: '💡 Lighting',
    circuits: '⚡ Circuits',
    panels: '⚙️ Panel/Service',
    devices: '🔌 Outlets/Switches',
    generators: '⛑️ Generator',
    specialty: '⭐ Specialty/EV'
  };

  return `🔥 NEW SERVICE REQUEST\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `📋 ${catEmoji[data.category] || data.category}\n` +
    `${urgencyEmoji[data.urgency] || data.urgency}\n` +
    `🏠 ${data.property === 'commercial' ? '🏢 Commercial' : '🏠 Residential'}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `👤 ${data.name}\n` +
    `📱 ${data.phone}\n` +
    `📍 ${data.address || 'No address provided'}` +
    `${data.location ? `\n🗺️ GPS: ${data.location.lat}, ${data.location.lng}` : ''}` +
    `${data.notes ? `\n💬 ${data.notes}` : ''}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `⏰ ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/Denver' })}` +
    `${data.telegramUser ? `\n📲 TG: @${data.telegramUser.username || data.telegramUser.first_name}` : ''}`;
}

function formatGeneratorLead(data) {
  return `⛑️🔥 GENERATOR LEAD\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `🏆 Recommended: Generac ${data.recommended}\n` +
    `⚡ ${data.recommendedKW} kW\n` +
    `💰 Unit Price: $${data.recommendedPrice?.toLocaleString()}\n` +
    `📦 Package Estimate: $${data.estimatedPackageTotal?.toLocaleString()}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `🔌 Load: ${(data.totalLoadWatts / 1000).toFixed(1)} kW (${data.totalLoadWatts?.toLocaleString()}W)\n` +
    `📊 Coverage: ${data.coverage}\n` +
    `🏠 Sq Ft: ${data.sqft ? data.sqft.toLocaleString() : 'Not specified'}\n` +
    `🔧 Circuits: ${data.circuits?.join(', ') || 'None selected'}\n` +
    `${data.alternative ? `📌 Alt Option: Generac ${data.alternative}\n` : ''}` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `👤 ${data.name}\n` +
    `📱 ${data.phone}\n` +
    `⏰ ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/Denver' })}` +
    `${data.telegramUser ? `\n📲 TG: @${data.telegramUser.username || data.telegramUser.first_name}` : ''}`;
}

function formatMaintenanceRequest(data) {
  return `🔧 MAINTENANCE REQUEST\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `📋 ${data.service}\n` +
    `💰 ${data.servicePrice}\n` +
    `🏷️ Code: ${data.serviceCode}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `👤 ${data.name}\n` +
    `📱 ${data.phone}\n` +
    `📍 ${data.address || 'No address'}\n` +
    `⛑️ Generator: ${data.generatorModel || 'Unknown model'}` +
    `${data.notes ? `\n💬 ${data.notes}` : ''}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `⏰ ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/Denver' })}` +
    `${data.telegramUser ? `\n📲 TG: @${data.telegramUser.username || data.telegramUser.first_name}` : ''}`;
}

async function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    })
  });
  return response.json();
}
