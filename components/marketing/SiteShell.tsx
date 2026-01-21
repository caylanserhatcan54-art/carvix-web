"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingCart, X, Trash2, CreditCard, ShieldCheck, 
  Ticket, CheckCircle2, ShoppingBag, Search, 
  Layers, Construction, Target, User, LogIn, 
  Mail, Lock, Menu, Settings, History, LogOut, FileText, AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  
  // Auth Form State'leri
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Sayfa yüklendiğinde verileri getir
  useEffect(() => {
    const loadData = () => {
      const savedCart = localStorage.getItem("cart");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);

      const savedUser = localStorage.getItem("carvix_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    loadData();
    window.addEventListener("storage", loadData);
    window.addEventListener("cartUpdated", loadData);
    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("cartUpdated", loadData);
    };
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  const handleAuthAction = async () => {
    setAuthError("");
    
    if (!email || !password || (authMode === "register" && !fullName)) {
      setAuthError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setIsLoading(true);

    try {
      if (authMode === "register") {
        const { error: dbError } = await supabase
          .from('reports')
          .insert([
            { 
              user_email: email.trim().toLowerCase(), 
              car_model: 'YENİ ÜYE - ' + fullName, 
              status: 'Kayıt Tamamlandı',
              price: 0,
              password: password 
            }
          ]);

        if (dbError) throw new Error("Kayıt sırasında hata oluştu: " + dbError.message);

        fetch("/api/send-welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), firstName: fullName, isReport: false }),
        }).catch(e => console.error("Mail gönderim hatası:", e));
        
        alert("Kaydınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.");
        setAuthMode("login");
        setPassword("");
      } else {
        const cleanEmail = email.trim().toLowerCase();

        const { data: foundUser, error: loginError } = await supabase
          .from('reports')
          .select('*')
          .eq('user_email', cleanEmail)
          .eq('password', password)
          .maybeSingle();

        if (loginError || !foundUser) {
          throw new Error("E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.");
        }

        const displayName = foundUser.car_model.includes("YENİ ÜYE - ") 
          ? foundUser.car_model.replace("YENİ ÜYE - ", "") 
          : "Değerli Müşterimiz";

        const userData = { 
          name: displayName, 
          email: foundUser.user_email 
        };
        
        setUser(userData);
        localStorage.setItem("carvix_user", JSON.stringify(userData));
        setIsAuthOpen(false);
        setEmail(""); setPassword(""); setFullName("");
      }
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("carvix_user");
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            {/* Orijinal Logo Alanı */}
            <img 
              src="/logo.png" 
              alt="Carvix Logo" 
              style={{ height: '32px', width: 'auto' }} 
              onError={(e) => {(e.target as any).style.display='none'}} 
            />
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              CAR<span style={{ color: '#3b82f6' }}>VIX</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {!user ? (
              <>
                <button onClick={() => { setAuthMode("login"); setIsAuthOpen(true); }} style={{ background: 'none', border: 'none', color: '#a1a1aa', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Giriş Yap</button>
                <button onClick={() => { setAuthMode("register"); setIsAuthOpen(true); }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Kayıt Ol</button>
              </>
            ) : (
              <>
                <button onClick={() => setIsCartOpen(true)} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                  <ShoppingCart size={18} />
                  {cartItems.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#3b82f6', color: '#fff', fontSize: '10px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{cartItems.length}</span>}
                </button>
                <button onClick={() => setIsUserMenuOpen(true)} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Menu size={20} />
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {isAuthOpen && (
        <>
          <div onClick={() => setIsAuthOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(400px, 95%)', backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '40px', zIndex: 2001 }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', margin: '0 0 10px 0' }}>{authMode === "login" ? "Tekrar Hoşgeldiniz" : "Hesap Oluştur"}</h2>
              <p style={{ color: '#71717a', fontSize: '14px' }}>{authMode === "login" ? "Bilgilerinizle paneline erişin." : "Analiz dünyasına ilk adımınızı atın."}</p>
            </div>

            {authError && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '12px', borderRadius: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <AlertCircle size={16} /> {authError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {authMode === "register" && (
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#52525b' }} />
                  <input type="text" placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '14px', padding: '15px 15px 15px 45px', color: '#fff', outline: 'none' }} />
                </div>
              )}
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#52525b' }} />
                <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '14px', padding: '15px 15px 15px 45px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '15px', color: '#52525b' }} />
                <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '14px', padding: '15px 15px 15px 45px', color: '#fff', outline: 'none' }} />
              </div>

              {/* Şifremi Unuttum Bağlantısı */}
              {authMode === "login" && (
                <div style={{ textAlign: 'right', marginTop: '-5px' }}>
                  <Link 
                    href="/forgot-password" 
                    onClick={() => setIsAuthOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '12px', cursor: 'pointer', fontWeight: '600', textDecoration: 'none' }}
                  >
                    Şifremi Unuttum
                  </Link>
                </div>
              )}

              <button 
                onClick={handleAuthAction} 
                disabled={isLoading}
                style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', fontSize: '15px', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? "İşleniyor..." : (authMode === "login" ? "Giriş Yap" : "Kayıt Ol")}
              </button>
            </div>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
              <button onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>
                {authMode === "login" ? "Hesabınız yok mu? Hemen Katıl" : "Zaten üye misiniz? Giriş Yap"}
              </button>
            </div>
          </div>
        </>
      )}

      {isUserMenuOpen && (
        <>
          <div onClick={() => setIsUserMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 2000 }} />
          <div style={{ position: 'fixed', top: '80px', right: '20px', width: '280px', backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', zIndex: 2001, padding: '15px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '10px' }}>
              <div style={{ color: '#fff', fontWeight: '800', fontSize: '14px' }}>{user?.name}</div>
              <div style={{ color: '#71717a', fontSize: '12px' }}>{user?.email}</div>
            </div>
            <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a1a1aa', padding: '12px', textDecoration: 'none', fontSize: '14px', borderRadius: '10px' }}>
              <History size={18} /> Geçmiş Analizlerim
            </Link>
            <Link href="/settings" onClick={() => setIsUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a1a1aa', padding: '12px', textDecoration: 'none', fontSize: '14px', borderRadius: '10px' }}>
              <Settings size={18} /> Hesap Ayarları
            </Link>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', padding: '12px', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
              <LogOut size={18} /> Çıkış Yap
            </button>
          </div>
        </>
      )}

      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(400px, 100%)', backgroundColor: '#0c0c0c', zIndex: 2001, padding: '30px', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800' }}>Sepetim</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.length > 0 ? cartItems.map(item => (
                <div key={item.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </div>
                  <div style={{ color: '#3b82f6', fontWeight: '800' }}>₺{Number(item.price).toFixed(2)}</div>
                </div>
              )) : <div style={{ textAlign: 'center', color: '#71717a', marginTop: '40px' }}>Sepet boş.</div>}
            </div>
            {cartItems.length > 0 && (
              <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#fff', fontSize: '20px', fontWeight: '900' }}>
                  <span>Toplam</span>
                  <span>₺{total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)} style={{ display: 'block', backgroundColor: '#3b82f6', color: '#fff', textAlign: 'center', padding: '16px', borderRadius: '12px', fontWeight: '800', textDecoration: 'none' }}>Ödeme Adımına Geç</Link>
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
    <span style={{ padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, backgroundColor: currentStyle.bg, color: currentStyle.color, border: `1px solid ${currentStyle.bg}`, display: "inline-flex", alignItems: "center" }}>
      {text}
    </span>
  );
}