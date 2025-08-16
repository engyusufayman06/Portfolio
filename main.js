document.addEventListener('DOMContentLoaded', function() {
  // --- Utility helpers
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Theme toggle (light/dark)
  (function(){
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if(saved === 'light' || (!saved && prefersLight)) root.classList.add('light');
    btn.textContent = root.classList.contains('light') ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const isLight = root.classList.toggle('light');
      btn.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  })();

  // Mobile hamburger
  (function(){
    const ham = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    ham && ham.addEventListener('click', ()=>{
      const open = ham.getAttribute('aria-expanded') === 'true';
      ham.setAttribute('aria-expanded', String(!open));
      if(open){
        mobileNav.style.display = 'none';
        mobileNav.setAttribute('aria-hidden', 'true');
      } else {
        mobileNav.style.display = 'block';
        mobileNav.setAttribute('aria-hidden', 'false');
      }
    });
    mobileNav && mobileNav.addEventListener('click', e=>{
      if(e.target.tagName === 'A'){ mobileNav.style.display='none'; mobileNav.setAttribute('aria-hidden','true'); ham.setAttribute('aria-expanded','false'); }
    });
  })();

  // Typing effect (hero)
  (function(){
    const el = document.getElementById('typed');
    if(!el) return;
    const phrases = ['Branding.', 'Logos.', 'Social Visuals.', 'Motion.',  'UI/UX.'];
    let pi=0, ci=0, forward=true;
    function step(){
      const p = phrases[pi];
      if(forward){ el.textContent = p.slice(0, ++ci); if(ci === p.length){ forward=false; setTimeout(step,700); return; } }
      else { el.textContent = p.slice(0, --ci); if(ci === 0){ forward=true; pi=(pi+1)%phrases.length; } }
      setTimeout(step, forward?60:30);
    }
    step();
  })();

  // Scroll reveal + run skill animations when visible
  (function(){
    const reveals = $$('.reveal');
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          if(entry.target.classList.contains('skill-card')){
            const percent = Number(entry.target.getAttribute('data-percent') || 0);
            const circle = entry.target.querySelector('.progress-fg');
            const perc = entry.target.querySelector('.skill-perc');
            if(circle && perc){
              const circ = 339.292; // 2πr (r=54)
              const offset = Math.round(circ - (circ * percent) / 100);
              setTimeout(()=> circle.style.strokeDashoffset = offset, 140);
              let cur = 0; const step = Math.max(1, Math.round(percent / 18));
              const t = setInterval(()=>{ cur += step; perc.textContent = (cur >= percent ? percent : cur) + '%'; if(cur >= percent) clearInterval(t); }, 18);
            }
          }
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.16});
    reveals.forEach(r => io.observe(r));
  })();

  // Show more projects (staggered)
  (function(){
    const btn = document.getElementById('showMore');
    if(!btn) return;
    const grid = document.getElementById('projectsGrid');
    $$('.project-card.hidden').forEach(h => h.style.display = 'none');
    btn.addEventListener('click', ()=>{
      const hidden = Array.from(grid.querySelectorAll('.project-card.hidden'));
      if(hidden.length === 0){ btn.style.display = 'none'; return; }
      btn.setAttribute('aria-expanded','true');
      let delay = 0;
      hidden.forEach(card => {
        setTimeout(()=>{
          card.style.display = '';
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          void card.offsetWidth;
          card.classList.add('in');
          card.setAttribute('tabindex','0');
          card.setAttribute('aria-hidden','false');
          setTimeout(()=> card.classList.remove('fade-in'), 900);
        }, delay);
        delay += 140;
      });
      setTimeout(()=> btn.style.display = 'none', delay + 220);
    });
  })();

  // 3D tilt for project cards (desktop only)
  (function(){
    function attachTilt(){
      const cards = $$('.project-card');
      cards.forEach(card=>{
        card.addEventListener('mousemove', e=>{
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          const rx = (-y) * 6; const ry = x * 6;
          card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
      });
    }
    window.addEventListener('load', ()=> setTimeout(attachTilt, 120));
  })();

  // Skills filter buttons
  (function(){
    const buttons = $$('.filter-btn');
    const cards = $$('.skill-card');
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        $$('.filter-btn.active').forEach(a=> a.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        cards.forEach(c=>{ if(filter === 'all' || c.getAttribute('data-category') === filter) c.style.display = ''; else c.style.display = 'none'; });
      });
    });
  })();

  // Smooth anchors (extra)
  (function(){ document.querySelectorAll('a[href^="#"]').forEach(a=>{ a.addEventListener('click', e=>{ const id = a.getAttribute('href'); const el = document.querySelector(id); if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); } }); }); })();

  // Contact form placeholder & CV download
  (function(){
    const form = document.getElementById('contactForm');
    if(form){ form.addEventListener('submit', e=>{ e.preventDefault(); const name = form.name.value.trim(); const email = form.email.value.trim(); if(!name || !email){ alert('Please provide name and email.'); return; } alert('Thanks! Message sent '); form.reset(); }); }
  })();

  // Accessibility: show focus outlines on keyboard navigation
  (function(){ function onFirstTab(e){ if(e.key === 'Tab'){ document.body.classList.add('show-focus'); window.removeEventListener('keydown', onFirstTab); } } window.addEventListener('keydown', onFirstTab); })();

  // Footer year0]
  document.getElementById('year').textContent = new Date().getFullYear();

  // Quick help: portrait click

  // Lazy load images
  document.querySelectorAll('.project-thumb img, .hero-shot img, .portrait img').forEach(img=>{ img.setAttribute('loading', 'lazy'); img.decoding = 'async'; });

  // Ensure skill circles always animate and show percentage
  (function(){
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      // If already visible (not hidden by filter), animate immediately
      if (card.offsetParent !== null) {
        card.classList.add('in');
        const percent = Number(card.getAttribute('data-percent') || 0);
        const circle = card.querySelector('.progress-fg');
        const perc = card.querySelector('.skill-perc');
        if(circle && perc){
          const circ = 339.292; // 2πr (r=54)
          const offset = Math.round(circ - (circ * percent) / 100);
          setTimeout(()=> circle.style.strokeDashoffset = offset, 140);
          let cur = 0; const step = Math.max(1, Math.round(percent / 18));
          const t = setInterval(()=>{ cur += step; perc.textContent = (cur >= percent ? percent : cur) + '%'; if(cur >= percent) clearInterval(t); }, 18);
        }
      }
    });
  })();

  // Project image modal (click to view full image)
  (function(){
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('imgModalImg');
    const closeBtn = modal.querySelector('.img-modal-close');
    const backdrop = modal.querySelector('.img-modal-backdrop');
    // Open modal on click
    document.querySelectorAll('.project-thumb img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', e => {
        modalImg.src = img.src;
        modal.style.display = 'flex';
        setTimeout(()=>modal.focus(), 10);
        document.body.style.overflow = 'hidden';
      });
    });
    // Close modal
    function closeModal() {
      modal.style.display = 'none';
      modalImg.src = '';
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', e => {
      if(modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
    });
  })();
  });
    const canvas = document.getElementById("particles-bg");
  const ctx = canvas.getContext("2d");

  let particlesArray;
  let width, height;

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    particlesArray = [];
    const numberOfParticles = Math.floor((width * height) / 15000);

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = dx * dx + dy * dy;
        if (distance < 120 * 120) {
          ctx.strokeStyle = "rgba(255,255,255,0.1)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", init);
  init();
  animate();
