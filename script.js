'use strict';
/* Atlas Junior — présentation immersive (Three.js r128 + GSAP/ScrollTrigger) */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);
const N=13,W=22,PO=()=>innerWidth<innerHeight*.9,L=h=>new THREE.Color(h).convertSRGBToLinear();
const F=[
{n:'Nature',m:'Zaza',c:'#2F7DE1',p:2,k:'cow',mc:'#FFFFFF'},
{n:'Caramel',m:'Hmida',c:'#D18A2E',p:3,k:'cam',mc:'#D9B27C'},
{n:'Chocolat',m:'Choukrane',c:'#6B3F2A',p:3,k:'mon',mc:'#8A5A3B'},
{n:'Fraise / Miel',m:'Nouna',c:'#E8628A',p:3,k:'gaz',mc:'#E8B04F'}];
const mas=[['La vache','Lait nature','La grande sœur rassurante'],['Le chameau','Caramel','Drôle'],['Nouna la gazelle','Fraise ou miel','Rapide et douce'],['Barbarie','Chocolat','Aventurier']];
/* cam = [x, y, z, décalage regard x, regard y, balancement orbital] */
const SL=[
{t:'Ouverture',a:'#E6C36A',bg:'#02050f',cam:[0,.6,9.5,-2.6,.2,1.1],cls:'L',h:`<h1 class=rv>ATLAS<br>JUNIOR</h1><p class="p rv">Une nouvelle génération de lait pour les enfants marocains</p><div class="sl rv">, kbar, w tfarrej !</div><div class="ft rv">Présentation officielle du concept de marque</div>`},
{t:"L'univers de la marque",a:'#E6C36A',bg:'#0A3D91',cam:[0,0,11,-2.8,0,.12],cls:'L',h:`<div class="k rv">01 · L'univers de la marque</div><h2 class=rv>Une marque née du Maroc</h2><p class="p rv">Atlas Junior évoque les montagnes de l'Atlas.</p><div class="chips rv">${['Force','Authenticité','Confiance','Fierté marocaine'].map(x=>`<span class=c>${x}</span>`).join('')}</div><p class="p rv">Toute l'identité parle aux familles marocaines grâce à la darija, des personnages attachants et un univers simple et mémorable.</p>${['Force','Authenticité','Confiance','Fierté','Darija','Personnages','Univers simple'].map((w,i,a)=>{const t=i/a.length*6.283;return `<span class="w rv" style="left:${69+16*Math.cos(t)}%;top:${50+34*Math.sin(t)}%"><i style="animation-delay:${i*.6}s">${w}</i></span>`}).join('')}`},
{t:'Mission • Vision • Valeurs',a:'#7CF0D6',bg:'#0d5c63',cam:[0,0,12,0,0,.15],h:`<div class="k rv">02 · Mission • Vision • Valeurs</div><div class=grid style="margin-top:.8rem"><div class="g rv"><span class=ic>🎯</span><h3>Mission</h3><p>Accompagner la croissance des enfants marocains avec un lait sain, savoureux et accessible.</p></div><div class="g rv"><span class=ic>🔭</span><h3>Vision</h3><p>Faire d'Atlas Junior la marque de référence du lait pour enfants au Maroc et en Afrique.</p></div><div class="g rv"><span class=ic>💎</span><h3>Valeurs</h3><ul>${[['🛡️','Qualité et sécurité alimentaire'],['🔍','Transparence sur la composition'],['🇲🇦','Fierté locale'],['💚','Santé et plaisir'],['💰','Prix accessibles']].map(v=>`<li><i>${v[0]}</i>${v[1]}</li>`).join('')}</ul></div></div>`},
{t:'Les mascottes',a:'#FFD36B',bg:'#3b1f77',cam:[0,1.3,11,0,1.1,.06],h:`<div class="k rv">03 · Les mascottes</div><h2 class=rv>Quatre amis, quatre saveurs</h2><div class="grid mg" style="margin-top:auto">${mas.map(m=>`<div class="g rv"><h3>${m[0]}</h3><b>${m[1]}</b><br>${m[2]}</div>`).join('')}</div>`},
{t:'La gamme de produits',a:'#E6C36A',bg:'#0a1f4d',cam:[0,1.4,10,-2.8,0,.2],cls:'L',h:`<div class="k rv">04 · La gamme de produits</div><h2 class=rv>Quatre saveurs,<br>une même famille</h2><p class="p rv">Brique 20 cl avec paille</p><div class="g rv tb"><div class="tr th"><i></i><span>Produit</span><span>Mascotte</span><span>Prix</span></div>${F.map(f=>`<div class=tr><i style="background:${f.c};color:${f.c}"></i><b>${f.n}</b><span>${f.m}</span><em>${f.p} MAD</em></div>`).join('')}</div>`},
{t:'Le packaging en 3D',a:'#9CC9FF',bg:'#2b2f3a',cam:[0,.8,11,0,.5,.1],h:`<div class="k rv">05 · Le packaging en 3D</div><h2 class=rv>Un produit prêt pour le rayon</h2><div class="chips rv">${['Logo','Mascotte','Saveur','Paille','Éléments graphiques'].map(x=>`<span class=c>${x}</span>`).join('')}</div><div class="grid mg rv" style="margin-top:auto">${['Vue face','Vue arrière','Vue perspective','Groupe complet'].map(x=>`<div class=g style="text-align:center;padding:.8rem">${x}</div>`).join('')}</div>`},
{t:'La stratégie produit',a:'#F2D8A7',bg:'#6b4f2c',cam:[0,.8,10.5,-2.6,.5,.1],cls:'L',h:`<div class="k rv">06 · La stratégie produit</div><h2 class=rv>Deux phases, une ambition</h2><div class="g rv ph"><span class=ic>🧃</span><div><h3>Phase 1</h3>Briques individuelles 20 cl</div></div><div class="g rv ph dash"><span class=ic>🥛</span><div><h3>Phase 2 — développement futur</h3>Brique familiale 1 L<br><b>Prix envisagé : 8 à 9 MAD</b></div></div>`},
{t:'La clientèle cible',a:'#8EE3FF',bg:'#164a5c',cam:[0,0,12,0,0,.15],h:`<div class="k rv">07 · La clientèle cible</div><div class=grid style="margin-top:.8rem"><div class="g rv"><span class=ic>👨‍👩‍👧</span><h3>Acheteurs</h3><p>Parents de 25 à 45 ans</p><ul><li>urbains</li><li>périurbains</li><li>toutes classes de revenus</li></ul></div><div class="g rv"><span class=ic>🧒</span><h3>Consommateurs</h3><p>Enfants de 3 à 12 ans</p></div><div class="g rv"><span class=ic>🩺</span><h3>Prescripteurs</h3><ul><li>pédiatres</li><li>écoles</li><li>crèches</li><li>influenceuses maman</li></ul></div></div>`},
{t:'Ce qui compte pour les familles',a:'#FFC98A',bg:'#7a3b3b',cam:[0,1.2,8.5,0,1.2,.05],h:`<div class="k rv">08 · Ce qui compte pour les familles</div><h2 class=rv>Cinq piliers</h2>${[['🛡️','Sécurité',50,20],['❤️','Santé',80,40],['😋','Goût',72,82],['💰','Prix',28,82],['🧃','Praticité',20,40]].map(x=>`<span class="g pl rv" style="left:${x[2]}%;top:${x[3]}%">${x[0]} ${x[1]}</span>`).join('')}`},
{t:'Pourquoi Atlas Junior',a:'#E6C36A',bg:'#0A3D91',cam:[0,.6,9.5,-2.8,.2,.3],cls:'L',h:`<div class="k rv">09 · Pourquoi Atlas Junior</div><h2 class=rv>Nos piliers<br>de différenciation</h2><div class="grid dg">${[['🏔️','Univers marocain'],['🗣️','Communication en darija'],['🐪','Mascottes mémorables'],['🍓','Saveurs familières'],['💸','Prix accessibles'],['🧃','Format pratique']].map(x=>`<div class="g rv"><span class=ic style="font-size:1.8rem">${x[0]}</span> <b>${x[1]}</b></div>`).join('')}</div><p class="p rv" style="font-size:.85em">Positionnement souhaité de la marque.</p>`},
{t:'Communication et marketing',a:'#FF8FD1',bg:'#4a1d6b',cam:[0,0,13,0,0,.2],h:`<div class="k rv">10 · Communication et marketing</div><h2 class=rv>Une marque qui vit partout</h2><div class=grid style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));margin-top:1.4rem">${[['▶️','YouTube','Mini-série animée'],['🎵','TikTok','Vidéos courtes'],['🃏','Cartes à collectionner','Mascottes'],['🌙','Ramadan','Édition spéciale'],['🏫','Écoles','Actions futures']].map(x=>`<div class="g rv"><span class=ic>${x[0]}</span><h3>${x[1]}</h3>${x[2]}</div>`).join('')}</div>`},
{t:'Roadmap',a:'#5BD6FF',bg:'#062a4d',cam:[0,.5,11,0,.5,.05],h:`<div class="k rv">11 · Roadmap</div><h2 class=rv>De l'idée au lancement pilote</h2><div class=rm><div class=ln></div>${['Identité visuelle','Packaging','Étude de marché','Validation réglementaire','Lancement pilote'].map((x,i)=>`<div class="st rv"><b class=n>${i+1}</b><h3>Étape ${i+1}</h3><p>${x}</p></div>`).join('')}</div>`},
{t:'Final showcase',a:'#E6C36A',bg:'#0A3D91',cam:[0,1.2,6.5,0,1.4,0],cls:'ctr',h:`<h1 class=rv>ATLAS JUNIOR</h1><div class="sl rv">Chrab, kbar, w tfarrej !</div><p class="p rv">Une marque pensée pour grandir avec les enfants marocains.</p>`}];

