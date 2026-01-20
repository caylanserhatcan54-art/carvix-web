"use client";

import PricingCards from "@/components/marketing/PricingCards";
import CTA from "@/components/marketing/CTA";
import { BRAND } from "@/lib/marketing";
import { ShieldCheck, FileDown, Zap, Lock, CreditCard } from "lucide-react";

export default function PricingPage() {
  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Üst Başlık Grubu */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#3b82f6', 
            background: 'rgba(59,130,246,0.08)',
            padding: '10px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(59,130,246,0.2)',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '24px',
            letterSpacing: '0.5px'
          }}>
            <Zap size={16} fill="#3b82f6" />
            <span>ADIM 1: PAKETİNİZİ SEÇİN</span>
          </div>
          
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', 
            fontWeight: '900', 
            letterSpacing: '-3px',
            lineHeight: '1',
            marginBottom: '25px'
          }}>
            Analiz <span style={{ color: '#3b82f6' }}>Raporları</span>
          </h1>
          
          <p style={{ 
            color: '#a1a1aa', 
            fontSize: '1.2rem', 
            maxWidth: '650px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            İhtiyacınıza uygun paketi seçin, bir sonraki adımda 
            <span style={{ color: '#fff' }}> aracınızı belirleyip </span> 
            analizi anında başlatın.
          </p>
        </div>

        {/* Ana Fiyatlandırma Kartları */}
        <div style={{ marginBottom: '100px', position: 'relative' }}>
           <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            backgroundColor: 'rgba(59,130,246,0.1)',
            filter: 'blur(130px)',
            borderRadius: '100%',
            zIndex: 0
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Fiyatlar 89,90 TL ve 129,90 TL olarak ayarlandı */}
            <PricingCards />
          </div>
        </div>

        {/* İkonlu Açıklama Kutucukları */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          marginTop: '60px'
        }}>
          
          <div style={{ 
            backgroundColor: '#0c0c0c', 
            padding: '32px', 
            borderRadius: '28px', 
            border: '1px solid #1a1a1a',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px'
          }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '14px' }}>
              <FileDown size={28} color="#3b82f6" />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Dijital PDF Teslimatı</h4>
              <p style={{ color: '#71717a', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                Analiz bittiği an raporunuzu PDF olarak indirebilirsiniz. Dosyanız kalıcıdır ve istediğiniz zaman tekrar görüntülenebilir.
              </p>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#0c0c0c', 
            padding: '32px', 
            borderRadius: '28px', 
            border: '1px solid #1a1a1a',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px'
          }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '14px' }}>
              <ShieldCheck size={28} color="#22c55e" />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Güvenli Ödeme</h4>
              <p style={{ color: '#71717a', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                <strong>Garanti BBVA</strong> altyapısı ile 256-bit SSL korumalı ödeme. Kredi kartı bilgileriniz sistemimizde tutulmaz.
              </p>
            </div>
          </div>
        </div>

        {/* Alt Bilgi ve Yasal Disclaimer */}
        <div style={{ 
          marginTop: '50px', 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '30px' }}>
              <span style={{ color: '#52525b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={14} /> Tüm Kartlar Geçerlidir
              </span>
              <span style={{ color: '#52525b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} /> 3D Secure Onayı
              </span>
              <span style={{ color: '#52525b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} /> Anında Rapor Erişimi
              </span>
           </div>

           <p style={{ color: '#3f3f46', fontSize: '12px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
             {BRAND.disclaimerShort} Bu hizmet dijital bir analiz raporudur. Satın alım sonrası hazırlanan raporlar anında teslim edildiği için iade kapsamı dışındadır. Tüm süreç KVKK uyumlu ve şifrelenmiş altyapı üzerinden yürütülmektedir.
           </p>
        </div>

        <div style={{ marginTop: '80px' }}>
          <CTA />
        </div>
      </div>
    </main>
  );
}