/**
 * Google Business Profile Auto-Poster
 *
 * STATUS: Awaiting GBP API credentials.
 *
 * Once you have credentials, fill in the config block below and run:
 *   npx ts-node scripts/post-to-gbp.ts
 *
 * Required GBP API scopes:
 *   https://www.googleapis.com/auth/business.manage
 *
 * Required GCP setup:
 *   1. Enable "My Business Business Information API" in Google Cloud Console
 *   2. Enable "My Business Posts API"
 *   3. Create OAuth 2.0 credentials (Desktop app) → download client_secret.json
 *   4. Run first-time auth to generate token.json (see authClient below)
 */

import fs from "node:fs";
import path from "node:path";

// ─── CONFIG (fill in when API is ready) ─────────────────────────────────────

const CONFIG = {
  /** Path to your OAuth client secret JSON downloaded from Google Cloud Console */
  clientSecretPath: "./credentials/client_secret.json",

  /** Path where the access token will be cached after first auth */
  tokenPath: "./credentials/token.json",

  /** Your Google Business Profile account ID
   *  Find it at: https://business.google.com → Info → Account number
   *  Format: accounts/1234567890 */
  accountId: "accounts/REPLACE_ME",

  /** Your GBP location ID
   *  Find it via: GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{accountId}/locations
   *  Format: accounts/1234567890/locations/9876543210 */
  locationId: "accounts/REPLACE_ME/locations/REPLACE_ME",

  /** Folder containing rendered MP4 files */
  videosDir: "./out",

  /** Call to action button type for each post */
  callToActionType: "CALL" as const, // OPTIONS: CALL | LEARN_MORE | SIGN_UP | GET_OFFER

  /** Phone number shown on CALL button */
  phoneNumber: "+1-REPLACE-ME",
};

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface GBPMediaItem {
  mediaFormat: "VIDEO";
  sourceUrl: string; // publicly accessible URL to the video file
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GBPLocalPost {
  languageCode: string;
  summary: string;
  callToAction?: {
    actionType: string;
    url?: string;
    phoneNumber?: string;
  };
  media?: GBPMediaItem[];
  topicType: "STANDARD";
}

// ─── POST CONTENT MAP ────────────────────────────────────────────────────────
// Maps each video ID to the text summary for the GBP post.

const POST_CONTENT: Record<string, string> = {
  "living-trust":
    "What is a living trust and do I need one? A living trust lets you manage your assets and transfer them to heirs without probate. Learn if it's right for you — free consultation available.",
  "estate-planning-cost":
    "How much does estate planning cost in Texas? From simple wills ($300–$1,000) to full trust packages, protecting your family is always worth it. Contact us today.",
  "die-without-will":
    "What happens if you die without a will in Texas? The state decides — and it may not honor your wishes. A will gives you the final say. Let us help.",
  "power-of-attorney":
    "What is a power of attorney? It gives someone you trust legal authority to act on your behalf for financial or healthcare decisions. Essential for every estate plan.",
  "write-own-will":
    "Can I write my own will in Texas? Texas allows handwritten wills, but attorney-drafted wills are safer and more complete. Get it done right the first time.",
  "avoid-probate":
    "How do I avoid probate in Texas? Living trusts, Lady Bird deeds, and beneficiary designations can all help keep your assets out of probate court.",
  "lady-bird-deed":
    "What is a Lady Bird deed? This Texas-specific deed lets you transfer real estate to heirs at death while retaining full control during your lifetime — and it avoids probate.",
  "update-estate-plan":
    "When should you update your estate plan? After major life events — marriage, divorce, new children, or significant asset changes. Review it every 3–5 years.",
  "will-vs-trust":
    "Will vs. trust — what's the difference? A will takes effect at death and goes through probate. A trust is active during your lifetime and avoids probate. We'll help you choose.",
  "young-and-healthy":
    "Think you're too young to need an estate plan? Accidents happen at any age. Protect your children, avoid family conflict, and start simple. It's never too early.",
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 Checking configuration...");

  if (CONFIG.accountId.includes("REPLACE_ME")) {
    console.error("❌ Please fill in CONFIG.accountId before running.");
    process.exit(1);
  }

  if (CONFIG.locationId.includes("REPLACE_ME")) {
    console.error("❌ Please fill in CONFIG.locationId before running.");
    process.exit(1);
  }

  if (!fs.existsSync(CONFIG.clientSecretPath)) {
    console.error(`❌ Client secret not found at ${CONFIG.clientSecretPath}`);
    console.error(
      "   Download it from Google Cloud Console → APIs & Services → Credentials",
    );
    process.exit(1);
  }

  const videos = fs
    .readdirSync(CONFIG.videosDir)
    .filter((f) => f.endsWith(".mp4"));

  if (videos.length === 0) {
    console.error(
      "❌ No MP4 files found in ./out — run scripts/render-all.sh first.",
    );
    process.exit(1);
  }

  console.log(`✅ Found ${videos.length} rendered videos.`);
  console.log("📡 Connecting to GBP API...\n");

  // ── TODO: Initialize Google OAuth2 client ──────────────────────────────────
  // const { google } = require('googleapis');
  // const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  // auth.setCredentials(JSON.parse(fs.readFileSync(CONFIG.tokenPath, 'utf8')));
  // const mybusiness = google.mybusinessaccounts({ version: 'v1', auth });

  for (const filename of videos) {
    const id = path.basename(filename, ".mp4");
    const summary = POST_CONTENT[id];

    if (!summary) {
      console.warn(`⚠ No post content defined for video ID "${id}" — skipping`);
      continue;
    }

    const videoPath = path.join(CONFIG.videosDir, filename);
    console.log(`📤 Posting: ${id}`);
    console.log(`   File   : ${videoPath}`);
    console.log(`   Summary: ${summary.slice(0, 80)}...`);

    // ── TODO: Upload video to GBP media & create post ──────────────────────
    // Step 1: Upload video file to GBP media
    //   POST https://mybusiness.googleapis.com/v4/{parent}/media
    //
    // Step 2: Create the local post with media reference
    //   POST https://mybusiness.googleapis.com/v4/{name}/localPosts
    //
    // const post: GBPLocalPost = {
    //   languageCode: 'en-US',
    //   summary,
    //   topicType: 'STANDARD',
    //   callToAction: {
    //     actionType: CONFIG.callToActionType,
    //     phoneNumber: CONFIG.phoneNumber,
    //   },
    //   media: [{ mediaFormat: 'VIDEO', sourceUrl: uploadedMediaUrl }],
    // };

    console.log(`   ⏸  (API not yet connected — post queued)\n`);
  }

  console.log(
    "✅ All posts processed. Wire up OAuth + API calls above when credentials are ready.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
