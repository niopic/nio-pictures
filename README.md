# NiO Pictures — Website

Cinematic photography website for NiO Pictures, Katy TX.
Built with static HTML/CSS/JS — zero build step, deploys instantly on Cloudflare Pages.

---

## 📁 Project Structure

```
nio-pictures/
├── index.html                          ← Home
├── event-photography-katy-tx.html      ← Event Photography page
├── family-photography-katy-tx.html     ← Family Photography page
├── portfolio.html                      ← Portfolio with filter
├── about.html                          ← About page
├── book.html                           ← Booking page
├── contact.html                        ← Contact page
├── _redirects                          ← Cloudflare routing
│
└── assets/
    ├── css/
    │   ├── global.css      ← Design system, variables, typography
    │   ├── components.css  ← Nav, hero, cards, forms, footer
    │   └── animations.css  ← Scroll reveal, transitions
    ├── js/
    │   ├── main.js         ← Nav, scroll reveal, filter, forms
    │   └── chat-bubble.js  ← NiO Chat bubble
    └── images/
        └── (add your WebP images here — see list below)
```

---

## 🚀 Deploy to Cloudflare Pages

### Option 1: GitHub (Recommended — auto-deploys on push)

1. Push this folder to a GitHub repository
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click **Create a project** → **Connect to Git**
4. Select your GitHub repo
5. Build settings:
   - **Framework preset**: None
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/` (root)
6. Click **Save and Deploy**

Every `git push` to `main` will auto-deploy. ✓

### Option 2: Direct Upload

1. Zip the entire `nio-pictures/` folder
2. Go to Cloudflare Pages → **Create a project** → **Direct Upload**
3. Upload the zip
4. Done — live in ~30 seconds

---

## 🖼️ Images Required

Add your WebP images to `assets/images/`. Recommended sizes below:

| Filename | Usage | Dimensions |
|---|---|---|
| `hero-home.webp` | Home hero background | 1920×1080px |
| `events-panel.webp` | Service split — events | 960×1200px |
| `family-panel.webp` | Service split — family | 960×1200px |
| `about-portrait.webp` | About snippet (home) | 560×700px |
| `about-main.webp` | About page main photo | 560×700px |
| `events-hero.webp` | Event page hero | 1920×900px |
| `family-hero.webp` | Family page hero | 1920×900px |
| `gallery-1.webp` → `gallery-6.webp` | Home featured grid | 800×600 / 400×533 |
| `event-1.webp` → `event-6.webp` | Event page gallery | same as above |
| `family-1.webp` → `family-3.webp` | Family page side grid | various |
| `family-g1.webp` → `family-g6.webp` | Family page gallery | same as gallery |
| `port-e1.webp` → `port-e5.webp` | Portfolio — events | 600×450px |
| `port-f1.webp` → `port-f4.webp` | Portfolio — family | 600×450px |

**Convert to WebP** using [Squoosh](https://squoosh.app/) or:
```bash
# macOS/Linux (requires cwebp)
cwebp -q 85 photo.jpg -o photo.webp
```

---

## 🔗 Key Links (already wired throughout the site)

| Purpose | URL |
|---|---|
| Booking | https://niopictures.pixieset.com/booking/ |
| Gallery | https://niopictures.pixieset.com/ |

---

## 🎨 Brand Colors

| Name | Hex |
|---|---|
| Deep Black | `#161412` |
| Surface | `#262320` |
| Surface 2 | `#302C29` |
| Gold (accent) | `#C5A572` |
| Gold Dark | `#8B6A35` |
| Violet | `#9B7FD4` |
| Cream (text) | `#F0E8D8` |
| Muted Text | `#A89880` |

---

## 🔍 SEO

Each page includes:
- Unique `<title>` + `<meta description>`
- Semantic HTML (`h1`, `h2`, `h3`)
- JSON-LD `LocalBusiness` structured data
- Open Graph + Twitter Card tags
- `<link rel="canonical">`
- Image `alt` attributes with geo/service keywords

**To add Google Analytics**, paste your GA4 snippet before `</head>` in each HTML file.

---

## 📝 To Customize

- **Business name**: Search/replace `NiO Pictures` across all files
- **Location**: Update `Katy, Texas` references as needed
- **Testimonials**: Edit the `testimonial-card` sections in `index.html`
- **Portfolio items**: Update titles and gallery links in `portfolio.html`
- **About copy**: Edit the bio text in `about.html` and `index.html`

---

## ✅ Performance Checklist

- [ ] Add all WebP images to `assets/images/`
- [ ] All images use `loading="lazy"` ✓ (already set)
- [ ] All images have `width` + `height` attributes ✓
- [ ] Fonts load via Google Fonts with `display=swap` ✓
- [ ] No JavaScript frameworks — zero bundle overhead ✓
- [ ] Cloudflare CDN handles edge caching automatically ✓
