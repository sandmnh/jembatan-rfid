export default async function handler(req, res) {
  const { nama, rt, status, uid, jam, tgl } = req.query;
  
  const token = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const chat_id = "8480715519";

  // Format pesan tanpa Markdown yang rumit agar tidak error
  const pesanTelegram = `🔔 NOTIFIKASI PAGAR RT 20
-----------------------------
Nama: ${nama || '-'}
RT: ${rt || '-'}
Tanggal: ${tgl || '-'}
Jam: ${jam || '-'}
UID: ${uid || '-'}
Status: ${status || '-'}
-----------------------------`;

  // Hapus "&parse_mode=Markdown" di ujung URL agar Telegram membaca sebagai teks biasa
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(pesanTelegram)}`;

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
