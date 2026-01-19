"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  VEHICLE_CONFIG,
  VehicleType,
  PackageType,
  PartKey,
} from "@/lib/vehicleConfig";
import { Upload, Trash2, CreditCard, CheckCircle2, Zap, Image as ImageIcon, Loader2, Mail, AlertCircle } from "lucide-react";

const API = (process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com").replace(/\/$/, "");
const SHOPIER_LINK = "https://www.shopier.com/carvix/43380964"; 

type ImageItem = {
  file: File;
  part: PartKey | "";
};

export default function UploadPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const vehicleType = (sp.get("v") as VehicleType) || "car";
  const pkg = (sp.get("p") as PackageType) || "quick";
  const config = VEHICLE_CONFIG[vehicleType];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [flowToken, setFlowToken] = useState<string | null>(null);
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    async function initFlow() {
      try {
        const res = await fetch(`${API}/flows`, { method: "POST" });
        const data = await res.json();
        if (data.token) setFlowToken(data.token);
      } catch (err) {
        console.error("Flow başlatılamadı:", err);
      }
    }
    initFlow();
  }, []);

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
    if (!flowToken || !items.length) {
      alert("Sistem hazır değil. Lütfen sayfayı yenileyin.");
      return;
    }
    if (!email || !email.includes("@")) {
      alert("Lütfen raporun gönderileceği geçerli bir e-posta adresi girin.");
      return;
    }
    if (items.some(it => !it.part)) {
      alert("Lütfen her fotoğraf için parça seçimi yapın.");
      return;
    }

    setLoading(true);
    try {
      const grouped: Record<string, File[]> = {};
      items.forEach(it => {
        if (!grouped[it.part]) grouped[it.part] = [];
        grouped[it.part].push(it.file);
      });

      for (const partKey of Object.keys(grouped)) {
        const form = new FormData();
        form.append("part_key", partKey);
        grouped[partKey].forEach(file => form.append("files", file));
        await fetch(`${API}/flows/${flowToken}/upload`, { method: "POST", body: form });
      }

      await fetch(`${API}/flows/${flowToken}/submit`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      });
      
      setAnalysisReady(true);
    } catch (err) {
      alert("Yükleme başarısız oldu.");
    } finally {
      setLoading(false);
    }
  }

  const handlePayment = () => {
    window.location.href = SHOPIER_LINK;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59,130,246,0.1)', padding: '6px 16px', borderRadius: '100px', color: '#60a5fa', fontSize: '11px', fontWeight: 'bold', marginBottom: '20px' }}>
            <Zap size={14} /> YAPAY ZEKA ANALİZ MERKEZİ
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-1px' }}>Rapor Hazırlığı</h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>{config.title} • {pkg === "quick" ? "Hızlı" : "Detaylı"} Paket</p>
        </div>

        {!analysisReady ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* E-posta Giriş Alanı ve Önemli Uyarı */}
            <div style={{ backgroundColor: '#18181b', padding: '20px', borderRadius: '24px', border: '1px solid #27272a', textAlign: 'left' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#a1a1aa', marginBottom: '10px' }}>
                 <Mail size={16} /> Raporun Gönderileceği E-posta
               </label>
               <input 
                 type="email" 
                 placeholder="ornek@mail.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 style={{ width: '100%', padding: '14px', borderRadius: '14px', backgroundColor: '#000', border: '1px solid #3f3f3f', color: '#fff', outline: 'none', marginBottom: '16px' }}
               />
               
               {/* Kullanıcı Bilgilendirme Kutusu */}
               <div style={{ display: 'flex', gap: '10px', padding: '12px', backgroundColor: 'rgba(59,130,246,0.05)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <AlertCircle size={18} color="#60a5fa" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '11px', color: '#d1d1d6', margin: 0, lineHeight: '1.5' }}>
                    <strong style={{ color: '#60a5fa' }}>Önemli Not:</strong> Otomatik onaylama sistemimiz e-posta üzerinden eşleşme yapar. Lütfen ödeme sayfasında da yukarıda girdiğiniz e-posta adresini kullandığınızdan emin olun.
                  </p>
               </div>
            </div>

            <div style={{ position: 'relative', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '24px', padding: '60px 20px', backgroundColor: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
              <input type="file" multiple accept="image/*" onChange={(e) => onFilesSelected(e.target.files)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
              <Upload size={40} color="#3b82f6" style={{ marginBottom: '16px' }} />
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>Fotoğrafları Seçin</p>
              <p style={{ fontSize: '12px', color: '#52525b' }}>Aracın parçalarını net şekilde çekip yükleyin</p>
            </div>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((it, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#18181b', padding: '12px', borderRadius: '16px', border: '1px solid #27272a' }}>
                  <ImageIcon size={18} color="#3b82f6" />
                  <span style={{ flex: 1, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.file.name}</span>
                  <select
                    style={{ backgroundColor: '#000', color: '#fff', border: '1px solid #3f3f3f', borderRadius: '8px', padding: '4px 8px', fontSize: '11px' }}
                    value={it.part}
                    onChange={(e) => updatePart(i, e.target.value as PartKey)}
                  >
                    <option value="">Parça Seçin</option>
                    {config.parts.map((p) => (
                      <option key={p.key} value={p.key}>{p.label}</option>
                    ))}
                  </select>
                  <button onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            <button onClick={submit} disabled={loading || items.length === 0} style={{ marginTop: '20px', padding: '18px', borderRadius: '16px', backgroundColor: '#fff', color: '#000', fontWeight: '900', border: 'none', cursor: 'pointer', opacity: (loading || items.length === 0) ? 0.5 : 1 }}>
              {loading ? "İŞLENİYOR..." : "ANALİZİ BAŞLAT"}
            </button>
          </div>
        ) : (
          <div style={{ backgroundColor: '#18181b', padding: '40px', borderRadius: '32px', border: '1px solid #27272a', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle2 size={30} color="#22c55e" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>Analiz Kuyruğa Alındı!</h2>
            <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>
              Fotoğraflarınız başarıyla yüklendi. Raporunuz hazırlandığında <b>{email}</b> adresine gönderilecektir. Devam etmek için ödemeyi tamamlayın.
            </p>
            <button onClick={handlePayment} style={{ width: '100%', padding: '20px', borderRadius: '16px', backgroundColor: '#2563eb', color: '#fff', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <CreditCard /> 129,90 TL ÖDE
            </button>
            <p style={{ fontSize: '11px', color: '#52525b', marginTop: '15px' }}>
              Ödemeniz Shopier güvencesiyle 256-bit SSL korumalı sayfada yapılacaktır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}