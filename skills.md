# Studio Igloo — Antigravity Build Specification

## 0. Mission

Build a production-quality, highly polished photography portfolio website for **Studio Igloo**, owned and operated by photographer **Sankhadeep**.

The website will ultimately be deployed to **Cloudflare Pages Free** using Cloudflare Pages Functions for the single dynamic operation: the contact form.

The site must feel like a **real premium photography studio**, not an AI-generated template or a generic agency website.

Primary goals:

1. Extremely attractive minimalist visual design.
2. Strong photography-first presentation.
3. Smooth, tasteful scroll animation and modern interaction design.
4. Excellent mobile experience.
5. Fast loading despite many photographs.
6. Almost everything visually/business-wise configurable from JSON/config files.
7. Initial build must include **50 high-quality real photographs sourced from the internet** and stored locally in the project so the site works without hotlinking.
8. Those 50 photos are placeholder/demo content only and will later be replaced by the owner.
9. Contact form sends an email to the studio.
10. No traditional database, no dashboard, no admin login, no CMS.
11. Temporary duplicate-protection data may be stored in **Cloudflare KV**, with only hashed email + timestamp/state, not the full enquiry.
12. Same email submitted again within the configurable duplicate window must not trigger another email.
13. Old temporary contact records must automatically expire and the system must keep at most the configurable number of recent records.
14. Never expose email-service secrets in the React/browser bundle.
15. Must be deployable to Cloudflare Pages Free without requiring a traditional server.

---

# 1. NON-NEGOTIABLE PRODUCT REQUIREMENTS

## 1.1 Technology

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion for React (`motion`, imported from `motion/react`)
- Lucide React icons
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare Workers KV
- Resend for outbound contact emails
- Cloudflare Turnstile for bot protection
- Web APIs / native browser APIs wherever a dependency is unnecessary

Do NOT use:

- Next.js
- heavy UI component libraries
- Bootstrap
- Material UI
- a traditional Express/Node backend
- Supabase
- PostgreSQL
- MongoDB
- Firebase
- D1
- a CMS
- an admin panel
- a user login system
- server-side rendering unless absolutely required
- unnecessary third-party analytics

This should remain a lightweight React/Vite static site plus one tiny Cloudflare Pages Function.

Use the current stable package versions compatible with the environment at implementation time. Do not pin obsolete versions merely for convenience.

Motion for React is currently the modern successor to Framer Motion and supports scroll, gesture, layout and spring-based interactions. Use it selectively rather than animating every DOM node.

---

# 2. BRAND DIRECTION

## 2.1 Brand

Brand name:

**Studio Igloo**

Owner:

**Sankhadeep**

Studio type:

**Photography / visual storytelling**

Domain:

**studioigloo.com**

Do not invent a fake studio history, fake awards, fake client names, fake locations, fake statistics, fake testimonials, or fake credentials.

Where factual information is not supplied, use editable configuration or elegant neutral copy.

---

# 3. VISUAL DESIGN DIRECTION

The design should be:

- minimalist
- editorial
- cinematic
- sophisticated
- premium
- warm but contemporary
- photography-first
- slightly artistic
- spacious
- typography-led
- visually confident
- responsive
- never cluttered

The word **Igloo** should influence the aesthetic subtly without turning the website into an obvious snow/ice theme.

A possible visual language:

- warm white / soft ivory background
- deep charcoal text
- muted cool-gray / icy-gray supporting tone
- one subtle accent color
- large editorial typography
- large negative space
- full-bleed images
- asymmetrical layouts
- thin borders
- understated micro-interactions
- subtle grain/noise texture if performance remains good

Do NOT use:

- excessive gradients
- neon colors
- glassmorphism everywhere
- giant drop shadows
- excessive rounded cards
- generic SaaS cards
- overused floating blobs
- template-looking sections
- stock-photo-grid appearance
- excessive animations
- loud background music
- autoplay audio

The result should resemble a high-end independent creative studio website.

---

# 4. TYPOGRAPHY

Use an editorial serif + modern sans pairing.

Recommended direction:

- Display/editorial serif: elegant, expressive, high contrast
- UI/body sans: clean, modern, highly readable

Examples that may be considered:

- Cormorant Garamond / DM Sans
- Playfair Display / Inter
- Instrument Serif / Manrope
- Libre Baskerville / Inter

Choose the combination that visually works best.

Make typography configurable through the theme configuration.

Typography hierarchy should feel dramatic:

- huge hero statement
- medium editorial section headings
- small uppercase labels
- readable body copy
- carefully controlled line lengths

Do not fill the screen with text.

---

# 5. INFORMATION ARCHITECTURE

Create a polished one-page experience with anchored sections.

Suggested navigation:

- Home
- Work
- Stories
- About
- Contact

These should scroll to sections of the homepage rather than becoming unnecessarily complicated routes.

Possible structure:

```text
Hero
↓
Intro statement
↓
Selected work / cinematic gallery
↓
Categories
↓
Story / photography philosophy
↓
Featured gallery transition
↓
Sankhadeep profile
↓
Large CTA
↓
Contact
↓
Footer
```

The exact order may be improved during implementation if the visual composition becomes stronger.

Do not blindly implement the above as generic stacked blocks. Compose the page like a visual story.

---

# 6. HERO SECTION

The hero must immediately communicate:

**Studio Igloo**
and
**photography / visual storytelling**

Use one exceptionally strong photograph.

Possible copy direction:

```text
STUDIO IGLOO

Moments that stay.

Photography by Sankhadeep
```

But copy must remain configurable.

Hero requirements:

