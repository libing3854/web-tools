import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dirs = {
  food: path.join(root, 'assets/food/illustrated'),
  brand: path.join(root, 'assets/brands'),
  egg: path.join(root, 'assets/eggs'),
};
Object.values(dirs).forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const esc = value => value.replace(/[&<>]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[c]));

function wrap({ title, subtitle, c1, c2, art, accent = '#ffd23f', lineArt = false }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720">
  <defs>
    <radialGradient id="bg" cx="48%" cy="38%" r="78%"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".38"/></filter>
  </defs>
  <rect width="960" height="720" fill="url(#bg)"/>
  <circle cx="128" cy="110" r="76" fill="#fff" opacity=".025"/><circle cx="850" cy="130" r="120" fill="#fff" opacity=".025"/>
  <path d="M0 570 Q240 520 480 565 T960 555 V720 H0Z" fill="#09070d" opacity=".28"/>
  <g filter="url(#shadow)" ${lineArt ? `fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"` : ''}>${art}</g>
  <g font-family="'Noto Sans SC','PingFang SC',sans-serif" text-anchor="middle">
    <text x="480" y="620" fill="${accent}" font-size="42" font-weight="800" letter-spacing="5">${esc(title)}</text>
    <text x="480" y="665" fill="#fff" opacity=".56" font-size="23" letter-spacing="2">${esc(subtitle)}</text>
  </g>
  <rect x="18" y="18" width="924" height="684" rx="30" fill="none" stroke="#fff" opacity=".05"/>
</svg>`;
}

const food = {
  roujiamo: { title:'肉夹馍', subtitle:'酥馍 · 腊汁肉', c1:'#6f321e', c2:'#1d1012', art:`
    <ellipse cx="480" cy="400" rx="275" ry="115" fill="#d38a3d"/>
    <path d="M225 395 Q480 145 735 395 Q480 330 225 395Z" fill="#f1bd69"/>
    <path d="M260 390 Q480 290 700 390 Q645 480 480 495 Q315 480 260 390Z" fill="#73361f"/>
    <g fill="#b76231"><circle cx="350" cy="390" r="34"/><circle cx="430" cy="414" r="39"/><circle cx="520" cy="386" r="42"/><circle cx="610" cy="410" r="35"/></g>
    <g fill="#65a84d"><path d="M315 350l42-28 20 52z"/><path d="M555 350l46-32 18 56z"/><path d="M448 348l38-30 19 55z"/></g>` },
  chaofan: { title:'炒饭', subtitle:'粒粒分明 · 锅气十足', c1:'#6a4817', c2:'#17120c', art:`
    <path d="M220 340 Q480 555 740 340 L680 520 Q480 620 280 520Z" fill="#273143"/>
    <ellipse cx="480" cy="350" rx="260" ry="120" fill="#e7b83e"/>
    <g fill="#fff0a6"><circle cx="330" cy="320" r="15"/><circle cx="390" cy="380" r="13"/><circle cx="470" cy="300" r="14"/><circle cx="560" cy="365" r="16"/><circle cx="635" cy="320" r="13"/></g>
    <g fill="#61a84d"><rect x="350" y="335" width="34" height="13" rx="6" transform="rotate(20 350 335)"/><rect x="520" y="315" width="38" height="14" rx="6" transform="rotate(-18 520 315)"/><rect x="600" y="385" width="32" height="13" rx="6"/></g>
    <g fill="#f28e45"><rect x="405" y="325" width="30" height="25" rx="7"/><rect x="550" y="400" width="32" height="24" rx="7"/></g>` },
  maocai: { title:'冒菜', subtitle:'一人食火锅', c1:'#742824', c2:'#1c0c12', art:`
    <path d="M215 335 Q480 585 745 335 L680 520 Q480 625 280 520Z" fill="#25212c"/>
    <ellipse cx="480" cy="345" rx="265" ry="130" fill="#b82e24"/>
    <g><circle cx="345" cy="330" r="54" fill="#6ab04c"/><circle cx="590" cy="322" r="52" fill="#73b45a"/><circle cx="475" cy="400" r="48" fill="#d9b66f"/><circle cx="420" cy="300" r="42" fill="#8b4f31"/><circle cx="535" cy="285" r="40" fill="#f0d398"/></g>
    <g fill="none" stroke="#f3d1a3" stroke-width="18" stroke-linecap="round"><path d="M285 385q55-55 110 0"/><path d="M555 405q55-60 115-5"/></g>
    <g fill="#efc84b"><circle cx="380" cy="365" r="9"/><circle cx="525" cy="350" r="9"/><circle cx="620" cy="365" r="9"/></g>` },
  light_salad: { title:'轻食沙拉', subtitle:'清爽 · 低负担', c1:'#285c46', c2:'#101b18', art:`
    <path d="M220 345 Q480 600 740 345 L680 520 Q480 620 280 520Z" fill="#e8e1d3"/>
    <g><circle cx="350" cy="340" r="78" fill="#62ae58"/><circle cx="500" cy="320" r="90" fill="#7bc565"/><circle cx="620" cy="365" r="70" fill="#519e55"/></g>
    <g fill="#e84e47"><circle cx="360" cy="400" r="34"/><circle cx="565" cy="390" r="36"/></g>
    <g fill="#f2d06b"><circle cx="455" cy="410" r="42"/><circle cx="455" cy="410" r="20" fill="#f7a928"/></g>
    <g fill="#d5a56b"><rect x="300" y="305" width="85" height="42" rx="15" transform="rotate(-18 300 305)"/><rect x="540" y="290" width="90" height="42" rx="15" transform="rotate(16 540 290)"/></g>` },
  curry_rice: { title:'咖喱饭', subtitle:'浓郁 · 暖胃', c1:'#6b4c16', c2:'#1b130b', art:`
    <ellipse cx="480" cy="420" rx="290" ry="145" fill="#eee5d2"/>
    <path d="M215 410 Q340 250 500 350 Q570 405 540 515 Q320 555 215 410Z" fill="#fff8e8"/>
    <path d="M485 330 Q695 300 745 430 Q690 550 500 520 Q565 425 485 330Z" fill="#bd7628"/>
    <g fill="#e5ad48"><rect x="560" y="365" width="70" height="58" rx="14"/><rect x="625" y="430" width="68" height="55" rx="14"/></g>
    <g fill="#8f512a"><rect x="535" y="450" width="72" height="53" rx="15"/><rect x="650" y="350" width="58" height="52" rx="14"/></g>` },
  pidan_zhou: { title:'皮蛋瘦肉粥', subtitle:'绵软 · 温暖', c1:'#3e4a43', c2:'#101412', art:`
    <path d="M220 335 Q480 585 740 335 L680 520 Q480 620 280 520Z" fill="#d7d1c4"/>
    <ellipse cx="480" cy="340" rx="260" ry="120" fill="#f2ead8"/>
    <g fill="#3d4b3d"><path d="M325 315l72-25 45 48-76 40z"/><path d="M545 300l72 28-18 62-78-30z"/></g>
    <g fill="#ba7858"><rect x="410" y="350" width="75" height="28" rx="12" transform="rotate(15 410 350)"/><rect x="505" y="385" width="78" height="28" rx="12" transform="rotate(-15 505 385)"/></g>
    <g stroke="#6aa957" stroke-width="12" stroke-linecap="round"><path d="M355 405l30-16"/><path d="M575 348l31-18"/><path d="M465 285l25-18"/></g>` },
  suancaiyu: { title:'酸菜鱼', subtitle:'酸辣开胃 · 鱼片嫩滑', c1:'#5c5a22', c2:'#14150d', art:`
    <path d="M200 330 Q480 590 760 330 L690 530 Q480 635 270 530Z" fill="#2b3334"/>
    <ellipse cx="480" cy="340" rx="280" ry="132" fill="#d5b847"/>
    <g fill="#f6eee0"><path d="M275 345q85-95 170 0q-85 65-170 0z"/><path d="M430 295q90-85 175 10q-90 60-175-10z"/><path d="M510 390q85-90 170 0q-85 65-170 0z"/></g>
    <g fill="#657b3e"><path d="M330 410q35-80 70 0z"/><path d="M575 310q35-80 70 0z"/></g>
    <g fill="#d84035"><circle cx="390" cy="315" r="13"/><circle cx="560" cy="360" r="13"/><circle cx="650" cy="330" r="13"/></g>` },
  jigongbao: { title:'鸡公煲', subtitle:'浓香酱汁 · 越炖越入味', c1:'#6b2f1e', c2:'#1b0f0d', art:`
    <path d="M205 350 Q480 610 755 350 L690 545 Q480 650 270 545Z" fill="#2c2523"/>
    <ellipse cx="480" cy="355" rx="275" ry="138" fill="#8e3f25"/>
    <g fill="#c77a3d"><circle cx="335" cy="340" r="62"/><circle cx="465" cy="305" r="66"/><circle cx="585" cy="365" r="70"/><circle cx="440" cy="420" r="58"/></g>
    <g fill="#7aae4d"><circle cx="320" cy="420" r="34"/><circle cx="620" cy="300" r="38"/></g>
    <g fill="#d9b254"><rect x="520" y="410" width="80" height="48" rx="12"/><rect x="365" y="275" width="60" height="44" rx="12"/></g>` },
  bibimbap: { title:'韩式拌饭', subtitle:'蔬菜肉蛋 · 一碗拌开', c1:'#4c3b28', c2:'#14100d', art:`
    <path d="M210 340 Q480 600 750 340 L685 535 Q480 635 275 535Z" fill="#24272c"/>
    <ellipse cx="480" cy="345" rx="270" ry="132" fill="#f2e8d2"/>
    <path d="M480 345L305 275A190 115 0 0 0 270 365Z" fill="#72a64b"/><path d="M480 345L390 235A190 115 0 0 0 305 275Z" fill="#d47b35"/>
    <path d="M480 345L575 245A190 115 0 0 0 390 235Z" fill="#8b5637"/><path d="M480 345L690 320A190 115 0 0 0 575 245Z" fill="#c94b40"/>
    <path d="M480 345L270 365A190 115 0 0 0 690 320Z" fill="#efd86a"/>
    <circle cx="480" cy="345" r="76" fill="#fff7dd"/><circle cx="480" cy="345" r="37" fill="#f3a51f"/>` },
  omurice: { title:'蛋包饭', subtitle:'软嫩蛋皮 · 热乎炒饭', c1:'#70491d', c2:'#18100c', art:`
    <ellipse cx="480" cy="440" rx="300" ry="135" fill="#ede8dd"/>
    <path d="M255 410 Q300 250 480 245 Q660 250 705 410 Q650 520 480 535 Q310 520 255 410Z" fill="#efbd39"/>
    <path d="M320 405 Q480 300 640 405" fill="none" stroke="#c94435" stroke-width="24" stroke-linecap="round"/>
    <path d="M385 365q95-75 190 0" fill="none" stroke="#d76e32" stroke-width="15" stroke-linecap="round"/>` },
  kaoyu: { title:'烤鱼', subtitle:'焦香鱼皮 · 香辣配菜', c1:'#63271f', c2:'#170d0c', art:`
    <rect x="170" y="240" width="620" height="315" rx="80" fill="#26252a"/>
    <path d="M285 390 Q430 210 625 330 Q680 365 700 390 Q620 510 430 485 Q330 470 285 390Z" fill="#c67b42"/>
    <path d="M285 390L215 315L220 465Z" fill="#b96837"/><circle cx="630" cy="365" r="13" fill="#16131a"/>
    <g stroke="#6e321e" stroke-width="13"><path d="M360 315l-20 145"/><path d="M430 285l-18 190"/><path d="M505 290l-15 188"/></g>
    <g fill="#d94435"><circle cx="265" cy="285" r="23"/><circle cx="720" cy="470" r="25"/></g>
    <g fill="#7ca34d"><circle cx="250" cy="500" r="30"/><circle cx="690" cy="290" r="34"/></g>` },
};

for (const [name, spec] of Object.entries(food)) {
  fs.writeFileSync(path.join(dirs.food, `${name}.svg`), wrap(spec));
}

const brands = {
  wallace:{ title:'华莱士', subtitle:'汉堡 · 炸鸡 · 小食', c1:'#6b2020', c2:'#190d12', accent:'#ffd05a', art:`<path d="M330 285q150-105 300 0M305 365h350M330 445q150 92 300 0"/><path d="M360 325h240M350 405h260"/>` },
  csc:{ title:'乡村基', subtitle:'中式米饭快餐', c1:'#4b2461', c2:'#150d1e', accent:'#f1c8ff', art:`<rect x="300" y="250" width="360" height="250" rx="40"/><path d="M480 250v250M300 365h360"/><path d="M375 305q45 45 90 0M520 420q45-55 90 0"/>` },
  micun:{ title:'米村拌饭', subtitle:'热菜 · 米饭 · 拌一碗', c1:'#7a2b26', c2:'#1e0e10', accent:'#ffe1a0', art:`<path d="M280 325q200-160 400 0M250 340q230 270 460 0"/><circle cx="480" cy="320" r="70"/><path d="M410 320h140M480 250v140"/>` },
  kfc:{ title:'肯德基', subtitle:'炸鸡 · 汉堡 · 小食', c1:'#7c1f28', c2:'#1d0d12', accent:'#fff4df', art:`<path d="M330 245h300l-35 270H365z"/><path d="M360 300h240M390 245q90-100 180 0"/><path d="M415 385q65-70 130 0q-65 95-130 0z"/>` },
  mcd:{ title:'麦当劳', subtitle:'汉堡 · 薯条 · 饮料', c1:'#7a251e', c2:'#1c0e0c', accent:'#ffd43b', art:`<path d="M325 485q35-250 155-250q120 0 155 250M325 485q25-180 90-180q65 0 65 180M480 485q0-180 65-180q65 0 90 180"/>` },
  lxj:{ title:'老乡鸡', subtitle:'家常菜 · 热汤 · 米饭', c1:'#27573d', c2:'#0f1a14', accent:'#f2d27a', art:`<path d="M350 430q-20-160 130-180q155 35 120 190q-90 85-250-10z"/><circle cx="555" cy="290" r="20"/><path d="M570 300l65 25-60 20M405 430q75 70 150 0"/>` },
  tastien:{ title:'塔斯汀', subtitle:'中国汉堡 · 现烤面饼', c1:'#7a341d', c2:'#1d100d', accent:'#ffca72', art:`<path d="M300 325q180-170 360 0M280 360h400M305 445q175 90 350 0"/><path d="M345 400q60-55 120 0q60 55 120 0"/>` },
  burgerking:{ title:'汉堡王', subtitle:'火烤汉堡 · 肉感满足', c1:'#5c2817', c2:'#17100d', accent:'#ffb742', art:`<path d="M330 245l55 55 95-85 95 85 55-55-30 120H360z"/><path d="M300 405q180-120 360 0M285 440h390M315 505q165 80 330 0"/>` },
};

for (const [name, spec] of Object.entries(brands)) {
  fs.writeFileSync(path.join(dirs.brand, `${name}.svg`), wrap({ ...spec, lineArt:true }));
}

const eggs = {
  steal:{ title:'偷吃他人外卖', subtitle:'伸手之前，先看看失主', c1:'#542036', c2:'#140c17', accent:'#ff6b8a', art:`
    <path d="M330 310h300l35 235H295z" fill="#e8b86a"/><path d="M380 310q0-105 100-105t100 105" fill="none" stroke="#ffe0a1" stroke-width="22"/>
    <path d="M170 410q100-35 170 20l90 70-80 70-110-70-90-15z" fill="#7764d8"/><circle cx="535" cy="405" r="70" fill="#fff" opacity=".13"/>
    <path d="M515 365l45 38-45 38" fill="none" stroke="#ff6b8a" stroke-width="18" stroke-linecap="round"/>` },
  fasting:{ title:'今天不吃', subtitle:'空盘正在等待你反悔', c1:'#23534e', c2:'#0d1718', accent:'#67ddd0', art:`
    <ellipse cx="480" cy="390" rx="245" ry="145" fill="#dfe8e5"/><ellipse cx="480" cy="390" rx="155" ry="80" fill="#b9cbc7"/>
    <path d="M300 220l360 340" stroke="#ff5c70" stroke-width="38" stroke-linecap="round"/><path d="M660 220L300 560" stroke="#ff5c70" stroke-width="38" stroke-linecap="round"/>` },
  indulge:{ title:'今天放纵', subtitle:'热量休假 · 快乐加倍', c1:'#672341', c2:'#180d18', accent:'#ffcc66', art:`
    <path d="M350 300h260l45 245H305z" fill="#f6d273"/><path d="M330 300q150-150 300 0" fill="#ff8cad"/>
    <path d="M480 190v85" stroke="#fff" stroke-width="18"/><circle cx="480" cy="175" r="24" fill="#ffcf3c"/>
    <g fill="#8d5ce8"><circle cx="280" cy="250" r="20"/><circle cx="690" cy="310" r="18"/></g><g fill="#55d3bd"><rect x="230" y="390" width="35" height="18" transform="rotate(30 230 390)"/><rect x="690" y="430" width="38" height="18" transform="rotate(-25 690 430)"/></g>` },
  mythic:{ title:'食神之选', subtitle:'全图鉴的终极奖励', c1:'#6d4618', c2:'#1b1010', accent:'#ffd95a', art:`
    <ellipse cx="480" cy="470" rx="270" ry="85" fill="#e7b53d"/><ellipse cx="480" cy="450" rx="210" ry="55" fill="#fff3c8"/>
    <path d="M360 340q-70-120 55-145q65-105 130 0q125 25 55 145z" fill="#fff7df"/>
    <path d="M385 340h190v115H385z" fill="#f5e7c4"/><g fill="#ffd95a"><circle cx="260" cy="240" r="13"/><circle cx="700" cy="210" r="17"/><circle cx="745" cy="390" r="11"/></g>` },
};

for (const [name, spec] of Object.entries(eggs)) {
  fs.writeFileSync(path.join(dirs.egg, `${name}.svg`), wrap(spec));
}

console.log(`generated ${Object.keys(food).length} food, ${Object.keys(brands).length} brand, ${Object.keys(eggs).length} egg illustrations`);
