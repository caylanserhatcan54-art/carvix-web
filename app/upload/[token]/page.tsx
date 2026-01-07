"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { VEHICLE_CONFIG, VehicleType, PackageType, PartKey } from "@/lib/vehicleConfig";

const API = process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com";

type ImageItem = { file: File; part: PartKey | ""; };

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const sp = useSearchParams();

  // vehicle_type ve package query ile gelsin: /upload/{token}?v=car&p=detailed
  const vehicleType = (sp.get("v") as VehicleType) || "car";
  const pkg = (sp.get("p") as PackageType) || "quick";

  const config = VEHICLE_CONFIG[vehicleType];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);

  const requiredSet = useMemo(() => new Set(config.required[pkg]), [config, pkg]);
  const partsList = config.parts;

  function onFilesSelected(files: FileList | null) {
    if (!files) return;
    const next: ImageItem[] = Array.from(files).map((f) => ({ file: f, part: "" }));
    setItems((prev) => [...prev, ...next]);
  }

  function updatePart(index: number, part: PartKey | "") {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, part } : it)));
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function coverage() {
    const selected = items.map(i => i.part).filter(Boolean) as PartKey[];
    const selectedSet = new Set(selected);
    const missing = config.required[pkg].filter(p => !selectedSet.has(p));
    return { selected, missing };
  }

  function validate(): boolean {
    if (!token) {
      alert("Token yok");
      return false;
    }
    if (!items.length) {
      alert("En az 1 fotoğraf yükleyin");
      return false;
    }
    for (const it of items) {
      if (!it.part) {
        alert("Her fotoğraf için parça seçmelisiniz");
        return false;
      }
    }
    const { missing } = coverage();
    if (missing.length) {
      alert(
        `Bu paket için zorunlu fotoğraflar eksik:\n\n${missing.join("\n")}\n\nDevam edebilirsin ama rapor güveni düşer.`
      );
      // İstersen burada return false yapıp zorunlu kılabilirsin:
      // return false;
    }
    return true;
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("token", token);

      // backend'e vehicle_type ve package bilgisini de yollayalım (Firestore'da saklanır)
      form.append("vehicle_type", vehicleType);
      form.append("package", pkg);

      const views = items.map((it) => ({ filename: it.file.name, part: it.part }));
      form.append("views", JSON.stringify(views));
      items.forEach((it) => form.append("files", it.file));

      const res = await fetch(`${API}/jobs`, { method: "POST", body: form });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t);
      }
      const data = await res.json();
      router.push(`/report/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Yükleme sırasında hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  const cov = coverage();

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 28 }}>
      <h1 style={{ marginBottom: 6 }}>Carvix — Fotoğraf Yükleme</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Araç tipi: <b>{config.title}</b> • Paket: <b>{pkg === "quick" ? "Hızlı" : "Detaylı"}</b>
      </p>

      <div style={{ padding: 14, border: "1px solid #eee", borderRadius: 10, background: "#fafafa" }}>
        <b>Zorunlu Parçalar ({config.required[pkg].length})</b>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {config.required[pkg].map((p) => (
            <span
              key={p}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #e6e6e6",
                background: cov.selected.includes(p) ? "#eaffea" : "#fff",
                fontSize: 12,
              }}
              title={cov.selected.includes(p) ? "Yüklendi" : "Eksik"}
            >
              {p}{cov.selected.includes(p) ? " ✓" : ""}
            </span>
          ))}
        </div>

        {!!cov.missing.length && (
          <p style={{ marginTop: 10, color: "#b45309" }}>
            Eksik zorunlu: <b>{cov.missing.length}</b> (rapor güveni düşer)
          </p>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <input type="file" multiple accept="image/*" onChange={(e) => onFilesSelected(e.target.files)} />
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
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {it.file.name}
          </div>

          <select value={it.part} onChange={(e) => updatePart(i, e.target.value as any)}>
            <option value="">Parça seç</option>
            {partsList.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label} ({p.key}){requiredSet.has(p.key) ? " *" : ""}
              </option>
            ))}
          </select>

          <button onClick={() => removeItem(i)} style={{ padding: "8px 10px" }}>
            Sil
          </button>
        </div>
      ))}

      <button
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: 18,
          padding: "12px 18px",
          borderRadius: 10,
          border: "none",
          background: "#111827",
          color: "white",
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Analiz Başlatılıyor…" : "Analizi Başlat"}
      </button>

      <p style={{ marginTop: 14, color: "#6b7280", fontSize: 12 }}>
        Not: Carvix raporu yapay zekâ destekli ön kontroldür. Kesin tespit için fiziki inceleme ve yetkili ekspertiz önerilir.
      </p>
    </main>
  );
}
