// ─── DEFAULT DATA ────────────────────────────────────────
const defaultData = {
  filiallar: [
    { id: 1, nom: 'Nukus',      manzil: 'Nukus sh.', bosh: '07:30', tug: '00:00' },
    { id: 2, nom: 'Parus',      manzil: 'Parus',     bosh: '07:30', tug: '00:00' },
    { id: 3, nom: 'Tashkent.c', manzil: 'Toshkent',  bosh: '09:00', tug: '18:00' },
    { id: 4, nom: 'Centr1',     manzil: 'Toshkent',  bosh: '09:00', tug: '18:00' },
  ],
  xodimlar: [
    // PARUS
    { id: 101, ism: 'Muhammad Amin', lavozim: 'Xodim', tel: '', filial: 'Parus', holat: 'faol' },
    { id: 102, ism: 'Ibrohim',       lavozim: 'Xodim', tel: '', filial: 'Parus', holat: 'faol' },
    { id: 103, ism: 'Ibrohim Stajor',lavozim: 'Stajor',tel: '', filial: 'Parus', holat: 'faol' },
    { id: 104, ism: 'Zoxida',        lavozim: 'Xodim', tel: '', filial: 'Parus', holat: 'faol' },
    { id: 105, ism: 'Ilxom',         lavozim: 'Xodim', tel: '', filial: 'Parus', holat: 'faol' },
    { id: 106, ism: 'Kamola',        lavozim: 'Xodim', tel: '', filial: 'Parus', holat: 'faol' },
    // NUKUS
    { id: 201, ism: 'Xurshid Soyibjonov', lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 202, ism: 'Dadaxon Yulchiyev',  lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 203, ism: 'Mohichehra',         lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 204, ism: 'Aziza',              lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 205, ism: 'Aliakbar',           lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 206, ism: 'Abrorbek',           lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 207, ism: 'Maryam',             lavozim: 'Xodim', tel: '', filial: 'Nukus', holat: 'faol' },
  ],
  davomat: {
    // ═══════════════ PARUS ═══════════════
    '2026-06-01': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'09:00'}, 103:{holat:'keldi',vaqt:'16:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-02': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'09:00'}, 103:{holat:'keldi',vaqt:'16:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-03': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'09:00'}, 103:{holat:'keldi',vaqt:'16:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-04': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'09:00'}, 103:{holat:'tatil',vaqt:''},     104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-05': { 101:{holat:'keldi',vaqt:'16:00'}, 102:{holat:'tatil',vaqt:''},      103:{holat:'keldi',vaqt:'07:30'}, 104:{holat:'keldi',vaqt:'07:30'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-06': { 101:{holat:'keldi',vaqt:'16:00'}, 102:{holat:'tatil',vaqt:''},      103:{holat:'keldi',vaqt:'07:30'}, 104:{holat:'keldi',vaqt:'07:30'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-07': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'09:00'}, 103:{holat:'keldi',vaqt:'16:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'} },
    '2026-06-08': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'08:00'}, 104:{holat:'tatil',vaqt:''},     105:{holat:'keldi',vaqt:'14:00'}, 106:{holat:'keldi',vaqt:'16:00'} },
    '2026-06-09': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'08:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'}, 106:{holat:'tatil',vaqt:''} },
    '2026-06-10': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'10:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'}, 106:{holat:'keldi',vaqt:'07:30'} },
    '2026-06-11': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'10:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'}, 106:{holat:'keldi',vaqt:'07:30'} },
    '2026-06-12': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'keldi',vaqt:'08:00'}, 104:{holat:'keldi',vaqt:'12:00'}, 105:{holat:'tatil',vaqt:''},     106:{holat:'keldi',vaqt:'12:00'} },
    '2026-06-13': { 101:{holat:'tatil',vaqt:''},      102:{holat:'keldi',vaqt:'07:00'}, 104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'}, 106:{holat:'keldi',vaqt:'07:30'} },
    '2026-06-14': { 101:{holat:'keldi',vaqt:'07:30'}, 102:{holat:'tatil',vaqt:''},      104:{holat:'keldi',vaqt:'16:00'}, 105:{holat:'keldi',vaqt:'14:00'}, 106:{holat:'keldi',vaqt:'07:30'} },
  }
};

