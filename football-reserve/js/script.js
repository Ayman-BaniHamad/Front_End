// ----- color mode -----
const root = document.documentElement;
const saved = localStorage.getItem('mode'); // 'dark' | 'light' | null
if (saved === 'dark') document.body.classList.add('dark');

const toggleBtn = document.getElementById('modeToggle');
if (toggleBtn){
  toggleBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
  // initial icon
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// ----- active nav link -----
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a=>{
  const target = a.getAttribute('href');
  if (target === here) a.classList.add('active');
});

// ----- footer year -----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----- demo: reserve 
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-reserve]');
  if (btn){
    const name = prompt('Your name?');
    if (!name) return;
    alert(`✅ Reserved: ${btn.dataset.reserve} for ${name}`);
  }
 
});

/* ===== Join page: prompt for name + decrement spots ===== */
(() => {
  // run only on join.html
  const cards = document.querySelectorAll('main .card');
  if (!cards.length) return;

  // restore previous state (so refresh keeps counts)
  const LS_KEY = 'fb_join_matches';
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
    catch { return {}; }
  })();

  cards.forEach(card => {
    const titleEl = card.querySelector('h3');
    const infoEl  = card.querySelector('.notice');
    const btn     = card.querySelector('.btn');
    if (!titleEl || !infoEl || !btn) return;

    // Unique match id (use title text by default)
    const id = (card.dataset.matchId || titleEl.textContent).trim();

    // Parse "5/10 players • 5 spots left"
    const m = infoEl.textContent.match(/(\d+)\s*\/\s*(\d+)/);
    let joined   = m ? parseInt(m[1], 10) : 0;
    let capacity = m ? parseInt(m[2], 10) : 10;

    // load saved state if exists
    if (saved[id]) {
      joined   = saved[id].joined;
      capacity = saved[id].capacity;
    } else {
      saved[id] = { joined, capacity, names: [] };
    }

    const render = () => {
      const spots = Math.max(0, capacity - joined);
      infoEl.textContent = `${joined}/${capacity} players • ${spots} spots left`;
      btn.disabled = spots === 0;
      btn.textContent = spots === 0 ? 'Full' : 'Join';
    };

    render();

    btn.addEventListener('click', () => {
      // still full? (handles fast double-clicks)
      if (joined >= capacity) {
        alert('Sorry, no spots left.');
        render();
        return;
      }

      const name = prompt('Enter your name to join:');
      if (!name || !name.trim()) return;

      const nm = name.trim().toLowerCase();

      // prevent same name joining twice for this match
      saved[id].names = saved[id].names || [];
      if (saved[id].names.includes(nm)) {
        alert('You already joined this match.');
        return;
      }

      saved[id].names.push(nm);
      joined += 1;
      saved[id].joined = joined;
      saved[id].capacity = capacity;

      localStorage.setItem(LS_KEY, JSON.stringify(saved));
      render();
      alert(`✅ You joined: ${titleEl.textContent}`);
    });
  });
})();
// ===== Reset Join Matches =====
function resetJoinMatches() {
  localStorage.removeItem('fb_join_matches');
  alert("✅ All matches have been reset.");
  location.reload();
}


