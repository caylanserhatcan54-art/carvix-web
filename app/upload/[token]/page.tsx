"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const PARTS = [
  { id: "front", label: "Ön Tampon / Farlar" },
  { id: "rear", label: "Arka Tampon / Stoplar" },
  { id: "left_side", label: "Sol Yan" },
  { id: "right_side", label: "Sağ Yan" },
  { id: "hood", label: "Kaput" },
  { id: "trunk", label: "Bagaj Kapağı" },
  { id: "roof", label: "Tavan" },
  { id: "door_inside", label: "Kapı İçleri / Vidalar" },
  { id: "pillars", label: "Direkler" },
  { id: "engine_bay", label: "Motor Bölmesi" },
  { id: "wheels", label: "Jant / Lastik" },
  { id: "interior", label: "İç Mekân" },
];

export default function UploadPartsPage() {
  const { token } = useParams();
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [loading, setLoading] = useState(false);

  const handleFiles = (partId: string, f: FileList | null) => {
    if (!f) return;
    setFiles(prev => ({
      ...prev,
      [partId]: Array.from(f),
    }));
  };

  const submit = async () => {
    if (!token) return;

    setLoading(true);

    try {
      /* =========================
         1️⃣ FOTOĞRAFLARI YÜKLE
      ========================= */
      const form = new FormData();

      Object.entries(files).forEach(([part, imgs]) => {
        imgs.forEach(img => {
          form.append("images", img);
          form.append("parts", part); // backend şu an zorunlu değil ama ileriye hazır
        });
      });

      const uploadRes = await fetch(
        `${api}/analysis/${token}/images`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!uploadRes.ok) {
        alert("Fotoğraf yükleme hatası");
        setLoading(false);
        return;
      }

      /* =========================
         2️⃣ ANALİZİ BAŞLAT
      ========================= */
      const runRes = await fetch(
        `${api}/analysis/${token}/run`,
        { method: "POST" }
      );

      if (!runRes.ok) {
        alert("Analiz başlatılamadı");
        setLoading(false);
        return;
      }

      /* =========================
         3️⃣ RAPORA GİT
      ========================= */
      router.push(`/report/${token}`);

    } catch (e) {
      alert("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h2>📸 Parça Bazlı Fotoğraf Yükleme</h2>
      <p style={{ marginBottom: 20 }}>
        Aracın istediğiniz bölümlerinin fotoğraflarını yükleyin.  
        Ne kadar fazla ve net foto → o kadar doğru analiz.
      </p>

      {PARTS.map(p => (
        <div key={p.id} style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600 }}>{p.label}</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => handleFiles(p.id, e.target.files)}
            style={{ display: "block", marginTop: 6 }}
          />
          {files[p.id]?.length ? (
            <small>{files[p.id].length} fotoğraf seçildi</small>
          ) : null}
        </div>
      ))}

      <button
        disabled={loading}
        onClick={submit}
        style={{
          marginTop: 32,
          padding: "14px 20px",
          fontSize: 16,
          fontWeight: 700,
          borderRadius: 10,
          background: "#111",
          color: "#fff",
          border: "none",
          width: "100%",
        }}
      >
        {loading ? "🔄 Analiz Başlatılıyor…" : "🚀 Analizi Başlat"}
      </button>
    </main>
  );
}
