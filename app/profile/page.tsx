"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Download, Clock, CheckCircle2, 
  ShieldCheck, User, Mail, Calendar, AlertCircle, ArrowLeft
} from "lucide-react"; // Burası düzeltildi
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProfilePage() {
  const [reports, setReports] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const savedUser = localStorage.getItem("carvix_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_email', parsedUser.email)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const realReports = data.filter(r => !r.car_model.includes("YENİ ÜYE -"));
          setReports(realReports);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (!user && !loading) {
    return (
      <main style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <AlertCircle size={48} color="#3b82f6" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontWeight: 800 }}>Erişim Engellendi</h2>
          <p style={{ color: '#71717a', marginBottom: '20px' }}>Raporlarınızı görmek için lütfen giriş yapın.</p>
          <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700 }}>Ana Sayfaya Dön</Link>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      <nav style={{ 
        position: 'fixed', top: 0, width: '100%', zIndex: 50, 
        backgroundColor: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '15px 20px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900, fontSize: '20px', letterSpacing: '-1px' }}>
            CARVIX<span style={{ color: '#3b82f6' }}>AI</span>
          </Link>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/settings" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px' }}>Ayarlar</Link>
            <Link href="/dashboard" style={{ color: '#fff', backgroundColor: '#3b82f6', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ArrowLeft size={14} /> Yeni Analiz
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ padding: '120px 20px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ 
            background: 'linear-gradient(145deg, #0c0c0c, #111)', 
            padding: '30px', borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={35} color="#fff" />
              </div>
              <div>
                <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: 0 }}>{user?.name || "Kullanıcı"}</h1>
                <p style={{ color: '#71717a', margin: '5px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} /> {user?.email} • <Calendar size={14} /> Üyelik: 2026
                </p>
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)', 
              color: '#22c55e', 
              padding: '6px 14px', 
              borderRadius: '100px', 
              fontSize: '12px', 
              fontWeight: 800,
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}>
              AKTİF ÜYE
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Clock size={22} color="#3b82f6" /> Geçmiş Analiz Raporlarım
          </h2>

          <div style={{ overflowX: 'auto', backgroundColor: '#0c0c0c', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '20px 25px', color: '#71717a', fontSize: '13px', fontWeight: '700' }}>TARİH</th>
                  <th style={{ padding: '20px 25px', color: '#71717a', fontSize: '13px', fontWeight: '700' }}>ARAÇ BİLGİSİ</th>
                  <th style={{ padding: '20px 25px', color: '#71717a', fontSize: '13px', fontWeight: '700' }}>DURUM</th>
                  <th style={{ padding: '20px 25px', color: '#71717a', fontSize: '13px', fontWeight: '700', textAlign: 'right' }}>İŞLEM</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? reports.map((report) => (
                  <tr key={report.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '25px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>
                        {new Date(report.created_at).toLocaleDateString('tr-TR')}
                      </div>
                    </td>
                    <td style={{ padding: '25px', fontSize: '14px' }}>{report.car_model}</td>
                    <td style={{ padding: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: report.status === 'Tamamlandı' ? '#4ade80' : '#fbbf24', fontSize: '13px', fontWeight: '700' }}>
                        <CheckCircle2 size={14} /> {report.status}
                      </div>
                    </td>
                    <td style={{ padding: '25px', textAlign: 'right' }}>
                      <button 
                        onClick={() => alert('Analiz detayları PDF olarak hazırlanıyor...')}
                        style={{ 
                          background: '#161616', color: '#fff', border: '1px solid #262626', 
                          padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '600',
                          display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
                        }}
                      >
                        <Download size={14} color="#3b82f6" /> Detaylar
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#71717a' }}>
                      {loading ? "Veriler yükleniyor..." : "Henüz bir analiz raporunuz bulunmuyor."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '50px', padding: '25px', backgroundColor: 'rgba(59, 130, 246, 0.03)', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <p style={{ color: '#71717a', fontSize: '12px', textAlign: 'center', margin: 0 }}>
              <ShieldCheck size={16} color="#3b82f6" style={{ marginBottom: '-4px', marginRight: '8px' }} />
              Analizleriniz **YOLOv8x-Segmentation** teknolojisi ile işlenmektedir.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}