- viewport-height or near-full-screen
- large image
- image must have excellent visual composition
- subtle image movement on scroll
- text reveal animation
- elegant entrance
- small scroll cue
- minimal navigation
- no intrusive CTA overload

Suggested hero behavior:

1. Initial image gently scales from approximately 1.03 → 1.00.
2. Text enters with staggered opacity + vertical movement.
3. Small scroll indicator subtly animates.
4. On scroll, image has extremely subtle parallax.
5. Do not produce a distracting zoom effect.

On mobile, simplify the animation.

---

# 7. NAVIGATION

Desktop:

- Studio Igloo wordmark on left
- minimal navigation on right
- transparent or adaptive navigation depending on hero state

Mobile:

- compact wordmark
- menu button
- elegant full-screen menu overlay

Menu animation should feel premium:

- background reveal
- menu items stagger in
- current/hover state has movement
- close button accessible by keyboard
- Escape closes the menu
- focus management should be handled properly

Do not use a generic hamburger menu with a basic dropdown.

---

# 8. INTRO SECTION

Immediately after the hero, create a strong editorial statement.

Example concept:

```text
Not just photographs.

Stories, people and places —
preserved in the way they felt.
```

The exact text must be configurable.

Add a subtle scroll-triggered reveal.

Use a large editorial layout with lots of whitespace.

---

# 9. SELECTED WORK

This should be one of the most visually impressive sections.

Use photographs from `photos.json`.

Potential presentation:

- large asymmetric image composition
- alternating image/text alignment
- editorial grid
- horizontal cinematic strip
- image masks / clip-path reveals
- subtle hover motion

Do NOT make every photo the same size.

Selected work should feel curated.

Only selected/featured photos should appear here, controlled through JSON.

Example config:

```json
{
  "gallery": {
    "featuredOnly": true,
    "featuredLimit": 8
  }
}
```

---

# 10. PHOTOGRAPHY CATEGORIES

Include categories such as:

- Wedding
- Birthday
- Anniversary
- Couple
- Portrait
- Family
- Events
- Nature / Lifestyle
- Studio
- Photographer / Biography

The exact labels must come from JSON.

Category UI can use:

- large text
- image reveal
- hover image preview
- horizontal list
- editorial split layout

Do not use boring small pill buttons.

On mobile, ensure the categories remain easy to use.

---

# 11. FULL GALLERY / PHOTO COLLECTION

Build a beautiful gallery component driven entirely by `photos.json`.

Capabilities:

- category filter
- masonry or editorial grid
- lazy loading
- progressive image loading
- responsive image sizes
- hover interaction on desktop
- tap interaction on mobile
- full-screen lightbox
- previous / next navigation
- close button
- Escape support
- arrow key navigation
- swipe support where practical
- image caption/category display where configured

The gallery should feel like browsing a photography book.

Do not preload all full-resolution images.

Only load images when needed.

---

# 12. IMAGE LOADING STRATEGY

Photography is the largest performance risk.

Every photo should support:

```json
{
  "id": "wedding-001",
  "category": "Wedding",
  "src": "/images/wedding/wedding-001.webp",
  "thumbnail": "/images/wedding/thumb-wedding-001.webp",
  "alt": "Bride and groom during an outdoor wedding ceremony",
  "featured": true
}
```

Where feasible, also support:

```json
{
  "srcLarge": "/images/wedding/wedding-001-large.webp",
  "srcMedium": "/images/wedding/wedding-001-medium.webp"
}
```

Generate optimized local versions.

Preferred formats:

- AVIF where practical
- WebP fallback
- do not ship unnecessary multi-megabyte originals to the browser

Suggested sizes:

- thumbnail: roughly 400px
- medium: roughly 1000–1200px
- large: roughly 1600–2000px

The exact values may be adjusted based on source aspect ratio.

Use:

- `loading="lazy"` for non-critical images
- eager/high priority only for hero/above-the-fold image
- width/height or aspect-ratio to reduce layout shift
- blur placeholders or low-resolution placeholders if useful
- `object-fit`
- responsive sizing

---

# 13. INITIAL 50-PHOTO INTERNET COLLECTION

This is a specific requirement for the initial implementation.

Before finalizing the UI, collect **50 high-quality real photographs from the internet** that make Studio Igloo look like a genuine photography studio.

These are temporary demo assets and will later be replaced.

## 13.1 Do not scrape random images

Do NOT take arbitrary images from:

- Google Images
- Pinterest
- random photographer portfolio websites
- copyrighted magazine pages
- social media accounts
- sites whose reuse rights are unclear

Prefer image sources whose current terms explicitly permit the intended use, such as reputable free/stock photo providers.

Possible sources to investigate:

- Unsplash
- Pexels
- Pixabay
- other reputable sources with clearly documented current reuse terms

The implementation agent must verify the source's current reuse terms before using the images.

Do not assume that because an image is searchable online it is free to reuse.

## 13.2 Photo selection requirements

The 50 photos should have strong visual consistency but enough variety to represent a real studio portfolio.

Suggested distribution:

```text
8  Wedding
7  Birthday / Celebration
6  Anniversary / Couple
6  Portrait
5  Family / Lifestyle
5  Events
5  Nature / Travel / Lifestyle
4  Photographer / Biography / Behind the scenes
4  Studio / Editorial / Creative
-------------------------------------------
50 total
```

The distribution can be adjusted slightly if a source has better photographs in another category, but the final total must be exactly 50.

## 13.3 Image quality

Prioritize photographs that are:

- realistic
- professionally composed
- emotionally expressive
- natural
- varied in ethnicity/background without inventing client identity
- varied in indoor/outdoor lighting
- editorial quality
- suitable for a premium photography brand
- not obviously "generic stock"

