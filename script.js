const modal=document.getElementById('enquiryModal'),formStatus=document.getElementById('formStatus');
function openEnquiry(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');formStatus.textContent='';formStatus.className='form-status';setTimeout(()=>document.getElementById('fullName').focus(),150)}
function closeEnquiry(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');if(!document.getElementById('videoModal').classList.contains('is-open'))document.body.classList.remove('modal-open')}
document.querySelectorAll('[data-enquire]').forEach(b=>b.addEventListener('click',openEnquiry));document.getElementById('closeModal').addEventListener('click',closeEnquiry);modal.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeEnquiry));document.getElementById('year').textContent=new Date().getFullYear();
const menuToggle=document.getElementById('menuToggle'),mainNav=document.getElementById('mainNav');menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu')});mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeEnquiry();closeVideo()}});
function handleEnquirySubmit(e){e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const mobileInput=form.querySelector('input[name="mobile"]'),status=form.querySelector('.form-status'),mobile=mobileInput.value.trim();if(!/^[6-9]\d{9}$/.test(mobile)){status.textContent='Please enter a valid 10-digit Indian mobile number.';status.className='form-status error';return}status.textContent='Form validated. Connect an email or lead-management service to receive enquiries.';status.className='form-status success'}document.querySelectorAll('#enquiryForm,#contactForm').forEach(form=>form.addEventListener('submit',handleEnquirySubmit));
const galleryItems={exterior:[{src:'assets/Render.jpg',alt:'Purva Silversky exterior rendering',caption:'Exterior · Tower elevation'},{src:'assets/Render1.jpg',alt:'Purva Silversky residential towers and landscape',caption:'Exterior · Aerial view'},{src:'assets/Render2.jpg',alt:'Purva Silversky exterior architecture',caption:'Exterior · Entrance view'},{src:'assets/Render3.jpg',alt:'Purva Silversky exterior project rendering',caption:'Exterior · Project view'},{src:'assets/Render4.jpg',alt:'Purva Silversky residential development rendering',caption:'Exterior · Residential view'},{src:'assets/Render5.jpg',alt:'Purva Silversky landscaped residential spaces',caption:'Exterior · Landscaped view'}],interior:[{src:'assets/Render6.jpg',alt:'Purva Silversky lifestyle and shared spaces rendering',caption:'Interior · Shared spaces'},{src:'assets/Render7.jpg',alt:'Purva Silversky contemporary living space rendering',caption:'Interior · Living spaces'},{src:'assets/Render8.jpg',alt:'Purva Silversky amenities and lifestyle rendering',caption:'Interior · Lifestyle'},{src:'assets/Render9.jpg',alt:'Purva Silversky interior design rendering',caption:'Interior · Design details'},{src:'assets/Render10.jpg',alt:'Purva Silversky indoor shared area rendering',caption:'Interior · Shared areas'},{src:'assets/Render11.jpg',alt:'Purva Silversky lifestyle interior rendering',caption:'Interior · Lifestyle view'}]};
let galleryCategory='exterior',galleryIndex=0;
const galleryFailedSources=new Set();
function renderGallery(){
 const items=galleryItems[galleryCategory],item=items[galleryIndex],img=document.getElementById('galleryImage');
 img.alt=item.alt;
 img.style.opacity='1';
 img.onerror=()=>{
  galleryFailedSources.add(item.src);
  const nextIndex=items.findIndex((candidate,index)=>!galleryFailedSources.has(candidate.src)&&index!==galleryIndex);
  if(nextIndex>=0){galleryIndex=nextIndex;renderGallery();}
  else{img.onerror=null;img.removeAttribute('src');img.alt='Gallery images could not be loaded. Please check the assets folder.';}
 };
 img.src=item.src;
 document.getElementById('galleryCaption').textContent=item.caption+' · Artistic impression';
 document.querySelectorAll('[data-gallery]').forEach(b=>b.classList.toggle('active',b.dataset.gallery===galleryCategory));
 document.getElementById('galleryDots').innerHTML=items.map((_,i)=>'<button class="gallery-dot '+(i===galleryIndex?'active':'')+'" aria-label="Show image '+(i+1)+'" data-dot="'+i+'"></button>').join('');
 document.querySelectorAll('[data-dot]').forEach(b=>b.addEventListener('click',()=>{galleryIndex=Number(b.dataset.dot);renderGallery()}));
}
document.querySelectorAll('[data-gallery]').forEach(b=>b.addEventListener('click',()=>{galleryCategory=b.dataset.gallery;galleryIndex=0;renderGallery()}));document.getElementById('galleryPrev').addEventListener('click',()=>{galleryIndex=(galleryIndex+galleryItems[galleryCategory].length-1)%galleryItems[galleryCategory].length;renderGallery()});document.getElementById('galleryNext').addEventListener('click',()=>{galleryIndex=(galleryIndex+1)%galleryItems[galleryCategory].length;renderGallery()});renderGallery();
const videoData={location:{id:'IrpAXsxVPiM',title:'Regional Connectivity. Global Access.',label:'PURVA SILVERSKY · LOCATION'},lifestyle:{id:'LUZokJTlg_I',title:'A Glimpse of Life at its Best!',label:'PURVA SILVERSKY · LIFESTYLE'},walkthrough:{id:'5Lakarp1NyY',title:'Explore the Residences',label:'PURVA SILVERSKY · WALKTHROUGH'},sustainability:{id:'H3xqCBVIRss',title:'Spaces Designed Around Wellbeing',label:'PURVA SILVERSKY · SUSTAINABILITY'}};let activeVideo='location';
function selectVideo(key){activeVideo=key;const data=videoData[key],img=document.getElementById('videoThumbnail');img.src='https://img.youtube.com/vi/'+data.id+'/maxresdefault.jpg';img.onerror=function(){this.onerror=null;this.src='https://img.youtube.com/vi/'+data.id+'/hqdefault.jpg'};document.getElementById('videoTitle').textContent=data.title;document.getElementById('videoEyebrow').textContent=data.label;document.querySelectorAll('[data-video]').forEach(b=>{const active=b.dataset.video===key;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))})}
document.querySelectorAll('[data-video]').forEach(b=>b.addEventListener('click',()=>selectVideo(b.dataset.video)));
const videoModal=document.getElementById('videoModal'),videoFrame=document.getElementById('videoFrame');function playVideo(){videoFrame.src='https://www.youtube-nocookie.com/embed/'+videoData[activeVideo].id+'?autoplay=1&rel=0';videoModal.classList.add('is-open');videoModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}function closeVideo(){videoModal.classList.remove('is-open');videoModal.setAttribute('aria-hidden','true');videoFrame.src='about:blank';if(!modal.classList.contains('is-open'))document.body.classList.remove('modal-open')}document.getElementById('playVideo').addEventListener('click',playVideo);document.getElementById('closeVideo').addEventListener('click',closeVideo);videoModal.addEventListener('click',e=>{if(e.target===videoModal)closeVideo()});selectVideo('location');
const locationData={education:[['St. Francis de Sales Public School','1.2 km · 3 min'],['IIT Bangalore East Campus','1.1 km · 5 min'],['PES University, Electronic City','2.9 km · 8 min'],['Ebenezer International School','2.8 km · 10 min'],['Sri Chaitanya School','3.1 km · 11 min'],['Symbiosis Centre for Management Studies','3.4 km · 11 min'],['Narayana Hrudayalaya Colleges','4.7 km · 11 min'],['Azim Premji University','14 km · 35 min']],healthcare:[['JJ Hospitals','2.7 km · 7 min'],['Springleaf Hospital','3.2 km · 8 min'],['Narayana Institute of Cardiac Sciences','4.8 km · 12 min'],['Mazumdar Shaw Medical Centre','6.6 km · 12 min'],['Oxford Medical Hospital','16 km · 28 min']],work:[['Continental Automotive Components','1.6 km · 4 min'],['HCL Tech Semiconductor','1.6 km · 5 min'],['Tata Consultancy Services','3 km · 9 min'],['Tech Mahindra','3.4 km · 9 min'],['Infosys Limited','4.7 km · 13 min'],['Wipro Campus','6.2 km · 18 min']],lifestyle:[['M5 Ecity Mall','1.5 km · 4 min'],['DMart Bommasandra','3.2 km · 7 min'],['Decathlon Chandapura','4.4 km · 8 min'],['Gold Coins Club & Resort','3.3 km · 12 min'],['Nirantara Resort & Spa','8.8 km · 22 min']]};
function renderLocation(key){document.getElementById('locationList').innerHTML=locationData[key].map(p=>'<div class="place-row"><strong>'+p[0]+'</strong><span>'+p[1]+'</span></div>').join('');document.querySelectorAll('[data-loc]').forEach(b=>b.classList.toggle('active',b.dataset.loc===key))}document.querySelectorAll('[data-loc]').forEach(b=>b.addEventListener('click',()=>renderLocation(b.dataset.loc)));renderLocation('education');
/* Landing hero carousel: both supplied project images are separate slides. */
(function(){
 const images=[document.getElementById('heroSlideA'),document.getElementById('heroSlideB')];
 const dots=Array.from(document.querySelectorAll('[data-hero-slide]'));
 if(images.length!==2||images.some(img=>!img)||dots.length!==2)return;
 let current=0, intervalId=null;
 const show=(n)=>{
   current=(n+2)%2;
   images.forEach((img,i)=>{img.classList.toggle('active',i===current);img.setAttribute('aria-hidden',i===current?'false':'true')});
   dots.forEach((dot,i)=>{dot.classList.toggle('active',i===current);dot.setAttribute('aria-pressed',i===current?'true':'false')});
 };
 const start=()=>{if(intervalId)clearInterval(intervalId);intervalId=setInterval(()=>show(current+1),5000)};
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start()}));
 const hero=document.querySelector('.hero');
 hero?.addEventListener('mouseenter',()=>{if(intervalId)clearInterval(intervalId)});
 hero?.addEventListener('mouseleave',start);
 images.forEach((img,i)=>{
   img.addEventListener('load',()=>img.dataset.loaded='true');
   img.addEventListener('error',()=>{img.dataset.loaded='false';img.style.backgroundColor='#102b42';img.style.objectFit='contain';img.alt=i===0?'Front-view image could not load':'Aerial image could not load'});
 });
 show(0);start();
})();

