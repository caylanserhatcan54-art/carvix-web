"use client";

import { FileText, ShieldCheck, Scale, Info } from "lucide-react";

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
        
        {/* Başlık ve İkon */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', marginBottom: '15px' }}>
            <FileText size={24} />
            <span style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '14px' }}>YASAL METİN</span>
          </div>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', 
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

        {/* 1. TARAFLAR */}
        <section style={{ marginBottom: '40px', padding: '30px', backgroundColor: '#111', borderRadius: '24px', border: '1px solid #222' }}>
          <h3 style={{ color: '#fff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Scale size={20} color="#3b82f6" /> 1. Taraflar
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '20px' }}>
            <div>
              <h4 style={{ color: '#3b82f6', fontSize: '14px', marginBottom: '10px' }}>SATICI BİLGİLERİ</h4>
              <p style={{ fontSize: '14px', color: '#a1a1aa', margin: 0 }}>
                <strong style={{ color: '#fff' }}>Ünvan:</strong> Serhat Can Çaylan<br />
                <strong style={{ color: '#fff' }}>Adres:</strong> Çayiçi Mah. Toker Sk. No: 16 İç Kapı No: 1 Sapanca / SAKARYA<br />
                <strong style={{ color: '#fff' }}>E-posta:</strong> info@carvix.site<br />
                <strong style={{ color: '#fff' }}>Telefon:</strong> 0533 523 99 54
              </p>
            </div>
            <div>
              <h4 style={{ color: '#3b82f6', fontSize: '14px', marginBottom: '10px' }}>ALICI BİLGİLERİ</h4>
              <p style={{ fontSize: '14px', color: '#a1a1aa', margin: 0 }}>
                www.carvix.site web sitesi üzerinden dijital hizmet satın alan, ödeme formunda beyan ettiği bilgileri esas alınan kullanıcıdır.
              </p>
            </div>
          </div>
        </section>

        {/* SÖZLEŞME MADDELERİ */}
        <div style={{ display: 'grid', gap: '35px', padding: '0 10px' }}>
          
          <section>
            <h3 style={{ color: '#fff' }}>2. Sözleşmenin Konusu</h3>
            <p style={{ color: '#a1a1aa' }}>
              İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği "Yapay Zeka Destekli Araç Analiz Raporu" hizmetinin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri uyarınca tarafların hak ve yükümlülüklerinin belirlenmesidir.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>3. Hizmet ve Ödeme</h3>
            <p style={{ color: '#a1a1aa' }}>
              Satın alınan hizmet, araç görsellerinin AI algoritmaları ile taranarak bir ön analiz raporu oluşturulmasıdır. Ödemeler <strong>İşyerimpos</strong> güvenli ödeme altyapısı ile tahsil edilir.
            </p>
          </section>

          <section style={{ padding: '25px', backgroundColor: 'rgba(59,130,246,0.05)', borderRadius: '16px', borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ color: '#fff', marginTop: 0 }}>4. Dijital Teslimat</h3>
            <p style={{ color: '#a1a1aa', margin: 0 }}>
              Sözleşme konusu hizmet dijital içerik niteliğindedir. Alıcı ödemeyi tamamladığı anda analiz süreci başlar ve rapor Alıcı'ya anında web tarayıcısı üzerinden sunulur. Fiziksel bir kargo teslimatı yapılmaz.
            </p>
          </section>

          <section style={{ padding: '25px', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: '16px', borderLeft: '4px solid #ef4444' }}>
            <h3 style={{ color: '#ef4444', marginTop: 0 }}>5. Cayma Hakkı İstisnası</h3>
            <p style={{ color: '#a1a1aa', margin: 0 }}>
              Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi (ğ) bendi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> tüketicinin cayma hakkı bulunmamaktadır. İşlem tamamlandığında ücret iadesi yapılmaz.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>6. Genel Hükümler</h3>
            <ul style={{ color: '#a1a1aa', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Alıcı, sisteme yüklediği görsellerin doğruluğundan bizzat sorumludur.</li>
              <li style={{ marginBottom: '10px' }}>Satıcı, teknik arıza nedeniyle raporun teslim edilememesi durumunda ücreti iade etmekle yükümlüdür.</li>
              <li>Sözleşme konusu rapor, bir ön analiz olup resmi ekspertiz belgesi niteliği taşımaz.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>7. Yetkili Mahkeme</h3>
            <p style={{ color: '#a1a1aa' }}>
              Uyuşmazlıklarda, T.C. Ticaret Bakanlığı tarafından belirlenen parasal sınırlar dahilinde Tüketici Hakem Heyetleri veya Sakarya Tüketici Mahkemeleri yetkilidir.
            </p>
          </section>
        </div>

        {/* Onay Notu */}
        <div style={{ 
          marginTop: '60px', 
          padding: '30px', 
          textAlign: 'center', 
          borderTop: '1px solid #222',
          backgroundColor: '#0a0a0a',
          borderRadius: '0 0 32px 32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
            <ShieldCheck color="#22c55e" size={20} />
            <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '14px' }}>ELEKTRONİK OLARAK ONAYLANMIŞTIR</span>
          </div>
          <p style={{ color: '#71717a', fontSize: '13px', maxWidth: '500px', margin: '0 auto' }}>
            Ödeme işlemini gerçekleştiren kullanıcı, yukarıda yer alan tüm sözleşme maddelerini okumuş ve kabul etmiş sayılır.
          </p>
        </div>

        <footer style={{ marginTop: '40px', textAlign: 'center', color: '#3f3f46', fontSize: '12px' }}>
          © 2026 Serhat Can Çaylan - Carvix Dijital Hizmetler
        </footer>
      </div>
    </div>
  );
}