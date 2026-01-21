"use client";

import { useState } from "react";
import { 
  Users, Car, CreditCard, Activity, 
  Search, Filter, ExternalLink, CheckCircle2, Clock 
} from "lucide-react";

export default function AdminDashboard() {
  // Örnek admin verileri
  const [orders] = useState([
    { id: "CRV-8821", user: "Mehmet Can", car: "Audi A4", status: "Beklemede", date: "21.01.2026", amount: "₺129,90" },
    { id: "CRV-7742", user: "Ayşe Tekin", car: "Fiat Egea", status: "Tamamlandı", date: "20.01.2026", amount: "₺89,90" },
    { id: "CRV-6531", user: "Ali Yıldız", car: "Tesla Model 3", status: "Tamamlandı", date: "19.01.2026", amount: "₺129,90" },
  ]);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Admin Başlık */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900' }}>Admin Kontrol Paneli</h1>
          <p style={{ color: '#71717a' }}>Sistemdeki tüm işlemleri ve analizleri buradan yönetin.</p>
        </div>

        {/* İstatistik Kartları */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <StatCard icon={<Users color="#3b82f6" />} label="Toplam Kullanıcı" value="1,248" />
          <StatCard icon={<Car color="#4ade80" />} label="Aktif Analizler" value="12" />
          <StatCard icon={<CreditCard color="#f59e0b" />} label="Bugünkü Ciro" value="₺4,850" />
          <StatCard icon={<Activity color="#ef4444" />} label="Sistem Durumu" value="Aktif" />
        </div>

        {/* Sipariş Listesi */}
        <div style={{ backgroundColor: '#0c0c0c', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', padding: '25px' }}>
          <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Son İşlemler</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>MÜŞTERİ</th>
                  <th style={thStyle}>ARAÇ</th>
                  <th style={thStyle}>TARİH</th>
                  <th style={thStyle}>TUTAR</th>
                  <th style={thStyle}>DURUM</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={tdStyle}>{order.id}</td>
                    <td style={tdStyle}>{order.user}</td>
                    <td style={tdStyle}>{order.car}</td>
                    <td style={tdStyle}>{order.date}</td>
                    <td style={{ ...tdStyle, color: '#fff', fontWeight: '700' }}>{order.amount}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                        backgroundColor: order.status === "Tamamlandı" ? 'rgba(74, 222, 128, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: order.status === "Tamamlandı" ? '#4ade80' : '#f59e0b'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Yardımcı Bileşenler ve Stiller
function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div style={{ backgroundColor: '#0c0c0c', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ marginBottom: '15px' }}>{icon}</div>
      <div style={{ color: '#71717a', fontSize: '13px', marginBottom: '5px' }}>{label}</div>
      <div style={{ color: '#fff', fontSize: '24px', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

const thStyle = { padding: '15px', color: '#52525b', fontSize: '12px', fontWeight: '700' };
const tdStyle = { padding: '15px', color: '#a1a1aa', fontSize: '14px' };