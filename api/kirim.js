export default async function handler(req, res) {
  const { nama, rt, uid, status } = req.query;
  
  const token = "8472479987:AAFzNiI-jTV8ekoYMBl2q_l7Ruf9bev9P-I";
  const chat_id = "8480715519";

  // --- LOGIKA WAKTU OTOMATIS (WIB) ---
  const sekarang = new Date();
  
  // Format Tanggal: misal "Senin, 27 Desember 2025"
  const tglOtomatis = sekarang.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta'
  });

  // Format Jam: misal "17:30:05"
  const jamOtomatis = sekarang.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Jakarta'
  });

  // Susun pesan (Variabel jam dan tgl sekarang diambil dari sistem server)
  const pesanTelegram = `🔔 NOTIFIKASI PAGAR RT 20
-----------------------------
Nama: ${nama || '-'}
RT: ${rt || '-'}
Hari/Tgl: ${tglOtomatis}
Jam: ${jamOtomatis} WIB
UID: ${uid || '-'}
Status: ${status || 'Akses Diterima'}
-----------------------------`;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(pesanTelegram)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.ok) {
      res.status(200).send("BERHASIL: Notif dikirim dengan waktu Real-Time");
    } else {
      res.status(500).send("GAGAL TELEGRAM: " + data.description);
    }
  } catch (error) {
    res.status(500).send("ERROR SERVER: " + error.message);
  }
}
