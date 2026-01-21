"use client";

import { useState, useEffect } from "react";
import { SiteShell } from "@/components/marketing/SiteShell";
import { supabase } from "@/lib/supabase";
import { Lock, ShieldCheck, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("carvix_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Kontroller
    if (passwords.new !== passwords.confirm) {
      return setStatus({ type: "error", message: "Yeni şifreler eşleşmiyor." });
    }
    if (passwords.new.length < 6) {
      return setStatus({ type: "error", message: "Şifre en az 6 karakter olmalıdır." });
    }

    setLoading(true);

    try {
      // 1. Mevcut şifreyi doğrula
      const { data: checkUser, error: checkError } = await supabase
        .from('reports')
        .select('password')
        .eq('user_email', user.email)
        .eq('password', passwords.current)
        .maybeSingle();

      if (checkError || !checkUser) {
        throw new Error("Mevcut şifreniz hatalı.");
      }

      // 2. Şifreyi güncelle
      const { error: updateError } = await supabase
        .from('reports')
        .update({ password: passwords.new })
        .eq('user_email', user.email);

      if (updateError) throw updateError;

      setStatus({ type: "success", message: "Şifreniz başarıyla güncellendi!" });
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <SiteShell><div style={{padding: '100px', color: '#fff'}}>Yükleniyor...</div></SiteShell>;

  return (
    <SiteShell>
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '100px 20px 40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900' }}>Hesap Ayarları</h1>
            <p style={{ color: '#71717a' }}>Güvenliğinizi sağlamak için şifrenizi düzenli olarak güncelleyin.</p>
          </div>

          <div style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
            <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {status.message && (
                <div style={{ 
                  padding: '15px', borderRadius: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px',
                  backgroundColor: status.type === "success" ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: status.type === "success" ? '#4ade80' : '#f87171',
                  border: `1px solid ${status.type === "success" ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                }}>
                  {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {status.message}
                </div>
              )}

              <div>
                <label style={{ color: '#a1a1aa', fontSize: '13px', display: 'block', marginBottom: '8px', marginLeft: '5px' }}>Mevcut Şifre</label>
                <input 
                  type="password" 
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px', padding: '12px 15px', color: '#fff', outline: 'none' }} 
                />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '10px 0' }} />

              <div>
                <label style={{ color: '#a1a1aa', fontSize: '13px', display: 'block', marginBottom: '8px', marginLeft: '5px' }}>Yeni Şifre</label>
                <input 
                  type="password" 
                  required
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px', padding: '12px 15px', color: '#fff', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ color: '#a1a1aa', fontSize: '13px', display: 'block', marginBottom: '8px', marginLeft: '5px' }}>Yeni Şifre (Tekrar)</label>
                <input 
                  type="password" 
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px', padding: '12px 15px', color: '#fff', outline: 'none' }} 
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Güncelleniyor..." : <><Save size={18} /> Şifreyi Güncelle</>}
              </button>

            </form>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '15px', border: '1px dashed rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ShieldCheck size={24} color="#3b82f6" />
            <p style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
              Şifreniz veritabanımızda güvenli bir şekilde saklanır. Kimseyle paylaşmamanızı öneririz.
            </p>
          </div>

        </div>
      </div>
    </SiteShell>
  );
}