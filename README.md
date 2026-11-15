# Earn Pe

Telegram mini app and Express/MongoDB backend deployed on Render.

## Important security notice
Earlier commits contained a Telegram bot token, MongoDB credentials and admin passwords. **Immediately revoke/rotate them** in BotFather, MongoDB Atlas and the admin panels. Moving them to environment variables does **not** invalidate exposed credentials or remove them from Git history.

## Configure
1. Set every variable in `.env.example` under Render Dashboard > Earn-Pe-3 > Environment. Use `APP_URL=https://earn-pe-3.onrender.com` for this service.
2. Make sure `APP_URL` is the correct HTTPS deployment URL, without a trailing slash.
3. Set `ADMIN_TELEGRAM_IDS` to your real Telegram numeric user ID(s), comma-separated; never use placeholders.
4. On Render use Node runtime, build command `npm install` (or the existing `yarn install`), start command `npm start` (or the existing `node api/index.js`). The app uses `process.env.PORT` supplied by Render, serves the HTML pages itself, and exposes `/health`. Keep `BOT_MODE` unset for Render webhook mode; polling is local-only.
5. Deploy. Use POST `/api/admin/set-webhook` with the `x-admin-password` header to register the webhook. The route is protected and sends the Telegram webhook secret.
6. Run `npm install` and `npm start` for local development.

## Known follow-up security work
Before allowing real-money withdrawals, add server-side validation of Telegram Web App `initData` for **every** user route, and make balance/reward/withdrawal transitions atomic. The existing code trusts user-supplied Telegram IDs on user endpoints; until these are secured, do not enable payouts.

The application's existing HTML pages are kept unchanged by this patch.

## Render note
The existing Render service `Earn-Pe-3` points to `main`. Fixes in a pull request will not reach Render until reviewed and merged into `main` (or the service branch is explicitly changed). Rotating exposed credentials is mandatory before deploying the patched code.

## Deployment safety
`Earn-Pe-3` is the selected service. The Render service tracks `main`, so PR branch commits do not deploy automatically. Verify the PR checks and set/rotate secrets before merging. Do not enable real-money withdrawals until authenticated user actions and atomic balance updates have been implemented and tested.