// Nukus davomat
const nukusDav = {
  '2026-06-01': { 201:{holat:'keldi',vaqt:'15:00'}, 202:{holat:'keldi',vaqt:'17:00'}, 203:{holat:'tatil',vaqt:''}, 204:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'10:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-02': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'tatil',vaqt:''},     203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'12:00'}, 207:{holat:'keldi',vaqt:'18:00'} },
  '2026-06-03': { 201:{holat:'keldi',vaqt:'15:00'}, 202:{holat:'keldi',vaqt:'17:00'}, 203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'tatil',vaqt:''},     206:{holat:'keldi',vaqt:'10:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-04': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'keldi',vaqt:'10:00'}, 206:{holat:'tatil',vaqt:''},     207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-05': { 201:{holat:'keldi',vaqt:'15:00'}, 202:{holat:'keldi',vaqt:'17:00'}, 203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'12:00'}, 207:{holat:'keldi',vaqt:'18:00'} },
  '2026-06-06': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'keldi',vaqt:'17:00'}, 203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'keldi',vaqt:'10:00'}, 206:{holat:'keldi',vaqt:'12:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-07': { 201:{holat:'tatil',vaqt:''},      202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'keldi',vaqt:'10:00'}, 206:{holat:'keldi',vaqt:'14:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-08': { 201:{holat:'keldi',vaqt:'17:00'}, 202:{holat:'tatil',vaqt:''},     203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'tatil',vaqt:''},     205:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'13:00'}, 207:{holat:'keldi',vaqt:'16:00'} },
  '2026-06-09': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'tatil',vaqt:''},     204:{holat:'tatil',vaqt:''},     205:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'11:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-10': { 201:{holat:'keldi',vaqt:'17:00'}, 202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'09:00'}, 204:{holat:'tatil',vaqt:''},     205:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'tatil',vaqt:''},     207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-11': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'07:30'}, 204:{holat:'tatil',vaqt:''},     205:{holat:'tatil',vaqt:''},     206:{holat:'keldi',vaqt:'11:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-12': { 201:{holat:'tatil',vaqt:''},      202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'09:00'}, 204:{holat:'tatil',vaqt:''},     205:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'13:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
  '2026-06-13': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'09:00'}, 204:{holat:'tatil',vaqt:''},     205:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'13:00'}, 207:{holat:'keldi',vaqt:'18:00'} },
  '2026-06-14': { 201:{holat:'keldi',vaqt:'14:00'}, 202:{holat:'keldi',vaqt:'16:00'}, 203:{holat:'keldi',vaqt:'09:00'}, 204:{holat:'tatil',vaqt:''},     205:{holat:'keldi',vaqt:'07:30'}, 206:{holat:'keldi',vaqt:'13:00'}, 207:{holat:'keldi',vaqt:'07:30'} },
};
Object.keys(nukusDav).forEach(date => {
  if (!defaultData.davomat[date]) defaultData.davomat[date] = {};
  Object.assign(defaultData.davomat[date], nukusDav[date]);
});

let data = JSON.parse(localStorage.getItem('hr_data') || 'null');
if (!data || !data.xodimlar || data.xodimlar.length === 0) {
  data = JSON.parse(JSON.stringify(defaultData));
  localStorage.setItem('hr_data', JSON.stringify(data));
}

function save() { localStorage.setItem('hr_data', JSON.stringify(data)); }

// ─── NAVIGATION ─────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
  if (id === 'dashboard') renderDashboard();
  if (id === 'xodimlar') renderXodimlar();
  if (id === 'filiallar') renderFiliallar();
  if (id === 'hisobotlar') renderHisobot();
}

// ─── MODAL ──────────────────────────────────────────────
function openModal(id) {
  if (id === 'xodim-modal') populateFilialSelect();
  if (id === 'checkin-modal') {
    const now = new Date();
    document.getElementById('checkin-vaqt').value = now.toTimeString().slice(0,5);
  }
  document.getElementById(id).classList.add('open');
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if(e.target === m) m.classList.remove('open'); });
});

