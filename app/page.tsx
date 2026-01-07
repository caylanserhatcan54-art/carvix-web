import Link from "next/link";
import { Badge } from "@/components/marketing/SiteShell";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="section">
        <div className="container heroGrid">
          <div className="glass" style={{ padding: 28 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Badge tone="muted" text="Boya / Lokal Boya" />
              <Badge tone="muted" text="Sök–Tak Şüphesi" />
              <Badge tone="muted" text="Hasar Ön Analizi" />
            </div>

            <div style={{ marginTop: 18 }}>
              <h1 className="h1">Aracı görmeden önce riskini ölç.</h1>
              <p className="p" style={{ marginTop: 14, fontSize: 16 }}>
                Carvix; panel ton/parlaklık/yansıma farklarını **karşılaştırır**, menteşe/vida gibi kritik bölgelerde
                **işlem izini sınıflandırır**, sonuçları **parça bazlı ekspertiz tablosu** olarak sunar.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <Link className="btn btnPrimary" href="/vehicle">
                Analizi Başlat →
              </Link>
              <Link className="btn btnGhost" href="/photo-guide">
                Doğru Fotoğraf Rehberi
              </Link>
            </div>

            <div className="kpiGrid">
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Parça bazlı</div>
                <div className="small">Hangi parçanın neden şüpheli olabileceğini açıklar.</div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Hızlı eleme</div>
                <div className="small">Yola çıkmadan önce riskli aracı filtrelemeye yardım eder.</div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Şeffaf çıktı</div>
                <div className="small">OK / SUSPECTED / DETECTED + güven skoru + kısa kanıtlar.</div>
              </div>
            </div>
          </div>

          {/* Right premium panel */}
          <div className="glass" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: "rgba(255,255,255,.86)" }}>Nasıl çalışır?</div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>1) Aracı seç</div>
              <div className="small">Otomobil, elektrikli, motosiklet, pickup/van, ATV.</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>2) Parça bazlı yükle</div>
              <div className="small">Kapı/çamurluk/kaput/bagaj + menteşe/vida/direk (önerilir).</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>3) Raporu gör</div>
              <div className="small">Ekspertiz tablosu + AI ön yorumu + hukuki bilgilendirme.</div>
            </div>

            <div className="divider" />

            <div className="small">
              <b>Not:</b> Carvix ekspertiz değildir; fotoğrafa dayalı ön değerlendirmedir. En iyi sonuç için “detay parça”
              fotoğrafları yükleyin.
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="h2">Neden Carvix?</h2>
          <p className="p" style={{ marginTop: 10 }}>
            “Fotoğrafa bakmak” ile “fotoğrafları ölçerek karşılaştırmak” aynı şey değil.
          </p>

          <div className="featureGrid">
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Karşılaştırmalı analiz</div>
              <p className="small">Komşu panellere göre ton/parlaklık/yansıma farklarını kıyaslar.</p>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Kritik bölgelerde güçlü</div>
              <p className="small">Menteşe/vida/direk gibi bölgeler sök–tak şüphesini yakalamaya yardımcı olur.</p>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Parça bazlı rapor</div>
              <p className="small">“Hangi parçada ne olabilir?” sorusuna net tablo ile cevap verir.</p>
            </div>
          </div>

          <div className="pricingGrid">
            <div className="glass" style={{ padding: 22 }}>
              <h3 style={{ margin: 0 }}>129,90₺ / Paket</h3>
              <p className="p" style={{ marginTop: 10 }}>
                Ekspertize gitmeden önce risk elemesi yap. Zaman/yol masrafını azaltmaya yardımcı olur.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <span className="pill">Parça bazlı tablo</span>
                <span className="pill">AI ön yorum</span>
                <span className="pill">Hukuki bilgilendirme</span>
              </div>
              <div style={{ marginTop: 18 }}>
                <Link className="btn btnPrimary" href="/vehicle">
                  Analizi Başlat →
                </Link>
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <h3 style={{ margin: 0 }}>“Fotoğrafa ben de bakarım.”</h3>
              <p className="p" style={{ marginTop: 10 }}>
                Carvix senin göremediğini değil, <b>emin olamadığını ölçer</b>. Aynı anda panelleri kıyaslar, kritik
                bölgeleri sınıflandırır ve bunu sayısal güven skoruyla raporlar.
              </p>
              <div style={{ marginTop: 14 }}>
                <Link className="btn" href="/photo-guide">
                  Fotoğraf Rehberini Gör
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
