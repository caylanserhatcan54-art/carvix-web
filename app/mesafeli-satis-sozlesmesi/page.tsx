"use client";

import { Scale, Users, CreditCard, PlayCircle, ShieldCheck } from "lucide-react";

export default function MesafeliSatisSozlesmesiPage() {
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
            Mesafeli Satış Sözleşmesi
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#3b82f6', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <section style={{ marginBottom: '30px' }}>
          <p>
            İşbu sözleşme, <strong style={{ color: '#fff' }}>www.carvix.site</strong> üzerinden sunulan dijital hizmetlerin satışına ilişkin olarak, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca düzenlenmiştir.
          </p>
        </section>

        {/* 1. Taraflar */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Users size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0 }}>1. Taraflar</h3>
          </div>
          <div style={{ backgroundColor: '#18181b', padding: '20px', borderRadius: '16px', border: '1px solid #27272a' }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#fff' }}>SATICI:</strong><br />
              Unvan: Serhat Can Çaylan <br />
              Adres: Çayiçi Mah. Toker Sk. No: 16 İç Kapı No: 1 Sapanca / SAKARYA <br />
              E-posta: info@carvix.site<br />
              Telefon: 0533 523 99 54 
            </p>
            <p style={{ marginTop: '15px', marginBottom: 0 }}>
              <strong style={{ color: '#fff' }}>ALICI (Tüketici):</strong><br />
              Sistem üzerinden hizmet satın alan ve ödeme sırasında bilgilerini beyan eden gerçek veya tüzel kişidir.
            </p>
          </div>
        </div>

        {/* 2. Hizmet ve Ödeme */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <CreditCard size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0 }}>2. Sözleşme Konusu Hizmet ve Ödeme</h3>
          </div>
          <p>
            <strong style={{ color: '#fff' }}>Hizmet Tanımı:</strong> Yapay zeka algoritmaları ile dijital araç risk analiz raporu oluşturulması.<br />
            <strong style={{ color: '#fff' }}>Ödeme Altyapısı:</strong> Ödemeler, <strong style={{ color: '#fff' }}>İşyerimpos</strong> güvenli sistemleri üzerinden tahsil edilir.
          </p>
        </div>

        {/* 3. İfa ve Teslimat */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <PlayCircle size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0 }}>3. İfa ve Teslimat</h3>
          </div>
          <p>
            Sözleşme konusu hizmet dijital bir içerik olup, ödeme onayı alındığı anda Alıcı'nın erişimine elektronik ortamda anında sunulur. Alıcı, bu aşamadan sonra hizmetin ifa edilmiş olduğunu kabul eder.
          </p>
        </div>

        {/* 4. Cayma Hakkı İstisnası */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Scale size={24} color="#ef4444" />
            <h3 style={{ color: '#fff', margin: 0 }}>4. Cayma Hakkı İstisnası</h3>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.05)', 
            padding: '25px', 
            borderRadius: '16px', 
            border: '1px solid rgba(239, 68, 68, 0.2)' 
          }}>
            <p style={{ margin: 0 }}>
              Mesafeli Sözleşmeler Yönetmeliği'nin 15/1-ğ maddesi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetlerde"</strong> cayma hakkı kullanılamaz. Alıcı, satın aldığı raporun kendisine sunulmasıyla birlikte cayma hakkını kaybedeceğini peşinen kabul eder.
            </p>
          </div>
        </div>

        {/* 5. Genel Şartlar */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <ShieldCheck size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0 }}>5. Genel Şartlar</h3>
          </div>
          <ul style={{ color: '#a1a1aa', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Alıcı, sisteme yüklediği görsellerin doğruluğundan sorumludur.</li>
            <li style={{ marginBottom: '10px' }}>Teknik hatalarda, ücret iadesi İşyerimpos aracılığıyla 10 iş günü içerisinde yapılır.</li>
            <li>Bu sözleşme, elektronik onay ile birlikte yürürlüğe girer.</li>
          </ul>
        </div>

        <footer style={{ 
          marginTop: '60px', 
          paddingTop: '20px', 
          borderTop: '1px solid #27272a', 
          fontSize: '0.85rem', 
          color: '#52525b',
          textAlign: 'center'
        }}>
          <p>Son Güncelleme: 19 Ocak 2026 - Serhat Can Çaylan</p>
        </footer>
      </div>
    </div>
  );
}