Avoid:

- cheesy staged corporate photography
- low-quality smartphone snapshots
- excessive AI-looking faces
- obvious watermarks
- logos
- screenshots
- duplicate-looking photographs
- too many similar poses
- overly sexual imagery
- problematic or unsafe content

## 13.4 Store locally

Do not hotlink the selected photographs in production.

Download/copy the selected assets into:

```text
public/images/
```

Recommended structure:

```text
public/
  images/
    weddings/
    birthdays/
    anniversaries/
    portraits/
    family/
    events/
    nature/
    behind-the-scenes/
    studio/
```

Optimize the images for web delivery.

## 13.5 Track source metadata

Every photo entry in `photos.json` should have metadata similar to:

```json
{
  "id": "wedding-001",
  "category": "Wedding",
  "src": "/images/weddings/wedding-001.webp",
  "thumbnail": "/images/weddings/thumb-wedding-001.webp",
  "alt": "Couple embracing after a wedding ceremony",
  "featured": true,
  "order": 1,
  "source": {
    "platform": "Unsplash",
    "photographer": "Photographer Name",
    "sourcePage": "SOURCE_PAGE_REFERENCE",
    "licenseNote": "Verify current source terms before production use"
  }
}
```

Do not expose unnecessary source metadata on the public UI.

## 13.6 Important

The 50 internet photos are demonstration content.

Create the architecture so the owner can replace them later by:

1. adding new files under `public/images`
2. editing only `photos.json`

No React component should require editing merely to replace an image.

---

# 14. PHOTOS.JSON MUST BE THE SOURCE OF TRUTH

Create a clean, strongly typed data model.

Example:

```json
{
  "gallery": {
    "categories": [
      "Wedding",
      "Birthday",
      "Anniversary",
      "Couple",
      "Portrait",
      "Family",
      "Events",
      "Nature",
      "Behind the Scenes",
      "Studio"
    ],
    "photos": [
      {
        "id": "wedding-001",
        "category": "Wedding",
        "src": "/images/weddings/wedding-001.webp",
        "thumbnail": "/images/weddings/thumb-wedding-001.webp",
        "alt": "Bride and groom smiling outdoors",
        "featured": true,
        "order": 1
      }
    ]
  }
}
```

Add a TypeScript schema/type for this data.

Validate the JSON/data at runtime in development where practical.

The UI must fail gracefully if an image is missing.

---

# 15. OWNER / PHOTOGRAPHER SECTION

Create an elegant biography section for:

**Sankhadeep**

Role:

**Photographer / Founder, Studio Igloo**

Do not invent biography facts.

Use editable content from configuration:

```json
{
  "photographer": {
    "name": "Sankhadeep",
    "role": "Photographer & Founder",
    "bio": "EDITABLE_BIO",
    "portrait": "/images/behind-the-scenes/photographer.webp"
  }
}
```

Allow multiple profile images if configured.

Presentation idea:

- large portrait
- small handwritten/editorial label
- biography text
- selected image strip
- subtle reveal
- minimal CTA

The photographer section should feel personal, not like a resume page.

---

# 16. STORIES / PHILOSOPHY SECTION

Create an emotional editorial section around why Studio Igloo exists.

Possible content structure:

```text
THE APPROACH

People remember how a moment felt.

We photograph the details,
the energy, the quiet moments
and everything in between.
```

All copy editable in JSON.

Animate the heading line-by-line or word-by-word only when it improves readability.

Do not over-animate long paragraphs.

---

# 17. CONTACT SECTION

Create a premium, simple contact section.

Fields should be configurable.

Suggested fields:

- Name
- Email
- Phone
- Service
- Preferred date (optional)
- Message

Example:

```json
{
  "contact": {
    "enabled": true,
    "fields": [
      {
        "name": "name",
        "label": "Your name",
        "type": "text",
        "required": true
      },
      {
        "name": "email",
        "label": "Email address",
        "type": "email",
        "required": true
      }
    ]
  }
}
```

The form should not look like a generic SaaS form.

Use generous spacing, elegant labels and understated inputs.

Submit button should have a subtle premium interaction.

---

# 18. CONTACT FORM BACKEND — ONLY A CLOUDFLARE PAGES FUNCTION

There is no traditional backend.

Use:

```text
/functions/api/contact.ts
```

or the equivalent current Cloudflare Pages Functions structure.

Cloudflare Pages Functions run server-side on Cloudflare's network and can handle form submissions without a dedicated server.

Use a KV namespace binding such as:

```text
CONTACTS_KV
```

for temporary deduplication state only.

Use Resend for email delivery.

Do NOT expose the Resend API key to the frontend.

---

# 19. CONTACT SUBMISSION LOGIC

Flow:

```text
Visitor submits form
        ↓
Client validation
        ↓
POST /api/contact
        ↓
Server validates body again
        ↓
Check Turnstile
        ↓
Normalize email
        ↓
Hash normalized email with SHA-256
        ↓
Check Cloudflare KV
        ↓
If duplicate within duplicateWindowDays:
    do NOT send email
    return duplicate response
        ↓
Otherwise send email through Resend
        ↓
If email succeeds:
    store only deduplication metadata in KV
        ↓
Return success response
```

The browser should never know:

- Resend API key
- internal KV structure
- internal recipient email unless intentionally public

---

# 20. IMPORTANT CONTACT PRIVACY REQUIREMENT

Do NOT store the full enquiry in KV.

Do not permanently store:

- full name
- phone
- message
- email address in plaintext

The studio receives the enquiry by email.

