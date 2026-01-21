import * as React from 'react';

export const WelcomeEmail = ({ firstName }: { firstName: string }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1>Hoş geldin, {firstName}! 🚗</h1>
    <p>Carvix ailesine katıldığın için mutluyuz. Artık profesyonel araç analizlerini panelinden yönetebilirsin.</p>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
    <p style={{ fontSize: '12px', color: '#666' }}>Carvix Profesyonel Araç Analiz Sistemleri</p>
  </div>
);