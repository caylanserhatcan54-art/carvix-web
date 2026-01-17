"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  VEHICLE_CONFIG,
  VehicleType,
  PackageType,
  PartKey,
} from "@/lib/vehicleConfig";
import { Upload, Trash2, CreditCard, CheckCircle2, Zap, Image as ImageIcon } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com";

type ImageItem = {
  file: File;
  part: PartKey | "";
};

export default function UploadPage() {
  const { token } = useParams<{ token: string }>();
  const sp = useSearchParams();

  const vehicleType = (sp.get("v") as VehicleType) || "car";
  const pkg = (sp.get("p") as PackageType) || "quick";
  const config = VEHICLE_CONFIG[vehicleType];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);

  const requiredSet = useMemo(() => new Set(config.required[pkg]), [config, pkg]);

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

  async function submit() {
    if (!token || !items.length) {
      alert("Lütfen dosya seçin.");
      return;
    }
    if (items.some(it => !it.part)) {
      alert("Lütfen her dosya için parça seçin.");
      return;
    }

    setLoading(true);
    try {
      // Flow oluşturma (Backend main.py'deki @app.post("/flows") endpointi)
      await fetch(`${API}/flows`, { method: "POST" });
      
      const grouped: Record<string, File[]> = {};
      items.forEach(it => {
        if (!grouped[it.part]) grouped[it.part] = [];
        grouped[it.part].push(it.file);
      });

      for (const partKey of Object.keys(grouped)) {
        const form = new FormData();
        form.append("part_key", partKey);
        grouped[partKey].forEach(file => form.append("files", file));
        await fetch(`${API}/flows/${token}/upload`, { method: "POST", body: form });
      }

      await fetch(`${API}/flows/${token}/submit`, { method: "POST" });
      setAnalysisReady(true);
    } catch (err) {
      alert("Hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  // TAMI ÖDEME DÜZELTİLMİŞ KISIM
  const handleTamiPayment = async () => {
    try {
      setLoading(true);
      // Backend adresi main.py'deki @app.post("/payments/tami/init") ile aynı olmalı
      const res = await fetch(`${API}/payments/tami/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            amount: "129.90", 
            orderId: `TOKEN-${token}` 
        }),
      });
      
      const data = await res.json();
      
      // Backend'den "paymentUrl" dönüyor (main.py'de öyle tanımladık)
      if (data && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Ödeme servisi hatası: " + (data.errorMessage || "URL alınamadı"));
      }
    } catch (error) {
      console.error("Ödeme Hatası:", error);
      alert("Backend bağlantı hatası. Lütfen backend'in çalıştığından emin olun.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#050505', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'sans-serif'
    }}>
      
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(59,130,246,0.1)', 
            padding: '6px 16px', 
            borderRadius: '100px',
            color: '#60a5fa',
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            <Zap size={14} /> YAPAY ZEKA ANALİZ MERKEZİ
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-1px' }}>
            Rapor Hazırlığı
          </h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>
            {config.title} • {pkg === "quick" ? "Hızlı" : "Detaylı"} Paket
          </p>
        </div>

        {!analysisReady ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ 
              position: 'relative', 
              border: '2px dashed rgba(255,255,255,0.1)', 
              borderRadius: '24px', 
              padding: '60px 20px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              cursor: 'pointer'
            }}>
              <input
                type="file" multiple accept="image/*,video/*"
                onChange={(e) => onFilesSelected(e.target.files)}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
              />
              <Upload size={40} color="#3b82f6" style={{ marginBottom: '16px' }} />
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>Dosya Seçin</p>
              <p style={{ fontSize: '12px', color: '#52525b' }}>Görsel veya video yükleyebilirsiniz</p>
            </div>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((it, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  backgroundColor: '#18181b', 
                  padding: '12px', 
                  borderRadius: '16px',
                  border: '1px solid #27272a'
                }}>
                  <ImageIcon size={18} color="#3b82f6" />
                  <span style={{ flex: 1, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {it.file.name}
                  </span>
                  <select
                    style={{ backgroundColor: '#000', color: '#fff', border: '1px solid #3f3f46', borderRadius: '8px', padding: '4px 8px', fontSize: '11px' }}
                    value={it.part}
                    onChange={(e) => updatePart(i, e.target.value as PartKey)}
                  >
                    <option value="">Parça Seçin</option>
                    {config.parts.map((p) => (
                      <option key={p.key} value={p.key}>{p.label}</option>
                    ))}
                  </select>
                  <button onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={submit}
              disabled={loading || items.length === 0}
              style={{ 
                marginTop: '20px',
                padding: '18px', 
                borderRadius: '16px', 
                backgroundColor: '#fff', 
                color: '#000', 
                fontWeight: '900', 
                border: 'none',
                cursor: 'pointer',
                opacity: (loading || items.length === 0) ? 0.5 : 1
              }}
            >
              {loading ? "YÜKLENİYOR..." : "ANALİZİ BAŞLAT"}
            </button>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#18181b', 
            padding: '40px', 
            borderRadius: '32px', 
            border: '1px solid #27272a',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: 'rgba(34,197,94,0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <CheckCircle2 size={30} color="#22c55e" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>Analiz Hazır!</h2>
            <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>
              Yapay zeka tüm verileri işledi. Raporu görmek için ödemenizi tamamlayın.
            </p>
            <button
              onClick={handleTamiPayment}
              disabled={loading}
              style={{ 
                width: '100%',
                padding: '20px', 
                borderRadius: '16px', 
                backgroundColor: '#2563eb', 
                color: '#fff', 
                fontWeight: '900', 
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {loading ? "Yönlendiriliyor..." : <><CreditCard /> 129,90 TL ÖDE</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}