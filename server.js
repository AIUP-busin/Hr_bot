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

const OFFICE_LAT  = parseFloat(process.env.OFFICE_LAT  || '41.308056');
const OFFICE_LON  = parseFloat(process.env.OFFICE_LON  || '69.211075');
const MAX_DIST    = parseFloat(process.env.MAX_DIST    || '100');
const BOT_TOKEN   = process.env.BOT_TOKEN   || '';
const BOSS_CHAT_ID = process.env.BOSS_CHAT_ID || '';
const APP_URL     = 'https://hrbot-production-4126.up.railway.app';

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
const BRANCHES = ['Parus', 'Nukus'];

// ===== BOT TILLAR VA XABARLAR =====
const MSG = {
  uz: {
    guide: "\uD83D\uDCCB Bot bilan ishlash qoidasi:\n\n1\uFE0F\u20E3 'filial' deb yozing\n2\uFE0F\u20E3 Filialni tanlang\n3\uFE0F\u20E3 'ishchi' deb yozing\n4\uFE0F\u20E3 Ismingizni kiriting\n5\uFE0F\u20E3 Kod olib mini appga kiring",
    typeFilial: "Boshlash uchun 'filial' deb yozing:",
    branchAsk:  "Qaysi filialdansiz? \uD83C\uDFE2",
    afterBranch:"\u2705 Filial tanlandi! Endi 'ishchi' deb yozing:",
    typeIshchi: "'ishchi' deb yozing:",
    nameAsk:    "Ismingizni to'liq kiriting \uD83D\uDC64",
    notFound:   "\u274C Siz bizning ro'yxatimizda yo'qsiz!\n\nRahbar bilan bog'laning.",
    nameRetry:  "Ism topilmadi. Qaytadan kiriting:",
    manyFound:  "Bir nechta mos topildi. Aniqroq yozing:\n",
    codeSent:   "\u2705 {name}!\n\n\uD83D\uDD11 Sizning kirish kodingiz:\n\n<b>{code}</b>\n\nQuyidagi tugmani bosing:",
    openApp:    "\uD83D\uDCF1 Mini Appni ochish",
    wrongCmd:   "Iltimos, 'filial' deb yozing.",
    noStart:    "/start bosing yoki yozing.",
  },
  ru: {
    guide: "\uD83D\uDCCB \u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0431\u043E\u0442\u0430:\n\n1\uFE0F\u20E3 \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 'filial'\n2\uFE0F\u20E3 \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0438\u043B\u0438\u0430\u043B\n3\uFE0F\u20E3 \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 'ishchi'\n4\uFE0F\u20E3 \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F\n5\uFE0F\u20E3 \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438 \u0432\u043E\u0439\u0434\u0438\u0442\u0435",
    typeFilial: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 'filial':",
    branchAsk:  "\u0418\u0437 \u043A\u0430\u043A\u043E\u0433\u043E \u0432\u044B \u0444\u0438\u043B\u0438\u0430\u043B\u0430? \uD83C\uDFE2",
    afterBranch:"\u2705 \u0424\u0438\u043B\u0438\u0430\u043B \u0432\u044B\u0431\u0440\u0430\u043D! \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 'ishchi':",
    typeIshchi: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 'ishchi':",
    nameAsk:    "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F \uD83D\uDC64",
    notFound:   "\u274C \u0412\u0430\u0441 \u043D\u0435\u0442 \u0432 \u043D\u0430\u0448\u0435\u043C \u0441\u043F\u0438\u0441\u043A\u0435!\n\u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E.",
    nameRetry:  "\u0418\u043C\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435:",
    manyFound:  "\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E. \u0423\u0442\u043E\u0447\u043D\u0438\u0442\u0435:\n",
    codeSent:   "\u2705 {name}!\n\n\uD83D\uDD11 \u0412\u0430\u0448 \u043A\u043E\u0434 \u0432\u0445\u043E\u0434\u0430:\n\n<b>{code}</b>\n\n\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443:",
    openApp:    "\uD83D\uDCF1 \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
    wrongCmd:   "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 'filial'.",
    noStart:    "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 /start",
  },
  en: {
    guide: "\uD83D\uDCCB Bot usage guide:\n\n1\uFE0F\u20E3 Type 'filial'\n2\uFE0F\u20E3 Select branch\n3\uFE0F\u20E3 Type 'ishchi'\n4\uFE0F\u20E3 Enter your name\n5\uFE0F\u20E3 Get code and open mini app",
    typeFilial: "Type 'filial' to begin:",
    branchAsk:  "Which branch? \uD83C\uDFE2",
    afterBranch:"\u2705 Branch selected! Now type 'ishchi':",
    typeIshchi: "Type 'ishchi':",
    nameAsk:    "Enter your full name \uD83D\uDC64",
    notFound:   "\u274C You are not in our list!\nContact your manager.",
    nameRetry:  "Name not found. Try again:",
    manyFound:  "Multiple found. Be more specific:\n",
    codeSent:   "\u2705 {name}!\n\n\uD83D\uDD11 Your login code:\n\n<b>{code}</b>\n\nPress the button:",
    openApp:    "\uD83D\uDCF1 Open Mini App",
    wrongCmd:   "Please type 'filial'.",
    noStart:    "Type /start to begin.",
  }
};

