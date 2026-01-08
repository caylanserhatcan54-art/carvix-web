"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import VehicleDiagramC from "@/components/report/VehicleDiagramC";
import PartTable, { PartRow } from "@/components/report/PartTable";

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://ai-arac-analiz-backend.onrender.com";

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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchReport = async () => {
      try {
        const r = await fetch(`${API}/reports/${jobId}`);
        if (!r.ok) return;
        const d = await r.json();
        setData(d);
      } catch (e) {
        console.error("Rapor alınamadı", e);
      }
    };

    fetchReport();
    const i = setInterval(fetchReport, 3000);
    return () => clearInterval(i);
  }, [jobId]);

  /** 🔒 HER ZAMAN TANIMLI OLSUN */
  const parts = data?.report?.parts ?? {};

  /** ✅ HOOKLAR KOŞULSUZ */
  const statusMap: Record<string, UiStatus> = useMemo(() => {
    const m: Record<string, UiStatus> = {};
    Object.keys(parts).forEach((key) => {
      m[key] = "BILINMIYOR";
    });
    return m;
  }, [parts]);

  const rows: PartRow[] = useMemo(() => {
    return Object.entries(parts).map(([key, images]: any) => ({
      key,
      label: niceLabel(key),
      status: "BILINMIYOR",
      note:
        images?.length > 0
          ? "Bu parça için kanıt görselleri aşağıda sunulmuştur."
          : "Bu parça için yeterli veri yok.",
    }));
  }, [parts]);

  /** ⬇️ ARTIK RETURN’LER GÜVENLİ */
  if (!data) {
    return <div style={{ padding: 40 }}>🔄 Rapor yükleniyor…</div>;
  }

  if (data.status !== "done") {
    return (
      <div style={{ padding: 40 }}>
        <h2>Analiz Devam Ediyor</h2>
        <p>Lütfen bekleyin…</p>
      </div>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="glass" style={{ padding: 26 }}>
          <h1>Araç Ön Analiz Raporu</h1>

          <VehicleDiagramC map={statusMap} />

          <PartTable rows={rows} />

          <div style={{ marginTop: 24 }}>
            <h3>📸 Görsel Kanıtlar</h3>

            {Object.entries(parts).map(([partKey, arr]: any) => (
              <div key={partKey} style={{ marginTop: 18 }}>
                <b>{niceLabel(partKey)}</b>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  {Array.isArray(arr) &&
                    arr.map((img: any, i: number) => (
                      <div key={i} className="card">
                        {img.annotated_url && (
                          <>
                            <div className="small">Algılanan Araç</div>
                            <img
                              src={img.annotated_url}
                              style={{ width: "100%", borderRadius: 8 }}
                            />
                          </>
                        )}

                        {img.crop_url && (
                          <>
                            <div className="small">Odaklanan Bölge</div>
                            <img
                              src={img.crop_url}
                              style={{ width: "100%", borderRadius: 8 }}
                            />
                          </>
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
              Bu rapor yapay zekâ destekli ön analizdir. Resmî ekspertiz yerine
              geçmez.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
