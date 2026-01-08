"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { VEHICLE_CONFIG, VehicleType, PackageType, PartKey } from "@/lib/vehicleConfig";

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://ai-arac-analiz-backend.onrender.com";

type ImageItem = {
  file: File;
  part: PartKey | "";
};

export default function UploadPage() {
  const { vehicleType } = useParams<{ vehicleType: VehicleType }>();
  const router = useRouter();
  const sp = useSearchParams();

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
    const next = Array.from(files).map((f) => ({ file: f, part: "" }));
    const [items, setItems] = useState<ImageItem[]>([]);
  }

  function updatePart(index: number, part: PartKey | "") {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, part } : it))
    );
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function coverage() {
    const selected = items.map((i) => i.part).filter(Boolean) as PartKey[];
    const selectedSet = new Set(selected);
    const missing = config.required[pkg].filter((p) => !selectedSet.has(p));
    return { selected, missing };
  }

  function validate(): boolean {
    if (!items.length) {
      alert("En az 1 fotoğraf yüklemelisiniz.");
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

      form.append("vehicle_type", vehicleType);
      form.append("package", pkg);

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

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      router.push(`/report/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Yükleme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const cov = coverage();

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 28 }}>
      <h1>Fotoğraf Yükleme</h1>
      <p>
        Araç: <b>{config.title}</b> • Paket:{" "}
        <b>{pkg === "quick" ? "Hızlı" : "Detaylı"}</b>
      </p>

      <div style={{ marginTop: 16 }}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onFilesSelected(e.target.files)}
        />
      </div>

      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px 80px",
            gap: 10,
            alignItems: "center",
            marginTop: 10,
            padding: 10,
            border: "1px solid #eee",
            borderRadius: 10,
          }}
        >
          <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
            {it.file.name}
          </div>

          <select
            value={it.part}
            onChange={(e) => updatePart(i, e.target.value as PartKey)}
          >
            <option value="">Parça seç</option>
            {config.parts.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label} {requiredSet.has(p.key) ? "*" : ""}
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
          marginTop: 18,
          padding: "12px 18px",
          borderRadius: 10,
          background: "#111827",
          color: "#fff",
          fontWeight: 700,
        }}
      >
        {loading ? "Analiz başlatılıyor…" : "Analizi Başlat"}
      </button>

      <p style={{ marginTop: 14, fontSize: 12, color: "#6b7280" }}>
        Bu rapor yapay zekâ destekli ön değerlendirmedir. Ekspertiz yerine geçmez.
      </p>
    </main>
  );
}
