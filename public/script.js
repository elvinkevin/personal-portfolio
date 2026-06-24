

/* ============================================
   KEVIN AXEL · PORTFOLIO · SCRIPT
============================================ */
emailjs.init("390hej_VRxJoHkh8A");

emailjs.send("service_pc7augg", "template_ygbcprx", {
  name: fname.value,
  email: femail.value,
  subject: fsubject.value,
  message: fmessage.value
});
 
document.addEventListener('DOMContentLoaded', () => {
 
  // ── LOADER ──
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }, 2200);
 
  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (cursor && trail) {
    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX - 5 + 'px';
      cursor.style.top = mouseY - 5 + 'px';
    });
    function animTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX - 16 + 'px';
      trail.style.top = trailY - 16 + 'px';
      requestAnimationFrame(animTrail);
    }
    animTrail();
    document.querySelectorAll('a, button, .project-card, .insight-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        trail.style.transform = 'scale(1.5)';
        trail.style.borderColor = 'rgba(212,175,55,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        trail.style.transform = 'scale(1)';
        trail.style.borderColor = 'rgba(212,175,55,0.4)';
      });
    });
  }
 
  // ── NAV SCROLL ──
  const nav = document.getElementById('nav');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('visible', y > 400);
  });
 
  // ── HAMBURGER ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
 
  // ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
 
  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 100);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObs.observe(el));
 
  // ── SKILL BARS (animate when in view) ──
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(f => {
          f.style.width = f.dataset.width + '%';
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-category').forEach(cat => skillObs.observe(cat));
 
  // ── TESTIMONIALS ──
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('tcDots');
  let current = 0;
 
  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tc-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
 
  function goTo(idx) {
    cards[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (idx + cards.length) % cards.length;
    cards[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }
  cards[0].classList.add('active');
 
  document.getElementById('tcPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('tcNext').addEventListener('click', () => goTo(current + 1));
 
  // Auto-rotate
  setInterval(() => goTo(current + 1), 6000);
 
  // ── TERMINAL ──
  const termInput = document.getElementById('terminalInput');
  const termBody = document.getElementById('terminalBody');
 
  const commands = {
    help: () => `Available commands: <span style="color:var(--gold)">whoami · skills · projects · contact · clear · date</span>`,
    whoami: () => `Kevin Axel — Full-Stack Developer & Security Analyst · Nairobi, Kenya`,
    skills: () => `JavaScript · Node.js · Python · PostgreSQL · Linux · DevSecOps · Firebase · Bootstrap`,
    projects: () => `TravelMate · RentEase · TrailSMS · Jumia DB Schema`,
    contact: () => `Email: 11772kevinaxel@gmail.com | Phone: +254 116302277`,
    date: () => new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    clear: () => 'CLEAR',
    ls: () => `about/  projects/  skills/  contact/  assets/resume.pdf`,
    pwd: () => `/home/kevin/portfolio`,
    uname: () => `Linux kevin-devsec 6.5.0 #1 SMP x86_64 GNU/Linux`,
    status: () => `<span style="color:#4DAE00">● Available for work</span> — Mon–Fri 09:00–18:00 EAT`,
  };
 
  function addTermLine(prompt, cmd, output) {
    if (cmd === 'clear') {
      termBody.innerHTML = '';
      return;
    }
    const cmdLine = document.createElement('div');
    cmdLine.className = 't-line';
    cmdLine.innerHTML = `<span class="t-prompt">${prompt}</span> <span class="t-cmd">${cmd}</span>`;
    const outLine = document.createElement('div');
    outLine.className = 't-output';
    outLine.innerHTML = output;
    termBody.appendChild(cmdLine);
    termBody.appendChild(outLine);
    termBody.scrollTop = termBody.scrollHeight;
  }
 
  if (termInput) {
    termInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = termInput.value.trim().toLowerCase();
        if (!val) return;
        const fn = commands[val];
        const output = fn ? fn() : `<span style="color:#f87171">Command not found: ${val}. Type "help" for available commands.</span>`;
        addTermLine('kevin@devsec:~$', val, output);
        termInput.value = '';
      }
    });
  }
 
  // Typing animation in terminal
  const typingEl = document.querySelector('.typing-terminal');
  if (typingEl) {
    const phrases = ['help', 'ls projects/', 'cat skills.txt', 'whoami'];
    let pIdx = 0, cIdx = 0, deleting = false;
    function typeLoop() {
      const phrase = phrases[pIdx];
      if (!deleting) {
        typingEl.textContent = phrase.slice(0, ++cIdx);
        if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
      } else {
        typingEl.textContent = phrase.slice(0, --cIdx);
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
      }
      setTimeout(typeLoop, deleting ? 60 : 110);
    }
    typeLoop();
  }
 

 
  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObs.observe(s));
 
});
 
if (form.company.value) return; // spam bot detected

const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let valid = true;

  const fname = document.getElementById('fname');
  const femail = document.getElementById('femail');
  const fmessage = document.getElementById('fmessage');
  const fsubject = document.getElementById('fsubject');

  // Reset errors
  [fname, femail, fmessage, fsubject].forEach(el => {
    el.closest('.form-group').classList.remove('error');
  });

  // Validation
  if (!fname.value.trim()) {
    fname.closest('.form-group').classList.add('error');
    valid = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(femail.value)) {
    femail.closest('.form-group').classList.add('error');
    valid = false;
  }

  if (!fmessage.value.trim()) {
    fmessage.closest('.form-group').classList.add('error');
    valid = false;
  }

  if (!fsubject.value) {
    fsubject.closest('.form-group').classList.add('error');
    valid = false;
  }

  if (!valid) return;

  const submitBtn = document.getElementById('submitBtn');
  const submitText = submitBtn.querySelector('.submit-text');
  const submitLoading = submitBtn.querySelector('.submit-loading');
  const formSuccess = document.getElementById('formSuccess');

  // Loading state
  submitText.style.display = 'none';
  submitLoading.style.display = 'flex';
  submitBtn.disabled = true;

  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",     // ← replace
      "YOUR_TEMPLATE_ID",    // ← replace
      {
        name: fname.value,
        email: femail.value,
        subject: fsubject.value,
        message: fmessage.value
      }
    );

    form.reset();
    formSuccess.style.display = 'block';
    setTimeout(() => formSuccess.style.display = 'none', 5000);

  } catch (error) {
    console.error(error);
    alert("Failed to send message. Try again.");
  }

  // Reset button
  submitText.style.display = 'flex';
  submitLoading.style.display = 'none';
  submitBtn.disabled = false;
});