/* ---------- Scène 3D ---------- */
let cur=-1,T=0;
const cnv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,1.75));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.outputEncoding=THREE.sRGBEncoding;
const sc=new THREE.Scene();sc.background=new THREE.Color('#000');sc.fog=new THREE.FogExp2('#000',.012);
const C=new THREE.PerspectiveCamera(40,1,.1,500);
{const c=cnv(512,256),g=c.getContext('2d'),gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#dbe8ff');gr.addColorStop(.55,'#2a4a8a');gr.addColorStop(1,'#050b1c');g.fillStyle=gr;g.fillRect(0,0,512,256);g.fillStyle='#fff';[[40,40,130,46],[280,24,110,56],[430,80,60,70]].forEach(r=>g.fillRect(...r));g.fillStyle='#ffd9a0';g.fillRect(190,110,80,22);
const t=new THREE.CanvasTexture(c);t.mapping=THREE.EquirectangularReflectionMapping;t.encoding=THREE.sRGBEncoding;sc.environment=new THREE.PMREMGenerator(R).fromEquirectangular(t).texture}
const rig=new THREE.Group(),key=new THREE.DirectionalLight(0xfff1dc,2.6),rim=new THREE.PointLight(0x6fa8ff,2,32),ml=new THREE.PointLight(0xffd27a,2.2,24);
key.position.set(5,10,8);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:1,far:40});key.shadow.camera.updateProjectionMatrix();
rim.position.set(-6,4,-6);rig.add(key,key.target,rim);sc.add(rig,ml,new THREE.HemisphereLight(0xbcd2ff,0x0a1a3a,.8));
const spr=(()=>{const c=cnv(64,64),g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.3,'rgba(255,255,255,.35)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
/* Montagnes de l'Atlas en silhouette + halo */
const mt=new THREE.Mesh();for(let i=0;i<72;i++){const h=8+Math.random()*16,m=new THREE.Mesh(new THREE.ConeGeometry(6+Math.random()*9,h,5),new THREE.MeshStandardMaterial({color:0x06142e,roughness:.9,flatShading:true}));m.position.set(-40+i*4.2,h/2-6,-45-Math.random()*40);m.rotation.y=Math.random()*3;sc.add(m)}
const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:spr,color:0xffc070,blending:THREE.AdditiveBlending,transparent:true,opacity:.55,depthWrite:false,fog:false}));glow.scale.set(130,130,1);glow.position.set(0,6,-100);sc.add(glow);
/* Particules interactives (attirées par le curseur) */
const PN=1100,pb=new Float32Array(PN*3),pp=new Float32Array(PN*3);
for(let i=0;i<PN*3;i+=3){pb[i]=Math.random()*60-30;pb[i+1]=Math.random()*20-7;pb[i+2]=Math.random()*34-22}pp.set(pb);
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({map:spr,size:.22,color:0xffe3a0,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));sc.add(pts);
/* Objets flottants */
const FL=[],fg=[new THREE.SphereGeometry(.28,24,16),new THREE.IcosahedronGeometry(.3,0),new THREE.TorusGeometry(.3,.09,12,28)],
fm=['#FBF8F1','#E6C36A','#5BA0FF'].map((c,i)=>new THREE.MeshPhysicalMaterial({color:L(c),metalness:i==1?1:.1,roughness:.2,clearcoat:1,envMapIntensity:1.5}));
for(let i=0;i<90;i++){const m=new THREE.Mesh(fg[i%3],fm[(i*7)%3]);m.scale.setScalar(.6+Math.random()*.9);m.position.set(Math.random()*N*W-10,Math.random()*12-4,-16+Math.random()*14);sc.add(m);FL.push({m,b:m.position.y,s:.5+Math.random(),o:Math.random()*6})}
/* Packaging : textures dessinées + brique PBR vernie */
const TC={};
function tex(f,back,big){
 const k=f.n+(back?1:0)+(big?1:0);if(TC[k])return TC[k];
 const c=cnv(512,900),g=c.getContext('2d'),ci=(x,y,r,col)=>{g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill()},ff='"Arial Black",Impact,sans-serif',sz=big?'1 L':'20 cl';
 g.fillStyle=f.c;g.fillRect(0,0,512,900);
 const h=g.createLinearGradient(0,0,512,0);h.addColorStop(0,'rgba(255,255,255,.3)');h.addColorStop(.5,'rgba(255,255,255,0)');h.addColorStop(1,'rgba(0,0,0,.28)');g.fillStyle=h;g.fillRect(0,0,512,900);
 g.fillStyle='#E6C36A';g.beginPath();g.moveTo(40,250);g.lineTo(150,110);g.lineTo(215,190);g.lineTo(300,70);g.lineTo(470,250);g.fill();
 g.fillStyle='#fff';g.textAlign='center';g.font='900 84px '+ff;g.fillText('ATLAS',256,345);g.font='900 62px '+ff;g.fillText('JUNIOR',256,410);
 if(!back){ci(256,575,108,f.mc);ci(160,490,38,f.mc);ci(352,490,38,f.mc);ci(224,565,15,'#111');ci(288,565,15,'#111');ci(229,559,5,'#fff');ci(293,559,5,'#fff');
  g.strokeStyle='#111';g.lineWidth=7;g.beginPath();g.arc(256,598,30,.2,2.9);g.stroke();
  g.fillStyle='#FBF8F1';g.beginPath();g.moveTo(0,745);g.quadraticCurveTo(128,695,256,745);g.quadraticCurveTo(384,795,512,745);g.lineTo(512,900);g.lineTo(0,900);g.fill();
  g.fillStyle=f.c;g.font='900 66px '+ff;g.fillText(f.n.split(' ')[0].toUpperCase(),256,835);g.font='600 32px Arial';g.fillText('Lait · '+sz,256,880)}
 else{g.fillStyle='#fff';g.font='700 58px '+ff;g.fillText('Chrab, kbar,',256,560);g.fillText('w tfarrej !',256,630);g.font='500 30px Arial';g.fillText('Lait pour enfants · '+sz,256,740);g.fillText('Visuel conceptuel',256,785)}
 const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return TC[k]=t}
