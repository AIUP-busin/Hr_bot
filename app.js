// ===== TELEGRAM MINI APP INIT =====
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.('#1a1a1a');
  tg.setBackgroundColor?.('#0f0f0f');
}

// ===== DATA =====
let filiallar = [
  { id: 1, nom: 'Parus', manzil: 'Toshkent, Mirzo Ulugbek', bosh: '09:00', tug: '18:00' },
  { id: 2, nom: 'Nukus', manzil: 'Nukus, Markaziy ko\'cha', bosh: '09:00', tug: '18:00' }
];

let xodimlar = [
  { id: 101, ism: 'Aziz Karimov',    lavozim: 'Dasturchi',       filial: 1, holat: 'faol', tel: '+998901001001' },
  { id: 102, ism: 'Barno Tosheva',   lavozim: 'Dizayner',        filial: 1, holat: 'faol', tel: '+998901001002' },
  { id: 103, ism: 'Jasur Xoliqov',   lavozim: 'Menejer',         filial: 1, holat: 'faol', tel: '+998901001003' },
  { id: 104, ism: 'Dilnoza Yusupova',lavozim: 'Buxgalter',       filial: 1, holat: 'faol', tel: '+998901001004' },
  { id: 105, ism: 'Eldor Nazarov',   lavozim: 'Dasturchi',       filial: 1, holat: 'faol', tel: '+998901001005' },
  { id: 106, ism: 'Feruza Alimova',  lavozim: 'HR menejer',      filial: 1, holat: 'faol', tel: '+998901001006' },
  { id: 201, ism: 'Gulnora Rашidova',lavozim: 'Direktor',        filial: 2, holat: 'faol', tel: '+998901002001' },
  { id: 202, ism: 'Hamid Bekmurodov',lavozim: 'Dasturchi',       filial: 2, holat: 'faol', tel: '+998901002002' },
  { id: 203, ism: 'Iroda Sobirov',   lavozim: 'Buxgalter',       filial: 2, holat: 'faol', tel: '+998901002003' },
  { id: 204, ism: 'Jahongir Toxirov',lavozim: 'Menejer',         filial: 2, holat: 'faol', tel: '+998901002004' },
  { id: 205, ism: 'Kamola Mirzaeva', lavozim: 'Dizayner',        filial: 2, holat: 'faol', tel: '+998901002005' },
  { id: 206, ism: 'Lochinbek Umarov',lavozim: 'Dasturchi',       filial: 2, holat: 'faol', tel: '+998901002006' },
  { id: 207, ism: 'Malika Qodirov',  lavozim: 'Sotuvchi',        filial: 2, holat: 'faol', tel: '+998901002007' }
];

// Attendance: June 1-14, 2026 | keldi/kechikdi/kelmadi/tatil
const davomatData = {
  101: ['keldi','keldi','keldi','kechikdi','keldi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi','kechikdi','keldi'],
  102: ['keldi','keldi','kelmadi','keldi','keldi','keldi','tatil','tatil','keldi','keldi','keldi','keldi','keldi','keldi'],
  103: ['kechikdi','keldi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi','keldi','kechikdi','keldi','keldi','keldi'],
  104: ['keldi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi','keldi','keldi','keldi','kechikdi','keldi','keldi'],
  105: ['keldi','keldi','keldi','keldi','keldi','keldi','keldi','kelmadi','keldi','kechikdi','keldi','keldi','keldi','keldi'],
  106: ['keldi','kechikdi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi'],
  201: ['keldi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','kechikdi','keldi','keldi','keldi','keldi','kelmadi'],
  202: ['kelmadi','keldi','keldi','kechikdi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','kelmadi','keldi'],
  203: ['keldi','keldi','kechikdi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi','keldi','keldi','keldi','keldi'],
  204: ['keldi','keldi','keldi','keldi','kechikdi','keldi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi','keldi'],
  205: ['tatil','tatil','keldi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','keldi','kechikdi','keldi','keldi'],
  206: ['keldi','keldi','keldi','kelmadi','keldi','keldi','kechikdi','keldi','keldi','keldi','keldi','keldi','keldi','keldi'],
  207: ['keldi','keldi','keldi','keldi','keldi','kechikdi','keldi','keldi','keldi','keldi','kelmadi','keldi','keldi','keldi']
};

// Today's checkin (in-memory)
let todayCheckin = {};
xodimlar.forEach(x => {
  const saved = localStorage.getItem('ci_' + x.id);
  todayCheckin[x.id] = saved ? JSON.parse(saved) : { holat: 'kelmadi', vaqt: '' };
});

let currentPage = 'dashboard';
let currentPeriod = 'bugun';

