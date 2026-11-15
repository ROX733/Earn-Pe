# Earn Pe

Telegram mini app and Express/MongoDB backend deployed on Vercel.

## Important security notice
Earlier commits contained a Telegram bot token, MongoDB credentials and admin passwords. **Immediately revoke/rotate them** in BotFather, MongoDB Atlas and the admin panels. Moving them to environment variables does **not** invalidate exposed credentials or remove them from Git history.

## Configure
1. Set every variable in `.env.example` as an environment variable in Vercel.
2. Make sure `APP_URL` is the correct HTTPS deployment URL, without a trailing slash.
3. Set `ADMIN_TELEGRAM_IDS` to your real Telegram numeric user ID(s), comma-separated; never use placeholders.
4. Deploy. Use POST `/api/admin/set-webhook` with the `x-admin-password` header to register the webhook. The route is protected and sends the Telegram webhook secret.
5. Run `npm install` and `npm start` for local development.

## Known follow-up security work
Before allowing real-money withdrawals, add server-side validation of Telegram Web App `initData` for **every** user route, and make balance/reward/withdrawal transitions atomic. The existing code trusts user-supplied Telegram IDs on user endpoints; until these are secured, do not enable payouts.

The application's existing HTML pages are kept unchanged by this patch.
