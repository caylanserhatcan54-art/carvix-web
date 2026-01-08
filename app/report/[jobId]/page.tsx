"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import VehicleDiagramC from "@/components/report/VehicleDiagramC";
import PartTable, { PartRow } from "@/components/report/PartTable";

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://ai-arac-analiz-backend.onrender.com";

/* ==============================
   UI STATUS
============================== */
type UiStatus =
  | "ORIJINAL"
  | "BOYALI"
  | "LOKAL_BOYA"
  | "DEGISEN"
  | "SUPHELI"
  | "PLASTIK"
  | "BILINMIYOR";

function normalizeStatus(raw?: string): UiStatus {
  const v = (raw || "").toUpperCase();
  if (v.includes("DEG")) return "DEGISEN";
  if (v.includes("LOKAL")) return "LOKAL_BOYA";
  if (v.includes("BOYA")) return "BOYALI";
  if (v.includes("SUP")) return "SUPHELI";
  if (v.includes("PLAST")) return "PLASTIK";
  if (v.includes("ORIJ") || v === "OK") return "ORIJINAL";
  return "BILINMIYOR";
}

function niceLabel(key: string) {
  const map: Record<string, string> = {
    front_left_door: "Sol Ön Kapı",
    front_right_door: "Sağ Ön Kapı",
    rear_left_door: "Sol Arka Kapı",
    rear_right_door: "Sağ Arka Kapı",
    hood: "Kaput",
    roof: "Tavan",
    trunk: "Bagaj",
    front_bumper: "Ön Tampon",
    rear_bumper: "Arka Tampon",
    hinge_bolts: "Kapı / Kaput Menteşeleri",
    overall_left: "Sol Yan Genel",
    overall_right: "Sağ Yan Genel",
  };
  return map[key] || key;
}

/* ==============================
   PAGE
============================== */
export default function ReportPage() {
  const { jobId: token } = useParams<{ jobId: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const fetchReport = async () => {
      try {
        const r = await fetch(`${API}/reports/${token}`);
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
  }, [token]);

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

  const report = data.report || {};
  const parts = report.parts || {};

  /* ==============================
     STATUS MAP
  ============================== */
  const statusMap: Record<string, UiStatus> = useMemo(() => {
    const m: Record<string, UiStatus> = {};
    Object.keys(parts).forEach((key) => {
      m[key] = "BILINMIYOR"; // hızlı MVP → iddia yok
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

  return (
    <main className="section">
      <div className="container">
        <div className="glass" style={{ padding: 26 }}>
          <h1>Araç Ön Analiz Raporu</h1>

          <VehicleDiagramC map={statusMap} />

          <PartTable rows={rows} />

          {/* =========================
              KANIT GÖRSELLERİ
          ========================= */}
          <div style={{ marginTop: 24 }}>
            <h3>📸 Görsel Kanıtlar</h3>

            {Object.entries(parts).map(([partKey, arr]: any) => (
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
                  {arr.map((img: any, i: number) => (
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
              Bu rapor yapay zekâ destekli ön analizdir. Boya, değişen veya
              mekanik durum hakkında kesin hüküm vermez. Resmî ekspertiz yerine
              geçmez.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
