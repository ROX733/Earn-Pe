"use strict";

// Configure these in Vercel Project Settings > Environment Variables.
// Never store production bot tokens, database credentials or panel passwords in Git.
require("dotenv").config();

const required = ["BOT_TOKEN", "MONGO_URI", "ADMIN_PASSWORD", "ADMIN_TELEGRAM_IDS", "APP_URL", "TELEGRAM_WEBHOOK_SECRET"];
for (const name of required) {
  if (!process.env[name] || !process.env[name].trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}
const BOT_TOKEN = process.env.BOT_TOKEN.trim();
if (!/^\d+:[A-Za-z0-9_-]+$/.test(BOT_TOKEN)) {
  throw new Error("BOT_TOKEN must have the Telegram bot token format");
}
const APP_URL = process.env.APP_URL.trim().replace(/\/$/, "");
if (!/^https:\/\/[\w.-]+(?::\d+)?$/.test(APP_URL)) {
  throw new Error("APP_URL must be an HTTPS origin without a path");
}
const ADMIN_TELEGRAM_IDS = process.env.ADMIN_TELEGRAM_IDS.split(",")
  .map(id => id.trim()).filter(Boolean);
if (!ADMIN_TELEGRAM_IDS.length || ADMIN_TELEGRAM_IDS.some(id => !/^\d+$/.test(id))) {
  throw new Error("ADMIN_TELEGRAM_IDS must be comma-separated numeric Telegram IDs");
}
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET.trim();
if (!/^[A-Za-z0-9_-]{1,256}$/.test(TELEGRAM_WEBHOOK_SECRET)) {
  throw new Error("TELEGRAM_WEBHOOK_SECRET must be 1-256 characters (letters, digits, _ or -)");
}
module.exports = {
  BOT_TOKEN,
  MONGO_URI: process.env.MONGO_URI.trim(),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  DEV_VERIFY_PASSWORD: process.env.DEV_VERIFY_PASSWORD || process.env.ADMIN_PASSWORD,
  ADMIN_TELEGRAM_IDS,
  APP_URL,
  TELEGRAM_WEBHOOK_SECRET,
  BOT_USERNAME: process.env.BOT_USERNAME || "@EarnPeMiniApp_Bot",
};