KV should only contain minimum data needed for duplicate protection, for example:

```json
{
  "hash": "sha256...",
  "submittedAt": 1789640000000,
  "status": "sent"
}
```

The email hash must be derived using the Web Crypto API.

Use a stable key format such as:

```text
contact:<sha256-email>
```

or another clean equivalent.

The exact key structure is implementation detail.

---

# 21. RETENTION CONFIGURATION

Make these configurable:

```json
{
  "contact": {
    "retentionDays": 3,
    "duplicateWindowDays": 3,
    "maxStoredContacts": 30
  }
}
```

Meaning:

- `retentionDays`: how long the temporary deduplication record may exist
- `duplicateWindowDays`: how long the same email is considered already registered
- `maxStoredContacts`: maximum number of recent deduplication records

Default:

```text
retentionDays = 3
duplicateWindowDays = 3
maxStoredContacts = 30
```

Do not hard-code these values inside business logic.

Use Cloudflare KV expiration (`expirationTtl`) where appropriate.

---

# 22. MAX 30 CONTACTS

At any time, the system should aim to keep at most:

```text
maxStoredContacts
```

active recent deduplication records.

When a new unique enquiry is accepted:

1. store the new deduplication record
2. determine the active recent records
3. if the count exceeds `maxStoredContacts`, delete the oldest records first

Do not retain full contact payloads.

Because Cloudflare KV is distributed/eventually consistent, design this cleanup as defensive best-effort housekeeping rather than pretending KV is a transactional relational database.

The duplicate check should prioritize correctness for normal sequential user submissions.

---

# 23. DUPLICATE EMAIL BEHAVIOR

Email normalization should include at minimum:

- trim leading/trailing whitespace
- lowercase

Do not blindly remove punctuation or modify provider-specific addresses such as Gmail plus-addresses unless explicitly configured.

Example:

```text
USER@Example.com
 user@example.com
```

must be treated as the same normalized email.

If the normalized email was already accepted within the configurable duplicate window:

Return a friendly result such as:

```text
You have already sent us an enquiry recently.
We'll get back to you soon.
```

Do not send another email.

The exact user-facing message must come from config.

For privacy, the public response should not reveal whether an arbitrary email has ever existed beyond the submitted email context.

---

# 24. EMAIL CONTENT

Send a professional email to the configured studio recipient.

Subject example:

```text
New Studio Igloo enquiry — {service}
```

Email body should include the submitted fields in a clean layout.

Example structure:

```text
NEW ENQUIRY — STUDIO IGLOO

Name:
Email:
Phone:
Service:
Preferred date:
Message:

Submitted:
```

The email template should be generated server-side.

Escape/sanitize all user-provided values before inserting them into HTML.

Provide a plain-text alternative where practical.

---

# 25. CONTACT ERROR HANDLING

The form must distinguish:

### Success

```text
Thank you. Your enquiry has been received.
```

### Duplicate

```text
You have already sent us an enquiry recently.
```

### Validation error

```text
Please check the highlighted fields.
```

### Temporary server/email problem

```text
We couldn't send your enquiry right now.
Please try again or contact us directly.
```

Never reveal:

- stack traces
- Resend error details
- Cloudflare internals
- KV keys
- secrets
- implementation details

Log useful server-side diagnostics only.

Do not log full message bodies or unnecessary personal data.

---

# 26. BOT PROTECTION

Use Cloudflare Turnstile.

The React client gets the Turnstile token.

The Cloudflare Function validates the token server-side.

The site should also include a simple hidden honeypot field for basic bot filtering.

Make Turnstile configurable:

```json
{
  "contact": {
    "turnstile": {
      "enabled": true
    }
  }
}
```

In local development, allow a safe developer mode where Turnstile may be disabled through a local configuration/secret, but do not accidentally disable it in production.

---

# 27. RATE LIMITING / ABUSE PROTECTION

The contact endpoint is public and must be treated as an internet-facing endpoint.

Implement lightweight configurable rate limiting.

Suggested defaults:

```json
{
  "security": {
    "contactRateLimit": {
      "enabled": true,
      "windowSeconds": 3600,
      "maxRequestsPerWindow": 10
    }
  }
}
```

Use the safest lightweight mechanism available under the chosen Cloudflare architecture.

If using KV for rate limiting, avoid storing raw IP addresses unnecessarily. Hash or otherwise minimize identifiers where practical.

The exact rate limit may be changed later.

---

# 28. SAME-ORIGIN / CORS

The contact endpoint is primarily for:

```text
studioigloo.com
```

Reject unexpected cross-origin requests unless CORS is explicitly configured.

Prefer same-origin requests:

```text
fetch('/api/contact', ...)
```

Do not place permissive:

```text
Access-Control-Allow-Origin: *
```

on the contact endpoint unless there is a specific reason.

Validate:

- method
- content type
- request origin where practical
- body size
- field lengths
- allowed service/category values if configured

---

# 29. INPUT VALIDATION

Server-side validation is mandatory even if client-side validation exists.

Example limits:

```json
{
  "contact": {
    "limits": {
      "nameMax": 100,
      "emailMax": 254,
      "phoneMax": 40,
      "serviceMax": 100,
      "dateMax": 50,
      "messageMax": 3000
    }
  }
}
```

Reject suspiciously large request bodies.

Validate email format sensibly.

Do not over-restrict international phone numbers.

---

# 30. CONFIGURATION ARCHITECTURE

Make as much as reasonably practical configurable.

Create something like:

```text
src/
  config/
    site.json
    theme.json
    sections.json
    contact.json
    animations.json
    footer.json
  data/
    photos.json
```

