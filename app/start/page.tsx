"use client";
import { useState } from "react";

const vehicles = [
  { id: "car", title: "Otomobil", desc: "Binek araçlar için analiz" },
  { id: "moto", title: "Motosiklet", desc: "Kaporta ve dış aksam" },
  { id: "pickup", title: "Pickup", desc: "Çift kabin / kasa dahil" },
  { id: "van", title: "Van / Kamyonet", desc: "Ticari araçlar" },
  { id: "atv", title: "ATV", desc: "Arazi araçları" },
];

export default function StartPage() {
  const [selected, setSelected] = useState("car");

  return (
    <section className="section">
      <div className="container card" style={{ padding: 60 }}>
        <h2>Analiz Edilecek Aracı Seçin</h2>
        <p>Fotoğraf bazlı analiz, seçilen araç tipine göre optimize edilir.</p>

        <div className="vehicle-grid">
          {vehicles.map(v => (
            <div
              key={v.id}
              className={`vehicle-card ${selected === v.id ? "active" : ""}`}
              onClick={() => setSelected(v.id)}
            >
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href={`/upload/${selected}`} className="btn btn-primary">
            Devam Et →
          </a>
        </div>

        <p className="disclaimer">
          Fotoğraf bazlı analiz yapay zekâ destekli bir ön kontroldür.  
          Ekspertiz yerine geçmez.
        </p>
      </div>
    </section>
  );
}
