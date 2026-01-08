"use client";

import React from "react";

type UiStatus = "ORIJINAL" | "BOYALI" | "LOKAL_BOYA" | "DEGISEN" | "SUPHELI" | "PLASTIK" | "BILINMIYOR";

type PartUi = {
  key: string;
  label: string;
  status: UiStatus;
};

function statusColor(s: UiStatus) {
  switch (s) {
    case "ORIJINAL": return { fill: "#22c55e", text: "#052e16" };   // green
    case "BOYALI": return { fill: "#ef4444", text: "#450a0a" };     // red
    case "LOKAL_BOYA": return { fill: "#f59e0b", text: "#451a03" }; // amber
    case "DEGISEN": return { fill: "#a855f7", text: "#2e1065" };    // purple
    case "SUPHELI": return { fill: "#fb923c", text: "#431407" };    // orange
    case "PLASTIK": return { fill: "#9ca3af", text: "#111827" };    // gray
    default: return { fill: "#e5e7eb", text: "#111827" };
  }
}

function statusText(s: UiStatus) {
  switch (s) {
    case "ORIJINAL": return "ORİJİNAL";
    case "BOYALI": return "BOYALI";
    case "LOKAL_BOYA": return "LOKAL BOYALI";
    case "DEGISEN": return "DEĞİŞMİŞ";
    case "SUPHELI": return "ŞÜPHELİ";
    case "PLASTIK": return "PLASTİK";
    default: return "VERİ YOK";
  }
}

function Box({
  x, y, w, h, title, status,
}: { x:number; y:number; w:number; h:number; title:string; status:UiStatus }) {
  const c = statusColor(status);
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={c.fill} opacity={0.20} stroke={c.fill} strokeWidth={2} />
      <text x={x + 10} y={y + 22} fontSize={12} fill="#111827" fontWeight={800}>{title}</text>
      <text x={x + 10} y={y + 42} fontSize={12} fill={c.text} fontWeight={900}>{statusText(status)}</text>
    </>
  );
}

/**
 * C şeması: 3 görünüm (YAN / ÖN / ARKA)
 * Parça key'leri: KAPUT, TAVAN, BAGAJ, SOL_ON_KAPI, SOL_ARKA_KAPI, SAG_ON_KAPI, SAG_ARKA_KAPI,
 * SOL_ON_CAMURLUK, SAG_ON_CAMURLUK, SOL_ARKA_CAMURLUK, SAG_ARKA_CAMURLUK, ON_TAMPON, ARKA_TAMPON
 */
export default function VehicleDiagramC({
  map,
}: { map: Record<string, UiStatus> }) {

  // güvenli getter
  const g = (k: string): UiStatus => map?.[k] || "BILINMIYOR";

  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>Araç Şeması (Yan / Ön / Arka)</div>
      <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12, marginBottom: 12 }}>
        Renkler: Yeşil=Orijinal • Sarı=Lokal • Kırmızı=Boyalı • Mor=Değişen • Turuncu=Şüpheli • Gri=Plastik
      </div>

      <svg viewBox="0 0 1080 320" style={{ width: "100%", height: "auto" }}>
        {/* ----- YAN GÖRÜNÜM (sol) ----- */}
        <g transform="translate(0,0)">
          <text x="20" y="22" fontSize="14" fill="#fff" fontWeight="900">YAN</text>

          <Box x={20}  y={40} w={250} h={62} title="KAPUT" status={g("KAPUT")} />
          <Box x={290} y={40} w={160} h={62} title="SOL ÖN KAPI" status={g("SOL_ON_KAPI")} />
          <Box x={460} y={40} w={160} h={62} title="SOL ARKA KAPI" status={g("SOL_ARKA_KAPI")} />
          <Box x={630} y={40} w={250} h={62} title="BAGAJ" status={g("BAGAJ")} />

          <Box x={20}  y={112} w={250} h={56} title="SOL ÖN ÇAMURLUK" status={g("SOL_ON_CAMURLUK")} />
          <Box x={630} y={112} w={250} h={56} title="SOL ARKA ÇAMURLUK" status={g("SOL_ARKA_CAMURLUK")} />
          <Box x={290} y={112} w={330} h={56} title="TAVAN" status={g("TAVAN")} />
        </g>

        {/* ----- ÖN GÖRÜNÜM (orta) ----- */}
        <g transform="translate(360,0)">
          <text x="380" y="22" fontSize="14" fill="#fff" fontWeight="900">ÖN</text>
          <Box x={360} y={40} w={320} h={62} title="ÖN TAMPON" status={g("ON_TAMPON")} />
          <Box x={360} y={112} w={155} h={56} title="SAĞ ÖN ÇAMURLUK" status={g("SAG_ON_CAMURLUK")} />
          <Box x={525} y={112} w={155} h={56} title="SOL ÖN ÇAMURLUK" status={g("SOL_ON_CAMURLUK")} />
          <Box x={360} y={178} w={320} h={56} title="KAPUT" status={g("KAPUT")} />
        </g>

        {/* ----- ARKA GÖRÜNÜM (sağ) ----- */}
        <g transform="translate(720,0)">
          <text x="20" y="22" fontSize="14" fill="#fff" fontWeight="900">ARKA</text>
          <Box x={20} y={40} w={320} h={62} title="ARKA TAMPON" status={g("ARKA_TAMPON")} />
          <Box x={20} y={112} w={155} h={56} title="SAĞ ARKA ÇAMURLUK" status={g("SAG_ARKA_CAMURLUK")} />
          <Box x={185} y={112} w={155} h={56} title="SOL ARKA ÇAMURLUK" status={g("SOL_ARKA_CAMURLUK")} />
          <Box x={20} y={178} w={320} h={56} title="BAGAJ" status={g("BAGAJ")} />
        </g>
      </svg>
    </div>
  );
}
