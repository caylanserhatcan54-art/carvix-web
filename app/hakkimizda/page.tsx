"use client";

import { Info, Cpu, Zap, ShieldAlert, Target, Users } from "lucide-react";

export default function HakkimizdaPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        lineHeight: '1.8', 
        color: '#e4e4e7', 
        fontFamily: 'sans-serif' 
      }}>
        
        {/* Başlık Bölümü */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '900', 
            letterSpacing: '-1.5px',
            marginBottom: '15px'
          }}>
            Geleceğin Araç Analizi
          </h1>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#3b82f6', margin: '0 auto', borderRadius: '10px' }}></div>
        </div>
        
        <section style={{ marginBottom: '50px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '500', maxWidth: '700px', margin: '0 auto' }}>
            <strong style={{ color: '#3b82f6' }}>Carvix</strong>, otomotiv dünyasını yapay zeka (YOLOv8) teknolojileriyle dijitalleştiren yenilikçi bir teknoloji platformudur.
          </p>
          <p style={{ marginTop: '20px', color: '#a1a1aa' }}>
            Türkiye merkezli girişimimiz, araç alım-satım süreçlerindeki belirsizlikleri ortadan kaldırmak ve 
            kullanıcılara fiziksel ekspertiz öncesinde "veri odaklı bir filtreleme" imkanı sunmak için kurulmuştur.
          </p>
        </section>

        {/* Özellikler Grid - Responsive hale getirildi */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginBottom: '50px' 
        }}>
          <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' }}>
            <Cpu size={28} color="#3b82f6" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Yapay Zeka Mimarisi</h3>
            <p style={{ fontSize: '0.95rem', color: '#a1a1aa', margin: 0 }}>
              Görselleri bilgisayarlı görü algoritmalarıyla işleyerek mikron düzeyindeki boya farklarını ve panel uyumsuzluklarını saniyeler içinde analiz ederiz.
            </p>
          </div>
          
          <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' }}>
            <Target size={28} color="#3b82f6" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Şeffaf Veri</h3>
            <p style={{ fontSize: '0.95rem', color: '#a1a1aa', margin: 0 }}>
              Amacımız, alıcı ve satıcı arasındaki bilgi asimetrisini azaltmak. Kullanıcının gereksiz ekspertiz maliyetlerinden kurtulmasını sağlıyoruz.
            </p>
          </div>
        </div>

        {/* Vizyon/Misyon Kısa Not */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '50px', padding: '10px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} color="#3b82f6"/> Biz Kimiz?</h4>
            <p style={{ fontSize: '0.9rem', color: '#71717a' }}>Yapay zeka mühendisliği ve otomotiv tecrübesini birleştiren, Sakarya merkezli Serhat Can Çaylan tarafından hayata geçirilmiş bir dijital danışmanlık projesiyiz.</p>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} color="#3b82f6"/> Hedefimiz</h4>
            <p style={{ fontSize: '0.9rem', color: '#71717a' }}>Türkiye'den dünyaya açılan, en hızlı ve güvenilir araç ön analiz motoru olmak için algoritmalarımızı her gün geliştiriyoruz.</p>
          </div>
        </div>

        {/* Yasal Sorumluluk Şeridi */}
        <section style={{ 
          padding: '25px', 
          backgroundColor: 'rgba(59, 130, 246, 0.03)', 
          borderRadius: '20px', 
          border: '1px solid rgba(59, 130, 246, 0.1)',
          marginBottom: '50px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <ShieldAlert size={24} color="#3b82f6" style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '1rem' }}>Yasal Bilgilendirme</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.5' }}>
                Carvix, dijital bir analiz aracıdır. Sunulan sonuçlar yapay zeka tahminlerine dayanmaktadır ve <strong>resmi ekspertiz raporu (TSE onaylı) yerine geçmez.</strong> Kullanıcıların nihai kararlarını vermeden önce profesyonel bir servisten fiziksel kontrol almalarını tavsiye ederiz.
              </p>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #18181b' }}>
          <p style={{ color: '#52525b', fontSize: '0.85rem', marginBottom: '15px' }}>
            CARVIX — Yapay Zeka Tabanlı Araç Analiz Platformu
          </p>
          <a href="mailto:info@carvix.site" style={{ 
            color: '#fff', 
            textDecoration: 'none', 
            fontSize: '1.1rem', 
            fontWeight: '700',
            backgroundColor: '#111',
            padding: '12px 30px',
            borderRadius: '100px',
            border: '1px solid #222',
            display: 'inline-block'
          }}>
            info@carvix.site
          </a>
        </div>

      </div>
    </div>
  );
}