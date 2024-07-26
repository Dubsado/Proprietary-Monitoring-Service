# Proprietary-Monitoring-Service?

To run in PM2 `pm2 start --interpreter ~/.bun/bin/bun index.ts`

To keep in the background: `https://pm2.keymetrics.io/docs/usage/startup/`

To run ngrok in the background: `sudo ngrok service install --config ./ngrok.yml`

To just run ngrok: `ngrok http --domain=curiously-bold-malamute.ngrok-free.app 8000 > /dev/null &`

Depends on this webhook: https://dashboard.stripe.com/webhooks/we_1PgvRjGLbbkCLN1Q1tSinVTv
