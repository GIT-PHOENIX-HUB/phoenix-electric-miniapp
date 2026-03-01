# PhoenixEchoBot — BotFather Configuration

## 1. Bot Identity
- `/setname` → Phoenix Electric ⚡
- `/setdescription` → Licensed Colorado Electrical Contractor & Authorized Generac Dealer. Request service, size a generator, or book maintenance instantly.
- `/setabouttext` → 🔥 Phoenix Electric LLC | ⚡ CO License #101501 | Top 1% Contractor | ⛑️ Authorized Generac Sales & Service | 📍 Denver Metro & Northern Colorado | 📞 (720) 955-0284

## 2. Bot Profile Picture
- `/setuserpic` → Upload phoenix-icon-4k-transparent.png

## 3. Commands
`/setcommands` →
```
start - Open Phoenix Electric
service - Request electrical service
generator - Size a Generac generator
maintenance - Book generator maintenance
help - Get help or contact info
terms - Terms of service
support - Customer support
```

## 4. Menu Button (Mini App Launch)
- `/setmenubutton` → URL: `https://echo.phoenixelectric.life/miniapp` → Button text: `⚡ Phoenix Electric`

## 5. Main Mini App (Profile Button)
- Bot Settings > Configure Main Mini App → URL: `https://echo.phoenixelectric.life/miniapp`

## 6. Payments (Phase 2)
- `/mybots` → @PhoenixEchoBot → Payments → Stripe TEST MODE first

## 7. Security
After deployment: `/mybots` → @PhoenixEchoBot → API Token → Revoke current token → Update in VPS + Mac configs
