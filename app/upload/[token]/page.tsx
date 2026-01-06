"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const PARTS = [
  { id: "front", label: "Ön Tampon / Farlar" },
  { id: "rear", label: "Arka Tampon / Stoplar" },
  { id: "left", label: "Sol Yan" },
  { id: "right", label: "Sağ Yan" },
  { id: "hood", label: "Kaput" },
  { id: "trunk", label: "Bagaj Kapağı" },
  { id: "roof", label: "Tavan" },
  { id: "door", label: "Kapı İçleri / Vida Bölgeleri" },
  { id: "pillars", label: "Direkler" },
  { id: "engine", label: "Motor Bölmesi" },
  { id: "wheels", label: "Jant / Lastik" },
  { id: "interior", label: "İç Mekân" },
];

export default function UploadPage() {
  const { token } = useParams();
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [loading, setLoading] = useState(false);

  const handleFiles = (id: string, f: FileList | null) => {
    if (!f) return;
    setFiles(prev => ({ ...prev, [id]: Array.from(f) }));
  };

  const submit = async () => {
    if (Object.keys(files).length < 2) {
      alert("En az 2 farklı bölümden fotoğraf ekleyin.");
      return;
    }

    setLoading(true);
    const form = new FormData();

    Object.values(files).flat().forEach(f => {
      form.append("images", f);
    });

    const res = await fetch(`${api}/analysis/${token}/images`, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      router.push(`/report/${token}`);
    } else {
      alert("Yükleme başarısız.");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{ padding: 32 }}>

          <span className="kicker">Fotoğraf Yükleme</span>
          <h1 className="h1">Araç Fotoğraflarını Ekleyin</h1>
          <p className="p">
            Daha fazla ve net fotoğraf → daha güvenilir analiz sonucu.
          </p>

          <div className="hr" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {PARTS.map(p => (
              <div
                key={p.id}
                className="card"
                style={{ padding: 16 }}
              >
                <strong>{p.label}</strong>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ marginTop: 10 }}
                  onChange={e => handleFiles(p.id, e.target.files)}
                />
                {files[p.id]?.length ? (
                  <small style={{ color: "var(--muted2)" }}>
                    {files[p.id].length} fotoğraf seçildi
                  </small>
                ) : null}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, textAlign: "right" }}>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={submit}
            >
              {loading ? "Analiz Başlatılıyor…" : "Analizi Başlat"}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
