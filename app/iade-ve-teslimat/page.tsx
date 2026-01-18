"use client";

import { PackageCheck, RotateCcw, AlertTriangle, MessageSquare } from "lucide-react";

export default function IadeVeTeslimatPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        lineHeight: '1.8', 
        color: '#e4e4e7', 
        fontFamily: 'sans-serif' 
      }}>
        
        {/* Başlık Bölümü */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: '2.2rem', 
            fontWeight: '800', 
            letterSpacing: '-1px',
            marginBottom: '10px'
          }}>
            İptal, İade ve Teslimat
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#ef4444', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <section style={{ marginBottom: '30px' }}>
          <p>
            <strong style={{ color: '#fff' }}>Carvix</strong> üzerinden satın alınan dijital hizmetlerin (AI Araç Analiz Raporu) süreçleri, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümlerine tabidir.
          </p>
        </section>

        {/* 1. Teslimat */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <PackageCheck size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0 }}>1. Teslimat Koşulları</h3>
          </div>
          <p>
            Carvix hizmetleri tamamen <strong style={{ color: '#fff' }}>dijitaldir</strong>. Ödeme işlemi Tami Sanal POS üzerinden tamamlandığı anda analiz süreci başlar. Rapor, web sitemiz üzerinden <strong style={{ color: '#3b82f6' }}>anında (elektronik ortamda)</strong> sunulur. Fiziksel bir kargo gönderimi yapılmamaktadır.
          </p>
        </div>

        {/* 2. İptal ve İade - Kritik Bölüm */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <RotateCcw size={24} color="#ef4444" />
            <h3 style={{ color: '#fff', margin: 0 }}>2. İptal ve İade Politikası</h3>
          </div>
          <p style={{ marginBottom: '20px' }}>
            Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin (ğ) bendi uyarınca; <em>"Elektronik ortamda anında ifa edilen hizmetler"</em> kapsamında tüketicinin <strong>cayma hakkı bulunmamaktadır.</strong>
          </p>
          
          <div style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.05)', 
            padding: '25px', 
            borderRadius: '16px', 
            borderLeft: '4px solid #ef4444' 
          }}>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#fca5a5' }}>
              <li style={{ marginBottom: '10px' }}>Satın alınan rapor kişiye özel ve anında oluşturulduğu için ücret iadesi mümkün değildir.</li>
              <li>Kullanıcı, ödeme yapmadan önce bu dijital teslimat koşulunu kabul etmiş sayılır.</li>
            </ul>
          </div>
        </div>

        {/* 3. Teknik Aksaklıklar */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <AlertTriangle size={24} color="#f59e0b" />
            <h3 style={{ color: '#fff', margin: 0 }}>3. Teknik Aksaklıklar</h3>
          </div>
          <p>
            Sistem kaynaklı bir hata nedeniyle raporun oluşturulamaması durumunda:
          </p>
          <ul style={{ color: '#a1a1aa', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Hata incelenerek hizmetin yeniden sunulması sağlanır.</li>
            <li>Hizmet teknik olarak sunulamazsa, tutar Tami aracılığıyla kartınıza iade edilir (Yansıma süresi 2-7 iş günüdür).</li>
          </ul>
        </div>

        {/* 4. İletişim */}
        <div style={{ 
          marginTop: '60px', 
          padding: '30px', 
          backgroundColor: '#18181b', 
          borderRadius: '20px', 
          border: '1px solid #27272a',
          textAlign: 'center'
        }}>
          <MessageSquare size={24} color="#3b82f6" style={{ marginBottom: '15px' }} />
          <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Uyuşmazlık ve Destek</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', margin: 0 }}>
            Tüm talepleriniz için bize <strong style={{ color: '#fff' }}>info@carvix.site</strong> üzerinden ulaşabilirsiniz. 
            Tüketici şikayetleri için T.C. Ticaret Bakanlığı Hakem Heyetleri yetkilidir.
          </p>
        </div>

      </div>
    </div>
  );
}