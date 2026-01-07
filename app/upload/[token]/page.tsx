"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const api = "https://ai-arac-analiz-backend.onrender.com";

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!token) {
      alert("Token yok");
      return;
    }

    if (!files.length) {
      alert("En az 1 fotoğraf yükleyin");
      return;
    }

    setLoading(true);

    try {
      /* ============================
         1️⃣ FOTOĞRAFLARI YÜKLE
      ============================ */
      const form = new FormData();
      files.forEach((f) => form.append("images", f));

      const uploadRes = await fetch(
        `${api}/analysis/${token}/images`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!uploadRes.ok) {
        throw new Error("Fotoğraf upload başarısız");
      }

      const uploadData = await uploadRes.json();
      const images: string[] = uploadData.images;

      if (!Array.isArray(images) || images.length === 0) {
        throw new Error("Backend image list dönmedi");
      }

      /* ============================
         2️⃣ JOB OLUŞTUR (GPU WORKER)
      ============================ */
      const jobRes = await fetch(`${api}/jobs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: token,
          images,
          meta: {
            source: "web",
          },
        }),
      });

      if (!jobRes.ok) {
        throw new Error("Job create başarısız");
      }

      /* ============================
         3️⃣ RAPORA GİT
      ============================ */
      router.push(`/report/${token}`);
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: 32 }}>
      <h2>Fotoğraf Yükle</h2>
      <p>Araç fotoğraflarını ekleyin (ön, arka, yan, detay)</p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setFiles(Array.from(e.target.files || []))
        }
      />

      <button
        className="btn btn-primary"
        onClick={submit}
        disabled={loading}
        style={{ marginTop: 16 }}
      >
        {loading ? "Analiz Başlatılıyor…" : "Analizi Başlat"}
      </button>
    </main>
  );
}
