const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const PHOTOS_DIR = path.join(DATA_DIR, 'photos');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PHOTOS_DIR)) fs.mkdirSync(PHOTOS_DIR, { recursive: true });

const OFFICE_LAT = parseFloat(process.env.OFFICE_LAT || '41.308056');
const OFFICE_LON = parseFloat(process.env.OFFICE_LON || '69.211075');
const MAX_DIST   = parseFloat(process.env.MAX_DIST   || '100');
const BOT_TOKEN  = process.env.BOT_TOKEN  || '';
const BOSS_CHAT_ID = process.env.BOSS_CHAT_ID || '';

// ===== XODIMLAR =====
const EMPS = [
  {n:'Muhammad Amin',      b:'Parus', p:'1001'},
  {n:'Ibrohim',            b:'Parus', p:'1002'},
  {n:'Ibrohim Stajor',     b:'Parus', p:'1003'},
  {n:'Zoxida',             b:'Parus', p:'1004'},
  {n:'Ilxom',              b:'Parus', p:'1005'},
  {n:'Kamola',             b:'Parus', p:'1006'},
  {n:'Xurshid Soyibjonov', b:'Nukus', p:'2001'},
  {n:'Dadaxon Yulchiyev',  b:'Nukus', p:'2002'},
  {n:'Mohichehra',         b:'Nukus', p:'2003'},
  {n:'Aziza',              b:'Nukus', p:'2004'},
  {n:'Aliakbar',           b:'Nukus', p:'2005'},
  {n:'Abrorbek',           b:'Nukus', p:'2006'},
  {n:'Maryam',             b:'Nukus', p:'2007'},
];

// ===== KOD TIZIMI (bot orqali login) =====
const pendingCodes = new Map(); // code -> {pin, exp}

function genCode() {
  let code;
  do { code = String(Math.floor(1000 + Math.random() * 9000)); }
  while (pendingCodes.has(code));
  return code;
}

function cleanCodes() {
  const now = Date.now();
  for (const [k, v] of pendingCodes) {
    if (now > v.exp) pendingCodes.delete(k);
  }
}

// ===== YORDAMCHI FUNKSIYALAR =====
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2
    + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function parseMin(t) { const [h,m]=t.split(':').map(Number); return h*60+m; }
function fmtHours(min) {
  const h=Math.floor(min/60), m=min%60;
  return h>0 ? h+' soat '+m+' daqiqa' : m+' daqiqa';
}
function calcWorkMinutes(inTime, outTime) {
  let inMin=parseMin(inTime), outMin=parseMin(outTime);
  if (outMin<=inMin) outMin+=24*60;
  return Math.min(outMin-inMin, 24*60);
}

