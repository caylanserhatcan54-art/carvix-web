"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  console.log("UPLOAD TOKEN:", token); // 🔍 uuid görmelisin

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!files.length) {
      alert("En az 1 fotoğraf yükleyin");
      return;
    }

    setLoading(true);
    const form = new FormData();
    files.forEach(f => form.append("images", f));

    const res = await fetch(`${api}/analysis/${token}/images`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      alert("Fotoğraflar yüklenemedi");
      setLoading(false);
      return;
    }

    // 👉 analiz başlat
    await fetch(`${api}/analysis/${token}/run`, { method: "POST" });

    router.push(`/report/${token}`);
  };

  return (
    <main className="container" style={{ padding: 32 }}>
      <h2>Fotoğraf Yükle</h2>
      <p>Araç fotoğraflarını ekleyin (ön, arka, yan, detay)</p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={e => setFiles(Array.from(e.target.files || []))}
      />

      <button
        className="btn btn-primary"
        onClick={submit}
        disabled={loading}
        style={{ marginTop: 16 }}
      >
        {loading ? "Yükleniyor…" : "Analizi Başlat"}
      </button>
    </main>
  );
}
