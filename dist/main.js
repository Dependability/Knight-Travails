(()=>{"use strict";const e=class{constructor(e){this.positions=[...e]}};class t{constructor(e){this.location=e,this.KNIGHT_OFFSETS=[[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]]}possibleLocations(e){let t=[];return this.KNIGHT_OFFSETS.forEach((n=>{let s=[+e[0]+ +n[0],+e[1]+ +n[1]];t.push(s)})),t=t.filter((e=>!(e[0]>7||e[0]<0||e[1]<0||e[1]>7))),t}moveToLocation(t){if(t[0]<0||t[0]>7||t[1]<0||t[1]>7)return null;console.log("called");const n=[],s=new e([this.location]);let r;console.log(s),n.push(s);let a=0;for(;;){r=n.shift();const s=r.positions;if(+s[s.length-1][0]==+t[0]&&+s[s.length-1][1]==+t[1])break;this.possibleLocations(s[s.length-1]).forEach((t=>{const r=[].concat(s);r.push(t),n.push(new e(r))})),a++}return console.log(a),r}}let n,s,r,a="none";const c=document.querySelector(".knight"),i=document.querySelector(".knight-but"),o=document.querySelector(".end-but"),l=document.querySelector(".travail"),d=document.querySelector(".ghostknight"),u=document.querySelector(".ghostflag");function h(){i.classList.remove("selected"),o.classList.remove("selected"),l.classList.remove("selected"),d.classList.add("hidden"),u.classList.add("hidden")}function g(e){if("travailing"!=a)switch(a){case"selectKnight":h(),a="none",d.classList.add("hidden"),e.currentTarget.appendChild(c),c.classList.remove("hidden"),n=[+e.currentTarget.getAttribute("data-row"),+e.currentTarget.getAttribute("data-column")];break;case"selectSquare":h(),a="none",u.classList.add("hidden"),e.currentTarget.classList.add("target"),r&&r.classList.remove("target"),r=e.currentTarget,s=[+e.currentTarget.getAttribute("data-row"),+e.currentTarget.getAttribute("data-column")]}}function v(e){if("travailing"!=a)switch(a){case"selectKnight":e.currentTarget.appendChild(d),d.classList.remove("hidden");break;case"selectSquare":e.currentTarget.appendChild(u),u.classList.remove("hidden")}}function m(e){if("travailing"!=a)switch(a){case"selectKnight":e.currentTarget.removeChild(d),d.classList.add("hidden");break;case"selectSquare":e.currentTarget.removeChild(u),u.classList.add("hidden")}}i.addEventListener("click",(e=>{if("travailing"!==a){if("selectKnight"===a)return a="none",void h();h(),i.classList.add("selected"),a="selectKnight"}})),o.addEventListener("click",(e=>{if("travailing"!==a){if("selectSquare"===a)return a="none",void h();h(),o.classList.add("selected"),a="selectSquare"}})),l.addEventListener("click",(()=>{h(),l.classList.add("selected"),a="none",n&&s?function(){const e=new t(n).moveToLocation(s).positions;let r=0;a="travailing";let i=0,o=0,l=setInterval((()=>{if(r==e.length-1)return console.log("Final location"),n=s,clearInterval(l),a="none",c.style.transform="translate(0,0)",document.querySelector(`[data-row="${e[r][0]}"][data-column="${e[r][1]}"]`).appendChild(c),void h();console.log(e[r]),r++;const t=function(e,t,n,s){let r=window.innerWidth>650?75:56.25;const a=+t[0]-+e[0],i=+t[1]-+e[1];return c.style.transform=`translate(${s+ +i*r}px, ${n+ +a*r}px)`,[n+ +a*r,s+ +i*r]}(e[r-1],e[r],i,o);console.log(t),i=+t[0],o=+t[1]}),750)}():h()})),function(e){for(let t=0;t<8;t++)for(let n=0;n<8;n++){const s=document.createElement("div");s.classList.add("square"),(t%2==0&&n%2==1||t%2==1&&n%2==0)&&s.classList.add("black"),s.setAttribute("data-row",t),s.setAttribute("data-column",n),s.addEventListener("click",g),s.addEventListener("mouseleave",m),s.addEventListener("mouseenter",v),e.appendChild(s)}}(document.querySelector(".grid"))})();