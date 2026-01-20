"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, X, Trash2, CreditCard, ShieldCheck, Ticket, CheckCircle2, ShoppingBag } from "lucide-react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // --- SEPETİ HAFIZADAN YÜKLE VE DİNLE ---
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    };

    loadCart(); // Sayfa açıldığında yükle

    // Diğer sayfalardan (Upload gibi) ürün eklenince haberdar ol
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // --- ÜRÜN SİLME (HEM STATE HEM LOCALSTORAGE) ---
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    if (updatedCart.length === 0) {
      setIsApplied(false);
    }
  };

  const discountRate = isApplied ? 0.20 : 0;
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (cartItems.length === 0) {
      alert("Sepetiniz boşken kupon kullanamazsınız.");
      return;
    }
    if (couponCode.trim().toUpperCase() === "FENOMEN20") {
      setIsApplied(true);
    } else {
      alert("Geçersiz kupon kodu!");
    }
  };

  return (
    <>
      <header className="nav" style={{ 
        position: 'sticky', top: 0, zIndex: 1000, 
        background: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container navInner" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Carvix Logo" style={{ height: '36px', width: 'auto' }} />
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              CAR<span style={{ color: '#3b82f6' }}>VIX</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/photo-guide" style={{ color: pathname === "/photo-guide" ? "#fff" : "#a1a1aa", fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Fotoğraf Rehberi</Link>
            <Link href="/#pricing" style={{ color: "#a1a1aa", fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Fiyatlandırma</Link>

            <button onClick={() => setIsCartOpen(true)} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '10px 18px', fontSize: '14px', fontWeight: 700, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}>
              <ShoppingCart size={18} />
              Sepetim
              {cartItems.length > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{cartItems.length}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* --- SEPET DRAWER --- */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000 }} />
          <div style={{ 
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100%)',
            backgroundColor: '#0c0c0c', zIndex: 2001, padding: '35px',
            boxShadow: '-10px 0 50px rgba(0,0,0,1)', display: 'flex', flexDirection: 'column',
            borderLeft: '1px solid rgba(255,255,255,0.08)', animation: 'slideIn 0.3s ease-out'
          }}>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: 0 }}>Sepetiniz</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '10px' }}><X size={20} /></button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#fff', fontWeight: '700' }}>{item.name}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div style={{ color: '#3b82f6', fontWeight: '800', fontSize: '18px' }}>₺{Number(item.price).toFixed(2)}</div>
                    </div>
                  ))}

                  <div style={{ marginTop: '10px', padding: '15px 5px' }}>
                    <label style={{ color: '#71717a', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <Ticket size={14} /> PROMOSYON KODU
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Kod girin..."
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={isApplied}
                        style={{ 
                          flex: 1, backgroundColor: '#161616', border: '1px solid #262626', 
                          borderRadius: '10px', padding: '12px', color: '#fff', fontSize: '14px', outline: 'none'
                        }}
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={isApplied}
                        style={{ 
                          backgroundColor: isApplied ? '#064e3b' : '#3b82f6', color: isApplied ? '#10b981' : '#fff',
                          padding: '0 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none'
                        }}
                      >
                        {isApplied ? <CheckCircle2 size={18} /> : "Uygula"}
                      </button>
                    </div>
                    {isApplied && <p style={{ color: '#10b981', fontSize: '12px', marginTop: '8px', fontWeight: '600' }}>İndirim uygulandı!</p>}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <ShoppingBag size={40} color="#27272a" />
                  </div>
                  <p style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>Sepetiniz Boş</p>
                  <button onClick={() => setIsCartOpen(false)} style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer', marginTop: '20px' }}>Paketleri İncele</button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717a', fontSize: '14px' }}>
                    <span>Ara Toplam:</span>
                    <span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  {isApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: '14px' }}>
                      <span>İndirim:</span>
                      <span>-₺{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '22px', fontWeight: '900', marginTop: '10px' }}>
                    <span>Toplam:</span>
                    <span>₺{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link href="/vehicle?p=detailed" onClick={() => setIsCartOpen(false)} style={{ backgroundColor: '#3b82f6', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '18px', borderRadius: '15px', fontWeight: '800' }}>
                  <CreditCard size={18} /> Güvenli Ödeme
                </Link>
                <div style={{ textAlign: 'center', marginTop: '15px', color: '#52525b', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <ShieldCheck size={14} color="#22c55e" /> Güvenli Ödeme Sistemi
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {children}
    </>
  );
}

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
        padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
        backgroundColor: currentStyle.bg, color: currentStyle.color, border: `1px solid ${currentStyle.bg}`,
      }}>
      {text}
    </span>
  );
}