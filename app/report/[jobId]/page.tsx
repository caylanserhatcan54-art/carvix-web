"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { VEHICLE_CONFIG, VehicleType } from "@/lib/vehicleConfig";

const API = process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com";

type PartVerdict = "CLEAN" | "SUSPECTED" | "DETECTED" | "NOT_ENOUGH_DATA";
type Severity = "DUSUK" | "ORTA" | "YUKSEK" | "BILINMIYOR";

type PartIssue = {
  code: string;           // e.g. "PAINT_LOCAL", "BOLT_TAMPER", "DENT", "SCRATCH"
  title: string;          // kısa
  detail?: string;        // 1 cümle
  evidence?: string[];    // 1-3 madde
  confidence: number;     // 0-1
};

type PartResult = {
  part: string;
  verdict: PartVerdict;
  confidence: number; // 0-1
  damage_severity: Severity;
  paint?: { label: PartVerdict; confidence: number; evidence?: string[] };
  tamper?: { label: PartVerdict; confidence: number; evidence?: string[] };
  issues: PartIssue[]; // ✅ “hangi parçada ne sorun olabilir”
};

type ReportPayload = {
  id: string;
  token?: string;
  vehicle_type: VehicleType;
  package: "quick" | "detailed";
  status: "queued" | "processing" | "done" | "failed";
  created_at?: any;
  overall_confidence: number; // 0-1
  coverage: { required_missing?: string[]; uploaded_parts: string[]; package: string; vehicle_type: string };
  summary: {
    overall_risk: "DUSUK" | "ORTA" | "YUKSEK";
    highlights: string[];
  };
  parts: Record<string, PartResult>;
  ai_commentary?: {
    model: string;
    text: string;
  };
  legal?: {
    disclaimer: string;
  };
};

function badge(text: string, tone: "ok"|"warn"|"bad"|"muted") {
  const bg = tone==="ok" ? "#eaffea" : tone==="warn" ? "#fff7ed" : tone==="bad" ? "#ffe4e6" : "#f3f4f6";
  const bd = tone==="ok" ? "#86efac" : tone==="warn" ? "#fdba74" : tone==="bad" ? "#fda4af" : "#e5e7eb";
  const fg = tone==="ok" ? "#166534" : tone==="warn" ? "#9a3412" : tone==="bad" ? "#9f1239" : "#374151";
  return (
    <span style={{ padding:"6px 10px", borderRadius:999, border:`1px solid ${bd}`, background:bg, color:fg, fontSize:12, fontWeight:700 }}>
      {text}
    </span>
  );
}

function toneFromVerdict(v: PartVerdict) {
  if (v === "DETECTED") return "bad";
  if (v === "SUSPECTED") return "warn";
  if (v === "CLEAN") return "ok";
  return "muted";
}

function fmtPct(x: number) {
  const n = Math.max(0, Math.min(1, x || 0));
  return `%${Math.round(n * 100)}`;
}

// Basit araç iskeleti (kapı/kaput/bagaj bölgelerini "id" ile işaretleyip renklendiriyoruz)
function CarSkeleton({ parts }: { parts: Record<string, PartResult> }) {
  const color = (key: string) => {
    const v = parts?.[key]?.verdict;
    if (v === "DETECTED") return "#ef4444";
    if (v === "SUSPECTED") return "#f59e0b";
    if (v === "CLEAN") return "#22c55e";
    return "#d1d5db";
  };

  const stroke = "#111827";

  return (
    <svg viewBox="0 0 760 220" style={{ width:"100%", height:"auto", border:"1px solid #eee", borderRadius:12, background:"#fff" }}>
      {/* gövde */}
      <rect x="110" y="70" width="540" height="90" rx="22" fill="#f9fafb" stroke={stroke} />
      {/* tekerlekler */}
      <circle cx="200" cy="170" r="28" fill="#111827" />
      <circle cx="560" cy="170" r="28" fill="#111827" />
      {/* kaput */}
      <rect x="120" y="80" width="160" height="70" rx="14" fill={color("KAPUT")} opacity="0.85" stroke={stroke} />
      {/* bagaj */}
      <rect x="480" y="80" width="160" height="70" rx="14" fill={color("BAGAJ")} opacity="0.85" stroke={stroke} />
      {/* sol kapılar (üstte gösterim sembolik) */}
      <rect x="290" y="80" width="90" height="70" rx="12" fill={color("SOL_ON_KAPI")} opacity="0.85" stroke={stroke} />
      <rect x="385" y="80" width="90" height="70" rx="12" fill={color("SOL_ARKA_KAPI")} opacity="0.85" stroke={stroke} />
      {/* sağ kapılar (aynı bölgede sembolik) */}
      <rect x="290" y="154" width="90" height="1" fill="transparent" />
      <rect x="385" y="154" width="90" height="1" fill="transparent" />

      {/* Etiket */}
      <text x="18" y="22" fontSize="14" fill="#111827" fontWeight="700">Araç İskeleti (Panel Risk Haritası)</text>
      <text x="18" y="42" fontSize="12" fill="#6b7280">Kırmızı: tespit • Turuncu: şüpheli • Yeşil: temiz • Gri: veri yok</text>
    </svg>
  );
}