// ─── XODIMLAR ───────────────────────────────────────────
function addXodim() {
  const ism = document.getElementById('x-ism').value.trim();
  const lav = document.getElementById('x-lavozim').value.trim();
  if (!ism || !lav) { alert('Ism va lavozim majburiy!'); return; }
  data.xodimlar.push({
    id: Date.now(), ism, lavozim: lav,
    tel: document.getElementById('x-tel').value,
    filial: document.getElementById('x-filial').value,
    holat: document.getElementById('x-holat').value,
    qoshilgan: new Date().toISOString()
  });
  save(); closeModal('xodim-modal');
  ['x-ism','x-lavozim','x-tel'].forEach(id => document.getElementById(id).value = '');
  renderXodimlar(); renderDashboard();
}

function deleteXodim(id) {
  if (!confirm('Xodimni o\'chirmoqchimisiz?')) return;
  data.xodimlar = data.xodimlar.filter(x => x.id !== id);
  save(); renderXodimlar(); renderDashboard();
}

function renderXodimlar(filter = '') {
  const tbody = document.getElementById('xodimlar-table');
  const list = data.xodimlar.filter(x =>
    x.ism.toLowerCase().includes(filter.toLowerCase()) ||
    x.lavozim.toLowerCase().includes(filter.toLowerCase()) ||
    (x.filial || '').toLowerCase().includes(filter.toLowerCase())
  );
  document.getElementById('xodim-count-label').textContent = data.xodimlar.length + ' xodim';
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">👤</div><div class="empty-text">Hali xodim yo'q.</div></div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(x => {
    const today = todayKey();
    const dav = (data.davomat[today] || {})[x.id] || {};
    const badge = holatBadge(dav.holat || 'belgilanmagan');
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="avatar">${x.ism[0]}</div>
        <div><div style="font-weight:600">${x.ism}</div></div>
      </div></td>
      <td>${x.lavozim}</td>
      <td>${x.filial || '—'}</td>
      <td>${x.tel || '—'}</td>
      <td><span class="badge ${badge.cls}">${badge.label}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openCheckin(${x.id},'${x.ism}')">📋 Davomat</button>
        <button class="btn btn-danger btn-sm" style="margin-left:6px" onclick="deleteXodim(${x.id})">🗑</button>
      </td>
    </tr>`;
  }).join('');
}

function filterXodimlar(v) { renderXodimlar(v); }

// ─── FILIALLAR ───────────────────────────────────────────
function addFilial() {
  const nom = document.getElementById('f-nom').value.trim();
  if (!nom) { alert('Filial nomi majburiy!'); return; }
  data.filiallar.push({
    id: Date.now(), nom,
    manzil: document.getElementById('f-manzil').value,
    bosh: document.getElementById('f-bosh').value,
    tug: document.getElementById('f-tug').value
  });
  save(); closeModal('filial-modal'); renderFiliallar();
}

function deleteFilial(id) {
  if (!confirm('Filialni o\'chirmoqchimisiz?')) return;
  data.filiallar = data.filiallar.filter(f => f.id !== id);
  save(); renderFiliallar();
}

function renderFiliallar() {
  const tbody = document.getElementById('filiallar-table');
  document.getElementById('filial-count-label').textContent = data.filiallar.length + ' filial';
  if (!data.filiallar.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">📍</div><div class="empty-text">Hali filial yo'q.</div></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.filiallar.map(f => {
    const xodimCount = data.xodimlar.filter(x => x.filial === f.nom).length;
    return `<tr>
      <td><strong>${f.nom}</strong></td>
      <td>${f.manzil || '—'}</td>
      <td>${xodimCount} xodim</td>
      <td>${f.bosh} — ${f.tug}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteFilial(${f.id})">🗑 O'chirish</button></td>
    </tr>`;
  }).join('');
}

function populateFilialSelect() {
  const sel = document.getElementById('x-filial');
  sel.innerHTML = '<option value="">— Tanlang —</option>' +
    data.filiallar.map(f => `<option value="${f.nom}">${f.nom}</option>`).join('');
}

// ─── DAVOMAT ─────────────────────────────────────────────
function todayKey() { return new Date().toISOString().slice(0,10); }

function openCheckin(id, ism) {
  document.getElementById('checkin-id').value = id;
  document.getElementById('checkin-name').textContent = ism;
  const today = todayKey();
  const existing = (data.davomat[today] || {})[id];
  if (existing) {
    document.getElementById('checkin-holat').value = existing.holat;
    document.getElementById('checkin-vaqt').value = existing.vaqt || '';
  }
  openModal('checkin-modal');
}

function saveCheckin() {
  const id = parseInt(document.getElementById('checkin-id').value);
  const holat = document.getElementById('checkin-holat').value;
  const vaqt = document.getElementById('checkin-vaqt').value;
  const today = todayKey();
  if (!data.davomat[today]) data.davomat[today] = {};
  data.davomat[today][id] = { holat, vaqt };
  save(); closeModal('checkin-modal'); renderDashboard(); renderXodimlar();
}

// ─── DASHBOARD ───────────────────────────────────────────
function renderDashboard() {
  const today = todayKey();
  const dav = data.davomat[today] || {};
  let keldi=0, kechikdi=0, kelmadi=0, tatil=0;
  data.xodimlar.forEach(x => {
    const h = (dav[x.id] || {}).holat;
    if (h === 'keldi') keldi++;
    else if (h === 'kechikdi') kechikdi++;
    else if (h === 'kelmadi') kelmadi++;
    else if (h === 'tatil') tatil++;
  });
  const total = data.xodimlar.length;
  document.getElementById('stat-keldi').textContent = keldi;
  document.getElementById('stat-kechikdi').textContent = kechikdi;
  document.getElementById('stat-kelmadi').textContent = kelmadi;
  document.getElementById('stat-tatil').textContent = tatil;
  const pct = total ? Math.round((keldi/total)*100) : 0;
  document.getElementById('davomat-pct').textContent = pct + '%';
  document.getElementById('total-xodim').textContent = 'Jami ' + total + ' xodim';
  const toW = v => total ? (v/total*100).toFixed(1)+'%' : '0%';
  document.getElementById('bar-g').style.width = toW(keldi);
  document.getElementById('bar-y').style.width = toW(kechikdi);
  document.getElementById('bar-r').style.width = toW(kelmadi);
  document.getElementById('bar-b').style.width = toW(tatil);

  const tbody = document.getElementById('dashboard-table');
  if (!data.xodimlar.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">👤</div><div class="empty-text">Hali xodim yo'q.</div></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.xodimlar.map(x => {
    const d = dav[x.id] || {};
    const badge = holatBadge(d.holat || 'belgilanmagan');
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="avatar">${x.ism[0]}</div><strong>${x.ism}</strong>
      </div></td>
      <td>${x.lavozim}</td>
      <td>${x.filial || '—'}</td>
      <td>${d.vaqt || '—'}</td>
      <td><span class="badge ${badge.cls}">${badge.label}</span></td>
      <td><button class="btn btn-secondary btn-sm" onclick="openCheckin(${x.id},'${x.ism}')">📋</button></td>
    </tr>`;
  }).join('');
}

