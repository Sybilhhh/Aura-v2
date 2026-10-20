'use strict';
const config=window.AURA_CONTENT;
const labels={proactive:'主动服务',tool:'工具调用',grounding:'Grounding'};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 time:'<circle cx="100" cy="65" r="44"/><path d="M100 34V65L123 81M31 65H45M155 65H170"/>',
 tool:'<rect x="64" y="28" width="74" height="74" rx="12"/><path d="M80 65H120M100 45V85M25 65H50M152 65H177"/>',
 target:'<rect x="60" y="27" width="80" height="78" rx="8" stroke-dasharray="6 4"/><circle cx="100" cy="66" r="19"/><path d="M100 15V40M100 90V117M48 66H72M128 66H154"/>',
 market:'<path d="M32 29H49L65 87H145L162 43H54M78 43V85M104 43V85M131 43V85M58 63H152"/><circle cx="76" cy="107" r="7"/><circle cx="138" cy="107" r="7"/>',
 gallery:'<rect x="40" y="18" width="120" height="96" rx="3"/><rect x="50" y="28" width="100" height="76" rx="2"/><circle cx="119" cy="47" r="10"/><path d="M52 95L80 59L108 87L126 69L149 99"/>',
 coffee:'<path d="M54 58H133L123 108H65ZM133 65Q171 53 162 84Q157 97 127 91M64 35H125L114 56H75M79 18V26M100 13V26M118 18V26"/>',
 airport:'<path d="M98 15L105 55L161 85V95L106 77L110 108L126 118H75L90 108L94 77L39 95V85L94 55Z"/>',
 outfit:'<path d="M76 25Q100 43 124 25L156 45L140 73L124 65V113H76V65L60 73L44 45Z"/>',
 face:'<ellipse cx="100" cy="65" rx="39" ry="48"/><path d="M77 54H87M113 54H123M100 61L94 77H102M83 89Q100 102 118 88M58 17L51 9M143 18L153 9"/>'
};
function art(name){return `<svg viewBox="0 0 200 135" aria-hidden="true" fill="none" stroke="#587057" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.target}</svg>`;}
const resources=document.getElementById('resource-links');
for(const item of config.resources){const el=document.createElement(item.url?'a':'span');el.textContent=item.label;if(item.url){el.href=item.url;el.target='_blank';el.rel='noopener noreferrer';}else{const hint=document.createElement('small');hint.textContent='待发布';el.append(hint);}resources.append(el);}
const grid=document.getElementById('demo-grid');
grid.innerHTML=config.demos.map((d,i)=>`<article class="demo-card" data-id="${escapeHTML(d.id)}"><div class="demo-art" style="--card-bg:${d.color}"><span>${d.video?'产品实录':d.kind==='single'?'单项能力 · 实录待补充':'场景脚本 · 实录待补充'}</span>${art(d.art)}<b class="art-number">${String(i+1).padStart(2,'0')}</b></div><div class="demo-body"><h3>${escapeHTML(d.title)}</h3><div class="tags">${d.tags.map(t=>`<span>${labels[t]}</span>`).join('')}</div><p>${escapeHTML(d.desc)}</p><button data-demo="${escapeHTML(d.id)}">${d.video?'播放 Demo':'查看场景脚本'} <span aria-hidden="true">↗</span></button></div></article>`).join('');
function filterDemos(filter){document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});for(const d of config.demos){grid.querySelector(`[data-id="${d.id}"]`).hidden=!(filter==='all'||d.kind===filter||d.tags.includes(filter));}}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>filterDemos(b.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(a=>a.addEventListener('click',()=>filterDemos(a.dataset.filterLink)));
const dialog=document.getElementById('demo-dialog');
function closeDialog(){dialog.querySelectorAll('video').forEach(v=>v.pause());dialog.close();}
dialog.querySelector('.close').addEventListener('click',closeDialog);dialog.querySelector('.dialog-done').addEventListener('click',closeDialog);dialog.addEventListener('close',()=>dialog.querySelectorAll('video').forEach(v=>v.pause()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
grid.addEventListener('click',e=>{const b=e.target.closest('[data-demo]');if(!b)return;const d=config.demos.find(d=>d.id===b.dataset.demo);document.getElementById('dialog-title').textContent=d.title;document.getElementById('dialog-desc').textContent=d.desc;const area=document.getElementById('dialog-flow');area.replaceChildren();if(d.video){const video=document.createElement('video');video.controls=true;video.src=d.video;if(d.poster)video.poster=d.poster;area.append(video);}else d.steps.forEach((s,i)=>{const p=document.createElement('p');p.textContent=`0${i+1} / ${s}`;area.append(p);});dialog.querySelector('.eyebrow').textContent=d.video?'DEMO / 产品实录':'DEMO STORYBOARD · 实录待补充';dialog.querySelector('.fine').hidden=!!d.video;dialog.showModal();});
const states=[['持续观察','等待注水结束，再给出下一步提醒。','state: observing → waiting'],['关联目标','将当前步骤关联到画面中的滤杯。','grounding: current target → dripper'],['执行工具','示例：为下一阶段启动 30 秒计时器。','timer.start({ duration_seconds: 30 }) · 示例']];
document.querySelectorAll('[data-step]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.step==='0'));b.addEventListener('click',()=>{document.querySelectorAll('[data-step]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});const s=states[Number(b.dataset.step)];document.getElementById('scene-status').textContent=s[0];document.getElementById('scene-caption').textContent=s[1];document.getElementById('tool-trace').textContent=s[2];document.querySelector('.target-box').style.opacity=b.dataset.step==='0'?'.25':'1';});});
document.getElementById('data-legend').innerHTML=config.data.map(d=>`<div class="data-row"><i style="background:${d.color}"></i><div><strong>${escapeHTML(d.name)}</strong><p>${escapeHTML(d.detail)}</p></div><b>${d.percent}%</b></div>`).join('');
let running=0;document.querySelector('.donut').style.background=`conic-gradient(${config.data.map(d=>{const start=running;running+=d.percent;return `${d.color} ${start}% ${running}%`;}).join(',')})`;
document.getElementById('copy-citation').addEventListener('click',async()=>{const text=document.getElementById('citation').textContent;try{await navigator.clipboard.writeText(text);document.getElementById('copy-status').textContent='已复制引用模板；正式引用信息待确认。';}catch{const range=document.createRange();range.selectNodeContents(document.getElementById('citation'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);document.getElementById('copy-status').textContent='模板已选中，请按 Ctrl+C 或 Command+C 复制。';}});
document.querySelectorAll('.baseline video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause();})));
