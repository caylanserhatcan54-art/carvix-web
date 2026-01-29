"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VEHICLE_CONFIG, PackageType } from "@/lib/vehicleConfig";
import { 
  Upload, Sparkles, ShieldAlert, ScanEye, CheckCircle2, XCircle, ArrowRight, Focus, Mail, Info
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
    async function initFlow() {
      try {
        const res = await fetch(`${API}/flows`, { method: "POST" });
        const data = await res.json();
        if (data.token) setFlowToken(data.token);
      } catch (err) { console.error(err); }
    }
    initFlow();
  }, []);

  const instructions = useMemo(() => {
    const isDetayli = pkg === "detailed";
    const lists = {
      car: {
        standard: ["Ön Cephe", "Arka Cephe", "Sol Yan", "Sağ Yan"],
        detailed: ["Kapılar (Yakın)", "Çamurluklar", "Kaput & Bagaj", "Menteşeler"]
      },
      pickup: {
        standard: ["Kabin Önü", "Kasa Arkası", "Sağ Profil", "Sol Profil"],
        detailed: ["Kasa İç Sacı", "Kabin-Kasa Birleşim", "Arka Kapak", "İç Direkler"]
      },
      motorcycle: {
        standard: ["Ön Bakış", "Arka Bakış", "Sağ Yan", "Sol Yan"],
        detailed: ["Ön Grenaj", "Yan Paneller", "Yakıt Deposu", "Şasi Alanları"]
      }
    };
    const currentVehicle = (lists as any)[vehicleType] || lists.car;
    return isDetayli ? currentVehicle.detailed : currentVehicle.standard;
  }, [vehicleType, pkg]);

  const handleAddToCart = () => {
    if (items.length < 1) return alert("Lütfen en az 1 adet fotoğraf yükleyin.");
    setIsAddedToCart(true);
  };

  const handleFinalPayment = async () => {
    if (!userEmail || !userEmail.includes("@")) return alert("Lütfen raporun gönderileceği geçerli bir e-posta adresi girin.");
    if (!flowToken) return alert("Sistem henüz hazır değil, lütfen bekleyin.");
    
    setLoading(true);
    try {
      const form = new FormData();
      form.append("part_key", "AUTO_DETECT");
      items.forEach(it => form.append("files", it.file));
      
      await fetch(`${API}/flows/${flowToken}/upload`, { method: "POST", body: form });
      await fetch(`${API}/flows/${flowToken}/submit`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email: userEmail.trim().toLowerCase(), package_type: pkg }) 
      });

      setTimeout(() => { 
        const shopierLink = pkg === "standard" ? "https://www.shopier.com/43537847" : "https://www.shopier.com/43380964";
        window.location.href = `${shopierLink}?platform_order_id=${flowToken}&email=${encodeURIComponent(userEmail)}`; 
      }, 1500);
    } catch (err) { 
      alert("Bağlantı hatası oluştu."); 
      setLoading(false); 
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end', backdropFilter: 'blur(10px)' }}>
          <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#0a0a0a', padding: '50px 40px', borderLeft: '1px solid #222', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <h2 style={{ fontWeight: '900', marginBottom: '10px', fontSize: '28px' }}>Sipariş Onayı</h2>
              <div style={{ padding: '25px', background: 'linear-gradient(145deg, #111, #080808)', borderRadius: '20px', border: '1px solid #1a1a1a', marginBottom: '25px' }}>
                <p style={{ fontWeight: '800', fontSize: '20px' }}>{pkg === "standard" ? "Standart" : "Detaylı"} Paket</p>
                <p style={{ fontSize: '26px', fontWeight: '900', color: '#fff', marginTop: '10px' }}>{basePrice.toFixed(2)} TL</p>
              </div>

              <div style={{ padding: '25px', background: 'rgba(59,130,246,0.03)', borderRadius: '20px', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', marginBottom: '15px' }}>
                  <Mail size={20} />
                  <h4 style={{ fontWeight: '900', fontSize: '14px' }}>RAPOR GÖNDERİM ADRESİ</h4>
                </div>
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz..." 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #222', background: '#000', color: '#fff', outline: 'none' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '15px', padding: '12px', background: 'rgba(234,179,8,0.1)', borderRadius: '10px', border: '1px solid rgba(234,179,8,0.2)' }}>
                  <ShieldAlert size={28} color="#eab308" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '11px', color: '#eab308', margin: 0, fontWeight: '600' }}>
                    ÖNEMLİ: Raporun size ulaşması için Shopier ödeme ekranında da <b>AYNI E-POSTA</b> adresini yazmalısınız.
                  </p>
                </div>
              </div>

              <button onClick={handleFinalPayment} disabled={loading} style={{ width: '100%', padding: '22px', background: '#3b82f6', border: 'none', borderRadius: '18px', color: '#fff', fontWeight: '900', cursor: 'pointer' }}>
                {loading ? "Yükleniyor..." : "Ödemeye Geç"}
              </button>
              <button onClick={() => setShowCart(false)} style={{ width: '100%', marginTop: '20px', background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}>Vazgeç</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderRadius: '100px', fontSize: '11px', fontWeight: '900' }}>
            <Sparkles size={14} /> {config.title.toUpperCase()} ANALİZ SİSTEMİ
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginTop: '15px' }}>Görselleri Yükleyin</h1>
          
          <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(34,197,94,0.05)', borderRadius: '15px', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Info size={18} color="#22c55e" />
            <p style={{ fontSize: '13px', color: '#22c55e', margin: 0, fontWeight: '600' }}>
              İster <b>tek bir parçayı</b>, ister <b>tüm aracı</b> analiz ettirebilirsiniz. Sınır yok!
            </p>
          </div>
        </div>

        <div style={{ background: '#0a0a0a', padding: '30px', borderRadius: '30px', border: '1px solid #111', marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#3b82f6', marginBottom: '20px' }}>
            <ScanEye size={22} />
            <h3 style={{ fontWeight: '900', fontSize: '18px' }}>Örnek Görsel Rehberi</h3>
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px', marginTop: '-10px' }}>Aşağıdakiler örnek çekimlerdir, ihtiyacınız olan bölgeleri yüklemeniz yeterlidir:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {Array.isArray(instructions) && instructions.map((item, i) => (
              <div key={i} style={{ padding: '15px', background: '#0d0d0d', borderRadius: '15px', fontSize: '12px', border: '1px solid #161616', color: '#999', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
           <div style={{ padding: '25px', background: '#0a0a0a', borderRadius: '25px', border: '1px solid #111' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <CheckCircle2 size={24} color="#22c55e" />
                <h4 style={{ fontWeight: '800', fontSize: '15px' }}>📸 Doğru Çekim</h4>
              </div>
              <ul style={{ padding: 0, listStyle: 'none', fontSize: '12px', color: '#888', lineHeight: '1.8' }}>
                <li>✅ <b>Mesafe:</b> Tam boy için 2–3 metre</li>
                <li>✅ <b>Kadraj:</b> Araç ekranı tamamen doldurmalı</li>
                <li>✅ <b>Açı:</b> Kamera yüzeye tam paralel (dik)</li>
                <li>✅ <b>Işık:</b> Flash kapalı, güneş arkada olmalı</li>
              </ul>
           </div>
           <div style={{ padding: '25px', background: '#0a0a0a', borderRadius: '25px', border: '1px solid #111' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <XCircle size={24} color="#ef4444" />
                <h4 style={{ fontWeight: '800', fontSize: '15px' }}>❌ Hatalı Çekim</h4>
              </div>
              <ul style={{ padding: 0, listStyle: 'none', fontSize: '12px', color: '#888', lineHeight: '1.8' }}>
                <li>🚫 <b>Eğiklik:</b> Telefonu eğik tutmayın</li>
                <li>🚫 <b>Gölge:</b> Kendi gölgenizi düşürmeyin</li>
                <li>🚫 <b>Kir:</b> Aşırı kirli yüzey analiz yapılamaz</li>
                <li>🚫 <b>Gece:</b> Karanlık kareler kabul edilmez</li>
              </ul>
           </div>
        </div>

        <div style={{ padding: '20px', background: 'rgba(59,130,246,0.05)', borderRadius: '25px', border: '1px solid rgba(59,130,246,0.1)', marginBottom: '25px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Focus size={24} color="#3b82f6" style={{ flexShrink: 0 }} />
          <div>
             <h5 style={{ fontWeight: '800', fontSize: '13px', margin: '0 0 5px 0' }}>Sadece sorunlu parçayı mı çekmek istiyorsunuz?</h5>
             <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>O bölgeyi 50-80 cm mesafeden net şekilde çekip yükleyin. Yapay zekamız sadece o parçayı da tarayabilir.</p>
          </div>
        </div>

        <div style={{ border: '2px dashed #222', padding: '80px 20px', borderRadius: '35px', position: 'relative', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s', backgroundColor: items.length > 0 ? 'rgba(59,130,246,0.02)' : 'transparent' }}>
          <input type="file" multiple accept="image/*" onChange={(e) => setItems(Array.from(e.target.files || []).map(f => ({file: f})))} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
          <div style={{ width: '80px', height: '80px', background: 'rgba(59,130,246,0.1)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Upload size={32} color="#3b82f6" />
          </div>
          <p style={{ fontWeight: '900', fontSize: '20px', margin: 0 }}>{items.length > 0 ? `${items.length} Fotoğraf Yüklendi` : "Fotoğrafları Seçin"}</p>
        </div>

        <button onClick={isAddedToCart ? () => setShowCart(true) : handleAddToCart} style={{ width: '100%', marginTop: '35px', padding: '25px', borderRadius: '22px', background: isAddedToCart ? '#fff' : '#3b82f6', color: isAddedToCart ? '#000' : '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
          {isAddedToCart ? "Siparişi Onayla ve Öde" : "Görselleri Kaydet"}
        </button>
      </div>

      {/* WHATSAPP SABİT BUTON - BALONCUK SİLİNDİ */}
      <div style={{ 
        position: 'fixed', 
        bottom: '25px', 
        right: '25px', 
        zIndex: 9999
      }}>
        <a 
          href="https://wa.me/905335239954" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            transition: 'transform 0.3s', 
            display: 'block',
            filter: 'drop-shadow(0 5px 15px rgba(37,211,102,0.4))'
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp Destek" 
            style={{ width: '60px', height: '60px' }} 
          />
        </a>
      </div>

    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Analiz Hazırlanıyor...</div>}>
      <UploadContent />
    </Suspense>
  );
}