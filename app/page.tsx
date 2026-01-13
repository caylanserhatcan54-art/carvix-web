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
                Carvix; panel ton/parlaklık/yansıma farklarını <b>karşılaştırır</b>, menteşe/vida gibi kritik
                bölgelerde <b>işlem izini sınıflandırır</b>, sonuçları <b>parça bazlı ekspertiz tablosu</b>{" "}
                olarak sunar.
              </p>
            </div>

            {/* 🔴 BUTONLAR */}
            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              {/* Ana satın alma butonu */}
              <Link className="btn btnPrimary" href="/arac-analizi">
                Paketi Satın Al →
              </Link>

              {/* Bilgilendirici */}
              <Link className="btn btnGhost" href="/photo-guide">
                Doğru Fotoğraf Rehberi
              </Link>

              {/* Alternatif satın alma CTA */}
              <Link className="btn btnPrimary" href="/arac-analizi">
                AI Araç Analizi Paketi →
              </Link>
            </div>

            <div className="kpiGrid">
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Parça bazlı</div>
                <div className="small">
                  Hangi parçanın neden şüpheli olabileceğini açıklar.
                </div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Hızlı eleme</div>
                <div className="small">
                  Yola çıkmadan önce riskli aracı filtrelemeye yardım eder.
                </div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Şeffaf çıktı</div>
                <div className="small">
                  OK / SUSPECTED / DETECTED + güven skoru + kısa kanıtlar.
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="glass" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: "rgba(255,255,255,.86)" }}>
              Satın alma sonrası süreç
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>1) Paketi satın al</div>
              <div className="small">Ödeme güvenli şekilde iyzico üzerinden yapılır.</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>2) Fotoğraf & video yükle</div>
              <div className="small">Parça bazlı yükleme önerilir.</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 900 }}>3) Dijital raporu al</div>
              <div className="small">
                AI ön yorumu + parça bazlı tablo + hukuki bilgilendirme.
              </div>
            </div>

            <div className="divider" />

            <div className="small">
              <b>Not:</b> Carvix ekspertiz değildir; fotoğrafa dayalı ön değerlendirmedir.
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="h2">Neden Carvix?</h2>

          <div className="pricingGrid">
            <div className="glass" style={{ padding: 22 }}>
              <h3 style={{ margin: 0 }}>AI Araç Ön Analiz Paketi</h3>
              <p className="p" style={{ marginTop: 10 }}>
                Dijital hizmettir. Satın alma sonrası anında kullanılabilir.
              </p>

              <h3 style={{ marginTop: 12 }}>129,90₺</h3>

              <div style={{ marginTop: 18 }}>
                <Link className="btn btnPrimary" href="/arac-analizi">
                  Hemen Satın Al →
                </Link>
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <h3 style={{ margin: 0 }}>Güvenli ödeme</h3>
              <p className="p" style={{ marginTop: 10 }}>
                Ödeme işlemleri iyzico altyapısı ile korunur. Kart bilgileriniz
                sistemimizde tutulmaz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