// ===== KOD TIZIMI =====
const pendingCodes = new Map();
const userStates   = new Map();

function genCode() {
  let code;
  do { code = String(Math.floor(1000 + Math.random() * 9000)); }
  while (pendingCodes.has(code));
  return code;
}
function cleanCodes() {
  const now = Date.now();
  for (const [k,v] of pendingCodes) if (now > v.exp) pendingCodes.delete(k);
}

// ===== YORDAMCHI FUNKSIYALAR =====
function distance(lat1,lon1,lat2,lon2){
  const R=6371000,dLat=(lat2-lat1)*Math.PI/180,dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function parseMin(t){const[h,m]=t.split(':').map(Number);return h*60+m;}
function fmtHours(min){const h=Math.floor(min/60),m=min%60;return h>0?h+' soat '+m+' daqiqa':m+' daqiqa';}
function calcWorkMinutes(inTime,outTime){
  let inMin=parseMin(inTime),outMin=parseMin(outTime);
  if(outMin<=inMin)outMin+=24*60;
  return Math.min(outMin-inMin,24*60);
}

// ===== TELEGRAM =====
function tgRequest(method, data) {
  if (!BOT_TOKEN) return;
  const body = JSON.stringify(data);
  const req = https.request({
    hostname: 'api.telegram.org',
    path: '/bot'+BOT_TOKEN+'/'+method,
    method: 'POST',
    headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}
  }, res => res.on('data',()=>{}));
  req.on('error', e => console.error('TG xato:', e.message));
  req.write(body); req.end();
}
function notifyBoss(text) {
  if (BOSS_CHAT_ID) tgRequest('sendMessage',{chat_id:BOSS_CHAT_ID,text,parse_mode:'HTML'});
}

// ===== EXPRESS =====
app.use(express.json({limit:'50mb'}));
app.use(express.static(__dirname));

