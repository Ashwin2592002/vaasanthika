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

// Only track elements that have a matching nav link
const navHrefs  = Array.from(navLinkEls).map(a => a.getAttribute('href').slice(1));
const sections  = Array.from(document.querySelectorAll('section[id], #contact_section_footer'))
                    .filter(el => navHrefs.includes(el.id));

function updateActiveNav() {
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
    "name": "BJ",
    "descriptor": "Client",
    "review": "The session was good. The questions raised made me think through few things. One key observation which hit hard. I always thought my issue was. 'When others share their problems to me, i consider it as my problem.' My folks always advice me not to do that. But during the session you pointed out that. 'when others share your problems to you, their problems become more important to you than them.' This is something I really need to work on. Indeed a sharp observation that made me look into few things deeply. Thank you Vaasanthika for that.",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Sandhya Rega",
    "descriptor": "Client",
    "review": "Hi Vaasanthika, the session was too good. I am able to resonate and understand the reasons for my past behaviours while ur discussion. The mindfulness exercise was so relaxing. I could see a good shift in my mood recently and I feel positive through The verbal affirmation. It helped me so much to do so. Got different perceptive of seeing things nowadays. I will start working on the behaviour affirmations and mindfulness exercise. Thanks a lot!",
    "date": "Sep 04, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "The session was very comfortable. I felt seen, heard and understood. It was easy to open up to Vaasanthika, she was calm, cordial, knowledgeable and very professional and I'm looking forward to working with her after just one session",
    "date": "Feb 09, 2025"
  },
  {
    "name": "Janet",
    "descriptor": "Client",
    "review": "Vasantika - you are very patient and hear me out so carefully. I always had a misconception that I had to take theraphy from someone of my age group or more older than me. But, talking to you has given me a diffrent perception now and I am v glad I met you online. You are very sharp with your words and I feel so relieved when you talk to me. Looking forward for our upcoming sessions.",
    "date": "Feb 09, 2025"
  },
  {
    "name": "Nishita Ganatra",
    "descriptor": "Client",
    "review": "I really liked how do you set out goals and have strategies to help me to meet them. This is different from my previous therapists as they did not have any practical strategies. I look forward to our next session and hopefully that can create a starting point for me to work with. I personally resonate with your work. I resonated with your Instagram videos and yesterdays session confirmed my belief that you are the right therapist to help me heal. Thank you so much for your work. I am really grateful and I look forward to working with you",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "Hey, thanks, it was a great session, I am seeing incremental progress in my behaviour. Can I get a time slot next Saturday?",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Long-term client",
    "review": "I have been taking the sessions with Ms. Vaasanthika for a long time. It has been a wonderful experience throughout the journey. Her guidance and knowledge has brought positive changes in me. She doesn't only give solutions but makes you understand and realise why it is worth and needful. It has given me a better understanding and perspective towards things in life. Ms. Vaasanthika is a master of her craft. Gratitude!!",
    "date": "Feb 23, 2025"
  },
  {
    "name": "Namarratha",
    "descriptor": "Client",
    "review": "Today's session made me calm for a while...I think it would be good to do this activity when my anger bursts... I will definitely try it U really get with my me and my issues quick..thank you for hearing me out",
    "date": "Feb 09, 2025"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "Tq vasantika you are an angel in my life. My life would have certainly not improved without you in areas I approached to you. Your discipline and expertise has saved me so much. I cant believe today I was so much better compared to day 1 of knowing you on session. Keep up the good work and bring healing to many such around us.",
    "date": "Nov 14, 2023"
  },
  {
    "name": "BJBO",
    "descriptor": "Client (1 year)",
    "review": "I've been with Vaasanthika for almost a year now... I was surprised by how many things I've been able to unravel about myself that had been holding me back. For example, I had no clue that not being able to live up to my parents' expectations was haunting me for years. Through therapy, I reached a point of acceptance, and my relationship with my parents improved significantly. In general, Vaasanthika has helped me let go of things by seeing them from a different perspective. She is extremely polite, listens thoroughly, and offers her suggestions without any judgment.",
    "date": "Jul 24, 2024"
  },
  {
    "name": "innur",
    "descriptor": "Client",
    "review": "First of all I would like to thank you for all of the help you provided me in better understanding my situation. You are surely a great therapist, all the sessions have helped me to make better decisions in my life particularly in my relationships. I like the clarity you were able to provide and your consistency in holding on to my journey without fail means alot",
    "date": "Feb 09, 2025"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "The session was a profound journey toward self-discovery and emotional healing. The therapist Vasanthika's empathetic approach and keen insights created a safe space for exploration and growth. The guidance offered was invaluable, illuminating paths toward inner peace and a deeper understanding of myself. I left the session feeling supported, empowered, and equipped with valuable tools to navigate life's challenges. Hearts Ease provides a nurturing environment that fosters genuine healing and personal development. Highly recommended for anyone seeking to ease their hearts",
    "date": "Dec 01, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "Vaasanthika has been wonderful to work with. I feel more comfortable sharing openly in sessions as I know that there are no judgments. But she also helps in confronting difficult emotions in a practical way. Her skills are commendable and I love the way she explains techniques that helps beyond the sessions so that I can use them as tools later. I've really enjoyed my time so far working with her and would strongly recommend her services for anyone who is looking to start their healing journey",
    "date": "Sep 04, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "Its really the best i could ask for Your energy and everything is wonderful And thank you so much for guiding me to",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Maheshwari",
    "descriptor": "Client",
    "review": "The sessions are well structured and designed to reach a goal you set with a therapists. The systematic nature is very useful especially as someone who felt very directionless when I first sought therapy. Useful tools to organize and understand oneself are provided. Learning to use these tools with a therapist makes a lot of difference especially since you understand it deeper. The therapist herself is very objective and tries to understand clearly where we are coming from. She picks up on patterns quickly and gently make us aware of it as well.",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "Thank you Vaasanthika for listening my heart out. Your perspective gave a little better understanding of what I am going through. You are involved in healing me rather than advising me to move on from my current situation. That's the one point I am continuing these sessions.",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Teena Tr",
    "descriptor": "Client",
    "review": "Thank you for the session it was quite helpful to have insights about my thoughts and feelings",
    "date": "Feb 22, 2025"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "The session is helping me deal with trauma. Based on my sessions so far I can say that the intensity of certain negative feelings have reduced.",
    "date": "Jul 25, 2023"
  },
  {
    "name": "Akshay Jadhav",
    "descriptor": "Client",
    "review": "The Session has been very helpful to me. I have seen improvement in my productivity and through tools. I am getting better and better.",
    "date": "Feb 25, 2025"
  },
  {
    "name": "Vigasini",
    "descriptor": "Weekly Client",
    "review": "Well youre an amazing therapist and its so cool how much of a deeper insight you bring in for me to understand myself so much better. I look forward to the sessions every week because of how mentally relaxed I feel after having someone hear me out and help me walk through a path that I seem struggle to navigate. Thank you so so much!",
    "date": "Jun 03, 2025"
  },
  {
    "name": "Pranav Muniraj",
    "descriptor": "Client",
    "review": "A calm, patient and a professional therapist. Sessions with Vaasanthika has always brought me Clarity during a Very confusing phase of my life. I always felt comfortable and heard without being judged. Over the course of sessions she helped me gain confidence awareness on my emotional aspects and healthy ways to respond to situations. I am grateful for the support. Thank you Vaasanthika!",
    "date": "Dec 30, 2025"
  },
  {
    "name": "Adithya S Pillai",
    "descriptor": "Client",
    "review": "Thanks You Vaasanthika. It was great. You were able to identify what I was trying to say. Thank You so much.",
    "date": "Jul 16, 2023"
  },
  {
    "name": "Farjana Akter",
    "descriptor": "Client",
    "review": "I feel really relieved after having the conversation with you, and i think I will overcome from all of my issues, confusion and depression",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Biswas",
    "descriptor": "Client",
    "review": "My experience has been very good. You understand things deeply and guide according to the situation. I feel truly supported throughout the sessions, Thanks",
    "date": "Apr 26, 2025"
  },
  {
    "name": "Naaz",
    "descriptor": "Long-term Follower/Client",
    "review": "It was really nice talking to you as well and you were obviously better than any therapist I have seen thank you and I really look forward too see you again... I have been following and listening to you for last 2 or 3 years",
    "date": "May 07, 2025"
  },
  {
    "name": "Jayashree",
    "descriptor": "Client",
    "review": "Firstly, I'm super glad I came across your profile and opted for the therapy sessions. You are asking the right set of questions and make me realise What went wrong... Secondly, I did attend a few therapy sessions before finding you, but I feel much more connected and relieved after attending your sessions. I can't thank you enough for the amazing sessions we had.",
    "date": "Jul 28, 2023"
  },
  {
    "name": "Prachi",
    "descriptor": "First-time Client",
    "review": "It was a great session. It was my first so I was skeptical about it but it turned out to be really deep and insightful. Looking forward for more sessions",
    "date": "Feb 26, 2025"
  },
  {
    "name": "Varsha",
    "descriptor": "Client",
    "review": "A session with you always gives me a better perspective and clarity And you are very good at analysing and imbibing the situation from what one says Thanks vaasanthika:)",
    "date": "Apr 24, 2025"
  },
  {
    "name": "Amruta",
    "descriptor": "Client",
    "review": "It was easy for me to share what i am feeling, thanks creating such space. It was a good session definitely felt relieving",
    "date": "Feb 04, 2025"
  },
  {
    "name": "Jagruthi",
    "descriptor": "Client",
    "review": "The session was extremely good with regard to your attention and patience in listening out to me. I feel like heard after ages",
    "date": "May 07, 2025"
  },
  {
    "name": "Kiran",
    "descriptor": "Client",
    "review": "It was quite amazing talking with you, also the way you heard out everything so calmly and guided to the process was very smooth and understanding. Looking forward for a better healing...",
    "date": "Nov 14, 2023"
  },
  {
    "name": "Jayasree",
    "descriptor": "Client",
    "review": "Hey, it was a great session, and the questions you have asked have put my thoughts in perspective and that's exactly what I was looking for thank you",
    "date": "Jul 25, 2023"
  },
  {
    "name": "niviat_nivetha",
    "descriptor": "Client",
    "review": "As I have completed my multiple sessions with heartsease and I get the right vibe that i have landed in the right place. All my questions and doubts are addressed in atmost respectful and graceful manner. I feel this is one most important thing when one is going thro a sessions with a therapist.",
    "date": "Aug 12, 2023"
  },
  {
    "name": "Maheshwari",
    "descriptor": "Client",
    "review": "Thank you so much for this session. It was very cathartic to be able to have a pseudo conversation with someone I wished I could talk to one more time. You rightfully identified the core issues with my approach towards love and romance. There is a lot to unpack here but I think we got started on the right note",
    "date": "Sep 04, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "Thank you for all the great sessions. You've been understanding me with ease and given me solutions which has been helping me on daily basis. Looking forward to make good progress in my life",
    "date": "Jul 25, 2023"
  },
  {
    "name": "Anonymous",
    "descriptor": "Client",
    "review": "firstly thank you so much for taking the time to listen to my concerns and stuff. Secondly, i got to know a different approach to my concerns and how to deal with them now, to more focus out and speak up how i feel, thank you again. And yeah will do those activities that u told me and keep u posted on how it goes.",
    "date": "Sep 12, 2023"
  },
  {
    "name": "O",
    "descriptor": "Client",
    "review": "Hi Vaasanthika, the session was too good. I am able to resonate and understand the reasons for my past behaviours while ur discussion. The mindfulness exercise was so relaxing. I could see a good shift in my mood recently and I feel positive through The verbal affirmation. It helped me so much to do so. Got different perceptive of seeing things nowadays.",
    "date": "Nov 14, 2023"
  },
  {
    "name": "BJ",
    "descriptor": "Client",
    "review": "The session was good. The questions raised made me think through few things. One key observation which hit hard. I always thought my issue was. 'When others share their problems to me, i consider it as my problem.' My folks always advice me not to do that. But during the session you pointed out that. 'when others share your problems to you, their problems become more important to you than them.' This is something I really need to work on. Indeed a sharp observation that made me look into few things deeply. Thank you Vaasanthika for that.",
    "date": "Nov 14, 2023"
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

  // Auto-open if redirected from about.html
  if (sessionStorage.getItem('openBooking') === '1') {
    sessionStorage.removeItem('openBooking');
    openModal();
  }

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
