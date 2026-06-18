const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const https    = require('https');
const app      = express();
const PORT     = process.env.PORT || 3000;

const DATA_DIR   = path.join(__dirname, 'data');
const PHOTOS_DIR = path.join(DATA_DIR, 'photos');
if (!fs.existsSync(DATA_DIR))   fs.mkdirSync(DATA_DIR,   { recursive: true });
if (!fs.existsSync(PHOTOS_DIR)) fs.mkdirSync(PHOTOS_DIR, { recursive: true });

const OFFICE_LAT   = parseFloat(process.env.OFFICE_LAT   || '41.308056');
const OFFICE_LON   = parseFloat(process.env.OFFICE_LON   || '69.211075');
const MAX_DIST     = parseFloat(process.env.MAX_DIST      || '100');
const BOT_TOKEN    = process.env.BOT_TOKEN    || '';
const BOSS_CHAT_ID = process.env.BOSS_CHAT_ID || '';
const SHIFT_START  = 14 * 60;
const SHIFT_END    = 24 * 60 + 30;

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2
          + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function parseMin(t) { const [h,m]=t.split(':').map(Number); return h*60+m; }
function fmtHours(min) {
  const h=Math.floor(min/60),m=min%60;
  return h>0?`${h} soat ${m} daqiqa`:`${m} daqiqa`;
}
function calcWorkMinutes(inTime, outTime) {
  let inMin=parseMin(inTime), outMin=parseMin(outTime);
  if(outMin<=90) outMin+=24*60;
  const effIn=Math.max(inMin,SHIFT_START), effOut=Math.min(outMin,SHIFT_END);
  return effOut<=effIn ? 0 : effOut-effIn;
}
function notifyBoss(text) {
  if(!BOT_TOKEN||!BOSS_CHAT_ID) return;
  const body=JSON.stringify({chat_id:BOSS_CHAT_ID,text,parse_mode:'HTML'});
  const req=https.request({
    hostname:'api.telegram.org',
    path:`/bot${BOT_TOKEN}/sendMessage`,
    method:'POST',
    headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}
  },res=>res.on('data',()=>{}));
  req.on('error',e=>console.error('Telegram xato:',e.message));
  req.write(body); req.end();
}

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

app.post('/api/check-gps', (req, res) => {
  const {lat,lon}=req.body;
  const dist=distance(OFFICE_LAT,OFFICE_LON,parseFloat(lat),parseFloat(lon));
  res.json(dist>MAX_DIST ? {ok:false,dist:Math.round(dist)} : {ok:true,dist:Math.round(dist)});
});

app.post('/api/checkin', (req, res) => {
  const {name,branch,pin,type,time,date,photo,lat,lon}=req.body;
  const dist=distance(OFFICE_LAT,OFFICE_LON,parseFloat(lat),parseFloat(lon));
  if(dist>MAX_DIST){
    notifyBoss(`🚨 <b>GPS FIRIBGARI!</b>\n\n👤 <b>${name}</b> (${branch})\n📍 ${Math.round(dist)} metr uzoqda\n🕐 ${time} | 📅 ${date}`);
    return res.json({ok:false,error:'gps',dist:Math.round(dist),msg:"⚠️ Iltimos, yolg'ondan qo'rqing!\n\nSiz hozir boshqa joydasiz. Siz qilayotgan hamma narsa rahbarga boradi!"});
  }
  const nowMin=parseMin(time);
  let earlyArrival=false, effectiveIn=null, workMinutes=null;
  if(type==='in'){
    if(nowMin<SHIFT_START){
      earlyArrival=true; effectiveIn='14:00';
      notifyBoss(`⏰ <b>ERTA KELISH</b>\n\n👤 <b>${name}</b> (${branch})\n🕐 ${time} (14:00 dan)\n📅 ${date}`);
    } else { effectiveIn=time; }
  }
  if(type==='out'){
    const df=path.join(DATA_DIR,`${date}.json`);
    let dd=[];
    if(fs.existsSync(df)) try{dd=JSON.parse(fs.readFileSync(df,'utf8'));}catch(e){}
    const lastIn=[...dd].reverse().find(r=>r.pin===pin&&r.type==='in');
    if(lastIn) workMinutes=calcWorkMinutes(lastIn.effective_in||lastIn.time,time);
  }
  let photoFile=null;
  if(photo&&photo.startsWith('data:image')){
    try{
      const b64=photo.replace(/^data:image\/\w+;base64,/,'');
      photoFile=`${date}_${pin}_${type}_${Date.now()}.jpg`;
      fs.writeFileSync(path.join(PHOTOS_DIR,photoFile),Buffer.from(b64,'base64'));
    }catch(e){ console.error('Foto saqlash xato:',e.message); }
  }
  const df=path.join(DATA_DIR,`${date}.json`);
  let dd=[];
  if(fs.existsSync(df)) try{dd=JSON.parse(fs.readFileSync(df,'utf8'));}catch(e){}
  const rec={name,branch,pin,type,time,date,photo:photoFile,lat,lon,dist:Math.round(dist),early_arrival:earlyArrival};
  if(effectiveIn) rec.effective_in=effectiveIn;
  if(workMinutes!==null) rec.work_minutes=workMinutes;
  dd.push(rec);
  try{ fs.writeFileSync(df,JSON.stringify(dd,null,2)); }catch(e){ console.error('Ma\'lumot saqlash xato:',e.message); }
  const bEmoji=branch==='Parus'?'🏢':'🏗️';
  if(type==='in'){
    notifyBoss(`✅ <b>KELDI</b>\n\n👤 <b>${name}</b>\n${bEmoji} <b>${branch}</b>\n🕐 <b>${time}</b>${earlyArrival?' ⚠️ (14:00 dan hisoblanadi)':''}\n📅 ${date}\n📍 ${Math.round(dist)} metr`);
  } else {
    notifyBoss(`🚪 <b>KETDI</b>\n\n👤 <b>${name}</b>\n${bEmoji} <b>${branch}</b>\n🕐 <b>${time}</b>\n⏱ ${workMinutes?fmtHours(workMinutes):'—'}\n📅 ${date}\n📍 ${Math.round(dist)} metr`);
  }
  res.json({ok:true,type,name,time,work_minutes:workMinutes});
});

app.get('/api/log/:pin/:date', (req, res) => {
  const {pin,date}=req.params;
  const df=path.join(DATA_DIR,`${date}.json`);
  if(!fs.existsSync(df)) return res.json([]);
  try{
    const all=JSON.parse(fs.readFileSync(df,'utf8'));
    res.json(all.filter(r=>r.pin===pin).map(r=>({type:r.type,time:r.time,effective_in:r.effective_in,work_minutes:r.work_minutes,early_arrival:r.early_arrival})));
  }catch(e){res.json([]);}
});

app.get('/api/all/:date', (req, res) => {
  const df=path.join(DATA_DIR,`${req.params.date}.json`);
  if(!fs.existsSync(df)) return res.json([]);
  try{res.json(JSON.parse(fs.readFileSync(df,'utf8')));}catch(e){res.json([]);}
});

app.get('/api/config', (req, res) => {
  res.json({maxDist:MAX_DIST,officeLat:OFFICE_LAT,officeLon:OFFICE_LON});
});

app.listen(PORT,'0.0.0.0',()=>{
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`📍 Ishxona: ${OFFICE_LAT}, ${OFFICE_LON} (${MAX_DIST}m)`);
});
