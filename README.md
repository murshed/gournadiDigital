# Gournadi Digital — Storefront

A static, zero-build e-commerce storefront for a Bangladeshi gadget shop. Single folder, vanilla HTML/CSS/JS, drop-in product SVGs, edit one config file to change the whole site.

[**Live demo →**](https://murshed.github.io/gournadiDigital/) &nbsp;·&nbsp; [**Buy a custom setup →**](https://github.com/murshed) &nbsp;·&nbsp; [**Report a bug →**](../../issues)

---

## Why this exists

Most "shop" templates you find online are either heavy React/Next.js stacks or ugly WooCommerce themes. This is a static storefront that:

- **Loads instantly** — no bundler, no framework, no jQuery.
- **Renders in plain Bangla + English** — typography from Google Fonts (Plus Jakarta Sans + Noto Serif Bengali).
- **Edits in one file** — `js/config.js` is the single source of truth for products, prices, coupons, delivery zones, payment methods, blog posts, and legal copy.
- **Works without a backend** — cart, coupons, totals, and order capture all run client-side. Drop in your own API when you outgrow it.
- **Mobile-first** — tested down to 360px, touch-friendly drawers and bottom bars.

## Quick start

```bash
git clone https://github.com/murshed/gournadiDigital.git
cd gournadiDigital
python3 -m http.server 8000
# open http://localhost:8000
```

That's it. No `npm install`, no build step.

## Project structure

```
gournadiDigital/
├── index.html              # Homepage
├── pages/                  # shop, product, cart, checkout, thank-you, blog, blog-post, contact, returns, privacy, terms
├── js/
│   ├── config.js           # ⭐ Edit this file to change anything
│   ├── store.js            # Cart, totals, coupons, order capture
│   ├── ui.js               # Header, footer, product cards, animations
│   ├── home.js             # Hero carousel + typing headline
│   └── shop/product/cart/checkout/popup.js
├── css/style.css           # Tokens, components, responsive, motion
└── assets/                 # logo, banners, categories, brands, products
```

See [Customize](#customize) below to make it yours.

## Features

### Storefront
- 12-product catalog with hover image swap, quick-view, gradient hairline borders
- Hero carousel with rotating typing headline (Bangla + English phrases)
- Flash sale countdown, animated marquee brand strip, scroll-triggered stat counters
- 6 category landing pages, 8 brand logos, 4 customer reviews, 5-question FAQ
- Responsive 4 → 2 → 1 product grid, mobile drawer nav, sticky bottom action bar

### Cart & checkout
- Persistent cart (`localStorage`)
- Coupon engine: percent, fixed, free-delivery, with min subtotal + usage limits
- Auto-discounts (e.g. 3+ items → 10% off, 5+ → 15% off) — no code needed
- 5 payment methods (COD, bKash, Nagad, Rocket, card/SSLCommerz) with per-gateway charges
- 3 delivery zones (Inside Dhaka, Dhaka suburb, Outside Dhaka) with ETAs
- Free-delivery threshold + per-zone charges
- Order capture writes to `localStorage` and shows in admin-like console (replace with your API)
- Incomplete-order capture: if a customer abandons checkout, the popup nudges them to finish

### Content
- Blog index with category filter, sidebar (categories, recent, CTA)
- Blog post template with share, related posts, hero image, author/date/read-time
- Contact page: 4 contact cards, hours (today highlighted), address card, social row, pre-filled WhatsApp form (no backend)
- Legal: রিটার্ন পলিসি, প্রাইভেসি, শর্তাবলি — with TOC, accordion FAQ, and update date

### UX polish
- Animated gradient-runner CTA border, glassmorphic header, soft elevation on hover
- Accessible: keyboard nav, ARIA labels, reduced-motion support, semantic HTML
- Toast notifications, connect hub (floating quick-contacts), auto popup

## Customize

Open [`js/config.js`](js/config.js) — every line you need to change is in there.

| What you want to change | Where |
|---|---|
| Brand name, logo, currency | `brand` |
| Site colors (whole site follows) | `colors` |
| Announcement bar text + scroll speed | `announcement` |
| Flash sale end time | `flashSale.endsAt` (ISO with `+06:00` offset) |
| Phone, email, address, hours, social links | `contact` / `social` |
| Delivery zones + charges + free threshold | `delivery` |
| Checkout fields (add/remove/reorder) | `checkoutFields` |
| Payment methods + per-gateway % charge | `payments.methods` |
| Coupons (code, type, value, limits) | `coupons` |
| Auto-discounts (no code needed) | `autoDiscounts` |
| Categories + brand logos | `categories` / `brands` |
| Reviews, FAQ, hero slides, footer columns | top-level arrays |
| **Products** (the catalog) | `products[]` — 12 items, see comments |
| **Blog posts** | `blog.posts[]` — slug, image, body blocks |
| **Legal copy** | `legal.{returns,privacy,terms}` |

Products use plain SVG placeholders. Replace `assets/products/p*.svg` with your own (any image format works — just update the path in `products[].images[]`).

## Deploy

### GitHub Pages (one command, after pushing)
```bash
# Settings → Pages → Source: Deploy from branch → main → / (root)
# Your site is live at https://<user>.github.io/gournadiDigital/
```

### Netlify / Vercel / Cloudflare Pages
- **Build command:** *(none — leave empty)*
- **Publish directory:** `/` (project root)
- Drag-and-drop also works on Netlify.

### Custom domain
Drop a `CNAME` file at the repo root with your domain. GitHub Pages picks it up automatically.

## Phase 2 (when you add a backend)

The front-end is already wired for these — config keys exist, no refactor needed:

- **Order Guard / fraud heuristic** — `CONFIG.security.vpnRanges` placeholder
- **Courier APIs** (Pathao, Steadfast, RedX) — `CONFIG.courier` placeholder
- **Live chat** — connect-hub component can host a WebSocket widget
- **Admin panel** — all data lives in `config.js`; an admin would just write to that file
- **Order analytics** — `Store.orders` already logs to `localStorage`; replace with fetch()
- **Invoice PDF** — pull from `Store.placeOrder()` payload
- **Connect Hub** — already shipped (floating WhatsApp/phone/Messenger/email)

## Contributing

PRs welcome. Keep changes surgical — this is intentionally a small codebase. If you're adding a feature that needs a build step, please open an issue first to discuss.

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, sell sites built on it. Attribution appreciated but not required.

## Credits

- Fonts: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [Noto Serif Bengali](https://fonts.google.com/noto/specimen/Noto+Serif+Bengali)
- Product images: SVG placeholders bundled in the repo — replace with your own
- Built by [murshed](https://github.com/murshed)