function holatBadge(holat) {
  const map = {
    'keldi':        { cls:'badge-green',  label:'✅ Keldi' },
    'kechikdi':     { cls:'badge-yellow', label:'⏰ Kechikdi' },
    'kelmadi':      { cls:'badge-red',    label:'❌ Kelmadi' },
    'tatil':        { cls:'badge-blue',   label:"🏖 Ta'tilda" },
    'belgilanmagan':{ cls:'badge-gray',   label:'— Belgilanmagan' },
    'faol':         { cls:'badge-green',  label:'Faol' },
    'kasal':        { cls:'badge-yellow', label:'Kasal' },
  };
  return map[holat] || { cls:'badge-gray', label:holat };
}

function refreshStats() { renderDashboard(); }

// ─── HISOBOT ─────────────────────────────────────────────
let selectedReport = 'bugun';
function selectReport(el, type) {
  document.querySelectorAll('.report-option').forEach(r => r.classList.remove('selected'));
  el.classList.add('selected');
  selectedReport = type;
  const maxs = document.getElementById('maxsus-date');
  maxs.style.display = type === 'maxsus' ? 'flex' : 'none';
  renderHisobot();
}

function getDates() {
  const today = new Date();
  const fmt = d => d.toISOString().slice(0,10);
  if (selectedReport === 'bugun') return [fmt(today)];
  if (selectedReport === 'hafta') {
    return Array.from({length:7}, (_,i) => {
      const d = new Date(today); d.setDate(d.getDate()-i); return fmt(d);
    });
  }
  if (selectedReport === 'oy') {
    const days = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
    return Array.from({length:days}, (_,i) => {
      const d = new Date(today.getFullYear(), today.getMonth(), i+1); return fmt(d);
    });
  }
  return [fmt(today)];
}