function carton(f,big){
 const g=new THREE.Group(),mk=o=>new THREE.MeshPhysicalMaterial(Object.assign({roughness:.35,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:1.4},o)),sd=mk({color:L(f.c)}),tp=mk({color:L('#FBF8F1')});
 const b=new THREE.Mesh(new THREE.BoxGeometry(1,1.8,.64),[sd,sd,tp,sd,mk({map:tex(f,0,big)}),mk({map:tex(f,1,big)})]);
 const fin=new THREE.Mesh(new THREE.BoxGeometry(1,.16,.2),tp);fin.position.y=.98;
 const st=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.1,12),tp);st.position.set(.28,1.45,0);st.rotation.z=-.12;
 const bd=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.3,12),tp);bd.position.set(.17,2,0);bd.rotation.z=1.2;
 g.add(b,fin,st,bd);g.traverse(o=>{o.castShadow=true});return g}
const put=(c,x,z=0,s=1,r=0,P=sc)=>{c.position.set(x,-1+.9*s,z);c.scale.setScalar(s);c.rotation.y=r;c.userData.s=s;c.userData.y=c.position.y;P.add(c);return c};
const tk=new THREE.BoxGeometry(.08,.05,.3),tm=new THREE.MeshStandardMaterial({color:0xE6C36A,metalness:1,roughness:.3});
const plat=(i,r=3.4)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r+.15,.3,72),new THREE.MeshPhysicalMaterial({color:L('#0b2a66'),metalness:.75,roughness:.2,clearcoat:1,envMapIntensity:1.2}));m.position.set(i*W,-1.15,0);m.receiveShadow=true;
 for(let j=0;j<24;j++){const a=j/24*6.283,t=new THREE.Mesh(tk,tm);t.position.set(Math.sin(a)*(r-.25),.16,Math.cos(a)*(r-.25));t.rotation.y=a;m.add(t)}sc.add(m);return m};