If a field is safe for the frontend, keep it in JSON/config.

Secrets must NEVER be placed in public JSON.

Secret values belong in:

- Cloudflare environment variables
- Cloudflare secrets
- local `.dev.vars`

Examples of configurable values:

### Site

```json
{
  "siteName": "Studio Igloo",
  "ownerName": "Sankhadeep",
  "tagline": "Stories worth remembering.",
  "description": "Photography by Sankhadeep.",
  "location": "",
  "email": "",
  "phone": "",
  "instagram": "",
  "whatsapp": ""
}
```

### Theme

Control:

- colors
- fonts
- max content width
- border radius
- image radius
- button style
- spacing density
- light/dark preference if implemented
- accent tone

### Sections

Each major section should have:

```json
{
  "enabled": true,
  "order": 1
}
```

The site should allow sections to be hidden/reordered without rewriting the page architecture.

### Gallery

Configurable:

- categories
- featured count
- layout
- lightbox enabled
- hover zoom
- captions
- category filters
- animation intensity
- image loading behavior

### Animations

Configurable:

```json
{
  "smoothScroll": true,
  "parallax": true,
  "textReveal": true,
  "imageReveal": true,
  "cursorEffects": true,
  "pageTransitions": true,
  "hoverEffects": true,
  "animationIntensity": 0.7
}
```

The exact implementation may use more appropriate names.

### Contact

Configurable:

- enabled
- fields
- field labels
- required flags
- retention
- duplicate window
- max stored
- success message
- duplicate message
- failure message
- rate limit
- Turnstile

---

# 31. SECRET CONFIGURATION

Create:

```text
.env.example
.dev.vars.example
```

or the correct Cloudflare development equivalents.

Document required secrets:

```text
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
TURNSTILE_SECRET_KEY=
```

Do not commit real secret values.

Do not put secrets in:

- `site.json`
- `contact.json`
- React code
- `photos.json`
- HTML
- README examples

If Cloudflare Email Sending is used instead of Resend, document the alternative, but use **Resend by default** unless the current Cloudflare setup makes native Email Service clearly simpler.

---

# 32. CLOUDFLARE DEPLOYMENT

The project must be designed for Cloudflare Pages Free.

Use:

```text
Build command:
npm run build

Build output directory:
dist
```

Use `/functions` at the project root for Pages Functions.

Expected conceptual structure:

```text
studio-igloo/
├── functions/
│   └── api/
│       └── contact.ts
├── public/
│   └── images/
├── src/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── wrangler.toml / wrangler.jsonc
├── tailwind config as required
├── .env.example
├── .dev.vars.example
├── photos documentation
└── README.md
```

Cloudflare Pages Functions may be configured with KV bindings via Wrangler configuration or the Cloudflare dashboard.

Use a binding named:

```text
CONTACTS_KV
```

Do not invent a real KV namespace ID.

Place an obvious placeholder and explain in README how the owner should create a KV namespace and bind it.

---

# 33. CLOUDFLARE KV SETUP

README must explain:

1. Create a Cloudflare KV namespace.
2. Bind it to the Pages project as:
   `CONTACTS_KV`
3. Configure production/preview bindings as needed.
4. Add Resend secret.
5. Add Turnstile secret.
6. Set public configuration values as appropriate.
7. Deploy.
8. Attach `studioigloo.com`.

Do not require a paid Cloudflare product for the basic architecture.

Do not require a dedicated server.

---

# 34. RESEND SETUP

Use Resend's API from the Cloudflare Function.

Never call Resend directly from React.

The Worker/Function should read:

```text
env.RESEND_API_KEY
```

The sender and recipient should be configurable through secrets/environment.

README should explain:

1. Create a Resend account.
2. Verify the sending domain.
3. Set the sender address.
4. Add the API key to Cloudflare as a secret.
5. Test the contact endpoint.

Do not put real credentials into Git.

---

# 35. RESPONSIVE DESIGN

Design desktop and mobile together.

Minimum breakpoints:

- mobile
- tablet
- desktop
- wide desktop

Do not merely shrink the desktop design.

Mobile must have intentionally designed composition:

- easier navigation
- simplified cursor effects
- reduced parallax
- touch-friendly buttons
- appropriately sized typography
- readable form
- efficient images
- no horizontal overflow

Test at approximately:

```text
375 × 812
390 × 844
430 × 932
768 × 1024
1024 × 768
1440 × 900
1920 × 1080
```

---

# 36. SCROLL AND MOTION DESIGN

Use modern motion techniques, but prioritize restraint.

Implement where visually useful:

- scroll-triggered reveal
- image clip-path reveal
- slight parallax
- text line reveal
- staggered elements
- scale transitions
- image hover movement
- smooth section transitions
- menu transitions
- lightbox transitions
- subtle cursor interaction

Do not use:

- constant looping animations everywhere
- huge spring effects
- disorienting page jumps
- animation on every word
- 3D effects merely for novelty

Animation intensity must be configurable.

---

# 37. REDUCED MOTION

Respect:

```text
prefers-reduced-motion
```

When enabled:

- disable or minimize parallax
- minimize large transforms
- remove decorative cursor movement
- simplify transitions
- keep the site fully usable

This is mandatory.

---

# 38. CUSTOM CURSOR

Desktop-only optional feature.

Create a subtle custom cursor that may:

- enlarge over images
- show "VIEW"
- show "DRAG"
- subtly follow movement

Do not use it on touch devices.

Disable automatically for users who prefer reduced motion.

Never make the custom cursor interfere with clicking, text selection, keyboard focus, or accessibility.

---

# 39. LIGHTBOX / PHOTO VIEWER

