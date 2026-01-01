export default async function handler(req, res) {
  const { status } = req.query;

  // GANTI DENGAN DATA KAMU
  const BOT_TOKEN = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const CHAT_ID = "8480715519";

  const emoji = status === 'open' ? '🔓 TERBUKA' : '🔒 TERTUTUP';
  const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  
  const pesan = `<b>🔔 NOTIFIKASI GERBANG</b>\n\n` +
                `Status: <b>${emoji}</b>\n` +
                `Waktu : <code>${waktu}</code>\n\n` +
                `<i>Sistem Keamanan Arduino</i>`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: pesan,
        parse_mode: 'HTML'
      })
    });

    if (response.ok) {
      res.status(200).send("OK: Terkirim ke Telegram");
    } else {
      res.status(500).send("Error: Gagal kirim ke Telegram");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}
