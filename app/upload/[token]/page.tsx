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
  { id: "door_inside", label: "Kapı İçleri / Vida Bölgeleri" },
  { id: "pillars", label: "Direkler" },
  { id: "engine_bay", label: "Motor Bölmesi" },
  { id: "wheels", label: "Jant / Lastik" },
  { id: "interior", label: "İç Mekân" },
];

export default function UploadPage() {
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
    if (Object.keys(files).length < 2) {
      alert("Lütfen en az 2 farklı bölümden fotoğraf ekleyin.");
      return;
    }

    setLoading(true);
    const form = new FormData();

    Object.entries(files).forEach(([_, imgs]) => {
      imgs.forEach(img => form.append("images", img));
    });

    const res = await fetch(`${api}/analysis/${token}/images`, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      router.push(`/report/${token}`);
    } else {
      alert("Fotoğraflar yüklenemedi.");
    }
  };

  return (
    <main className="mobile-wrap">
      <h2 className="h2">📸 Parça Bazlı Fotoğraf Yükleme</h2>
      <p className="p">
        İlandaki veya satıcıdan aldığınız fotoğrafları yükleyin.  
        Ne kadar net ve çeşitli → o kadar doğru analiz.
      </p>

      <div style={{ marginTop: 20 }}>
        {PARTS.map(p => (
          <div key={p.id} className="upload-card">
            <label>{p.label}</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => handleFiles(p.id, e.target.files)}
            />
            {files[p.id]?.length ? (
              <small>{files[p.id].length} fotoğraf eklendi</small>
            ) : (
              <small>İsteğe bağlı</small>
            )}
          </div>
        ))}
      </div>

      <div className="sticky-bottom">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Analiz Başlatılıyor…" : "Analizi Başlat"}
        </button>
      </div>
    </main>
  );
}
