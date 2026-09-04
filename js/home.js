/* ============================================================================
   HOMEPAGE — fills every data-* slot in index.html from CONFIG.
   ============================================================================ */

(function () {
  const { $, $$, ICON, N, money, card, stars, timerMarkup } = UI;

  // ---- hero ------------------------------------------------------------
  function hero() {
    const host = $('[data-hero]'), dots = $('[data-hero-dots]');
    if (!host) return;
    const slides = CONFIG.hero.slides;

    host.innerHTML = slides.map((s, i) => `
      <div class="hero__slide" data-active="${i === 0}" style="background:${s.bg}" role="tabpanel">
        <div class="hero__inner">
          <div>
            <span class="hero__eyebrow">${ICON.bolt} ${CONFIG.flashSale.headingBn} চলছে</span>
            <h1 class="hero__title">
              <span class="l1">${s.line1Bn}</span>
              <span class="l2" data-type="${i}"></span>
            </h1>
            <p class="hero__text">অরিজিনাল পণ্য, ক্যাশ অন ডেলিভারি আর ৭ দিনের রিটার্ন — তিনটাই একসাথে।</p>
            <div class="hero__cta">
              <a class="btn btn--gold btn--lg btn-runner" href="pages/shop.html"><span>${s.ctaBn}</span></a>
              <a class="btn btn--ghost btn--lg" href="#flash" style="color:#fff;border-color:rgba(255,255,255,.28)">ফ্ল্যাশ সেল</a>
            </div>
            <div class="hero__timer">${timerMarkup({ dark: true })}</div>
          </div>
          <div class="hero__img gborder--gold">
            <img src="${s.image}" alt="" width="1600" height="900"${i ? ' loading="lazy"' : ''}>
          </div>
        </div>
      </div>`).join('');

    dots.innerHTML = slides.map((s, i) =>
      `<button role="tab" aria-selected="${i === 0}" aria-label="ব্যানার ${N(i + 1)}"></button>`).join('');

    // typing line per slide
    slides.forEach((s, i) => UI.typeLine($(`[data-type="${i}"]`), s.line2));

    let idx = 0;
    const show = n => {
      idx = (n + slides.length) % slides.length;
      $$('.hero__slide', host).forEach((el, i) => el.dataset.active = String(i === idx));
      $$('button', dots).forEach((b, i) => b.setAttribute('aria-selected', String(i === idx)));
    };
    $$('button', dots).forEach((b, i) => b.addEventListener('click', () => { show(i); clearInterval(auto); }));
    let auto = setInterval(() => show(idx + 1), 7000);
    UI.runTimers();
  }

  // ---- stats -----------------------------------------------------------
  function statsRow() {
    const host = $('[data-stats]'); if (!host) return;
    host.innerHTML = CONFIG.stats.map(s => `
      <div class="stat">
        <div class="stat__n">
          <span data-count="${s.value}" data-decimal="${!!s.decimal}" data-suffix="${s.decimal ? '★' : ''}">০</span>${s.decimal ? '' : '<span class="plus">+</span>'}
        </div>
        <div class="stat__l">${s.bn}</div>
      </div>`).join('');
    UI.runCounters();
  }

  // ---- categories ------------------------------------------------------
  function cats() {
    const host = $('[data-cats]'); if (!host) return;
    host.innerHTML = CONFIG.categories.map(c => {
      const n = CONFIG.products.filter(p => p.category === c.slug).length;
      return `<a class="cat" href="pages/shop.html?cat=${c.slug}">
        <img src="${c.image}" alt="" width="64" height="64" loading="lazy">
        <b>${c.bn}</b><span>${N(n)} টি পণ্য</span>
      </a>`;
    }).join('');
  }

  // ---- product rails ---------------------------------------------------
  function rails() {
    const flash = CONFIG.products.filter(p => p.flash);
    const best  = CONFIG.products.filter(p => p.isFeatured).slice(0, 8);
    const fresh = CONFIG.products.filter(p => p.isNew).slice(0, 8);
    const put = (sel, list) => { const h = $(sel); if (h) h.innerHTML = list.map(card).join(''); };
    put('[data-flash-products]', flash);
    put('[data-best]', best);
    put('[data-new]', fresh);
  }

  // ---- timers in flash + promo ----------------------------------------
  function timers() {
    const f = $('[data-flash-timer]'); if (f) f.innerHTML = timerMarkup();
    const p = $('[data-promo-timer]'); if (p) p.innerHTML = timerMarkup({ dark: true });
    UI.runTimers();
  }

  // ---- brand marquee ---------------------------------------------------
  function brands() {
    const host = $('[data-brands]'); if (!host) return;
    const one = CONFIG.brands.map(b =>
      `<a class="marquee__item" href="pages/shop.html?brand=${encodeURIComponent(b.name)}" aria-label="${b.name}">
        <img src="${b.logo}" alt="${b.name}" width="200" height="80" loading="lazy">
      </a>`).join('');
    host.innerHTML = `<div class="marquee__track" style="--speed:42s">${one}${one}</div>`;
  }

  // ---- trust badges ----------------------------------------------------
  function trust() {
    const host = $('[data-trust]'); if (!host) return;
    host.innerHTML = CONFIG.trust.map(t => `
      <div class="trust__item gborder">
        <span class="trust__ico">${ICON[t.icon] || ICON.check}</span>
        <span><b>${t.bn}</b><span>${t.en}</span></span>
      </div>`).join('');
  }

  // ---- reviews ---------------------------------------------------------
  function reviews() {
    const host = $('[data-reviews]'); if (!host) return;
    host.innerHTML = CONFIG.reviews.map(r => `
      <article class="review gborder">
        ${stars(r.rating)}
        <p class="review__q">“${r.text}”</p>
        <div class="review__who">
          <span class="review__av">${r.name.charAt(0)}</span>
          <span><b>${r.name}</b><span>${r.city}</span></span>
        </div>
      </article>`).join('');
  }

  // ---- story points ----------------------------------------------------
  function story() {
    const host = $('[data-story-points]'); if (!host) return;
    const pts = [
      'প্রতিটি পণ্য পাঠানোর আগে নিজেরা টেস্ট করি',
      '৭ দিনের মধ্যে সমস্যা হলে বদলে দিই',
      'ক্যাশ অন ডেলিভারি — হাতে পেয়ে টাকা দিন',
      'WhatsApp-এ সরাসরি কথা বলা যায়, বট নেই',
    ];
    host.innerHTML = pts.map(p => `<div class="story__pt">${ICON.check}<span>${p}</span></div>`).join('');
  }

  // ---- FAQ -------------------------------------------------------------
  function faq() {
    const host = $('[data-faq]'); if (!host) return;
    host.innerHTML = CONFIG.faq.map((f, i) => `
      <div class="faq__item">
        <button class="faq__q" aria-expanded="false" aria-controls="fa-${i}">${f.q}${ICON.plus}</button>
        <div class="faq__a" id="fa-${i}"><p>${f.a}</p></div>
      </div>`).join('');
    UI.bindAccordion(host);
  }

  // ---- newsletter ------------------------------------------------------
  function news() {
    const f = $('[data-news]'); if (!f) return;
    f.addEventListener('submit', e => {
      e.preventDefault();
      UI.toast('ধন্যবাদ! অফারের খবর পাঠিয়ে দেব।');
      f.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    UI.mount();
    hero(); statsRow(); cats(); rails(); timers(); brands(); trust(); reviews(); story(); faq(); news();
  });
})();
