#!/usr/bin/env node
/* Build a content-level search index over all HTML pages under site/.
   Walks site/algorithm, site/system-design, site/leetcode-notes; strips
   scripts/styles/tags; splits body text into ~600-char chunks so search
   results can jump to the specific section instead of the whole page.
   Output: site/search-index.json  (compact, one array of docs).

   Run standalone:  node site/build-search-index.js
   Called from publish.sh before the S3 sync. */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE_DIR   = __dirname;
const OUT_FILE   = path.join(SITE_DIR, 'search-index.json');
const ROOTS      = ['algorithm', 'system-design', 'leetcode-notes', 'ai'];
const CHUNK_SIZE = 700;   // chars per snippet — big enough for context, small enough to be precise

/** Walk a folder recursively, yielding every .html file. */
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p, out);
    else if (name.toLowerCase().endsWith('.html')) out.push(p);
  }
  return out;
}

/** Best-effort HTML → plaintext. No DOM parser — just regex-strip. */
function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')     // SVG diagrams — noise for search
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html) {
  const t = html.match(/<title>([^<]+)<\/title>/i);
  if (t) return t[1].trim();
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1 ? extractText(h1[1]) : '(untitled)';
}

/** Split text into overlapping-free ~CHUNK_SIZE chunks on sentence boundaries. */
function chunk(text, size = CHUNK_SIZE) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + size, text.length);
    if (end < text.length) {
      // prefer to end on sentence/punctuation
      const dot = text.lastIndexOf('. ', end);
      if (dot > i + size / 2) end = dot + 1;
    }
    out.push(text.slice(i, end).trim());
    i = end;
  }
  return out;
}

const files = ROOTS.flatMap(r => walk(path.join(SITE_DIR, r)));
const docs = [];

for (const abs of files) {
  const rel = path.relative(SITE_DIR, abs).replace(/\\/g, '/');
  const html = fs.readFileSync(abs, 'utf8');
  const title = extractTitle(html);
  const body = extractText(html.replace(/<head[\s\S]*?<\/head>/i, ''));
  if (!body) continue;
  const chunks = chunk(body);
  chunks.forEach((c, idx) => {
    docs.push({ p: rel, t: title, i: idx, x: c });
  });
}

fs.writeFileSync(OUT_FILE, JSON.stringify(docs));
const sizeKB = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`Search index: ${docs.length} chunks from ${files.length} pages → ${sizeKB} KB`);