// ===== BOT WEBHOOK =====
app.post('/webhook', (req, res) => {
  res.sendStatus(200);
  const u = req.body;

  // --- Callback Queries ---
  if (u.callback_query) {
    const cq = u.callback_query;
    const chatId = cq.message.chat.id;
    const userId = cq.from.id;
    const d = cq.data || '';
    tgRequest('answerCallbackQuery', {callback_query_id: cq.id});
    const st = userStates.get(userId) || {state:null, lang:'uz', branch:null};

    if (d.startsWith('lang_')) {
      const lang = d.slice(5);
      userStates.set(userId, {state:'await_filial', lang, branch:null});
      const m = MSG[lang] || MSG.uz;
      tgRequest('sendMessage', {chat_id:chatId, text:m.guide});
      setTimeout(()=>tgRequest('sendMessage',{chat_id:chatId,text:m.typeFilial}), 600);
    }
    if (d.startsWith('branch_')) {
      const branch = d.slice(7);
      const lang = st.lang || 'uz';
      userStates.set(userId, {state:'await_ishchi', lang, branch});
      tgRequest('sendMessage', {chat_id:chatId, text:(MSG[lang]||MSG.uz).afterBranch});
    }
    return;
  }

  // --- Text Messages ---
  if (!u.message || !u.message.text) return;
  const chatId = u.message.chat.id;
  const userId = u.message.from.id;
  const rawText = u.message.text.trim();
  const text = rawText.toLowerCase();
  const st = userStates.get(userId) || {state:null, lang:'uz', branch:null};
  const m = MSG[st.lang || 'uz'] || MSG.uz;

  // /start
  if (text === '/start') {
    userStates.delete(userId);
    tgRequest('sendMessage', {
      chat_id: chatId,
      text: "Assalomu Alaykum! Yaxshimisiz? \uD83D\uDC4B\n\nTilni tanlang:",
      reply_markup: {inline_keyboard:[[
        {text:"\uD83C\uDDFA\uD83C\uDDFF O'zbek", callback_data:'lang_uz'},
        {text:'\uD83C\uDDF7\uD83C\uDDFA \u0420\u0443\u0441\u0441\u043A\u0438\u0439', callback_data:'lang_ru'},
        {text:'\uD83C\uDDEC\uD83C\uDDE7 English', callback_data:'lang_en'}
      ]]}
    });
    return;
  }

  // State: null — no state yet
  if (!st.state) {
    tgRequest('sendMessage',{chat_id:chatId, text:m.noStart}); return;
  }

  // State: await_filial
  if (st.state === 'await_filial') {
    if (text === 'filial') {
      userStates.set(userId, {...st, state:'await_branch'});
      tgRequest('sendMessage',{
        chat_id:chatId, text:m.branchAsk,
        reply_markup:{inline_keyboard: BRANCHES.map(b=>[{text:b, callback_data:'branch_'+b}])}
      });
    } else {
      tgRequest('sendMessage',{chat_id:chatId, text:m.wrongCmd});
    }
    return;
  }

  // State: await_ishchi
  if (st.state === 'await_ishchi') {
    if (text === 'ishchi') {
      userStates.set(userId, {...st, state:'await_name'});
      tgRequest('sendMessage',{chat_id:chatId, text:m.nameAsk});
    } else {
      tgRequest('sendMessage',{chat_id:chatId, text:m.typeIshchi});
    }
    return;
  }

  // State: await_name
  if (st.state === 'await_name') {
    const input = rawText.toLowerCase();
    const hits = EMPS.filter(e => {
      const eLow = e.n.toLowerCase();
      const match = eLow === input || eLow.includes(input) || input.includes(eLow.split(' ')[0]);
      return match && (!st.branch || e.b === st.branch);
    });
    if (hits.length === 1) {
      const emp = hits[0];
      cleanCodes();
      const code = genCode();
      pendingCodes.set(code, {pin:emp.p, exp:Date.now()+24*60*60*1000});
      userStates.delete(userId);
      const txt = m.codeSent.replace('{name}',emp.n).replace('{code}',code);
      tgRequest('sendMessage',{
        chat_id:chatId, text:txt, parse_mode:'HTML',
        reply_markup:{inline_keyboard:[[{text:m.openApp, web_app:{url:APP_URL}}]]}
      });
    } else if (hits.length > 1) {
      tgRequest('sendMessage',{chat_id:chatId, text:m.manyFound+hits.map(e=>e.n).join('\n')});
    } else {
      userStates.delete(userId);
      tgRequest('sendMessage',{chat_id:chatId, text:m.notFound});
    }
    return;
  }
});

// Webhook sozlash (bir marta)
app.get('/setup-webhook', (req,res) => {
  const url = 'https://'+req.headers.host+'/webhook';
  const body = JSON.stringify({url, allowed_updates:['message','callback_query']});
  const r = https.request({hostname:'api.telegram.org',path:'/bot'+BOT_TOKEN+'/setWebhook',method:'POST',
    headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}
  }, apiRes => {let d='';apiRes.on('data',x=>d+=x);apiRes.on('end',()=>res.json({url,result:JSON.parse(d)}));});
  r.on('error',e=>res.json({error:e.message})); r.write(body); r.end();
});

// ===== KOD TEKSHIRISH =====
app.post('/verify-code', (req,res) => {
  cleanCodes();
  const code = String(req.body.code||'').trim();
  if (!code) return res.json({ok:false,msg:'Kod kiritilmadi'});
  const entry = pendingCodes.get(code);
  if (!entry) return res.json({ok:false,msg:'Kod xato yoki muddati tugagan'});
  const emp = EMPS.find(e=>e.p===entry.pin);
  if (!emp) return res.json({ok:false,msg:'Xodim topilmadi'});
  res.json({ok:true, emp:{n:emp.n,b:emp.b,p:emp.p}});
});

// ===== GPS =====
app.post('/api/check-gps', (req,res) => {
  const {lat,lon}=req.body;
  const dist=distance(OFFICE_LAT,OFFICE_LON,parseFloat(lat),parseFloat(lon));
  res.json(dist>MAX_DIST?{ok:false,dist:Math.round(dist)}:{ok:true,dist:Math.round(dist)});
});

