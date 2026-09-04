/* ============================================================================
   POPUP CHECKOUT — opens checkout inside a modal from any product card.
   Required variants must be chosen inside the popup before ordering.
   Admin toggles live in POPUP_SETTINGS below.
   ============================================================================ */

(function () {
  const POPUP_SETTINGS = {
    enabled: true,            // master on/off
    opensOn: 'both',          // 'addToCart' | 'orderNow' | 'both'
    thankYouInPopup: false,   // false = redirect to the thank-you page
  };

  let host = null;

  function ensureHost() {
    if (host) return host;
    host = document.createElement('div');
    host.className = 'modal';
    host.dataset.open = 'false';
    host.setAttribute('role', 'dialog');
    host.setAttribute('aria-modal', 'true');
    host.innerHTML = '<div class="modal__veil" data-close></div><div class="modal__box"></div>';
    document.body.append(host);
    host.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && host.dataset.open === 'true') close(); });
    return host;
  }

  function close() {
    if (!host) return;
    host.dataset.open = 'false';
    document.body.style.overflow = '';
  }

  function open(html) {
    ensureHost();
    UI.$('.modal__box', host).innerHTML = html;
    host.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    const first = UI.$('input,select,button', host);
    if (first) setTimeout(() => first.focus(), 60);
  }

  // ---- field rendering (shares CONFIG.checkoutFields) -------------------
  function fieldHTML(f) {
    const req = f.require ? '<em aria-hidden="true">*</em>' : '';
    const ph  = f.placeholderBn || '';
    let input;
    if (f.type === 'textarea') {
      input = `<textarea id="pf-${f.id}" name="${f.id}" placeholder="${ph}"${f.require ? ' required' : ''}></textarea>`;
    } else if (f.type === 'select') {
      input = `<select id="pf-${f.id}" name="${f.id}"${f.require ? ' required' : ''}>
        <option value="">${ph}</option>
        ${(f.options || []).map(o => `<option>${o}</option>`).join('')}
      </select>`;
    } else if (f.type === 'zoneSelect') {
      input = `<select id="pf-${f.id}" name="zone"${f.require ? ' required' : ''} data-zone>
        ${CONFIG.delivery.zones.map(z => `<option value="${z.id}">${z.labelBn} — ${UI.money(z.charge)}</option>`).join('')}
      </select>`;
    } else {
      input = `<input id="pf-${f.id}" type="${f.type}" name="${f.id}" placeholder="${ph}"${f.require ? ' required' : ''}
        ${f.id === 'phone' ? ' inputmode="numeric" maxlength="11"' : ''}>`;
    }
    return `<div class="field" data-w="${f.width}" data-field="${f.id}">
      <label for="pf-${f.id}">${f.labelBn}${req}</label>${input}
      <span class="field__err" data-err></span>
    </div>`;
  }

  function variantHTML(p) {
    if (!p.variants || !p.variants.length) return '';
    return p.variants.map(v => `<div class="vgroup" data-vgroup="${v.id}">
      <b>${v.name} <em>*</em></b>
      <div class="vopts">
        ${v.values.map((val, i) => `<button type="button" class="vopt" data-v="${v.id}" data-val="${val}" aria-pressed="${i === -1}">${val}</button>`).join('')}
      </div>
      <span class="field__err" data-verr></span>
    </div>`).join('');
  }

  // ---- main entry ------------------------------------------------------
  function popupCheckout(productId, preVariant) {
    if (!POPUP_SETTINGS.enabled) { location.href = UI.url('pages/checkout.html'); return; }
    const p = Store.findProduct(productId); if (!p) return;
    const needsVariant = (p.variants || []).length > 0 && !preVariant;

    const fields = CONFIG.checkoutFields.filter(f => f.show && f.id !== 'note');
    open(`
      <div class="modal__head">
        <h2>দ্রুত অর্ডার করুন</h2>
        <button class="modal__x" data-close aria-label="বন্ধ করুন">${UI.ICON.x}</button>
      </div>
      <div class="modal__body">
        <div class="modal__prod">
          <img src="${UI.url(p.images[0])}" alt="" width="62" height="62">
          <div>
            <b>${p.nameBn}</b>
            <span data-vsummary>${preVariant || p.shortDesc}</span>
          </div>
          <span class="price">${UI.money(p.price)}</span>
        </div>

        ${needsVariant ? variantHTML(p) : ''}

        <div class="field" data-w="100" style="margin-bottom:16px">
          <label>পরিমাণ</label>
          <div class="qty">
            <button type="button" data-q="-1" aria-label="কমান">−</button>
            <input type="number" value="1" min="1" max="${p.stock}" data-qty aria-label="পরিমাণ">
            <button type="button" data-q="1" aria-label="বাড়ান">+</button>
          </div>
        </div>

        <form class="fields" data-popform novalidate>${fields.map(fieldHTML).join('')}</form>

        <div style="margin-top:18px">
          <div class="srow"><span>সাবটোটাল</span><span data-sub>${UI.money(p.price)}</span></div>
          <div class="srow srow--dim"><span>ডেলিভারি চার্জ</span><span data-dlv>${UI.money(CONFIG.delivery.zones[0].charge)}</span></div>
          <div class="srow srow--total"><span>সর্বমোট</span><span data-tot>${UI.money(p.price + CONFIG.delivery.zones[0].charge)}</span></div>
        </div>

        <button class="btn btn--primary btn--lg btn--block btn-runner" data-popsubmit style="margin-top:18px">
          <span>অর্ডার কনফার্ম করুন</span>
        </button>
        <p class="coupon-hint" style="text-align:center">ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা দিন</p>
      </div>
    `);

    bindPopup(p, preVariant);
  }

  function bindPopup(p, preVariant) {
    const box = UI.$('.modal__box', host);
    const chosen = {};
    if (preVariant) chosen._pre = preVariant;

    const recalc = () => {
      const qty = Math.max(1, Math.min(p.stock, parseInt(UI.$('[data-qty]', box).value, 10) || 1));
      UI.$('[data-qty]', box).value = qty;
      const zoneSel = UI.$('[data-zone]', box);
      const zone = Store.findZone(zoneSel ? zoneSel.value : 'dhaka');
      const sub = p.price * qty;
      const free = CONFIG.delivery.freeDeliveryAbove && sub >= CONFIG.delivery.freeDeliveryAbove;
      const dlv = free ? 0 : zone.charge;
      UI.$('[data-sub]', box).textContent = UI.money(sub);
      UI.$('[data-dlv]', box).textContent = free ? 'ফ্রি' : UI.money(dlv);
      UI.$('[data-tot]', box).textContent = UI.money(sub + dlv);
    };

    box.addEventListener('click', e => {
      const q = e.target.closest('[data-q]');
      if (q) {
        const input = UI.$('[data-qty]', box);
        input.value = (parseInt(input.value, 10) || 1) + parseInt(q.dataset.q, 10);
        recalc(); return;
      }
      const v = e.target.closest('[data-v]');
      if (v) {
        UI.$$(`[data-v="${v.dataset.v}"]`, box).forEach(b => b.setAttribute('aria-pressed', 'false'));
        v.setAttribute('aria-pressed', 'true');
        chosen[v.dataset.v] = v.dataset.val;
        const grp = v.closest('[data-vgroup]');
        UI.$('[data-verr]', grp).textContent = '';
        UI.$('[data-vsummary]', box).textContent =
          Object.entries(chosen).filter(([k]) => k !== '_pre').map(([, val]) => val).join(' · ') || p.shortDesc;
        return;
      }
      if (e.target.closest('[data-popsubmit]')) { submit(p, chosen, box); }
    });

    box.addEventListener('input', e => {
      if (e.target.matches('[data-qty]') || e.target.matches('[data-zone]')) recalc();
      if (e.target.name === 'phone') capture(p, chosen, box);
    });
    box.addEventListener('change', e => { if (e.target.matches('[data-zone]')) recalc(); });
    recalc();
  }

  function readForm(box) {
    const form = UI.$('[data-popform]', box);
    const data = {};
    UI.$$('input,select,textarea', form).forEach(el => { data[el.name] = el.value.trim(); });
    return data;
  }

  function validate(p, chosen, box) {
    let ok = true;
    // variants
    UI.$$('[data-vgroup]', box).forEach(g => {
      const id = g.dataset.vgroup;
      if (!chosen[id]) { UI.$('[data-verr]', g).textContent = 'অপশন নির্বাচন করুন'; ok = false; }
    });
    // fields
    const form = UI.$('[data-popform]', box);
    CONFIG.checkoutFields.filter(f => f.show && f.id !== 'note').forEach(f => {
      const wrap = UI.$(`[data-field="${f.id}"]`, form); if (!wrap) return;
      const el = UI.$('input,select,textarea', wrap);
      const val = (el.value || '').trim();
      let err = '';
      if (f.require && !val) err = f.labelBn + ' দিন';
      else if (f.id === 'phone' && val && !/^01\d{9}$/.test(val.replace(/\D/g, ''))) err = 'সঠিক ১১ ডিজিটের নম্বর দিন (01XXXXXXXXX)';
      wrap.dataset.invalid = String(!!err);
      UI.$('[data-err]', wrap).textContent = err;
      if (err) ok = false;
    });
    return ok;
  }

  function capture(p, chosen, box) {
    const d = readForm(box);
    if (!/^01\d{9}$/.test(String(d.phone || '').replace(/\D/g, ''))) return;
    // stash the popup product so the incomplete record is about *this* product
    Store.cart.add(p.id, Object.values(chosen).filter(Boolean).join(' / '), 0);
    Store.captureIncomplete({ phone: d.phone, zoneId: d.zone, paymentId: 'cod', customer: { name: d.name } });
  }

  function submit(p, chosen, box) {
    if (!validate(p, chosen, box)) return;
    const d = readForm(box);
    const qty = parseInt(UI.$('[data-qty]', box).value, 10) || 1;
    const variantKey = Object.entries(chosen).filter(([k]) => k !== '_pre').map(([, v]) => v).join(' / ') || (chosen._pre || '');

    Store.cart.clear();
    Store.cart.add(p.id, variantKey, qty);
    const order = Store.placeOrder({
      customer: { name: d.name, phone: d.phone, address: d.address, district: d.district },
      zoneId: d.zone, paymentId: 'cod', note: '',
    });
    sessionStorage.setItem('gd_last_order', JSON.stringify(order));

    if (POPUP_SETTINGS.thankYouInPopup) {
      open(`<div class="modal__head"><h2>অর্ডার কনফার্ম হয়েছে</h2>
        <button class="modal__x" data-close aria-label="বন্ধ করুন">${UI.ICON.x}</button></div>
        <div class="modal__body" style="text-align:center">
          <div class="thanks__tick">${UI.ICON.check}</div>
          <p>অর্ডার আইডি <b>${order.id}</b></p>
          <p class="coupon-hint">আমরা শীঘ্রই ${order.customer.phone} নম্বরে কল করে কনফার্ম করব।</p>
          <a class="btn btn--primary btn--block" style="margin-top:18px" href="${UI.url('pages/shop.html')}">আরও কিনুন</a>
        </div>`);
      UI.paintCartCount();
    } else {
      location.href = UI.url('pages/thank-you.html');
    }
  }

  // expose
  UI.popupCheckout = popupCheckout;
  UI.popupSettings = POPUP_SETTINGS;
  UI.closeModal = close;
  UI.openModal = open;
})();