// ===== TELEGRAM XABAR YUBORISH =====
function tgRequest(method, data) {
  if (!BOT_TOKEN) return;
  const body = JSON.stringify(data);
  const req = https.request({
    hostname: 'api.telegram.org',
    path: '/bot'+BOT_TOKEN+'/'+method,
    method: 'POST',
    headers: {'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}
  }, res => res.on('data',()=>{}));
  req.on('error', e => console.error('Telegram xato:', e.message));
  req.write(body); req.end();
}

function notifyBoss(text) {
  if (!BOSS_CHAT_ID) return;
  tgRequest('sendMessage', {chat_id: BOSS_CHAT_ID, text, parse_mode:'HTML'});
}

// ===== EXPRESS =====
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// ===== BOT WEBHOOK =====
app.post('/webhook', (req, res) => {
  res.sendStatus(200);
  const u = req.body;

  // /start komandasi
  if (u.message && (u.message.text === '/start' || u.message.text === '/kod')) {
    const chatId = u.message.chat.id;
    const keyboard = [];
    for (let i = 0; i < EMPS.length; i += 2) {
      const row = [{text: EMPS[i].n, callback_data: 'emp_'+EMPS[i].p}];
      if (EMPS[i+1]) row.push({text: EMPS[i+1].n, callback_data: 'emp_'+EMPS[i+1].p});
      keyboard.push(row);
    }
    tgRequest('sendMessage', {
      chat_id: chatId,
      text: '\uD83D\uDC4B Xush kelibsiz!\n\nKim ekansiz? Ismingizni tanlang:',
      reply_markup: {inline_keyboard: keyboard}
    });
  }

  // Xodim tanlash callback
  if (u.callback_query && u.callback_query.data && u.callback_query.data.startsWith('emp_')) {
    const pin = u.callback_query.data.replace('emp_','');
    const emp = EMPS.find(e => e.p === pin);
    if (!emp) return;

    cleanCodes();
    const code = genCode();
    pendingCodes.set(code, {pin, exp: Date.now() + 24*60*60*1000});

    tgRequest('answerCallbackQuery', {callback_query_id: u.callback_query.id});
    tgRequest('sendMessage', {
      chat_id: u.callback_query.message.chat.id,
      text: '\u2705 '+emp.n+' ('+emp.b+')\n\n\uD83D\uDD11 Sizning kirish kodingiz:\n\n<b>'+code+'</b>\n\n\u26A0\uFE0F Bu kodni hech kimga bermang!\nMini app\u2019ga kiriting.',
      parse_mode: 'HTML'
    });
  }
});

// Webhook ro'yxatga olish (bir marta ishlatiladi)
app.get('/setup-webhook', (req, res) => {
  const url = 'https://'+req.headers.host+'/webhook';
  const body = JSON.stringify({url, allowed_updates: ['message','callback_query']});
  const apiReq = https.request({
    hostname: 'api.telegram.org',
    path: '/bot'+BOT_TOKEN+'/setWebhook',
    method: 'POST',
    headers: {'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}
  }, apiRes => {
    let data = '';
    apiRes.on('data', d => data+=d);
    apiRes.on('end', () => {
      console.log('Webhook setup:', data);
      res.json({url, result: JSON.parse(data)});
    });
  });
  apiReq.on('error', e => res.json({error: e.message}));
  apiReq.write(body); apiReq.end();
});

// ===== KOD TEKSHIRISH =====
app.post('/verify-code', (req, res) => {
  cleanCodes();
  const code = String(req.body.code || '').trim();
  if (!code) return res.json({ok:false, msg:"Kod kiritilmadi"});
  const entry = pendingCodes.get(code);
  if (!entry) return res.json({ok:false, msg:"Kod notogri yoki muddati otgan"});
  const emp = EMPS.find(e => e.p === entry.pin);
  if (!emp) return res.json({ok:false, msg:"Xodim topilmadi"});
  res.json({ok:true, emp:{n:emp.n, b:emp.b, p:emp.p}});
});

// ===== GPS TEKSHIRISH =====
app.post('/api/check-gps', (req, res) => {
  const {lat,lon} = req.body;
  const dist = distance(OFFICE_LAT,OFFICE_LON,parseFloat(lat),parseFloat(lon));
  res.json(dist>MAX_DIST ? {ok:false,dist:Math.round(dist)} : {ok:true,dist:Math.round(dist)});
});

// ===== KELDI/KETDI =====
app.post('/api/checkin', (req, res) => {
  const {name,branch,pin,type,time,date,photo,lat,lon} = req.body;
  const dist = distance(OFFICE_LAT,OFFICE_LON,parseFloat(lat),parseFloat(lon));
  if (dist > MAX_DIST) {
    notifyBoss('\uD83D\uDEA8 <b>GPS FIRIBGARI!</b>\n\n\uD83D\uDC64 <b>'+name+'</b> ('+branch+')\n\uD83D\uDCCD '+Math.round(dist)+' metr uzoqda\n\uD83D\uDD50 '+time+' | \uD83D\uDCC5 '+date);
    return res.json({ok:false,error:'gps',dist:Math.round(dist),msg:"\u26A0\uFE0F GPS xato! Siz boshqa joydasiz."});
  }

  let workMinutes = null;
  if (type === 'out') {
    const df = path.join(DATA_DIR, date+'.json');
    let dd = [];
    if (fs.existsSync(df)) try { dd=JSON.parse(fs.readFileSync(df,'utf8')); } catch(e){}
    const lastIn = [...dd].reverse().find(r => r.pin===pin && r.type==='in');
    if (lastIn) workMinutes = calcWorkMinutes(lastIn.time, time);
  }

  let photoFile = null;
  if (photo && photo.startsWith('data:image')) {
    try {
      const b64 = photo.replace(/^data:image\/\w+;base64,/,'');
      photoFile = date+'_'+pin+'_'+type+'_'+Date.now()+'.jpg';
      fs.writeFileSync(path.join(PHOTOS_DIR, photoFile), Buffer.from(b64,'base64'));
    } catch(e) { console.error('Foto xato:', e.message); }
  }

  const df = path.join(DATA_DIR, date+'.json');
  let dd = [];
  if (fs.existsSync(df)) try { dd=JSON.parse(fs.readFileSync(df,'utf8')); } catch(e){}
  const rec = {name,branch,pin,type,time,date,photo:photoFile,lat,lon,dist:Math.round(dist)};
  if (workMinutes!==null) rec.work_minutes = workMinutes;
  dd.push(rec);
  try { fs.writeFileSync(df, JSON.stringify(dd,null,2)); } catch(e) { console.error('Saqlash xato:', e.message); }

  const bEmoji = branch==='Parus' ? '\uD83C\uDFE2' : '\uD83C\uDFD7\uFE0F';
  if (type==='in') {
    notifyBoss('\u2705 <b>KELDI</b>\n\n\uD83D\uDC64 <b>'+name+'</b>\n'+bEmoji+' <b>'+branch+'</b>\n\uD83D\uDD50 <b>'+time+'</b>\n\uD83D\uDCC5 '+date+'\n\uD83D\uDCCD '+Math.round(dist)+' metr');
  } else {
    notifyBoss('\uD83D\uDEAA <b>KETDI</b>\n\n\uD83D\uDC64 <b>'+name+'</b>\n'+bEmoji+' <b>'+branch+'</b>\n\uD83D\uDD50 <b>'+time+'</b>\n\u23F1 '+(workMinutes?fmtHours(workMinutes):'—')+'\n\uD83D\uDCC5 '+date+'\n\uD83D\uDCCD '+Math.round(dist)+' metr');
  }
  res.json({ok:true, type, name, time, work_minutes:workMinutes});
});

// ===== LOG =====
app.get('/api/log/:pin/:date', (req, res) => {
  const {pin,date} = req.params;
  const df = path.join(DATA_DIR, date+'.json');
  if (!fs.existsSync(df)) return res.json([]);
  try {
    const all = JSON.parse(fs.readFileSync(df,'utf8'));
    res.json(all.filter(r=>r.pin===pin).map(r=>({type:r.type,time:r.time,work_minutes:r.work_minutes})));
  } catch(e) { res.json([]); }
});

app.get('/api/all/:date', (req, res) => {
  const df = path.join(DATA_DIR, req.params.date+'.json');
  if (!fs.existsSync(df)) return res.json([]);
  try { res.json(JSON.parse(fs.readFileSync(df,'utf8'))); } catch(e) { res.json([]); }
});

app.get('/api/config', (req, res) => {
  res.json({maxDist:MAX_DIST, officeLat:OFFICE_LAT, officeLon:OFFICE_LON});
});

app.listen(PORT,'0.0.0.0',()=>{
  console.log('\u2705 Server: http://localhost:'+PORT);
  console.log('\uD83D\uDCCD Ishxona: '+OFFICE_LAT+', '+OFFICE_LON+' ('+MAX_DIST+'m)');
  console.log('\uD83E\uDD16 Webhook: /setup-webhook ga kiring');
});
