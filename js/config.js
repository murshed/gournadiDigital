/* ============================================================================
   GOURNADI DIGITAL — CONFIG
   ----------------------------------------------------------------------------
   EVERYTHING EDITABLE LIVES IN THIS FILE. No layout code here.
   A non-coder can change the brand, colours, texts, delivery charges,
   coupons, payment methods and the product list by editing values below.

   HOW TO EDIT SAFELY
   1. Only change the text between the 'quote marks' and the numbers.
   2. Keep every comma and bracket exactly where it is.
   3. Prices are plain numbers in Taka (no ৳ sign, no comma). 1990 not "৳1,990"
   4. Images live in /assets — drop your own file in and change the path.
   ========================================================================== */

const CONFIG = {

  /* --- 1. BRAND -------------------------------------------------------- */
  brand: {
    name: 'Gournadi Digital',
    nameBn: 'গৌরনদী ডিজিটাল',
    tagline: 'Gadgets delivered across Bangladesh',
    taglineBn: 'সারা বাংলাদেশে গ্যাজেট ডেলিভারি',
    logo: 'assets/logo.svg',       // swap with your own logo (120×32 ratio)
    currency: '৳',
    // Show Bangla numerals (১২৩) on badges, stats and counters
    banglaNumerals: true,
  },

  /* --- 2. COLOURS ------------------------------------------------------
     Written into CSS variables at page load. Change here, whole site follows. */
  colors: {
    ink:        '#0B1B17',   // near-black text / dark sections
    brand:      '#0F8A5F',   // primary brand green
    brandDeep:  '#0A6B49',   // pressed / darker green
    gold:       '#C8923C',   // premium accent, ratings, borders
    paper:      '#FBF9F4',   // page background
    surface:    '#FFFFFF',   // cards
    line:       '#E4DFD1',   // hairlines
    muted:      '#6E7A73',   // secondary text
    sale:       '#D6293E',   // discount red
    success:    '#0F8A5F',   // in-stock / COD green
  },

  /* --- 3. TOP ANNOUNCEMENT BAR ----------------------------------------- */
  announcement: {
    enabled: true,
    // %DISCOUNT% and %AMOUNT% are filled from the two numbers below
    textBn: 'লঞ্চ অফারে %DISCOUNT% ছাড় — ৳%AMOUNT% এর উপরে অর্ডারে ফ্রি ডেলিভারি',
    textEn: 'Get %DISCOUNT% off during special launch — Free delivery on orders over ৳%AMOUNT%',
    discount: '২৫%',
    amount: 2000,
    speedSeconds: 26,        // lower = faster scroll
  },

  /* --- 4. FLASH SALE / COUNTDOWN END TIME ------------------------------
     Timezone: Asia/Dhaka (+06:00). Format: YYYY-MM-DDTHH:MM:SS+06:00 */
  flashSale: {
    endsAt: '2027-06-07T23:59:00+06:00',
    headingBn: 'ফ্ল্যাশ সেল',
    headingEn: 'Flash sale',
    noteEn: 'Sale ends soon — prices go up',
    noteBn: 'সেল শেষ হচ্ছে — এরপর দাম বাড়বে',
  },

  /* --- 5. CONTACT & SOCIAL --------------------------------------------- */
  contact: {
    phone: '+8801711000000',
    phoneLabel: '০১৭১১-০০০০০০',
    whatsapp: '8801711000000',
    email: 'hello@gournadidigital.com',
    address: 'Gournadi Bus Stand, Barishal 8230, Bangladesh',
    hours: 'প্রতিদিন সকাল ১০টা – রাত ৯টা',
  },
  social: {
    facebook: 'https://facebook.com/',
    messenger: 'https://m.me/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
  },

  /* --- 6. DELIVERY ZONES & CHARGES ------------------------------------- */
  delivery: {
    zones: [
      { id: 'dhaka',   labelBn: 'ঢাকার ভিতরে',   labelEn: 'Inside Dhaka',   charge: 70,  eta: '২৪–৪৮ ঘণ্টা' },
      { id: 'suburb',  labelBn: 'ঢাকার পাশে',    labelEn: 'Dhaka suburb',   charge: 100, eta: '২–৩ দিন' },
      { id: 'outside', labelBn: 'ঢাকার বাইরে',   labelEn: 'Outside Dhaka',  charge: 130, eta: '৩–৫ দিন' },
    ],
    freeDeliveryAbove: 5000,   // set 0 to switch free delivery off
  },

  /* --- 7. CHECKOUT FIELDS ----------------------------------------------
     Every checkout field is described here. The admin panel would write here.
     width  : 100 | 50 | 33   (percent of row)
     show   : visible or hidden
     require: true = block submit if empty / invalid
     placeholderBn / labelBn / placeholderEn / labelEn : shown to shopper */
  checkoutFields: [
    { id:'name',     type:'text',     width:50, show:true,  require:true,  labelBn:'আপনার নাম',       labelEn:'Your name',       placeholderBn:'পুরো নাম লিখুন',   placeholderEn:'Type your full name' },
    { id:'phone',    type:'tel',      width:50, show:true,  require:true,  labelBn:'মোবাইল নম্বর',     labelEn:'Mobile number',   placeholderBn:'০১XXXXXXXXX',       placeholderEn:'01XXXXXXXXX' },
    { id:'address',  type:'textarea', width:100, show:true, require:true,  labelBn:'সম্পূর্ণ ঠিকানা',  labelEn:'Full address',    placeholderBn:'বাড়ি, রোড, এলাকা',  placeholderEn:'House, road, area' },
    { id:'district', type:'select',   width:50, show:true,  require:true,  labelBn:'জেলা',             labelEn:'District',        placeholderBn:'জেলা নির্বাচন করুন', placeholderEn:'Select your district',
      options:[
        'ঢাকা','চট্টগ্রাম','বরিশাল','রাজশাহী','খুলনা','সিলেট','রংপুর','ময়মনসিংহ',
        'গাইবান্ধা','গোপালগঞ্জ','কিশোরগঞ্জ','নরসিংদী','ফরিদপুর','মাদারীপুর','শরীয়তপুর',
        'ভোলা','পটুয়াখালী','পিরোজপুর','বরগুনা','ঝালকাঠি'
      ] },
    { id:'zone',     type:'zoneSelect', width:50, show:true, require:true, labelBn:'ডেলিভারি এরিয়া',  labelEn:'Delivery zone',   placeholderBn:'',                   placeholderEn:'' },
    { id:'note',     type:'textarea', width:100, show:true, require:false, labelBn:'অর্ডার নোট (ঐচ্ছিক)', labelEn:'Order note (optional)', placeholderBn:'বিশেষ কিছু জানাতে চাইলে লিখুন', placeholderEn:'Anything we should know' },
  ],

  /* --- 8. PAYMENT METHODS ----------------------------------------------
     perGatewayChargePct: extra % added to total when this method is chosen.
     CodPercent defaults to 0 (COD never adds a surcharge). Set show:true/false
     to enable / disable each method from the admin panel. */
  payments: {
    showCoupon: true,
    showNote:   true,
    methods: [
      { id:'cod',    labelBn:'ক্যাশ অন ডেলিভারি',     labelEn:'Cash on delivery', perGatewayChargePct:0,  show:true,  hint:'পণ্য পৌঁছে মূল্য পরিশোধ করুন' },
      { id:'bkash',  labelBn:'বিকাশ',                 labelEn:'bKash',            perGatewayChargePct:1.8, show:true, hint:'Send Money to 01711000000' },
      { id:'nagad',  labelBn:'নগদ',                   labelEn:'Nagad',            perGatewayChargePct:1.5, show:true, hint:'Send Money to 01711000000' },
      { id:'rocket', labelBn:'রকেট',                  labelEn:'Rocket',           perGatewayChargePct:1.5, show:true, hint:'Send Money to 01711000000' },
      { id:'ssl',    labelBn:'কার্ড / SSLCommerz',     labelEn:'Card / SSLCommerz', perGatewayChargePct:2.4, show:true, hint:'Visa, Mastercard, Amex' },
    ],
  },

  /* --- 9. COUPONS ------------------------------------------------------
     type: 'percent' | 'fixed' | 'free_delivery'
     minSubtotal: minimum cart subtotal required to use this coupon
     maxDiscount : cap on percent coupons (e.g. 20% but max ৳200 off)
     usageLimit  : total times this code can be used across all customers
     perCustomer : per-customer limit
     startsAt / endsAt : ISO date strings */
  coupons: [
    { code:'LAUNCH25',  type:'percent',      value:25, minSubtotal:0,    maxDiscount:500, startsAt:'2026-01-01', endsAt:'2027-12-31', usageLimit:500, perCustomer:1, active:true,  label:'Launch — 25% off' },
    { code:'GOURNADI',  type:'fixed',        value:150, minSubtotal:1500, maxDiscount:0,  startsAt:'2026-01-01', endsAt:'2027-12-31', usageLimit:2000, perCustomer:1, active:true, label:'৳150 off on ৳1,500+' },
    { code:'FREESHIP',  type:'free_delivery',value:0,   minSubtotal:800,  maxDiscount:0,  startsAt:'2026-01-01', endsAt:'2027-12-31', usageLimit:0,    perCustomer:3, active:true,  label:'Free delivery on ৳800+' },
  ],

  /* --- 10. AUTO DISCOUNTS (no code required) ---------------------------- */
  autoDiscounts: [
    { id:'flash',     type:'percent',  value:15, minSubtotal:0,    scope:'all', active:true, label:'Flash 15% off — everything' },
    { id:'bigorder',  type:'fixed',    value:200, minSubtotal:3000, scope:'all', active:true, label:'৳200 off on ৳3,000+' },
  ],

  /* --- 11. CATEGORIES -------------------------------------------------- */
  categories: [
    { slug:'mobile',     bn:'মোবাইল ও গ্যাজেট',    en:'Mobile & gadgets',   image:'assets/categories/mobile.svg' },
    { slug:'audio',      bn:'অডিও',                en:'Audio',              image:'assets/categories/audio.svg' },
    { slug:'computer',   bn:'কম্পিউটার',           en:'Computer',           image:'assets/categories/computer.svg' },
    { slug:'home',       bn:'হোম অ্যাপ্লায়েন্স',   en:'Home appliance',     image:'assets/categories/home.svg' },
    { slug:'wearable',   bn:'স্মার্ট ওয়াচ',        en:'Smart watch',        image:'assets/categories/wearable.svg' },
    { slug:'accessory',  bn:'অ্যাকসেসরিজ',         en:'Accessories',        image:'assets/categories/accessory.svg' },
  ],

  /* --- 12. BRANDS ------------------------------------------------------ */
  brands: [
    { name:'NorthSound',  logo:'assets/brands/b1.svg' },
    { name:'AeroBeat',    logo:'assets/brands/b2.svg' },
    { name:'PixelCorp',   logo:'assets/brands/b3.svg' },
    { name:'OraWear',     logo:'assets/brands/b4.svg' },
    { name:'VoltHome',    logo:'assets/brands/b5.svg' },
    { name:'Nimbus',      logo:'assets/brands/b6.svg' },
    { name:'Kibo',        logo:'assets/brands/b7.svg' },
    { name:'Halcyon',     logo:'assets/brands/b8.svg' },
  ],

  /* --- 13. HOMEPAGE STATS --------------------------------------------- */
  stats: [
    { value:50000,  bn:'অর্ডার ডেলিভারি হয়েছে',    en:'orders delivered' },
    { value:10000,  bn:'সন্তুষ্ট ক্রেতা',           en:'happy customers' },
    { value:4.8,    bn:'গড় রেটিং',                  en:'average rating', decimal:true },
    { value:64,     bn:'জেলায় ডেলিভারি',             en:'districts served' },
  ],

  /* --- 14. TRUST BADGES ------------------------------------------------ */
  trust: [
    { bn:'ক্যাশ অন ডেলিভারি',  en:'Cash on delivery', icon:'cod' },
    { bn:'নিরাপদ পেমেন্ট',     en:'Secure payment',   icon:'lock' },
    { bn:'সহজ রিটার্ন',        en:'Easy returns',     icon:'return' },
    { bn:'দ্রুত ডেলিভারি',     en:'Fast delivery',    icon:'truck' },
  ],

  /* --- 15. REVIEWS ----------------------------------------------------- */
  reviews: [
    { name:'Nadia H.', city:'ঢাকা',  rating:5, text:'অর্ডার করেছিলাম বিকেলে, পরের দিন সকালেই পেয়ে গেলাম। প্যাকেজিং চমৎকার।' },
    { name:'Rashid M.', city:'চট্টগ্রাম', rating:5, text:'দামের তুলনায় প্রোডাক্ট ভালো। কাস্টমার সাপোর্ট সত্যিই সাহায্য করেছে।' },
    { name:'Tasnim A.', city:'বরিশাল', rating:4, text:'COD অপশন পেয়ে ভালো লেগেছে, ফেরত নেওয়ার সুযোগও আছে।' },
    { name:'Faisal K.', city:'সিলেট', rating:5, text:'আসল ছবি যা পেলাম — হুবহু সেটাই। পরবর্তী অর্ডার আসছে।' },
  ],

  /* --- 16. FAQ --------------------------------------------------------- */
  faq: [
    { q:'ডেলিভারি কত দিনে পাব?', a:'ঢাকার ভিতরে ২৪–৪৮ ঘণ্টা, ঢাকার বাইরে ৩–৫ দিন। অর্ডারের সময় সঠিক ETA দেখানো হয়।' },
    { q:'পেমেন্ট কীভাবে করব?', a:'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, রকেট বা কার্ড — যেকোনোটি বেছে নিন।' },
    { q:'ফেরত / এক্সচেঞ্জ নীতি কী?', a:'পণ্য পৌঁছানোর ৭ দিনের মধ্যে সমস্যা জানালে এক্সচেঞ্জ বা রিফান্ড দেওয়া হয়।' },
    { q:'অর্ডার ট্র্যাক করব কীভাবে?', a:'WhatsApp-এ আমাদের মেসেজ করুন, অর্ডার আইডি দিলে স্ট্যাটাস জানিয়ে দিচ্ছি।' },
    { q:'বাল্ক অর্ডারে কি ছাড় আছে?', a:'হ্যাঁ, ৫০+ পিসের অর্ডারে বিশেষ দাম। সরাসরি ফোন বা WhatsApp-এ যোগাযোগ করুন।' },
  ],

  /* --- 17. PRODUCT CATALOG ---------------------------------------------
     id        : stable SKU string
     nameBn/En : shown beside each other or alone depending on UI
     price     : current price in Taka
     oldPrice  : optional strikethrough price
     rating    : 0..5 average
     reviews   : review count
     stock     : integer > 0; 0 means out of stock
     category  : must match a slug in CONFIG.categories
     brand     : free string
     isNew     : appears in New Arrivals
     isFeatured: appears in Best Sellers / Featured
     flash     : appears in flash sale strip
     images    : first = default; second = hover swap; extra = product gallery
     shortDesc : single-line pitch
     longDesc  : 1-2 short paragraphs
     variants  : optional array — buttons shown on PDP and popup checkout
     type      : 'general' | 'variable' | 'bundle'
     bundle    : only for type:'bundle' — list of product ids included */
  products: [
    { id:'AURA-12', nameEn:'Aura 12 wireless earbuds', nameBn:'Aura 12 ওয়্যারলেস ইয়ারবাড', price:1990, oldPrice:2490, rating:4.8, reviews:182, stock:34, category:'audio',    brand:'NorthSound', isNew:true, isFeatured:true, flash:true, images:['assets/products/p01.svg','assets/products/p01b.svg'], shortDesc:'Hybrid ANC, 36-hour battery, IPX5', longDesc:'ডুয়াল মাইক্রোফোন হাইব্রিড অ্যাক্টিভ নয়েজ ক্যান্সেলেশন সহ। একবার চার্জে ৯ ঘণ্টা এবং কেসসহ ৩৬ ঘণ্টা ব্যাকআপ। টাচ কন্ট্রোল এবং IPX5 ওয়াটার রেজিস্ট্যান্স।', variants:[ {id:'color', name:'Color', values:['Black','White','Sage']} ], type:'variable', sizeChart:false },
    { id:'BUD-PRO', nameEn:'Bud Pro mini speaker',     nameBn:'Bud Pro মিনি স্পিকার',       price:3490, oldPrice:4290, rating:4.7, reviews:96,  stock:21, category:'audio',    brand:'AeroBeat',   isNew:false,isFeatured:true, flash:true, images:['assets/products/p02.svg','assets/products/p02b.svg'], shortDesc:'360° sound, 16-hour playtime', longDesc:'কমপ্যাক্ট ফর্ম ফ্যাক্টরে 360° সাউন্ড। ব্লুটুথ ৫.৩ এবং AUX দুটোই সাপোর্টেড। IPX6 রেটিং — বৃষ্টির দিনে নিশ্চিন্তে ব্যবহার করুন।', variants:[], type:'general' },
    { id:'PIX-15',  nameEn:'Pixel 15 smart watch',     nameBn:'Pixel 15 স্মার্ট ওয়াচ',     price:5490, oldPrice:6990, rating:4.6, reviews:204, stock:17, category:'wearable', brand:'OraWear',    isNew:true, isFeatured:true, flash:false,images:['assets/products/p03.svg','assets/products/p03b.svg'], shortDesc:'AMOLED, GPS, SpO2, 10-day battery', longDesc:'১.৪৩" AMOLED ডিসপ্লে, always-on মোড। GPS ট্র্যাকিং, SpO2 এবং হার্ট রেট মনিটর। ১০ দিন ব্যাটারি, ৫ATM ওয়াটার রেজিস্ট্যান্ট।', variants:[ {id:'size', name:'Strap', values:['22mm Black','22mm Tan','22mm Olive']} ], type:'variable', sizeChart:false },
    { id:'KEY-MX',  nameEn:'Key MX mechanical keyboard', nameBn:'Key MX মেকানিক্যাল কিবোর্ড', price:7990, oldPrice:9990, rating:4.9, reviews:128, stock:9,  category:'computer', brand:'PixelCorp',  isNew:false,isFeatured:true, flash:true, images:['assets/products/p04.svg','assets/products/p04b.svg'], shortDesc:'Hot-swap, RGB, wireless tri-mode', longDesc:'হট-সোয়াপ সুইচ, PBT keycaps, ট্রাই-মোড কানেক্টিভিটি (ব্লুটুথ / 2.4G / টাইপ-সি)। প্রোগ্রামেবল RGB এবং অ্যালুমিনিয়াম চেসিস।', variants:[ {id:'switch', name:'Switch', values:['Red','Brown','Blue']} ], type:'variable', sizeChart:false },
    { id:'CAM-4K',  nameEn:'Cam 4K pocket camera',     nameBn:'Cam 4K পকেট ক্যামেরা',       price:9990, oldPrice:11990,rating:4.5, reviews:64,  stock:6,  category:'mobile',   brand:'PixelCorp',  isNew:true, isFeatured:true, flash:false,images:['assets/products/p05.svg','assets/products/p05b.svg'], shortDesc:'4K60, 3-axis gimbal, AI tracking', longDesc:'৩-অ্যাক্সিস জিম্বাল সহ 4K 60fps শ্যুটিং। AI ট্র্যাকিং এবং ফেস লক। কমপ্যাক্ট ফোল্ডেবল ডিজাইন।', variants:[], type:'general' },
    { id:'ROUT-7',  nameEn:'Rout 7 mesh router',       nameBn:'Rout 7 মেশ রাউটার',         price:12500,oldPrice:15500,rating:4.8, reviews:152, stock:11, category:'computer', brand:'Halcyon',    isNew:false,isFeatured:true, flash:true, images:['assets/products/p06.svg','assets/products/p06b.svg'], shortDesc:'Wi-Fi 7, 6G+2.5G, mesh 3-pack', longDesc:'Wi-Fi 7 (802.11be), 6GHz + 2.5G ইথারনেট। তিনটি নোডে পুরো বাসা কভার। সহজ সেটআপ অ্যাপ সহ।', variants:[], type:'general' },
    { id:'CHG-65',  nameEn:'Charger 65W GaN',          nameBn:'চার্জার ৬৫ ওয়াট GaN',       price:1490, oldPrice:1990, rating:4.7, reviews:341, stock:54, category:'accessory',brand:'Nimbus',     isNew:true, isFeatured:true, flash:true, images:['assets/products/p07.svg','assets/products/p07b.svg'], shortDesc:'65W, dual USB-C + USB-A, foldable', longDesc:'কমপ্যাক্ট GaN ডিজাইন। একই সাথে দুটি ডিভাইস চার্জ, ল্যাপটপ পর্যন্ত সাপোর্ট। ফোল্ডেবল পিন।', variants:[], type:'general' },
    { id:'LITE-9',  nameEn:'Lite 9 e-reader',          nameBn:'Lite 9 ই-রিডার',            price:8990, oldPrice:10990,rating:4.6, reviews:73,  stock:14, category:'mobile',   brand:'Kibo',       isNew:false,isFeatured:true, flash:false,images:['assets/products/p08.svg','assets/products/p08b.svg'], shortDesc:'9" paper-white, waterproof, warm light', longDesc:'পেপার-হোয়াইট ডিসপ্লে, আই কেয়ার ওয়ার্ম লাইট। IPX8 ওয়াটারপ্রুফ, একবার চার্জে ৬ সপ্তাহ।', variants:[], type:'general' },
    { id:'AIR-PUR', nameEn:'AeroClean air purifier',   nameBn:'AeroClean এয়ার পিউরিফায়ার', price:11500,oldPrice:13900,rating:4.5, reviews:88,  stock:8,  category:'home',     brand:'VoltHome',   isNew:true, isFeatured:true, flash:false,images:['assets/products/p09.svg','assets/products/p09b.svg'], shortDesc:'HEPA H13, 35m², smart sensor', longDesc:'৩-স্টেজ HEPA H13 ফিল্ট্রেশন, ৩৫ বর্গমিটার পর্যন্ত রুম কভার। স্মার্ট অটো মোড এবং সাইলেন্ট স্লিপ মোড।', variants:[], type:'general' },
    { id:'MOUSE-X', nameEn:'Mouse X ergonomic',        nameBn:'Mouse X এর্গোনমিক মাউস',    price:2290, oldPrice:2990, rating:4.6, reviews:117, stock:42, category:'accessory',brand:'PixelCorp',  isNew:false,isFeatured:false,flash:true, images:['assets/products/p10.svg','assets/products/p10b.svg'], shortDesc:'Vertical grip, silent click, 4000 DPI', longDesc:'উলম্ব গ্রিপ ডিজাইন — দীর্ঘক্ষণ ব্যবহারে কবজির চাপ কমায়। সাইলেন্ট ক্লিক, ৪০০০ DPI, USB-C রিচার্জেবল।', variants:[], type:'general' },
    { id:'POWER-20',nameEn:'Power 20K power bank',     nameBn:'পাওয়ার ২০কে পাওয়ার ব্যাংক', price:2490, oldPrice:3290, rating:4.7, reviews:223, stock:62, category:'accessory',brand:'Nimbus',     isNew:true, isFeatured:false,flash:true, images:['assets/products/p11.svg','assets/products/p11b.svg'], shortDesc:'20000mAh, 22.5W PD, dual output', longDesc:'USB-C PD ২২.৫ ওয়াট এবং USB-A QC ১৮ ওয়াট। একই সাথে দুটি ডিভাইস চার্জ। কমপ্যাক্ট ডিজাইন।', variants:[], type:'general' },
    { id:'OFF-BUNDLE', nameEn:'Office starter bundle',  nameBn:'অফিস স্টার্টার বান্ডেল',     price:11990,oldPrice:14990,rating:4.8, reviews:31,  stock:5,  category:'computer', brand:'PixelCorp',  isNew:false,isFeatured:true, flash:false,images:['assets/products/p12.svg','assets/products/p12b.svg'], shortDesc:'Keyboard + mouse + hub combo', longDesc:'Key MX কিবোর্ড, Mouse X মাউস এবং ৭-ইন-১ USB-C হাব — তিনটি একসাথে বান্ডেল দামে।', variants:[], type:'bundle', bundle:['KEY-MX','MOUSE-X'] },
  ],

  /* --- 18. NAVIGATION / CATEGORIES MENU ------------------------------- */
  nav: {
    categories: ['mobile','audio','computer','home','wearable','accessory'],
    extras: [
      { labelBn:'অফার',     labelEn:'Offers', href:'pages/shop.html?flash=1' },
      { labelBn:'ব্র্যান্ড', labelEn:'Brands', href:'pages/shop.html' },
      { labelBn:'ব্লগ',      labelEn:'Blog',   href:'pages/blog.html' },
      { labelBn:'যোগাযোগ',   labelEn:'Contact',href:'pages/contact.html' },
    ],
  },

  /* --- 19. HERO --------------------------------------------------------
     Two-line headline. Second line cycles through typing phrases. */
  hero: {
    slides: [
      { line1Bn:'বাংলাদেশের', line1En:'For Bangladesh,', line2:[ 'the smartest gadget pick', 'সেরা গ্যাজেট পছন্দ', 'delivered the next day', 'ই সকল ক্যাটাগরিতে' ], ctaBn:'এখনই কিনুন', ctaEn:'Shop now', image:'assets/banners/hero1.svg', bg:'#123A2C' },
      { line1Bn:'লঞ্চ স্পেশাল', line1En:'Launch special,', line2:[ 'up to ৳7,000 off', '২৫% পর্যন্ত ছাড়', 'free delivery above ৳2,000', '২,০০০+ এ ফ্রি ডেলিভারি' ], ctaBn:'অফার দেখুন', ctaEn:'See offers', image:'assets/banners/hero2.svg', bg:'#0F8A5F' },
      { line1Bn:'সারা দেশে', line1En:'Nationwide,', line2:[ 'cash on delivery', 'ক্যাশ অন ডেলিভারি', '64 districts served', '৬৪ জেলায় পৌঁছানো' ], ctaBn:'অর্ডার শুরু করুন', ctaEn:'Start an order', image:'assets/banners/hero3.svg', bg:'#0B1B17' },
    ],
  },

  /* --- 20. CONNECT HUB (floating quick contacts) ------------------------
     master on/off, individual toggles, replace numbers/links as needed. */
  connectHub: {
    enabled: true,
    items: [
      { id:'whatsapp',  enabled:true,  label:'WhatsApp', value:'8801711000000' },
      { id:'phone',     enabled:true,  label:'Call',     value:'+8801711000000' },
      { id:'messenger', enabled:true,  label:'Messenger',value:'https://m.me/' },
      { id:'email',     enabled:true,  label:'Email',    value:'hello@gournadidigital.com' },
    ],
  },

  /* --- 21. FOOTER COLUMNS ------------------------------------------------
     Edit links/headings from here; the footer template reads this object. */
  footer: {
    columns: [
      { title:'ক্যাটাগরি', links: [
        { label:'মোবাইল ও গ্যাজেট', href:'pages/shop.html?cat=mobile' },
        { label:'অডিও',             href:'pages/shop.html?cat=audio' },
        { label:'কম্পিউটার',         href:'pages/shop.html?cat=computer' },
        { label:'হোম অ্যাপ্লায়েন্স', href:'pages/shop.html?cat=home' },
        { label:'স্মার্ট ওয়াচ',     href:'pages/shop.html?cat=wearable' },
        { label:'অ্যাকসেসরিজ',      href:'pages/shop.html?cat=accessory' },
      ]},
      { title:'সহায়তা', links: [
        { label:'সব পণ্য',        href:'pages/shop.html' },
        { label:'অফার / ফ্ল্যাশ সেল', href:'pages/shop.html?flash=1' },
        { label:'ব্লগ',            href:'pages/blog.html' },
        { label:'যোগাযোগ',         href:'pages/contact.html' },
        { label:'রিটার্ন পলিসি',  href:'pages/returns.html' },
        { label:'প্রাইভেসি',      href:'pages/privacy.html' },
        { label:'শর্তাবলি',       href:'pages/terms.html' },
      ]},
      { title:'আমার অ্যাকাউন্ট', links: [
        { label:'কার্ট',            href:'pages/cart.html' },
        { label:'চেকআউট',           href:'pages/checkout.html' },
        { label:'অর্ডার ট্র্যাক',   href:'https://wa.me/8801711000000' },
        { label:'আমার অ্যাকাউন্ট',  href:'pages/account.html' },
      ]},
    ],
  },

  /* --- 22. BLOG ---------------------------------------------------------
     slug     : used in /pages/blog-post.html?slug=...
     image    : hero image (use any asset or paste your own path)
     cat      : shown as a chip
     tags     : shown as chips at the bottom of the post
     excerpt  : 1 line used in the grid
     body     : array of paragraphs / sub-headings (rendered as <p> / <h3>)
     author   : name
     date     : ISO date
     read     : read-time minutes */
  blog: {
    cats: ['সব','গ্যাজেট গাইড','রিভিউ','অফার','টিপস','কোম্পানি'],
    posts: [
      { slug:'true-wireless-2026', cat:'গ্যাজেট গাইড', title:'২০২৬ সালে সেরা ট্রু ওয়্যারলেস ইয়ারবাড কেনার আগে যা জানা দরকার', image:'assets/banners/hero1.svg', excerpt:'ANC, ড্রাইভার সাইজ, কোডেক — কোনটা আপনার কানের জন্য সঠিক?', tags:['ইয়ারবাড','ANC','ব্লুটুথ'], author:'রাহাত চৌধুরী', date:'2026-08-21', read:6,
        body:[
          {h:'বাজেট নির্ধারণ করুন'},
          {p:'দেশীয় বাজারে ১,৫০০ থেকে ১৫,০০০ টাকার মধ্যে বিস্তৃত রেঞ্জ পাবেন। বাজেট ঠিক করলে সিদ্ধান্ত নেওয়া সহজ হয়।'},
          {h:'ANC কী এবং কখন দরকার'},
          {p:'হাইব্রিড ANC সবচেয়ে কার্যকর। ক্যাজুয়াল শোনার জন্য ২৫-৩০ ডেসিবেল কমানোই যথেষ্ট।'},
          {h:'ব্যাটারি লাইফ'},
          {p:'একবার চার্জে ৬-১০ ঘণ্টা এবং কেসসহ ৩০+ ঘণ্টা ভালো মানদণ্ড।'},
        ]},
      { slug:'smartwatch-vs-band', cat:'তুলনা', title:'স্মার্ট ওয়াচ নাকি ফিটনেস ব্যান্ড — কোনটা আপনার জন্য?', image:'assets/banners/hero2.svg', excerpt:'AMOLED, GPS, ব্যাটারি — সিদ্ধান্ত নেওয়ার আগে তুলনা দেখুন।', tags:['স্মার্ট ওয়াচ','ফিটনেস ব্যান্ড','তুলনা'], author:'নাজনীন আক্তার', date:'2026-08-12', read:5,
        body:[
          {h:'পার্থক্য কোথায়'},
          {p:'ফিটনেস ব্যান্ড সাধারণত ছোট, সস্তা, দীর্ঘ ব্যাটারি। স্মার্ট ওয়াচ দেয় অ্যাপ সাপোর্ট, GPS, বড় ডিসপ্লে।'},
          {h:'আমাদের সুপারিশ'},
          {p:'যদি শুধু স্টেপ এবং ঘুম ট্র্যাক করতে চান — ব্যান্ড যথেষ্ট। নোটিফিকেশন এবং কল উত্তর দরকার হলে স্মার্ট ওয়াচ নিন।'},
        ]},
      { slug:'mechanical-keyboard-guide', cat:'গ্যাজেট গাইড', title:'মেকানিক্যাল কিবোর্ড: রেড, ব্রাউন, ব্লু — কোন সুইচ আপনার?', image:'assets/banners/hero3.svg', excerpt:'চাপের অনুভূতি, শব্দ, গেমিং টাইপিং — ভেঙে দেখাচ্ছি।', tags:['কিবোর্ড','মেকানিক্যাল','গেমিং'], author:'আবিদ হাসান', date:'2026-08-04', read:7,
        body:[
          {h:'রেড সুইচ'},
          {p:'লিনিয়ার, শান্ত, দ্রুত — গেমিং এবং দ্রুত টাইপিংয়ে দারুণ।'},
          {h:'ব্রাউন সুইচ'},
          {p:'হালকা ট্যাকটাইল — অফিস এবং বাসায় দুটোতেই ভালো কাজ করে।'},
          {h:'ব্লু সুইচ'},
          {p:'ক্লিকি, উচ্চ শব্দ — টাইপিং উপভোগ করতে চাইলে সেরা।'},
        ]},
      { slug:'flash-sale-myths', cat:'টিপস', title:'ফ্ল্যাশ সেল আসলে কাজ করে কীভাবে — ৫টি মিথ ভাঙা', image:'assets/banners/promo.svg', excerpt:'স্টক সীমিত থাকে, দাম বাড়ে, কিন্তু কোনটা বেশি কাজ করে?', tags:['ফ্ল্যাশ সেল','অফার','টিপস'], author:'এডিটরস ডেস্ক', date:'2026-07-28', read:4,
        body:[
          {h:'মিথ ১: ফ্ল্যাশ সেলে পণ্য নতুন'},
          {p:'বেশিরভাগ সময় একই পণ্য, শুধু সময়সীমা বেঁধে দেওয়া হয়।'},
          {h:'আসল সুবিধা'},
          {p:'আপনি যদি আগে থেকে পণ্য চিহ্নিত রাখেন, ফ্ল্যাশ সেলে কয়েকশ টাকা বাঁচানো সম্ভব।'},
        ]},
      { slug:'gournadi-story', cat:'কোম্পানি', title:'গৌরনদী থেকে সারাদেশে — আমাদের গল্প', image:'assets/banners/hero1.svg', excerpt:'২০২২ সালে একটি ছোট দোকান থেকে শুরু করা আজকের ৬৪ জেলায় পৌঁছানো।', tags:['গৌরনদী','কোম্পানি','গল্প'], author:'ফাউন্ডার', date:'2026-07-10', read:3,
        body:[
          {h:'শুরুর কথা'},
          {p:'বরিশালের গৌরনদী বাসস্ট্যান্ডের পাশে ছোট্ট একটি দোকান। লক্ষ্য ছিল একটাই — ভালো পণ্য, সঠিক দামে, সময়মতো পৌঁছে দেওয়া।'},
          {h:'আজ'},
          {p:'৬৪ জেলায় ডেলিভারি, হাজারো সন্তুষ্ট ক্রেতা, এবং দলে আছেন ১২ জন। ধন্যবাদ আপনাদের ভরসার জন্য।'},
        ]},
      { slug:'monsoon-care', cat:'টিপস', title:'বর্ষায় ইলেকট্রনিক্স সুরক্ষিত রাখার ৭টি উপায়', image:'assets/banners/hero2.svg', excerpt:'আর্দ্রতা, পানি, বিদ্যুৎ স্পাইক — আপনার গ্যাজেট বাঁচান সহজেই।', tags:['বর্ষা','টিপস','রক্ষণাবেক্ষণ'], author:'টেক টিম', date:'2026-06-22', read:4,
        body:[
          {h:'সিলিকা জেল'},
          {p:'প্রতিটি ইলেকট্রনিক্স বাক্সে সিলিকা জেল রাখুন — আর্দ্রতা শোষণ করে।'},
          {h:'সার্জ প্রোটেক্টর'},
          {p:'বিদ্যুৎ স্পাইক থেকে রক্ষা পেতে সার্জ প্রোটেক্টর ব্যবহার করুন — ৫০০ টাকা থেকে শুরু।'},
        ]},
    ],
  },

  /* --- 23. LEGAL & POLICY ----------------------------------------------
     Plain Bangla copy for /pages/returns.html, /pages/privacy.html, /pages/terms.html.
     Edit freely — these are rendered verbatim into the page. */
  legal: {
    returns: {
      title:'রিটার্ন ও রিফান্ড পলিসি',
      updated:'2026-09-01',
      intro:'আমরা চাই আপনি সন্তুষ্ট থাকুন। নিচে আমাদের রিটার্ন ও রিফান্ড নীতি সহজ ভাষায় বর্ণনা করা হলো।',
      sections:[
        {h:'১. রিটার্নের সময়সীমা', p:'পণ্য গ্রহণের ৩ দিনের (৭২ ঘণ্টা) মধ্যে রিটার্ন অনুরোধ জানাতে হবে। নির্দিষ্ট কিছু পণ্য (যেমন ইয়ারবাড, স্মার্ট ওয়াচ) সিল খোলা থাকলে রিটার্ন গ্রহণযোগ্য নয় — সেক্ষেত্রে ওয়ারেন্টি প্রযোজ্য।'},
        {h:'২. কোন পণ্য ফেরত যোগ্য', p:'(ক) ডেলিভারির সময় ক্ষতিগ্রস্ত, (খ) ভুল পণ্য বা ভুল সাইজ/রঙ, (গ) প্রোডাক্ট পেজে বর্ণিত বৈশিষ্ট্যের সাথে মৌলিক তারতম্য। খোলা বা ব্যবহৃত পণ্য সাধারণত ফেরত যোগ্য নয়।'},
        {h:'৩. রিফান্ড পদ্ধতি', p:'রিফান্ড মূল পেমেন্ট পদ্ধতিতেই ফেরত দেওয়া হবে: bKash/Nagad/Rocket — ৩-৫ কর্মদিবস; কার্ড — ৭-১৪ কর্মদিবস; ক্যাশ অন ডেলিভারি — ব্যাংক ট্রান্সফার।'},
        {h:'৪. পিকআপ', p:'আমাদের কুরিয়ার পার্টনার পণ্য পিকআপ করবে। ঢাকার ভিতরে ২৪ ঘণ্টা, বাইরে ২-৩ দিন।'},
        {h:'৫. এক্সচেঞ্জ', p:'সাইজ বা রঙ বদলাতে চাইলে একই দামের পণ্যে এক্সচেঞ্জ করা যাবে — স্টক থাকা সাপেক্ষে।'},
        {h:'৬. যোগাযোগ', p:'রিটার্ন শুরু করতে WhatsApp (+৮৮০ ১৭১১-০০০০০০) অথবা hello@gournadidigital.com-এ অর্ডার আইডি পাঠান।'},
      ],
      faq:[
        {q:'ডেলিভারির সময় পণ্য ভাঙা পেলে কী করব?', a:'২৪ ঘণ্টার মধ্যে আনবক্সিং ভিডিওসহ যোগাযোগ করুন — আমরা পূর্ণ রিফান্ড বা রিপ্লেসমেন্ট পাঠাব।'},
        {q:'মন পরিবর্তন হলে কি ফেরত দিতে পারব?', a:'অব্যবহৃত এবং অরিজিনাল প্যাকেজিং-এ থাকলে ৩ দিনের মধ্যে ফেরত যোগ্য।'},
        {q:'রিফান্ড কত দিনে পাব?', a:'পিকআপের পর ৩-৫ কর্মদিবস (মোবাইল ওয়ালেট), ৭-১৪ দিন (কার্ড)।'},
      ],
    },
    privacy: {
      title:'প্রাইভেসি পলিসি',
      updated:'2026-09-01',
      intro:'আপনার ব্যক্তিগত তথ্যের সুরক্ষা আমাদের দায়িত্ব। এই পলিসিতে আমরা কী সংগ্রহ করি, কীভাবে ব্যবহার করি এবং আপনার অধিকার বর্ণনা করা হলো।',
      sections:[
        {h:'১. আমরা যে তথ্য সংগ্রহ করি', p:'নাম, মোবাইল নম্বর, ঠিকানা, ইমেইল (ঐচ্ছিক), অর্ডার ইতিহাস। পেমেন্ট তথ্য আমাদের কাছে সংরক্ষিত হয় না — সরাসরি পেমেন্ট গেটওয়ে প্রক্রিয়া করে।'},
        {h:'২. কীভাবে ব্যবহার করি', p:'অর্ডার প্রক্রিয়াকরণ, ডেলিভারি, কাস্টমার সাপোর্ট, এবং প্রচারিত অফার সম্পর্কে আপডেট পাঠানো (আপনি যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন)।'},
        {h:'৩. কুকিজ', p:'আমরা সেশন কুকিজ এবং বিশ্লেষণ কুকিজ (Google Analytics) ব্যবহার করি। আপনি ব্রাউজার থেকে কুকি ব্লক করতে পারবেন — তবে কার্ট ফিচার সীমিত হতে পারে।'},
        {h:'৪. তৃতীয় পক্ষ', p:'ডেলিভারি পার্টনার (Pathao/Steadfast/RedX) শুধু প্রয়োজনীয় তথ্য পায় (নাম, ফোন, ঠিকানা)। পেমেন্ট গেটওয়ে (SSLCommerz, bKash) নিজস্ব প্রাইভেসি পলিসি মেনে চলে।'},
        {h:'৫. ডেটা সংরক্ষণ', p:'অর্ডার ডেটা ৫ বছর পর্যন্ত রাখা হয় (আইনি প্রয়োজনে)। মার্কেটিং ডেটা আনসাবস্ক্রাইবের পর ৩০ দিনের মধ্যে মুছে ফেলা হয়।'},
        {h:'৬. আপনার অধিকার', p:'আপনি যেকোনো সময় আপনার ডেটা দেখা, সংশোধন বা মুছে ফেলার অনুরোধ জানাতে পারবেন — hello@gournadidigital.com।'},
        {h:'৭. পরিবর্তন', p:'পলিসিতে কোনো পরিবর্তন এখানে প্রকাশ করা হবে।'},
      ],
    },
    terms: {
      title:'ব্যবহারের শর্তাবলি',
      updated:'2026-09-01',
      intro:'এই ওয়েবসাইট ব্যবহার করে আপনি নিচের শর্তাবলীতে সম্মত হচ্ছেন।',
      sections:[
        {h:'১. অ্যাকাউন্ট', p:'সঠিক তথ্য দিয়ে অর্ডার করুন। ভুয়া তথ্য দিলে অর্ডার বাতিলের অধিকার আমাদের আছে।'},
        {h:'২. দাম ও স্টক', p:'সব দাম বাংলাদেশি টাকায় এবং VAT অন্তর্ভুক্ত। স্টক সীমিত — অর্ডার গ্রহণের পর স্টক না থাকলে পূর্ণ রিফান্ড দেওয়া হবে।'},
        {h:'৩. অর্ডার গ্রহণ', p:'আমরা যেকোনো সময় অর্ডার প্রত্যাখ্যান বা বাতিল করার অধিকার রাখি — কুপন অপব্যবহার, সন্দেহজনক কার্যকলাপ বা স্টক সমস্যার ক্ষেত্রে।'},
        {h:'৪. পেমেন্ট', p:'bKash, Nagad, Rocket, কার্ড এবং ক্যাশ অন ডেলিভারি গ্রহণযোগ্য। ক্যাশ অন ডেলিভারিতে অতিরিক্ত চার্জ প্রযোজ্য।'},
        {h:'৫. বৌদ্ধিক সম্পত্তি', p:'সাইটের সব ছবি, লোগো এবং কন্টেন্ট Gournadi Digital-এর সম্পত্তি — অনুমতি ছাড়া ব্যবহার নিষিদ্ধ।'},
        {h:'৬. দায় সীমাবদ্ধতা', p:'পরোক্ষ, আকস্মিক বা পরিণতিমূলক ক্ষতির জন্য আমরা দায়ী থাকব না।'},
        {h:'৭. আইন', p:'এই শর্তাবলি বাংলাদেশের আইন দ্বারা পরিচালিত। যেকোনো বিরোধ বরিশাল আদালতের এখতিয়ারাধীন।'},
        {h:'৮. যোগাযোগ', p:'প্রশ্নের জন্য hello@gournadidigital.com অথবা +৮৮০ ১৭১১-০০০০০০।'},
      ],
    },
  },
};

if (typeof window !== 'undefined') window.CONFIG = CONFIG;

