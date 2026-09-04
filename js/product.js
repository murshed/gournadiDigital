/* ============================================================================
   PRODUCT DETAILS — landing-page style. Sections stacked, no tabs.
   ?id=PRODUCT_ID selects the product; falls back to the first product.
   ============================================================================ */

(function () {
  const { $, $$, ICON, N, money, stars, card, discountPct, timerMarkup } = UI;

  const id = new URLSearchParams(location.search).get('id');
  const p  = Store.findProduct(id) || CONFIG.products[0];

  // selected state
  const sel = { variants: {}, qty: 1, image: 0 };

  /* ---- SIZE CHART -------------------------------------------------------
     Turn on by setting  sizeChart: true  on the product in config.js.
     Rows below are the default clothing chart — edit freely. */
  const SIZE_CHART = {
    head: ['সাইজ', 'বুক (ইঞ্চি)', 'লম্বা (ইঞ্চি)', 'কাঁধ (ইঞ্চি)'],
    rows: [
      ['S',  '36', '26', '16.5'],
      ['M',  '38', '27', '17.5'],
      ['L',  '40', '28', '18.5'],
      ['XL', '42', '29', '19.5'],
      ['XXL','44', '30', '20.5'],
    ],
  };

  // ---- gallery ---------------------------------------------------------
  function gallery() {
    const imgs = p.images.length > 1 ? p.images : [p.images[0], p.images[0]];
    const main = $('[data-gal-main]');
    const paint = () => {
      main.innerHTML = `<img src="${UI.url(imgs[sel.image])}" alt="${p.nameEn}" width="800" height="800">`;
      $$('[data-gal-thumbs] button').forEach((b, i) => b.setAttribute('aria-selected', String(i === sel.image)));
    };
    $('[data-gal-thumbs]').innerHTML = imgs.map((src, i) =>
      `<button role="tab" aria-selected="${i === 0}" aria-label="ছবি ${N(i + 1)}">
        <img src="${UI.url(src)}" alt="" width="82" height="82" loading="lazy"></button>`).join('');
    $('[data-gal-thumbs]').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      sel.image = $$('[data-gal-thumbs] button').indexOf(b); paint();
    });
    paint();
  }

  // ---- buy column ------------------------------------------------------
  function buyBox() {
    const pct  = discountPct(p);
    const out  = (p.stock || 0) <= 0;
    const hasOffer = !!p.oldPrice;

    const variantBlocks = (p.variants || []).map(v => `
      <div class="vgroup" data-vgroup="${v.id}">
        <b>${v.name} <em>*</em></b>
        <div class="vopts">
          ${v.values.map(val => `<button type="button" class="vopt" data-v="${v.id}" data-val="${val}" aria-pressed="false">${val}</button>`).join('')}
        </div>
        <span class="field__err" data-verr></span>
      </div>`).join('');

    $('[data-buy]').innerHTML = `
      <h1 class="pdp__title">${p.nameBn}</h1>
      <div class="pdp__meta">
        ${stars(p.rating)}
        <span>${N(p.rating.toFixed(1))} · ${N(p.reviews)} রিভিউ</span>
        <span>·</span><span>${p.brand}</span>
        <span>·</span><span>SKU ${p.id}</span>
      </div>

      <div class="pdp__price">
        <span class="price">${money(p.price)}</span>
        ${p.oldPrice ? `<span class="price price--old">${money(p.oldPrice)}</span>` : ''}
        ${pct ? `<span class="badge badge--sale">−${N(pct)}%</span>` : ''}
      </div>

      ${hasOffer ? `<div style="margin-top:20px">${timerMarkup()}</div>` : ''}

      <p class="pdp__short">${p.shortDesc}</p>

      <div class="pdp__stock ${out ? 'pdp__stock--out' : 'pdp__stock--in'}">
        ${out ? ICON.x + ' স্টক শেষ' : ICON.check + ` স্টকে আছে — ${N(p.stock)} পিস`}
      </div>

      ${variantBlocks}

      <div class="vgroup">
        <b>পরিমাণ</b>
        <div class="qty">
          <button type="button" data-q="-1" aria-label="কমান">−</button>
          <input type="number" value="1" min="1" max="${Math.max(1, p.stock)}" data-qty aria-label="পরিমাণ">
          <button type="button" data-q="1" aria-label="বাড়ান">+</button>
        </div>
      </div>

      <div class="pdp__actions" data-top-actions>
        ${out
          ? '<span class="btn btn--ghost btn--lg btn--block" aria-disabled="true">স্টক শেষ</span>'
          : `<button class="btn btn--ghost btn--lg" data-pdp-add>কার্টে যোগ করুন</button>
             <button class="btn btn--primary btn--lg btn-runner" data-pdp-buy><span>এখনই কিনুন</span></button>`}
      </div>

      <div class="pdp__trust">
        <div><b>ক্যাশ অন ডেলিভারি</b>পণ্য হাতে পেয়ে টাকা দিন</div>
        <div><b>${CONFIG.delivery.zones[0].eta}</b>ঢাকার ভিতরে ডেলিভারি</div>
        <div><b>৭ দিনের রিটার্ন</b>সমস্যা হলে বদলে দিই</div>
      </div>`;

    UI.runTimers();
    bindBuy();
  }

  function variantKey() {
    return (p.variants || []).map(v => sel.variants[v.id]).filter(Boolean).join(' / ');
  }

  function variantsOk() {
    let ok = true;
    (p.variants || []).forEach(v => {
      const g = $(`[data-vgroup="${v.id}"]`);
      if (!sel.variants[v.id]) {
        if (g) $('[data-verr]', g).textContent = v.name + ' নির্বাচন করুন';
        ok = false;
      }
    });
    return ok;
  }

  function bindBuy() {
    const host = $('[data-buy]');
    host.addEventListener('click', e => {
      const v = e.target.closest('[data-v]');
      if (v) {
        $$(`[data-v="${v.dataset.v}"]`, host).forEach(b => b.setAttribute('aria-pressed', 'false'));
        v.setAttribute('aria-pressed', 'true');
        sel.variants[v.dataset.v] = v.dataset.val;
        $('[data-verr]', v.closest('[data-vgroup]')).textContent = '';
        paintSticky();
        return;
      }
      const q = e.target.closest('[data-q]');
      if (q) {
        const input = $('[data-qty]', host);
        const next = (parseInt(input.value, 10) || 1) + parseInt(q.dataset.q, 10);
        input.value = Math.max(1, Math.min(p.stock, next));
        sel.qty = parseInt(input.value, 10);
        paintSticky();
        return;
      }
      if (e.target.closest('[data-pdp-add]')) {
        if (!variantsOk()) return;
        Store.cart.add(p.id, variantKey(), sel.qty);
        UI.toast(p.nameBn + ' কার্টে যোগ হয়েছে');
        return;
      }
      if (e.target.closest('[data-pdp-buy]')) {
        if (!variantsOk()) return;
        // Direct Order: straight to checkout with this item in the cart
        Store.cart.add(p.id, variantKey(), sel.qty);
        location.href = UI.url('pages/checkout.html');
      }
    });
    host.addEventListener('input', e => {
      if (e.target.matches('[data-qty]')) {
        sel.qty = Math.max(1, Math.min(p.stock, parseInt(e.target.value, 10) || 1));
        paintSticky();
      }
    });
  }

  // ---- details + spec --------------------------------------------------
  function details() {
    $('[data-details]').innerHTML = `
      <p>${p.longDesc}</p>
      <ul>
        <li>${p.shortDesc}</li>
        <li>১২ মাসের সার্ভিস ওয়ারেন্টি (ফিজিক্যাল ড্যামেজ ছাড়া)</li>
        <li>বক্সে: পণ্য, ইউজার ম্যানুয়াল, ওয়ারেন্টি কার্ড, চার্জিং কেবল</li>
        <li>পাঠানোর আগে প্রতিটি ইউনিট আমরা নিজেরা টেস্ট করি</li>
      </ul>`;

    const rows = [
      ['ব্র্যান্ড', p.brand],
      ['মডেল / SKU', p.id],
      ['ক্যাটাগরি', (CONFIG.categories.find(c => c.slug === p.category) || {}).bn || p.category],
      ['ওয়ারেন্টি', '১২ মাস সার্ভিস ওয়ারেন্টি'],
      ['স্টক', (p.stock || 0) > 0 ? N(p.stock) + ' পিস' : 'স্টক শেষ'],
      ['পণ্যের ধরন', p.type === 'bundle' ? 'বান্ডেল' : p.type === 'variable' ? 'ভ্যারিয়েবল' : 'সাধারণ'],
    ];
    $('[data-spec]').innerHTML = rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('');
  }

  // ---- size chart ------------------------------------------------------
  function sizeChart() {
    if (!p.sizeChart) return;                 // hidden unless enabled in config
    $('[data-sizechart-sec]').hidden = false;
    $('[data-sizechart]').innerHTML =
      `<tr>${SIZE_CHART.head.map(h => `<th>${h}</th>`).join('')}</tr>` +
      SIZE_CHART.rows.map(r => `<tr>${r.map((c, i) => i ? `<td>${N(c)}</td>` : `<td><b>${c}</b></td>`).join('')}</tr>`).join('');
  }

  // ---- delivery --------------------------------------------------------
  function delivery() {
    const z = CONFIG.delivery.zones;
    $('[data-delivery]').innerHTML = `
      <div class="dlv__c gborder"><b>${z[0].labelBn} — ${money(z[0].charge)}</b><p>${z[0].eta} এর মধ্যে পৌঁছে যাবে।</p></div>
      <div class="dlv__c gborder"><b>${z[2].labelBn} — ${money(z[2].charge)}</b><p>${z[2].eta} এর মধ্যে কুরিয়ারে পৌঁছে যাবে।</p></div>
      <div class="dlv__c gborder"><b>ক্যাশ অন ডেলিভারি</b><p>পণ্য হাতে পেয়ে টাকা দিন। ${CONFIG.delivery.freeDeliveryAbove ? money(CONFIG.delivery.freeDeliveryAbove) + ' এর উপরে ডেলিভারি ফ্রি।' : ''}</p></div>`;
  }

  // ---- reviews ---------------------------------------------------------
  function reviews() {
    $('[data-reviews]').innerHTML = CONFIG.reviews.map(r => `
      <article class="review gborder">
        ${stars(r.rating)}
        <p class="review__q">“${r.text}”</p>
        <div class="review__who">
          <span class="review__av">${r.name.charAt(0)}</span>
          <span><b>${r.name}</b><span>${r.city}</span></span>
        </div>
      </article>`).join('');

    $('[data-review-form]').addEventListener('submit', e => {
      e.preventDefault();
      UI.toast('রিভিউ পাঠানো হয়েছে — যাচাইয়ের পর দেখানো হবে');
      e.target.reset();
    });
  }

  // ---- combo -----------------------------------------------------------
  function combo() {
    const others = CONFIG.products.filter(x => x.id !== p.id && x.category === p.category).slice(0, 2);
    const items  = [p, ...others];
    if (items.length < 2) { $('[data-combo]').closest('.pdp-sec').hidden = true; return; }
    const sum    = items.reduce((s, x) => s + x.price, 0);
    const combo  = Math.round(sum * 0.88);   // 12% combo discount

    $('[data-combo]').innerHTML = `
      <div>
        <div class="combo__items">
          ${items.map(x => `<div class="combo__it">
            <img src="${UI.url(x.images[0])}" alt="" width="56" height="56">
            <span><b>${x.nameBn}</b><br><span class="coupon-hint">${money(x.price)}</span></span>
          </div>`).join('')}
        </div>
        <p class="coupon-hint" style="margin-top:14px">তিনটি একসাথে নিলে ${money(sum - combo)} সাশ্রয়।</p>
      </div>
      <div style="text-align:right">
        <div class="price price--old">${money(sum)}</div>
        <div class="price" style="font-size:26px">${money(combo)}</div>
        <button class="btn btn--primary btn-runner" style="margin-top:12px" data-combo-add><span>কম্বো নিন</span></button>
      </div>`;

    $('[data-combo-add]').addEventListener('click', () => {
      items.forEach(x => Store.cart.add(x.id, x.id === p.id ? variantKey() : '', 1));
      UI.toast('কম্বো কার্টে যোগ হয়েছে');
    });
  }

  // ---- related ---------------------------------------------------------
  function related() {
    const list = CONFIG.products
      .filter(x => x.id !== p.id && (x.category === p.category || x.brand === p.brand))
      .slice(0, 4);
    $('[data-related]').innerHTML = (list.length ? list : CONFIG.products.filter(x => x.id !== p.id).slice(0, 4))
      .map(card).join('');
  }

  // ---- sticky bar (hidden while top CTAs are on screen) ----------------
  function paintSticky() {
    const v = variantKey();
    $('[data-sticky-in]').innerHTML = `
      <div class="stickybar__p">
        <img src="${UI.url(p.images[0])}" alt="" width="46" height="46">
        <span>
          <b>${p.nameBn}</b>
          <span>${v ? v + ' · ' : ''}${money(p.price)} · ${N(sel.qty)} পিস</span>
        </span>
      </div>
      <div class="stickybar__acts">
        <button class="btn btn--ghost" data-sticky-add>কার্টে যোগ</button>
        <button class="btn btn--primary btn-runner" data-sticky-buy><span>এখনই কিনুন</span></button>
      </div>`;
  }

  function sticky() {
    const bar = $('[data-sticky]');
    const top = $('[data-top-actions]');
    if (!top) return;
    document.body.classList.add('has-stickybar');
    paintSticky();

    const io = new IntersectionObserver(es => {
      es.forEach(e => { bar.dataset.show = String(!e.isIntersecting); });
    }, { threshold: 0, rootMargin: '-72px 0px 0px 0px' });
    io.observe(top);

    bar.addEventListener('click', e => {
      if (e.target.closest('[data-sticky-add]')) {
        if (!variantsOk()) { top.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
        Store.cart.add(p.id, variantKey(), sel.qty);
        UI.toast(p.nameBn + ' কার্টে যোগ হয়েছে');
      }
      if (e.target.closest('[data-sticky-buy]')) {
        if (!variantsOk()) { top.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
        Store.cart.add(p.id, variantKey(), sel.qty);
        location.href = UI.url('pages/checkout.html');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    UI.mount({ activeCat: p.category });
    document.title = p.nameBn + ' — ' + CONFIG.brand.name;
    gallery(); buyBox(); details(); sizeChart(); delivery(); reviews(); combo(); related(); sticky();
  });
})();
