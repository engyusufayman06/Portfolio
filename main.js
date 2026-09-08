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
    function setMenu(open){
      if(!ham || !mobileNav) return;
      ham.setAttribute('aria-expanded', String(open));
      ham.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      ham.classList.toggle('active', open);
      mobileNav.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
    }
    ham && ham.addEventListener('click', ()=>{
      setMenu(ham.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav && mobileNav.addEventListener('click', e=>{
      if(e.target.closest('a')) setMenu(false);
    });
    window.addEventListener('resize', ()=>{ if(window.innerWidth > 800) setMenu(false); });
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
              const circ = 339.292;
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
      if(window.matchMedia('(pointer: coarse)').matches) return;
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
        buttons.forEach(b=>b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        const filter = btn.getAttribute('data-filter');
        cards.forEach(c=>{ if(filter === 'all' || c.getAttribute('data-category') === filter) c.style.display = ''; else c.style.display = 'none'; });
      });
    });
  })();

  // Smooth anchors
  (function(){ document.querySelectorAll('a[href^="#"]').forEach(a=>{ a.addEventListener('click', e=>{ const id = a.getAttribute('href'); if(id === '#') return; const el = document.querySelector(id); if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); } }); }); })();

  // EmailJS contact form
  (function(){
    emailjs.init("Xro-DLh5JDVz3oITp");
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        emailjs.sendForm("service_pjj3r0p", "template_r6oerjf", this)
          .then(() => {
            alert("✅ Message sent!");
            contactForm.reset();
            submitButton.textContent = 'Send';
            submitButton.disabled = false;
          }, (error) => {
            console.error('Email.js Error:', error);
            alert("❌ Failed to send message. Try again later.");
            submitButton.textContent = 'Send';
            submitButton.disabled = false;
          });
      });
    }
  })();

  // Accessibility: show focus outlines on keyboard navigation
  (function(){ function onFirstTab(e){ if(e.key === 'Tab'){ document.body.classList.add('show-focus'); window.removeEventListener('keydown', onFirstTab); } } window.addEventListener('keydown', onFirstTab); })();

  // Footer year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Image loading: keep the hero eager for a faster first paint; defer project images.
  document.querySelectorAll('.project-thumb img, .portrait img').forEach(img=>{ img.setAttribute('loading', 'lazy'); img.decoding = 'async'; });
  const heroImage = document.querySelector('.hero-shot img');
  if(heroImage){ heroImage.setAttribute('loading', 'eager'); heroImage.setAttribute('fetchpriority', 'high'); heroImage.decoding = 'async'; }

  // Ensure skill circles animate and show percentage
  (function(){
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      if (card.offsetParent !== null) {
        card.classList.add('in');
        const percent = Number(card.getAttribute('data-percent') || 0);
        const circle = card.querySelector('.progress-fg');
        const perc = card.querySelector('.skill-perc');
        if(circle && perc){
          const circ = 339.292;
          const offset = Math.round(circ - (circ * percent) / 100);
          setTimeout(()=> circle.style.strokeDashoffset = offset, 140);
          let cur = 0; const step = Math.max(1, Math.round(percent / 18));
          const t = setInterval(()=>{ cur += step; perc.textContent = (cur >= percent ? percent : cur) + '%'; if(cur >= percent) clearInterval(t); }, 18);
        }
      }
    });
  })();

  // Project image modal
  (function(){
    const modal = document.getElementById('imgModal');
    if(!modal) return;
    const modalImg = document.getElementById('imgModalImg');
    const closeBtn = modal.querySelector('.img-modal-close');
    const backdrop = modal.querySelector('.img-modal-backdrop');
    document.querySelectorAll('.project-thumb img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', e => {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Full project image';
        modal.style.display = 'flex';
        setTimeout(()=>modal.focus(), 10);
        document.body.style.overflow = 'hidden';
      });
    });
    function closeModal() {
      modal.style.display = 'none';
      modalImg.src = '';
      document.body.style.overflow = '';
    }
    closeBtn && closeBtn.addEventListener('click', closeModal);
    backdrop && backdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', e => {
      if(modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
    });
  })();

  // Particles: skip the canvas work on touch/mobile devices for better performance.
  const canvas = document.getElementById("particles-bg");
  if(canvas && !window.matchMedia('(pointer: coarse)').matches && window.innerWidth > 760){
    const ctx = canvas.getContext("2d");
    let particlesArray;
    let width, height;
    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particlesArray = [];
      const numberOfParticles = Math.min(90, Math.floor((width * height) / 22000));
      for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
    }
    class Particle {
      constructor() { this.x=Math.random()*width; this.y=Math.random()*height; this.size=Math.random()*1.5+.7; this.speedX=Math.random()*0.7-.35; this.speedY=Math.random()*0.7-.35; }
      update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x<0||this.x>width)this.speedX*=-1; if(this.y<0||this.y>height)this.speedY*=-1; }
      draw(){ ctx.fillStyle="rgba(255,255,255,0.65)"; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
    }
    function connect(){
      for(let a=0;a<particlesArray.length;a++) for(let b=a+1;b<particlesArray.length;b++){
        const dx=particlesArray[a].x-particlesArray[b].x, dy=particlesArray[a].y-particlesArray[b].y, distance=dx*dx+dy*dy;
        if(distance<120*120){ ctx.strokeStyle="rgba(255,255,255,0.08)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x,particlesArray[a].y); ctx.lineTo(particlesArray[b].x,particlesArray[b].y); ctx.stroke(); }
      }
    }
    function animate(){ ctx.clearRect(0,0,width,height); particlesArray.forEach(p=>{p.update();p.draw();}); connect(); requestAnimationFrame(animate); }
    window.addEventListener("resize", init);
    init(); animate();
  }

  // Keep the existing public social link functional if it was left as a placeholder.
  document.querySelectorAll('a[href="#"]').forEach(link => {
    if(link.getAttribute('aria-label') === 'LinkedIn'){
      link.href = 'https://www.linkedin.com/in/yusuf-ayman-a390b939b/';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });

  // The old CV button had no file/handler. Make it an explicit CV request instead of a dead control.
  const cvButton = document.getElementById('downloadCV');
  if(cvButton){
    cvButton.textContent = 'Request CV';
    cvButton.addEventListener('click', ()=>{
      window.location.href = 'mailto:engyusufayman@gmail.com?subject=CV%20Request';
    });
  }

});
