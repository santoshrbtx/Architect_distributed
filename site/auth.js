/* Client-side access gate for the Study Hub.
   Include once per page in <head>:  <script src="<prefix>auth.js"></script>
   (prefix encodes depth to site root: ''  |  '../'  |  '../../')

   The password is NEVER stored in plaintext — only its SHA-256 hash lives here.
   On submit we hash the typed value with the Web Crypto API and compare.
   NOTE: this is a browser-side deterrent for a static site, not real security —
   the files are still directly readable by anyone who bypasses the page. */
(function () {
  'use strict';

  var TITLE = 'Private Property terrapassing not allowed';
  // SHA-256 of the accepted password ("5212"). Plaintext is intentionally absent.
  var PASSWORD_HASH = '421921b162ab5ec0b572f0705456ae57743a68b3310bc524ed34b0f3c6e5059f';
  var SESSION_KEY = 'hub-auth-ok';

  // Already unlocked this browser session → do nothing.
  try {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return;
  } catch (e) { /* sessionStorage blocked — fall through and gate */ }

  // Hide page content immediately (before it paints) to avoid a flash of the
  // protected page. The overlay itself is exempt via :not(#auth-overlay).
  var hide = document.createElement('style');
  hide.id = 'auth-hide';
  hide.textContent =
    'body > *:not(#auth-overlay){display:none !important}' +
    'body{overflow:hidden !important}';
  (document.head || document.documentElement).appendChild(hide);

  async function sha256hex(str) {
    var data = new TextEncoder().encode(str);
    var buf = await crypto.subtle.digest('SHA-256', data);
    return Array.prototype.map
      .call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, '0');
      })
      .join('');
  }

  function build() {
    var css = ''
      + '#auth-overlay{position:fixed;inset:0;z-index:2147483647;display:flex;'
      + 'align-items:center;justify-content:center;padding:20px;'
      + 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;'
      + 'background:linear-gradient(135deg,#0f1420 0%,#1b2230 60%,#241b40 100%)}'
      + '#auth-overlay .auth-card{width:100%;max-width:420px;background:#ffffff;'
      + 'border-radius:18px;padding:34px 32px;box-shadow:0 18px 60px rgba(0,0,0,.45);'
      + 'text-align:center}'
      + '#auth-overlay .auth-lock{font-size:2.4rem;line-height:1;margin-bottom:12px}'
      + '#auth-overlay h1{margin:0 0 6px;font-size:1.28rem;color:#1b2230;letter-spacing:-.2px}'
      + '#auth-overlay p.sub{margin:0 0 22px;color:#5b6677;font-size:.92rem}'
      + '#auth-overlay form{display:flex;flex-direction:column;gap:12px}'
      + '#auth-overlay input{width:100%;padding:13px 15px;font-size:1.05rem;text-align:center;'
      + 'letter-spacing:.35em;border:1px solid #e6eaf0;border-radius:11px;outline:none;'
      + 'transition:border-color .15s,box-shadow .15s}'
      + '#auth-overlay input:focus{border-color:#4361ee;box-shadow:0 0 0 3px rgba(67,97,238,.18)}'
      + '#auth-overlay button{width:100%;padding:13px 15px;font-size:1rem;font-weight:700;'
      + 'color:#fff;border:0;border-radius:11px;cursor:pointer;'
      + 'background:linear-gradient(135deg,#4361ee,#7048e8);transition:filter .15s}'
      + '#auth-overlay button:hover{filter:brightness(1.08)}'
      + '#auth-overlay .err{min-height:18px;color:#f7567c;font-size:.85rem;font-weight:600}'
      + '#auth-overlay.shake .auth-card{animation:authShake .4s}'
      + '@keyframes authShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-9px)}'
      + '40%,80%{transform:translateX(9px)}}';

    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var ov = document.createElement('div');
    ov.id = 'auth-overlay';
    ov.innerHTML =
      '<div class="auth-card" role="dialog" aria-modal="true" aria-label="Password required">' +
        '<div class="auth-lock">🔒</div>' +
        '<h1></h1>' +
        '<p class="sub">This area is protected. Enter the password to continue.</p>' +
        '<form autocomplete="off">' +
          '<input type="password" inputmode="numeric" aria-label="Password" ' +
                 'placeholder="••••" autofocus />' +
          '<div class="err" aria-live="polite"></div>' +
          '<button type="submit">Unlock</button>' +
        '</form>' +
      '</div>';
    // Set the title via textContent so it can't be interpreted as HTML.
    ov.querySelector('h1').textContent = TITLE;
    document.body.appendChild(ov);

    var form = ov.querySelector('form');
    var input = ov.querySelector('input');
    var err = ov.querySelector('.err');
    input.focus();

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      err.textContent = '';
      var typed = input.value;
      var ok = false;
      try {
        ok = (await sha256hex(typed)) === PASSWORD_HASH;
      } catch (ex) {
        err.textContent = 'Secure hashing unavailable in this browser.';
        return;
      }
      if (ok) {
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e2) {}
        var h = document.getElementById('auth-hide');
        if (h) h.remove();
        ov.remove();
      } else {
        err.textContent = 'Incorrect password. Try again.';
        input.value = '';
        input.focus();
        ov.classList.remove('shake');
        void ov.offsetWidth; // reflow to restart the animation
        ov.classList.add('shake');
      }
    });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
