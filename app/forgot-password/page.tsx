"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Kullanıcıyı e-posta ile kontrol et
      const { data: user, error: userError } = await supabase
        .from('reports')
        .select('user_email')
        .eq('user_email', email.trim().toLowerCase())
        .maybeSingle();

      if (!user) {
        throw new Error("Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.");
      }

      // 2. Geçici bir şisre oluştur (cv-XXXXX formatında)
      const tempPass = "cv-" + Math.floor(10000 + Math.random() * 90000);

      // 3. Veritabanındaki şifreyi güncelle
      const { error: updateError } = await supabase
        .from('reports')
        .update({ password: tempPass })
        .eq('user_email', email.trim().toLowerCase());

      if (updateError) throw updateError;

      // 4. Mail gönderim API'sini tetikle
      // Not: api/send-welcome endpoint'inin customMessage parametresini kabul ettiğini varsayıyoruz
      await fetch("/api/send-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(), 
          firstName: "Değerli Üyemiz", 
          isReport: false,
          customMessage: `Şifre sıfırlama talebiniz onaylandı. Yeni geçici şifreniz: ${tempPass} . Lütfen bu şifre ile giriş yaptıktan sonra Hesap Ayarları sayfasından şifrenizi güncelleyin.`
        }),
      });

      setIsSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#71717a', textDecoration: 'none', fontSize: '14px', marginBottom: '30px' }}>
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>

        <div style={{ background: '#0c0c0c', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          {!isSent ? (
            <>
              <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <ShieldCheck size={30} color="#3b82f6" />
              </div>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>Şifre Sıfırlama</h1>
              <p style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
                Hesabınıza bağlı e-posta adresini girin, size yeni bir geçici şifre gönderelim.
              </p>

              {error && (
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '10px', borderRadius: '10px', fontSize: '12px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#52525b' }} />
                  <input 
                    type="email" 
                    required
                    placeholder="E-posta Adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px', padding: '12px 12px 12px 42px', color: '#fff', outline: 'none' }} 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    backgroundColor: '#3b82f6', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '14px', 
                    borderRadius: '12px', 
                    fontWeight: '700', 
                    cursor: loading ? 'not-allowed' : 'pointer', 
                    marginTop: '10px',
                    opacity: loading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  {loading ? "İşleniyor..." : "Yeni Şifre Gönder"}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={30} color="#4ade80" />
              </div>
              <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>E-posta Gönderildi</h2>
              <p style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
                <b>{email}</b> adresine yeni geçici şifrenizi gönderdik. Lütfen gelen kutunuzu (ve gereksiz kutusunu) kontrol edin.
              </p>
              <button onClick={() => setIsSent(false)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
                Farklı bir e-posta dene
              </button>
            </div>
          )}
        </div>

        <p style={{ marginTop: '30px', color: '#52525b', fontSize: '12px' }}>
          Şifrenizi hatırladıysanız <Link href="/" style={{ color: '#71717a', fontWeight: '600' }}>Giriş Yapın</Link>
        </p>
      </div>
    </div>
  );
}