/* Logo 3D doré */
function mkLogo(){const g=new THREE.Group(),s=new THREE.Group(),m=new THREE.MeshPhysicalMaterial({color:L('#E6C36A'),metalness:1,roughness:.22,clearcoat:1,envMapIntensity:1.8}),sh=new THREE.Shape();
 [[-1.2,-.7],[-.45,.55],[-.1,.05],[.35,.85],[1.2,-.7]].forEach((p,i)=>i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1]));
 const a=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.3,bevelEnabled:true,bevelSize:.07,bevelThickness:.07,bevelSegments:4}),m);a.geometry.center();
 s.add(a,new THREE.Mesh(new THREE.TorusGeometry(1.65,.05,16,90),m));g.add(s);g.userData.s=s;g.traverse(o=>{o.castShadow=true});return g}
/* Mascottes 3D (formes rondes façon studio d'animation) */
function crit(f){
 const g=new THREE.Group(),k=f.k,mc=f.mc,fz=k=='mon'?.7:.8,M=(c,r=.5)=>new THREE.MeshPhysicalMaterial({color:L(c),roughness:r,clearcoat:.5,clearcoatRoughness:.25});
 const sp=(r,c,x,y,z,sx=1,sy=1,sz=1,rz=0)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,32,24),M(c));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.rotation.z=rz;g.add(m);return m};
 sp(.82,mc,0,.85,0,1,1.05,.9);sp(.66,mc,0,1.95,.05);
 [-1,1].forEach(s=>{sp(.28,mc,s*.4,.1,.3,1,.6,1.4);sp(.15,'#fff',s*.25,2.02,.55);sp(.085,'#151515',s*.25,2.02,.66);sp(.03,'#fff',s*.28,2.07,.73);sp(.12,'#FF9FB0',s*.45,1.8,.5,1,.7,.5);
  if(k=='cow'){sp(.2,mc,s*.72,2.12,0,1.4,.55,.8);sp(.07,'#F5E7C8',s*.34,2.62,0,.9,1.6,.9)}
  if(k=='cam')sp(.14,mc,s*.52,2.52,0,.8,1.3,.6);
  if(k=='gaz'){sp(.13,mc,s*.5,2.55,0,.7,2.4,.5,-s*.5);const h=new THREE.Mesh(new THREE.ConeGeometry(.07,.6,10),M('#4a3322'));h.position.set(s*.28,2.8,0);h.rotation.z=-s*.25;g.add(h)}
  if(k=='mon'){sp(.24,mc,s*.7,2,0);sp(.14,'#F0B49A',s*.74,2,.1,1,1,.5)}});
 if(k=='cow'){sp(.3,'#1b1b1b',.5,1.1,.55,1,1,.35);sp(.2,'#1b1b1b',-.32,2.4,.45,1,1,.4);sp(.3,'#F7B6C2',0,1.78,.6,1.3,.8,.7)}
 if(k=='cam'){sp(.42,'#C9A06A',0,1.75,-.5,1,1.1,1);sp(.32,'#EBD3A9',0,1.78,.55,1.25,.85,.8)}
 if(k=='gaz'){sp(.55,'#FFF3DC',0,.7,.4,1,1,.6);sp(.25,'#FFF3DC',0,1.8,.58,1.3,.8,.8)}
 if(k=='mon'){sp(.46,'#E8C7A0',0,1.85,.3,1.2,1.05,.8);const t=new THREE.Mesh(new THREE.TorusGeometry(.5,.07,10,30,4),M(mc));t.position.set(.1,.7,-.8);g.add(t)}
 sp(.08,'#2a1a1a',0,1.84,fz+.02,1.4,1,1);
 const sf=new THREE.Mesh(new THREE.TorusGeometry(.5,.1,16,40),M(f.c));sf.rotation.x=Math.PI/2;sf.position.y=1.42;g.add(sf);
 const sm=new THREE.Mesh(new THREE.TorusGeometry(.13,.025,8,16,Math.PI),M('#2a1a1a'));sm.rotation.z=Math.PI;sm.position.set(0,1.68,fz);g.add(sm);
 g.traverse(o=>{o.castShadow=true});return g}
function person(dress,hair,s,hs){
 const g=new THREE.Group(),M=c=>new THREE.MeshPhysicalMaterial({color:L(c),roughness:.5,clearcoat:.4}),sph=r=>new THREE.SphereGeometry(r,32,24),
 add=(geo,c,x,y,z)=>{const m=new THREE.Mesh(geo,M(c));m.position.set(x,y,z);m.castShadow=true;g.add(m);return m};
 add(new THREE.CylinderGeometry(.3,.78,1.6,32),dress,0,.8,0);add(sph(.4*hs),'#F0C8A0',0,1.95,0);add(sph(.43*hs),hair,-.07,2.03,0);
 [-1,1].forEach(z=>add(sph(.05),'#222',.38*hs,1.98,z*.15*hs));
 add(new THREE.CylinderGeometry(.09,.09,1.2,16),dress,.6,1.5,0).rotation.z=-1.25;g.scale.setScalar(s);return g}

/* ---------- Construction des 13 plateaux (un par slide, le long de l'axe X) ---------- */
plat(0);const hero=put(carton(F[0]),0,0,1.5);
const lg=mkLogo(),lg2=mkLogo();lg.position.set(W,0,0);lg.scale.setScalar(1.7);lg2.position.set(12*W,4.8,-9);lg2.scale.setScalar(2.4);sc.add(lg,lg2);
plat(3,7);const M4=[0,1,3,2].map((fi,i)=>{const m=crit(F[fi]);m.position.set(3*W+[-4.5,-1.5,1.5,4.5][i],-.95,0);m.userData.x=m.position.x;m.scale.setScalar(1.15);sc.add(m);return m});
const p4=plat(4,3.6),rgO=new THREE.Group(),rg=new THREE.Group();rgO.position.set(4*W,0,0);rgO.add(rg);sc.add(rgO);
const RC=F.map((f,i)=>{const a=i/4*6.283;return put(carton(f),Math.sin(a)*2.1,Math.cos(a)*2.1,1.1,a,rg)});
plat(5,6.4);const C5=[0,1,3].map((fi,i)=>put(carton(F[fi]),5*W+[-4.5,-1.5,1.5][i],0,1.2,[0,Math.PI,.7][i])),g5=new THREE.Group();
g5.position.set(5*W+4.5,0,0);sc.add(g5);F.forEach((f,i)=>put(carton(f),[-.95,-.32,.32,.95][i],[.15,.45,.45,.15][i],.8,[.25,.1,-.1,-.25][i],g5));
plat(6,4);const S6=[0,1,2,3].map(i=>put(carton(F[i]),6*W+[-2.1,-.7,.7,2.1][i],1.2,.8,-.25+i*.1)),big=put(carton(F[0],1),6*W,-2.4,2.1);
plat(8,4.6);const mom=person('#C65D4A','#2b1b12',1,1),kid=person('#F2B134','#2b1b12',.62,1.5),mc8=carton(F[0]),wl=new THREE.PointLight(0xffb36b,3,14);
mom.position.set(8*W-1.8,-1,0);kid.position.set(8*W+1.8,-1,0);kid.rotation.y=Math.PI;mc8.scale.setScalar(.85);mc8.position.set(8*W,1.3,.3);wl.position.set(8*W,2.2,3);sc.add(mom,kid,mc8,wl);
plat(9,3.4);const h9=put(carton(F[3]),9*W,0,1.6);
const CD=[...Array(8)].map((_,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.3,1.9,.05),new THREE.MeshPhysicalMaterial({color:L(F[i%4].c),metalness:.3,roughness:.25,clearcoat:1,envMapIntensity:1.5}));sc.add(m);return m});
const OR=[0,1,2,3,4].map(i=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.42,32,24),new THREE.MeshStandardMaterial({color:0x10204a,emissive:new THREE.Color('#E6C36A'),emissiveIntensity:.05,roughness:.2,metalness:.4}));m.position.set(11*W+[-5.7,-2.85,0,2.85,5.7][i],0,0);sc.add(m);return m});
plat(12,8);const M5=[0,1,3,2].map((fi,i)=>{const m=crit(F[fi]);m.position.set(12*W+[-6.5,-2.2,2.2,6.5][i],-.95,-2.5);m.scale.setScalar(1.3);sc.add(m);return m}),
C12=[0,1,3,2].map((fi,i)=>put(carton(F[fi]),12*W+[-4.2,-1.4,1.4,4.2][i],2.6,1.1));

/* ---------- Animations d'entrée 3D par slide ---------- */
const pop=(o,d=0,s=o.userData.s||1)=>gsap.fromTo(o.scale,{x:.001,y:.001,z:.001},{x:s,y:s,z:s,duration:1.3,delay:d,ease:'back.out(1.6)'});
const E={
0(){gsap.fromTo(hero.position,{y:-5},{y:hero.userData.y,duration:4,delay:1,ease:'power3.out'});pop(hero,1);gsap.fromTo(pts.material,{opacity:0},{opacity:.9,duration:4,delay:.4})},
1(){gsap.fromTo(lg.rotation,{y:-3.5},{y:0,duration:2.4,delay:.4,ease:'power3.out'});pop(lg,.4,1.7)},
3(){M4.forEach((m,i)=>{const x=m.userData.x,d=.9+i*.3;
 [()=>gsap.fromTo(m.position,{y:9},{y:-.95,duration:1.6,delay:d,ease:'bounce.out'}),
  ()=>gsap.fromTo(m.position,{x:x-14,y:-.95},{x:x,duration:1.8,delay:d,ease:'elastic.out(1,.55)'}),
  ()=>gsap.fromTo(m.position,{z:-9,y:-6},{z:0,y:-.95,duration:1.6,delay:d,ease:'back.out(2)'}),
  ()=>{gsap.fromTo(m.position,{x:x+14,y:-.95},{x:x,duration:1.8,delay:d,ease:'power4.out'});gsap.fromTo(m.rotation,{y:12},{y:0,duration:1.8,delay:d,ease:'power4.out'})}][i]()})},
4(){gsap.fromTo(rgO.scale,{x:.01,y:.01,z:.01},{x:1,y:1,z:1,duration:2.2,delay:.3,ease:'expo.out'});gsap.fromTo(rgO.rotation,{y:-5},{y:0,duration:2.6,delay:.3,ease:'power3.out'})},
5(){[...C5,g5].forEach((c,i)=>pop(c,.6+i*.25,c.userData.s||1))},
6(){S6.forEach((c,i)=>pop(c,.5+i*.2));gsap.fromTo(big.position,{y:-6},{y:big.userData.y,duration:2.2,delay:2,ease:'power3.out'})},
8(){pop(mc8,.8,.85);$$('.pl').forEach((e,i)=>{e.classList.remove('lit');gsap.delayedCall(1+i*.7,()=>e.classList.add('lit'))})},
9(){pop(h9,.6)},
11(){OR.forEach((m,i)=>{gsap.fromTo(m.material,{emissiveIntensity:.05},{emissiveIntensity:2.4,duration:.6,delay:1+i*.6});gsap.fromTo(m.scale,{x:.6,y:.6,z:.6},{x:1.3,y:1.3,z:1.3,duration:.6,delay:1+i*.6,ease:'back.out(3)'})});
 $$('.st').forEach((e,i)=>{e.classList.remove('lit');gsap.delayedCall(1+i*.6,()=>e.classList.add('lit'))});gsap.fromTo('.ln',{scaleX:0},{scaleX:1,duration:2.4,delay:1,ease:'none'})},
12(){M5.forEach((m,i)=>gsap.fromTo(m.position,{y:6},{y:-.95,duration:1.5,delay:1+i*.3,ease:'bounce.out'}));C12.forEach((c,i)=>pop(c,1.2+i*.25));pop(lg2,.4,2.4);
 gsap.to(cam,{pz:PO()?26:18,py:2.6,ly:2,duration:8,delay:2.6,ease:'power2.inOut'});
 const f=$('#fade');f.style.background='radial-gradient(circle at 50% 45%,#fff 0,#a9c9ff 14%,#0A3D91 55%,#000 100%)';gsap.to(f,{opacity:1,duration:3.5,delay:11.5,ease:'power2.in'})}};

