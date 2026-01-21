"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    // Backend simülasyonu
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/"); // 3 saniye sonra ana sayfaya (girişe) yönlendir
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        
        <div style={{ background: '#0c0c0c', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          {!isSuccess ? (
            <>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', marginBottom: '10px', textAlign: 'center' }}>Yeni Şifre Belirle</h1>
              <p style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px', textAlign: 'center' }}>
                Hesabınız için yeni ve güvenli bir şifre oluşturun.
              </p>

              <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {error && (
                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '12px', borderRadius: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#52525b' }} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Yeni Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px', padding: '12px 40px 12px 42px', color: '#fff', outline: 'none' }} 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '14px', background: 'none', border: 'none', color: '#52525b', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#52525b' }} />
                  <input 
                    type="password"
                    required
                    placeholder="Şifre Tekrarı"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px', padding: '12px 12px 12px 42px', color: '#fff', outline: 'none' }} 
                  />
                </div>

                <button type="submit" style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
                  Şifreyi Güncelle
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={30} color="#4ade80" />
              </div>
              <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>Şifre Güncellendi!</h2>
              <p style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Yeni şifreniz başarıyla kaydedildi. Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}