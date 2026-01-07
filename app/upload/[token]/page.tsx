"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const API = "https://ai-arac-analiz-backend.onrender.com";

const PARTS = [
  // Genel
  "GENEL_ON",
  "GENEL_ARKA",
  "GENEL_SAG",
  "GENEL_SOL",
  "GENEL_TAVAN",

  // Paneller
  "SOL_ON_KAPI",
  "SAG_ON_KAPI",
  "SOL_ARKA_KAPI",
  "SAG_ARKA_KAPI",
  "KAPUT",
  "BAGAJ",
  "SOL_ON_CAMURLUK",
  "SAG_ON_CAMURLUK",
  "SOL_ARKA_CAMURLUK",
  "SAG_ARKA_CAMURLUK",

  // Kritik sök-tak bölgeleri
  "KAPI_MENTESE",
  "KAPI_VIDALARI",
  "KAPI_DIREKLERI",
  "KAPUT_MENTESE",
  "KAPUT_VIDALARI",
  "BAGAJ_MENTESE",
  "BAGAJ_VIDALARI",
];

type ImageItem = {
  file: File;
  part: string;
};

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);

  function onFilesSelected(files: FileList | null) {
    if (!files) return;

    const next: ImageItem[] = Array.from(files).map((f) => ({
      file: f,
      part: "",
    }));

    setItems((prev) => [...prev, ...next]);
  }

  function updatePart(index: number, part: string) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, part } : it))
    );
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function validate(): boolean {
    if (!items.length) {
      alert("En az 1 fotoğraf yüklemelisiniz");
      return false;
    }

    for (const it of items) {
      if (!it.part) {
        alert("Her fotoğraf için parça seçmelisiniz");
        return false;
      }
    }

    return true;
  }

  async function submit() {
    if (!token) {
      alert("Token bulunamadı");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const form = new FormData();
      form.append("token", token);

      const views = items.map((it) => ({
        filename: it.file.name,
        part: it.part,
      }));

      form.append("views", JSON.stringify(views));
      items.forEach((it) => form.append("files", it.file));

      const res = await fetch(`${API}/jobs`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Backend hata döndü");
      }

      const data = await res.json();

      if (!data?.id) {
        throw new Error("Job ID dönmedi");
      }

      router.push(`/report/${data.id}`);
    } catch (err: any) {
      console.error("UPLOAD ERROR:", err);
      alert(`Yükleme hatası: ${err.message || "Bilinmeyen hata"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
      <h1>Araç Fotoğraflarını Yükle</h1>

      <p style={{ color: "#555" }}>
        Boya / sök-tak tespiti için menteşe ve vida fotoğrafları önerilir.
      </p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <span style={{ flex: 1, fontSize: 14 }}>{it.file.name}</span>

          <select
            value={it.part}
            onChange={(e) => updatePart(i, e.target.value)}
          >
            <option value="">Parça seç</option>
            {PARTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button onClick={() => removeItem(i)}>Sil</button>
        </div>
      ))}

      <button
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: 24,
          padding: "12px 24px",
          fontSize: 16,
        }}
      >
        {loading ? "Analiz Başlatılıyor…" : "Analizi Başlat"}
      </button>
    </main>
  );
}
