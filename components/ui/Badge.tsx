"use client";

import React from "react";

interface BadgeProps {
  tone: "ok" | "warn" | "bad" | "muted";
  text: string;
}

export function Badge({ tone, text }: BadgeProps) {
  const styles: Record<string, { bg: string, color: string }> = {
    ok: { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" },
    warn: { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" },
    bad: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" },
    muted: { bg: "rgba(255, 255, 255, 0.05)", color: "#a1a1aa" },
  };
  const currentStyle = styles[tone] || styles.muted;
  
  return (
    <span style={{
        padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
        backgroundColor: currentStyle.bg, color: currentStyle.color, border: `1px solid ${currentStyle.bg}`,
        display: "inline-flex", alignItems: "center", whiteSpace: "nowrap"
      }}>
      {text}
    </span>
  );
}