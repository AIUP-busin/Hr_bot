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
const MAX_DIST     = parseFloat(process.env.MAX_DIST      || '10');   // 10 metr radius

const BOT_TOKEN    = process.env.BOT_TOKEN    || '';
const BOSS_CHAT_ID = process.env.BOSS_CHAT_ID || '';

// ===== SMENA VAQTI: 14:00 — 00:30 (ertangi kun) =====
const SHIFT_START = 14 * 60;        // 840 daqiqa
const SHIFT_END   = 24 * 60 + 30;   // 1470 daqiqa (00:30 keyingi kun)

// ===== HAVERSINE =====
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2
          + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ===== VAQT YORDAMCHILARI =====
function parseMin(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}
function fmtHours(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h} soat ${m} daqiqa` : `${m} daqiqa`;
}

// ===== ISH SOATINI HISOBLASH =====
// Kirish: "HH:MM" string lar
// Chiqish: ish daqiqalari (smena: 14:00 - 00:30)
function calcWorkMinutes(inTime, outTime) {
  let inMin  = parseMin(inTime);
  let outMin = parseMin(outTime);

  // 00:00–00:30 oralig'i = keyingi kun, +24 soat
  if (outMin <= 90) outMin += 24 * 60;

  // Smena doirasiga cheklash
  const effectiveIn  = Math.max(inMin,  SHIFT_START);
  const effectiveOut = Math.min(outMin, SHIFT_END);

  if (effectiveOut <= effectiveIn) return 0;
  return effectiveOut - effectiveIn;
}

// ===== TELEGRAM XABAR =====
function notifyBoss(text) {
  if (!BOT_TOKEN || !BOSS_CHAT_ID) return;
  const body = JSON.stringify({ chat_id: BOSS_CHAT_ID, text, parse_mode: 'HTML' });
  const req = https.request({
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, res => res.on('data', () => {}));
  req.on('error', e => console.error('Telegram xato:', e.message));
  req.write(body); req.end();
}

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== GPS TEKSHIRISH =====
app.post('/api/check-gps', (req, res) => {
  const { lat, lon } = req.body;
  const dist = distance(OFFICE_LAT, OFFICE_LON, parseFloat(lat), parseFloat(lon));
  if (dist > MAX_DIST) {
    return res.json({
      ok: false, dist: Math.round(dist),
      msg: "⚠️ Iltimos, yolg'ondan qo'rqing!\n\nSiz hozir boshqa joydasiz. Siz qilayotgan hamma narsa rahbarga boradi!"
    });
  }
  res.json({ ok: true, dist: Math.round(dist) });
});

// ===== KELDI / KETDI =====
app.post('/api/checkin', (req, res) => {
  const { name, branch, pin, type, time, date, photo, lat, lon } = req.body;

  // GPS (server tomonida asosiy himoya)
  const dist = distance(OFFICE_LAT, OFFICE_LON, parseFloat(lat), parseFloat(lon));
  if (dist > MAX_DIST) {
    notifyBoss(
      `🚨 <b>OGOHLANTIRISH — GPS FIRIBGARI!</b>\n\n` +
      `👤 <b>${name}</b> (${branch})\n` +
      `📍 Ishxonadan <b>${Math.round(dist)} metr</b> uzoqda turib davomat qayd etishga urindi!\n` +
      `🕐 ${time} | 📅 ${date}`
    );
    return res.json({
      ok: false, error: 'gps', dist: Math.round(dist),
      msg: "⚠️ Iltimos, yolg'ondan qo'rqing!\n\nSiz hozir boshqa joydasiz. Siz qilayotgan hamma narsa rahbarga boradi!"
    });
  }

  // ===== VAQT MANTIQ =====
  const nowMin  = parseMin(time);
  let   earlyArrival = false;
  let   workMinutes  = null;   // faqat KETDI bosganida hisoblanadi
  let   effectiveIn  = null;   // faqat KELDI uchun saqlanadi

  if (type === 'in') {
    // Kelish vaqtini tekshirish
    if (nowMin < SHIFT_START) {
      // Vaqtidan OLDIN keldi — bosga xabar, lekin bloklamaymiz
      earlyArrival = true;
      effectiveIn  = '14:00';   // smena boshidan hisoblaymiz
      notifyBoss(
        `⏰ <b>ERTA KELISH XABARI</b>\n\n` +
        `👤 <b>${name}</b> (${branch})\n` +
        `🕐 Kelgan vaqt: <b>${time}</b> (smena 14:00 dan boshlanadi)\n` +
        `📍 Masofa: ${Math.round(dist)} metr\n` +
        `📅 ${date}\n\n` +
        `ℹ️ Ish vaqti 14:00 dan hisoblanadi.`
      );
    } else {
      effectiveIn = time;   // o'z vaqtida keldi
    }
  }

  if (type === 'out') {
    // KETDI — KELDI ni topib soat hisoblaymiz
    const dayFile = path.join(DATA_DIR, `${date}.json`);
    let dayData = [];
    if (fs.existsSync(dayFile)) {
      try { dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8')); } catch(e) {}
    }
    const lastIn = [...dayData].reverse().find(r => r.pin === pin && r.type === 'in');
    if (lastIn) {
      const inEffective = lastIn.effective_in || lastIn.time;
      workMinutes = calcWorkMinutes(inEffective, time);
    }
  }

  // Foto saqlash
  let photoFile = null;
  if (photo && photo.startsWith('data:image')) {
    const base64 = photo.replace(/^data:image\/\w+;base64,/, '');
    photoFile = `${date}_${pin}_${type}_${Date.now()}.jpg`;
    fs.writeFileSync(path.join(PHOTOS_DIR, photoFile), Buffer.from(base64, 'base64'));
  }

  // Ma'lumotni saqlash
  const dayFile = path.join(DATA_DIR, `${date}.json`);
  let dayData   = [];
  if (fs.existsSync(dayFile)) {
    try { dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8')); } catch(e) {}
  }
  const record = {
    name, branch, pin, type, time, date,
    photo: photoFile, lat, lon,
    dist: Math.round(dist),
    early_arrival: earlyArrival || false
  };
  if (effectiveIn)  record.effective_in = effectiveIn;
  if (workMinutes !== null) record.work_minutes = workMinutes;

  dayData.push(record);
  fs.writeFileSync(dayFile, JSON.stringify(dayData, null, 2));

  // ===== BOSGA XABAR =====
  if (type === 'in') {
    const branchEmoji = branch === 'Parus' ? '🏢' : '🏗️';
    notifyBoss(
      `✅ <b>KELDI</b>\n\n` +
      `👤 <b>${name}</b>\n` +
      `${branchEmoji} Filial: <b>${branch}</b>\n` +
      `🕐 Kelgan vaqt: <b>${time}</b>${earlyArrival ? ' ⚠️ (14:00 dan hisoblanadi)' : ''}\n` +
      `📅 Sana: <b>${date}</b>\n` +
      `📍 Masofa: <b>${Math.round(dist)} metr</b>`
    );
  } else {
    const hoursStr = workMinutes !== null ? fmtHours(workMinutes) : '—';
    const branchEmoji = branch === 'Parus' ? '🏢' : '🏗️';
    notifyBoss(
      `🚪 <b>KETDI</b>\n\n` +
      `👤 <b>${name}</b>\n` +
      `${branchEmoji} Filial: <b>${branch}</b>\n` +
      `🕐 Ketgan vaqt: <b>${time}</b>\n` +
      `⏱ Ish soati: <b>${hoursStr}</b>\n` +
      `📅 Sana: <b>${date}</b>\n` +
      `📍 Masofa: <b>${Math.round(dist)} metr</b>`
    );
  }

  res.json({ ok: true, type, name, time, work_minutes: workMinutes });
});

// ===== LOG =====
app.get('/api/log/:pin/:date', (req, res) => {
  const { pin, date } = req.params;
  const dayFile = path.join(DATA_DIR, `${date}.json`);
  if (!fs.existsSync(dayFile)) return res.json([]);
  try {
    const all = JSON.parse(fs.readFileSync(dayFile, 'utf8'));
    res.json(all.filter(r => r.pin === pin).map(r => ({
      type: r.type, time: r.time,
      effective_in: r.effective_in,
      work_minutes: r.work_minutes,
      early_arrival: r.early_arrival
    })));
  } catch(e) { res.json([]); }
});

// ===== BARCHA QAYDLAR =====
app.get('/api/all/:date', (req, res) => {
  const dayFile = path.join(DATA_DIR, `${req.params.date}.json`);
  if (!fs.existsSync(dayFile)) return res.json([]);
  try { res.json(JSON.parse(fs.readFileSync(dayFile, 'utf8'))); }
  catch(e) { res.json([]); }
});

app.get('/api/config', (req, res) => {
  res.json({ maxDist: MAX_DIST, officeLat: OFFICE_LAT, officeLon: OFFICE_LON });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`📍 Ishxona: ${OFFICE_LAT}, ${OFFICE_LON} (${MAX_DIST}m radius)`);
  console.log(`🕐 Smena: 14:00 — 00:30`);
  console.log(`📢 Boss: ${BOSS_CHAT_ID || 'SOZLANMAGAN'}`);
});
