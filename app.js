// ─── TELEGRAM MINI APP INIT ──────────────────────────────
const tg = window.Telegram && window.Telegram.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor('#1a1a1a');
  tg.setBackgroundColor('#0f0f0f');
}

// ─── DEFAULT DATA ────────────────────────────────────────
const defaultData = {
  filiallar: [
    { id: 1, nom: 'Nukus',      manzil: 'Nukus sh.', bosh: '07:30', tug: '00:00' },
    { id: 2, nom: 'Parus',      manzil: 'Parus',     bosh: '07:30', tug: '00:00' },
    { id: 3, nom: 'Tashkent.c', manzil: 'Toshkent',  bosh: '09:00', tug: '18:00' },
    { id: 4, nom: 'Centr1',     manzil: 'Toshkent',  bosh: '09:00', tug: '18:00' },
  ],
  xodimlar: [
    { id: 101, ism: 'Muhammad Amin',      lavozim: 'Xodim',  tel: '', filial: 'Parus', holat: 'faol' },
    { id: 102, ism: 'Ibrohim',            lavozim: 'Xodim',  tel: '', filial: 'Parus', holat: 'faol' },
    { id: 103, ism: 'Ibrohim Stajor',     lavozim: 'Stajor', tel: '', filial: 'Parus', holat: 'faol' },
    { id: 104, ism: 'Zoxida',             lavozim: 'Xodim',  tel: '', filial: 'Parus', holat: 'faol' },
    { id: 105, ism: 'Ilxom',              lavozim: 'Xodim',  tel: '', filial: 'Parus', holat: 'faol' },
    { id: 106, ism: 'Kamola',             lavozim: 'Xodim',  tel: '', filial: 'Parus', holat: 'faol' },
    { id: 201, ism: 'Xurshid Soyibjonov', lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 202, ism: 'Dadaxon Yulchiyev',  lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 203, ism: 'Mohichehra',         lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 204, ism: 'Aziza',              lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 205, ism: 'Aliakbar',           lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 206, ism: 'Abrorbek',           lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
    { id: 207, ism: 'Maryam',             lavozim: 'Xodim',  tel: '', filial: 'Nukus', holat: 'faol' },
  ],
  davomat: {
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
function showPage(id, sidebarEl, bnId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');

  // sidebar
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (sidebarEl) sidebarEl.classList.add('active');

  // bottom nav
  document.querySelectorAll('.bn-item').forEach(n => n.classList.remove('active'));
  const bnEl = bnId ? document.getElementById(bnId) : document.getElementById('bn-' + id);
  if (bnEl) bnEl.classList.add('active');

  if (id === 'dashboard') renderDashboard();
  if (id === 'xodimlar') renderXodimlar();
  if (id === 'filiallar') renderFiliallar();
  if (id === 'hisobotlar') renderHisobot();
}

// ─── MODAL ──────────────────────────────────────────────
function openModal(id) {
  if (id === 'xodim-modal') populateFilialSelect();
  if (id === 'checkin-modal') {
    document.getElementById('checkin-vaqt').value = new Date().toTimeString().slice(0,5);
  }
  document.getElementById(id).classList.add('open');
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

// ─── HELPERS ────────────────────────────────────────────
function todayKey() { return new Date().toISOString().slice(0,10); }

function holatBadge(holat) {
  const map = {
    'keldi':         { cls:'badge-green',  label:'✅ Keldi' },
    'kechikdi':      { cls:'badge-yellow', label:'⏰ Kechikdi' },
    'kelmadi':       { cls:'badge-red',    label:'❌ Kelmadi' },
    'tatil':         { cls:'badge-blue',   label:"🏖 Ta'tilda" },
    'belgilanmagan': { cls:'badge-gray',   label:'— Belgilanmagan' },
    'faol':          { cls:'badge-green',  label:'Faol' },
    'kasal':         { cls:'badge-yellow', label:'Kasal' },
  };
  return map[holat] || { cls:'badge-gray', label: holat };
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ─── XODIMLAR ───────────────────────────────────────────
function addXodim() {
  const ism = document.getElementById('x-ism').value.trim();
  const lav = document.getElementById('x-lavozim').value.trim();
  if (!ism || !lav) { showToast('Ism va lavozim majburiy!'); return; }
  data.xodimlar.push({
    id: Date.now(), ism, lavozim: lav,
    tel: document.getElementById('x-tel').value,
    filial: document.getElementById('x-filial').value,
    holat: document.getElementById('x-holat').value,
  });
  save(); closeModal('xodim-modal');
  ['x-ism','x-lavozim','x-tel'].forEach(id => document.getElementById(id).value = '');
  renderXodimlar(); renderDashboard();
  showToast('Xodim qo\'shildi ✅');
}

function deleteXodim(id) {
  if (!confirm('Xodimni o\'chirmoqchimisiz?')) return;
  data.xodimlar = data.xodimlar.filter(x => x.id !== id);
  save(); renderXodimlar(); renderDashboard();
}

function renderXodimlar(filter = '') {
  const list = data.xodimlar.filter(x =>
    x.ism.toLowerCase().includes(filter.toLowerCase()) ||
    x.lavozim.toLowerCase().includes(filter.toLowerCase()) ||
    (x.filial||'').toLowerCase().includes(filter.toLowerCase())
  );
  document.getElementById('xodim-count-label').textContent = data.xodimlar.length + ' xodim';
  const today = todayKey();

  // Desktop
  const dt = document.getElementById('xodimlar-table-desktop');
  if (dt) {
    dt.innerHTML = list.length ? list.map(x => {
      const dav = (data.davomat[today]||{})[x.id]||{};
      const b = holatBadge(dav.holat||'belgilanmagan');
      return `<tr>
        <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar">${x.ism[0]}</div><strong>${x.ism}</strong></div></td>
        <td>${x.lavozim}</td><td>${x.filial||'—'}</td>
        <td><span class="badge ${b.cls}">${b.label}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="openCheckin(${x.id},'${x.ism}')">📋</button>
          <button class="btn btn-danger btn-sm" onclick="deleteXodim(${x.id})">🗑</button>
        </td>
      </tr>`;
    }).join('') : `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">👤</div><div class="empty-text">Xodim yo'q</div></div></td></tr>`;
  }

  // Mobile
  const mm = document.getElementById('xodimlar-table-mobile');
  if (mm) {
    mm.innerHTML = list.length ? list.map(x => {
      const dav = (data.davomat[today]||{})[x.id]||{};
      const b = holatBadge(dav.holat||'belgilanmagan');
      return `<div class="xodim-card">
        <div class="avatar">${x.ism[0]}</div>
        <div class="xodim-card-info">
          <div class="xodim-card-name">${x.ism}</div>
          <div class="xodim-card-sub">${x.lavozim} · ${x.filial||'—'}</div>
          <div style="margin-top:4px"><span class="badge ${b.cls}">${b.label}</span></div>
        </div>
        <div class="xodim-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="openCheckin(${x.id},'${x.ism}')">📋</button>
          <button class="btn btn-danger btn-sm" onclick="deleteXodim(${x.id})">🗑</button>
        </div>
      </div>`;
    }).join('') : `<div class="empty-state"><div class="empty-icon">👤</div><div class="empty-text">Xodim yo'q</div></div>`;
  }
}

function filterXodimlar(v) { renderXodimlar(v); }
function populateFilialSelect() {
  document.getElementById('x-filial').innerHTML = '<option value="">— Tanlang —</option>' +
    data.filiallar.map(f => `<option value="${f.nom}">${f.nom}</option>`).join('');
}

// ─── FILIALLAR ───────────────────────────────────────────
function addFilial() {
  const nom = document.getElementById('f-nom').value.trim();
  if (!nom) { showToast('Filial nomi majburiy!'); return; }
  data.filiallar.push({ id: Date.now(), nom, manzil: document.getElementById('f-manzil').value, bosh: document.getElementById('f-bosh').value, tug: document.getElementById('f-tug').value });
  save(); closeModal('filial-modal'); renderFiliallar();
  showToast('Filial qo\'shildi ✅');
}
function deleteFilial(id) {
  if (!confirm('Filialni o\'chirmoqchimisiz?')) return;
  data.filiallar = data.filiallar.filter(f => f.id !== id);
  save(); renderFiliallar();
}
function renderFiliallar() {
  document.getElementById('filial-count-label').textContent = data.filiallar.length + ' filial';
  const rows = data.filiallar.map(f => {
    const cnt = data.xodimlar.filter(x => x.filial === f.nom).length;
    return { f, cnt };
  });

  // Desktop
  const dt = document.getElementById('filiallar-table-desktop');
  if (dt) {
    dt.innerHTML = rows.length ? rows.map(({f,cnt}) => `<tr>
      <td><strong>${f.nom}</strong></td><td>${f.manzil||'—'}</td>
      <td>${cnt} xodim</td><td>${f.bosh} — ${f.tug}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteFilial(${f.id})">🗑</button></td>
    </tr>`).join('') : `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">📍</div><div class="empty-text">Filial yo'q</div></div></td></tr>`;
  }

  // Mobile
  const mm = document.getElementById('filiallar-table-mobile');
  if (mm) {
    mm.innerHTML = rows.length ? rows.map(({f,cnt}) => `<div class="xodim-card">
      <div style="font-size:28px">📍</div>
      <div class="xodim-card-info">
        <div class="xodim-card-name">${f.nom}</div>
        <div class="xodim-card-sub">${f.manzil||'—'} · ${cnt} xodim · ${f.bosh}–${f.tug}</div>
      </div>
      <button class="btn btn-danger btn-sm" onclick="deleteFilial(${f.id})">🗑</button>
    </div>`).join('') : `<div class="empty-state"><div class="empty-icon">📍</div><div class="empty-text">Filial yo'q</div></div>`;
  }
}

// ─── DAVOMAT ─────────────────────────────────────────────
function openCheckin(id, ism) {
  document.getElementById('checkin-id').value = id;
  document.getElementById('checkin-name').textContent = ism;
  const ex = (data.davomat[todayKey()]||{})[id];
  if (ex) { document.getElementById('checkin-holat').value = ex.holat; document.getElementById('checkin-vaqt').value = ex.vaqt||''; }
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
  showToast('Davomat saqlandi ✅');
}

// ─── DASHBOARD ───────────────────────────────────────────
function renderDashboard() {
  const today = todayKey();
  const dav = data.davomat[today]||{};
  let keldi=0,kechikdi=0,kelmadi=0,tatil=0;
  data.xodimlar.forEach(x => {
    const h = (dav[x.id]||{}).holat;
    if (h==='keldi') keldi++;
    else if (h==='kechikdi') kechikdi++;
    else if (h==='kelmadi') kelmadi++;
    else if (h==='tatil') tatil++;
  });
  const total = data.xodimlar.length;
  document.getElementById('stat-keldi').textContent = keldi;
  document.getElementById('stat-kechikdi').textContent = kechikdi;
  document.getElementById('stat-kelmadi').textContent = kelmadi;
  document.getElementById('stat-tatil').textContent = tatil;
  const pct = total ? Math.round((keldi/total)*100) : 0;
  document.getElementById('davomat-pct').textContent = pct+'%';
  document.getElementById('total-xodim').textContent = 'Jami '+total+' xodim';
  const toW = v => total ? (v/total*100).toFixed(1)+'%' : '0%';
  document.getElementById('bar-g').style.width = toW(keldi);
  document.getElementById('bar-y').style.width = toW(kechikdi);
  document.getElementById('bar-r').style.width = toW(kelmadi);
  document.getElementById('bar-b').style.width = toW(tatil);

  // Desktop
  const dt = document.getElementById('dashboard-table-desktop');
  if (dt) {
    dt.innerHTML = data.xodimlar.length ? data.xodimlar.map(x => {
      const d = dav[x.id]||{}; const b = holatBadge(d.holat||'belgilanmagan');
      return `<tr>
        <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar">${x.ism[0]}</div><strong>${x.ism}</strong></div></td>
        <td>${x.lavozim}</td><td>${x.filial||'—'}</td><td>${d.vaqt||'—'}</td>
        <td><span class="badge ${b.cls}">${b.label}</span></td>
        <td><button class="btn btn-secondary btn-sm" onclick="openCheckin(${x.id},'${x.ism}')">📋</button></td>
      </tr>`;
    }).join('') : `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">👤</div><div class="empty-text">Hali xodim yo'q</div></div></td></tr>`;
  }

  // Mobile
  const mm = document.getElementById('dashboard-table-mobile');
  if (mm) {
    mm.innerHTML = data.xodimlar.length ? data.xodimlar.map(x => {
      const d = dav[x.id]||{}; const b = holatBadge(d.holat||'belgilanmagan');
      return `<div class="xodim-card">
        <div class="avatar">${x.ism[0]}</div>
        <div class="xodim-card-info">
          <div class="xodim-card-name">${x.ism}</div>
          <div class="xodim-card-sub">${x.filial||'—'} ${d.vaqt ? '· '+d.vaqt : ''}</div>
          <div style="margin-top:4px"><span class="badge ${b.cls}">${b.label}</span></div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="openCheckin(${x.id},'${x.ism}')">📋</button>
      </div>`;
    }).join('') : `<div class="empty-state"><div class="empty-icon">👤</div><div class="empty-text">Hali xodim yo'q</div></div>`;
  }
}

function refreshStats() { renderDashboard(); showToast('Yangilandi ✅'); }

// ─── HISOBOT ─────────────────────────────────────────────
let selectedReport = 'bugun';
function selectReport(el, type) {
  document.querySelectorAll('.report-option').forEach(r => r.classList.remove('selected'));
  el.classList.add('selected'); selectedReport = type;
  document.getElementById('maxsus-date').style.display = type==='maxsus' ? 'flex' : 'none';
  renderHisobot();
}
function getDates() {
  const today = new Date(); const fmt = d => d.toISOString().slice(0,10);
  if (selectedReport==='bugun') return [fmt(today)];
  if (selectedReport==='hafta') return Array.from({length:7},(_,i)=>{ const d=new Date(today); d.setDate(d.getDate()-i); return fmt(d); });
  if (selectedReport==='oy') { const days=new Date(today.getFullYear(),today.getMonth()+1,0).getDate(); return Array.from({length:days},(_,i)=>{ const d=new Date(today.getFullYear(),today.getMonth(),i+1); return fmt(d); }); }
  return [fmt(today)];
}
function renderHisobot() {
  const dates = getDates();
  document.getElementById('bar-chart').innerHTML = dates.slice(0,7).map(date => {
    const dav=data.davomat[date]||{}; const keldi=data.xodimlar.filter(x=>(dav[x.id]||{}).holat==='keldi').length;
    const h=Math.max(4,Math.round((keldi/(data.xodimlar.length||1))*100));
    return `<div class="bar-col"><div class="bar" style="height:${h}px"></div><div class="bar-label">${date.slice(5)}</div></div>`;
  }).join('');

  const rows = data.xodimlar.map(x => {
    let k=0,ke=0,km=0,t=0;
    dates.forEach(date => { const h=(data.davomat[date]||{})[x.id]; if(!h)return; if(h.holat==='keldi')k++; else if(h.holat==='kechikdi')ke++; else if(h.holat==='kelmadi')km++; else if(h.holat==='tatil')t++; });
    const pct=dates.length?Math.round((k/dates.length)*100):0;
    return {x,k,ke,km,t,pct};
  });

  // Desktop
  const dt = document.getElementById('hisobot-table-desktop');
  if (dt) dt.innerHTML = rows.map(({x,k,ke,km,t,pct}) => `<tr>
    <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar">${x.ism[0]}</div>${x.ism}</div></td>
    <td><span class="badge badge-green">${k}</span></td>
    <td><span class="badge badge-yellow">${ke}</span></td>
    <td><span class="badge badge-red">${km}</span></td>
    <td><span class="badge badge-blue">${t}</span></td>
    <td><strong>${pct}%</strong></td>
  </tr>`).join('') || `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📊</div><div class="empty-text">Ma'lumot yo'q</div></div></td></tr>`;

  // Mobile
  const mm = document.getElementById('hisobot-table-mobile');
  if (mm) mm.innerHTML = rows.map(({x,k,ke,km,t,pct}) => `<div class="xodim-card" style="flex-direction:column;align-items:flex-start;gap:8px">
    <div style="display:flex;align-items:center;gap:8px;width:100%">
      <div class="avatar">${x.ism[0]}</div>
      <div><div style="font-weight:600">${x.ism}</div><div style="font-size:11px;color:var(--text2)">${x.filial||''}</div></div>
      <div style="margin-left:auto;font-weight:700;color:var(--primary)">${pct}%</div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <span class="badge badge-green">✅ ${k}</span>
      <span class="badge badge-yellow">⏰ ${ke}</span>
      <span class="badge badge-red">❌ ${km}</span>
      <span class="badge badge-blue">🏖 ${t}</span>
    </div>
  </div>`).join('');
}
function exportCSV() {
  const dates=getDates(); let csv='Xodim,Lavozim,Keldi,Kechikdi,Kelmadi,Tatil,Davomat%\n';
  data.xodimlar.forEach(x=>{ let k=0,ke=0,km=0,t=0; dates.forEach(date=>{ const h=(data.davomat[date]||{})[x.id]; if(!h)return; if(h.holat==='keldi')k++; else if(h.holat==='kechikdi')ke++; else if(h.holat==='kelmadi')km++; else if(h.holat==='tatil')t++; }); csv+=`${x.ism},${x.lavozim},${k},${ke},${km},${t},${dates.length?Math.round((k/dates.length)*100):0}%\n`; });
  const a=document.createElement('a'); a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download='hisobot.csv'; a.click();
}

// ─── SOZLAMALAR ──────────────────────────────────────────
function updateColor(val) { document.getElementById('color-hex').textContent=val; document.documentElement.style.setProperty('--primary',val); }
function updateLogo() { const v=document.getElementById('set-company').value; document.querySelectorAll('.logo-text,.mh-title').forEach(el=>el.textContent=v); document.querySelectorAll('.logo-icon,.mh-icon').forEach(el=>el.textContent=(v[0]||'A')+(v[1]||'')); document.title=v+' — HR Boshqaruv'; }
function saveBrand() { updateLogo(); updateColor(document.getElementById('set-color').value); showToast('Brend saqlandi ✅'); }
function saveNotifTimes() { showToast('Vaqtlar saqlandi ✅'); }
function setLang(l) { ['uz','ru'].forEach(x=>{ document.getElementById('lang-'+x).className='btn btn-'+(x===l?'primary':'secondary')+' btn-sm'; }); }

// ─── CLOCK ───────────────────────────────────────────────
function updateClock() {
  const now=new Date();
  const t=now.toLocaleTimeString('uz-UZ',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const liveEl=document.getElementById('live-time'); if(liveEl) liveEl.textContent=t;
  const mhEl=document.getElementById('mh-time'); if(mhEl) mhEl.textContent=t;
  const dateEl=document.getElementById('today-date'); if(dateEl) dateEl.textContent=now.toLocaleDateString('uz-UZ',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
setInterval(updateClock,1000); updateClock();

// ─── INIT ────────────────────────────────────────────────
renderDashboard();
