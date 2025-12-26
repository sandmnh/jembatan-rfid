export default async function handler(req, res) {
  // Menangkap data dari URL (Contoh: ?nama=Sandi&rt=20...)
  const { nama, rt, status, uid, jam, tgl } = req.query;
  
  const token = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const chat_id = "8480715519";

  // Format tampilan pesan untuk Telegram
  const pesanTelegram = `🔔 *NOTIFIKASI PAGAR RT 20*
-----------------------------
👤 *Nama:* ${nama || '-'}
🏠 *RT:* ${rt || '-'}
📅 *Tanggal:* ${tgl || '-'}
⏰ *Jam:* ${jam || '-'}
🔑 *UID:* ${uid || '-'}
🚦 *Status:* ${status || '-'}
-----------------------------`;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(pesanTelegram)}&parse_mode=Markdown`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.ok) {
      res.status(200).send("BERHASIL: Pesan terkirim ke Telegram");
    } else {
      res.status(500).send("GAGAL TELEGRAM: " + data.description);
    }
  } catch (error) {
    res.status(500).send("ERROR SERVER: " + error.message);
  }
}
