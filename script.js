'use strict';

const LOVE_LIST = [
  ['01','Your discipline & unstoppable strength','Watching you push through military training with grace and power has filled my heart with so much pride.'],
  ['02','Your caring heart','The genuine warmth and kindness you show to me and everyone around you is something I treasure.'],
  ['03','How fun you are','Every moment with you has its own kind of laughter, chaos and happiness.'],
  ['04','Your understanding nature','You listen without judgment, you truly get me, and having you in my corner means everything.'],
  ['05','How you stay yourself','Your confidence, authenticity and the way you remain real are some of the things I admire most.'],
  ['06','Your resilient spirit','When things get tough, your spirit does not break. This pass out is another beginning.']
];

const SONGS = [
  { title:'mwendwa wakwa wee', artist:'Sacred Word Audio', id:'erX73Xjos0E', url:'https://www.youtube.com/watch?v=erX73Xjos0E' },
  { title:'Bien — Chikwere', artist:'Bien Official', id:'0Aqz15wJKkg', url:'https://www.youtube.com/watch?v=0Aqz15wJKkg' },
  { title:'Loise Kim — NATHANIEL', artist:'Loise Kim Official', id:'Vn1WZKbDeXU', url:'https://www.youtube.com/watch?v=Vn1WZKbDeXU' },
  { title:'Ed Sheeran — Perfect', artist:'Ed Sheeran', id:'2Vv-BfVoq4g', url:'https://www.youtube.com/watch?v=2Vv-BfVoq4g' }
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal(){
  const items=document.querySelectorAll('.reveal, .reveal-scale');
  if(reduceMotion){items.forEach(el=>el.classList.add('revealed'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('revealed');io.unobserve(entry.target);}
  }),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  items.forEach(el=>io.observe(el));
}

function initNav(){
  const nav=document.getElementById('site-nav');
  const progress=document.getElementById('scroll-progress');
  const update=()=>{
    if(nav) nav.classList.toggle('scrolled',window.scrollY>40);
    if(progress){
      const max=document.documentElement.scrollHeight-window.innerHeight;
      progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
    }
  };
  window.addEventListener('scroll',update,{passive:true});
  update();
}

function renderLoveList(){
  const root=document.getElementById('love-list');
  if(!root)return;
  root.innerHTML=LOVE_LIST.map(([n,title,text])=>`
    <article class="love-item reveal">
      <span class="love-number">${n}</span>
      <div><h3>${title}</h3><p>${text}</p></div>
    </article>`).join('');
  initReveal();
}

function renderSongs(){
  const root=document.getElementById('song-list');
  if(!root)return;
  root.innerHTML=SONGS.map((song,i)=>`
    <a class="song song-card" href="${song.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${song.title} on YouTube">
      <img src="https://img.youtube.com/vi/${song.id}/hqdefault.jpg" alt="${song.title} YouTube cover" loading="lazy" />
      <span class="song-copy"><strong>${i+1}. ${song.title}</strong><small>${song.artist}</small></span>
      <span class="youtube-badge" aria-hidden="true">▶</span>
    </a>`).join('');
}

function createPetal(){
  const field=document.getElementById('petal-field');
  if(!field||reduceMotion)return;
  const petal=document.createElement('span');
  petal.className='petal';
  const colors=['#8b3343','#b74f5e','#d9878d','#b68b43','#a55b48'];
  const size=14+Math.random()*25;
  petal.style.left=`${5+Math.random()*90}%`;
  petal.style.width=`${size}px`;
  petal.style.height=`${size*1.38}px`;
  petal.style.background=`linear-gradient(135deg,${colors[Math.floor(Math.random()*colors.length)]},#e0a2a0)`;
  petal.style.setProperty('--duration',`${7+Math.random()*6}s`);
  petal.style.setProperty('--drift',`${-130+Math.random()*260}px`);
  petal.style.setProperty('--rot',`${180+Math.random()*500}deg`);
  field.appendChild(petal);
  setTimeout(()=>petal.remove(),15000);
}

function initPetals(){
  const section=document.getElementById('flowers');
  if(!section||reduceMotion)return;
  let played=false;
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting&&!played){
      played=true;
      const count=2+Math.floor(Math.random()*3);
      for(let i=0;i<count;i++)setTimeout(createPetal,i*900+Math.random()*500);
      setTimeout(()=>{if(Math.random()>.35)createPetal();},5200);
    }
  }),{threshold:.35});
  io.observe(section);
}

function initAmbientPetals(){
  ['letter','honor','memories','tiktok'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting&&Math.random()>.35){
        setTimeout(createPetal,300);
        io.unobserve(entry.target);
      }
    }),{threshold:.55});
    io.observe(el);
  });
}

function initTikTokPlayer(){
  const video=document.getElementById('tiktok-video');
  const overlay=document.getElementById('tiktok-play-overlay');
  if(!video||!overlay)return;

  const play=()=>{
    overlay.classList.add('hidden');
    const result=video.play();
    if(result&&typeof result.catch==='function') result.catch(()=>overlay.classList.remove('hidden'));
  };

  overlay.addEventListener('click',play);
  video.addEventListener('play',()=>overlay.classList.add('hidden'));
  video.addEventListener('pause',()=>{if(!video.ended)overlay.classList.remove('hidden');});
  video.addEventListener('ended',()=>overlay.classList.remove('hidden'));
}

function initMusicJump(){
  const button=document.getElementById('music-toggle');
  if(!button)return;
  button.addEventListener('click',()=>{
    document.getElementById('music')?.scrollIntoView({behavior:reduceMotion?'auto':'smooth'});
  });
}

function init(){
  initNav();
  renderLoveList();
  renderSongs();
  initReveal();
  initPetals();
  initAmbientPetals();
  initTikTokPlayer();
  initMusicJump();
}

document.addEventListener('DOMContentLoaded',init);
