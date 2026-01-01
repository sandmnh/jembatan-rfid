export default async function handler(req, res) {
  // Menangkap semua data yang dikirim Arduino: status, nama, rt, dan uid
  const { status, nama, rt, uid } = req.query;

  const BOT_TOKEN = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const CHAT_ID = "8480715519";

  // Penyesuaian tampilan berdasarkan status
  const emoji = status === 'open' ? '🔓 AKSES DITERIMA' : '🔒 TERTUTUP/DITOLAK';
  const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  
  // Format pesan agar menampilkan data warga dari SD Card
  const pesan = `<b>🔔 NOTIFIKASI GERBANG</b>\n\n` +
                `Status: <b>${emoji}</b>\n` +
                `Nama  : <b>${nama || 'Tidak Dikenal'}</b>\n` +
                `RT    : ${rt || '-'}\n` +
                `UID   : <code>${uid || '-'}</code>\n\n` +
                `Waktu : ${waktu}\n` +
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
