"use client";

import React from "react";

type UiStatus =
  | "ORIJINAL"
  | "BOYALI"
  | "LOKAL_BOYA"
  | "DEGISEN"
  | "SUPHELI"
  | "PLASTIK"
  | "BILINMIYOR";

function statusColor(s: UiStatus) {
  switch (s) {
    case "ORIJINAL":
      return { fill: "#22c55e", text: "#052e16" };
    case "BOYALI":
      return { fill: "#ef4444", text: "#450a0a" };
    case "LOKAL_BOYA":
      return { fill: "#f59e0b", text: "#451a03" };
    case "DEGISEN":
      return { fill: "#a855f7", text: "#2e1065" };
    case "SUPHELI":
      return { fill: "#fb923c", text: "#431407" };
    case "PLASTIK":
      return { fill: "#9ca3af", text: "#111827" };
    default:
      return { fill: "#e5e7eb", text: "#111827" };
  }
}

function statusText(s: UiStatus) {
  switch (s) {
    case "ORIJINAL":
      return "ORİJİNAL";
    case "BOYALI":
      return "BOYALI";
    case "LOKAL_BOYA":
      return "LOKAL BOYALI";
    case "DEGISEN":
      return "DEĞİŞEN";
    case "SUPHELI":
      return "ŞÜPHELİ";
    case "PLASTIK":
      return "PLASTİK";
    default:
      return "VERİ YOK";
  }
}

/** Uzun başlıkları 2 satıra böler */
function splitLabel(text: string): [string, string | null] {
  const parts = text.split(" ");
  if (parts.length <= 2) return [text, null];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

function Box({
  x,
  y,
  w,
  h,
  title,
  status,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  status: UiStatus;
}) {
  const c = statusColor(status);
  const [l1, l2] = splitLabel(title);

  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={c.fill}
        opacity={0.18}
        stroke={c.fill}
        strokeWidth={2}
      />
      <text x={x + 10} y={y + 20} fontSize={11} fill="#111827" fontWeight={800}>
        {l1}
      </text>
      {l2 && (
        <text
          x={x + 10}
          y={y + 34}
          fontSize={11}
          fill="#111827"
          fontWeight={800}
        >
          {l2}
        </text>
      )}
      <text
        x={x + 10}
        y={y + h - 10}
        fontSize={12}
        fill={c.text}
        fontWeight={900}
      >
        {statusText(status)}
      </text>
    </>
  );
}

export default function VehicleDiagramC({
  map,
}: {
  map: Record<string, UiStatus>;
}) {
  const g = (k: string): UiStatus => map?.[k] || "BILINMIYOR";

  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>
        Araç Şeması (Yan / Ön / Arka)
      </div>
      <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12, marginBottom: 12 }}>
        Renkler: Yeşil=Orijinal • Sarı=Lokal • Kırmızı=Boyalı • Mor=Değişen • Turuncu=Şüpheli
      </div>

      <svg viewBox="0 0 1100 360" style={{ width: "100%", height: "auto" }}>
        {/* ================= YAN ================= */}
        <g transform="translate(0,0)">
          <text x="20" y="20" fontSize="14" fill="#fff" fontWeight="900">
            YAN
          </text>

          <Box x={20} y={40} w={260} h={64} title="KAPUT" status={g("KAPUT")} />
          <Box
            x={300}
            y={40}
            w={170}
            h={64}
            title="SOL ÖN KAPI"
            status={g("SOL_ON_KAPI")}
          />
          <Box
            x={480}
            y={40}
            w={170}
            h={64}
            title="SOL ARKA KAPI"
            status={g("SOL_ARKA_KAPI")}
          />
          <Box x={660} y={40} w={260} h={64} title="BAGAJ" status={g("BAGAJ")} />

          <Box
            x={20}
            y={118}
            w={260}
            h={56}
            title="SOL ÖN ÇAMURLUK"
            status={g("SOL_ON_CAMURLUK")}
          />
          <Box
            x={660}
            y={118}
            w={260}
            h={56}
            title="SOL ARKA ÇAMURLUK"
            status={g("SOL_ARKA_CAMURLUK")}
          />
          <Box x={300} y={118} w={350} h={56} title="TAVAN" status={g("TAVAN")} />
        </g>

        {/* ================= ÖN ================= */}
        <g transform="translate(0,200)">
          <text x="20" y="20" fontSize="14" fill="#fff" fontWeight="900">
            ÖN
          </text>

          <Box x={20} y={40} w={360} h={64} title="ÖN TAMPON" status={g("ON_TAMPON")} />
          <Box
            x={20}
            y={118}
            w={170}
            h={56}
            title="SAĞ ÖN ÇAMURLUK"
            status={g("SAG_ON_CAMURLUK")}
          />
          <Box
            x={210}
            y={118}
            w={170}
            h={56}
            title="SOL ÖN ÇAMURLUK"
            status={g("SOL_ON_CAMURLUK")}
          />
          <Box x={20} y={184} w={360} h={56} title="KAPUT" status={g("KAPUT")} />
        </g>

        {/* ================= ARKA ================= */}
        <g transform="translate(420,200)">
          <text x="20" y="20" fontSize="14" fill="#fff" fontWeight="900">
            ARKA
          </text>

          <Box
            x={20}
            y={40}
            w={360}
            h={64}
            title="ARKA TAMPON"
            status={g("ARKA_TAMPON")}
          />
          <Box
            x={20}
            y={118}
            w={170}
            h={56}
            title="SAĞ ARKA ÇAMURLUK"
            status={g("SAG_ARKA_CAMURLUK")}
          />
          <Box
            x={210}
            y={118}
            w={170}
            h={56}
            title="SOL ARKA ÇAMURLUK"
            status={g("SOL_ARKA_CAMURLUK")}
          />
          <Box x={20} y={184} w={360} h={56} title="BAGAJ" status={g("BAGAJ")} />
        </g>
      </svg>
    </div>
  );
}
