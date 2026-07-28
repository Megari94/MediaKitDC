  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.14});
  revealEls.forEach(el=>io.observe(el));

  // Topbar dark mode when over dark sections
  const topbar = document.getElementById('topbar');
  const darkSections = document.querySelectorAll('.hero, .section-dark, .section-black, .contact');
  const dio = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const r = e.target.getBoundingClientRect();
      if(e.isIntersecting && r.top < 80){ topbar.classList.add('on-dark'); }
    });
    // recompute based on topmost overlap
    let onDark = false;
    darkSections.forEach(sec=>{
      const r = sec.getBoundingClientRect();
      if(r.top <= 60 && r.bottom >= 60) onDark = true;
    });
    topbar.classList.toggle('on-dark', onDark);
  }, {threshold:[0,.1,.5,1]});
  darkSections.forEach(s=>dio.observe(s));
  window.addEventListener('scroll', ()=>{
    let onDark = false;
    darkSections.forEach(sec=>{
      const r = sec.getBoundingClientRect();
      if(r.top <= 60 && r.bottom >= 60) onDark = true;
    });
    topbar.classList.toggle('on-dark', onDark);
  });

  // progress bar
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + '%';
  });

  // mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> nav.classList.remove('open')));

  // Banner explorer
  const tabs = document.querySelectorAll('.exp-tab');
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.exp-frame').forEach(f=>f.classList.remove('active'));
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });
