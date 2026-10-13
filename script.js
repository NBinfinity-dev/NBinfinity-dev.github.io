const projects=[
{t:"Météo du quartier",c:"app",k:"Application web",o:0,d:`Prévisions rue par rue, avec carte interactive et alertes de pluie.`,s:["JavaScript","API REST"]},
{t:"Atelier Brume",c:"site",k:"Site vitrine",o:60,d:`Site d'une céramiste : galerie photo, boutique simple et page contact.`,s:["HTML","CSS"]},
{t:"Suivi de dépenses",c:"app",k:"Application web",o:0,d:`Tableau de bord avec graphiques et filtres par mois.`,s:["JavaScript","Canvas"]},
{t:"Kit de composants",c:"ui",k:"Bibliothèque d'interface",o:120,d:`Boutons, formulaires et fenêtres modales accessibles et réutilisables.`,s:["CSS","ARIA"]}
];
const root=document.documentElement,list=document.getElementById("list"),count=document.getElementById("count"),
filters=document.getElementById("filters"),tb=document.getElementById("theme"),hue=document.getElementById("hue");
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const put=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
let cur="all";
function render(){
  const shown=projects.filter(p=>cur==="all"||p.c===cur);
  list.innerHTML=shown.map(p=>`<article class="proj" style="--off:${p.o}"><h3>${p.t}</h3><p class="kind">${p.k}</p><p>${p.d}</p><p class="tags">${p.s.map(s=>`<span>${s}</span>`).join("")}</p></article>`).join("");
  count.textContent=shown.length+" projet"+(shown.length>1?"s":"");
  filters.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===cur));
}
filters.addEventListener("click",e=>{const b=e.target.closest("button");if(b){cur=b.dataset.f;render()}});
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
const sync=()=>{tb.textContent=isDark()?"Mode clair":"Mode sombre"};
tb.addEventListener("click",()=>{const n=isDark()?"light":"dark";root.dataset.theme=n;put("theme",n);sync()});
hue.addEventListener("input",()=>{root.style.setProperty("--hue",hue.value);put("hue",hue.value)});
const th=get("theme"),hv=get("hue");
if(th)root.dataset.theme=th;
if(hv){hue.value=hv;root.style.setProperty("--hue",hv)}
sync();render();
const MAIL="kouadjonixon5@gmail.com",cp=document.getElementById("copy");
async function copyMail(){
  try{await navigator.clipboard.writeText(MAIL);return true}catch(e){}
  const t=document.createElement("textarea");t.value=MAIL;t.style.cssText="position:fixed;opacity:0";
  document.body.appendChild(t);t.select();
  let ok=false;try{ok=document.execCommand("copy")}catch(e){}
  t.remove();return ok;
}
cp.addEventListener("click",async()=>{
  cp.textContent=(await copyMail())?"Adresse copiée":"Copie impossible, sélectionne l'adresse";
  setTimeout(()=>{cp.textContent="Copier l'adresse"},2500);
});
