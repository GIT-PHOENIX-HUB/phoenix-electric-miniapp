# Phoenix Electric Mini App — Deployment Guide

## Architecture
```
Customer taps link or bot menu
        ↓
Telegram opens Mini App WebView
        ↓
https://echo.phoenixelectric.life/miniapp/index.html
  (static files: index.html, style.css, app.js)
        ↓
Customer fills form → Submit
        ↓
POST /api/miniapp/submit
  (handled by gateway Express server)
        ↓
Gateway formats message → Telegram Bot API
        ↓
Shane receives formatted notification in DM
  (chat_id: 8357341666)
```

## File Manifest

| File | Destination on VPS | Purpose |
|------|-------------------|---------|
| index.html | /opt/phoenix-echo-gateway/miniapp/ | App UI |
| style.css | /opt/phoenix-echo-gateway/miniapp/ | Phoenix theme |
| app.js | /opt/phoenix-echo-gateway/miniapp/ | Frontend logic |
| server-handler.js | Integrate into gateway | API + notifications |
| bot-commands.js | Integrate into gateway | Bot command responses |

## Step 1: Create directory and upload files
```bash
ssh phoenix@93.188.161.80
sudo mkdir -p /opt/phoenix-echo-gateway/miniapp
sudo chown phoenix:phoenix /opt/phoenix-echo-gateway/miniapp

# From Mac:
scp index.html style.css app.js \
  phoenix@93.188.161.80:/opt/phoenix-echo-gateway/miniapp/
```

## Step 2: Add Nginx location block
```nginx
# Inside the existing server block for echo.phoenixelectric.life
location /miniapp {
    alias /opt/phoenix-echo-gateway/miniapp;
    index index.html;
    try_files $uri $uri/ /miniapp/index.html;
    add_header Access-Control-Allow-Origin "https://web.telegram.org" always;
    location ~* \.(css|js|png|jpg|gif|ico|svg)$ {
        expires 1h;
        add_header Cache-Control "public";
    }
}
location /api/miniapp/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Step 3: Integrate server-handler.js + bot-commands.js into gateway

## Step 4: BotFather setup (see BOTFATHER_SETUP.md)

## Step 5: Test
1. Browser: https://echo.phoenixelectric.life/miniapp/
2. Telegram: Open @PhoenixEchoBot → tap menu button
3. Deep link: https://t.me/PhoenixEchoBot?startapp=generator

## Direct Links
```
Main App:      https://t.me/PhoenixEchoBot?startapp
Generator:     https://t.me/PhoenixEchoBot?startapp=generator
Service:       https://t.me/PhoenixEchoBot?startapp=service
Maintenance:   https://t.me/PhoenixEchoBot?startapp=maintenance
```

## Security
Rotate bot token after deployment via BotFather.
