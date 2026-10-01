/* Shared left-hand site navigation for the Study Hub.
   Each content page includes this once, with a relative src that encodes its
   depth to the site root, e.g.:
       <script src="../../nav.js"></script>   (algorithm/<x>/ , system-design/<x>/)
       <script src="../nav.js"></script>       (leetcode-notes/)
   The script reads its own src to derive the prefix to root, injects the
   sidebar CSS + markup, and highlights the current page. Add new pages by
   editing the TREE below — every page picks it up automatically. */
(function () {
  var s = document.currentScript;
  var prefix = (s && s.getAttribute('src') || '').replace(/nav\.js.*$/, '');

  // Site structure (paths are relative to the site root).
  var TREE = [
    { items: [['🗒️ LeetCode Notes', 'leetcode-notes/index.html']] },
    { head: '🤖 AI', items: [
      ['Prompt LLMs Reliably (Session 1)', 'ai/prompt-llms-reliably/index.html'],
      ['Agent Design Patterns (ReAct, HITL, CoT…)', 'ai/agent-patterns/index.html']
    ]},
    { head: '🧑 Personal', items: [
      ['Professional Communication Coach', 'personal/communication-coach/index.html']
    ]},
    { head: '⚙️ Algorithm', items: [
      ['Big O Notation', 'algorithm/big-o-notation/index.html'],
      ['Greedy', 'algorithm/greedy/index.html'],
      ['Bloom Filter', 'algorithm/bloom-filter/index.html'],
      ['H-Index', 'algorithm/h-index/index.html'],
      ['Product of Array Except Self', 'algorithm/product-of-array-except-self/index.html'],
      ['Dynamic Programming', 'algorithm/dynamic-programming/index.html'],
      ['Linked List', 'algorithm/linked-list/index.html'],
      ['Heap & Priority Queue', 'algorithm/heap-priority-queue/index.html']
    ]},
    { head: '🏗️ System Design', items: [
      ['⚡ Quick Bites (Revision)', 'system-design/quick-bites/index.html'],
      ['News Feed (Twitter/FB)', 'system-design/news-feed/index.html'],
      ['Instagram', 'system-design/instagram/index.html'],
      ['URL Shortener', 'system-design/url-shortener/index.html'],
      ['Amazon S3 Internals', 'system-design/s3-object-storage/index.html'],
      ['Distributed File System', 'system-design/distributed-file-system/index.html'],
      ['JWT & Login Flow', 'system-design/jwt-auth-login/index.html'],
      ['Browser Security in 3-Tier (SOP/CORS/CSRF/XSS/CSP)', 'system-design/browser-security-3tier/index.html'],
      ['Concurrency & Parallelism', 'system-design/concurrency-parallelism/index.html'],
      ['Angular → .NET Core Request Flow', 'system-design/angular-dotnet-request-flow/index.html'],
      ['Samsung Lambda Streaming (Case Study)', 'system-design/samsung-lambda-streaming/index.html'],
      ['DB Performance Scaling Ladder', 'system-design/database-performance-scaling/index.html'],
      ['Saga Pattern (Richardson/Newman)', 'system-design/saga-pattern/index.html'],
      ['SQL Server vs PostgreSQL', 'system-design/sqlserver-vs-postgres/index.html'],
      ['RPC — When to use, when not', 'system-design/rpc-when-to-use/index.html'],
      ['SNS & SQS Internals', 'system-design/sns-sqs-internals/index.html'],
      ['CAP Theorem & PACELC', 'system-design/cap-theorem/index.html'],
      ['2PC & 3PC Commit', 'system-design/two-phase-commit/index.html'],
      ['Consensus: Raft & Paxos', 'system-design/consensus-raft-paxos/index.html'],
      ['Consistency Models', 'system-design/consistency-models/index.html'],
      ['How DynamoDB Works', 'system-design/dynamodb-design/index.html'],
      ['Dynamo Paper: Consistent Hashing & NWR', 'system-design/dynamo-consistent-hashing-nwr/index.html'],
      ['Music Streaming (Spotify)', 'system-design/music-streaming/index.html'],
      ['DB Sharding & Partitioning', 'system-design/partitioning-sharding/index.html'],
      ['Web Crawler', 'system-design/web-crawler/index.html'],
      ['Transactional Outbox', 'system-design/outbox-pattern/index.html'],
      ['How Git Works Internally', 'system-design/git-internals/index.html'],
      ['Meta TAO (Social Graph)', 'system-design/meta-tao-social-graph/index.html'],
      ['Rate Limiter', 'system-design/rate-limiter/index.html'],
      ['Amazon MSK (Kafka)', 'system-design/amazon-msk-kafka/index.html'],
      ['AWS API Gateway', 'system-design/aws-api-gateway/index.html'],
      ['AWS Lambda Internals', 'system-design/aws-lambda-internals/index.html'],
      ['Redis Concurrency', 'system-design/redis-concurrency/index.html'],
      ['Redis Architecture & Purpose', 'system-design/redis-architecture/index.html'],
      ['Redis Distributed Lock (Nightly Job)', 'system-design/redis-distributed-lock/index.html'],
      ['DAU with HyperLogLog (Instagram-scale)', 'system-design/dau-hyperloglog/index.html'],
      ['Locking & Concurrency Control (all mechanisms)', 'system-design/locking-concurrency-control/index.html'],
      ['Redis Distributed Rate Limiter (interview:)', 'system-design/redis-distributed-rate-limiter/index.html'],
      ['Distributed Cache', 'system-design/distributed-cache/index.html'],
      ['Database Bottleneck', 'system-design/database-bottleneck/index.html'],
      ['Database Indexes', 'system-design/database-indexes/index.html'],
      ['Indexes on Partitioned/Sharded Data', 'system-design/indexes-partitioned-sharded/index.html'],
      ['Consistent Hashing', 'system-design/consistent-hashing/index.html'],
      ['Amazon Shopping (E-commerce)', 'system-design/amazon-shopping/index.html'],
      ['Uber (Ride-Sharing)', 'system-design/uber-ride-sharing/index.html'],
      ['WhatsApp / Chat System', 'system-design/whatsapp-chat/index.html'],
      ['YouTube (Video Streaming)', 'system-design/youtube-video-streaming/index.html'],
      ['JioCinema (IPL Live Stream)', 'system-design/jiocinema-ipl-live/index.html'],
      ['Retry Storm Protection', 'system-design/retry-storm-protection/index.html'],
      ['Notification System', 'system-design/notification-system/index.html'],
      ['Webhooks & EventBridge', 'system-design/webhooks-eventbridge/index.html'],
      ['Stripe Zero-Downtime Migration', 'system-design/stripe-zero-downtime-migration/index.html'],
      ['Load Balancer', 'system-design/load-balancer/index.html'],
      ['VPC Networking (NACL/SG/IGW)', 'system-design/vpc-networking/index.html'],
      ['Networking Fundamentals (OSI/TCP/DNS)', 'system-design/networking-fundamentals/index.html'],
      ['DNS: UDP vs TCP', 'system-design/dns-udp-tcp/index.html'],
      ['Request Flow: DNS → CDN → WAF → LB → App', 'system-design/request-flow-dns-cdn-waf/index.html'],
      ['TLS Handshake Across Hops', 'system-design/tls-handshake-hops/index.html'],
      ['Digital Payment System (Stripe/UPI)', 'system-design/digital-payment-system/index.html'],
      ['ZooKeeper & Watches (reactive updates)', 'system-design/zookeeper-watches/index.html'],
      ['Vertical Partitioning (Vitess/ZK/binlog)', 'system-design/vertical-partitioning/index.html'],
      ['Microservices Patterns (8)', 'system-design/microservices-patterns/index.html'],
      ['Principal/Architect Interview', 'system-design/principal-architect-interview/index.html'],
      ['Multi-Tenancy (SaaS)', 'system-design/multi-tenancy/index.html'],
      ['AWS Networking (PrivateLink/DX)', 'system-design/aws-privatelink-directconnect/index.html'],
      ['SQL Pipe Syntax', 'system-design/sql-pipe-syntax/index.html'],
      ['Decipher Repeated-Key XOR', 'system-design/decipher-repeated-key-xor/index.html'],
      ['.NET Memory Leaks (Production)', 'system-design/dotnet-memory-leaks/index.html']
    ]}
  ];

  // Apply saved theme immediately to avoid a flash of light content.
  var THEME_KEY = 'studyhub.theme';
  var savedTheme = 'light';
  try { savedTheme = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) {}
  document.documentElement.setAttribute('data-theme', savedTheme);

  var css = ''
    /* --- Dark mode overrides. All pages define these CSS vars in :root; we override them here. --- */
    + 'html[data-theme="dark"]{'
    +   '--bg:#0f1420;--card:#1a2340;--ink:#e7ecf3;--muted:#a0aec0;--line:#2a3652;'
    +   '--scenario-bg:rgba(247,86,124,.14);--reqs-bg:rgba(244,162,89,.14);'
    +   '--arch-bg:rgba(67,97,238,.16);--anim-bg:rgba(0,180,216,.14);'
    +   '--dsa-bg:rgba(112,72,232,.18);--aws-bg:rgba(255,153,0,.14);'
    +   '--laymen-bg:rgba(255,209,102,.14);--scenario-bg:rgba(247,86,124,.14);'
    +   '--pg-bg:rgba(51,103,145,.22);--sqlserver-bg:rgba(204,41,39,.18);}'
    + 'html[data-theme="dark"] body{background:#0f1420;color:#e7ecf3}'
    + 'html[data-theme="dark"] section.card{background:#1a2340;border-color:#2a3652}'
    + 'html[data-theme="dark"] section.scenario,html[data-theme="dark"] section.reqs,'
    + 'html[data-theme="dark"] section.arch,html[data-theme="dark"] section.anim-sec,'
    + 'html[data-theme="dark"] section.dsa,html[data-theme="dark"] section.aws,'
    + 'html[data-theme="dark"] section.laymen,html[data-theme="dark"] section.faq{color:#e7ecf3}'
    + 'html[data-theme="dark"] nav.toc{background:#1a2340;border-color:#2a3652}'
    + 'html[data-theme="dark"] nav.toc a{color:#a0aec0}'
    + 'html[data-theme="dark"] nav.toc a:hover{background:#2a3652;color:#e7ecf3}'
    + 'html[data-theme="dark"] table th{background:rgba(67,97,238,.24);color:#e7ecf3}'
    + 'html[data-theme="dark"] th,html[data-theme="dark"] td{border-color:#2a3652}'
    + 'html[data-theme="dark"] code:not(pre code){background:#2a3652;color:#e7ecf3}'
    + 'html[data-theme="dark"] .box,html[data-theme="dark"] .callout,html[data-theme="dark"] .rung,'
    + 'html[data-theme="dark"] .faq-item,html[data-theme="dark"] .qa{background:#1a2340;border-color:#2a3652;color:#e7ecf3}'
    + 'html[data-theme="dark"] .box.pros,html[data-theme="dark"] .callout.good,html[data-theme="dark"] .box.use{background:rgba(45,198,83,.16)}'
    + 'html[data-theme="dark"] .box.cons,html[data-theme="dark"] .callout.warn,html[data-theme="dark"] .box.avoid{background:rgba(247,86,124,.16)}'
    + 'html[data-theme="dark"] .pg-card{background:rgba(51,103,145,.22)}'
    + 'html[data-theme="dark"] .ss-card{background:rgba(204,41,39,.18)}'
    + 'html[data-theme="dark"] .metric{background:#0b1020}'
    + 'html[data-theme="dark"] .qa .a{color:#a0aec0}'
    + 'html[data-theme="dark"] h1,html[data-theme="dark"] h2,html[data-theme="dark"] h3,html[data-theme="dark"] h4{color:#e7ecf3}'
    + 'html[data-theme="dark"] p,html[data-theme="dark"] li{color:#d5dbe6}'
    /* Theme toggle button — floating pill top-right */
    + '.theme-toggle{position:fixed;top:14px;right:14px;z-index:70;width:44px;height:44px;border-radius:22px;'
    + 'background:#0f1420;color:#ffd166;display:flex;align-items:center;justify-content:center;cursor:pointer;'
    + 'font-size:1.2rem;box-shadow:0 4px 14px rgba(0,0,0,.25);border:0;transition:transform .15s,filter .15s;user-select:none}'
    + '.theme-toggle:hover{filter:brightness(1.15);transform:scale(1.05)}'
    + '.theme-toggle:active{transform:scale(.95)}'
    + 'html[data-theme="dark"] .theme-toggle{background:#e7ecf3;color:#4361ee}'
    + '.snav-cb{position:fixed;opacity:0;pointer-events:none}'
    + '.snav-btn{position:fixed;top:14px;left:14px;z-index:60;width:42px;height:42px;border-radius:10px;'
    + 'background:#0f1420;color:#fff;display:none;align-items:center;justify-content:center;cursor:pointer;'
    + 'font-size:1.25rem;box-shadow:0 4px 14px rgba(0,0,0,.25)}'
    + '.sitenav{position:fixed;top:0;left:0;width:240px;height:100vh;overflow-y:auto;background:#0f1420;'
    + 'color:#c6d0e0;padding:22px 16px;z-index:55;box-shadow:2px 0 18px rgba(0,0,0,.14);'
    + "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}"
    + '.sitenav-home{display:block;font-weight:800;font-size:1.02rem;color:#fff;text-decoration:none;'
    + 'margin-bottom:18px;padding:10px 12px;border-radius:10px;background:linear-gradient(135deg,#4361ee,#7048e8)}'
    + '.sitenav-home:hover{filter:brightness(1.08)}'
    + '.sitenav-group{margin-bottom:14px}'
    + '.sitenav-head{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:#7f8aa0;font-weight:700;'
    + 'margin:0 0 6px 0;padding:4px 12px;display:flex;align-items:center;gap:7px;cursor:pointer;'
    + 'border-radius:8px;user-select:none;-webkit-user-select:none;border:0;background:none;width:100%;text-align:left;'
    + "font-family:inherit}"
    + '.sitenav-head:hover{background:#1b2940;color:#c6d0e0}'
    + '.sitenav-caret{display:inline-block;font-size:.6rem;transition:transform .18s ease;color:#5b6677}'
    + '.sitenav-count{margin-left:auto;font-size:.62rem;background:#1b2940;color:#7f8aa0;border-radius:999px;padding:1px 7px;font-weight:700}'
    + '.sitenav-items{overflow:hidden;transition:max-height .22s ease}'
    + '.sitenav-group.collapsed .sitenav-caret{transform:rotate(-90deg)}'
    + '.sitenav-group.collapsed .sitenav-items{max-height:0!important}'
    + '.sitenav .navlink{display:block;color:#c6d0e0;text-decoration:none;font-size:.87rem;padding:7px 12px;'
    + 'border-radius:8px;margin:2px 0;border-left:3px solid transparent}'
    + '.sitenav .navlink:hover{background:#1b2940;color:#fff}'
    + '.sitenav .navlink.active{background:#1b2940;color:#fff;border-left-color:#00b4d8;font-weight:700}'
    + 'body{padding-left:240px}'
    + '@media (max-width:1099px){body{padding-left:0}.snav-btn{display:flex}'
    + '.sitenav{transform:translateX(-100%);transition:transform .22s ease}'
    + '.snav-cb:checked ~ .sitenav{transform:translateX(0)}}'
    /* --- Content-level search: input in sidebar + full-page results overlay. --- */
    + '.sitesearch{position:relative;margin:0 0 14px}'
    + '.sitesearch input{width:100%;padding:9px 32px 9px 32px;border-radius:10px;border:1px solid #2a3652;'
    + 'background:#1b2940;color:#e7ecf3;font:600 .85rem inherit;outline:0;transition:border-color .15s}'
    + '.sitesearch input:focus{border-color:#00b4d8}'
    + '.sitesearch input::placeholder{color:#7f8aa0}'
    + '.sitesearch .ss-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#7f8aa0;font-size:.9rem;pointer-events:none}'
    + '.sitesearch .ss-clear{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:22px;height:22px;'
    + 'border-radius:50%;background:transparent;color:#7f8aa0;border:0;cursor:pointer;font-size:1rem;line-height:1;display:none}'
    + '.sitesearch .ss-clear:hover{color:#e7ecf3;background:#2a3652}'
    + '.sitesearch input:not(:placeholder-shown) + .ss-ico + .ss-clear{display:block}'
    + '.ss-overlay{position:fixed;top:0;right:0;bottom:0;left:240px;background:rgba(15,20,32,.72);'
    + 'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:80;display:none;overflow-y:auto;padding:32px 24px}'
    + '@media (max-width:1099px){.ss-overlay{left:0}}'
    + '.ss-overlay.on{display:block}'
    + '.ss-panel{max-width:820px;margin:0 auto;background:var(--card,#fff);color:var(--ink,#1b2230);'
    + 'border-radius:14px;padding:22px 26px;box-shadow:0 20px 60px rgba(0,0,0,.35)}'
    + 'html[data-theme="dark"] .ss-panel{background:#1a2340;color:#e7ecf3}'
    + '.ss-panel-head{display:flex;align-items:baseline;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--line,#e6eaf0)}'
    + 'html[data-theme="dark"] .ss-panel-head{border-color:#2a3652}'
    + '.ss-panel-head h3{margin:0;font-size:1.05rem}'
    + '.ss-panel-head .ss-count{color:var(--muted,#5b6677);font-size:.85rem;margin-left:auto}'
    + '.ss-panel-head .ss-close{border:0;background:#f7567c;color:#fff;border-radius:8px;padding:6px 12px;'
    + 'font-weight:700;cursor:pointer;font-size:.8rem}'
    + '.ss-hit{padding:12px 14px;border-radius:10px;margin:8px 0;background:rgba(67,97,238,.05);'
    + 'text-decoration:none;color:inherit;display:block;border-left:3px solid transparent;transition:.12s}'
    + 'html[data-theme="dark"] .ss-hit{background:rgba(67,97,238,.14)}'
    + '.ss-hit:hover{background:rgba(67,97,238,.14);border-left-color:#00b4d8}'
    + 'html[data-theme="dark"] .ss-hit:hover{background:rgba(67,97,238,.24)}'
    + '.ss-hit-title{font-weight:700;font-size:.98rem;color:#4361ee;margin:0 0 4px}'
    + 'html[data-theme="dark"] .ss-hit-title{color:#7fa2ff}'
    + '.ss-hit-path{font-size:.72rem;color:var(--muted,#5b6677);font-family:monospace;margin:0 0 6px}'
    + '.ss-hit-snip{font-size:.85rem;line-height:1.5;color:var(--ink,#1b2230);margin:0}'
    + 'html[data-theme="dark"] .ss-hit-snip{color:#d5dbe6}'
    + '.ss-hit-snip mark{background:#ffd166;color:#7c5c00;padding:0 3px;border-radius:3px;font-weight:700}'
    + '.ss-empty{padding:32px;text-align:center;color:var(--muted,#5b6677);font-size:.95rem}'
    + '.ss-loading{padding:20px;text-align:center;color:var(--muted,#5b6677);font-size:.9rem}';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // Normalise the current location to a root-relative "folder" key.
  var here = location.pathname.replace(/index\.html?$/i, '').replace(/\/$/, '');

  function isActive(path) {
    var key = path.replace(/index\.html?$/i, '').replace(/\/$/, '');
    return here.length && key.length && here.indexOf(key) !== -1 && here.slice(-key.length) === key;
  }

  // Collapsed-state persistence: remember which groups the user closed.
  var STORE_KEY = 'studyhub.nav.collapsed';
  var collapsed = {};
  try { collapsed = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) { collapsed = {}; }

  function esc(id) { return String(id).replace(/[^a-z0-9]+/gi, '-').toLowerCase(); }

  var html = ''
    + '<button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">'
    + (savedTheme === 'dark' ? '☀️' : '🌙') + '</button>'
    + '<input type="checkbox" id="snav-cb" class="snav-cb">'
    + '<label for="snav-cb" class="snav-btn" aria-label="Toggle navigation">☰</label>'
    + '<nav class="sitenav">'
    + '<a class="sitenav-home" href="' + prefix + 'index.html">📚 Study Hub</a>'
    + '<div class="sitesearch">'
    +   '<input id="ss-input" type="search" placeholder="Search all content…" autocomplete="off" spellcheck="false">'
    +   '<span class="ss-ico">🔍</span>'
    +   '<button type="button" class="ss-clear" id="ss-clear" aria-label="Clear">×</button>'
    + '</div>';

  TREE.forEach(function (g, gi) {
    // A group with a heading is collapsible; a headless group (LeetCode Notes) is always shown.
    if (!g.head) {
      html += '<div class="sitenav-group">';
      g.items.forEach(function (it) {
        html += '<a class="navlink' + (isActive(it[1]) ? ' active' : '')
              + '" href="' + prefix + it[1] + '">' + it[0] + '</a>';
      });
      html += '</div>';
      return;
    }

    var gid = esc(g.head) || ('g' + gi);
    var hasActive = g.items.some(function (it) { return isActive(it[1]); });
    // Auto-expand the group that holds the current page, even if it was collapsed before.
    var isCollapsed = collapsed[gid] && !hasActive;

    html += '<div class="sitenav-group' + (isCollapsed ? ' collapsed' : '') + '" data-gid="' + gid + '">'
          + '<button type="button" class="sitenav-head" aria-expanded="' + (isCollapsed ? 'false' : 'true') + '">'
          + '<span class="sitenav-caret">▼</span>'
          + '<span>' + g.head + '</span>'
          + '<span class="sitenav-count">' + g.items.length + '</span>'
          + '</button>'
          + '<div class="sitenav-items">';
    g.items.forEach(function (it) {
      html += '<a class="navlink' + (isActive(it[1]) ? ' active' : '')
            + '" href="' + prefix + it[1] + '">' + it[0] + '</a>';
    });
    html += '</div></div>';
  });
  html += '</nav>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  // Prepend the nav nodes to <body> in original order.
  Array.prototype.slice.call(holder.childNodes).reverse().forEach(function (n) {
    document.body.insertBefore(n, document.body.firstChild);
  });

  // Wire up expand/collapse. We animate max-height, so set it from scrollHeight.
  function setMax(group) {
    var items = group.querySelector('.sitenav-items');
    if (items) items.style.maxHeight = group.classList.contains('collapsed') ? '0px' : items.scrollHeight + 'px';
  }
  var groups = document.querySelectorAll('.sitenav-group[data-gid]');
  Array.prototype.forEach.call(groups, function (group) {
    setMax(group);
    var head = group.querySelector('.sitenav-head');
    head.addEventListener('click', function () {
      var nowCollapsed = !group.classList.contains('collapsed');
      group.classList.toggle('collapsed', nowCollapsed);
      head.setAttribute('aria-expanded', nowCollapsed ? 'false' : 'true');
      setMax(group);
      collapsed[group.getAttribute('data-gid')] = nowCollapsed;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(collapsed)); } catch (e) {}
    });
  });
  // Wire up the theme toggle.
  var toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') || 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  // Keep expanded groups sized correctly if the window resizes (wrapping changes height).
  window.addEventListener('resize', function () {
    Array.prototype.forEach.call(groups, function (group) {
      if (!group.classList.contains('collapsed')) setMax(group);
    });
  });

  /* ---------------------------------------------------------------------
     Content-level search — lazy-loaded index, token scoring, snippets.
     --------------------------------------------------------------------- */
  var INDEX = null, indexLoading = false;
  var input = document.getElementById('ss-input');
  var clearBtn = document.getElementById('ss-clear');
  var overlay, panel, resultsHost, countEl;

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'ss-overlay';
    overlay.innerHTML =
      '<div class="ss-panel">' +
        '<div class="ss-panel-head">' +
          '<h3>Search results</h3>' +
          '<span class="ss-count" id="ss-count"></span>' +
          '<button class="ss-close" id="ss-close">Close (Esc)</button>' +
        '</div>' +
        '<div id="ss-results"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    panel = overlay.querySelector('.ss-panel');
    resultsHost = overlay.querySelector('#ss-results');
    countEl = overlay.querySelector('#ss-count');
    overlay.addEventListener('click', function (e) { if (e.target === overlay) hide(); });
    overlay.querySelector('#ss-close').addEventListener('click', hide);
  }

  function show() { ensureOverlay(); overlay.classList.add('on'); }
  function hide() { if (overlay) overlay.classList.remove('on'); }

  function loadIndex() {
    if (INDEX || indexLoading) return;
    indexLoading = true;
    ensureOverlay();
    resultsHost.innerHTML = '<p class="ss-loading">Loading index…</p>';
    countEl.textContent = '';
    fetch(prefix + 'search-index.json')
      .then(function (r) { if (!r.ok) throw new Error('index HTTP ' + r.status); return r.json(); })
      .then(function (data) { INDEX = data; indexLoading = false;
        if (input.value.trim()) runSearch(input.value); })
      .catch(function (err) {
        indexLoading = false;
        resultsHost.innerHTML = '<p class="ss-empty">Could not load search index: ' +
          String(err && err.message || err) + '<br><small>Run <code>node site/build-search-index.js</code> and redeploy.</small></p>';
      });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function tokenize(q) {
    return q.toLowerCase().split(/\s+/).map(function (t) { return t.trim(); }).filter(Boolean);
  }

  /** Score a chunk: sum of per-token frequency, boosted for title matches
      and for having multiple distinct query tokens present. */
  function scoreDoc(doc, tokens, qFull) {
    var text = doc.x.toLowerCase();
    var title = doc.t.toLowerCase();
    var score = 0, hits = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i]; if (!t) continue;
      var re = new RegExp(escapeRe(t), 'g');
      var m1 = (text.match(re) || []).length;
      var m2 = (title.match(re) || []).length;
      if (m1 || m2) hits++;
      score += m1 + m2 * 6;
    }
    if (qFull && text.indexOf(qFull) !== -1) score += 8;         // exact phrase bonus
    if (hits === tokens.length && tokens.length > 1) score += 4; // all tokens present
    return score;
  }

  /** Pull a ~180-char window around the first match, then highlight tokens. */
  function snippet(text, tokens, qFull) {
    var lower = text.toLowerCase();
    var at = qFull ? lower.indexOf(qFull) : -1;
    if (at < 0 && tokens.length) {
      for (var i = 0; i < tokens.length; i++) {
        at = lower.indexOf(tokens[i]); if (at >= 0) break;
      }
    }
    if (at < 0) at = 0;
    var start = Math.max(0, at - 60);
    var end   = Math.min(text.length, at + 200);
    var slice = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    var html = escapeHtml(slice);
    var allTerms = tokens.slice();
    if (qFull && qFull.indexOf(' ') !== -1) allTerms.unshift(qFull);
    allTerms.sort(function (a, b) { return b.length - a.length; });
    for (var j = 0; j < allTerms.length; j++) {
      var re = new RegExp('(' + escapeRe(escapeHtml(allTerms[j])) + ')', 'gi');
      html = html.replace(re, '<mark>$1</mark>');
    }
    return html;
  }

  function runSearch(q) {
    q = (q || '').trim();
    if (!q) { hide(); return; }
    if (!INDEX) { show(); loadIndex(); return; }
    show();
    var tokens = tokenize(q);
    var qFull = q.toLowerCase();
    var hits = [];
    for (var i = 0; i < INDEX.length; i++) {
      var s = scoreDoc(INDEX[i], tokens, qFull);
      if (s > 0) hits.push({ s: s, d: INDEX[i] });
    }
    hits.sort(function (a, b) { return b.s - a.s; });

    // De-duplicate — only best chunk per page.
    var seen = {}, uniq = [];
    for (var k = 0; k < hits.length && uniq.length < 40; k++) {
      var h = hits[k];
      if (seen[h.d.p]) continue;
      seen[h.d.p] = 1;
      uniq.push(h);
    }

    if (!uniq.length) {
      resultsHost.innerHTML = '<p class="ss-empty">No matches for <strong>' + escapeHtml(q) + '</strong>.</p>';
      countEl.textContent = '0 results';
      return;
    }
    countEl.textContent = uniq.length + (uniq.length === 40 ? '+' : '') + ' results';
    resultsHost.innerHTML = uniq.map(function (h) {
      return '<a class="ss-hit" href="' + prefix + h.d.p + '">' +
             '<p class="ss-hit-title">' + escapeHtml(h.d.t) + '</p>' +
             '<p class="ss-hit-path">' + escapeHtml(h.d.p) + '</p>' +
             '<p class="ss-hit-snip">' + snippet(h.d.x, tokens, qFull) + '</p></a>';
    }).join('');
  }

  if (input) {
    var debounceTimer = null;
    input.addEventListener('input', function () {
      if (debounceTimer) clearTimeout(debounceTimer);
      var v = input.value;
      if (!v.trim()) { hide(); return; }
      if (!INDEX) loadIndex();
      debounceTimer = setTimeout(function () { runSearch(v); }, 120);
    });
    input.addEventListener('focus', function () { if (!INDEX) loadIndex(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; hide(); }
    });
    if (clearBtn) {
      clearBtn.addEventListener('click', function () { input.value = ''; input.focus(); hide(); });
    }
    // Global Esc closes overlay.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('on')) hide();
    });
    // Ctrl/Cmd+K to focus search from anywhere on the page.
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); input.focus(); input.select();
      }
    });
  }
})();
