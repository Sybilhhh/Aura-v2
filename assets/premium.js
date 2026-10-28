'use strict';
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav=document.querySelector('.nav'), progress=document.querySelector('.reading-progress'), back=document.querySelector('.back-top');
  const menu=document.querySelector('.menu-toggle');
  menu.addEventListener('click',()=>{const opened=nav.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'关闭 ×':'导航 ☰';});
  document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.textContent='导航 ☰';}));
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?100*scrollY/max:0)+'%';nav.classList.toggle('scrolled',scrollY>30);back.hidden=scrollY<700;};
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
  back.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'}));
  document.querySelector('.hero-primary').addEventListener('click',()=>{document.querySelector('.baseline').open=true;});
  if('IntersectionObserver' in window){
    const cards=document.querySelectorAll('.section-head,.spotlight,.features article,.demo-card,.architecture,.loss-card,.data-layout,.sample,.table-scroll,.citation-box');
    if(!reduced){document.documentElement.classList.add('motion-ready');const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.07});cards.forEach(e=>{e.classList.add('reveal');obs.observe(e);});}
    const sections=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.nav nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}),{rootMargin:'-15% 0px -60% 0px'});
    document.querySelectorAll('main>section[id]').forEach(s=>sections.observe(s));
  }
})();
