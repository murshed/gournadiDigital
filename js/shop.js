/* ============================================================================
   SHOP — filters, sort, search, pagination. All client-side over CONFIG.products
   URL params supported: ?cat= ?brand= ?q= ?sort= ?flash=1
   ============================================================================ */

(function () {
  const { $, $$, N, money, card } = UI;
  const PER_PAGE = 8;

  const params = new URLSearchParams(location.search);
  const state = {
    cats:    params.get('cat') ? [params.get('cat')] : [],
    brands:  params.get('brand') ? [params.get('brand')] : [],
    maxPrice: 20000,
    minRating: 0,
    inStock: false,
    flash:   params.get('flash') === '1',
    q:       (params.get('q') || '').trim().toLowerCase(),
    sort:    params.get('sort') || 'popular',
    page:    1,
  };

  // ---- filter panel ----------------------------------------------------
  function buildFilters() {
    const catHost = $('[data-f-cats]');
    catHost.innerHTML = CONFIG.categories.map(c => {
      const n = CONFIG.products.filter(p => p.category === c.slug).length;
      return `<label class="fopt">
        <input type="checkbox" value="${c.slug}" data-fc${state.cats.includes(c.slug) ? ' checked' : ''}>
        <span>${c.bn}</span><span class="n">${N(n)}</span>
      </label>`;
    }).join('');

    const brandHost = $('[data-f-brands]');
    const brandNames = [...new Set(CONFIG.products.map(p => p.brand))].sort();
    brandHost.innerHTML = brandNames.map(b => {
      const n = CONFIG.products.filter(p => p.brand === b).length;
      return `<label class="fopt">
        <input type="checkbox" value="${b}" data-fb${state.brands.includes(b) ? ' checked' : ''}>
        <span>${b}</span><span class="n">${N(n)}</span>
      </label>`;
    }).join('');

    $('[data-f-rating]').innerHTML = [4.5, 4, 3.5].map(r => `
      <label class="fopt">
        <input type="radio" name="frating" value="${r}" data-fr>
        <span>${N(r)}★ ও তার বেশি</span>
      </label>`).join('') +
      `<label class="fopt"><input type="radio" name="frating" value="0" data-fr checked><span>সব রেটিং</span></label>`;

    if (state.flash) $('[data-f-flash]').checked = true;
    $('[data-f-price-out]').textContent = money(state.maxPrice);
  }

  // ---- filtering + sorting --------------------------------------------
  function filtered() {
    let out = CONFIG.products.slice();
    if (state.cats.length)   out = out.filter(p => state.cats.includes(p.category));
    if (state.brands.length) out = out.filter(p => state.brands.includes(p.brand));
    out = out.filter(p => p.price <= state.maxPrice);
    if (state.minRating)     out = out.filter(p => p.rating >= state.minRating);
    if (state.inStock)       out = out.filter(p => (p.stock || 0) > 0);
    if (state.flash)         out = out.filter(p => p.flash);
    if (state.q) {
      out = out.filter(p =>
        (p.nameEn + ' ' + p.nameBn + ' ' + p.brand + ' ' + p.shortDesc + ' ' + p.category)
          .toLowerCase().includes(state.q));
    }
    const s = state.sort;
    if (s === 'price-asc')  out.sort((a, b) => a.price - b.price);
    if (s === 'price-desc') out.sort((a, b) => b.price - a.price);
    if (s === 'rating')     out.sort((a, b) => b.rating - a.rating);
    if (s === 'newest')     out.sort((a, b) => (b.isNew === true) - (a.isNew === true));
    if (s === 'popular')    out.sort((a, b) => b.reviews - a.reviews);
    return out;
  }

  // ---- render ----------------------------------------------------------
  function render() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    const slice = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

    $('[data-count]').textContent = list.length
      ? `${N(list.length)} টি পণ্য` + (state.q ? ` — “${state.q}” এর জন্য` : '')
      : '';

    const host = $('[data-results]');
    if (!slice.length) {
      host.className = '';
      host.innerHTML = `<div class="empty">
        <h3>কোনো পণ্য পাওয়া যায়নি</h3>
        <p>ফিল্টার একটু কমিয়ে আবার দেখুন, বা সব পণ্যে ফিরে যান।</p>
        <button class="btn btn--primary" data-f-reset>ফিল্টার রিসেট করুন</button>
      </div>`;
    } else {
      host.className = 'pgrid';
      host.innerHTML = slice.map(card).join('');
    }

    // pager
    const pager = $('[data-pager]');
    if (pages <= 1) { pager.innerHTML = ''; }
    else {
      let html = `<button data-page="${state.page - 1}"${state.page === 1 ? ' disabled' : ''}>পূর্ববর্তী</button>`;
      for (let i = 1; i <= pages; i++) {
        html += `<button data-page="${i}" aria-current="${i === state.page}">${N(i)}</button>`;
      }
      html += `<button data-page="${state.page + 1}"${state.page === pages ? ' disabled' : ''}>পরবর্তী</button>`;
      pager.innerHTML = html;
    }

    // heading reflects the active category / search
    const t = $('[data-title]'), d = $('[data-desc]');
    if (state.flash) { t.textContent = 'ফ্ল্যাশ সেল'; d.textContent = 'সীমিত সময়ের অফার — স্টক শেষ হওয়া পর্যন্ত।'; }
    else if (state.cats.length === 1) {
      const c = CONFIG.categories.find(x => x.slug === state.cats[0]);
      if (c) { t.textContent = c.bn; d.textContent = c.en + ' — ' + N(CONFIG.products.filter(p => p.category === c.slug).length) + ' টি পণ্য'; }
    } else if (state.q) { t.textContent = 'সার্চ ফলাফল'; d.textContent = `“${state.q}” এর জন্য ${N(list.length)} টি পণ্য পাওয়া গেছে।`; }
  }

  // ---- events ----------------------------------------------------------
  function bind() {
    const panel = $('.filters');

    panel.addEventListener('change', e => {
      if (e.target.matches('[data-fc]')) {
        state.cats = $$('[data-fc]:checked').map(i => i.value);
      } else if (e.target.matches('[data-fb]')) {
        state.brands = $$('[data-fb]:checked').map(i => i.value);
      } else if (e.target.matches('[data-fr]')) {
        state.minRating = parseFloat(e.target.value) || 0;
      } else if (e.target.matches('[data-f-instock]')) {
        state.inStock = e.target.checked;
      } else if (e.target.matches('[data-f-flash]')) {
        state.flash = e.target.checked;
      }
      state.page = 1; render();
    });

    const price = $('[data-f-price]');
    price.addEventListener('input', () => {
      state.maxPrice = parseInt(price.value, 10);
      $('[data-f-price-out]').textContent = money(state.maxPrice);
      state.page = 1; render();
    });

    $('[data-sort]').value = state.sort;
    $('[data-sort]').addEventListener('change', e => { state.sort = e.target.value; state.page = 1; render(); });

    document.addEventListener('click', e => {
      const p = e.target.closest('[data-page]');
      if (p && !p.disabled) {
        state.page = parseInt(p.dataset.page, 10);
        render();
        window.scrollTo({ top: $('.shop').offsetTop - 120, behavior: 'smooth' });
        return;
      }
      if (e.target.closest('[data-f-reset]')) {
        state.cats = []; state.brands = []; state.maxPrice = 20000;
        state.minRating = 0; state.inStock = false; state.flash = false; state.q = '';
        state.page = 1;
        buildFilters(); price.value = 20000;
        $('[data-f-price-out]').textContent = money(20000);
        $('[data-f-instock]').checked = false; $('[data-f-flash]').checked = false;
        render();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    UI.mount({ activeCat: state.cats[0] });
    buildFilters(); bind(); render();
  });
})();
