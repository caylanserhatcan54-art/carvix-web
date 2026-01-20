"use client";

import { Check, Zap, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "standard",
    name: "Standart Analiz",
    price: "89,90",
    description: "Hızlı bir ön kontrol isteyenler için ideal.",
    features: [
      "Yapay Zeka ile Panel Kontrolü",
      "Boya Tonu Farkı Tespiti",
      "Dijital PDF Raporu",
      "Anında Teslimat",
    ],
    buttonText: "Standart Analiz Başlat",
    popular: false,
    color: "#3b82f6",
  },
  {
    id: "detailed",
    name: "Detaylı Analiz",
    price: "129,90",
    description: "En kapsamlı tarama ve derinlik analizi.",
    features: [
      "Standart Analiz Dahil",
      "Mikron Düzeyi Derinlik Analizi",
      "Gelişmiş Kusur İşaretleme",
      "Yüksek Çözünürlüklü PDF Rapor",
      "Öncelikli Algoritma Sırası",
    ],
    buttonText: "Detaylı Analiz Başlat",
    popular: true,
    color: "#8b5cf6",
  },
];

export default function PricingCards() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '30px',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {plans.map((plan) => (
        <div 
          key={plan.id}
          style={{
            backgroundColor: '#0f0f0f',
            borderRadius: '32px',
            padding: '40px',
            border: plan.popular ? `2px solid ${plan.color}` : '1px solid #222',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {plan.popular && (
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: plan.color,
              color: '#fff',
              padding: '4px 16px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              EN ÇOK TERCİH EDİLEN
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>{plan.name}</h3>
            <p style={{ color: '#71717a', fontSize: '0.9rem' }}>{plan.description}</p>
          </div>

          <div style={{ marginBottom: '35px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ color: '#fff', fontSize: '3rem', fontWeight: '800' }}>₺{plan.price}</span>
            <span style={{ color: '#52525b', fontSize: '1rem' }}>/analiz</span>
          </div>

          <div style={{ flex: 1, marginBottom: '40px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
              {plan.features.map((feature, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#a1a1aa', fontSize: '0.95rem' }}>
                  <Check size={18} color={plan.color} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link 
            href={`/vehicle?p=${plan.id}`}
            style={{
              backgroundColor: plan.popular ? plan.color : '#fff',
              color: plan.popular ? '#fff' : '#000',
              textAlign: 'center',
              padding: '18px',
              borderRadius: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {plan.buttonText}
            <ArrowRight size={18} />
          </Link>
        </div>
      ))}
    </div>
  );
}