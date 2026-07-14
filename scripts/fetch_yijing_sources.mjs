import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const HEXAGRAMS = [
  '乾','坤','屯','蒙','需','訟','師','比','小畜','履','泰','否','同人','大有','謙','豫',
  '隨','蠱','臨','觀','噬嗑','賁','剝','復','无妄','大畜','頤','大過','坎','離','咸','恒',
  '遯','大壯','晉','明夷','家人','睽','蹇','解','損','益','夬','姤','萃','升','困','井',
  '革','鼎','震','艮','漸','歸妹','豐','旅','巽','兌','渙','節','中孚','小過','既濟','未濟'
];

const API = 'https://zh.wikisource.org/w/api.php';
const delay = ms => new Promise(resolveDelay => setTimeout(resolveDelay, ms));

async function fetchWithBackoff(url, attempts = 5) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        headers: { 'User-Agent': 'bagua-local-research/1.0 (personal educational project)' }
      });
    } catch (error) {
      if (attempt === attempts) throw error;
      const waitMs = attempt * 8000;
      process.stdout.write(`network retry in ${Math.round(waitMs / 1000)}s\n`);
      await delay(waitMs);
      continue;
    }
    if (response.ok) return response;
    if (response.status !== 429 || attempt === attempts) return response;
    const waitMs = Math.max(Number(response.headers.get('retry-after') || 0) * 1000, attempt * 12000);
    process.stdout.write(`rate limited; retrying in ${Math.round(waitMs / 1000)}s\n`);
    await delay(waitMs);
  }
}

function clean(text = '') {
  return text
    .replace(/-\{([^{}]*)\}-/g, '$1')
    .replace(/\{\{\*\|([^{}]*)\}\}/g, '（$1）')
    .replace(/\{\{[^{}]*\}\}/g, '')
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/'{2,}/g, '')
    .replace(/^\*+#?\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function section(wikitext, start, end) {
  const from = wikitext.indexOf(start);
  if (from < 0) return '';
  const bodyStart = from + start.length;
  const to = end ? wikitext.indexOf(end, bodyStart) : -1;
  return wikitext.slice(bodyStart, to < 0 ? undefined : to);
}

function parsePage(name, order, wikitext) {
  const compositionMatch = wikitext.match(/\[\[(?:File|Image):[^\]]+\]\]\s*([^\s]+)下([^\s]+)上/);
  const symbolMatch = wikitext.match(/al(?:t|r)=([^\]|]+)/);
  const blue = wikitext.split('\n')
    .filter(line => line.includes('color:blue'))
    .map(line => clean(line))
    .filter(line => line && line !== '易經：');

  const guaLine = blue.shift() || '';
  let guaci = guaLine.replace(new RegExp(`^${name}[：:]`), '').trim();
  while (blue[0] && !/^(初[六九]|[六九][二三四五]|上[六九]|用[六九])[：:]/.test(blue[0])) {
    guaci += blue.shift();
  }
  const yaoci = blue.map((line, index) => {
    const split = line.match(/^([^：:]+)[：:]\s*(.*)$/);
    return {
      position: index + 1,
      label: split?.[1] || `第${index + 1}爻`,
      text: split?.[2] || line
    };
  });

  const tuanBlock = section(wikitext, "*'''彖曰：'''", "*'''象曰：'''");
  const xiangBlock = section(wikitext, "*'''象曰：'''", "*'''文言曰：'''");
  const tuan = tuanBlock.split('\n').map(clean).filter(Boolean).join('');
  const xiangLines = xiangBlock.split('\n').map(clean).filter(Boolean);

  return {
    order,
    name,
    symbol: symbolMatch?.[1] || '',
    lower: compositionMatch?.[1] || '',
    upper: compositionMatch?.[2] || '',
    guaci,
    tuan,
    daxiang: xiangLines[0] || '',
    yaoci,
    xiaoxiang: xiangLines.slice(1),
    interpretation: {
      core: '',
      situation: '',
      career: '',
      relationship: '',
      wealth: '',
      health: '',
      action: '',
      warning: ''
    },
    source: {
      title: `維基文庫《周易/${name}》`,
      url: `https://zh.wikisource.org/zh-hant/${encodeURIComponent(`周易/${name}`)}`,
      retrieved: new Date().toISOString().slice(0, 10)
    }
  };
}

const pagesByName = new Map();
for (let offset = 0; offset < HEXAGRAMS.length; offset += 50) {
  const names = HEXAGRAMS.slice(offset, offset + 50);
  const params = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    titles: names.map(name => `周易/${name}`).join('|'),
    format: 'json',
    formatversion: '2',
    origin: '*'
  });
  const response = await fetchWithBackoff(`${API}?${params}`);
  if (!response.ok) throw new Error(`batch ${offset / 50 + 1}: HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(`batch ${offset / 50 + 1}: ${payload.error.info}`);
  for (const page of payload.query.pages) {
    const name = page.title.replace(/^周易\//, '');
    const wikitext = page.revisions?.[0]?.slots?.main?.content;
    if (wikitext) pagesByName.set(name, wikitext);
  }
  process.stdout.write(`batch ${offset / 50 + 1}: ${names.length} pages\n`);
  await delay(2500);
}

const records = HEXAGRAMS.map((name, index) => {
  const wikitext = pagesByName.get(name);
  if (!wikitext) throw new Error(`missing page: ${name}`);
  return parsePage(name, index + 1, wikitext);
});

const output = {
  schemaVersion: 1,
  description: '六十四卦古籍原文底座；interpretation 字段留作本项目白话解卦补充。',
  primarySource: '維基文庫《周易》',
  primarySourceUrl: 'https://zh.wikisource.org/zh-hant/周易',
  generatedAt: new Date().toISOString(),
  hexagrams: records
};

const target = resolve(process.cwd(), 'data', 'yijing-64.json');
await writeFile(target, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`saved ${target}`);
