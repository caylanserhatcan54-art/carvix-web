"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, CreditCard, CheckCircle2, Zap, Info } from "lucide-react";

function PaymentContent() {
  const [loading, setLoading] = useState(false);
  const sp = useSearchParams();
  
  // Önceki sayfadan gelen paket bilgisini alıyoruz
  const pkg = sp.get("p") || "standard"; 
  const price = pkg === "detailed" ? "129,90" : "89,90";

  const startPayment = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://carvix-payment-server.onrender.com/create-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            package: pkg,
            amount: pkg === "detailed" ? 129.90 : 89.90 
          })
        }
      );

      if (!res.ok) throw new Error("Payment server hata verdi");

      const data = await res.json();

      if (data?.paymentPageUrl) {
        window.location.href = data.paymentPageUrl;
      } else {
        throw new Error("paymentPageUrl yok");
      }
    } catch (err) {
      console.error(err);
      alert("Ödeme sistemi şu an başlatılamadı. Lütfen az sonra tekrar deneyiniz.");
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', padding: '60px 20px' }}>
      <div style={{ maxWidth: 650, margin: "0 auto", background: '#111', padding: '40px', borderRadius: '32px', border: '1px solid #222' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(34,197,94,0.1)', padding: '6px 16px', borderRadius: '100px', color: '#22c55e', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
          <CheckCircle2 size={14} /> GÜVENLİ ÖDEME ADIMI
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '15px', letterSpacing: '-1px' }}>
          {pkg === "detailed" ? "Detaylı Analiz Paketi" : "Standart Analiz Paketi"}
        </h1>

        <div style={{ backgroundColor: '#18181b', padding: '20px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #27272a' }}>
          <p style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            <Zap size={16} style={{ color: '#3b82f6', marginRight: '8px' }} />
            Yapay zekâ destekli dijital ön analiz raporu satın alıyorsunuz. 
            Bu paket kapsamında seçtiğiniz aracın fotoğrafları YOLOv8 motoru ile taranacaktır.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px' }}>Paket İçeriği:</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
            {[
              "Kaporta ve dış hasar ön analizi",
              "Boya ve ton farkı tespiti",
              pkg === "detailed" ? "Detaylı menteşe ve vida analizi" : "Genel panel kontrolü",
              "Dijital analiz raporu (Anında teslim)"
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#d1d1d6' }}>
                <CheckCircle2 size={16} color="#3b82f6" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ borderTop: '1px solid #222', paddingTop: '30px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#71717a' }}>Ödenecek Tutar</span>
              <div style={{ fontSize: '36px', fontWeight: '900' }}>
                {price} <span style={{ fontSize: '18px', fontWeight: '500' }}>TL</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 'bold', display: 'block' }}>KDV DAHİLDİR</span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>Tek Seferlik Ödeme</span>
            </div>
          </div>
        </div>

        <button
          onClick={startPayment}
          disabled={loading}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: '900',
            fontSize: '18px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s'
          }}
        >
          {loading ? "Ödeme Sayfasına Yönlendiriliyor..." : <><CreditCard /> GÜVENLİ ÖDEME YAP</>}
        </button>

        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', opacity: 0.5 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
             <ShieldCheck size={14} color="#22c55e" /> Garanti BBVA Sanal POS
           </div>
           <div style={{ width: '1px', height: '10px', backgroundColor: '#333' }}></div>
           <div style={{ fontSize: '11px' }}>256-bit SSL Koruma</div>
        </div>

        <div style={{ marginTop: '40px', padding: '15px', backgroundColor: 'rgba(59,130,246,0.05)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.1)' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Info size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '12px', color: '#a1a1aa', lineHeight: '1.4' }}>
              <strong>Önemli:</strong> Bu bir dijital hizmettir. Ödeme onayından sonra analiz süreci başlar ve raporunuz oluşturulur. Fiziksel kargo gönderimi yoktur.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Ana sayfa bileşeni Suspense ile sarmalanmalıdır (useSearchParams kullanımı için gereklidir)
export default function AracAnaliziPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#050505', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>}>
      <PaymentContent />
    </Suspense>
  );
}