"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VehicleDiagramC from "@/components/report/VehicleDiagramC";
import PartTable, { PartRow } from "@/components/report/PartTable";

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://ai-arac-analiz-backend.onrender.com";

// Lemon Squeezy tip tanımı
declare global {
  interface Window {
    createLemonSqueezy: () => void;
    LemonSqueezy: any;
  }
}

type UiStatus =
  | "ORIJINAL"
  | "BOYALI"
  | "LOKAL_BOYA"
  | "DEGISEN"
  | "SUPHELI"
  | "PLASTIK"
  | "BILINMIYOR";

function niceLabel(key: string) {
  const map: Record<string, string> = {
    GENEL_ON: "Genel - Ön",
    GENEL_ARKA: "Genel - Arka",
    GENEL_SAG: "Genel - Sağ",
    GENEL_SOL: "Genel - Sol",
    GENEL_TAVAN: "Genel - Tavan",
    SOL_ON_KAPI: "Sol Ön Kapı",
    SAG_ON_KAPI: "Sağ Ön Kapı",
    SOL_ARKA_KAPI: "Sol Arka Kapı",
    SAG_ARKA_KAPI: "Sağ Arka Kapı",
    KAPUT: "Kaput",
    BAGAJ: "Bagaj",
  };
  return map[key] || key;
}

export default function ReportPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchReport = async () => {
      try {
        const r = await fetch(`${API}/reports/${jobId}`);
        if (!r.ok) return;
        const d = await r.json();
        setData(d);
      } catch (error) {
        console.error("Rapor çekilemedi:", error);
      }
    };

    fetchReport();
    // Ödeme yapılıp status "done" olana kadar her 3 saniyede bir kontrol et
    const i = setInterval(() => {
        if (data?.status !== "done") {
            fetchReport();
        }
    }, 3000);

    return () => clearInterval(i);
  }, [jobId, data?.status]);

  // Lemon Squeezy'yi başlat
  useEffect(() => {
    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

  const handlePayment = () => {
    const checkoutUrl = `https://carvix.lemonsqueezy.com/checkout/buy/5b3fb07b-2fdb-486e-84e6-ed99f2c2b964?embed=1&checkout[custom][token]=${jobId}`;
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Url.Open(checkoutUrl);
    } else {
      window.open(checkoutUrl, "_blank");
    }
  };

  const parts: Record<string, any> = data?.report?.parts ?? {};

  const statusMap: Record<string, UiStatus> = useMemo(() => {
    const m: Record<string, UiStatus> = {};
    Object.entries(parts).forEach(([key, p]) => {
      m[key] = (p?.status as UiStatus) || "BILINMIYOR";
    });
    return m;
  }, [parts]);

  const rows: PartRow[] = useMemo(() => {
    return Object.entries(parts).map(([key, p]: any) => ({
      key,
      label: niceLabel(key),
      status: p?.status || "BILINMIYOR",
      note: p?.ai_comment || "Bu parça için yeterli analiz verisi yok.",
    }));
  }, [parts]);

  // 1. Yükleme Ekranı
  if (!data) {
    return <div style={{ padding: 40, textAlign: "center" }}>🔄 Rapor verileri alınıyor…</div>;
  }

  // 2. ÖDEME KONTROLÜ (Ödeme yapılmadıysa raporu kilitle)
  // Backend'den status "queued", "processing" geliyorsa ve "paid" değilse burası çalışır
  if (data.status !== "done" && data.status !== "paid") {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <div className="glass" style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>🔒 Raporunuz Hazır!</h2>
          <p style={{ marginBottom: 24, color: "#666" }}>
            Aracınızın yapay zeka analizi tamamlandı. Detaylı boya, değişen ve risk raporunu görüntülemek için lütfen ödemeyi tamamlayın.
          </p>
          <button 
            onClick={handlePayment}
            style={{ 
              backgroundColor: "#2563eb", 
              color: "white", 
              padding: "15px 40px", 
              borderRadius: "8px", 
              fontSize: 18, 
              fontWeight: "bold",
              cursor: "pointer",
              border: "none"
            }}
          >
            129,90 TL ÖDE VE RAPORU GÖR
          </button>
        </div>
      </div>
    );
  }

  // 3. ÖDEME YAPILDI AMA ANALİZ HENÜZ BİTMEDİ (Worker çalışıyor)
  if (data.status === "paid" || (data.status === "queued" && data.paid)) {
      return (
        <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
            <div className="glass" style={{ padding: 40 }}>
                <h2>✅ Ödeme Onaylandı</h2>
                <p>Yapay zekamız görsellerinizi inceliyor, raporunuz saniyeler içinde burada olacak...</p>
                <div className="loader" style={{ marginTop: 20 }}>🔄</div>
            </div>
        </div>
      )
  }

  // 4. RAPOR EKRANI (Her şey tamam)
  return (
    <main className="section">
      <div className="container">
        <div className="glass" style={{ padding: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
             <h1>Araç Ön Analiz Raporu</h1>
             <span style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>ÖDENDİ</span>
          </div>

          {data.report?.summary && (
            <div className="card" style={{ marginBottom: 18 }}>
              <b>🤖 Yapay Zekâ Genel Yorumu</b>
              <p className="small">{data.report.summary.ai_comment}</p>
              <p className="small">
                Genel Risk: <b>{data.report.summary.overall_risk}</b>
              </p>
            </div>
          )}

          <VehicleDiagramC map={statusMap} />

          <PartTable rows={rows} />

          <div style={{ marginTop: 24 }}>
            <h3>📸 Görsel Kanıtlar</h3>
            {Object.entries(parts).map(([partKey, p]: any) => (
              <div key={partKey} style={{ marginTop: 18 }}>
                <b>{niceLabel(partKey)}</b>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  {Array.isArray(p?.evidence) &&
                    p.evidence.map((ev: any, i: number) => (
                      <div key={i} className="card">
                        {ev.source_url && (
                          <img
                            src={ev.source_url}
                            alt={partKey}
                            style={{ width: "100%", borderRadius: 8 }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <b>⚠️ Hukuki Bilgilendirme</b>
            <p className="small">
              Bu rapor yapay zekâ destekli ön analizdir. Resmî ekspertiz yerine geçmez.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}