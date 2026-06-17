const TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL || 'https://hr-bot-woad.vercel.app';

async function sendMessage(chatId, text, replyMarkup) {
  const body = { chat_id: chatId, text, parse_mode: 'HTML' };
  if (replyMarkup) body.reply_markup = replyMarkup;
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });

  const update = req.body;
  const msg = update?.message;
  if (!msg) return res.status(200).json({ ok: true });

  const chatId = msg.chat.id;
  const text = msg.text || '';
  const firstName = msg.from?.first_name || 'do\'st';

  if (text === '/start') {
    const greeting =
      `👋 Assalomu alaykum, <b>${firstName}</b>!\n\n` +
      `🏢 <b>Ai Up HR Boshqaruv</b> tizimiga xush kelibsiz!\n\n` +
      `Bu tizim orqali siz:\n` +
      `✅ Xodimlar davomatini kuzatishingiz\n` +
      `📊 Hisobotlar olishingiz\n` +
      `📍 Filiallarni boshqarishingiz mumkin\n\n` +
      `👇 Pastdagi tugmani bosib ilovani oching:`;

    await sendMessage(chatId, greeting, {
      inline_keyboard: [[{
        text: '🚀 HR Boshqaruvni ochish',
        web_app: { url: APP_URL }
      }]]
    });
  }

  return res.status(200).json({ ok: true });
}
