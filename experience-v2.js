// Video-inspired interaction layer for the H. Rishabraj public experience.
// Progressive enhancement: the existing site remains functional without this file.

const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealSections(){
  const targets=[...document.querySelectorAll('.section,.story-banner,.journey,.completed,.trust,.projects,.portfolio,.lifestyle,.habitats,.redevelopment,.stories,.recognition,.contact')];
  targets.forEach((el,i)=>{el.classList.add('cinematic-reveal');el.style.setProperty('--reveal-delay',`${(i%3)*55}ms`)});
  if(reduced){targets.forEach(el=>el.classList.add('is-visible'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});
  targets.forEach(el=>io.observe(el));
}

function animateStats(){
  const nodes=[...document.querySelectorAll('.stat b')];
  if(!nodes.length)return;
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const raw=el.textContent.trim();
    const match=raw.match(/([\d,.]+)(.*)/); if(!match)return;
    const target=Number(match[1].replace(/,/g,'')); const suffix=match[2];
    if(!Number.isFinite(target))return;
    const start=performance.now(),duration=reduced?0:1100;
    const tick=now=>{const p=duration?clamp((now-start)/duration):1;const eased=1-Math.pow(1-p,3);el.textContent=`${Math.round(target*eased).toLocaleString()}${suffix}`;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);io.unobserve(el);
  }),{threshold:.55});nodes.forEach(n=>io.observe(n));
}

function cinematicParallax(){
  if(reduced)return;
  const hero=document.querySelector('.hero');
  const label=document.querySelector('.project-label');
  let raf=0;
  const update=()=>{raf=0;const y=scrollY;const vh=innerHeight;const p=clamp(y/(vh*5.4));if(hero){hero.style.transform=`translate3d(0,calc(-44% + ${p*-46}px),0)`;hero.style.opacity=String(1-clamp((p-.5)*2.1))}if(label){label.style.transform=`translate3d(0,${p*-28}px,0)`}};
  addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update)},{passive:true});update();
}

function redevelopmentWipe(){
  const section=document.querySelector('.redevelopment');
  const boxes=section?.querySelectorAll('.transform-box');
  if(!section||!boxes?.length)return;
  section.classList.add('redevelopment-cinematic');
  const io=new IntersectionObserver(([entry])=>section.classList.toggle('is-active',entry.isIntersecting),{threshold:.3});io.observe(section);
}

function timelineProgress(){
  const timeline=document.querySelector('.timeline');if(!timeline)return;
  const progress=document.createElement('span');progress.className='timeline-progress';timeline.appendChild(progress);
  const update=()=>{const r=timeline.getBoundingClientRect();const p=clamp((innerHeight*.75-r.top)/(r.height+innerHeight*.25));progress.style.transform=`scaleX(${p})`};
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
}

function init(){document.documentElement.classList.add('experience-v2');revealSections();animateStats();cinematicParallax();redevelopmentWipe();timelineProgress()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
