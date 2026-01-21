"use client";

import { Scale, Users, CreditCard, PlayCircle, ShieldCheck, FileText, Gavel, LayoutDashboard } from "lucide-react";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        lineHeight: '1.7', 
        color: '#e4e4e7', 
        fontFamily: 'sans-serif' 
      }}>
        
        {/* Başlık Bölümü */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', marginBottom: '15px' }}>
            <FileText size={22} />
            <span style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '13px' }}>HUKUKİ SÖZLEŞME</span>
          </div>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
            fontWeight: '900', 
            letterSpacing: '-1px',
            margin: 0
          }}>
            Mesafeli Satış Sözleşmesi
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#71717a', marginTop: '10px' }}>
            Yürürlük Tarihi: 19 Ocak 2026
          </p>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.95rem', color: '#a1a1aa' }}>
            İşbu sözleşme, <strong>www.carvix.site</strong> web sitesi üzerinden sunulan dijital hizmetlerin (AI Araç Analiz Raporu) satışına ilişkin olarak, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca, tarafların hak ve yükümlülüklerini belirler.
          </p>
        </section>

        {/* 1. Taraflar */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Users size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>1. Taraflar</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h4 style={{ color: '#3b82f6', marginTop: 0, fontSize: '15px', textTransform: 'uppercase' }}>SATICI</h4>
              <p style={{ fontSize: '14px', color: '#d1d1d6', margin: 0, lineHeight: '1.8' }}>
                <strong>Ünvan:</strong> Serhat Can Çaylan<br />
                <strong>Adres:</strong> Çayiçi Mah. Toker Sk. No: 16 İç Kapı No: 1 Sapanca / SAKARYA<br />
                <strong>E-posta:</strong> info@carvix.site<br />
                <strong>Telefon:</strong> 0533 523 99 54
              </p>
            </div>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h4 style={{ color: '#3b82f6', marginTop: 0, fontSize: '15px', textTransform: 'uppercase' }}>ALICI</h4>
              <p style={{ fontSize: '14px', color: '#d1d1d6', margin: 0 }}>
                Web sitesine üye olan ve hizmet satın alan gerçek veya tüzel kişidir. Alıcı, üyelik bilgilerinin ve ödeme sırasında beyan ettiği verilerin doğruluğunu taahhüt eder.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Hizmet ve Ödeme */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <CreditCard size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>2. Hizmet ve Ödeme</h3>
          </div>
          <p style={{ color: '#a1a1aa' }}>
            Sözleşme konusu hizmet; Alıcı tarafından sisteme yüklenen araç fotoğraflarının yapay zeka algoritmaları (YOLOv8) ile taranarak bir dijital analiz raporu oluşturulmasıdır. Ödemeler <strong>İşyerimpos / Garanti BBVA</strong> altyapısı üzerinden SSL korumalı olarak tahsil edilir. Hizmet ücretine tüm vergiler dahildir.
          </p>
        </div>

        {/* 3. İfa ve Teslimat - GÜNCELLENDİ */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <LayoutDashboard size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>3. İfa ve Teslimat</h3>
          </div>
          <p style={{ color: '#a1a1aa' }}>
            Satın alınan dijital analiz hizmeti "Anında İfa Edilen Hizmet" kapsamındadır. Ödeme onaylandığı anda rapor üretilir ve Alıcı'nın <strong>"Kullanıcı Paneli" (Dashboard)</strong> sekmesine kalıcı olarak yüklenir. Alıcı, satın aldığı raporlara dilediği zaman üye girişi yaparak ulaşabilir. Fiziksel kargo teslimatı yapılmamaktadır.
          </p>
        </div>

        {/* 4. Cayma Hakkı */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Scale size={24} color="#ef4444" />
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>4. Cayma Hakkı İstisnası</h3>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.03)', 
            padding: '25px', 
            borderRadius: '24px', 
            border: '1px solid rgba(239, 68, 68, 0.1)' 
          }}>
            <p style={{ margin: 0, color: '#fca5a5', fontSize: '0.95rem' }}>
              Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin (ğ) bendi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetler ve tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> cayma hakkı kullanılamaz. Analiz süreci başladığı ve rapor Alıcı paneline tanımlandığı andan itibaren iade mümkün değildir.
            </p>
          </div>
        </div>

        {/* 5. Uyuşmazlık ve Yetkili Mahkeme */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Gavel size={24} color="#3b82f6" />
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>5. Uyuşmazlık Çözümü</h3>
          </div>
          <p style={{ color: '#a1a1aa' }}>
            İşbu sözleşmeden doğan uyuşmazlıklarda, Sanayi ve Ticaret Bakanlığı'nca ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değeri aşan durumlarda ise <strong>Sakarya Tüketici Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
          </p>
        </div>

        {/* Onay Bölümü */}
        <div style={{ 
          marginTop: '60px', 
          padding: '30px', 
          backgroundColor: '#111', 
          borderRadius: '24px', 
          textAlign: 'center',
          border: '1px solid #222'
        }}>
          <ShieldCheck size={32} color="#22c55e" style={{ margin: '0 auto 15px' }} />
          <p style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}>
            Üye olup ödeme işlemini tamamlayan Alıcı, işbu sözleşmenin tüm maddelerini kabul etmiş sayılır.
          </p>
        </div>

        <footer style={{ 
          marginTop: '60px', 
          paddingTop: '30px', 
          borderTop: '1px solid #18181b', 
          fontSize: '0.8rem', 
          color: '#52525b',
          textAlign: 'center'
        }}>
          <p>© 2026 Serhat Can Çaylan — Carvix Dijital Raporlama Sistemleri</p>
          <p>Tüm yasal haklar saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}