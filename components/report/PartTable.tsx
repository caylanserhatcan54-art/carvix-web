"use client";

import React from "react";

type UiStatus = "ORIJINAL" | "BOYALI" | "LOKAL_BOYA" | "DEGISEN" | "SUPHELI" | "PLASTIK" | "BILINMIYOR";

export type PartRow = {
  key: string;
  label: string;
  status: UiStatus;
  note?: string;
};

function pillStyle(status: UiStatus): React.CSSProperties {
  const common: React.CSSProperties = { padding: "8px 12px", borderRadius: 999, fontWeight: 900, fontSize: 12, display: "inline-block" };
  switch (status) {
    case "ORIJINAL": return { ...common, background: "rgba(34,197,94,.16)", border: "1px solid rgba(34,197,94,.35)", color: "#86efac" };
    case "BOYALI": return { ...common, background: "rgba(239,68,68,.16)", border: "1px solid rgba(239,68,68,.35)", color: "#fda4af" };
    case "LOKAL_BOYA": return { ...common, background: "rgba(245,158,11,.16)", border: "1px solid rgba(245,158,11,.35)", color: "#fcd34d" };
    case "DEGISEN": return { ...common, background: "rgba(168,85,247,.16)", border: "1px solid rgba(168,85,247,.35)", color: "#e9d5ff" };
    case "SUPHELI": return { ...common, background: "rgba(251,146,60,.16)", border: "1px solid rgba(251,146,60,.35)", color: "#fdba74" };
    case "PLASTIK": return { ...common, background: "rgba(156,163,175,.16)", border: "1px solid rgba(156,163,175,.35)", color: "#e5e7eb" };
    default: return { ...common, background: "rgba(229,231,235,.10)", border: "1px solid rgba(229,231,235,.18)", color: "rgba(255,255,255,.70)" };
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

export default function PartTable({ rows }: { rows: PartRow[] }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 10 }}>Parça Durum Tablosu</div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,.10)" }}>
              <th style={{ padding: "10px 8px", color: "rgba(255,255,255,.65)" }}>Parça</th>
              <th style={{ padding: "10px 8px", color: "rgba(255,255,255,.65)" }}>Durum</th>
              <th style={{ padding: "10px 8px", color: "rgba(255,255,255,.65)" }}>Not</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <td style={{ padding: "12px 8px", fontWeight: 900 }}>{r.label}</td>
                <td style={{ padding: "12px 8px" }}>
                  <span style={pillStyle(r.status)}>{statusText(r.status)}</span>
                </td>
                <td style={{ padding: "12px 8px", color: "rgba(255,255,255,.70)" }}>
                  {r.note || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