The lightbox should feel like the same brand as the site.

Requirements:

- full-screen overlay
- image-centered composition
- background fade
- close control
- previous/next
- keyboard
- Escape
- swipe
- optional image title/category
- focus handling
- no body scroll while open
- restore scroll/focus when closed

Do not use a default browser-looking modal.

---

# 40. FOOTER

Minimal footer.

Include only configured information:

```text
Studio Igloo
Photography by Sankhadeep
Instagram
Email
Phone
Copyright
```

Do not add a large list of invented links.

Add a subtle back-to-top interaction.

---

# 41. SEO

Implement strong basic SEO.

Configurable:

- title
- description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter/X card values
- theme color

Create:

```text
robots.txt
sitemap.xml
```

Use:

```text
studioigloo.com
```

where appropriate.

Do not fabricate local business information.

Add structured data where useful, but only with known facts.

Possible schema:

- Person
- ProfessionalService / LocalBusiness-style data only if enough factual information exists
- WebSite

Use JSON-LD carefully.

---

# 42. ACCESSIBILITY

Must support:

- semantic headings
- semantic navigation
- keyboard navigation
- visible focus styles
- descriptive button labels
- alt text for all meaningful images
- empty alt for decorative images
- sufficient color contrast
- form labels
- form errors
- lightbox keyboard support
- menu keyboard support
- reduced-motion behavior
- no interaction that depends solely on hover

Do not put important text only into images.

---

# 43. PERFORMANCE TARGETS

Aim for a genuinely fast site.

Important principles:

- static-first
- minimal JavaScript
- code splitting where useful
- lazy-load galleries
- optimize all images
- only preload the hero image
- avoid huge dependencies
- avoid unnecessary re-renders
- avoid scroll listeners that cause layout thrashing
- use Motion efficiently
- use CSS transitions for trivial effects
- compress assets
- avoid autoplay video unless it is optional and genuinely valuable

Target:

- Lighthouse Performance: 90+ where realistically achievable
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+

Do not sacrifice the visual quality merely to hit a synthetic score, but do not ship careless performance problems.

---

# 44. NO HOTLINK DEPENDENCY

The final portfolio page must continue to work if the external image source websites are unavailable.

The 50 temporary photos must be stored locally.

After the initial collection is created, the gallery should reference:

```text
/images/...
```

not external image URLs.

External URLs should only exist in metadata for source attribution/record keeping.

---

# 45. PHOTO REPLACEMENT WORKFLOW

Make it extremely easy for the owner to replace images later.

README must explain:

```text
1. Add the new image to public/images/<category>/
2. Optimize it
3. Add/edit one entry in src/data/photos.json
4. npm run build
5. Deploy
```

The owner must not need to touch React components.

Make it possible to completely replace all 50 images by editing data/assets only.

---

# 46. CONTENT CONFIGURATION WORKFLOW

README must explain how to change:

- studio name
- owner name
- tagline
- hero title
- hero image
- biography
- social links
- categories
- gallery photos
- contact fields
- contact messages
- animation settings
- colors
- typography
- section visibility/order

The owner should not need to understand the React component implementation.

---

# 47. CODE ORGANIZATION

Keep components modular.

Suggested structure:

```text
src/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── gallery/
│   ├── lightbox/
│   ├── contact/
│   ├── sections/
│   └── ui/
├── config/
├── data/
├── hooks/
├── lib/
├── types/
├── styles/
├── App.tsx
└── main.tsx
```

Use clear names.

Avoid huge 1000+ line components.

Avoid duplicated animation code where reusable hooks/components make sense.

---

# 48. SHARED UTILITIES

Create small utilities for:

- image source selection
- category filtering
- smooth-scroll behavior
- reduced-motion detection
- email normalization
- formatting
- safe error mapping
- config validation

Do not create abstractions merely for the sake of abstraction.

---

# 49. SECURITY REQUIREMENTS

Never:

- hard-code secrets
- expose API keys
- trust client validation
- insert raw user input into HTML
- accept unlimited payload sizes
- allow unrestricted CORS
- return internal errors
- store unnecessary personal information
- log full contact messages
- trust a client-provided "admin" flag
- implement fake password protection

The contact API is the only server-side endpoint.

---

# 50. CONTACT DATA LIFECYCLE

The intended privacy lifecycle is:

```text
Form submitted
      ↓
Email sent to studio
      ↓
Only minimal deduplication metadata retained
      ↓
KV record expires after retentionDays
      ↓
No contact database remains
```

If the email service succeeds, do not keep the full enquiry on Cloudflare.

This is a lightweight notification system, not a CRM.

---

# 51. USER EXPERIENCE STATES

Form should have:

- idle
- focused
- validation error
- submitting
- success
- duplicate
- server error
- network failure

Disable the submit button while submitting.

Do not reset the form until an appropriate success state.

Provide visible but elegant feedback.

Avoid giant alert boxes.

---

# 52. INITIAL COPY

Use professional, emotionally resonant photography copy.

Do not make it overly poetic to the point of sounding artificial.

Tone:

- confident
- elegant
- personal
- restrained
- human

The owner should be able to replace all copy through configuration.

---

# 53. PHOTO CURATION SHOULD DRIVE THE DESIGN

When selecting the 50 placeholder photos, do not blindly collect images and then place them into a template.

Select images while considering:

- color harmony
- image orientation
- visual rhythm
- portrait vs landscape balance
- light vs dark balance
- close-up vs wide shot
- emotional variation
- category diversity
- transitions between sections

The gallery should feel art-directed.

The photographs should look like they belong to one visual brand even though they come from different sources.