/* ---------- Boucle de rendu ---------- */
const cam={sx:0,px:0,py:.6,pz:9.5,lx:-2.6,ly:.2,sw:1.1},Mo={x:0,y:0},ck=new THREE.Clock(),rc=new THREE.Raycaster();
addEventListener('pointermove',e=>{Mo.x=e.clientX/innerWidth*2-1;Mo.y=-(e.clientY/innerHeight*2-1)});
function loop(){
 requestAnimationFrame(loop);T=ck.getElapsedTime();
 const a=cam.sw*Math.sin(T*.35),ca=Math.cos(a),sa=Math.sin(a);
 C.position.set(cam.sx+cam.px*ca+cam.pz*sa+Mo.x*.7,cam.py+Mo.y*.45,-cam.px*sa+cam.pz*ca);
 C.lookAt(cam.sx+cam.lx*ca,cam.ly,-cam.lx*sa);C.updateMatrixWorld();
 rc.setFromCamera(Mo,C);const o=rc.ray.origin,d=rc.ray.direction;ml.position.copy(o).addScaledVector(d,9);
 pts.position.x=cam.sx*.85;const ox=o.x-pts.position.x,oy=o.y,oz=o.z;
 for(let i=0;i<PN*3;i+=3){const rx=pp[i]-ox,ry=pp[i+1]-oy,rz=pp[i+2]-oz,t=rx*d.x+ry*d.y+rz*d.z,ex=ox+d.x*t-pp[i],ey=oy+d.y*t-pp[i+1],ez=oz+d.z*t-pp[i+2],q=ex*ex+ey*ey+ez*ez,f=t>0&&q<12?.05*(1-q/12):0;
  pp[i]+=ex*f+(pb[i]-pp[i])*.012;pp[i+1]+=ey*f+(pb[i+1]-pp[i+1])*.012+Math.sin(T+i)*.0015;pp[i+2]+=ez*f+(pb[i+2]-pp[i+2])*.012}
 pg.attributes.position.needsUpdate=true;
 FL.forEach(f=>{f.m.position.y=f.b+Math.sin(T*f.s+f.o)*.6;f.m.rotation.x+=.004*f.s;f.m.rotation.y+=.006});
 glow.position.x=cam.sx;hero.rotation.y=T*.5;
 [lg,lg2].forEach((l,i)=>{l.userData.s.rotation.y=Math.sin(T*.7+i)*.8});
 rg.rotation.y=T*.35;p4.rotation.y=-T*.15;RC.forEach((c,i)=>{c.position.y=c.userData.y+Math.sin(T*1.3+i*1.6)*.2});
 C5[2].rotation.y=.7+Math.sin(T*.8)*.4;g5.rotation.y=Math.sin(T*.5)*.3;
 mc8.position.y=1.3+Math.sin(T*1.5)*.12;mc8.rotation.y=T*.7;h9.rotation.y=T*.6;
 CD.forEach((c,i)=>{const a=i/8*6.283+T*.25;c.position.set(10*W+Math.sin(a)*8,Math.sin(i*1.7+T*.5)*2.3,Math.cos(a)*2.5-3);c.rotation.y=Math.sin(a)*.6});
 C12.forEach((c,i)=>{c.rotation.y=T*.8+i*1.2});M4.concat(M5).forEach((m,i)=>{m.rotation.z=Math.sin(T*1.6+i)*.05});
 R.render(sc,C)}