/* Interactive indoor/outdoor premium amenities — each choice has its own image and fallback. */
(function(){
 const makeImage=(filename,alt)=>({
   name:filename.name,
   src:'/purva-silversky/assets/'+filename.file,
   fallback:'https://cdn.jsdelivr.net/gh/DigiCourse3/purva-silversky@main/assets/'+filename.file,
   alt
 });
 const images={
  indoor:[
   makeImage({name:'Squash Court',file:'squash-court.jpg'},'Indoor squash court'),
   makeImage({name:'Snooker & Billiards',file:'snooker-billiards.jpg'},'Snooker and billiards room'),
   makeImage({name:'Badminton Court',file:'badminton-court.jpg'},'Indoor badminton court'),
   makeImage({name:'Library',file:'library.jpg'},'Residential library and reading area'),
   makeImage({name:'Games Room',file:'games-room.jpg'},'Indoor games room'),
   makeImage({name:'Multipurpose Hall',file:'multipurpose-hall.jpg'},'Multipurpose indoor hall')
  ],
  outdoor:[
   {name:'Swimming Pool',src:'/purva-silversky/assets/Swimming%20Pool.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Swimming%20Pool.jpg',alt:'Residential swimming pool'},
   {name:'Amphitheatre',src:'/purva-silversky/assets/Amphitheatre.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Amphitheatre.jpg',alt:'Outdoor amphitheatre'},
   {name:'Futsal Court',src:'/purva-silversky/assets/Futsal_court.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Futsal_court.jpg',alt:'Outdoor futsal court'},
   {name:'Pet Corner',src:'/purva-silversky/assets/Pet%20Cornor.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Pet%20Cornor.jpg',alt:'Outdoor pet corner'},
   {name:'Pickle Ball Court',src:'/purva-silversky/assets/Pickle_ball.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Pickle_ball.jpg',alt:'Outdoor pickleball court'},
   {name:'Outdoor Gym',src:'/purva-silversky/assets/Outdoor_gym.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Outdoor_gym.jpg',alt:'Outdoor gym'},
   {name:'Skating Rink',src:'/purva-silversky/assets/Skating_rink.jpg',fallback:'https://raw.githubusercontent.com/DigiCourse3/purva-silversky/main/assets/Skating_rink.jpg',alt:'Outdoor skating rink'}
  ]
 };
 const icons={
  squash:'<svg viewBox="0 0 64 64"><rect x="12" y="8" width="40" height="48" rx="2"/><path d="M18 15h28M18 49h28M20 18l24 28M44 18 20 46"/></svg>',
  snooker:'<svg viewBox="0 0 64 64"><rect x="5" y="13" width="54" height="38" rx="4"/><rect x="10" y="18" width="44" height="28" rx="2"/><circle cx="18" cy="25" r="2"/><circle cx="46" cy="39" r="2"/><circle cx="32" cy="30" r="2"/><path d="M24 35l17-13"/></svg>',
  badminton:'<svg viewBox="0 0 64 64"><path d="M32 8v48M6 18h52M6 46h52M6 18v28M58 18v28M6 32h52"/><path d="M27 8l5 7 5-7"/></svg>',
  library:'<svg viewBox="0 0 64 64"><path d="M8 10h48v44H8zM8 23h48M8 38h48"/><path d="M15 14v6m9-6v6m10-6v6m10-6v6M16 27v8m10-8v8m10-8v8m10-8v8M15 42v8m10-8v8m10-8v8m10-8v8"/></svg>',
  games:'<svg viewBox="0 0 64 64"><rect x="7" y="18" width="50" height="30" rx="8"/><path d="M17 33h12M23 27v12M42 29h.1M47 36h.1M10 48l-3 7m50-7 3 7"/></svg>',
  hall:'<svg viewBox="0 0 64 64"><path d="M8 55V15h48v40M4 55h56M16 22h32M16 30h32M16 38h32M16 46h32"/><path d="M22 15V8h20v7"/></svg>',
  pool:'<svg viewBox="0 0 64 64"><path d="M6 40c6-8 12 8 18 0s12 8 18 0 12 8 16 0M8 49c6-8 12 8 18 0s12 8 18 0 12 8 16 0"/><circle cx="32" cy="17" r="8"/></svg>',
  amphi:'<svg viewBox="0 0 64 64"><path d="M8 48h48M13 40h38M18 32h28M23 24h18M28 16h8M8 48v7h48v-7"/></svg>',
  court:'<svg viewBox="0 0 64 64"><rect x="5" y="10" width="54" height="44"/><path d="M32 10v44M5 32h54M14 10v44M50 10v44"/><circle cx="32" cy="32" r="6"/></svg>',
  pet:'<svg viewBox="0 0 64 64"><circle cx="43" cy="12" r="5"/><path d="M43 18l-7 13-9 4M39 22l8 8 8 2M36 31l2 18M46 31l5 18M9 40l7-6 12 2 4 8-5 5H15z"/><circle cx="16" cy="31" r="3"/><circle cx="23" cy="29" r="3"/></svg>',
  ball:'<svg viewBox="0 0 64 64"><circle cx="22" cy="32" r="17"/><circle cx="44" cy="32" r="17"/><path d="M11 20c8 2 14 8 16 16M35 20c8 2 14 8 16 16M11 44c8-2 14-8 16-16M35 44c8-2 14-8 16-16"/></svg>',
  gym:'<svg viewBox="0 0 64 64"><path d="M14 25v14M8 21v22M50 25v14M56 21v22M14 32h36M26 13h12l-3 8h-6zM32 21v27M24 48h16M28 52h8"/></svg>',
  skate:'<svg viewBox="0 0 64 64"><circle cx="39" cy="11" r="5"/><path d="M37 18l-9 11 8 7-5 10M28 29l-10 7-3 12M36 36l10 4 5 9M13 52h16M35 52h20"/><circle cx="18" cy="55" r="2"/><circle cx="48" cy="55" r="2"/></svg>'
 };
 const iconByName={'Squash Court':'squash','Snooker & Billiards':'snooker','Badminton Court':'badminton','Library':'library','Games Room':'games','Multipurpose Hall':'hall','Swimming Pool':'pool','Amphitheatre':'amphi','Futsal Court':'court','Pet Corner':'pet','Pickle Ball Court':'ball','Outdoor Gym':'gym','Skating Rink':'skate'};
 const options=document.getElementById('amenityOptions'),feature=document.getElementById('amenityFeatureImage'),caption=document.getElementById('amenityFeatureCaption');
 if(!options||!feature||!caption)return;
 let mode='indoor',selectionToken=0;
 function choose(item,button){
  const token=++selectionToken;
  options.querySelectorAll('.amenity-choice').forEach(b=>b.classList.toggle('active',b===button));
  caption.textContent=item.name;
  feature.alt=item.alt;
  feature.style.opacity='1';
  feature.style.visibility='visible';
  let triedFallback=false;
  feature.onerror=()=>{
   if(token!==selectionToken)return;
   if(!triedFallback&&item.fallback){
    triedFallback=true;
    feature.src=item.fallback;
    return;
   }
   feature.onerror=null;
   feature.style.visibility='hidden';
   caption.textContent=item.name+' · Image unavailable';
  };
  feature.onload=()=>{
   if(token!==selectionToken)return;
   feature.style.visibility='visible';
   caption.textContent=item.name;
  };
  // Assign directly to the displayed image; avoid waiting on a separate preloader first.
  feature.src=item.src;
 }
 function render(){
  options.innerHTML=images[mode].map(item=>'<button type="button" class="amenity-choice" aria-label="Show '+item.name+' image"><span class="amenity-icon">'+(icons[iconByName[item.name]]||icons.court)+'</span><span>'+item.name+'</span></button>').join('');
  options.querySelectorAll('.amenity-choice').forEach((button,i)=>button.addEventListener('click',()=>choose(images[mode][i],button)));
  choose(images[mode][0],options.querySelector('.amenity-choice'));
  document.querySelectorAll('[data-amenity-mode]').forEach(b=>{const active=b.dataset.amenityMode===mode;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});
 }
 document.querySelectorAll('[data-amenity-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.amenityMode;render()}));
 render();
})();

// Plans section interactions: master plan, unit plan, floor plan and image lightbox.
(function(){
 const masterTab=document.querySelector('[data-plan-view="master"]');
 const planTab=document.querySelector('[data-plan-view="plan"]');
 const masterView=document.getElementById('masterPlanView');
 const unitView=document.getElementById('unitPlansView');
 if(!masterTab||!planTab||!masterView||!unitView)return;
 function setMainView(view){
  const master=view==='master';
  masterView.hidden=!master;
  unitView.hidden=master;
  masterTab.classList.toggle('active',master);
  planTab.classList.toggle('active',!master);
  masterTab.setAttribute('aria-selected',String(master));
  planTab.setAttribute('aria-selected',String(!master));
 }
 masterTab.addEventListener('click',()=>setMainView('master'));
 planTab.addEventListener('click',()=>setMainView('plan'));
 const unitTab=document.querySelector('[data-unit-view="unit"]');
 const floorTab=document.querySelector('[data-unit-view="floor"]');
 const unitCards=document.getElementById('unitPlanCards');
 const floorCards=document.getElementById('floorPlanCards');
 function setUnitView(view){
  const unit=view==='unit';
  unitCards.hidden=!unit;
  floorCards.hidden=unit;
  unitTab.classList.toggle('active',unit);
  floorTab.classList.toggle('active',!unit);
  unitTab.setAttribute('aria-selected',String(unit));
  floorTab.setAttribute('aria-selected',String(!unit));
 }
 unitTab.addEventListener('click',()=>setUnitView('unit'));
 floorTab.addEventListener('click',()=>setUnitView('floor'));
 const lightbox=document.getElementById('planLightbox');
 const lightboxImage=document.getElementById('planLightboxImage');
 const closeButton=document.getElementById('closePlanLightbox');
 function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImage.src='';
  document.body.classList.remove('plan-lightbox-open');
 }
 document.querySelectorAll('[data-enlarge-image]').forEach(button=>button.addEventListener('click',()=>{
  const image=button.querySelector('img');
  lightboxImage.src=button.dataset.enlargeImage;
  lightboxImage.alt=image?image.alt:'Enlarged plan image';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('plan-lightbox-open');
  closeButton.focus();
 }));
 closeButton.addEventListener('click',closeLightbox);
 lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&lightbox.classList.contains('open'))closeLightbox()});
})();