---

# 54. INITIAL 50 PHOTO MANIFEST

Create a final manifest in:

```text
src/data/photos.json
```

and optionally:

```text
PHOTO_SOURCES.md
```

`PHOTO_SOURCES.md` should document for each photo:

- ID
- local filename
- source platform
- source page/reference
- photographer/creator if available
- notes about current source-use terms

This document is for development/content provenance, not necessarily for the public site.

---

# 55. DO NOT USE AI-GENERATED PHOTOS FOR THE INITIAL PORTFOLIO

The site is intended to look real.

For the initial 50-photo set:

**Prefer real photographs from reputable sources.**

Do not fill the entire portfolio with AI-generated faces or AI-style imagery.

If an image looks obviously AI-generated, reject it.

---

# 56. DESIGN DETAILS TO CONSIDER

Use sophisticated modern web techniques where they genuinely help:

- image masking
- clip-path reveals
- sticky editorial sections
- layered image composition
- subtle horizontal scroll
- text reveal
- image scale-on-scroll
- hover-preview images
- magnetic CTA buttons
- cursor-aware image movement
- section progress indicator
- edge-to-edge mobile images
- vertical rhythm
- asymmetric grids
- editorial captions
- deliberate whitespace

Use these selectively.

A user should notice the **quality**, not the number of effects.

---

# 57. OPTIONAL CREATIVE DETAILS

Consider adding one or more of:

### A. Scroll progress

A thin progress indicator showing where the user is on the page.

### B. Image counter

Example:

```text
03 / 12
```

in a gallery section.

### C. Editorial captions

Small labels such as:

```text
WEDDING / 2026
```

### D. Film-strip transition

A horizontal sequence of photographs moving gently as the user scrolls.

### E. Text-as-image transition

Large text partially overlays photography.

### F. Hover preview category

Hovering "Weddings" reveals a background image.

### G. Magnetic CTA

"Start a conversation" gently follows the pointer on desktop.

Use only the ideas that make the final design better.

---

# 58. DO NOT OVERBUILD

The project must remain maintainable.

Do not add:

- user accounts
- admin dashboard
- database
- booking engine
- payment gateway
- blog CMS
- chat widget
- unnecessary analytics
- complex state-management library
- Redux unless somehow proven necessary
- GraphQL
- service mesh
- Docker
- Kubernetes

This is a premium static portfolio with one serverless email endpoint.

---

# 59. TESTING REQUIREMENTS

Before declaring complete, verify:

## Frontend

- npm install works
- npm run dev works
- npm run build works
- TypeScript passes
- no console errors
- no broken images
- no horizontal overflow
- gallery filtering works
- lightbox works
- mobile menu works
- Escape closes overlays
- keyboard navigation works
- reduced-motion works

## Contact

Test:

1. Valid new email → email sent.
2. Same email immediately again → no second email.
3. Same email within duplicateWindowDays → no second email.
4. Different email → email sent.
5. Invalid email → rejected.
6. Overlong message → rejected.
7. Missing required field → rejected.
8. Turnstile failure → rejected.
9. Email provider failure → friendly error.
10. KV unavailable → graceful error/logging.
11. More than maxStoredContacts → oldest dedup record cleaned.
12. TTL is configured from config, not hard-coded.

## Security

- Resend API key absent from client bundle.
- Turnstile secret absent from client bundle.
- CORS not wide open unnecessarily.
- User input escaped.
- Request size limited.
- Endpoint accepts only intended method/body.
- Secrets not committed.

---

# 60. AUTOMATED VALIDATION

Where practical, create lightweight tests for:

- email normalization
- email hashing
- config validation
- duplicate-window calculation
- expiry behavior
- max-contact cleanup logic
- contact payload validation

Do not introduce a large testing framework solely for ceremony.

Choose a simple current testing setup compatible with Vite/TypeScript if tests are needed.

---

# 61. ACCEPTANCE CRITERIA — VISUAL

The implementation is not finished merely because all components exist.

It is finished when the site feels:

- premium
- photographic
- minimal
- emotionally engaging
- coherent
- intentional
- responsive
- fast
- modern
- real

A reviewer should not look at it and immediately think:

> "This is a generic AI-generated portfolio template."

The photography, typography, spacing, image composition and motion should feel art-directed.

---

# 62. ACCEPTANCE CRITERIA — CONTENT

The initial build must contain exactly:

```text
50 local photographs
```

distributed across multiple photography categories.

The images must:

- exist locally
- load correctly
- have meaningful alt text
- be represented in JSON
- have source metadata
- be optimized
- include both portrait and landscape orientations
- include enough variety to support the layouts

---

# 63. ACCEPTANCE CRITERIA — CONFIGURATION

Changing these settings must NOT require changing React component implementation:

- studio name
- owner name
- tagline
- biography
- hero image
- social links
- categories
- gallery order
- featured status
- animation intensity
- section visibility
- theme colors
- typography selections
- contact retention days
- contact duplicate window
- max stored contacts
- contact messages

---

# 64. ACCEPTANCE CRITERIA — DEPLOYMENT

The repository must be ready for Cloudflare Pages.

README must contain:

- build command
- output directory
- Pages setup
- KV setup
- binding name
- Resend setup
- Turnstile setup
- environment variables/secrets
- custom-domain setup notes
- how to replace photos
- how to edit configuration
- local development instructions
- troubleshooting section

Do not require the owner to know advanced Cloudflare internals.

---

# 65. README QUALITY

The README must be written for a non-expert owner who can:

- edit JSON
- replace images
- run npm commands
- use Cloudflare dashboard
- copy environment variables/secrets

