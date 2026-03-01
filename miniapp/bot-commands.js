/* =============================================
   PHOENIX ELECTRIC — BOT COMMAND HANDLER
   Handles /start, /service, /generator, etc.
   Sends inline keyboard buttons that launch
   the Mini App in the correct context.
   Integrate into your existing gateway bot
   polling/webhook handler.
   ============================================= */

const MINIAPP_URL = 'https://echo.phoenixelectric.life/miniapp';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// ── Command Router ──
// Call this from your existing message handler
// when message.text starts with /
async function handleBotCommand(message) {
  const chatId = message.chat.id;
  const command = message.text.split(' ')[0].split('@')[0].toLowerCase();
  const userName = message.from.first_name || 'there';

  switch (command) {
    case '/start':
      await sendStartMessage(chatId, userName, message);
      break;
    case '/service':
      await sendServicePrompt(chatId, userName);
      break;
    case '/generator':
    case '/generac':
      await sendGeneratorPrompt(chatId, userName);
      break;
    case '/maintenance':
    case '/maint':
      await sendMaintenancePrompt(chatId, userName);
      break;
    case '/help':
    case '/support':
      await sendHelpMessage(chatId, userName);
      break;
    case '/terms':
      await sendTermsMessage(chatId);
      break;
    default:
      // Not a recognized command — let other handlers process
      return false;
  }
  return true;
}

// ── /start ──
async function sendStartMessage(chatId, userName, message) {
  // Check for startapp deep link parameter
  const parts = message.text.split(' ');
  const startParam = parts.length > 1 ? parts[1] : null;

  const text =
    `🔥 *Welcome to Phoenix Electric, ${userName}!*\n\n` +
    `We're a licensed Colorado electrical contractor and ` +
    `authorized Generac dealer serving the Denver Metro ` +
    `and Northern Colorado area.\n\n` +
    `⚡ *What can we help you with?*`;

  const keyboard = {
    inline_keyboard: [
      [{
        text: '⚡ Request Service',
        web_app: { url: MINIAPP_URL + '?startapp=service' }
      }],
      [{
        text: '⛑️ Size My Generator',
        web_app: { url: MINIAPP_URL + '?startapp=generator' }
      }],
      [{
        text: '🔧 Generator Maintenance',
        web_app: { url: MINIAPP_URL + '?startapp=maintenance' }
      }],
      [{
        text: '📞 Call Us: (720) 955-0284',
        url: 'tel:+17209550284'
      }]
    ]
  };

  await sendMessage(chatId, text, keyboard, 'Markdown');
}

// ── /service ──
async function sendServicePrompt(chatId, userName) {
  const text =
    `⚡ *Request Electrical Service*\n\n` +
    `Hey ${userName}, tap below to tell us what you need. ` +
    `We handle everything from outlets to panels to generators.\n\n` +
    `🏠 Residential & 🏢 Commercial\n` +
    `📍 Denver Metro + Northern Colorado\n` +
    `🪪 CO License #101501`;

  const keyboard = {
    inline_keyboard: [
      [{
        text: '⚡ Open Service Request',
        web_app: { url: MINIAPP_URL + '?startapp=service' }
      }],
      [{
        text: '🚨 Emergency? Call Now',
        url: 'tel:+17209550284'
      }]
    ]
  };

  await sendMessage(chatId, text, keyboard, 'Markdown');
}

// ── /generator ──
async function sendGeneratorPrompt(chatId, userName) {
  const text =
    `⛑️ *Generac Generator Sizing Tool*\n\n` +
    `${userName}, find the perfect generator for your home ` +
    `in under 2 minutes.\n\n` +
    `We carry the full Generac Guardian series:\n` +
    `• 7kW → 24kW\n` +
    `• Professional installation\n` +
    `• Permits & commissioning included\n` +
    `• Authorized dealer pricing\n\n` +
    `Tap below to get started 👇`;

  const keyboard = {
    inline_keyboard: [
      [{
        text: '⛑️ Size My Generator',
        web_app: { url: MINIAPP_URL + '?startapp=generator' }
      }],
      [{
        text: '📞 Talk to an Expert',
        url: 'tel:+17209550284'
      }]
    ]
  };

  await sendMessage(chatId, text, keyboard, 'Markdown');
}

// ── /maintenance ──
async function sendMaintenancePrompt(chatId, userName) {
  const text =
    `🔧 *Generator Maintenance*\n\n` +
    `Keep your Generac running strong, ${userName}.\n\n` +
    `Available services:\n` +
    `• Annual Maintenance — $253.62\n` +
    `• Battery Replacement — $167.29\n` +
    `• WiFi Module Install — $303.21\n` +
    `• Load Shedding Module — $684.82\n` +
    `• Extended Warranty — $105.00\n` +
    `• Repair/Troubleshooting — Call\n\n` +
    `Tap below to book your service 👇`;

  const keyboard = {
    inline_keyboard: [
      [{
        text: '🔧 Book Maintenance',
        web_app: { url: MINIAPP_URL + '?startapp=maintenance' }
      }],
      [{
        text: '📞 Call for Repair',
        url: 'tel:+17209550284'
      }]
    ]
  };

  await sendMessage(chatId, text, keyboard, 'Markdown');
}

// ── /help ──
async function sendHelpMessage(chatId, userName) {
  const text =
    `👋 *Need help, ${userName}?*\n\n` +
    `Here's what I can do:\n\n` +
    `/service — Request electrical work\n` +
    `/generator — Size a Generac generator\n` +
    `/maintenance — Book generator service\n` +
    `/terms — Terms of service\n\n` +
    `Or tap the menu button below to open ` +
    `the full Phoenix Electric app.\n\n` +
    `*Direct Contact:*\n` +
    `📞 (720) 955-0284\n` +
    `🏢 Phoenix Electric LLC\n` +
    `📍 Denver Metro & Northern Colorado`;

  const keyboard = {
    inline_keyboard: [
      [{
        text: '🔥 Open Phoenix Electric',
        web_app: { url: MINIAPP_URL }
      }]
    ]
  };

  await sendMessage(chatId, text, keyboard, 'Markdown');
}

// ── /terms ──
async function sendTermsMessage(chatId) {
  const text =
    `📋 *Terms of Service*\n\n` +
    `Phoenix Electric LLC provides electrical contracting ` +
    `services in the state of Colorado under License #101501.\n\n` +
    `• All estimates provided through this app are approximate ` +
    `and subject to on-site evaluation.\n` +
    `• Generator pricing includes standard installation. ` +
    `Site-specific conditions may affect final pricing.\n` +
    `• Emergency service is subject to availability.\n` +
    `• Payment terms are net-30 for residential, ` +
    `net-15 for commercial.\n\n` +
    `For questions, contact us at (720) 955-0284 or ` +
    `message us directly in this chat.`;

  await sendMessage(chatId, text, null, 'Markdown');
}

// ── Telegram API Helper ──
async function sendMessage(chatId, text, replyMarkup, parseMode) {
  const payload = {
    chat_id: chatId,
    text: text
  };

  if (parseMode) payload.parse_mode = parseMode;
  if (replyMarkup) payload.reply_markup = replyMarkup;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!result.ok) {
      console.error('[Bot Commands] Send failed:', result.description);
    }
    return result;
  } catch (error) {
    console.error('[Bot Commands] Network error:', error.message);
  }
}

// ── Export for integration ──
module.exports = { handleBotCommand };