function rs(){R.setSize(innerWidth,innerHeight);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();if(cur>=0)scrollTo(0,cur*innerHeight)}

/* ---------- Interface & navigation ---------- */
$('#deck').innerHTML=SL.map(s=>`<section class="s ${s.cls||''}" style="--a:${s.a}">${s.h}</section>`).join('');
const el=$$('.s'),menu=$('#menu');gsap.set(el,{autoAlpha:0});
menu.innerHTML=SL.map((s,i)=>`<a tabindex=0>${String(i+1).padStart(2,'0')} · ${s.t}</a>`).join('');
const jump=i=>scrollTo(0,Math.max(0,Math.min(N-1,i))*innerHeight);
$$('a',menu).forEach((a,i)=>{a.onclick=()=>{jump(i);menu.classList.remove('o')};a.onkeydown=e=>{if(e.key=='Enter')a.onclick()}});
function reveal(s){
 gsap.fromTo($$('.rv',s),{y:70,opacity:0,rotationX:-25,filter:'blur(14px)'},{y:0,opacity:1,rotationX:0,filter:'blur(0px)',duration:1.1,stagger:.12,ease:'power3.out',delay:.5,clearProps:'filter',overwrite:'auto'});
 gsap.fromTo($$('.g',s),{z:-400,rotationY:35},{z:0,rotationY:0,duration:1.4,stagger:.15,ease:'back.out(1.4)',delay:.5,overwrite:'auto'})}
function go(i){
 if(i===cur||i<0||i>=N)return;const old=cur,d=SL[i],k=d.cam,pt=PO();cur=i;gsap.killTweensOf('#fade');
 if(old>=0)gsap.to(el[old],{autoAlpha:0,duration:.45,overwrite:true});
 if(old===12)gsap.to('#fade',{opacity:0,duration:.8});
 gsap.to(cam,{sx:i*W,px:k[0],py:k[1],pz:k[2]*(pt?1.7:1),lx:pt?0:k[3],ly:k[4],sw:k[5],duration:old<0?4:2.2,ease:'power3.inOut',overwrite:true});
 const c0=new THREE.Color(d.bg),c1=L(d.bg);gsap.to(sc.background,{r:c0.r,g:c0.g,b:c0.b,duration:2});gsap.to(sc.fog.color,{r:c1.r,g:c1.g,b:c1.b,duration:2});
 gsap.to(rig.position,{x:i*W,duration:2.2,ease:'power3.inOut',overwrite:true});
 ml.color.set(d.a);document.documentElement.style.setProperty('--a',d.a);
 gsap.killTweensOf(el[i]);gsap.set(el[i],{autoAlpha:1});reveal(el[i]);if(E[i])E[i]();
 $('#cnt').textContent=String(i+1).padStart(2,'0')+' / '+N;gsap.to('#bar i',{width:(i+1)/N*100+'%',duration:.8});
 $$('a',menu).forEach((a,j)=>a.classList.toggle('on',j===i))}
const fs=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
$('#bp').onclick=()=>jump(cur-1);$('#bn').onclick=()=>jump(cur+1);$('#bf').onclick=fs;$('#bm').onclick=()=>menu.classList.toggle('o');
addEventListener('keydown',e=>{const k=e.key;
 if(['ArrowRight','ArrowDown','PageDown',' '].includes(k)){e.preventDefault();jump(cur+1)}
 else if(['ArrowLeft','ArrowUp','PageUp'].includes(k)){e.preventDefault();jump(cur-1)}
 else if(k=='Home')jump(0);else if(k=='End')jump(N-1);else if(k=='f'||k=='F')fs();
 else if(k=='m'||k=='M')menu.classList.toggle('o');else if(k=='Escape')menu.classList.remove('o')});
addEventListener('resize',rs);rs();
history.scrollRestoration='manual';scrollTo(0,0);
ScrollTrigger.create({trigger:'#proxy',start:'top top',end:'bottom bottom',snap:{snapTo:1/(N-1),duration:{min:.2,max:.6},delay:.05},onUpdate:s=>go(Math.round(s.progress*(N-1)))});
go(0);gsap.to('#fade',{opacity:0,duration:3.5,delay:.4,ease:'power2.out'});loop();