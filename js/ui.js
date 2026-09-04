/* ============================================================================
   UI — shared runtime: icons, header/footer, product cards, animations.
   Loaded on every page after config.js and store.js.
   ============================================================================ */

(function () {
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  // Pages in /pages need '../' in front of every root-relative asset path.
  const DEPTH = /\/pages\//.test(location.pathname) ? '../' : '';
  const url = p => (/^(https?:|mailto:|tel:|#)/.test(p) ? p : DEPTH + p);

  // ---- icons (inline, so no icon font request) --------------------------
  const ICON = {
    search:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
    user:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.4-3.6 4.2-5.2 7.5-5.2S18.1 16.4 19.5 20"/></svg>',
    cart:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 001.6 1.3h8.5a1.6 1.6 0 001.6-1.2L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/></svg>',
    burger:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z"/></svg>',
    starO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3.4l2.7 5.5 6 .8-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6L3.3 9.7l6-.8z"/></svg>',
    diamond:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l4.5 5.2L12 21 7.5 8.2z"/><path d="M3.5 8.2h17"/></svg>',
    bolt:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2L5 13.4h5.2L9.4 22 19 10.2h-5.4z"/></svg>',
    cod:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2.5" y="6" width="19" height="12" rx="2.4"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/></svg>',
    lock:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.2"/><path d="M8.2 10.5V8a3.8 3.8 0 017.6 0v2.5"/></svg>',
    return:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 12a8 8 0 118 8"/><path d="M4 6v6h6"/></svg>',
    truck:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7h11v10h-11z"/><path d="M13.5 10.5H18l3 3V17h-7.5z"/><circle cx="6.5" cy="19" r="1.6"/><circle cx="17.5" cy="19" r="1.6"/></svg>',
    check:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>',
    plus:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    x:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M9 7V4.8h6V7M6.5 7l1 13h9l1-13"/></svg>',
    eye:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>',
    wa:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.8 9.8 0 00-8.4 14.9L2 22l5.3-1.5A9.8 9.8 0 1012 2zm5 13.4c-.2.6-1.2 1.2-1.7 1.2-1.6.1-3.6-1.1-5-2.6-1.1-1.2-2-2.8-2-4 0-.6.4-1.5 1-1.8.3-.2.9-.2 1.1.1l.9 1.5c.1.3 0 .5-.2.7l-.4.5c-.2.2-.2.4 0 .7.4.7 1.6 1.9 2.3 2.2.3.1.5.1.7-.1l.5-.5c.2-.2.4-.3.7-.1l1.5.9c.4.2.4.7.1 1.3z"/></svg>',
    phone:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 3.5h3l1.5 4L7.8 9.2a11.5 11.5 0 007 7l1.7-1.7 4 1.5v3a1.5 1.5 0 01-1.7 1.5C11.6 19.7 4.3 12.4 3.5 5.2A1.5 1.5 0 015 3.5z"/></svg>',
    mail:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.2"/><path d="M3 6.5l9 6.2 9-6.2"/></svg>',
    msg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5A8.4 8.4 0 013 16.2V21l4.4-1.6A8.5 8.5 0 1121 11.5z"/></svg>',
    fb:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.5c-.8-.1-1.7-.2-2.5-.2-2.6 0-4.3 1.6-4.3 4.4v2.2H7.2V13h2.3v8z"/></svg>',
    ig:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.4"/><circle cx="17" cy="7" r="1"/></svg>',
    yt:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.3 8.2a2.6 2.6 0 00-1.8-1.8C17.8 6 12 6 12 6s-5.8 0-7.5.4A2.6 2.6 0 002.7 8.2C2.3 9.9 2.3 12 2.3 12s0 2.1.4 3.8a2.6 2.6 0 001.8 1.8C6.2 18 12 18 12 18s5.8 0 7.5-.4a2.6 2.6 0 001.8-1.8c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8zM10.2 15.1V8.9l5.3 3.1z"/></svg>',
    arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5"/></svg>',
    chat:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  };

  // ---- number helpers ---------------------------------------------------
  const bn = s => String(s).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);
  const useBn = () => CONFIG.brand.banglaNumerals;
  const N  = v => (useBn() ? bn(v) : String(v));
  const money = v => CONFIG.brand.currency + N(Number(v).toLocaleString('en-IN'));

  function stars(rating) {
    let out = '<span class="stars" aria-hidden="true">';
    for (let i = 1; i <= 5; i++) out += (i <= Math.round(rating) ? ICON.star : ICON.starO);
    return out + '</span>';
  }
  const discountPct = p => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);

  // ---- CSS variables from CONFIG ---------------------------------------
  function paintTokens() {
    const r = document.documentElement.style;
    const c = CONFIG.colors;
    r.setProperty('--c-ink', c.ink);         r.setProperty('--c-brand', c.brand);
    r.setProperty('--c-brand-deep', c.brandDeep); r.setProperty('--c-gold', c.gold);
    r.setProperty('--c-paper', c.paper);     r.setProperty('--c-surface', c.surface);
    r.setProperty('--c-line', c.line);       r.setProperty('--c-muted', c.muted);
    r.setProperty('--c-sale', c.sale);       r.setProperty('--c-success', c.success);
  }

  // ---- announcement bar ------------------------------------------------
  function announceBar() {
    const a = CONFIG.announcement; if (!a.enabled) return '';
    const txt = a.textBn.replace('%DISCOUNT%', a.discount).replace('%AMOUNT%', N(a.amount.toLocaleString('en-IN')));
    const one = `<span class="announce__item">${ICON.diamond}<span>${txt}</span></span>`;
    return `<div class="announce" role="region" aria-label="Offer">
      <div class="announce__track" style="--speed:${a.speedSeconds}s">${one.repeat(8)}</div>
    </div>`;
  }

  // ---- header ----------------------------------------------------------
  function header(active) {
    const cats = CONFIG.nav.categories.map(slug => {
      const c = CONFIG.categories.find(x => x.slug === slug); if (!c) return '';
      return `<li><a href="${url('pages/shop.html')}?cat=${c.slug}"${active === c.slug ? ' aria-current="page"' : ''}>${c.bn}</a></li>`;
    }).join('');
    const extras = CONFIG.nav.extras.map(e =>
      `<li><a href="${url(e.href)}">${e.labelBn}</a></li>`).join('');

    return `${announceBar()}
    <header class="site-header">
      <div class="wrap header__main">
        <a class="brand" href="${url('index.html')}" aria-label="${CONFIG.brand.name} home">
          <img src="${url(CONFIG.brand.logo)}" alt="${CONFIG.brand.name}" width="120" height="32">
        </a>
        <form class="header__search" role="search" action="${url('pages/shop.html')}" method="get">
          <label class="sr" for="q">পণ্য খুঁজুন</label>
          <input id="q" name="q" type="search" placeholder="পণ্য খুঁজুন — ইয়ারবাড, ওয়াচ, চার্জার…" autocomplete="off">
          <button type="submit" aria-label="খুঁজুন">${ICON.search}</button>
        </form>
        <div class="header__acts">
          <a class="icon-btn" href="${url('pages/account.html')}" aria-label="আমার অ্যাকাউন্ট">${ICON.user}</a>
          <a class="icon-btn" href="${url('pages/cart.html')}" aria-label="কার্ট" data-cart-link>
            ${ICON.cart}<span class="icon-btn__count" data-cart-count>০</span>
          </a>
          <button class="icon-btn burger" aria-label="মেনু" aria-expanded="false" data-burger>${ICON.burger}</button>
        </div>
      </div>
      <nav class="header__nav" aria-label="ক্যাটাগরি" data-nav>
        <ul class="wrap">${cats}${extras}</ul>
      </nav>
    </header>`;
  }

  // ---- footer ----------------------------------------------------------
  function footer() {
    const cats = CONFIG.categories.map(c =>
      `<li><a href="${url('pages/shop.html')}?cat=${c.slug}">${c.bn}</a></li>`).join('');
    const cols = (CONFIG.footer && CONFIG.footer.columns) || [];
    const colHtml = cols.map(col =>
      `<div><h4>${col.title}</h4><ul>${(col.links || []).map(l =>
        `<li><a href="${url(l.href)}">${l.label}</a></li>`).join('')}</ul></div>`
    ).join('');
    return `<footer class="site-footer">
      <div class="wrap footer__grid">
        <div class="footer__brand">
          <img src="${url(CONFIG.brand.logo)}" alt="${CONFIG.brand.name}" width="120" height="32">
          <p>${CONFIG.brand.taglineBn}</p>
          <div class="footer__pay">
            <span>bKash</span><span>Nagad</span><span>Rocket</span><span>Visa</span><span>Mastercard</span><span>SSLCommerz</span>
          </div>
          <div class="footer__social">
            <a href="${CONFIG.social.facebook}" aria-label="Facebook">${ICON.fb}</a>
            <a href="${CONFIG.social.instagram}" aria-label="Instagram">${ICON.ig}</a>
            <a href="${CONFIG.social.youtube}" aria-label="YouTube">${ICON.yt}</a>
            <a href="https://wa.me/${CONFIG.contact.whatsapp}" aria-label="WhatsApp">${ICON.wa}</a>
          </div>
        </div>
        <div><h4>ক্যাটাগরি</h4><ul>${cats}</ul></div>
        ${colHtml}
        <div><h4>যোগাযোগ</h4><ul>
          <li><a href="tel:${CONFIG.contact.phone}">${ICON.phone} ${CONFIG.contact.phoneLabel}</a></li>
          <li><a href="https://wa.me/${CONFIG.contact.whatsapp}">${ICON.wa} WhatsApp</a></li>
          <li><a href="mailto:${CONFIG.contact.email}">${ICON.mail} ${CONFIG.contact.email}</a></li>
          <li>${CONFIG.contact.address}</li>
          <li>${CONFIG.contact.hours}</li>
        </ul></div>
      </div>
      <div class="wrap footer__bar">
        <span>© ${new Date().getFullYear()} ${CONFIG.brand.name}. সর্বস্বত্ব সংরক্ষিত।</span>
        <span>Made in Gournadi, Barishal</span>
      </div>
    </footer>`;
  }

  // ---- legal page renderer (returns / privacy / terms) -----------------
  function legal(key) {
    const L = CONFIG.legal[key]; if (!L) return '';
    const sections = (L.sections || []).map(s =>
      `<h3 id="${slugify(s.h)}">${s.h}</h3><p>${s.p}</p>`).join('');
    const faq = (L.faq || []).map((f, i) =>
      `<div class="faq__item"><button class="faq__q" aria-expanded="false"><span>${f.q}</span><i>${ICON.plus}</i></button><div class="faq__a"><div class="faq__a-inner"><p>${f.a}</p></div></div></div>`).join('');
    return `
      <div class="legal">
        <div class="legal__intro">
          <p>${L.intro}</p>
          <small>সর্বশেষ আপডেট: ${L.updated}</small>
        </div>
        <div class="legal__body">${sections}</div>
        ${faq ? `<h2 style="margin-top:36px">প্রায়শই জিজ্ঞাসিত</h2><div class="faq">${faq}</div>` : ''}
      </div>`;
  }
  function slugify(s) { return String(s).replace(/[^\wঀ-৿]+/g, '-').replace(/^-|-$/g, '').toLowerCase(); }

  // ---- blog helpers ----------------------------------------------------
  function blogCard(p) {
    return `<a class="post-card" href="${url('pages/blog-post.html')}?slug=${encodeURIComponent(p.slug)}">
      <div class="post-card__media"><img src="${url(p.image)}" alt="${p.title}" loading="lazy"></div>
      <div class="post-card__body">
        <span class="post-card__cat">${p.cat}</span>
        <h3 class="post-card__title">${p.title}</h3>
        <p class="post-card__excerpt">${p.excerpt}</p>
        <div class="post-card__meta">
          <span>${p.author}</span><span>·</span><span>${p.read} মিনিট পড়া</span>
        </div>
      </div>
    </a>`;
  }
  function blogPostBody(p) {
    const blocks = (p.body || []).map(b => b.h
      ? `<h3>${b.h}</h3>`
      : `<p>${b.p}</p>`).join('');
    const tags = (p.tags || []).map(t => `<span class="chip">#${t}</span>`).join(' ');
    return `<div class="post-body">
      <p class="post-body__lead">${p.excerpt}</p>
      ${blocks}
      <div class="post-body__tags">${tags}</div>
    </div>`;
  }

  // ---- product card ----------------------------------------------------
  function card(p) {
    const pct = discountPct(p);
    const out = (p.stock || 0) <= 0;
    const href = `${url('pages/product.html')}?id=${encodeURIComponent(p.id)}`;
    return `<article class="card gborder" data-id="${p.id}">
      <a class="card__media" href="${href}" aria-label="${p.nameEn}">
        <img class="main" src="${url(p.images[0])}" alt="${p.nameEn}" width="800" height="800" loading="lazy">
        <img class="alt" src="${url(p.images[1] || p.images[0])}" alt="" width="800" height="800" loading="lazy" aria-hidden="true">
        <div class="card__flags">
          ${pct ? `<span class="badge badge--sale">−${N(pct)}%</span>` : ''}
          ${p.isNew ? '<span class="badge badge--new">নতুন</span>' : ''}
          ${out ? '<span class="badge badge--out">স্টক শেষ</span>' : ''}
        </div>
        <span class="card__quick">${ICON.eye} বিস্তারিত দেখুন</span>
      </a>
      <div class="card__body">
        <span class="card__brand">${p.brand}</span>
        <a class="card__name" href="${href}">${p.nameBn}</a>
        <span class="card__rating">${stars(p.rating)} ${N(p.rating.toFixed(1))} <span>(${N(p.reviews)})</span></span>
        <div class="card__price">
          <span class="price">${money(p.price)}</span>
          ${p.oldPrice ? `<span class="price price--old">${money(p.oldPrice)}</span>` : ''}
        </div>
      </div>
      <div class="card__foot">
        ${out
          ? '<span class="btn btn--ghost btn--block" aria-disabled="true">স্টক শেষ</span>'
          : `<button class="btn btn--primary btn-runner" data-add="${p.id}"><span>কার্টে যোগ করুন</span></button>`}
      </div>
    </article>`;
  }

  // ---- countdown -------------------------------------------------------
  function timerMarkup(opts) {
    const o = opts || {};
    return `<div class="timer ${o.dark ? 'timer--dark' : ''}" data-timer="${CONFIG.flashSale.endsAt}">
      ${o.note === false ? '' : `<span class="timer__note">${ICON.bolt}${CONFIG.flashSale.noteBn} — ${CONFIG.flashSale.noteEn}</span>`}
      <div class="timer__cells">
        <span class="timer__cell"><b class="timer__n" data-d>০০</b><span class="timer__l">দিন</span></span>
        <span class="timer__cell"><b class="timer__n" data-h>০০</b><span class="timer__l">ঘণ্টা</span></span>
        <span class="timer__cell"><b class="timer__n" data-m>০০</b><span class="timer__l">মিনিট</span></span>
        <span class="timer__cell"><b class="timer__n" data-s>০০</b><span class="timer__l">সেকেন্ড</span></span>
      </div>
    </div>`;
  }

  function runTimers() {
    const nodes = $$('[data-timer]'); if (!nodes.length) return;
    const pad = v => N(String(v).padStart(2, '0'));
    const tick = () => {
      nodes.forEach(n => {
        const end = new Date(n.dataset.timer).getTime();
        let left = Math.max(0, end - Date.now());
        const d = Math.floor(left / 864e5); left -= d * 864e5;
        const h = Math.floor(left / 36e5);  left -= h * 36e5;
        const m = Math.floor(left / 6e4);   left -= m * 6e4;
        const s = Math.floor(left / 1e3);
        const set = (sel, v) => { const el = $(sel, n); if (el) el.textContent = pad(v); };
        set('[data-d]', d); set('[data-h]', h); set('[data-m]', m); set('[data-s]', s);
      });
    };
    tick(); setInterval(tick, 1000);
  }

  // ---- scroll counters -------------------------------------------------
  function runCounters() {
    const nodes = $$('[data-count]'); if (!nodes.length) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const render = (el, v) => {
      const dec = el.dataset.decimal === 'true';
      el.textContent = N(dec ? v.toFixed(1) : Math.round(v).toLocaleString('en-IN')) + (el.dataset.suffix || '');
    };
    const animate = el => {
      const target = parseFloat(el.dataset.count);
      if (reduce) return render(el, target);
      const dur = 1500, t0 = performance.now();
      const step = t => {
        const k = Math.min(1, (t - t0) / dur);
        render(el, target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    }), { threshold: .4 });
    nodes.forEach(n => io.observe(n));
  }

  // ---- typing headline -------------------------------------------------
  function typeLine(el, phrases) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = phrases[0]; return; }
    let pi = 0, ci = 0, deleting = false;
    const caret = document.createElement('i'); caret.className = 'caret';
    const text  = document.createElement('span');
    el.textContent = ''; el.append(text, caret);
    const loop = () => {
      const word = phrases[pi];
      ci += deleting ? -1 : 1;
      text.textContent = word.slice(0, ci);
      let wait = deleting ? 34 : 62;
      if (!deleting && ci === word.length) { wait = 1700; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 320; }
      setTimeout(loop, wait);
    };
    setTimeout(loop, 500);
  }

  // ---- toast -----------------------------------------------------------
  function toast(msg, icon) {
    let host = $('.toasts');
    if (!host) { host = document.createElement('div'); host.className = 'toasts'; host.setAttribute('aria-live','polite'); document.body.append(host); }
    const t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = (icon || ICON.check) + '<span>' + msg + '</span>';
    host.append(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; }, 2400);
    setTimeout(() => t.remove(), 2750);
  }

  // ---- cart badge ------------------------------------------------------
  function paintCartCount() {
    const c = Store.cart.count();
    $$('[data-cart-count]').forEach(n => {
      n.textContent = N(c);
      n.style.display = c ? '' : 'none';
    });
  }

  // ---- connect hub -----------------------------------------------------
  function connectHub() {
    const h = CONFIG.connectHub; if (!h.enabled) return;
    const map = {
      whatsapp: v => ({ href:'https://wa.me/' + v, icon:ICON.wa,    label:'WhatsApp' }),
      phone:    v => ({ href:'tel:' + v,           icon:ICON.phone, label:'কল করুন' }),
      messenger:v => ({ href:v,                    icon:ICON.msg,   label:'Messenger' }),
      email:    v => ({ href:'mailto:' + v,        icon:ICON.mail,  label:'ইমেইল' }),
    };
    const items = h.items.filter(i => i.enabled && map[i.id]).map(i => {
      const m = map[i.id](i.value);
      return `<a class="hub__item" href="${m.href}" target="_blank" rel="noopener">${m.icon}<span>${m.label}</span></a>`;
    }).join('');
    if (!items) return;
    const el = document.createElement('div');
    el.className = 'hub'; el.dataset.open = 'false';
    el.innerHTML = `<div class="hub__list">${items}</div>
      <button class="hub__toggle" aria-expanded="false" aria-label="যোগাযোগের অপশন">${ICON.chat}</button>`;
    document.body.append(el);
    const btn = $('.hub__toggle', el);
    btn.addEventListener('click', () => {
      const open = el.dataset.open !== 'true';
      el.dataset.open = String(open);
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', e => {
      if (!el.contains(e.target)) { el.dataset.open = 'false'; btn.setAttribute('aria-expanded','false'); }
    });
  }

  // ---- accordion -------------------------------------------------------
  function bindAccordion(root) {
    $$('.faq__q', root || document).forEach(q => {
      q.addEventListener('click', () => {
        const open = q.getAttribute('aria-expanded') === 'true';
        const panel = q.nextElementSibling;
        q.setAttribute('aria-expanded', String(!open));
        panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
      });
    });
  }

  // ---- global mount ----------------------------------------------------
  function mount(opts) {
    opts = opts || {};
    paintTokens();
    const h = $('[data-header]'); if (h) h.innerHTML = header(opts.activeCat);
    const f = $('[data-footer]'); if (f) f.innerHTML = footer();

    // burger
    const burger = $('[data-burger]'), nav = $('[data-nav]');
    if (burger && nav) burger.addEventListener('click', () => {
      const open = nav.dataset.open !== 'true';
      nav.dataset.open = String(open);
      burger.setAttribute('aria-expanded', String(open));
    });

    // keep the search box filled from ?q=
    const q = new URLSearchParams(location.search).get('q');
    if (q && $('#q')) $('#q').value = q;

    paintCartCount();
    document.addEventListener('cart:change', paintCartCount);

    // add-to-cart, delegated across every page
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-add]'); if (!b) return;
      e.preventDefault();
      const p = Store.findProduct(b.dataset.add); if (!p) return;
      if (p.variants && p.variants.length) { UI.popupCheckout(p.id); return; }
      Store.cart.add(p.id, '', 1);
      toast(p.nameBn + ' কার্টে যোগ হয়েছে');
    });

    runTimers(); runCounters(); connectHub(); bindAccordion();
  }

  window.UI = {
    $, $$, url, ICON, N, money, stars, discountPct, card, timerMarkup,
    toast, mount, bindAccordion, typeLine, runTimers, runCounters, paintCartCount,
    legal, blogCard, blogPostBody, slugify,
  };
})();