function renderHisobot() {
  const dates = getDates();
  const tbody = document.getElementById('hisobot-table');
  const chart = document.getElementById('bar-chart');
  const chartDates = dates.slice(0,7);
  chart.innerHTML = chartDates.map(date => {
    const dav = data.davomat[date] || {};
    const keldi = data.xodimlar.filter(x => (dav[x.id]||{}).holat === 'keldi').length;
    const total = data.xodimlar.length || 1;
    const h = Math.max(4, Math.round((keldi/total)*100));
    return `<div class="bar-col"><div class="bar" style="height:${h}px"></div><div class="bar-label">${date.slice(5)}</div></div>`;
  }).join('');
  if (!data.xodimlar.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📊</div><div class="empty-text">Hali xodim yo'q.</div></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.xodimlar.map(x => {
    let k=0,ke=0,km=0,t=0;
    dates.forEach(date => {
      const h = (data.davomat[date]||{})[x.id];
      if (!h) return;
      if (h.holat==='keldi') k++;
      else if (h.holat==='kechikdi') ke++;
      else if (h.holat==='kelmadi') km++;
      else if (h.holat==='tatil') t++;
    });
    const pct = dates.length ? Math.round((k/dates.length)*100) : 0;
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar">${x.ism[0]}</div>${x.ism}</div></td>
      <td><span class="badge badge-green">${k}</span></td>
      <td><span class="badge badge-yellow">${ke}</span></td>
      <td><span class="badge badge-red">${km}</span></td>
      <td><span class="badge badge-blue">${t}</span></td>
      <td><strong>${pct}%</strong></td>
    </tr>`;
  }).join('');
}

function exportCSV() {
  const dates = getDates();
  let csv = 'Xodim,Lavozim,Keldi,Kechikdi,Kelmadi,Tatil,Davomat%\n';
  data.xodimlar.forEach(x => {
    let k=0,ke=0,km=0,t=0;
    dates.forEach(date => {
      const h = (data.davomat[date]||{})[x.id];
      if (!h) return;
      if (h.holat==='keldi') k++;
      else if (h.holat==='kechikdi') ke++;
      else if (h.holat==='kelmadi') km++;
      else if (h.holat==='tatil') t++;
    });
    const pct = dates.length ? Math.round((k/dates.length)*100) : 0;
    csv += `${x.ism},${x.lavozim},${k},${ke},${km},${t},${pct}%\n`;
  });
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'hisobot.csv';
  a.click();
}

// ─── SOZLAMALAR ──────────────────────────────────────────
function updateColor(val) {
  document.getElementById('color-hex').textContent = val;
  document.documentElement.style.setProperty('--primary', val);
}
function updateLogo() {
  const v = document.getElementById('set-company').value;
  document.querySelector('.logo-text').textContent = v;
  document.querySelector('.logo-icon').textContent = (v[0]||'A') + (v[1]||'');
  document.title = v + ' — HR Boshqaruv';
}
function saveBrand() { updateLogo(); updateColor(document.getElementById('set-color').value); showToast('Brend saqlandi ✅'); }
function saveNotifTimes() { showToast('Vaqtlar saqlandi ✅'); }
function setLang(l) {
  ['uz','ru'].forEach(x => {
    document.getElementById('lang-'+x).className = 'btn btn-' + (x===l?'primary':'secondary') + ' btn-sm';
  });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#1a1a1a;border:1px solid #333;color:#f5f5f5;padding:12px 20px;border-radius:10px;font-size:14px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.5)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ─── CLOCK ───────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('uz-UZ', {hour:'2-digit', minute:'2-digit', second:'2-digit'});
  const el = document.getElementById('live-time');
  if (el) el.textContent = timeStr;
  const dateEl = document.getElementById('today-date');
  if (dateEl) dateEl.textContent = now.toLocaleDateString('uz-UZ', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
}
setInterval(updateClock, 1000);
updateClock();

// ─── INIT ────────────────────────────────────────────────
renderDashboard();
