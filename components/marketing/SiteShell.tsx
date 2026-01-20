"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingCart, X, Trash2, CreditCard, ShieldCheck, 
  Ticket, CheckCircle2, ShoppingBag, Search, 
  Layers, Construction, Target 
} from "lucide-react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    };
    loadCart();
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
    if (updatedCart.length === 0) setIsApplied(false);
  };

  const discountRate = isApplied ? 0.20 : 0;
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

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
            
            <button 
              onClick={() => setIsPricingOpen(true)}
              style={{ background: 'none', border: 'none', color: "#a1a1aa", fontWeight: 600, fontSize: '14px', cursor: 'pointer', padding: 0 }}
            >
              Fiyatlandırma
            </button>

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

      {/* --- FİYATLANDIRMA DRAWER --- */}
      {isPricingOpen && (
        <>
          <div onClick={() => setIsPricingOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000 }} />
          <div style={{ 
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(500px, 100%)',
            backgroundColor: '#0c0c0c', zIndex: 2001, padding: '35px',
            boxShadow: '-10px 0 50px rgba(0,0,0,1)', display: 'flex', flexDirection: 'column',
            borderLeft: '1px solid rgba(255,255,255,0.08)', animation: 'slideIn 0.3s ease-out'
          }}>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', margin: 0 }}>Hizmet Kapsamı</h2>
                <p style={{ color: '#71717a', fontSize: '13px', margin: '5px 0 0 0' }}>Yapısal ve görsel kondisyon analizi</p>
              </div>
              <button onClick={() => setIsPricingOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '10px' }}><X size={20} /></button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Standart Paket */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '25px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#3b82f6', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Search size={18} color="#fff" /></div>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: '800' }}>Standart Analiz</h3>
                  </div>
                  <div style={{ color: '#fff', fontWeight: '900', fontSize: '22px' }}>₺89,90</div>
                </div>
                
                <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Aracın dış kaporta ve boya durumuna odaklanır. Yüzeydeki kusurları ve boyanan parçaları tespit etmek için kullanılan temel analizdir.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  <div style={{ color: '#e4e4e7', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={14} color="#3b82f6" /> Dış Kaporta ve Boya Kontrolü</div>
                  <div style={{ color: '#e4e4e7', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={14} color="#3b82f6" /> Parça Arası Boşluk ve Hizalama Analizi</div>
                  <div style={{ color: '#e4e4e7', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={14} color="#3b82f6" /> Yüzey Deformasyon Tespiti</div>
                </div>
              </div>

              {/* Detaylı Paket */}
              <div style={{ background: 'linear-gradient(145deg, rgba(59,130,246,0.1), rgba(0,0,0,0))', border: '1px solid rgba(59,130,246,0.3)', padding: '25px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#3b82f6', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Target size={18} color="#fff" /></div>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: '800' }}>Detaylı Analiz</h3>
                  </div>
                  <div style={{ color: '#3b82f6', fontWeight: '900', fontSize: '22px' }}>₺129,90</div>
                </div>

                <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Aracın ana iskeletini ve yapısal güvenliğini kapsayan derinlemesine analizdir. Gizli işlemlerin ve kritik yapı elemanlarının kontrolünü sağlar.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Layers size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#e4e4e7', fontSize: '13px' }}><b>Direk & Şasi Kontrolü:</b> Ön, orta ve arka direklerdeki işlemler ile şasi uçlarındaki düzeltmeleri analiz eder.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Construction size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#e4e4e7', fontSize: '13px' }}><b>Menteşe & Vida Analizi:</b> Kapı, kaput ve bagaj menteşelerindeki anahtar izlerini ve sök-tak durumlarını raporlar.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#e4e4e7', fontSize: '13px' }}><b>Yapısal Bütünlük:</b> Aracın iskelet yapısındaki (direk ve şasi bağlantıları) fabrikasyon dışı müdahaleler.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <p style={{ margin: 0, color: '#71717a', fontSize: '12px', lineHeight: '1.5', textAlign: 'center' }}>
                 Analiz tercihlerinizi fotoğraf yükleme aşamasından sonra belirleyebilirsiniz. Belirtilen ücretlere KDV dahildir.
               </p>
            </div>
          </div>
        </>
      )}

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
                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}><Trash2 size={16} /></button>
                      </div>
                      <div style={{ color: '#3b82f6', fontWeight: '800', fontSize: '18px' }}>₺{Number(item.price).toFixed(2)}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: '10px', padding: '15px 5px' }}>
                    <label style={{ color: '#71717a', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <Ticket size={14} /> PROMOSYON KODU
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder="Kod..." value={couponCode} onChange={(e) => setCouponCode(e.target.value)} disabled={isApplied} style={{ flex: 1, backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '10px', padding: '12px', color: '#fff', fontSize: '14px' }} />
                      <button onClick={() => { if (couponCode.trim().toUpperCase() === "FENOMEN20") setIsApplied(true); else alert("Geçersiz!"); }} disabled={isApplied} style={{ backgroundColor: isApplied ? '#064e3b' : '#3b82f6', color: isApplied ? '#10b981' : '#fff', padding: '0 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none' }}>{isApplied ? <CheckCircle2 size={18} /> : "Uygula"}</button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                  <ShoppingBag size={40} color="#27272a" style={{ marginBottom: '20px' }} />
                  <p style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>Sepetiniz Boş</p>
                  <button onClick={() => { setIsCartOpen(false); setIsPricingOpen(true); }} style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer', marginTop: '20px' }}>Fiyatlandırmayı Gör</button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '22px', fontWeight: '900', marginBottom: '20px' }}>
                  <span>Toplam:</span>
                  <span>₺{total.toFixed(2)}</span>
                </div>
                <Link href="/vehicle?p=detailed" onClick={() => setIsCartOpen(false)} style={{ backgroundColor: '#3b82f6', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '18px', borderRadius: '15px', fontWeight: '800' }}>
                  <CreditCard size={18} /> Güvenli Ödeme
                </Link>
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
        display: "inline-flex", alignItems: "center"
      }}>
      {text}
    </span>
  );
}