// =====================================================
// Focus Cards – consolidated, no duplicate listeners
// =====================================================
const container  = document.querySelector('.focus-cards');
const cards      = document.querySelectorAll('.focus-card');
const leftArrow  = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');

const scrollAmount = window.innerWidth * 0.4;
let arrowScrolling = false;

leftArrow.addEventListener('click', () => {
  arrowScrolling = true;
  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  setTimeout(() => { arrowScrolling = false; }, 500);
});

rightArrow.addEventListener('click', () => {
  arrowScrolling = true;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(() => { arrowScrolling = false; }, 500);
});

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (arrowScrolling) return;
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
});

function updateArrows() {
  leftArrow.classList.toggle('disabled', container.scrollLeft <= 0);
  rightArrow.classList.toggle(
    'disabled',
    container.scrollLeft + container.clientWidth >= container.scrollWidth - 5
  );
}

container.addEventListener('scroll', updateArrows);
window.addEventListener('load', updateArrows);


// =====================================================
// Navbar – scroll class
// =====================================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// =====================================================
// Active nav tracking via scroll position
// =====================================================
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');
const sections   = document.querySelectorAll('section[id]');

function updateActiveNav() {
  // Treat a point 35% down from the top of the viewport as the "current" position
  const triggerY = window.scrollY + window.innerHeight * 0.35;

  let activeId = null;
  sections.forEach(section => {
    if (section.offsetTop <= triggerY) {
      activeId = section.id;
    }
  });

  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // set correct state on load


// =====================================================
// Scroll reveal via IntersectionObserver
// =====================================================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// =====================================================
// Mobile menu toggle
// =====================================================
const menuToggle = document.getElementById('menuToggle');
const navLinksEl = document.getElementById('navLinks');

if (menuToggle && navLinksEl) {
  menuToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });
}


