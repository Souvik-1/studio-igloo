# Studio Igloo — Implementation Plan

Build a production-quality, minimalist, editorial photography portfolio website for **Studio Igloo** (photographer **Sankhadeep**), deployable to **Cloudflare Pages Free** with Cloudflare Pages Functions for contact handling.

## User Review Required

> [!IMPORTANT]
> - **50 Internet Photos**: We will source 50 curated high-resolution, free-to-use photography assets (Unsplash/Pexels license) covering weddings, portraits, celebrations, events, lifestyle, nature, studio, and behind-the-scenes. They will be stored locally in `public/images/` and cataloged in `src/data/photos.json` and `PHOTO_SOURCES.md`.
> - **Contact Serverless Endpoint**: The contact form will be powered by a Cloudflare Pages Function (`/functions/api/contact.ts`) utilizing Resend for emails, Cloudflare KV (`CONTACTS_KV`) for hashed email deduplication & rate limiting, and Cloudflare Turnstile for anti-bot protection.
> - **Environment Path**: Commands in the environment will execute using Node.js v24 (`C:\Program Files\nodejs\node.exe` / `npm.cmd`).

## Open Questions

- None at this stage. All requirements are fully defined in `skills.md`.

---

## Proposed Changes

### 1. Scaffolding & Dependencies

#### [NEW] [package.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/package.json)
Configure Vite + React + TypeScript with:
- `react`, `react-dom`
- `motion` (Motion for React)
- `lucide-react`
- `@tailwindcss/vite` / `tailwindcss`
- `vitest` (for automated unit testing of deduplication & hash logic)

#### [NEW] [vite.config.ts](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/vite.config.ts)
Vite configuration with Tailwind CSS plugin and path aliases (`@/`).

#### [NEW] [tsconfig.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/tsconfig.json)
TypeScript configuration supporting React JSX and ESNext target.

---

### 2. Configuration & Asset Architecture

#### [NEW] [src/config/site.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/config/site.json)
Site branding, owner details (Sankhadeep), tagline, location, social links.

#### [NEW] [src/config/theme.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/config/theme.json)
Color system (warm ivory, rich charcoal, muted cool-gray, subtle accent), font pairings (Cormorant Garamond / Inter), layout radii and spacing density.

#### [NEW] [src/config/sections.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/config/sections.json)
Section visibility and rendering order (Hero, Intro, Selected Work, Categories, Story, Gallery, Photographer, Contact, Footer).

#### [NEW] [src/config/contact.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/config/contact.json)
Contact form fields, limits, retention settings (`retentionDays: 3`, `duplicateWindowDays: 3`, `maxStoredContacts: 30`), Turnstile settings, user-facing success/duplicate/error messages.

#### [NEW] [src/config/animations.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/config/animations.json)
Animation intensity, parallax toggles, text reveal settings, smooth scroll settings.

#### [NEW] [src/data/photos.json](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/data/photos.json)
Source of truth for 50 local photographs with categories (Wedding, Birthday, Anniversary, Couple, Portrait, Family, Events, Nature, Behind the Scenes, Studio), thumbnails, high-res webp paths, alt text, featured status, order, and source metadata.

#### [NEW] [PHOTO_SOURCES.md](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/PHOTO_SOURCES.md)
Provenance catalog detailing platform, photographer, source reference URL, and license notes for each of the 50 images.

---

### 3. Local Photo Assets

#### [NEW] [public/images/...](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/public/images)
50 optimized WebP photos and thumbnail pairs organized by category subfolders (`weddings`, `portraits`, etc.).

---

### 4. Components & Pages

#### [NEW] [src/components/layout/Navbar.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/layout/Navbar.tsx)
Editorial navbar with Studio Igloo wordmark, anchor navigation, responsive full-screen mobile menu overlay with Escape key support and smooth staggered animations.

#### [NEW] [src/components/hero/Hero.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/hero/Hero.tsx)
Cinematic hero featuring high-impact photograph, subtle entrance scaling, staggered text reveals, scroll indicator, and subtle parallax.

#### [NEW] [src/components/sections/IntroSection.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/sections/IntroSection.tsx)
Statement layout introducing the studio philosophy with scroll-triggered line reveals.

