"use client";

import { useState } from "react";
import { ShoppingCart, X, Trash2, CreditCard, ShieldCheck, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Örnek sepet içeriği (Bunu sonra dinamik hale getireceğiz)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Detaylı Analiz Raporu", price: "129,90", type: "detailed" }
  ]);

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: 'rgba(5, 5, 5, 0.85)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 40px',
        height: '80px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/" style={{ fontSize: '22px', fontWeight: '900', color: '#fff', textDecoration: 'none', letterSpacing: '-1.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '2px' }} />
          </div>
          OTO<span style={{ color: '#3b82f6' }}>ANALİZ</span>
        </Link>

        {/* Orta Linkler (Opsiyonel) */}
        <div style={{ display: 'none', gap: '30px' }} className="md:flex">
             <Link href="/pricing" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Fiyatlandırma</Link>
             <Link href="/guide" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Rehber</Link>
        </div>

        {/* Sağ Taraf: SEPET BUTONU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ 
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', 
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '12px 20px',
              borderRadius: '14px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            <ShoppingCart size={20} color="#3b82f6" />
            <span style={{ fontWeight: '700', fontSize: '14px' }}>Sepetim</span>
            {cartItems.length > 0 && (
              <span style={{ 
                position: 'absolute', top: '-6px', right: '-6px', 
                backgroundColor: '#ef4444', color: '#fff', 
                fontSize: '10px', width: '20px', height: '20px', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', border: '2px solid #050505'
              }}>
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* --- SEPET PANELİ (SIDE DRAWER) --- */}
      {isCartOpen && (
        <>
          {/* Karartma Arka Plan */}
          <div 
            onClick={() => setIsCartOpen(false)}
            style={{ 
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', 
              backdropFilter: 'blur(8px)', zIndex: 2000 
            }} 
          />
          
          {/* Sağdan Açılan Panel */}
          <div style={{ 
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(450px, 100%)',
            backgroundColor: '#0c0c0c', zIndex: 2001, padding: '40px',
            boxShadow: '-20px 0 50px rgba(0,0,0,0.8)',
            display: 'flex', flexDirection: 'column',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            {/* Üst Kısım */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', margin: 0 }}>Sepetiniz</h2>
                <p style={{ color: '#52525b', fontSize: '13px', margin: '5px 0 0 0' }}>Analiz için hazır paketler</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '10px', borderRadius: '12px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Ürün Listesi */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} style={{ 
                    backgroundColor: 'rgba(255,255,255,0.02)', 
                    padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '20px', display: 'flex', gap: '15px'
                  }}>
                    <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <CreditCard size={24} color="#3b82f6" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ color: '#fff', fontWeight: '800', fontSize: '16px' }}>{item.name}</span>
                            <button style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div style={{ color: '#3b82f6', fontWeight: '900', fontSize: '20px', marginTop: '8px' }}>₺{item.price}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#71717a', marginTop: '100px' }}>
                  <ShoppingCart size={60} style={{ opacity: 0.1, marginBottom: '20px' }} />
                  <p style={{ fontSize: '18px', fontWeight: '600' }}>Sepetiniz boş.</p>
                  <p style={{ fontSize: '14px' }}>Hemen bir paket seçerek başlayın.</p>
                </div>
              )}
            </div>

            {/* Ödeme Özeti */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                  <span style={{ color: '#a1a1aa', fontWeight: '600' }}>Ödenecek Tutar</span>
                  <span style={{ color: '#fff', fontSize: '28px', fontWeight: '900' }}>₺129,90</span>
                </div>
                
                <Link 
                  href="/vehicle?p=detailed" 
                  onClick={() => setIsCartOpen(false)}
                  style={{ 
                    background: '#3b82f6', color: '#fff', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                    padding: '22px', borderRadius: '18px', fontWeight: '800', fontSize: '16px',
                    boxShadow: '0 10px 25px rgba(59,130,246,0.4)', transition: 'transform 0.2s'
                  }}
                >
                  Güvenli Ödeme Yap <CreditCard size={20} />
                </Link>

                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#52525b', fontSize: '12px' }}>
                  <ShieldCheck size={16} color="#22c55e" /> Garanti BBVA SSL Sertifikalı Ödeme
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}