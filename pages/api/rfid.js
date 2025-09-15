import { db, collection, addDoc, query, where, getDocs, serverTimestamp } from "../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tag, secret } = req.body || {};

  if (!tag || !secret) {
    return res.status(400).json({ error: "Missing tag or secret" });
  }

  if (secret !== process.env.RF_SECRET) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  try {
    // cari karyawan berdasarkan tag
    const q = query(collection(db, "employees"), where("tag", "==", tag));
    const snap = await getDocs(q);
    let name = null;
    if (!snap.empty) {
      const doc = snap.docs[0];
      name = doc.data().name || null;
    }

    // simpan attendance
    await addDoc(collection(db, "absensi"), {
      tag,
      name,
      timestamp: serverTimestamp()
    });

    return res.status(200).json({ ok: true, tag, name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