#### [NEW] [src/components/gallery/FeaturedWork.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/gallery/FeaturedWork.tsx)
Curated asymmetric grid showcasing featured portfolio pieces with clip-path reveals and hover dynamics.

#### [NEW] [src/components/gallery/Categories.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/gallery/Categories.tsx)
Interactive category exploration with hover image previews and fluid category selection.

#### [NEW] [src/components/gallery/FullGallery.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/gallery/FullGallery.tsx)
Editorial masonry portfolio display with category filtering, progressive lazy loading, and lightbox triggers.

#### [NEW] [src/components/lightbox/Lightbox.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/lightbox/Lightbox.tsx)
Full-screen lightbox modal with keyboard navigation (Arrow keys, Escape), touch swipe support, caption display, and focus management.

#### [NEW] [src/components/sections/StorySection.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/sections/StorySection.tsx)
Editorial breakdown of Sankhadeep's visual storytelling philosophy.

#### [NEW] [src/components/sections/PhotographerSection.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/sections/PhotographerSection.tsx)
Personal profile of Sankhadeep with portrait photography and artistic biography.

#### [NEW] [src/components/contact/ContactForm.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/contact/ContactForm.tsx)
Minimalist contact form UI with field validation, honeypot, Turnstile widget integration, loading states, and notification callouts.

#### [NEW] [src/components/ui/CustomCursor.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/ui/CustomCursor.tsx)
Subtle desktop-only custom cursor with hover hints ("VIEW", "EXPLORE"), automatically disabled for touch devices and `prefers-reduced-motion`.

#### [NEW] [src/components/layout/Footer.tsx](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/src/components/layout/Footer.tsx)
Clean editorial footer with back-to-top transition, copyright, and social links.

---

### 5. Serverless Contact Backend (Cloudflare Pages Function)

#### [NEW] [functions/api/contact.ts](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/functions/api/contact.ts)
Cloudflare Pages Function handling:
- Request validation (HTTP POST, JSON payload size, field max lengths).
- Turnstile verification against `TURNSTILE_SECRET_KEY`.
- Normalized email SHA-256 hashing via Web Crypto API (`crypto.subtle`).
- Duplicate check via Cloudflare KV (`CONTACTS_KV`).
- Delivery of formatted email to studio via Resend API (`RESEND_API_KEY`).
- Atomic KV metadata storage (`submittedAt`, `status`) with configurable TTL (`expirationTtl`), purging entries beyond `maxStoredContacts` (30).
- Strict error handling preventing secret or stack trace leakage.

---

### 6. Deployment & Environment Configuration

#### [NEW] [wrangler.jsonc](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/wrangler.jsonc)
Cloudflare Pages configuration declaring KV namespace binding `CONTACTS_KV`.

#### [NEW] [.env.example](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/.env.example) & [.dev.vars.example](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/.dev.vars.example)
Templates for local environment variables and Wrangler secrets (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`).

#### [NEW] [README.md](file:///c:/Users/Souvik%20Saha/Desktop/studio-igloo/README.md)
Comprehensive owner manual covering:
- Quick start instructions (`npm run dev`, `npm run build`).
- Cloudflare Pages Free deployment guide.
- Cloudflare KV namespace setup and binding (`CONTACTS_KV`).
- Resend API key setup and Turnstile configuration.
- Photo replacement workflow (adding files + updating `photos.json`).
- Centralized content configuration guide.

---

## Verification Plan

### Automated Tests
- Run `npx vitest run` to test:
  1. Email normalization & SHA-256 hashing logic.
  2. Contact payload validation limits.
  3. Deduplication window and TTL calculation.
  4. Config structure integrity.
- Run `npx tsc --noEmit` to verify 100% TypeScript type safety.
- Run `npm run build` (`vite build`) to ensure a clean, error-free production build.

### Manual Verification
- Launch local development server (`npm run dev`).
- Verify responsive layout across mobile (375px, 390px, 430px), tablet (768px, 1024px), and desktop (1440px, 1920px).
- Verify all 50 local images load properly in the hero, selected work, category filter, and masonry gallery.
- Test lightbox modal opening, keyboard arrow navigation, Escape key closing, and focus lock.
- Test contact form submit states, honeypot filtering, and client error messages.
- Confirm zero secrets or API keys exist in client bundle build artifacts.
