# Studio Igloo — Photography by Sankhadeep

Studio Igloo is a minimalist, editorial photography portfolio built for photographer **Sankhadeep**. Designed for deployment on **Cloudflare Pages Free** with zero-maintenance serverless contact processing via Cloudflare Pages Functions, Resend, and Cloudflare KV.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run unit tests
npm run test

# 4. Build for Cloudflare Pages production
npm run build
```

---

## 🎨 Content & Photo Management (No Coding Required)

### 📸 How to Replace or Add Photographs

All portfolio photographs are stored locally under `public/images/` and cataloged in `src/data/photos.json`. You do **not** need to modify any React components to change photos.

1. **Add new image files**:
   Place your WebP photograph (e.g. `my-photo.webp`) and a thumbnail version (e.g. `thumb-my-photo.webp`) into the category subfolder inside `public/images/`:
   ```text
   public/images/weddings/my-photo.webp
   public/images/weddings/thumb-my-photo.webp
   ```
2. **Add an entry in `src/data/photos.json`**:
   ```json
   {
     "id": "wedding-009",
     "category": "Wedding",
     "src": "/images/weddings/my-photo.webp",
     "thumbnail": "/images/weddings/thumb-my-photo.webp",
     "alt": "Bride and groom sharing a laugh",
     "featured": true,
     "order": 9
   }
   ```
3. **Deploy**:
   Commit your changes to Git and push to GitHub/Cloudflare Pages.

---

### ⚙️ How to Change Studio Info & Copy

Centralized JSON configuration files control all site copy and settings without touching code:

- `src/config/site.json`: Studio name, owner name, tagline, email, phone, location, biography, social media handles.
- `src/config/contact.json`: Contact form fields, service options, user-facing success/duplicate messages, deduplication settings (`retentionDays`, `duplicateWindowDays`, `maxStoredContacts`).
- `src/config/theme.json`: Color palette, editorial fonts (Cormorant Garamond / Inter), container widths.
- `src/config/sections.json`: Toggle sections on/off or reorder them.
- `src/config/animations.json`: Parallax toggles, cursor effects, and text reveals.
- `src/config/footer.json`: Copyright text, footer navigation links, and back-to-top text.

---

## ☁️ Cloudflare Pages Free Deployment Guide

### Step 1: Create Cloudflare Pages Project
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your `studio-igloo` repository.
4. Set Build Settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### Step 2: Create & Bind Cloudflare KV Namespace (`CONTACTS_KV`)
1. In Cloudflare Dashboard, go to **Workers & Pages** → **KV**.
2. Click **Create Namespace** and name it `studio-igloo-contacts-kv`.
3. Go back to your Pages project → **Settings** → **Functions** → **KV namespace bindings**.
4. Add a binding:
   - **Variable name**: `CONTACTS_KV`
   - **KV namespace**: Select `studio-igloo-contacts-kv`.

### Step 3: Add Environment Secrets
In your Pages project settings → **Environment variables** (or `.dev.vars` for local Wrangler testing):

| Variable Name | Description | Example |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API secret key for sending emails | `re_123456789_abcdef...` |
| `CONTACT_TO_EMAIL` | Destination email (Studio owner) | `hello@studioigloo.com` |
| `CONTACT_FROM_EMAIL` | Sender address verified in Resend | `Studio Igloo <onboarding@resend.dev>` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile bot verification secret key | `0x4AAAAAAAx_1234567890` |

---

## 🔒 Privacy & Contact Lifecycle Architecture

1. **Client Submission**: Visitor submits enquiry on `studioigloo.com`.
2. **Turnstile Verification**: Server verifies Turnstile token.
3. **Email Normalization & SHA-256 Hashing**: Email is trimmed, lowercased, and hashed with SHA-256 (`crypto.subtle`).
4. **Duplicate Check**: Checks Cloudflare KV for `contact:<sha256-email>`. If submitted within `duplicateWindowDays` (default 3 days), prevents redundant email dispatch.
5. **Email Delivery**: Sends enquiry to studio email via Resend API.
6. **Privacy Lifecycle**: Full name, message body, and personal details are **never stored** in Cloudflare KV. Only hashed email timestamp metadata is retained for temporary deduplication, expiring automatically after `retentionDays` (3 days) or capped at `maxStoredContacts` (30 entries).

---

## 🧪 Testing

Run automated vitest unit tests for contact normalization, SHA-256 hashing, HTML escaping, and field validation limits:

```bash
npm run test
```

---

## 📄 License & Asset Provenance

Demonstration photos included in `public/images/` are licensed under the Unsplash Free License. Full provenance metadata and creator attributions are cataloged in [`PHOTO_SOURCES.md`](./PHOTO_SOURCES.md).
