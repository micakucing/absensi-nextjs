import { useEffect, useState } from "react";
import { db, query, collection, orderBy, limit, getDocs } from "../lib/firebase";

export default function Home() {
  const [logs, setLogs] = useState([]);

  async function loadLogs() {
    const q = query(collection(db, "attendances"), orderBy("timestamp", "desc"), limit(50));
    const snap = await getDocs(q);
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setLogs(items);
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Absensi Karyawan (RFID)</h1>
      <p><a href="/employees">Kelola Karyawan</a></p>
      <h2>Log Terbaru</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Waktu</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Nama</th>
            <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Tag</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(l => (
            <tr key={l.id}>
              <td style={{ padding: "8px 0" }}>{l.timestamp?.toDate ? l.timestamp.toDate().toLocaleString() : "-"}</td>
              <td style={{ padding: "8px 0" }}>{l.name || "-"}</td>
              <td style={{ padding: "8px 0" }}>{l.tag}</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr><td colSpan="3">Belum ada data</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
