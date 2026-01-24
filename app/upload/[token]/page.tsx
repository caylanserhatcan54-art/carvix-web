"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VEHICLE_CONFIG, VehicleType, PackageType } from "@/lib/vehicleConfig";
import { 
  Upload, Trash2, Image as ImageIcon, X, ArrowRight, Sparkles, Camera, AlertTriangle
} from "lucide-react";

const API = (process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com").replace(/\/$/, "");

function UploadContent() {
  const sp = useSearchParams();
  const vehicleType = (sp.get("v") || "car") as string;
  const pkg = (sp.get("p") as PackageType) || "standard";

  const config = useMemo(() => {
    const data = (VEHICLE_CONFIG as any)[vehicleType] || (VEHICLE_CONFIG as any)["car"];
    return { title: data?.title || "Araç", slug: data?.slug || "vehicle" };
  }, [vehicleType]);

  const [items, setItems] = useState<{file: File}[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showCart, setShowCart] = useState(false); 
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [flowToken, setFlowToken] = useState<string | null>(null);

  const basePrice = pkg === "standard" ? 89.90 : 129.90;

  useEffect(() => {
    const savedUser = localStorage.getItem("carvix_user");
    if (savedUser) setUserEmail(JSON.parse(savedUser).email);
    async function initFlow() {
      try {
        const res = await fetch(`${API}/flows`, { method: "POST" });
        const data = await res.json();
        if (data.token) setFlowToken(data.token);
      } catch (err) { console.error(err); }
    }
    initFlow();
  }, []);

  const getInstructions = () => {
    const isDetayli = pkg === "detailed";

    switch (vehicleType) {
      case "motorcycle":
        return isDetayli 
          ? ["Ön Far", "Sağ/Sol Grenaj", "Sele Altı Şasi", "Gidon Bağlantısı", "Amortisör Vidaları", "Egzoz Bağlantısı"]
          : ["Ön Taraf", "Arka Taraf", "Sağ Yan", "Sol Yan"];
      
      case "atv":
        return isDetayli
          ? ["Ön Koruma", "Sağ/Sol Paneller", "Koltuk Altı Şasi", "Direksiyon Mili", "Jant Bağlantıları", "Arka Aks"]
          : ["Ön Görünüm", "Arka Görünüm", "Sağ Yan", "Sol Yan"];

      case "pickup":
        return isDetayli
          ? ["Ön Kaput", "4 Kapı", "Kasa Yanları", "Kabin Direkleri", "Kapı Menteşe Vidaları", "Kasa Kapak Menteşesi"]
          : ["Ön Panel", "Arka Kasa", "Sağ Yan", "Sol Yan"];

      case "electric":
        return isDetayli
          ? ["Ön Kaput", "4 Kapı", "Tavan", "Şarj Portu İç Alanı", "Kapı Direkleri", "Menteşe Vidaları"]
          : ["Ön Bölüm", "Arka Bölüm", "Sağ Yan", "Sol Yan"];

      case "van":
        return isDetayli
          ? ["Ön Kaput", "Sağ/Sol Kapı", "Sürgülü Kapı Rayı", "Arka Kapı Menteşeleri", "Kabin Direkleri", "Tavan"]
          : ["Ön Kupa", "Arka Kapaklar", "Sağ Yan", "Sol Yan"];

      default: // car
        return isDetayli
          ? ["Ön Kaput", "4 Kapı", "Tavan", "Bagaj Kapağı", "Kapı Direkleri", "Menteşe ve Vida Detayları"]
          : ["Ön Taraf", "Arka Taraf", "Sağ Yan", "Sol Yan"];
    }
  };

  const instructions = getInstructions();

  const handleAddToCart = () => {
    if (!userEmail) return alert("Lütfen giriş yapın.");
    if (items.length === 0) return alert("Fotoğraf yüklemediniz.");
    const newItem = { id: Date.now(), name: `${config.title} - ${pkg === "standard" ? "Standart" : "Detaylı"}`, price: basePrice, email: userEmail, vehicle: config.title };
    localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart") || "[]"), newItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    setIsAddedToCart(true);
  };

  // =========================================================
  // GÜNCELLENMİŞ ÖDEME FONKSİYONU
  // =========================================================
  const handleFinalPayment = async () => {
    if (!flowToken) return alert("Sistem hazır değil.");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("part_key", "AUTO_DETECT");
      items.forEach(it => form.append("files", it.file));
      
      // 1. Dosyaları Arka Plana Yükle
      await fetch(`${API}/flows/${flowToken}/upload`, { method: "POST", body: form });
      
      // 2. Backend'e "Ödeme Bekliyor" durumunda kaydı oluştur
      await fetch(`${API}/flows/${flowToken}/submit`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email: userEmail, package_type: pkg }) 
      });

      // 3. Shopier Yönlendirmesi (platform_order_id EKLEMESİ YAPILDI)
      setTimeout(() => { 
        const shopierLink = pkg === "standard" 
          ? "https://www.shopier.com/43537847" 
          : "https://www.shopier.com/43380964";
        
        // flowToken'ı parametre olarak ekliyoruz ki Shopier bize geri bildirebilsin
        window.location.href = `${shopierLink}?platform_order_id=${flowToken}`; 
      }, 1500);

    } catch (err) { 
      alert("Yükleme sırasında hata oluştu!"); 
      setLoading(false); 
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#0a0a0a', padding: '40px', borderLeft: '1px solid #222' }}>
            <h2 style={{ fontWeight: '900', marginBottom: '20px' }}>Sipariş Özeti</h2>
            <div style={{ padding: '20px', background: '#111', borderRadius: '15px' }}>
              <p style={{ fontSize: '14px', color: '#777' }}>{config.title}</p>
              <p style={{ fontWeight: '800', fontSize: '18px' }}>{pkg === "standard" ? "Standart" : "Detaylı"} Paket</p>
              <p style={{ fontSize: '22px', fontWeight: '900', marginTop: '15px', color: '#3b82f6' }}>{basePrice.toFixed(2)} TL</p>
            </div>
            <button onClick={handleFinalPayment} disabled={loading} style={{ width: '100%', marginTop: '30px', padding: '20px', background: '#3b82f6', border: 'none', borderRadius: '15px', color: '#fff', fontWeight: '900', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? "Analiz Hazırlanıyor..." : "Ödemeye Geç"}
            </button>
            <button onClick={() => setShowCart(false)} style={{ width: '100%', marginTop: '15px', background: 'none', border: 'none', color: '#555' }}>Vazgeç</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', padding: '6px 15px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderRadius: '100px', fontSize: '12px', fontWeight: '800' }}>
            {config.title.toUpperCase()} - {pkg.toUpperCase()} ANALİZ
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginTop: '10px' }}>Fotoğrafları Yükle</h1>
        </div>

        <div style={{ textAlign: 'left', background: '#0a0a0a', padding: '25px', borderRadius: '25px', border: '1px solid #111', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', marginBottom: '15px' }}>
            <Camera size={20} />
            <h3 style={{ fontWeight: '900' }}>Yüklenmesi Gereken Alanlar</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {instructions.map((item, i) => (
              <div key={i} style={{ padding: '10px', background: '#111', borderRadius: '10px', fontSize: '12px', border: '1px solid #1a1a1a' }}>
                <span style={{ color: '#3b82f6', marginRight: '5px' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '2px dashed #222', padding: '50px', borderRadius: '30px', position: 'relative', cursor: 'pointer' }}>
          <input type="file" multiple accept="image/*" onChange={(e) => setItems(Array.from(e.target.files || []).map(f => ({file: f})))} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
          <Upload size={32} color="#3b82f6" />
          <p style={{ marginTop: '15px', fontWeight: '700' }}>Dosyaları Seçin</p>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          {items.map((it, i) => (
            <div key={i} style={{ fontSize: '12px', color: '#555', padding: '5px 0' }}>• {it.file.name}</div>
          ))}
        </div>

        <button onClick={isAddedToCart ? () => setShowCart(true) : handleAddToCart} style={{ width: '100%', marginTop: '30px', padding: '22px', borderRadius: '20px', background: isAddedToCart ? '#fff' : '#3b82f6', color: isAddedToCart ? '#000' : '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
          {isAddedToCart ? "Ödemeye Geç" : "Fotoğrafları Onayla"}
        </button>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Hazırlanıyor...</div>}>
      <UploadContent />
    </Suspense>
  );
}