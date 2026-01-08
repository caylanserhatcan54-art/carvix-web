"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  VEHICLE_CONFIG,
  VehicleType,
  PackageType,
  PartKey,
} from "@/lib/vehicleConfig";

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://ai-arac-analiz-backend.onrender.com";

type ImageItem = {
  file: File;
  part: PartKey | "";
};

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const sp = useSearchParams();

  const vehicleType = (sp.get("v") as VehicleType) || "car";
  const pkg = (sp.get("p") as PackageType) || "quick";

  const config = VEHICLE_CONFIG[vehicleType];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);

  const requiredSet = useMemo(
    () => new Set(config.required[pkg]),
    [config, pkg]
  );

  function onFilesSelected(files: FileList | null) {
    if (!files) return;

    const next: ImageItem[] = Array.from(files).map((f) => ({
      file: f,
      part: "",
    }));

    setItems((prev) => [...prev, ...next]);
  }

  function updatePart(index: number, part: PartKey | "") {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, part } : it))
    );
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function validate(): boolean {
    if (!token) {
      alert("Oturum bulunamadı.");
      return false;
    }

    if (!items.length) {
      alert("En az 1 fotoğraf yükleyin.");
      return false;
    }

    for (const it of items) {
      if (!it.part) {
        alert("Her fotoğraf için parça seçmelisiniz.");
        return false;
      }
    }

    return true;
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);

    try {
      const form = new FormData();

      const views = items.map((it) => ({
        filename: it.file.name,
        part: it.part,
      }));

      form.append("views", JSON.stringify(views));
      items.forEach((it) => form.append("files", it.file));

      /* =========================
         1️⃣ FOTOĞRAFLARI YÜKLE
      ========================= */
      const uploadRes = await fetch(
        `${API}/flows/${token}/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!uploadRes.ok) {
        throw new Error(await uploadRes.text());
      }

      /* =========================
         2️⃣ ANALİZİ BAŞLAT
      ========================= */
      const submitRes = await fetch(
        `${API}/flows/${token}/submit`,
        { method: "POST" }
      );

      if (!submitRes.ok) {
        throw new Error("Analiz başlatılamadı");
      }

      /* =========================
         3️⃣ RAPORA GİT
      ========================= */
      router.push(`/report/${token}`);
    } catch (err) {
      console.error(err);
      alert("Yükleme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 28 }}>
      <h1>Fotoğraf Yükleme</h1>

      <p>
        Araç: <b>{config.title}</b> • Paket:{" "}
        <b>{pkg === "quick" ? "Hızlı" : "Detaylı"}</b>
      </p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <span>{it.file.name}</span>

          <select
            value={it.part}
            onChange={(e) =>
              updatePart(i, e.target.value as PartKey)
            }
          >
            <option value="">Parça seç</option>
            {config.parts.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
                {requiredSet.has(p.key) ? " *" : ""}
              </option>
            ))}
          </select>

          <button onClick={() => removeItem(i)}>Sil</button>
        </div>
      ))}

      <button onClick={submit} disabled={loading}>
        {loading ? "Analiz başlatılıyor…" : "Analizi Başlat"}
      </button>
    </main>
  );
}
