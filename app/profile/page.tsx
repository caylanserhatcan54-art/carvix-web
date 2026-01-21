"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Download, Clock, CheckCircle2, 
  ShieldCheck, User, Mail, Calendar, AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SiteShell, Badge } from "@/components/marketing/SiteShell";

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
        
        // Supabase'den bu kullanıcıya ait raporları çek
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_email', parsedUser.email)
          .order('created_at', { ascending: false });

        if (!error && data) {
          // "YENİ ÜYE" kaydı dışındaki gerçek raporları filtrele
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
      <SiteShell>
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', backgroundColor: '#050505' }}>
          <AlertCircle size={48} color="#3b82f6" style={{ marginBottom: '20px' }} />
          <h2>Erişim Engellendi</h2>
          <p style={{ color: '#71717a' }}>Raporlarınızı görmek için lütfen giriş yapın.</p>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '100px 20px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Üst Bilgi Kartı - Dinamik */}
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
          </div>

          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Clock size={20} color="#3b82f6" /> Geçmiş Analiz Raporlarım
          </h2>

          {/* Rapor Tablosu */}
          <div style={{ overflowX: 'auto', backgroundColor: '#0c0c0c', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '15px', color: '#71717a', fontSize: '13px', fontWeight: '600' }}>TARİH</th>
                  <th style={{ padding: '15px', color: '#71717a', fontSize: '13px', fontWeight: '600' }}>ARAÇ BİLGİSİ</th>
                  <th style={{ padding: '15px', color: '#71717a', fontSize: '13px', fontWeight: '600' }}>DURUM</th>
                  <th style={{ padding: '15px', color: '#71717a', fontSize: '13px', fontWeight: '600', textAlign: 'right' }}>İŞLEM</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? reports.map((report) => (
                  <tr key={report.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '20px 15px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>
                        {new Date(report.created_at).toLocaleDateString('tr-TR')}
                      </div>
                    </td>
                    <td style={{ padding: '20px 15px', fontSize: '14px' }}>{report.car_model}</td>
                    <td style={{ padding: '20px 15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: report.status === 'Tamamlandı' ? '#4ade80' : '#fbbf24', fontSize: '13px', fontWeight: '600' }}>
                        <CheckCircle2 size={14} /> {report.status}
                      </div>
                    </td>
                    <td style={{ padding: '20px 15px', textAlign: 'right' }}>
                      <button 
                        onClick={() => alert('Analiz detayları hazırlanıyor...')}
                        style={{ 
                          background: '#161616', color: '#fff', border: '1px solid #262626', 
                          padding: '8px 15px', borderRadius: '10px', fontSize: '13px', 
                          display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' 
                        }}
                      >
                        <Download size={14} color="#3b82f6" /> Detaylar
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#71717a' }}>
                      {loading ? "Veriler yükleniyor..." : "Henüz bir analiz raporunuz bulunmuyor."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Denetim Notu */}
          <div style={{ marginTop: '50px', padding: '20px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '15px', border: '1px dashed rgba(59, 130, 246, 0.3)' }}>
            <p style={{ color: '#a1a1aa', fontSize: '12px', textAlign: 'center', margin: 0 }}>
              <ShieldCheck size={14} style={{ marginBottom: '-3px', marginRight: '5px' }} />
              Tüm analiz raporları 256-bit SSL sertifikası ile korunmaktadır ve 10 yıl boyunca dijital arşivimizde saklanır.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}