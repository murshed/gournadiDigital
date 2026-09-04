/* ============================================================================
   CART PAGE — live calculations, coupon UI, quantity stepper, remove item.
   ============================================================================ */

(function () {
  const { $, $$, N, money, card, toast } = UI;

  function render() {
    const cart = Store.cart.items();
    const listHost = $('[data-cart-list]');

    if (!cart.length) {
      listHost.innerHTML = `<div class="empty" style="margin:0;border-radius:var(--r);">
        <h3>কার্ট খালি</h3>
        <p>কিছু পণ্য যোগ করুন — ফ্ল্যাশ সেল থেকে শুরু করতে পারেন।</p>
        <a class="btn btn--primary" href="../pages/shop.html" style="margin-top:16px">পণ্য দেখুন</a>
      </div>`;
      $('[data-summary]').innerHTML = `<h2>অর্ডার সারাংশ</h2><div class="summary__empty" style="padding:22px 20px;text-align:center;color:var(--c-muted)">কার্টে কোনো পণ্য নেই</div>`;
      document.querySelector('[data-sub]').textContent = 'কার্টে কোনো পণ্য যোগ হয়নি।';
      return;
    }

    // items
    listHost.innerHTML = cart.map(i => {
      const p = Store.findProduct(i.id); if (!p) return '';
      return `<div class="citem gborder" data-citem="${i.key}">
        <img class="citem__img" src="${UI.url(p.images[0])}" alt="${p.nameBn}" width="88" height="88">
        <div>
          <b class="citem__name">${p.nameBn}</b>
          <span class="citem__var">${i.variant || ''}</span>
          <span class="citem__unit">${money(p.price)} / পিস</span>
          <div class="qty" style="margin-top:8px;width:140px">
            <button type="button" data-q="-1" aria-label="কমান">−</button>
            <input type="number" value="${i.qty}" min="1" max="${p.stock}" data-qty aria-label="পরিমাণ">
            <button type="button" data-q="1" aria-label="বাড়ান">+</button>
          </div>
        </div>
        <div class="citem__right">
          <span class="citem__line">${money(p.price * i.qty)}</span>
          <button class="citem__rm" data-rm="${i.key}" aria-label="বাদ দিন">${UI.ICON.trash} বাদ দিন</button>
        </div>
      </div>`;
    }).join('');

    // summary
    const t = Store.totals();
    const list = Store.cart.items();

    // applied coupon line
    const couponHtml = t.couponLine ? `
      <div class="srow srow--save"><span>কুপন (${t.couponLine.label})</span><span>−${money(t.couponLine.amount)}</span></div>` : '';
    const couponField = CONFIG.payments.showCoupon ? `
      <div class="coupon">
        <input type="text" id="coup" placeholder="কুপন কোড (LAUNCH25)" aria-label="কুপন কোড">
        <button class="btn btn--primary" data-apply>প্রয়োগ</button>
      </div>
      <p class="coupon-hint">উদাহরণ: <code>LAUNCH25</code>, <code>FREESHIP</code>, <code>GOURNADI</code></p>
      <p class="coupon-msg" data-cmsg></p>` : '';

    $('[data-summary]').innerHTML = `
      <h2>অর্ডার সারাংশ</h2>
      <div class="panel__sub">${list.length} পণ্য</div>
      <div class="srow"><span>সাবটোটাল</span><span data-sub>${money(t.subtotal)}</span></div>
      ${t.autoLines.map(l => `<div class="srow srow--dim"><span>${l.label}</span><span>−${money(l.amount)}</span></div>`).join('')}
      ${couponHtml}
      <div class="srow"><span>ডেলিভারি</span><span data-dlv>${t.freeDelivery ? 'ফ্রি' : money(t.delivery)}</span></div>
      ${t.gatewayCharge ? `<div class="srow"><span>পেমেন্ট চার্জ</span><span>${money(t.gatewayCharge)}</span></div>` : ''}
      <div class="srow srow--total"><span>মোট</span><span data-tot>${money(t.total)}</span></div>
      ${couponField}
      <a class="btn btn--primary btn--lg btn--block btn-runner" href="checkout.html" style="margin-top:20px"><span>চেকআউট করুন</span></a>`;
  }

  // ---- events ----------------------------------------------------------
  function bind() {
    $('[data-cart-list]').addEventListener('click', e => {
      const rm = e.target.closest('[data-rm]');
      if (rm) { Store.cart.remove(rm.dataset.rm); render(); toast('পণ্য কার্ট থেকে বাদ দেওয়া হয়েছে'); return; }
      const qtyBtn = e.target.closest('[data-q]');
      if (qtyBtn) {
        const parent = qtyBtn.closest('[data-citem]');
        const input = $('input[data-qty]', parent);
        const key = parent.dataset.citem;
        const next = Math.max(1, parseInt(input.value, 10) + parseInt(qtyBtn.dataset.q, 10));
        input.value = next;
        Store.cart.setQty(key, next);
        render(); return;
      }
    });

    $('[data-cart-list]').addEventListener('input', e => {
      if (e.target.matches('[data-qty]')) {
        const parent = e.target.closest('[data-citem]');
        Store.cart.setQty(parent.dataset.citem, parseInt(e.target.value, 10) || 1);
        render();
      }
    });

    // coupon
    $('[data-apply]').addEventListener('click', () => {
      const v = $('#coup').value.trim();
      const msg = $('[data-cmsg]');
      const r = Store.coupon.apply(v);
      msg.textContent = r.ok ? `কুপন প্রয়োগ হয়েছে — ${r.coupon.label}` : r.error;
      msg.setAttribute('data-ok', String(r.ok));
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    UI.mount();
    render(); bind();
  });
})();
