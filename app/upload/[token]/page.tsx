"use client";

import { useMemo, useState, useEffect } from "react"; // useEffect ekledik
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

// Lemon Squeezy için global tip tanımı
declare global {
  interface Window {
    createLemonSqueezy: () => void;
    LemonSqueezy: any;
  }
}

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const sp = useSearchParams();

  const vehicleType = (sp.get("v") as VehicleType) || "car";
  const pkg = (sp.get("p") as PackageType) || "quick";

  const config = VEHICLE_CONFIG[vehicleType];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);

  // Sayfa yüklendiğinde Lemon Squeezy kurulumunu yap
  useEffect(() => {
    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

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
      alert("En az 1 fotoğraf veya video yükleyin.");
      return false;
    }

    for (const it of items) {
      if (!it.part) {
        alert("Her dosya için parça seçmelisiniz.");
        return false;
      }
    }

    return true;
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);

    try {
      // Not: Backend yapına göre flows POST isteğini kontrol et
      await fetch(`${API}/flows`, { method: "POST" });

      const grouped: Record<string, File[]> = {};
      for (const it of items) {
        if (!grouped[it.part]) grouped[it.part] = [];
        grouped[it.part].push(it.file);
      }

      for (const partKey of Object.keys(grouped)) {
        const form = new FormData();
        form.append("part_key", partKey);

        grouped[partKey].forEach((file) => {
          form.append("files", file);
        });

        const res = await fetch(`${API}/flows/${token}/upload`, {
          method: "POST",
          body: form,
        });

        if (!res.ok) {
          throw new Error(`Parça yüklenemedi: ${partKey}`);
        }
      }

      const submitRes = await fetch(`${API}/flows/${token}/submit`, {
        method: "POST",
      });

      if (!submitRes.ok) {
        throw new Error("Analiz başlatılamadı");
      }

      setAnalysisReady(true);

    } catch (err) {
      console.error(err);
      alert("Yükleme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ LEMON SQUEEZY ÖDEME FONKSİYONU
  const handlePayment = () => {
    const checkoutUrl = `https://carvix.lemonsqueezy.com/checkout/buy/5b3fb07b-2fdb-486e-84e6-ed99f2c2b964?embed=1&checkout[custom][token]=${token}`;
    
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Url.Open(checkoutUrl);
    } else {
      // Eğer kütüphane yüklenmediyse yeni sekmede aç
      window.open(checkoutUrl, "_blank");
    }
  };

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 28 }}>
      <h1>Fotoğraf & Video Yükleme</h1>

      <p>
        Seçtiğiniz araç türüne göre parça bazlı fotoğraf ve video yükleyerek,
        yapay zekâ destekli ön analiz raporu oluşturabilirsiniz.
      </p>

      <ol style={{ marginTop: 16, marginBottom: 16, paddingLeft: 20 }}>
        <li><b>Adım 1:</b> Araç fotoğraf ve videolarını yükleyin.</li>
        <li><b>Adım 2:</b> Her dosya için ilgili araç parçasını seçin.</li>
        <li><b>Adım 3:</b> “Analizi Başlat” butonuna basın.</li>
        <li><b>Adım 4:</b> Ödeme yaparak raporu görüntüleyin.</li>
      </ol>

      <p>
        Araç: <b>{config.title}</b> • Paket:{" "}
        <b>{pkg === "quick" ? "Hızlı" : "Detaylı"}</b>
      </p>

      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <span>{it.file.name}</span>

          <select
            value={it.part}
            onChange={(e) => updatePart(i, e.target.value as PartKey)}
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

      {!analysisReady && (
        <button onClick={submit} disabled={loading} style={{ marginTop: 16 }}>
          {loading ? "Analiz başlatılıyor…" : "Analizi Başlat"}
        </button>
      )}

      {analysisReady && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            border: "2px solid #2563eb",
            borderRadius: 8,
            backgroundColor: "#f8fafc"
          }}
        >
          <p style={{ fontWeight: "bold" }}>
            Analiz tamamlandı! Raporu görüntülemek için ödeme yapın.
          </p>
          <button
            onClick={handlePayment}
            style={{ 
                marginTop: 10, 
                backgroundColor: "#2563eb", 
                color: "white", 
                padding: "10px 20px", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold"
            }}
          >
            129,90 TL ÖDE VE RAPORU GÖR
          </button>
        </div>
      )}
    </main>
  );
}