export default function ReportPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<any>(null);
  const [payload, setPayload] = useState<ReportPayload | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      const r = await fetch(`${API}/jobs/${jobId}`);
      const d = await r.json();
      setJob(d);
      if (d?.status === "done") setPayload(d.result);
    };

    fetchJob();
    const i = setInterval(fetchJob, 2500);
    return () => clearInterval(i);
  }, [jobId]);

  if (!job) return <div style={{ padding: 40 }}>Yükleniyor…</div>;
  if (job.status !== "done") {
    return (
      <div style={{ padding: 40 }}>
        <h2>🔄 Analiz Yapılıyor…</h2>
        <p style={{ color: "#6b7280" }}>Rapor hazırlanıyor. Lütfen bu sayfayı kapatmayın.</p>
      </div>
    );
  }
  if (!payload) return <div style={{ padding: 40 }}>Rapor verisi alınamadı.</div>;

  const config = VEHICLE_CONFIG[payload.vehicle_type] || VEHICLE_CONFIG["car"];
  const partsArr = Object.values(payload.parts || {});
  const detected = partsArr.filter(p => p.verdict === "DETECTED").length;
  const suspected = partsArr.filter(p => p.verdict === "SUSPECTED").length;

  const missingRequired = payload.coverage?.required_missing || [];
  const overallTone = payload.summary?.overall_risk === "YUKSEK" ? "bad" : payload.summary?.overall_risk === "ORTA" ? "warn" : "ok";

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 26 }}>
      <div style={{ display:"flex", justifyContent:"space-between", gap: 16, flexWrap:"wrap" }}>
        <div>
          <h1 style={{ marginBottom: 6 }}>Araç AI Ekspertiz Ön Raporu</h1>
          <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
            {badge(`Araç: ${config.title}`, "muted")}
            {badge(`Paket: ${payload.package === "detailed" ? "Detaylı" : "Hızlı"}`, "muted")}
            {badge(`Genel Risk: ${payload.summary?.overall_risk || "BILINMIYOR"}`, overallTone as any)}
            {badge(`Genel Güven: ${fmtPct(payload.overall_confidence)}`, "muted")}
          </div>
        </div>

        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize: 12, color:"#6b7280" }}>Rapor ID</div>
          <div style={{ fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace" }}>{payload.id}</div>
        </div>
      </div>

      {/* Kapsama / Eksik zorunlu */}
      {!!missingRequired.length && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border:"1px solid #fdba74", background:"#fff7ed" }}>
          <b>Kapsama Uyarısı</b>
          <div style={{ marginTop: 6, color:"#9a3412" }}>
            Zorunlu fotoğraflar eksik olduğu için bazı değerlendirmeler sınırlı güvenilirliktedir:
          </div>
          <div style={{ marginTop: 8, display:"flex", flexWrap:"wrap", gap: 8 }}>
            {missingRequired.map((p) => (
              <span key={p} style={{ padding:"6px 10px", borderRadius:999, border:"1px solid #fed7aa", background:"#fff" }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      {/* Risk haritası */}
      {payload.vehicle_type === "car" || payload.vehicle_type === "electric_car" || payload.vehicle_type === "pickup" || payload.vehicle_type === "van_kamyonet" ? (
        <div style={{ marginTop: 16 }}>
          <CarSkeleton parts={payload.parts} />
        </div>
      ) : null}

      {/* Özet kutusu */}
      <div style={{ marginTop: 16, padding: 14, border:"1px solid #eee", borderRadius: 12, background:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap: 10 }}>
          <b>Genel Özet</b>
          <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
            {badge(`Tespit: ${detected}`, detected ? "bad" : "muted")}
            {badge(`Şüpheli: ${suspected}`, suspected ? "warn" : "muted")}
            {badge(`Yüklenen Parça: ${payload.coverage?.uploaded_parts?.length || 0}`, "muted")}
          </div>
        </div>
        <ul style={{ marginTop: 10, marginBottom: 0 }}>
          {(payload.summary?.highlights || []).map((h, i) => (
            <li key={i} style={{ color:"#111827", marginTop: 6 }}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Parça Bazlı Tablo */}
      <div style={{ marginTop: 16, padding: 14, border:"1px solid #eee", borderRadius: 12, background:"#fff" }}>
        <b>Parça Bazlı Bulgular (Ekspertiz Tablosu)</b>

        <div style={{ overflowX:"auto", marginTop: 10 }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign:"left", borderBottom:"1px solid #eee" }}>
                <th style={{ padding:"10px 8px" }}>Parça</th>
                <th style={{ padding:"10px 8px" }}>Sonuç</th>
                <th style={{ padding:"10px 8px" }}>Güven</th>
                <th style={{ padding:"10px 8px" }}>Hasar</th>
                <th style={{ padding:"10px 8px" }}>Boya</th>
                <th style={{ padding:"10px 8px" }}>Sök-Tak</th>
                <th style={{ padding:"10px 8px" }}>Olası Sorunlar</th>
              </tr>
            </thead>
            <tbody>
              {partsArr
                .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
                .map((p) => (
                  <tr key={p.part} style={{ borderBottom:"1px solid #f3f4f6" }}>
                    <td style={{ padding:"10px 8px", fontWeight: 700 }}>{p.part}</td>
                    <td style={{ padding:"10px 8px" }}>{badge(p.verdict, toneFromVerdict(p.verdict) as any)}</td>
                    <td style={{ padding:"10px 8px" }}>{fmtPct(p.confidence)}</td>
                    <td style={{ padding:"10px 8px" }}>{p.damage_severity}</td>
                    <td style={{ padding:"10px 8px" }}>
                      {p.paint ? `${p.paint.label} (${fmtPct(p.paint.confidence)})` : "—"}
                    </td>
                    <td style={{ padding:"10px 8px" }}>
                      {p.tamper ? `${p.tamper.label} (${fmtPct(p.tamper.confidence)})` : "—"}
                    </td>
                    <td style={{ padding:"10px 8px" }}>
                      {p.issues?.length ? (
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {p.issues.slice(0, 3).map((iss) => (
                            <li key={iss.code}>
                              <b>{iss.title}</b> {iss.detail ? `— ${iss.detail}` : ""} <span style={{ color:"#6b7280" }}>({fmtPct(iss.confidence)})</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span style={{ color:"#6b7280" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI yorum */}
      <div style={{ marginTop: 16, padding: 14, border:"1px solid #eee", borderRadius: 12, background:"#fff" }}>
        <b>Yapay Zekâ Değerlendirmesi (Ön Yorum)</b>
        <div style={{ marginTop: 10, whiteSpace:"pre-wrap", lineHeight: 1.55 }}>
          {payload.ai_commentary?.text || "AI yorumu henüz üretilmedi."}
        </div>
        <div style={{ marginTop: 10, color:"#6b7280", fontSize: 12 }}>
          Model: {payload.ai_commentary?.model || "—"}
        </div>
      </div>

      {/* Hukuki / uyarı */}
      <div style={{ marginTop: 16, padding: 14, border:"1px solid #e5e7eb", borderRadius: 12, background:"#f9fafb" }}>
        <b>Hukuki Bilgilendirme</b>
        <div style={{ marginTop: 10, color:"#374151", fontSize: 13, lineHeight: 1.6 }}>
          {payload.legal?.disclaimer ||
            `Bu rapor, yüklenen fotoğraf/ses verileri üzerinden yapay zekâ destekli “ön değerlendirme” niteliğindedir.
Kesin tespit ve bağlayıcı sonuç değildir; ekspertiz yerine geçmez. Araç satın alma/satma kararı öncesinde fiziki inceleme ve
yetkili/akredite ekspertiz hizmeti alınması önerilir. Sistem; çekim açısı, ışık, görüntü kalitesi ve yüklenen parça kapsamına bağlı olarak
yanılabilir (yanlış pozitif/yanlış negatif).`}
        </div>
      </div>
    </main>
  );
}
