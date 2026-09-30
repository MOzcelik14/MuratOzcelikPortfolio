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
}
$$('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
const stored=localStorage.getItem('site_lang');const detected=(navigator.language||'').toLowerCase().startsWith('tr')?'tr':'en';setLanguage(stored||detected);
