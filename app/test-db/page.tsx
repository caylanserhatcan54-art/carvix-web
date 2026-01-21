"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestDB() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReports() {
      // Supabase'deki 'reports' tablosuna bağlanıp verileri çekiyoruz
      const { data: reports, error } = await supabase.from("reports").select("*");
      
      if (error) {
        console.error("Supabase Hatası:", error.message);
      } else {
        setData(reports || []);
      }
      setLoading(false);
    }
    getReports();
  }, []);

  return (
    <div style={{ padding: "100px", color: "white", background: "#000", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#3b82f6" }}>Supabase Bağlantı Testi</h1>
      <p>Bu sayfa veritabanı bağlantısını kontrol etmek içindir.</p>
      <hr style={{ opacity: 0.1, margin: "20px 0" }} />
      
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : data.length === 0 ? (
        <div style={{ padding: "20px", border: "1px dashed #444", borderRadius: "10px" }}>
          <p>Bağlantı başarılı! ✅</p>
          <p style={{ color: "#888" }}>Ancak tabloda henüz veri yok. Supabase panelinden bir satır (Insert Row) eklersen burada görebilirsin.</p>
        </div>
      ) : (
        <div style={{ background: "#111", padding: "20px", borderRadius: "10px", border: "1px solid #333" }}>
          <p style={{ color: "#4ade80", marginBottom: "15px" }}>Veri başarıyla çekildi! 🎉</p>
          <pre style={{ fontSize: "14px", color: "#aaa" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}