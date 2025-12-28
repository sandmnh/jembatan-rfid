export default async function handler(req, res) {
  const { nama, rt, uid } = req.query;
  
  const token = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const chat_id = "8480715519";

  // --- LOGIKA WAKTU OTOMATIS (WIB) ---
  const sekarang = new Date();
  const tglOtomatis = sekarang.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta'
  });
  const jamOtomatis = sekarang.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta'
  });

  // --- LOGIKA CEK AKSES ---
  let headerNotif = "✅ AKSES DITERIMA";
  let statusPagar = "Pagar Dibuka";
  let emoji = "🔔";

  // Jika Arduino mengirim nama "TIDAK_DIKENAL"
  if (nama === "TIDAK_DIKENAL") {
    headerNotif = "⚠️ AKSES DITOLAK! ⚠️";
    statusPagar = "Pagar Tetap Terkunci";
    emoji = "🚫";
  }

  // Susun pesan Telegram
  const pesanTelegram = `${emoji} ${headerNotif}
-----------------------------
👤 Nama: ${nama === "TIDAK_DIKENAL" ? "Orang Asing" : (nama || '-')}
🏠 RT: ${rt || '-'}
📅 Hari/Tgl: ${tglOtomatis}
⏰ Jam: ${jamOtomatis} WIB
🆔 UID: ${uid || '-'}
🔓 Status: ${statusPagar}
-----------------------------`;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(pesanTelegram)}&parse_mode=Markdown`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.ok) {
      res.status(200).send("BERHASIL: Notif dikirim");
    } else {
      res.status(500).send("GAGAL TELEGRAM: " + data.description);
    }
  } catch (error) {
    res.status(500).send("ERROR SERVER: " + error.message);
  }
}
