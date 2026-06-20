const express  = require('express');
const path      = require('path');
const fs        = require('fs');
const https     = require('https');
const app       = express();
const PORT      = process.env.PORT || 3000;

const DATA_DIR   = path.join(__dirname, 'data');
const PHOTOS_DIR = path.join(DATA_DIR, 'photos');
if (!fs.existsSync(DATA_DIR))   fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(PHOTOS_DIR)) fs.mkdirSync(PHOTOS_DIR);

// ===== SOZLAMALAR =====
const OFFICE_LAT   = parseFloat(process.env.OFFICE_LAT   || '41.308143');
const OFFICE_LON   = parseFloat(process.env.OFFICE_LON   || '69.210944');
const MAX_DIST     = parseFloat(process.env.MAX_DIST      || '10');

// ===== BOT TOKENLAR (Railway env vars orqali) =====
// BOT_TOKEN         = xodimlar boti tokeni
// MANAGER_BOT_TOKEN = rahbar boti tokeni
// BOSS_CHAT_ID      = rahbarning Telegram chat_id
// APP_URL           = https://hrbot-production-4126.up.railway.app
const EMP_BOT_TOKEN  = process.env.BOT_TOKEN         || '';
const MGR_BOT_TOKEN  = process.env.MANAGER_BOT_TOKEN || '';
const BOSS_CHAT_ID   = process.env.BOSS_CHAT_ID      || '';
const APP_URL        = process.env.APP_URL            || '';

// ===== SMENA =====
const SHIFT_START = 14 * 60;      // 840 min
const SHIFT_END   = 24 * 60 + 30; // 1470 min

// ===== XODIMLAR FAYLI =====
const EMPS_FILE = path.join(DATA_DIR, 'employees.json');

function loadEmps() {
  if (!fs.existsSync(EMPS_FILE)) return defaultEmps();
  try { return JSON.parse(fs.readFileSync(EMPS_FILE, 'utf8')); }
  catch(e) { return defaultEmps(); }
}

function saveEmps(emps) {
  fs.writeFileSync(EMPS_FILE, JSON.stringify(emps, null, 2));
}

function defaultEmps() {
  // Boshlang'ich xodimlar ro'yxati (chat_id keyinchalik to'ldiriladi)
  return [
    { pin:'1001', name:'Muhammad Amin',      branch:'Parus', chat_id:null },
    { pin:'1002', name:'Ibrohim',            branch:'Parus', chat_id:null },
    { pin:'1003', name:'Ibrohim Stajor',     branch:'Parus', chat_id:null },
    { pin:'1004', name:'Zoxida',             branch:'Parus', chat_id:null },
    { pin:'1005', name:'Ilxom',              branch:'Parus', chat_id:null },
    { pin:'1006', name:'Kamola',             branch:'Parus', chat_id:null },
    { pin:'2001', name:'Xurshid Soyibjonov', branch:'Nukus', chat_id:null },
    { pin:'2002', name:'Dadaxon Yulchiyev',  branch:'Nukus', chat_id:null },
    { pin:'2003', name:'Mohichehra',         branch:'Nukus', chat_id:null },
    { pin:'2004', name:'Aziza',              branch:'Nukus', chat_id:null },
    { pin:'2005', name:'Aliakbar',           branch:'Nukus', chat_id:null },
    { pin:'2006', name:'Abrorbek',           branch:'Nukus', chat_id:null },
    { pin:'2007', name:'Maryam',             branch:'Nukus', chat_id:null },
  ];
}

// ===== TELEGRAM API =====
function sendTG(token, chatId, text, extra) {
  if (!token || !chatId) return;
  const payload = Object.assign({ chat_id: chatId, text, parse_mode: 'HTML' }, extra || {});
  const body = JSON.stringify(payload);
  const req = https.request({
    hostname: 'api.telegram.org',
    path: `/bot${token}/sendMessage`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, res => { res.on('data', () => {}); });
  req.on('error', e => console.error('[TG xato]', e.message));
  req.write(body); req.end();
}

// Rahbarga (manager bot orqali) xabar
function notifyManager(text) {
  sendTG(MGR_BOT_TOKEN, BOSS_CHAT_ID, text);
}

// Xodimga (employee bot orqali) xabar
function notifyEmployee(pin, text) {
  const emp = loadEmps().find(e => e.pin === pin);
  if (emp && emp.chat_id) {
    sendTG(EMP_BOT_TOKEN, emp.chat_id, text);
  }
}

// Webhook o'rnatish
function setWebhook(token, url) {
  if (!token || !url) return;
  const body = JSON.stringify({ url, drop_pending_updates: true });
  const req = https.request({
    hostname: 'api.telegram.org',
    path: `/bot${token}/setWebhook`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => console.log('[Webhook]', url, d));
  });
  req.on('error', e => console.error('[Webhook xato]', e.message));
  req.write(body); req.end();
}

