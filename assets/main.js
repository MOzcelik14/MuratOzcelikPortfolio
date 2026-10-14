const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];

const menuBtn=$('#menuBtn');const navLinks=$('#navLinks');let currentLang='tr';
function menuLabel(open=false){return currentLang==='tr'?(open?'Kapat':'Menü'):(open?'Close':'Menu')}
if(menuBtn&&navLinks){
  menuBtn.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=menuLabel(open)});
  $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent=menuLabel(false)}));
}

const isAbout=/about\.html$/.test(location.pathname);
const metaDescriptions={
  home:{tr:"Murat Özçelik: kısa filmler, müzik ve açık kaynak yazılım projeleri.",en:"Murat Özçelik's short films, music and open-source software projects."},
  about:{tr:"Murat Özçelik hakkında: eğitim, kısa filmler, müzik ve açık kaynak yazılımlar.",en:"About Murat Özçelik: education, short films, music and open-source software."}
};
function setLanguage(lang){
  currentLang=lang==='en'?'en':'tr';
  localStorage.setItem('site_lang',currentLang);
  document.documentElement.lang=currentLang;
  $$('[data-tr][data-en]').forEach(el=>{el.textContent=el.dataset[currentLang]});
  $$('.lang-btn').forEach(b=>{const active=b.dataset.lang===currentLang;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  if(menuBtn&&!navLinks?.classList.contains('open'))menuBtn.textContent=menuLabel(false);
  document.title=isAbout?(currentLang==='tr'?'Murat Özçelik | Hakkımda':'Murat Özçelik | About'):(currentLang==='tr'?'Murat Özçelik | Portfolyo':'Murat Özçelik | Portfolio');
  const d=$('meta[name="description"]');if(d)d.setAttribute('content',metaDescriptions[isAbout?'about':'home'][currentLang]);
  const rail=$('.practice-rail');
  if(rail)rail.setAttribute('aria-label',currentLang==='tr'?'Çalışma alanları zaman çizelgesi':'Areas of practice timeline');
  const prev=$('#practicePrev'),next=$('#practiceNext');
  if(prev)prev.setAttribute('aria-label',currentLang==='tr'?'Önceki dönem':'Previous period');
  if(next)next.setAttribute('aria-label',currentLang==='tr'?'Sonraki dönem':'Next period');
}
$$('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
const stored=localStorage.getItem('site_lang');const detected=(navigator.language||'').toLowerCase().startsWith('tr')?'tr':'en';setLanguage(stored||detected);


// Interactive practice timeline: one active panel, native tab semantics and full keyboard support.
const practice=$('[data-practice]');
if(practice){
  const tabs=$$('.practice-tab',practice);
  const panels=$$('.practice-panel',practice);
  const rail=$('.practice-rail',practice);
  const count=$('#practiceIndex',practice);
  const prev=$('#practicePrev',practice);
  const next=$('#practiceNext',practice);
  let active=0;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const activate=(index,focusTab=false,scrollRail=false)=>{
    active=Math.max(0,Math.min(tabs.length-1,index));
    tabs.forEach((tab,i)=>{
      const selected=i===active;
      tab.classList.toggle('is-active',selected);
      tab.setAttribute('aria-selected',String(selected));
      tab.tabIndex=selected?0:-1;
      panels[i].hidden=!selected;
    });
    rail.style.setProperty('--progress',String(80*active/(tabs.length-1))+'%');
    count.textContent=String(active+1).padStart(2,'0');
    prev.disabled=active===0;
    next.disabled=active===tabs.length-1;
    if(focusTab)tabs[active].focus({preventScroll:true});
    if(scrollRail){
      const scroller=$('.practice-rail-scroll',practice);
      if(scroller)scroller.scrollTo({
        left:tabs[active].offsetLeft-scroller.clientWidth/2+tabs[active].clientWidth/2,
        behavior:reducedMotion.matches?'auto':'smooth'
      });
    }
  };
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>activate(i));
    tab.addEventListener('keydown',event=>{
      let target=null;
      if(event.key==='ArrowRight')target=(i+1)%tabs.length;
      if(event.key==='ArrowLeft')target=(i-1+tabs.length)%tabs.length;
      if(event.key==='Home')target=0;
      if(event.key==='End')target=tabs.length-1;
      if(target===null)return;
      event.preventDefault();
      activate(target,true,true);
    });
  });
  prev.addEventListener('click',()=>activate(active-1,false,true));
  next.addEventListener('click',()=>activate(active+1,false,true));
  activate(0);
}
