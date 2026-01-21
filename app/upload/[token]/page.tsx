"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VEHICLE_CONFIG, VehicleType, PackageType, PartKey } from "@/lib/vehicleConfig";
import { 
  Upload, Trash2, CreditCard, CheckCircle2, Zap, 
  Image as ImageIcon, Mail, AlertCircle, ShoppingCart, 
  Tag, X, ArrowRight, ShieldCheck, Sparkles
} from "lucide-react";

const API = (process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com").replace(/\/$/, "");

export default function UploadPage() {
  const sp = useSearchParams();
  const vehicleType = (sp.get("v") as any) || "car";
  const pkg = (sp.get("p") as any) || "standard";
  const config = VEHICLE_CONFIG[vehicleType as VehicleType];

  const [items, setItems] = useState<{file: File, part: PartKey | ""}[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Giriş yapan kullanıcının maili
  const [showCart, setShowCart] = useState(false); 
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [flowToken, setFlowToken] = useState<string | null>(null);

  const basePrice = pkg === "standard" ? 89.90 : 129.90;
  const totalPrice = (basePrice - discount).toFixed(2);

  const filteredParts = useMemo(() => {
    if (pkg === "standard") {
      return config.parts.filter(p => !p.key.includes("MENTESE") && !p.key.includes("VIDA") && !p.key.includes("DIREK"));
    }
    return config.parts;
  }, [config, pkg]);

  useEffect(() => {
    // Giriş yapmış kullanıcıyı kontrol et
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

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "CARVIX20" || coupon.toUpperCase() === "FENOMEN20") {
      setDiscount(20);
    } else {
      alert("Geçersiz kupon kodu.");
      setDiscount(0);
    }
  };

  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((f) => ({ file: f, part: "" as const }));
    setItems((prev) => [...prev, ...next]);
  };

  const handleAddToCart = () => {
    // Giriş kontrolü
    if (!userEmail) {
      alert("Lütfen önce giriş yapın veya kayıt olun.");
      return;
    }
    
    if (items.length === 0) return alert("Lütfen analiz için fotoğraf yükleyin.");
    if (items.some(it => !it.part)) return alert("Lütfen tüm fotoğrafların parçalarını seçin.");
    
    const newItem = {
      id: Date.now(),
      name: `${pkg === "standard" ? "Standart" : "Detaylı"} Analiz Raporu`,
      price: basePrice,
      email: userEmail, // Artık otomatik olarak geliyor
      vehicle: config.title
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));

    window.dispatchEvent(new Event("cartUpdated"));
    setIsAddedToCart(true);
  };

  const handleFinalPayment = async () => {
    if (!flowToken) return alert("Sistem henüz hazır değil.");
    setLoading(true);
    try {
      const grouped: Record<string, File[]> = {};
      items.forEach(it => {
        if (!grouped[it.part]) grouped[it.part] = [];
        grouped[it.part].push(it.file);
      });
      for (const partKey of Object.keys(grouped)) {
        const form = new FormData();
        form.append("part_key", partKey);
        grouped[partKey].forEach(file => form.append("files", file));
        await fetch(`${API}/flows/${flowToken}/upload`, { method: "POST", body: form });
      }
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
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', padding: '60px 20px', position: 'relative', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      {showCart && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#0a0a0a', height: '100%', padding: '40px', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 50px rgba(0,0,0,1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff' }}>Ödeme Özeti</h2>
              <button onClick={() => setShowCart(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '12px' }}><X size={20}/></button>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ color: '#71717a', fontSize: '13px', marginBottom: '5px' }}>Seçilen Paket</p>
                  <p style={{ fontWeight: '800', fontSize: '16px', color: '#3b82f6' }}>{pkg === "standard" ? "Standart Analiz" : "Detaylı Analiz"}</p>
                </div>
                
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '20px 0' }} />
                
                <label style={{ fontSize: '11px', color: '#52525b', marginBottom: '10px', display: 'block', fontWeight: '800', letterSpacing: '0.5px' }}>PROMOSYON KODU</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  <input placeholder="Kodunuz..." value={coupon} onChange={(e) => setCoupon(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: '#111', border: '1px solid #222', color: '#fff', outline: 'none', fontSize: '14px' }} />
                  <button onClick={applyCoupon} style={{ padding: '0 15px', borderRadius: '12px', backgroundColor: '#222', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>Uygula</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#71717a', marginBottom: '10px' }}>
                  <span>Ara Toplam:</span>
                  <span>{basePrice.toFixed(2)} TL</span>
                </div>
                {discount > 0 && (
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#22c55e', marginBottom: '10px' }}>
                    <span>İndirim:</span>
                    <span>-{discount.toFixed(2)} TL</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '900', color: '#fff', marginTop: '20px' }}>
                  <span>Toplam:</span>
                  <span>{totalPrice} TL</span>
                </div>
              </div>
            </div>

            <button onClick={handleFinalPayment} disabled={loading} style={{ width: '100%', padding: '20px', borderRadius: '18px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: '900', fontSize: '18px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.2s', boxShadow: '0 10px 30px rgba(59,130,246,0.3)' }}>
              {loading ? "Hazırlanıyor..." : <>Ödemeye Geç <ArrowRight size={20} /></>}
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(90deg, rgba(59,130,246,0.1) 0%, rgba(37,99,235,0.1) 100%)', padding: '8px 20px', borderRadius: '100px', color: '#60a5fa', fontSize: '12px', fontWeight: '800', marginBottom: '25px', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Sparkles size={14} /> ADIM 2: FOTOĞRAF ANALİZ MERKEZİ
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '950', margin: '0', letterSpacing: '-2px', background: 'linear-gradient(to bottom, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Aracınızı Yükleyin
          </h1>
          <p style={{ color: '#71717a', fontSize: '16px', marginTop: '15px', fontWeight: '500' }}>AI motorumuzun detaylı ekspertiz yapabilmesi için net kareler seçin.</p>
          {userEmail && (
            <p style={{ color: '#3b82f6', fontSize: '13px', marginTop: '10px', fontWeight: '700' }}>
              Raporunuz şu adrese gönderilecek: {userEmail}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* DOSYA SEÇME ALANI */}
          <div style={{ position: 'relative', border: '2px dashed rgba(59,130,246,0.3)', borderRadius: '28px', padding: '50px 20px', backgroundColor: 'rgba(59,130,246,0.02)', cursor: 'pointer', transition: 'all 0.3s' }}>
            <input type="file" multiple accept="image/*" onChange={(e) => onFilesSelected(e.target.files)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
            <div className="upload-icon-box" style={{ marginBottom: '15px' }}>
              <Upload size={40} color="#3b82f6" />
            </div>
            <p style={{ fontWeight: '700', fontSize: '16px', color: '#fff' }}>Fotoğrafları Buraya Bırakın</p>
            <p style={{ fontSize: '13px', color: '#52525b', marginTop: '5px' }}>JPG, PNG veya WEBP (Max 10MB)</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.2s' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <ImageIcon size={20} color="#3b82f6" />
                </div>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: '600', textAlign: 'left', color: '#d4d4d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.file.name}</span>
                <select 
                  value={it.part} 
                  onChange={(e) => setItems(prev => prev.map((item, idx) => idx === i ? {...item, part: e.target.value as any} : item))} 
                  style={{ backgroundColor: '#000', color: '#fff', fontSize: '12px', padding: '8px 12px', borderRadius: '10px', border: '1px solid #333', cursor: 'pointer' }}
                >
                  <option value="">Parça Seçin</option>
                  {filteredParts.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={() => setItems(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}><Trash2 size={18} /></button>
              </div>
            ))}
          </div>

          {!isAddedToCart ? (
            <button onClick={handleAddToCart} style={{ padding: '22px', borderRadius: '22px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '18px', boxShadow: '0 15px 35px rgba(59,130,246,0.4)', transition: 'transform 0.2s' }}>
              <ShoppingCart size={22} /> Sepete Ekle
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', animation: 'slideUp 0.4s ease-out' }}>
              <div style={{ backgroundColor: 'rgba(34,197,94,0.05)', color: '#4ade80', padding: '18px', borderRadius: '22px', fontSize: '15px', fontWeight: '700', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} /> Ürün Başarıyla Eklendi
              </div>
              <button onClick={() => setShowCart(true)} style={{ padding: '22px', borderRadius: '22px', backgroundColor: '#fff', color: '#000', fontWeight: '900', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '18px', boxShadow: '0 15px 35px rgba(255,255,255,0.1)' }}>
                Sepete Git ve Öde <ArrowRight size={22} />
              </button>
            </div>
          )}

          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', color: '#52525b', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#22c55e" /> SSL Korumalı</div>
              <div style={{ width: '1px', height: '12px', backgroundColor: '#27272a' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Garanti BBVA Güvencesi</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .upload-icon-box {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}