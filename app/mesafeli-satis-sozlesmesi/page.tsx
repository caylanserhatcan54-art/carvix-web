"use client";

import React from 'react';

export default function DistanceSalesAgreement() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '80px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
        
        <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '40px', textAlign: 'center', color: '#3b82f6' }}>
          Mesafeli Satış Sözleşmesi
        </h1>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
            1. TARAFLAR
          </h2>
          <p><strong>SATICI:</strong></p>
          <p>Unvan: Carvix — Yapay Zeka Analiz Hizmetleri</p>
          <p>Adres: Adapazarı Merkez, Sakarya, Türkiye</p>
          <p>E-posta: destek@carvix.com</p>
          <br />
          <p><strong>ALICI:</strong></p>
          <p>İşbu sözleşme kapsamında Alıcı, www.carvix.com web sitesi üzerinden hizmet satın alan kişiyi ifade eder. Alıcı'nın kayıt olurken kullandığı iletişim bilgileri esas alınır.</p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
            2. SÖZLEŞMENİN KONUSU
          </h2>
          <p>
            İşbu Sözleşme’nin konusu, Alıcı'nın Satıcı'ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği, aşağıda nitelikleri ve satış fiyatı belirtilen dijital analiz hizmetinin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
            3. HİZMET VE ÖDEME BİLGİLERİ
          </h2>
          <p>
            Satın alınan hizmet; araç fotoğraflarının yapay zeka tarafından analiz edilerek raporlanmasıdır. Hizmetin bedeli, seçilen pakete (Standart veya Detaylı) göre web sitesinde belirtilen tutardır ve Shopier güvenli ödeme altyapısı üzerinden tahsil edilir.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
            4. CAYMA HAKKI (İSTİSNAİ DURUMLAR)
          </h2>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği’nin 15. Maddesi gereğince; <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> cayma hakkı kullanılamaz. Carvix tarafından sunulan analiz raporu dijital bir hizmet olduğundan ve işlem anında tamamlandığından, analiz süreci başladıktan sonra iade ve iptal mümkün değildir.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
            5. GENEL HÜKÜMLER
          </h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Carvix, sunduğu analiz sonuçlarının %100 doğruluk payını taahhüt etmez; raporlar yapay zeka algoritması tarafından üretilen bir öngörü niteliğindedir.</li>
            <li>Alıcı, yüklediği fotoğrafların netliğinden ve doğruluğundan sorumludur.</li>
            <li>Ödeme yapıldıktan sonra rapor Alıcı'nın ekranına yansıtılır veya kayıtlı e-posta adresine gönderilir.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
            6. YETKİLİ MAHKEME
          </h2>
          <p>
            İşbu sözleşmeden doğan uyuşmazlıklarda Gümrük ve Ticaret Bakanlığı tarafından ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değerin üzerindeki durumlarda Sakarya Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </section>

        <div style={{ marginTop: '50px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '15px', fontSize: '14px', color: '#71717a', textAlign: 'center' }}>
          Bu sözleşme, Alıcı'nın ödeme adımını onaylamasıyla birlikte elektronik ortamda yürürlüğe girmiş kabul edilir.
        </div>
      </div>
    </div>
  );
}