// ===== HAVERSINE =====
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2
          + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ===== VAQT =====
function parseMin(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
function fmtHours(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h > 0 ? `${h} soat ${m} daqiqa` : `${m} daqiqa`;
}
function calcWorkMinutes(inTime, outTime) {
  let inMin  = parseMin(inTime);
  let outMin = parseMin(outTime);
  if (outMin <= 90) outMin += 24 * 60;
  const effIn  = Math.max(inMin,  SHIFT_START);
  const effOut = Math.min(outMin, SHIFT_END);
  if (effOut <= effIn) return 0;
  return effOut - effIn;
}

// ===== MIDDLEWARE =====
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== WEBHOOK: XODIMLAR BOTI =====
// Xodim botni ishga tushirganda /start PIN yoki faqat PIN yuboradi
app.post('/webhook/employee', (req, res) => {
  res.sendStatus(200); // Telegramga tez javob
  const msg = req.body.message || req.body.edited_message;
  if (!msg || !msg.text) return;

  const chatId = String(msg.chat.id);
  const text   = msg.text.trim();

  // /start yoki /start 1001 yoki faqat 1001
  const pin = text.replace(/^\/start\s*/, '').trim();

  if (/^\d{4}$/.test(pin)) {
    const emps = loadEmps();
    const emp  = emps.find(e => e.pin === pin);
    if (emp) {
      emp.chat_id = chatId;
      saveEmps(emps);
      sendTG(EMP_BOT_TOKEN, chatId,
        `â Salom, <b>${emp.name}</b>!\n` +
        `ð¢ Filial: <b>${emp.branch}</b>\n\n` +
        `Siz muvaffaqiyatli ro'yxatdan o'tdingiz.\n` +
        `Endi rahbardan xabarlar shu yerga keladi. ð©`
      );
      // Rahbarga ham xabar
      notifyManager(
        `ð <b>${emp.name}</b> (${emp.branch}) xodimlar botiga ulandi.\n` +
        `ð PIN: ${emp.pin}`
      );
    } else {
      sendTG(EMP_BOT_TOKEN, chatId,
        `â PIN noto'g'ri yoki topilmadi.\n` +
        `4 xonali PIN kodingizni yuboring.\nMasalan: <code>1001</code>`
      );
    }
  } else if (text === '/start') {
    sendTG(EMP_BOT_TOKEN, chatId,
      `ð Xush kelibsiz!\n\n` +
      `Xabar olish uchun <b>PIN kodingizni</b> yuboring.\n` +
      `Masalan: <code>1001</code>`
    );
  }
});

// ===== WEBHOOK: RAHBAR BOTI =====
app.post('/webhook/manager', (req, res) => {
  res.sendStatus(200);
  const msg = req.body.message || req.body.edited_message;
  if (!msg || !msg.text) return;

  const chatId = String(msg.chat.id);
  const text   = msg.text.trim();

  // Faqat rahbar chat_id dan
  if (BOSS_CHAT_ID && chatId !== String(BOSS_CHAT_ID)) {
    sendTG(MGR_BOT_TOKEN, chatId, 'â Sizda ruxsat yo\'q.');
    return;
  }

  // âââ ð¢ PIN: xabar ââ xodimga e'lon yuborish
  // Misol: ð¢ 1001: Bugun kech qolmang!
  const announceMatch = text.match(/^(?:ð¢\s*|\/announce\s+)(\d{4}):\s*(.+)/s);
  if (announceMatch) {
    const [, pin, message] = announceMatch;
    const emps = loadEmps();
    const emp  = emps.find(e => e.pin === pin);
    if (!emp) {
      sendTG(MGR_BOT_TOKEN, chatId, `â PIN <b>${pin}</b> topilmadi.`);
    } else if (!emp.chat_id) {
      sendTG(MGR_BOT_TOKEN, chatId,
        `â ï¸ <b>${emp.name}</b> hali xodimlar botiga ulanmagan.\n` +
        `Ulardan botni ishga tushirishni so'rang:\n` +
        `PIN ni yuborsin â xodimlar boti`
      );
    } else {
      sendTG(EMP_BOT_TOKEN, emp.chat_id,
        `ð¢ <b>Rahbardan xabar:</b>\n\n${message}`
      );
      sendTG(MGR_BOT_TOKEN, chatId,
        `â Xabar <b>${emp.name}</b> ga yuborildi.`
      );
    }
    return;
  }

  // âââ ð¢ Hammaga e'lon ââ
  // Misol: ð¢ all: Bugun majlis 18:00 da
  const allMatch = text.match(/^(?:ð¢\s*|\/announce\s+)all:\s*(.+)/si);
  if (allMatch) {
    const message = allMatch[1];
    const emps = loadEmps().filter(e => e.chat_id);
    if (!emps.length) {
      sendTG(MGR_BOT_TOKEN, chatId, 'â ï¸ Hech bir xodim botga ulanmagan.');
      return;
    }
    emps.forEach(e => {
      sendTG(EMP_BOT_TOKEN, e.chat_id, `ð¢ <b>Rahbardan xabar:</b>\n\n${message}`);
    });
    sendTG(MGR_BOT_TOKEN, chatId, `â Xabar ${emps.length} ta xodimga yuborildi.`);
    return;
  }

  // âââ â Yangi xodim qo'shish ââ
  // Misol: â Ali Valiyev | Parus | 1008
  const addMatch = text.match(/^(?:â\s*|\/add\s+)(.+)\|(.+)\|(\d{3,4})\s*$/);
  if (addMatch) {
    const name   = addMatch[1].trim();
    const branch = addMatch[2].trim();
    const pin    = addMatch[3].trim();
    const emps   = loadEmps();
    if (emps.find(e => e.pin === pin)) {
      sendTG(MGR_BOT_TOKEN, chatId, `â PIN <b>${pin}</b> allaqachon mavjud.`);
    } else {
      emps.push({ pin, name, branch, chat_id: null });
      saveEmps(emps);
      sendTG(MGR_BOT_TOKEN, chatId,
        `â Yangi xodim qo'shildi!\n` +
        `ð¤ <b>${name}</b>\nð¢ ${branch}\nð PIN: <code>${pin}</code>\n\n` +
        `Xodim xodimlar botiga PIN kodini yuborsa, ulanadi.`
      );
    }
    return;
  }

  // âââ â Xodim o'chirish ââ
  // Misol: â 1008
  const delMatch = text.match(/^(?:â\s*|\/del\s+)(\d{3,4})\s*$/);
  if (delMatch) {
    const pin  = delMatch[1].trim();
    let emps   = loadEmps();
    const idx  = emps.findIndex(e => e.pin === pin);
    if (idx === -1) {
      sendTG(MGR_BOT_TOKEN, chatId, `â PIN <b>${pin}</b> topilmadi.`);
    } else {
      const removed = emps.splice(idx, 1)[0];
      saveEmps(emps);
      sendTG(MGR_BOT_TOKEN, chatId, `ð <b>${removed.name}</b> ro'yxatdan o'chirildi.`);
    }
    return;
  }

  // âââ ð Xodimlar ro'yxati ââ
  if (text === '/list' || text === 'ð') {
    const emps = loadEmps();
    if (!emps.length) { sendTG(MGR_BOT_TOKEN, chatId, 'Ro\'yxat bo\'sh.'); return; }
    const parus = emps.filter(e => e.branch === 'Parus');
    const nukus = emps.filter(e => e.branch === 'Nukus');
    const fmt   = e => `${e.chat_id ? 'ð¢' : 'â«'} ${e.name} â <code>${e.pin}</code>`;
    const txt   =
      `ð <b>Xodimlar ro'yxati</b>\n\n` +
      `ð¢ <b>Parus (${parus.length})</b>\n${parus.map(fmt).join('\n') || 'â'}\n\n` +
      `ðï¸ <b>Nukus (${nukus.length})</b>\n${nukus.map(fmt).join('\n') || 'â'}\n\n` +
      `ð¢ ulangan  â« ulanmagan`;
    sendTG(MGR_BOT_TOKEN, chatId, txt);
    return;
  }

  // âââ ð Bugungi davomat ââ
  if (text === '/today' || text === 'ð') {
    const today    = new Date().toISOString().split('T')[0];
    const dayFile  = path.join(DATA_DIR, `${today}.json`);
    if (!fs.existsSync(dayFile)) {
      sendTG(MGR_BOT_TOKEN, chatId, `ð Bugun (${today}) hech kim qayd etmagan.`);
      return;
    }
    let records = [];
    try { records = JSON.parse(fs.readFileSync(dayFile, 'utf8')); } catch(e) {}

    const seen = {};
    records.forEach(r => {
      if (!seen[r.pin]) seen[r.pin] = { name:r.name, branch:r.branch, in:null, out:null, min:0 };
      if (r.type === 'in')  seen[r.pin].in  = r.effective_in || r.time;
      if (r.type === 'out') { seen[r.pin].out = r.time; seen[r.pin].min += r.work_minutes || 0; }
    });

    const lines = Object.values(seen).map(s => {
      let line = `ð¤ <b>${s.name}</b> (${s.branch})\n`;
      line += s.in  ? `  â Keldi: ${s.in}\n` : '';
      line += s.out ? `  ðª Ketdi: ${s.out} â â± ${fmtHours(s.min)}\n` : '';
      return line;
    });

    sendTG(MGR_BOT_TOKEN, chatId,
      `ð <b>Bugungi davomat (${today})</b>\n\n${lines.join('\n') || 'â'}`
    );
    return;
  }

  // âââ Yordam ââ
  sendTG(MGR_BOT_TOKEN, chatId,
    `ð <b>Buyruqlar:</b>\n\n` +
    `<b>Xabar yuborish:</b>\n` +
    `ð¢ <code>PIN: xabar matni</code>\n` +
    `ð¢ <code>all: hammaga xabar</code>\n\n` +
    `<b>Xodim boshqarish:</b>\n` +
    `â <code>Ism Familiya | Filial | PIN</code>\n` +
    `â <code>PIN</code> â xodim o'chirish\n` +
    `ð â ro'yxat\n\n` +
    `<b>Statistika:</b>\n` +
    `ð â bugungi davomat\n\n` +
    `â KELDI va ðª KETDI xabarlari avtomatik keladi.`
  );
});

// ===== API: XODIMLAR RO'YXATI (frontend uchun) =====
app.get('/api/employees', (req, res) => {
  const emps = loadEmps().map(e => ({ pin:e.pin, name:e.name, branch:e.branch }));
  res.json(emps);
});

// ===== GPS TEKSHIRISH =====
app.post('/api/check-gps', (req, res) => {
  const { lat, lon } = req.body;
  const dist = distance(OFFICE_LAT, OFFICE_LON, parseFloat(lat), parseFloat(lon));
  if (dist > MAX_DIST) {
    return res.json({ ok:false, dist:Math.round(dist) });
  }
  res.json({ ok:true, dist:Math.round(dist) });
});

// ===== KELDI / KETDI =====
app.post('/api/checkin', (req, res) => {
  const { name, branch, pin, type, time, date, photo, lat, lon } = req.body;

  const dist = distance(OFFICE_LAT, OFFICE_LON, parseFloat(lat), parseFloat(lon));
  if (dist > MAX_DIST) {
    notifyManager(
      `ð¨ <b>GPS FIRIBGAR!!</b>\n\n` +
      `ð¤ <b>${name}</b> (${branch})\n` +
      `ð Ishxonadan <b>${Math.round(dist)} metr</b> uzoqda!\n` +
      `ð ${time} | ð ${date}`
    );
    return res.json({ ok:false, error:'gps', dist:Math.round(dist) });
  }

  let earlyArrival = false, workMinutes = null, effectiveIn = null;

  if (type === 'in') {
    const nowMin = parseMin(time);
    if (nowMin < SHIFT_START) {
      earlyArrival = true;
      effectiveIn  = '14:00';
      notifyManager(
        `â° <b>ERTA KELISH</b>\n\n` +
        `ð¤ <b>${name}</b> (${branch})\n` +
        `ð Kelgan vaqt: <b>${time}</b> (smena 14:00 da)\n` +
        `ð ${date}`
      );
    } else {
      effectiveIn = time;
    }
  }

  if (type === 'out') {
    const dayFile = path.join(DATA_DIR, `${date}.json`);
    let dayData = [];
    if (fs.existsSync(dayFile)) {
      try { dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8')); } catch(e) {}
    }
    const lastIn = [...dayData].reverse().find(r => r.pin === pin && r.type === 'in');
    if (lastIn) {
      workMinutes = calcWorkMinutes(lastIn.effective_in || lastIn.time, time);
    }
  }

  // Foto saqlash
  let photoFile = null;
  if (photo && photo.startsWith('data:image')) {
    const base64 = photo.replace(/^data:image\/\w+;base64,/, '');
    photoFile = `${date}_${pin}_${type}_${Date.now()}.jpg`;
    fs.writeFileSync(path.join(PHOTOS_DIR, photoFile), Buffer.from(base64, 'base64'));
  }

  // Saqlash
  const dayFile = path.join(DATA_DIR, `${date}.json`);
  let dayData = [];
  if (fs.existsSync(dayFile)) {
    try { dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8')); } catch(e) {}
  }
  const record = { name, branch, pin, type, time, date, photo:photoFile, lat, lon,
    dist:Math.round(dist), early_arrival:earlyArrival || false };
  if (effectiveIn)    record.effective_in  = effectiveIn;
  if (workMinutes !== null) record.work_minutes = workMinutes;
  dayData.push(record);
  fs.writeFileSync(dayFile, JSON.stringify(dayData, null, 2));

  // ===== RAHBAR BOTIGA XABAR =====
  const branchEmoji = branch === 'Parus' ? 'ð¢' : 'ðï¸';
  if (type === 'in') {
    notifyManager(
      `â <b>KELDI</b>\n\n` +
      `ð¤ <b>${name}</b>\n` +
      `${branchEmoji} <b>${branch}</b>\n` +
      `ð <b>${time}</b>${earlyArrival ? ' â ï¸ (14:00 dan hisoblanadi)' : ''}\n` +
      `ð ${date}\nð ${Math.round(dist)} metr`
    );
  } else {
    const hoursStr = workMinutes !== null ? fmtHours(workMinutes) : 'â';
    notifyManager(
      `ðª <b>KETDI</b>\n\n` +
      `ð¤ <b>${name}</b>\n` +
      `${branchEmoji} <b>${branch}</b>\n` +
      `ð <b>${time}</b>\n` +
      `â± <b>${hoursStr}</b>\n` +
      `ð ${date}\nð ${Math.round(dist)} metr`
    );
  }

  res.json({ ok:true, type, name, time, work_minutes:workMinutes });
});

// ===== LOG =====
app.get('/api/log/:pin/:date', (req, res) => {
  const { pin, date } = req.params;
  const dayFile = path.join(DATA_DIR, `${date}.json`);
  if (!fs.existsSync(dayFile)) return res.json([]);
  try {
    const all = JSON.parse(fs.readFileSync(dayFile, 'utf8'));
    res.json(all.filter(r => r.pin === pin).map(r => ({
      type:r.type, time:r.time,
      effective_in:r.effective_in,
      work_minutes:r.work_minutes,
      early_arrival:r.early_arrival
    })));
  } catch(e) { res.json([]); }
});

app.get('/api/all/:date', (req, res) => {
  const dayFile = path.join(DATA_DIR, `${req.params.date}.json`);
  if (!fs.existsSync(dayFile)) return res.json([]);
  try { res.json(JSON.parse(fs.readFileSync(dayFile, 'utf8'))); }
  catch(e) { res.json([]); }
});

app.get('/api/config', (req, res) => {
  res.json({ maxDist:MAX_DIST, officeLat:OFFICE_LAT, officeLon:OFFICE_LON });
});

// ===== SERVER ISHGA TUSHIRISH =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`â Server: http://localhost:${PORT}`);
  console.log(`ð Ishxona: ${OFFICE_LAT}, ${OFFICE_LON} (${MAX_DIST}m)`);
  console.log(`ð¤ Xodimlar boti: ${EMP_BOT_TOKEN ? 'SOZLANGAN' : 'YO\'Q'}`);
  console.log(`ð Rahbar boti:   ${MGR_BOT_TOKEN ? 'SOZLANGAN' : 'YO\'Q'}`);
  console.log(`ð¢ Boss chat_id:  ${BOSS_CHAT_ID || 'YO\'Q'}`);

  // Webhook o'rnatish (agar APP_URL mavjud bo'lsa)
  if (APP_URL && EMP_BOT_TOKEN) {
    setWebhook(EMP_BOT_TOKEN, `${APP_URL}/webhook/employee`);
  }
  if (APP_URL && MGR_BOT_TOKEN) {
    setWebhook(MGR_BOT_TOKEN, `${APP_URL}/webhook/manager`);
  }
});
