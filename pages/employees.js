import { useEffect, useState } from "react";
import { db, collection, addDoc, getDocs } from "../lib/firebase";

export default function Employees() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [list, setList] = useState([]);

  async function loadEmployees() {
    const snap = await getDocs(collection(db, "absensi"));
    setList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  async function addEmployee(e) {
    e.preventDefault();
    if (!name || !tag) return;
    await addDoc(collection(db, "absensi"), { name, tag });
    setName("");
    setTag("");
    loadEmployees();
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Kelola Karyawan</h1>
      <p><a href="/">Kembali</a></p>
      <form onSubmit={addEmployee} style={{ marginBottom: 20 }}>
        <div>
          <label>Nama: </label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>RFID Tag: </label>
          <input value={tag} onChange={e => setTag(e.target.value)} />
        </div>
        <button type="submit">Tambah</button>
      </form>

      <h2>Daftar Karyawan</h2>
      <ul>
        {list.map(emp => (
          <li key={emp.id}>{emp.name} — {emp.tag}</li>
        ))}
        {list.length === 0 && <li>Belum ada karyawan</li>}
      </ul>
      <p>Untuk integrasi RFID: ketika pembaca mendapatkan tag, kirim POST ke /api/rfid dengan body JSON {"{ tag, secret }"}</p>
    </div>
  );
}
