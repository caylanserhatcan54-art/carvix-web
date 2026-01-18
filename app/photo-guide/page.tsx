"use client";

import { 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Sun, 
  Maximize, 
  Target, 
  ZapOff, 
  ImageOff, // BlurOn yerine en güvenli alternatif
  Image as ImageIcon, 
  Sparkles 
} from "lucide-react";

export default function PhotoGuidePage() {
  const DO = [
    { title: "Gün Işığı / Doğal Işık", desc: "Aracı gölgeli ama aydınlık bir alanda çekin. Flaş kullanmaktan kaçının.", icon: <Sun size={20} color="#22c55e" /> },
    { title: "Paneli Odaklayın", desc: "İlgili parça (kapı, kaput vb.) kadrajın en az %80'ini kaplamalıdır.", icon: <Maximize size={20} color="#22c55e" /> },
    { title: "Çift Açılı Çekim", desc: "Her parça için hem 45° açı hem de tam karşıdan düz açı yapay zekayı güçlendirir.", icon: <Target size={20} color="#22c55e" /> },
    { title: "Kritik Bölge Detayı", desc: "Vida ve menteşe bölgelerinin yakın plan çekimleri sök-tak analizi için şarttır.", icon: <Camera size={20} color="#22c55e" /> },
  ];

  const DONT = [
    { title: "Gece & Flaş Kullanımı", desc: "Yapay ışık parlamaları metalik yüzeylerde sahte ton farkları oluşturur.", icon: <ZapOff size={20} color="#ef4444" /> },
    { title: "Uzak & Geniş Kadraj", desc: "Tüm aracı tek karede çekmek panel detaylarının kaybolmasına neden olur.", icon: <ImageIcon size={20} color="#ef4444" /> },
    { title: "Aşırı Yansıma", desc: "Direkt güneş ışığı veya spotlar panel üzerindeki kanıtları maskeler.", icon: <Sparkles size={20} color="#ef4444" /> },
    { title: "Bulanık Görseller", desc: "Hareket kaynaklı netlik kaybı, sistemin yanlış hata vermesine yol açabilir.", icon: <ImageOff size={20} color="#ef4444" /> },
  ];

  return (
    <main style={{ backgroundColor: "#050505", minHeight: "100vh", color: "#fff", padding: "60px 20px" }}>
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Üst Başlık Bölümü */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "15px", letterSpacing: "-1px" }}>
            Fotoğraf <span style={{ color: "#3b82f6" }}>Rehberi</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "18px", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
            Carvix AI, net ve doğru açıyla çekilmiş görsellerde <b>en yüksek analiz başarısını</b> gösterir. 
            Doğru rapor için aşağıdaki yönergeleri takip edin.
          </p>
        </div>

        {/* Rehber Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "30px", marginBottom: "50px" }}>
          
          {/* DO SECTION */}
          <div className="glass" style={{ 
            padding: "30px", 
            borderRadius: "24px", 
            border: "1px solid rgba(34, 197, 94, 0.2)", 
            background: "rgba(34, 197, 94, 0.02)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
              <CheckCircle2 color="#22c55e" size={28} />
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#22c55e", margin: 0 }}>Doğru Uygulama</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {DO.map((x) => (
                <div key={x.title} style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    {x.icon}
                    <div style={{ fontWeight: 700, fontSize: "16px" }}>{x.title}</div>
                  </div>
                  <div style={{ fontSize: "14px", color: "#a1a1aa", paddingLeft: "32px" }}>{x.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DONT SECTION */}
          <div className="glass" style={{ 
            padding: "30px", 
            borderRadius: "24px", 
            border: "1px solid rgba(239, 68, 68, 0.2)", 
            background: "rgba(239, 68, 68, 0.02)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
              <XCircle color="#ef4444" size={28} />
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#ef4444", margin: 0 }}>Hatalı Uygulama</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {DONT.map((x) => (
                <div key={x.title} style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    {x.icon}
                    <div style={{ fontWeight: 700, fontSize: "16px" }}>{x.title}</div>
                  </div>
                  <div style={{ fontSize: "14px", color: "#a1a1aa", paddingLeft: "32px" }}>{x.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Önerilen Set Alt Bilgi */}
        <div style={{ 
          background: "linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%)", 
          padding: "40px", 
          borderRadius: "24px", 
          border: "1px solid #1e293b",
          textAlign: "center"
        }}>
          <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "15px", color: "#3b82f6" }}>
            Önerilen Minimum Fotoğraf Seti
          </h3>
          <p style={{ color: "#cbd5e1", lineHeight: "1.7", fontSize: "15px" }}>
            En doğru sonuç için şu parçaları mutlaka ekleyin: <br />
            <span style={{ color: "#fff", fontWeight: 600 }}>Kaput • Bagaj • Sol/Sağ Ön ve Arka Kapılar • Arka Çamurluklar</span> <br />
            <span style={{ display: "inline-block", marginTop: "10px", fontSize: "13px", color: "#94a3b8" }}>
              *Menteşe, vida ve kapı iç direk fotoğrafları "Sök-Tak" analizi için hayati önem taşır.
            </span>
          </p>
        </div>

      </div>
    </main>
  );
}