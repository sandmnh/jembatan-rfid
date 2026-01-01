export default async function handler(req, res) {
  const { status, nama, rt, uid } = req.query;

  const BOT_TOKEN = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const CHAT_ID = "8480715519";

  // Pengaturan waktu Indonesia
  const opsiWaktu = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: 'Asia/Jakarta' 
  };
  const opsiJam = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZone: 'Asia/Jakarta' 
  };
  
  const hariTgl = new Date().toLocaleDateString('id-ID', opsiWaktu);
  const jamWIB = new Date().toLocaleTimeString('id-ID', opsiJam);

  // Menyusun pesan sesuai permintaan di screenshot
  let pesan = `🔔 ✅ <b>AKSES DITERIMA</b>\n`;
  pesan += `------------------------------------------\n\n`;
  pesan += `👤 Nama: ${nama || 'RT'}\n`;
  pesan += `🏠 RT: ${rt || '20'}\n`;
  pesan += `📅 Hari/Tgl: ${hariTgl}\n`;
  pesan += `⏰ Jam: ${jamWIB} WIB\n`;
  pesan += `🆔 UID: ${uid || 'D10C6E06'}\n`;
  pesan += `🔓 Status: Pagar Dibuka\n\n`;
  pesan += `------------------------------------------`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: pesan,
        parse_mode: 'HTML'
      })
    });
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send("Error");
  }
}
