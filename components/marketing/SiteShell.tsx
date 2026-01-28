"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, Trash2, CreditCard } from "lucide-react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Sepet verilerini yerel hafızadan (localStorage) çekiyoruz
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    };
    loadCart();
    
    // Sepet güncellendiğinde veya başka sekmede değişim olduğunda yakalamak için
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Sayfa içinde sepetin güncellendiğini sistemin geneline haber ver
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  return (
    <>
      {/* --- ÜST BAR (NAVBAR) --- */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        background: 'rgba(5, 5, 5, 0.9)', 
        backdropFilter: 'blur(15px)', 
        borderBottom: '1px solid rgba(255,255,255,0.08)' 
      }}>
        <div className="container" style={{ 
          height: '72px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 20px' 
        }}>
          
          {/* LOGO - Tıklayınca doğrudan Dashboard'a yönlendirir */}
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              CAR<span style={{ color: '#3b82f6' }}>VIX</span>
            </span>
          </Link>

          {/* SAĞ TARAF: SADECE SEPET BUTONU */}
          <nav style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsCartOpen(true)} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 15px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer', 
                position: 'relative', 
                fontWeight: '700'
              }}
            >
              <ShoppingCart size={20} color="#3b82f6" />
              <span style={{ fontSize: '14px' }}>Sepetim</span>
              {cartItems.length > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-5px', 
                  right: '-5px', 
                  background: '#ef4444', 
                  color: '#fff', 
                  fontSize: '10px', 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 'bold', 
                  border: '2px solid #050505'
                }}>
                  {cartItems.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* --- SEPET PANELİ (SIDE DRAWER) --- */}
      {isCartOpen && (
        <>
          {/* Karartma Arka Plan */}
          <div 
            onClick={() => setIsCartOpen(false)} 
            style={{ 
              position: 'fixed', 
              inset: 0, 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              backdropFilter: 'blur(8px)', 
              zIndex: 2000 
            }} 
          />
          
          {/* Sağdan Açılan Panel */}
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            right: 0, 
            bottom: 0, 
            width: 'min(400px, 100%)', 
            backgroundColor: '#0c0c0c', 
            zIndex: 2001, 
            padding: '30px', 
            borderLeft: '1px solid rgba(255,255,255,0.08)', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800' }}>Sepetim</h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Ürün Listesi */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.length > 0 ? cartItems.map(item => (
                <div key={item.id} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  padding: '20px', 
                  borderRadius: '15px', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  marginBottom: '15px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{item.name}</span>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{ color: '#3b82f6', fontWeight: '800', fontSize: '18px' }}>₺{Number(item.price).toFixed(2)}</div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', color: '#71717a', marginTop: '60px' }}>
                  <ShoppingCart size={48} style={{ opacity: 0.2, marginBottom: '15px' }} />
                  <p>Sepetiniz şu an boş.</p>
                </div>
              )}
            </div>

            {/* Alt Toplam ve Ödeme Butonu */}
            {cartItems.length > 0 && (
              <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: '#fff', fontSize: '22px', fontWeight: '900' }}>
                  <span>Toplam</span>
                  <span>₺{total.toFixed(2)}</span>
                </div>
                <Link 
                  href="/checkout" 
                  onClick={() => setIsCartOpen(false)} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px',
                    backgroundColor: '#3b82f6', 
                    color: '#fff', 
                    padding: '18px', 
                    borderRadius: '14px', 
                    fontWeight: '800', 
                    textDecoration: 'none',
                    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <CreditCard size={20} /> Ödeme Adımına Geç
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* Sayfa İçeriği */}
      {children}
    </>
  );
}

// Yardımcı Badge Bileşeni (Diğer sayfalarda kullanılabilir)
export function Badge({ tone, text }: { tone: "ok" | "warn" | "bad" | "muted"; text: string; }) {
  const styles: Record<string, { bg: string, color: string }> = {
    ok: { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" },
    warn: { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" },
    bad: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" },
    muted: { bg: "rgba(255, 255, 255, 0.05)", color: "#a1a1aa" },
  };
  const currentStyle = styles[tone] || styles.muted;
  return (
    <span style={{ 
      padding: "4px 10px", 
      borderRadius: "99px", 
      fontSize: "11px", 
      fontWeight: 700, 
      backgroundColor: currentStyle.bg, 
      color: currentStyle.color, 
      border: `1px solid ${currentStyle.bg}`, 
      display: "inline-flex", 
      alignItems: "center" 
    }}>
      {text}
    </span>
  );
}