// =====================================================
// Testimonials – 10 entries, editorial card design
// =====================================================
const testimonials = [
  {
    name: "Anna S.",
    descriptor: "30s · Working professional",
    review: "I learned how to pause and respond instead of reacting. That alone changed everything — at work, at home, with myself.",
    date: "Jul 2024"
  },
  {
    name: "James L.",
    descriptor: "40s · Career transition",
    review: "I finally felt heard without judgment. For the first time in years, I didn't feel like I had to perform being okay.",
    date: "Jul 2024"
  },
  {
    name: "Emily J.",
    descriptor: "20s · University student",
    review: "I gained clarity around patterns I didn't even realise were running my life. Therapy didn't fix me — it helped me see clearly.",
    date: "Jul 2024"
  },
  {
    name: "Michael B.",
    descriptor: "30s · After a difficult breakup",
    review: "I came in feeling completely lost. I left with tools, perspective, and a path I could actually follow.",
    date: "Jun 2024"
  },
  {
    name: "Sarah J.",
    descriptor: "40s · Managing chronic stress",
    review: "She listens in a way I've rarely experienced. The tools are practical — they work in the middle of real life, not just in the session.",
    date: "Jun 2024"
  },
  {
    name: "Priya K.",
    descriptor: "20s · Navigating anxiety",
    review: "The sessions gave me a language for what I was feeling. Being understood — really understood — was already half the healing.",
    date: "May 2024"
  },
  {
    name: "David M.",
    descriptor: "50s · First time in therapy",
    review: "I came in sceptical. I left with genuine insight. It's rare to feel both challenged and completely safe in the same space.",
    date: "May 2024"
  },
  {
    name: "Leila R.",
    descriptor: "30s · Life transition",
    review: "I stopped feeling like I had to figure everything out on my own. That shift — that permission to not be alone in it — changed how I carry stress.",
    date: "May 2024"
  },
  {
    name: "Tom H.",
    descriptor: "40s · Relationship difficulties",
    review: "The consistency and warmth made it easy to be honest — with her, and eventually with myself. Real work. Real results.",
    date: "Apr 2024"
  },
  {
    name: "Nadia F.",
    descriptor: "20s · Self-esteem",
    review: "I built confidence I didn't think existed in me. Each session felt purposeful — like we were going somewhere specific together.",
    date: "Apr 2024"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("testimonialsGrid");

  function getInitials(name) {
    return name.split(/[\s.]+/).filter(Boolean).map(p => p[0]).join('').toUpperCase().slice(0, 2);
  }

  testimonials.slice(0, 6).forEach(t => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <span class="tc-quote-mark">\u201C</span>
      <p class="tc-review">${t.review}</p>
      <div class="tc-person">
        <div class="tc-initials">${getInitials(t.name)}</div>
        <div class="tc-meta">
          <span class="tc-name">${t.name}</span>
          <span class="tc-descriptor">${t.descriptor} · ${t.date}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
});


// =====================================================
// Canvas – sine wave animation (fixed: let i, const/let)
// =====================================================
(function () {
  const unit = 100;
  let canvas, context, height, width, xAxis, yAxis;

  function init() {
    canvas        = document.getElementById("sineCanvas");
    canvas.width  = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    context       = canvas.getContext("2d");
    height        = canvas.height;
    width         = canvas.width;
    xAxis         = Math.floor(height - 100);
    yAxis         = 0;
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    drawWave("#eeddff", 0.3, 3, 0);
    drawWave("#b89acb", 0.4, 2, 250);
    drawWave("#a783c3", 0.2, 1.6, 100);
    draw.seconds += 0.003;
    draw.t = draw.seconds * Math.PI;
    setTimeout(draw, 35);
  }

  draw.seconds = 0;
  draw.t       = 0;

  function drawWave(color, _alpha, zoom, delay) {
    context.fillStyle   = color;
    context.strokeStyle = color;
    context.lineWidth   = 2;
    context.beginPath();
    drawSine(draw.t / 0.5, zoom, delay);
    context.stroke()
  }

  function drawSine(t, zoom, delay) {
    const y0 = Math.sin(t) / zoom;
    context.moveTo(yAxis, unit * y0 + xAxis);
    for (let i = yAxis; i <= width + 10; i += 10) {
      const x = t + (-yAxis + i) / unit / zoom;
      const y = Math.sin(x - delay) / 3;
      context.lineTo(i, unit * y + xAxis);
    }
  }

  init();
})();


// =====================================================
// Footer phone – social posts + auto-scroll
// =====================================================

// ── Add your real URLs below ─────────────────────────
const socialPosts = [
  {
    platform: 'YouTube',
    icon: 'fa-brands fa-youtube',
    bg: 'linear-gradient(160deg, #c4302b 0%, #8b0000 100%)',
    url: 'YOUR_YOUTUBE_URL',           // ← replace
  },
  {
    platform: 'Instagram',
    icon: 'fa-brands fa-instagram',
    bg: 'linear-gradient(160deg, #833ab4 0%, #fd1d1d 55%, #fcb045 100%)',
    url: 'https://www.instagram.com/vaasanthika/?hl=en',         // ← replace
  },
  {
    platform: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    bg: 'linear-gradient(160deg, #0077b5 0%, #004f80 100%)',
    url: 'YOUR_LINKEDIN_URL',          // ← replace
  },
  {
    platform: 'Threads',
    icon: 'fa-brands fa-threads',
    bg: 'linear-gradient(160deg, #1a1a1a 0%, #383838 100%)',
    url: 'YOUR_THREADS_URL',           // ← replace
  },
  {
    platform: 'YouTube',
    icon: 'fa-brands fa-youtube',
    bg: 'linear-gradient(160deg, #ff4e45 0%, #c4302b 100%)',
    url: 'YOUR_YOUTUBE_URL',           // ← replace
  },
  {
    platform: 'Instagram',
    icon: 'fa-brands fa-instagram',
    bg: 'linear-gradient(160deg, #fcaf45 0%, #e1306c 55%, #833ab4 100%)',
    url: 'YOUR_INSTAGRAM_URL',         // ← replace
  },
];

const scroller = document.getElementById('autoScroll');

// Render posts from the array
socialPosts.forEach(p => {
  const el = document.createElement('div');
  el.className  = 'post';
  el.style.background = p.bg;
  el.dataset.url      = p.url;
  el.innerHTML = `
    <i class="post-platform-icon ${p.icon}"></i>
    <span class="post-platform-name">${p.platform}</span>
    <span class="post-tap-hint">Tap to visit</span>
  `;
  scroller.appendChild(el);
});

// Click → open URL
scroller.addEventListener('click', e => {
  const post = e.target.closest('.post');
  if (post && post.dataset.url && !post.dataset.url.startsWith('YOUR')) {
    window.open(post.dataset.url, '_blank', 'noopener');
  }
});

// Seamless loop duplication
scroller.innerHTML += scroller.innerHTML;
const totalWidth = scroller.scrollWidth / 2;

const speed = 0.03;
let lastTime = performance.now();
let offset   = 0;
let paused   = false;

function animate(time) {
  if (!paused) {
    const delta = time - lastTime;
    offset += delta * speed;
    if (offset >= totalWidth) offset -= totalWidth;
    scroller.style.transform = `translateX(${-offset}px)`;
  }
  lastTime = time;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

const phoneMock = document.querySelector('.phone');
phoneMock.addEventListener('mouseenter', () => { paused = true; });
phoneMock.addEventListener('mouseleave', () => { paused = false; });
phoneMock.addEventListener('touchstart', () => { paused = true;  }, { passive: true });
phoneMock.addEventListener('touchend',   () => { paused = false; }, { passive: true });


// =====================================================
// BOOKING MODAL
// ─────────────────────────────────────────────────────
// Fill in before going live:
//
//  whatsappNumber    — e.g. '919876543210' (no + or spaces)
//
//  appsScriptUrl     — Apps Script that handles POST
//    (writes booking row to Google Sheets):
//    function doPost(e) {
//      const d = JSON.parse(e.postData.contents);
//      SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
//        .appendRow([new Date().toLocaleString('en-IN'),
//                    d.name,d.date,d.slot,d.mobile,d.email,d.fee]);
//      return ContentService
//        .createTextOutput(JSON.stringify({status:'ok'}))
//        .setMimeType(ContentService.MimeType.JSON);
//    }
//
//  calendarScriptUrl — Apps Script that handles GET
//    (reads your Google Calendar, returns busy slots):
//    function doGet() {
//      const cal    = CalendarApp.getDefaultCalendar();
//      const today  = new Date();
//      const result = {};
//      for (let i = 0; i < 7; i++) {
//        const day = new Date(today);
//        day.setDate(today.getDate() + i);
//        const key = Utilities.formatDate(
//          day, cal.getTimeZone(), 'yyyy-MM-dd');
//        const s = new Date(day); s.setHours(9,  0, 0, 0);
//        const e = new Date(day); e.setHours(19, 0, 0, 0);
//        result[key] = cal.getEvents(s, e).map(ev => ({
//          s: ev.getStartTime().getHours()*60
//           + ev.getStartTime().getMinutes(),
//          e: ev.getEndTime().getHours()*60
//           + ev.getEndTime().getMinutes()
//        }));
//      }
//      return ContentService
//        .createTextOutput(JSON.stringify(result))
//        .setMimeType(ContentService.MimeType.JSON);
//    }
//    Deploy both as: Execute as = Me, Access = Anyone
// =====================================================
(function bookingModule() {

  // ── CONFIG ────────────────────────────────────────
  const CONFIG = {
    whatsappNumber:    '918870006507',
    appsScriptUrl:     'https://script.google.com/macros/s/AKfycby-EEnqJeNTYaj3j_6ol2gYH71zSSlK16Odjv1NfXEBR8RWJAPkSKdrPqJQW5F3mH0x0Q/exec',
    calendarScriptUrl: 'https://script.google.com/macros/s/AKfycby-EEnqJeNTYaj3j_6ol2gYH71zSSlK16Odjv1NfXEBR8RWJAPkSKdrPqJQW5F3mH0x0Q/exec',
    razorpayKeyId:     'rzp_test_Rt6cD7c8uu7NDX',
    //                  ↑ swap to rzp_live_... when going live
    currency: { symbol: '₹', amount: '1,999', minor: 199900, code: 'INR' },
  };

  // ── Currency detection ────────────────────────────
  (async function detectCurrency() {
    try {
      const res  = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      if (data.country_code && data.country_code !== 'IN') {
        CONFIG.currency = { symbol: '$', amount: '22', minor: 3000, code: 'USD' };
        const el = document.getElementById('sessionAmount');
        if (el) el.innerHTML = `$22 <span class="amount-per">/ session</span>`;
      }
    } catch (_) {}
  })();

  // ── State ─────────────────────────────────────────
  let selectedDate    = null;
  let selectedSlot    = null;
  let mobileVerified  = false;
  let emailVerified   = false;
  let calData         = null;   // { 'YYYY-MM-DD': [{s,e}, …] }
  let calReady        = false;

  // ── Elements ──────────────────────────────────────
  const overlay  = document.getElementById('bookingOverlay');
  const modal    = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('bookingClose');
  const form     = document.getElementById('bookingForm');

  // ── Open / Close ──────────────────────────────────
  function openModal() {
    calData  = null;
    calReady = false;
    selectedSlot = null;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    buildDateStrip();
    refreshWaLink();
    loadCalendar();   // async — shows spinner until done
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll(
    '.book-session-btn, .primary-cta, .primary-btn, .cta-button'
  ).forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); openModal(); });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  // ── Date Strip ────────────────────────────────────
  function buildDateStrip() {
    const strip  = document.getElementById('dateStrip');
    strip.innerHTML = '';
    const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'];
    const today  = new Date();

    for (let i = 0; i < 7; i++) {
      const d       = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];

      const pill = document.createElement('button');
      pill.type        = 'button';
      pill.className   = 'date-pill' + (i === 0 ? ' selected' : '');
      pill.dataset.date = dateStr;

      const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : DAYS[d.getDay()];
      pill.innerHTML = `
        <span class="date-day">${dayLabel}</span>
        <span class="date-num">${d.getDate()}</span>
        <span class="date-mon">${MONTHS[d.getMonth()]}</span>
      `;

      pill.addEventListener('click', () => {
        if (pill.classList.contains('fully-booked')) return;
        strip.querySelectorAll('.date-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        selectedDate = dateStr;
        selectedSlot = null;
        renderTimeSlots(dateStr);
      });

      strip.appendChild(pill);
    }

    selectedDate = today.toISOString().split('T')[0];
    renderTimeSlots(selectedDate);   // shows spinner immediately
  }

  // ── Calendar fetch ────────────────────────────────
  const ALL_SLOTS = [
    { label: '9:00 AM',  min:  9 * 60 },
    { label: '10:00 AM', min: 10 * 60 },
    { label: '11:00 AM', min: 11 * 60 },
    { label: '12:00 PM', min: 12 * 60 },
    { label: '1:00 PM',  min: 13 * 60 },
    { label: '2:00 PM',  min: 14 * 60 },
    { label: '3:00 PM',  min: 15 * 60 },
    { label: '4:00 PM',  min: 16 * 60 },
    { label: '5:00 PM',  min: 17 * 60 },
    { label: '6:00 PM',  min: 18 * 60 },
  ];

  async function loadCalendar() {
    if (!CONFIG.calendarScriptUrl ||
        CONFIG.calendarScriptUrl === 'YOUR_CALENDAR_SCRIPT_URL') {
      // No URL yet — show all slots
      calReady = true;
      renderTimeSlots(selectedDate);
      return;
    }

    try {
      const res = await fetch(`${CONFIG.calendarScriptUrl}?t=${Date.now()}`);
      calData   = await res.json();
    } catch (err) {
      console.warn('[Booking] Calendar fetch failed:', err);
      calData = null;   // fall back: show all slots
    }

    calReady = true;

    // Mark fully-booked date pills
    document.querySelectorAll('.date-pill').forEach(pill => {
      if (isFullyBooked(pill.dataset.date)) {
        pill.classList.add('fully-booked');
        // If current selection is now blocked, jump to first open date
        if (pill.classList.contains('selected')) {
          const next = document.querySelector('.date-pill:not(.fully-booked)');
          if (next) {
            document.querySelectorAll('.date-pill').forEach(p => p.classList.remove('selected'));
            next.classList.add('selected');
            selectedDate = next.dataset.date;
          }
        }
      }
    });

    renderTimeSlots(selectedDate);
  }

  function slotsForDate(dateStr) {
    const booked   = calData ? (calData[dateStr] || []) : [];
    const now      = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const isToday  = dateStr === todayStr;
    const nowMin   = now.getHours() * 60 + now.getMinutes();

    return ALL_SLOTS.map(slot => {
      const end      = slot.min + 60;
      const isPast   = isToday && slot.min <= nowMin;
      const isBooked = booked.some(ev => ev.s < end && ev.e > slot.min);
      return { ...slot, disabled: isPast || isBooked };
    });
  }

  function isFullyBooked(dateStr) {
    return slotsForDate(dateStr).every(s => s.disabled);
  }

  // ── Time Pill Renderer ────────────────────────────
  function renderTimeSlots(dateStr) {
    const loadingEl = document.getElementById('slotLoading');
    const gridEl    = document.getElementById('timePillGrid');

    if (!calReady) {
      loadingEl.style.display = 'flex';
      gridEl.style.display    = 'none';
      return;
    }

    loadingEl.style.display = 'none';

    const slots   = slotsForDate(dateStr);
    const allGone = slots.every(s => s.disabled);

    gridEl.innerHTML    = '';
    gridEl.style.display = allGone ? 'block' : 'grid';

    if (allGone) {
      gridEl.innerHTML =
        '<p class="no-slots-msg">No available slots for this date — please select another day.</p>';
      return;
    }

    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'time-pill' + (slot.disabled ? ' time-pill-disabled' : '');
      btn.disabled  = slot.disabled;
      btn.textContent = slot.label;

      if (!slot.disabled) {
        btn.addEventListener('click', () => {
          gridEl.querySelectorAll('.time-pill').forEach(p => p.classList.remove('time-pill-selected'));
          btn.classList.add('time-pill-selected');
          selectedSlot = slot.label;
        });
      }

      gridEl.appendChild(btn);
    });
  }

  // ── Field validation ──────────────────────────────
  function isValidMobile(val) { return val.replace(/\D/g, '').length >= 10; }
  function isValidEmail(val)  { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim()); }

  function applyFieldState(input, iconEl, tagEl, isValid) {
    const has = input.value.length > 0;
    input.classList.toggle('bk-valid',   isValid);
    input.classList.toggle('bk-invalid', !isValid && has);
    iconEl.textContent = !has ? '' : isValid ? '✓' : '✗';
    iconEl.className   = 'bk-field-icon' + (!has ? '' : isValid ? ' icon-valid' : ' icon-invalid');
    tagEl.classList.toggle('show', isValid);
    return isValid;
  }

  const mobileInput = document.getElementById('bkMobile');
  const mobileIcon  = document.getElementById('mobileIcon');
  const mobileTag   = document.getElementById('mobileVerifiedTag');
  mobileInput.addEventListener('input', () => {
    mobileVerified = applyFieldState(mobileInput, mobileIcon, mobileTag, isValidMobile(mobileInput.value));
  });

  const emailInput = document.getElementById('bkEmail');
  const emailIcon  = document.getElementById('emailIcon');
  const emailTag   = document.getElementById('emailVerifiedTag');
  emailInput.addEventListener('input', () => {
    emailVerified = applyFieldState(emailInput, emailIcon, emailTag, isValidEmail(emailInput.value));
  });

  // ── WhatsApp help link ────────────────────────────
  function refreshWaLink() {
    const el  = document.getElementById('waHelpLink');
    const msg = encodeURIComponent(
      "Hi Vaasanthika, I'm having trouble booking a session and would like some help."
    );
    el.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  }

  // ── Form submit → Razorpay → complete booking ────
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name   = document.getElementById('bkName').value.trim();
    const mobile = mobileInput.value.trim();
    const email  = emailInput.value.trim();

    if (!name)           { showToast('Please enter your name', true);             shake(document.getElementById('bkName')); return; }
    if (!selectedDate)   { showToast('Please select a date', true);               return; }
    if (!selectedSlot)   { showToast('Please select a time slot', true);          return; }
    if (!mobileVerified) { showToast('Please enter a valid mobile number', true); shake(mobileInput); return; }
    if (!emailVerified)  { showToast('Please enter a valid email address', true); shake(emailInput);  return; }

    const bookNowBtn = document.getElementById('bookNowBtn');
    bookNowBtn.textContent = 'Processing…';
    bookNowBtn.disabled    = true;

    const fee     = `${CONFIG.currency.symbol}${CONFIG.currency.amount}`;
    const booking = { name, date: selectedDate, slot: selectedSlot, mobile, email, fee };

    // ── Open Razorpay ──────────────────────────────
    const rzp = new Razorpay({
      key:         CONFIG.razorpayKeyId,
      amount:      CONFIG.currency.minor,
      currency:    CONFIG.currency.code,
      name:        'Heartsease',
      description: `Therapy Session · ${selectedSlot}`,
      image:       'assets/logo.png',
      prefill: {
        name:    name,
        email:   email,
        contact: mobile.replace(/\D/g, ''),
      },
      notes: {
        date: selectedDate,
        slot: selectedSlot,
      },
      theme: { color: '#4a3362' },

      // ── Payment success ──────────────────────────
      handler: async function (response) {
        booking.paymentId = response.razorpay_payment_id;
        bookNowBtn.textContent = 'Confirming…';
        await completeBooking(booking, fee);
      },

      // ── User closed without paying ───────────────
      modal: {
        ondismiss: function () {
          bookNowBtn.textContent = 'Book Now';
          bookNowBtn.disabled    = false;
          showToast('Payment cancelled — try again when ready', true);
        },
      },
    });

    rzp.open();
  });

  // ── Post-payment: Sheets + WhatsApp + success ──────
  async function completeBooking(booking, fee) {
    // 1. Google Sheets
    try {
      await fetch(CONFIG.appsScriptUrl, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(booking),
      });
    } catch (err) {
      console.warn('[Booking] Sheets sync failed:', err);
    }

    // 2. WhatsApp notification
    const waText = encodeURIComponent(
      `🌿 New Session Booking\n\n` +
      `Name:      ${booking.name}\n` +
      `Date:      ${booking.date}\n` +
      `Time:      ${booking.slot}\n` +
      `Mobile:    ${booking.mobile}\n` +
      `Email:     ${booking.email}\n` +
      `Fee:       ${fee}\n` +
      `Payment:   ${booking.paymentId}`
    );
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`, '_blank');

    showSuccess(booking);
  }

  // ── Success screen ────────────────────────────────
  function showSuccess(booking) {
    modal.innerHTML = `
      <div class="booking-success">
        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
        <h2>You're all set!</h2>
        <p class="success-detail">${booking.date} &nbsp;·&nbsp; ${booking.slot}</p>
        <p class="success-note">
          A confirmation will be sent to <strong>${booking.email}</strong>.
        </p>
        <ul class="success-notes">
          <li><i class="fa-solid fa-lock"></i> Sessions are held online in a private, secure setting</li>
          <li><i class="fa-solid fa-feather"></i> You don't need to prepare anything in advance</li>
        </ul>
        <button class="book-now-btn" id="successDoneBtn">Done</button>
      </div>
    `;
    document.getElementById('successDoneBtn').addEventListener('click', closeModal);
  }

  // ── Toast ─────────────────────────────────────────
  function showToast(msg, isError = false) {
    document.querySelector('.bk-toast')?.remove();
    const toast = document.createElement('div');
    toast.className   = 'bk-toast' + (isError ? ' bk-toast-error' : '');
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('bk-toast-show'));
    setTimeout(() => {
      toast.classList.remove('bk-toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ── Shake ─────────────────────────────────────────
  function shake(el) {
    el.classList.add('bk-shake');
    el.addEventListener('animationend', () => el.classList.remove('bk-shake'), { once: true });
  }

})();
