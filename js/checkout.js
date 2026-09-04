/* ============================================================================
   CHECKOUT — schema-driven fields, zone selection, payment, total calc.
   Incomplete order captured when phone is valid (before submit).
   ============================================================================ */

(function () {
  const { $, $$, N, money, toast } = UI;

  const schema = CONFIG.checkoutFields;

  function buildFields() {
    $('[data-fields]').innerHTML = schema.map(f => `
      <div class="field" data-field="${f.id}" data-w="${f.width}">
        <label for="chk-${f.id}">${f.labelBn}${f.require ? '<em aria-hidden="true">*</em>' : ''}</label>
        ${f.type === 'textarea' ? `<textarea id="chk-${f.id}" name="${f.id}" placeholder="${f.placeholderBn || ''}"${f.require ? ' required' : ''}></textarea>` :
          f.type === 'select' ? `<select id="chk-${f.id}" name="${f.id}"${f.require ? ' required' : ''}><option value="">${f.placeholderBn || 'নির্বাচন করুন'}</option>${(f.options || []).map(o => `<option>${o}</option>`).join('')}</select>` :
          `<input id="chk-${f.id}" type="${f.type}" name="${f.id}" placeholder="${f.placeholderBn || ''}"${f.require ? ' required' : ''}${f.id === 'phone' ? ' inputmode="numeric" maxlength="11"' : ''}>`}
        <span class="field__err" data-err></span>
      </div>`).join('');
  }

  function buildZones() {
    const z = CONFIG.delivery.zones;
    const s = $('[data-payments]').closest('.checkout-grid');
    // Put zones in the right container
    const box = $('[data-payments]').parentElement;
    box.insertAdjacentHTML('beforebegin', `<div class="zones" style="margin-top:4px"><div class="zone" data-zone-item>
      ${z.map(zone => `<label class="zone" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--c-line);border-radius:10px;margin-bottom:6px;background:var(--c-paper);cursor:pointer">
        <input type="radio" name="zone" value="${zone.id}" ${zone.id === 'dhaka' ? 'checked' : ''} style="accent-color:var(--c-brand);width:18px;height:18px">
        <b>${zone.labelBn}</b><span>${money(zone.charge)}</span><span style="margin-left:auto;color:var(--c-muted);font-size:12.5px">${zone.eta}</span>
      </label>`).join('')}
    </div></div>`);
  }

  function buildPayments() {
    const payBox = $('[data-payments]');
    payBox.innerHTML = (CONFIG.payments.methods || []).filter(m => m.show).map(m => `
      <label class="pay" style="display:flex;align-items:center;gap:10px;padding:13px;border:1px solid var(--c-line);border-radius:10px;background:var(--c-paper);cursor:pointer;margin-bottom:8px">
        <input type="radio" name="payment" value="${m.id}" ${m.id === 'cod' ? 'checked' : ''} style="accent-color:var(--c-brand);width:18px;height:18px">
        <div>
          <b>${m.labelBn}</b>
          <span style="font-size:12.5px;color:var(--c-muted);display:block">${m.hint}</span>
          ${m.perGatewayChargePct ? `<span style="font-size:11.5px;color:var(--c-brand);font-weight:600">+${m.perGatewayChargePct}% চার্জ</span>` : ''}
        </div>
      </label>`).join('');
  }

  function updateSummary() {
    const zone = $('input[name="zone"]:checked');
    const zoneId = zone ? zone.value : 'dhaka';
    const pay = $('input[name="payment"]:checked');
    const payId = pay ? pay.value : 'cod';
    const t = Store.totals({ zoneId, paymentId: payId });
    const s = $('[data-checkout-summary]');
    s.innerHTML = `<h2>অর্ডার সারাংশ</h2><div style="padding:10px 0;border-top:1px solid var(--c-line);margin-top:10px">
      <div class="srow"><span>সাবটোটাল</span><span>${money(t.subtotal)}</span></div>
      ${t.autoLines.map(l => `<div class="srow srow--dim"><span>${l.label}</span><span>−${money(l.amount)}</span></div>`).join('')}
      <div style="margin-top:8px"><span style="font-size:13.5px">কুপন</span><div style="font-size:14px;color:var(--c-muted)">কোড প্রয়োগ করতে কার্টে যান</div></div>
      <div class="srow"><span>ডেলিভারি</span><span>${t.freeDelivery ? 'ফ্রি' : money(t.delivery)}</span></div>
      ${t.gatewayCharge ? `<div class="srow"><span>পেমেন্ট চার্জ</span><span>${money(t.gatewayCharge)}</span></div>` : ''}
      <div class="srow srow--total"><span>মোট</span><span style="font-size:22px">${money(t.total)}</span></div>
      <a class="btn btn--primary btn--block" href="cart.html" style="margin-top:14px">কার্টে ফিরুন</a>
    </div>`;
  }

  function bind() {
    document.addEventListener('change', e => {
      if (e.target.matches('input[name="zone"]')) updateSummary();
      if (e.target.matches('input[name="payment"]')) updateSummary();
    });
    $('[data-checkout-form]').addEventListener('submit', e => {
      e.preventDefault();
      const d = {};
      $$('[data-field] input, [data-field] select, [data-field] textarea').forEach(el => { d[el.name] = (el.value || '').trim(); });
      if (!d.phone || !/^01\d{9}$/.test(d.phone.replace(/\D/g, ''))) {
        $('[data-field="phone"] .field__err').textContent = 'সঠিক ১১ ডিজিটের ফোন (01XXXXXXXXX) দিন';
        $('[data-field="phone"]').dataset.invalid = 'true';
        return;
      }
      // Capture incomplete order when phone is valid (before placing)
      Store.captureIncomplete({ phone: d.phone, zoneId: d.zone, paymentId: d.payment, customer: { name: d.name } });
      const order = Store.placeOrder({
        customer: { name: d.name, phone: d.phone, address: d.address, district: d.district },
        zoneId: d.zone, paymentId: d.payment, note: d.note || '',
      });
      sessionStorage.setItem('gd_last_order', JSON.stringify(order));
      location.href = '../pages/thank-you.html';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    UI.mount(); buildFields(); buildZones(); buildPayments(); updateSummary(); bind();
  });
})();
