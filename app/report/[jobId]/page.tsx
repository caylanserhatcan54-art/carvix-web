"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VehicleDiagramC from "@/components/report/VehicleDiagramC";
import PartTable, { PartRow } from "@/components/report/PartTable";

const API = (process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com").replace(/\/$/, "");

type UiStatus = "ORIJINAL" | "BOYALI" | "LOKAL_BOYA" | "DEGISEN" | "SUPHELI" | "PLASTIK" | "BILINMIYOR";

function niceLabel(key: string) {
  const map: Record<string, string> = {
    GENEL_ON: "Genel - Ön", GENEL_ARKA: "Genel - Arka", GENEL_SAG: "Genel - Sağ",
    GENEL_SOL: "Genel - Sol", GENEL_TAVAN: "Genel - Tavan", SOL_ON_KAPI: "Sol Ön Kapı",
    SAG_ON_KAPI: "Sağ Ön Kapı", SOL_ARKA_KAPI: "Sol Arka Kapı", SAG_ARKA_KAPI: "Sağ Arka Kapı",
    KAPUT: "Kaput", BAGAJ: "Bagaj",
  };
  return map[key] || key;
}

export default function ReportPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [data, setData] = useState<any>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

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

  useEffect(() => {
    if (!jobId) return;
    fetchReport();

    // Rapor "done" olana kadar her 5 saniyede bir kontrol et
    const i = setInterval(() => {
      if (data?.status !== "done") {
        fetchReport();
      }
    }, 5000);

    return () => clearInterval(i);
  }, [jobId, data?.status]);

  // TAMI ÖDEME TETİKLEYİCİ
  const handleTamiPayment = async () => {
    try {
      setLoadingPayment(true);
      const res = await fetch(`${API}/payments/tami/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            flow_token: jobId, 
            amount: 129.90 
        }),
      });
      
      const paymentData = await res.json();
      if (paymentData?.paymentUrl) {
        window.location.href = paymentData.paymentUrl;
      } else {
        alert("Ödeme başlatılamadı.");
      }
    } catch (error) {
      alert("Bağlantı hatası.");
    } finally {
      setLoadingPayment(false);
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
      note: p?.ai_comment || "Analiz bekleniyor...",
    }));
  }, [parts]);

  if (!data) return <div style={{ padding: 40, textAlign: "center", color: "#fff" }}>🔄 Rapor verileri alınıyor…</div>;

  // ÖDEME KONTROLÜ (Eğer ödenmediyse kilit ekranı göster)
  if (data.status !== "done" && !data.paid) {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center", color: "#fff" }}>
        <div className="glass" style={{ padding: 40, maxWidth: 600, margin: "0 auto", backgroundColor: "#111" }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>🔒 Analiz Raporunuz Hazır</h2>
          <p style={{ marginBottom: 24, color: "#a1a1aa" }}>
            Aracınızın yapay zeka analizi tamamlandı. Detaylı ekspertiz raporunu görüntülemek için ödemeyi tamamlayın.
          </p>
          <button 
            onClick={handleTamiPayment}
            disabled={loadingPayment}
            style={{ backgroundColor: "#2563eb", color: "white", padding: "18px 40px", borderRadius: "12px", fontSize: 18, fontWeight: "bold", cursor: "pointer", border: "none" }}
          >
            {loadingPayment ? "Lütfen Bekleyin..." : "129,90 TL ÖDE VE GÖR"}
          </button>
        </div>
      </div>
    );
  }

  // ANALİZ SÜRECİ (Ödendi ama AI hala çalışıyor)
  if (data.status === "processing" || data.status === "queued") {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center", color: "#fff" }}>
          <div className="glass" style={{ padding: 40 }}>
              <h2>✅ Ödeme Başarılı</h2>
              <p>Yapay zekamız parçaları inceliyor... Lütfen bu sayfayı kapatmayın.</p>
              <div style={{ marginTop: 20, fontSize: "40px" }} className="animate-spin">🔄</div>
          </div>
      </div>
    );
  }

  // RAPORUN KENDİSİ
  return (
    <main className="section" style={{ color: "#fff" }}>
      <div className="container">
        <div className="glass" style={{ padding: 26, backgroundColor: "#111" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
             <h1 className="h2">Yapay Zeka Ekspertiz Raporu</h1>
             <span style={{ backgroundColor: "#166534", color: "#dcfce7", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>TAMAMLANDI</span>
          </div>

          {data.report?.summary && (
            <div className="card" style={{ marginBottom: 18, padding: 15, border: "1px solid #333" }}>
              <b style={{ color: "#60a5fa" }}>🤖 Yapay Zekâ Özeti</b>
              <p style={{ marginTop: 8 }}>{data.report.summary.ai_comment}</p>
              <p style={{ marginTop: 8 }}>Genel Risk Durumu: <b>{data.report.summary.overall_risk}</b></p>
            </div>
          )}

          <VehicleDiagramC map={statusMap} />
          <PartTable rows={rows} />

          <div style={{ marginTop: 32 }}>
            <h3>📸 Analiz Kanıtları</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginTop: 16 }}>
              {Object.entries(parts).map(([partKey, p]: any) => 
                Array.isArray(p?.evidence) && p.evidence.map((ev: any, i: number) => (
                  <div key={`${partKey}-${i}`} className="card" style={{ overflow: "hidden" }}>
                    <img src={ev.source_url} alt={partKey} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                    <div style={{ padding: 8, fontSize: 11, textAlign: "center" }}>{niceLabel(partKey)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}