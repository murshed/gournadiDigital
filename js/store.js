/* ============================================================================
   STORE — front-end only, persists in localStorage.
   Phase 2 will swap the in-memory layer for a Supabase/Firebase call but the
   public API (window.Store) stays the same.
   ============================================================================ */

(function () {
  const LS_CART    = 'gd_cart_v1';
  const LS_ORDERS  = 'gd_orders_v1';
  const LS_INC     = 'gd_incomplete_v1';
  const LS_COUPON  = 'gd_coupon_v1';

  // ---- helpers ----------------------------------------------------------
  const taka = n => '৳' + Number(n || 0).toLocaleString('en-IN');
  const bnDigits = s => String(s).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);
  const fmt      = (n, decimal) => decimal ? Number(n).toFixed(1) : Math.round(Number(n)).toLocaleString('en-IN');
  const num      = v => Number(String(v).replace(/[^\d.-]/g, '')) || 0;

  const findProduct = id => (CONFIG.products.find(p => p.id === id) || null);
  const findZone    = id => (CONFIG.delivery.zones.find(z => z.id === id) || CONFIG.delivery.zones[0]);

  // ---- cart -------------------------------------------------------------
  function loadCart() {
    try { return JSON.parse(localStorage.getItem(LS_CART)) || []; }
    catch (e) { return []; }
  }
  function saveCart(c) { localStorage.setItem(LS_CART, JSON.stringify(c)); broadcastCart(); }

  function addToCart(id, variantKey, qty = 1) {
    const c = loadCart();
    const key = id + '::' + (variantKey || '');
    const existing = c.find(i => i.key === key);
    const p = findProduct(id); if (!p) return;
    const stock = p.stock || 0;
    if (existing) {
      existing.qty = Math.min(stock, existing.qty + qty);
    } else {
      c.push({ key, id, variant: variantKey || '', qty: Math.min(stock, qty) });
    }
    saveCart(c);
    return c.find(i => i.key === key);
  }
  function removeFromCart(key) {
    saveCart(loadCart().filter(i => i.key !== key));
  }
  function setQty(key, qty) {
    const c = loadCart();
    const item = c.find(i => i.key === key); if (!item) return;
    const p = findProduct(item.id);
    item.qty = Math.max(1, Math.min(p.stock || 999, qty));
    saveCart(c);
  }
  function clearCart() { saveCart([]); }
  function cartCount() { return loadCart().reduce((s, i) => s + i.qty, 0); }
  function cartItems() { return loadCart(); }

  // ---- coupon / auto discount / totals ---------------------------------
  function applyCoupon(code) {
    const c = (CONFIG.coupons || []).find(x => x.code.toLowerCase() === String(code || '').trim().toLowerCase() && x.active);
    if (!c) return { ok: false, error: 'কোড সঠিক নয় বা মেয়াদ শেষ' };
    const now = new Date();
    if (new Date(c.startsAt) > now || new Date(c.endsAt) < now) return { ok:false, error:'কুপনের মেয়াদ শেষ' };
    localStorage.setItem(LS_COUPON, c.code);
    return { ok: true, coupon: c };
  }
  function removeCoupon() { localStorage.removeItem(LS_COUPON); }
  function appliedCoupon() {
    const code = localStorage.getItem(LS_COUPON); if (!code) return null;
    return (CONFIG.coupons || []).find(c => c.code === code && c.active) || null;
  }

  function computeTotals(opts) {
    opts = opts || {};
    const items = loadCart();
    let subtotal = 0;
    const detail = items.map(i => {
      const p = findProduct(i.id); if (!p) return null;
      const line = p.price * i.qty;
      subtotal += line;
      return { ...i, product: p, line };
    }).filter(Boolean);

    // auto discounts (first matching rule wins, percent + fixed stacked as separate lines)
    const autoLines = [];
    (CONFIG.autoDiscounts || []).filter(r => r.active).forEach(r => {
      if (r.minSubtotal && subtotal < r.minSubtotal) return;
      let amt = 0;
      if (r.type === 'percent') amt = Math.round(subtotal * r.value / 100);
      else if (r.type === 'fixed') amt = r.value;
      if (amt > 0) autoLines.push({ label: r.label, amount: amt });
    });

    // coupon
    const coup = appliedCoupon();
    let couponLine = null;
    if (coup) {
      if (subtotal >= (coup.minSubtotal || 0)) {
        if (coup.type === 'percent') {
          couponLine = { label: 'Coupon ' + coup.code, amount: Math.min(coup.maxDiscount || Infinity, Math.round(subtotal * coup.value / 100)) };
        } else if (coup.type === 'fixed') {
          couponLine = { label: 'Coupon ' + coup.code, amount: coup.value };
        }
      }
    }

    const discount = autoLines.reduce((s, l) => s + l.amount, 0) + (couponLine ? couponLine.amount : 0);

    // delivery
    const zone = opts.zoneId ? findZone(opts.zoneId) : null;
    const freeDelivery = CONFIG.delivery.freeDeliveryAbove && subtotal >= CONFIG.delivery.freeDeliveryAbove;
    let delivery = 0;
    if (!freeDelivery) {
      if (zone) delivery = zone.charge;
      else delivery = findZone('dhaka').charge; // default until zone chosen
    }
    if (coup && coup.type === 'free_delivery' && subtotal >= (coup.minSubtotal || 0)) delivery = 0;

    // payment gateway charge
    const method = (CONFIG.payments.methods || []).find(m => m.id === opts.paymentId);
    const gatewayPct = method ? method.perGatewayChargePct : 0;
    const gatewayCharge = Math.round(((subtotal - discount) + delivery) * gatewayPct / 100);

    const total = Math.max(0, subtotal - discount + delivery + gatewayCharge);

    return {
      items: detail, subtotal,
      autoLines,
      couponLine,
      discount,
      delivery, freeDelivery,
      zone,
      method,
      gatewayCharge,
      total,
    };
  }

  // ---- checkout field schema → form ------------------------------------
  function fieldsSchema() { return CONFIG.checkoutFields; }
  function isBangla() { return (document.documentElement.lang || 'en') === 'bn'; }

  // ---- order placement -------------------------------------------------
  function placeOrder(payload) {
    const t = computeTotals({ zoneId: payload.zoneId, paymentId: payload.paymentId });
    const order = {
      id: 'GD-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      items: t.items.map(i => ({
        id: i.id, name: i.product.nameEn, variant: i.variant, qty: i.qty,
        price: i.product.price, line: i.line,
      })),
      customer: payload.customer,
      zoneId: t.zone && t.zone.id,
      zoneLabel: t.zone && (isBangla() ? t.zone.labelBn : t.zone.labelEn),
      paymentId: payload.paymentId,
      paymentLabel: t.method && (isBangla() ? t.method.labelBn : t.method.labelEn),
      subtotal: t.subtotal,
      discount: t.discount,
      couponCode: appliedCoupon() ? appliedCoupon().code : null,
      autoLines: t.autoLines,
      delivery: t.delivery,
      gatewayCharge: t.gatewayCharge,
      total: t.total,
      note: payload.note || '',
      status: payload.paymentId === 'cod' ? 'pending' : 'processing',
    };
    const all = JSON.parse(localStorage.getItem(LS_ORDERS) || '[]');
    all.unshift(order); localStorage.setItem(LS_ORDERS, JSON.stringify(all));
    clearCart(); removeCoupon();
    return order;
  }

  // ---- incomplete-order capture (phone = mandatory) ---------------------
  function captureIncomplete(payload) {
    if (!payload || !payload.phone || !/^01\d{9}$/.test(String(payload.phone).replace(/\D/g, ''))) return;
    const t = computeTotals({ zoneId: payload.zoneId, paymentId: payload.paymentId });
    const phone = String(payload.phone).replace(/\D/g, '');
    const all = JSON.parse(localStorage.getItem(LS_INC) || '[]');
    const now = new Date().toISOString();
    t.items.forEach(i => {
      const existing = all.find(r => r.phone === phone && r.productId === i.id);
      if (existing) {
        existing.updatedAt = now;
        existing.qty = i.qty;
        if (payload.customer && payload.customer.name) existing.name = payload.customer.name;
      } else {
        all.push({
          phone, productId: i.id, productName: i.product.nameEn,
          qty: i.qty, price: i.product.price,
          name: (payload.customer && payload.customer.name) || '',
          createdAt: now, updatedAt: now, status: 'incomplete',
        });
      }
    });
    localStorage.setItem(LS_INC, JSON.stringify(all));
  }

  // ---- cart change broadcast -------------------------------------------
  function broadcastCart() {
    document.dispatchEvent(new CustomEvent('cart:change', { detail: { count: cartCount() } }));
  }

  // ---- public API ------------------------------------------------------
  window.Store = {
    taka, bnDigits, fmt, num,
    findProduct, findZone, fieldsSchema, isBangla,
    cart: { add: addToCart, remove: removeFromCart, setQty, clear: clearCart, count: cartCount, items: cartItems },
    coupon: { apply: applyCoupon, remove: removeCoupon, current: appliedCoupon },
    totals: computeTotals,
    placeOrder, captureIncomplete,
  };

  document.addEventListener('DOMContentLoaded', broadcastCart);
})();