// ===== KELDI/KETDI =====
app.post('/api/checkin', (req,res) => {
  const {name,branch,pin,type,time,date,photo,lat,lon}=req.body;
  const dist=distance(OFFICE_LAT,OFFICE_LON,parseFloat(lat),parseFloat(lon));
  if(dist>MAX_DIST){
    notifyBoss('\uD83D\uDEA8 <b>GPS FIRIBGARI!</b>\n\n\uD83D\uDC64 <b>'+name+'</b> ('+branch+')\n\uD83D\uDCCD '+Math.round(dist)+' metr\n\uD83D\uDD50 '+time);
    return res.json({ok:false,error:'gps',dist:Math.round(dist),msg:'\u26A0\uFE0F GPS xato!'});
  }
  let workMinutes=null;
  if(type==='out'){
    const df=path.join(DATA_DIR,date+'.json'); let dd=[];
    if(fs.existsSync(df)) try{dd=JSON.parse(fs.readFileSync(df,'utf8'));}catch(e){}
    const lastIn=[...dd].reverse().find(r=>r.pin===pin&&r.type==='in');
    if(lastIn) workMinutes=calcWorkMinutes(lastIn.time,time);
  }
  let photoFile=null;
  if(photo&&photo.startsWith('data:image')){
    try{const b64=photo.replace(/^data:image\/\w+;base64,/,'');
    photoFile=date+'_'+pin+'_'+type+'_'+Date.now()+'.jpg';
    fs.writeFileSync(path.join(PHOTOS_DIR,photoFile),Buffer.from(b64,'base64'));}
    catch(e){console.error('Foto xato:',e.message);}
  }
  const df=path.join(DATA_DIR,date+'.json'); let dd=[];
  if(fs.existsSync(df)) try{dd=JSON.parse(fs.readFileSync(df,'utf8'));}catch(e){}
  const rec={name,branch,pin,type,time,date,photo:photoFile,lat,lon,dist:Math.round(dist)};
  if(workMinutes!==null) rec.work_minutes=workMinutes;
  dd.push(rec);
  try{fs.writeFileSync(df,JSON.stringify(dd,null,2));}catch(e){console.error('Saqlash xato:',e.message);}
  const bE=branch==='Parus'?'\uD83C\uDFE2':'\uD83C\uDFD7\uFE0F';
  if(type==='in'){
    notifyBoss('\u2705 <b>KELDI</b>\n\n\uD83D\uDC64 <b>'+name+'</b>\n'+bE+' <b>'+branch+'</b>\n\uD83D\uDD50 <b>'+time+'</b>\n\uD83D\uDCC5 '+date+'\n\uD83D\uDCCD '+Math.round(dist)+' metr');
  } else {
    notifyBoss('\uD83D\uDEAA <b>KETDI</b>\n\n\uD83D\uDC64 <b>'+name+'</b>\n'+bE+' <b>'+branch+'</b>\n\uD83D\uDD50 <b>'+time+'</b>\n\u23F1 '+(workMinutes?fmtHours(workMinutes):'\u2014')+'\n\uD83D\uDCC5 '+date);
  }
  res.json({ok:true,type,name,time,work_minutes:workMinutes});
});

app.get('/api/log/:pin/:date', (req,res) => {
  const {pin,date}=req.params;
  const df=path.join(DATA_DIR,date+'.json');
  if(!fs.existsSync(df)) return res.json([]);
  try{const all=JSON.parse(fs.readFileSync(df,'utf8'));
    res.json(all.filter(r=>r.pin===pin).map(r=>({type:r.type,time:r.time,work_minutes:r.work_minutes})));
  }catch(e){res.json([]);}
});
app.get('/api/all/:date', (req,res) => {
  const df=path.join(DATA_DIR,req.params.date+'.json');
  if(!fs.existsSync(df)) return res.json([]);
  try{res.json(JSON.parse(fs.readFileSync(df,'utf8')));}catch(e){res.json([]);}
});
app.get('/api/config', (req,res) => {
  res.json({maxDist:MAX_DIST,officeLat:OFFICE_LAT,officeLon:OFFICE_LON});
});

app.listen(PORT,'0.0.0.0',()=>{
  console.log('\u2705 Server: http://localhost:'+PORT);
  console.log('\uD83E\uDD16 Webhook sozlash: /setup-webhook');
});