// ===== NAVIGATION =====
function showPage(id, sidebarEl, bnId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');

  if (sidebarEl) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    sidebarEl.classList.add('active');
  }
  if (bnId) {
    document.querySelectorAll('.bn-item').forEach(n => n.classList.remove('active'));
    document.getElementById(bnId)?.classList.add('active');
  }

  currentPage = id;
  if (id === 'dashboard') renderDashboard();
  if (id === 'xodimlar') renderXodimlar();
  if (id === 'filiallar') renderFiliallar();
  if (id === 'hisobotlar') renderHisobot();
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ===== BADGE =====
function badge(holat) {
  const map = {
    keldi: ['badge-green', '✅ Keldi'],
    kechikdi: ['badge-yellow', '⏰ Kechikdi'],
    kelmadi: ['badge-red', '❌ Kelmadi'],
    tatil: ['badge-blue', '🏖 Ta\'til'],
    faol: ['badge-green', '✅ Faol'],
    kasal: ['badge-red', '🤒 Kasal'],
  };
  const [cls, txt] = map[holat] || ['badge-gray', holat];
  return `<span class="badge ${cls}">${txt}</span>`;
}

function filialNom(id) { return filiallar.find(f => f.id === id)?.nom || '—'; }

// ===== DASHBOARD =====
function renderDashboard() {
  const today = new Date();
  document.getElementById('today-date').textContent = today.toLocaleDateString('uz-UZ', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  const stats = { keldi: 0, kechikdi: 0, kelmadi: 0, tatil: 0 };
  xodimlar.forEach(x => {
    const h = todayCheckin[x.id]?.holat || 'kelmadi';
    if (stats[h] !== undefined) stats[h]++;
    else stats.kelmadi++;
  });

  document.getElementById('stat-keldi').textContent = stats.keldi;
  document.getElementById('stat-kechikdi').textContent = stats.kechikdi;
  document.getElementById('stat-kelmadi').textContent = stats.kelmadi;
  document.getElementById('stat-tatil').textContent = stats.tatil;

  const total = xodimlar.length;
  const pct = total ? Math.round((stats.keldi + stats.kechikdi) / total * 100) : 0;
  document.getElementById('davomat-pct').textContent = pct + '%';
  document.getElementById('total-xodim').textContent = total + ' xodim';
  document.getElementById('bar-g').style.width = (stats.keldi / total * 100) + '%';
  document.getElementById('bar-y').style.width = (stats.kechikdi / total * 100) + '%';
  document.getElementById('bar-r').style.width = (stats.kelmadi / total * 100) + '%';
  document.getElementById('bar-b').style.width = (stats.tatil / total * 100) + '%';

  // Desktop table
  const tbody = document.getElementById('dash-table');
  if (tbody) tbody.innerHTML = xodimlar.map(x => {
    const ci = todayCheckin[x.id] || {};
    return `<tr>
      <td><b>${x.ism}</b></td>
      <td>${x.lavozim}</td>
      <td>${filialNom(x.filial)}</td>
      <td>${ci.vaqt || '—'}</td>
      <td>${badge(ci.holat || 'kelmadi')}</td>
      <td><button class="btn-secondary" style="padding:5px 10px;font-size:12px" onclick="openCheckin(${x.id})">✏️</button></td>
    </tr>`;
  }).join('');

  // Mobile cards
  const cards = document.getElementById('dash-cards');
  if (cards) cards.innerHTML = xodimlar.map(x => {
    const ci = todayCheckin[x.id] || {};
    return `<div class="xodim-card">
      <div class="xodim-card-top">
        <div class="xodim-card-name">${x.ism}</div>
        ${badge(ci.holat || 'kelmadi')}
      </div>
      <div class="xodim-card-row"><span>${x.lavozim} · ${filialNom(x.filial)}</span><span>${ci.vaqt || '—'}</span></div>
      <div class="xodim-card-actions">
        <button class="btn-secondary" style="flex:1;padding:7px;font-size:12px" onclick="openCheckin(${x.id})">✏️ Davomat</button>
      </div>
    </div>`;
  }).join('');
}

function refreshStats() { renderDashboard(); showToast('Yangilandi ✅'); }

// ===== CHECK-IN =====
function openCheckin(id) {
  const x = xodimlar.find(x => x.id === id);
  if (!x) return;
  document.getElementById('ci-id').value = id;
  document.getElementById('ci-name').textContent = x.ism;
  const ci = todayCheckin[id] || {};
  document.getElementById('ci-holat').value = ci.holat || 'kelmadi';
  document.getElementById('ci-vaqt').value = ci.vaqt || '';
  openModal('modal-checkin');
}

function saveCheckin() {
  const id = parseInt(document.getElementById('ci-id').value);
  const holat = document.getElementById('ci-holat').value;
  const vaqt = document.getElementById('ci-vaqt').value;
  todayCheckin[id] = { holat, vaqt };
  localStorage.setItem('ci_' + id, JSON.stringify({ holat, vaqt }));
  closeModal('modal-checkin');
  renderDashboard();
  showToast('Davomat saqlandi ✅');
}

// ===== XODIMLAR =====
function renderXodimlar(filter = '') {
  const list = filter ? xodimlar.filter(x => x.ism.toLowerCase().includes(filter.toLowerCase()) || x.lavozim.toLowerCase().includes(filter.toLowerCase())) : xodimlar;
  document.getElementById('xodim-count').textContent = list.length + ' xodim';

  const tbody = document.getElementById('xodim-table');
  if (tbody) tbody.innerHTML = list.map(x => `<tr>
    <td><b>${x.ism}</b><br><span style="color:var(--text2);font-size:11px">${x.tel}</span></td>
    <td>${x.lavozim}</td>
    <td>${filialNom(x.filial)}</td>
    <td>${badge(x.holat)}</td>
    <td><button class="btn-secondary" style="padding:5px 10px;font-size:12px" onclick="deleteXodim(${x.id})">🗑</button></td>
  </tr>`).join('');

  const cards = document.getElementById('xodim-cards');
  if (cards) cards.innerHTML = list.map(x => `<div class="xodim-card">
    <div class="xodim-card-top">
      <div class="xodim-card-name">${x.ism}</div>
      ${badge(x.holat)}
    </div>
    <div class="xodim-card-row"><span>${x.lavozim}</span><span>${filialNom(x.filial)}</span></div>
    <div class="xodim-card-row"><span>${x.tel}</span></div>
  </div>`).join('');

  // Fill filial select
  const sel = document.getElementById('x-filial');
  if (sel) {
    sel.innerHTML = '<option value="">— Tanlang —</option>' + filiallar.map(f => `<option value="${f.id}">${f.nom}</option>`).join('');
  }
}

function filterXodimlar(v) { renderXodimlar(v); }

function addXodim() {
  const ism = document.getElementById('x-ism').value.trim();
  const lavozim = document.getElementById('x-lavozim').value.trim();
  const tel = document.getElementById('x-tel').value.trim();
  const filial = parseInt(document.getElementById('x-filial').value);
  if (!ism || !lavozim) return showToast('Ism va lavozim majburiy!');
  const newId = Math.max(...xodimlar.map(x => x.id)) + 1;
  xodimlar.push({ id: newId, ism, lavozim, filial, holat: 'faol', tel });
  todayCheckin[newId] = { holat: 'kelmadi', vaqt: '' };
  closeModal('modal-xodim');
  document.getElementById('x-ism').value = '';
  document.getElementById('x-lavozim').value = '';
  document.getElementById('x-tel').value = '';
  renderXodimlar();
  showToast('Xodim qo\'shildi ✅');
}

function deleteXodim(id) {
  if (!confirm('O\'chirilsinmi?')) return;
  xodimlar = xodimlar.filter(x => x.id !== id);
  renderXodimlar();
  showToast('O\'chirildi');
}

// ===== FILIALLAR =====
function renderFiliallar() {
  document.getElementById('filial-count').textContent = filiallar.length + ' filial';

  const tbody = document.getElementById('filial-table');
  if (tbody) tbody.innerHTML = filiallar.map(f => {
    const cnt = xodimlar.filter(x => x.filial === f.id).length;
    return `<tr>
      <td><b>${f.nom}</b></td>
      <td>${f.manzil}</td>
      <td>${cnt} xodim</td>
      <td>${f.bosh} – ${f.tug}</td>
      <td><button class="btn-secondary" style="padding:5px 10px;font-size:12px" onclick="deleteFilial(${f.id})">🗑</button></td>
    </tr>`;
  }).join('');

  const cards = document.getElementById('filial-cards');
  if (cards) cards.innerHTML = filiallar.map(f => {
    const cnt = xodimlar.filter(x => x.filial === f.id).length;
    return `<div class="xodim-card">
      <div class="xodim-card-top"><div class="xodim-card-name">📍 ${f.nom}</div><span class="badge badge-green">${cnt} xodim</span></div>
      <div class="xodim-card-row"><span>${f.manzil}</span><span>${f.bosh}–${f.tug}</span></div>
    </div>`;
  }).join('');
}

function addFilial() {
  const nom = document.getElementById('f-nom').value.trim();
  const manzil = document.getElementById('f-manzil').value.trim();
  const bosh = document.getElementById('f-bosh').value;
  const tug = document.getElementById('f-tug').value;
  if (!nom) return showToast('Filial nomi majburiy!');
  const newId = Math.max(...filiallar.map(f => f.id)) + 1;
  filiallar.push({ id: newId, nom, manzil, bosh, tug });
  closeModal('modal-filial');
  document.getElementById('f-nom').value = '';
  document.getElementById('f-manzil').value = '';
  renderFiliallar();
  showToast('Filial qo\'shildi ✅');
}

function deleteFilial(id) {
  if (xodimlar.some(x => x.filial === id)) return showToast('Bu filialda xodimlar bor!');
  filiallar = filiallar.filter(f => f.id !== id);
  renderFiliallar();
  showToast('O\'chirildi');
}

// ===== HISOBOT =====
function selectPeriod(el, period) {
  document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentPeriod = period;
  renderHisobot();
}

function renderHisobot() {
  const days = 14; // June 1-14
  const labels = Array.from({length: days}, (_, i) => 'I' + (i+1));

  // Bar chart — daily attendance %
  const chart = document.getElementById('bar-chart');
  if (chart) {
    const dailyPct = labels.map((_, di) => {
      const came = xodimlar.filter(x => {
        const h = davomatData[x.id]?.[di];
        return h === 'keldi' || h === 'kechikdi';
      }).length;
      return Math.round(came / xodimlar.length * 100);
    });
    const maxH = 80;
    chart.innerHTML = dailyPct.map((p, i) => `
      <div class="bar-chart-col">
        <div class="bar-chart-bar" style="height:${Math.max(4, p/100*maxH)}px;opacity:${0.5+p/200}"></div>
        <div class="bar-chart-lbl">${labels[i]}</div>
      </div>`).join('');
  }

  // Summary table
  const tbody = document.getElementById('hisobot-table');
  const cardList = document.getElementById('hisobot-cards');

  const rows = xodimlar.map(x => {
    const d = davomatData[x.id] || [];
    const keldi = d.filter(h => h === 'keldi').length;
    const kechikdi = d.filter(h => h === 'kechikdi').length;
    const kelmadi = d.filter(h => h === 'kelmadi').length;
    const tatil = d.filter(h => h === 'tatil').length;
    const pct = days ? Math.round((keldi + kechikdi) / days * 100) : 0;
    return { x, keldi, kechikdi, kelmadi, tatil, pct };
  });

  if (tbody) tbody.innerHTML = rows.map(r => `<tr>
    <td><b>${r.x.ism}</b></td>
    <td style="color:var(--green)">${r.keldi}</td>
    <td style="color:var(--yellow)">${r.kechikdi}</td>
    <td style="color:var(--red)">${r.kelmadi}</td>
    <td style="color:var(--blue)">${r.tatil}</td>
    <td><b>${r.pct}%</b></td>
  </tr>`).join('');

  if (cardList) cardList.innerHTML = rows.map(r => `<div class="xodim-card">
    <div class="xodim-card-top"><div class="xodim-card-name">${r.x.ism}</div><b>${r.pct}%</b></div>
    <div class="xodim-card-row">
      <span style="color:var(--green)">✅ ${r.keldi}</span>
      <span style="color:var(--yellow)">⏰ ${r.kechikdi}</span>
      <span style="color:var(--red)">❌ ${r.kelmadi}</span>
      <span style="color:var(--blue)">🏖 ${r.tatil}</span>
    </div>
  </div>`).join('');
}

function exportCSV() {
  const rows = [['Xodim','Lavozim','Filial','Keldi','Kechikdi','Kelmadi','Tatil','%']];
  xodimlar.forEach(x => {
    const d = davomatData[x.id] || [];
    const keldi = d.filter(h=>h==='keldi').length;
    const kechikdi = d.filter(h=>h==='kechikdi').length;
    const kelmadi = d.filter(h=>h==='kelmadi').length;
    const tatil = d.filter(h=>h==='tatil').length;
    const pct = Math.round((keldi+kechikdi)/14*100);
    rows.push([x.ism, x.lavozim, filialNom(x.filial), keldi, kechikdi, kelmadi, tatil, pct+'%']);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'hisobot.csv';
  a.click();
}

// ===== SOZLAMALAR =====
function updateColor(val) {
  document.documentElement.style.setProperty('--primary', val);
  document.getElementById('color-hex').textContent = val;
}
function saveBrand() {
  const name = document.getElementById('set-company').value;
  document.querySelector('.logo-text').textContent = name;
  document.querySelector('.mh-title').textContent = name + ' HR';
  showToast('Saqlandi ✅');
}
function saveNotif() { showToast('Vaqtlar saqlandi ✅'); }

// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  const t = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  const el = document.getElementById('mh-time');
  const lt = document.getElementById('live-time');
  if (el) el.textContent = t;
  if (lt) lt.textContent = t;
}
setInterval(updateClock, 1000);
updateClock();

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
});