Use screenshots/commands only when useful.

Include an easy "Quick Start" section first.

---

# 66. DEVELOPMENT RULES FOR ANTIGRAVITY

Important:

1. Inspect the project after generating files.
2. Do not stop after scaffolding.
3. Run the application.
4. Fix build errors.
5. Fix TypeScript errors.
6. Verify the actual UI in a browser.
7. Check mobile layout.
8. Test the gallery.
9. Test the lightbox.
10. Test contact form behavior locally.
11. Verify no secrets are present in client output.
12. Verify the build output is suitable for Cloudflare Pages.
13. Improve weak visual sections instead of accepting the first draft.
14. Refactor repeated code.
15. Keep all user-configurable values centralized.
16. Do not ask me unnecessary questions; use the specification and make sensible decisions.
17. When there are multiple technically valid approaches, prefer the one with fewer moving pieces and lower operating cost.

---

# 67. IMPORTANT IMPLEMENTATION PRIORITY

Work in this order:

### Phase 1 — Foundation
- scaffold project
- configure Tailwind
- configure TypeScript
- establish theme/config structure
- establish routing/sections
- establish image data model

### Phase 2 — Visual system
- typography
- color system
- spacing
- buttons
- navigation
- responsive container
- image components

### Phase 3 — Photography experience
- hero
- featured work
- categories
- gallery
- lightbox
- photographer section
- story section
- CTA
- footer

### Phase 4 — Motion
- scroll reveals
- image transitions
- parallax
- menu animation
- hover effects
- lightbox transitions
- reduced-motion fallback

### Phase 5 — Contact
- contact UI
- API Function
- Turnstile
- KV duplicate protection
- Resend integration
- validation
- rate limiting

### Phase 6 — Content
- collect 50 photos
- download
- optimize
- create metadata
- populate `photos.json`
- curate featured selection

### Phase 7 — Quality
- mobile
- accessibility
- SEO
- performance
- tests
- error handling

### Phase 8 — Deployment readiness
- Cloudflare config
- README
- environment example
- KV binding documentation
- final production build

---

# 68. CRITICAL DESIGN PRINCIPLE

Do not treat Studio Igloo as a collection of UI components.

Treat it as an **editorial visual experience**.

Every section should answer:

> What should the visitor feel here?

The site should have rhythm:

```text
quiet
→
impact
→
space
→
emotion
→
visual density
→
space
→
personal story
→
invitation
```

Photography should remain the primary visual language.

---

# 69. FINAL DELIVERABLE

At completion, provide:

1. Fully working React + TypeScript + Vite project.
2. Tailwind-based design system.
3. Motion-driven interactions.
4. Exactly 50 local initial photographs.
5. `photos.json`.
6. Central configuration files.
7. Photographer/about content structure.
8. Contact form UI.
9. Cloudflare Pages Function for contact submissions.
10. Cloudflare KV duplicate-protection logic.
11. Resend email integration.
12. Turnstile protection.
13. Cloudflare deployment configuration.
14. Environment/secret example files.
15. README with setup/deployment instructions.
16. Source-photo provenance file.
17. Clean production build.
18. No admin panel.
19. No traditional database.
20. No exposed secret keys.

---

# 70. FINAL PRODUCT BEHAVIOR

A normal visitor experience should be:

```text
studioigloo.com
     ↓
Beautiful hero
     ↓
Minimal navigation
     ↓
Editorial storytelling
     ↓
Cinematic photography
     ↓
Explore categories
     ↓
Browse gallery
     ↓
Meet Sankhadeep
     ↓
Start a conversation
     ↓
Contact form
     ↓
Turnstile verification
     ↓
Cloudflare Function
     ↓
Duplicate check
     ↓
Email to studio
     ↓
Minimal temporary deduplication record
```

The studio owner experience should be:

```text
Edit JSON
Replace images
Git commit
Deploy
Done
```

No CMS.

No admin dashboard.

No database management.

No server management.

---

# 71. DO NOT FINISH WITH A TEMPLATE

Before considering the task complete, critically inspect the result.

Ask internally:

- Does this look like a premium photography brand?
- Are the photographs the hero of the experience?
- Does the typography have personality?
- Is the whitespace intentional?
- Do the animations feel expensive rather than flashy?
- Does mobile look designed rather than compressed?
- Can the owner replace content without modifying components?
- Is the contact system private and secure?
- Is the Cloudflare deployment genuinely simple?
- Does the site still work if external photo providers are unavailable?
- Are all secrets protected?
- Would I be comfortable showing this as a real Studio Igloo website?

If the answer to any major item is no, improve the implementation before declaring success.

---

# 72. CURRENT TECHNICAL REFERENCE NOTES

Use the latest official documentation available at implementation time for:

- Cloudflare Pages Functions
- Cloudflare KV bindings
- Cloudflare Pages deployment
- Cloudflare Turnstile
- Resend with Cloudflare Workers/Pages Functions
- Motion for React
- Tailwind CSS
- Vite

Do not rely on stale tutorials when current official documentation differs.

---

# 73. START NOW

Do not merely explain how you would build the website.

Actually build the project according to this specification.

Begin with the repository structure, install the required dependencies, implement the visual system, then implement the complete website and serverless contact flow.

Use sensible placeholder values where owner-specific data is unavailable.

Do not fabricate personal facts about Sankhadeep.

For the initial visual dataset, actually source **50 suitable real internet photographs** from reputable sources, store optimized local copies, and wire them through `photos.json`.

The owner will replace those photos later, so optimize the architecture for easy replacement.

The final result must be ready for a Cloudflare Pages deployment.
