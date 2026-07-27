import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const appSource = readFileSync(new URL('../miniapp/app.js', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../miniapp/style.css', import.meta.url), 'utf8');
const serverSource = readFileSync(new URL('../miniapp/server-handler.js', import.meta.url), 'utf8');

test('private-mode chat sessions remain stable in module memory', () => {
  const start = appSource.indexOf('let inMemoryChatSessionId');
  const end = appSource.indexOf('function appendChatBubble', start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);

  const context = vm.createContext({
    localStorage: {
      getItem() { throw new Error('storage blocked'); },
      setItem() { throw new Error('storage blocked'); }
    }
  });
  vm.runInContext(
    `${appSource.slice(start, end)}
     globalThis.sessionIds = [chatSessionId(), chatSessionId(), chatSessionId()];`,
    context
  );

  assert.match(context.sessionIds[0], /^web-/);
  assert.deepEqual(new Set(context.sessionIds).size, 1);
});

test('chat POST and canonical gateway handler require Telegram init data', () => {
  assert.match(
    appSource,
    /'X-Telegram-Init-Data':\s*tg\.initData\s*\|\|\s*''/
  );
  assert.match(
    serverSource,
    /app\.use\(\s*\[\s*'\/api\/miniapp\/submit',\s*'\/api\/miniapp\/chat'\s*\],\s*requireTelegramMiniAppAuth\s*\)/s
  );
  assert.match(
    serverSource,
    /requireTelegramMiniAppAuth[\s\S]*validateTelegramInitData\(initData,\s*BOT_TOKEN\)[\s\S]*res\.status\(403\)/
  );
});

test('IME composition Enter is not treated as chat submission', () => {
  assert.match(
    appSource,
    /e\.key\s*===\s*'Enter'\s*&&\s*!e\.isComposing/
  );
});

test('user bubbles keep a theme-independent on-red foreground', () => {
  assert.match(cssSource, /--on-phoenix-red:\s*#ffffff/);
  assert.match(
    cssSource,
    /\.chat-bubble\.user\s*\{[^}]*color:\s*var\(--on-phoenix-red\)/s
  );

  const token = (name) => cssSource.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
  const luminance = (hex) => {
    const channels = hex.slice(1).match(/../g).map((value) => parseInt(value, 16) / 255);
    const linear = channels.map((value) => (
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    ));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const foreground = luminance(token('on-phoenix-red'));
  const background = luminance(token('phoenix-red-dark'));
  const ratio = (Math.max(foreground, background) + 0.05)
    / (Math.min(foreground, background) + 0.05);
  assert.ok(ratio >= 4.5, `expected WCAG AA contrast, received ${ratio.toFixed(2)}:1`);
});
