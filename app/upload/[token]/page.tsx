"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VEHICLE_CONFIG, VehicleType, PackageType } from "@/lib/vehicleConfig";
import { 
  Upload, Trash2, CheckCircle2, 
  Image as ImageIcon, X, ArrowRight, ShieldCheck, Sparkles, ShoppingCart
} from "lucide-react";

const API = (process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com").replace(/\/$/, "");

export default function UploadPage() {
  const sp = useSearchParams();
  const vehicleType = (sp.get("v") as any) || "car";
  const pkg = (sp.get("p") as any) || "standard";
  const config = VEHICLE_CONFIG[vehicleType as VehicleType];

  const [items, setItems] = useState<{file: File}[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showCart, setShowCart] = useState(false); 
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [flowToken, setFlowToken] = useState<string | null>(null);

  const basePrice = pkg === "standard" ? 89.90 : 129.90;

  useEffect(() => {
    const savedUser = localStorage.getItem("carvix_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUserEmail(userData.email);
    }

    async function initFlow() {
      try {
        const res = await fetch(`${API}/flows`, { method: "POST" });
        const data = await res.json();
        if (data.token) setFlowToken(data.token);
      } catch (err) { console.error("Flow başlatılamadı:", err); }
    }
    initFlow();
  }, []);

  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((f) => ({ file: f }));
    setItems((prev) => [...prev, ...next]);
  };

  const handleAddToCart = () => {
    if (!userEmail) return alert("Lütfen önce giriş yapın.");
    if (items.length === 0) return alert("Lütfen analiz için fotoğraf yükleyin.");
    
    const newItem = {
      id: Date.now(),
      name: `${pkg === "standard" ? "Standart" : "Detaylı"} Analiz Raporu`,
      price: basePrice,
      email: userEmail,
      vehicle: config.title
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    setIsAddedToCart(true);
  };

  const handleFinalPayment = async () => {
    if (!flowToken) return alert("Sistem hazır değil.");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("part_key", "AUTO_DETECT"); 
      items.forEach(it => form.append("files", it.file));

      await fetch(`${API}/flows/${flowToken}/upload`, { method: "POST", body: form });
      
      await fetch(`${API}/flows/${flowToken}/submit`, { 
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, package_type: pkg }) 
      });

      window.location.href = pkg === "standard" ? "https://www.shopier.com/carvix/standard_link" : "https://www.shopier.com/carvix/43380964";
    } catch (err) {
      alert("Hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', padding: '60px 20px', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SEPET MODAL - KUPON KISMI TEMİZLENDİ */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#0a0a0a', height: '100%', padding: '40px', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
               <h2 style={{ fontSize: '22px', fontWeight: '900' }}>Ödeme Özeti</h2>
               <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24}/></button>
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#71717a', fontSize: '13px' }}>Seçilen Paket</p>
                  <p style={{ fontWeight: '800', fontSize: '18px', color: '#3b82f6', marginBottom: '25px' }}>{pkg === "standard" ? "Standart Analiz" : "Detaylı Analiz"}</p>
                  
                  {/* Kupon inputları ve applyCoupon fonksiyonu buradan kaldırıldı */}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '900', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                    <span>Toplam:</span>
                    <span>{basePrice.toFixed(2)} TL</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#52525b', marginTop: '15px', textAlign: 'center' }}>
                    İndirim kodunuzu ödeme sayfasında kullanabilirsiniz.
                  </p>
                </div>
             </div>
             <button onClick={handleFinalPayment} disabled={loading} style={{ width: '100%', padding: '22px', borderRadius: '18px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
               {loading ? "Hazırlanıyor..." : "Ödemeye Geç"}
             </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.1)', padding: '8px 20px', borderRadius: '100px', color: '#60a5fa', fontSize: '12px', fontWeight: '800', marginBottom: '20px' }}>
            <Sparkles size={14} /> CARVIX AI OTO-TESPİT AKTİF
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '950', letterSpacing: '-1.5px' }}>Aracınızı Yükleyin</h1>
          <p style={{ color: '#71717a', marginTop: '10px' }}>AI motorumuz yüklediğiniz her fotoğrafı otomatik tanır ve hasar analizi yapar.</p>
        </div>

        {/* YÜKLEME ALANI */}
        <div style={{ border: '2px dashed rgba(59,130,246,0.3)', borderRadius: '28px', padding: '50px 20px', backgroundColor: 'rgba(59,130,246,0.02)', position: 'relative', marginBottom: '30px' }}>
          <input type="file" multiple accept="image/*" onChange={(e) => onFilesSelected(e.target.files)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
          <Upload size={40} color="#3b82f6" style={{ marginBottom: '15px' }} />
          <p style={{ fontWeight: '700' }}>Fotoğrafları Seçin veya Sürükleyin</p>
          <p style={{ fontSize: '12px', color: '#52525b' }}>Parça seçmenize gerek yoktur, AI otomatik tanıyacaktır.</p>
        </div>

        {/* DOSYA LİSTESİ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <ImageIcon size={20} color="#3b82f6" />
              <span style={{ flex: 1, fontSize: '13px', textAlign: 'left', fontWeight: '500' }}>{it.file.name}</span>
              <button onClick={() => setItems(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
            </div>
          ))}
        </div>

        {/* BUTONLAR */}
        {!isAddedToCart ? (
          <button onClick={handleAddToCart} style={{ width: '100%', padding: '22px', borderRadius: '22px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '18px', boxShadow: '0 10px 30px rgba(59,130,246,0.3)' }}>
            Analizi Başlat
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             <div style={{ color: '#4ade80', fontWeight: '700' }}><CheckCircle2 size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }}/> Hazır! Sepete Eklendi.</div>
             <button onClick={() => setShowCart(true)} style={{ width: '100%', padding: '22px', borderRadius: '22px', backgroundColor: '#fff', color: '#000', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
               Ödeme Yap ve Raporu Al <ArrowRight size={20} style={{ marginLeft: '10px' }}/>
             </button>
          </div>
        )}
      </div>
    </div>
  );
}