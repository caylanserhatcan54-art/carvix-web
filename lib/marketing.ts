// web/lib/marketing.ts
export const BRAND = {
  name: "Carvix",
  tagline: "Aracı Görmeden Önce Riskini Gör.",
  subtagline:
    "Yapay zekâ destekli görsel analiz ile boya, sök–tak ve hasar şüphesini ekspertize gitmeden önce öğren.",
  disclaimerShort:
    "Bu rapor yapay zekâ destekli ön değerlendirmedir; resmî ekspertiz yerine geçmez.",
};

// GARANTİ BANKASI VE PAKET AYRIMI İÇİN GÜNCELLENEN KISIM
export const PRICING_PLANS = [
  {
    id: "standard",
    planName: "Standart İnceleme",
    amount: 89.9, // İstediğin fiyatla değiştirebilirsin
    description: "Aracın genel dış kondisyonu ve boya analizi.",
    note: "Dış aksam odaklı • 24 saat rapor erişimi",
    bullets: [
      "Genel dış panel analizi (Ön, Arka, Yanlar)",
      "Tavan ve bagaj yüzey kontrolü",
      "Boya / lokal boya şüphesi tespiti",
      "Görünür çizik ve göçük sınıflandırması",
      "Güven skoru ve hızlı özet rapor",
    ],
  },
  {
    id: "detailed",
    planName: "Detaylı İnceleme",
    amount: 149.9, // İstediğin fiyatla değiştirebilirsin
    description: "Parça bazlı derinlemesine risk ve sök-tak analizi.",
    note: "Profesyonel detay odaklı • 48 saat rapor erişimi",
    bullets: [
      "Standart paketteki tüm özellikler",
      "Vida ve menteşelerde sök–tak şüphesi",
      "Direkler ve şase birleşim noktaları",
      "Kapı içleri ve motor içi bağlantı elemanları",
      "Detaylı parça bazlı kanıt görselleri",
    ],
  },
];

// Geriye dönük uyumluluk için eski PRICING objesini de tutalım (Hata vermemesi için)
export const PRICING = {
  currency: "₺",
  ...PRICING_PLANS[0] 
};

export const VALUE_POINTS = [
  {
    title: "Gözle bakarsın, Carvix karşılaştırır",
    desc: "İnsan tek tek bakar. Carvix panelleri aynı anda ölçer ve kıyaslar.",
  },
  {
    title: "Şüpheyi ölçüye dönüştürür",
    desc: "“Burası bana farklı geldi” yerine sayısal güven skoru ve kanıt başlıkları.",
  },
  {
    title: "Detayda güçlüdür",
    desc: "Vida/menteşe/direk gibi kritik bölgelerle sök–tak şüphesini yakalar.",
  },
  {
    title: "Yola çıkmadan önce filtreler",
    desc: "Riskli araçları erkenden eleyerek zaman ve yol masrafını azaltır.",
  },
];

export const FAQS = [
  {
    q: "Hangi paketi seçmeliyim?",
    a: "Eğer sadece aracın dışındaki boya ve kaporta durumunu merak ediyorsanız Standart Paket yeterlidir. Ancak aracın parçalarının sökülüp takıldığından veya direklerde işlem olduğundan şüpheleniyorsanız Detaylı Paket'i öneririz.",
  },
  {
    q: "Bu ekspertiz mi?",
    a: "Hayır. Carvix, fotoğraflara dayalı yapay zekâ destekli ön analizdir. Ekspertiz yerine geçmez; ekspertize gitmeden önce risk elemesi yapar.",
  },
  {
    q: "Neden para vereyim, fotoğrafa ben de bakarım?",
    a: "Fotoğrafa bakmak başka, panelleri karşılaştırarak ölçmek başka. Carvix; ton/parlaklık/yansıma/doku farklarını kıyaslar, vida/menteşe izlerini sınıflandırır ve raporu standart formatta sunar.",
  },
];

export const PHOTO_GUIDE = {
  intro:
    "Daha isabetli rapor için parça bazlı ve net fotoğraflar yükleyin. En güçlü senaryo: panel + menteşe/vida + (varsa) hasar yakın planı.",
  rules: [
    "Gündüz/aydınlık ortam, flaş mümkünse kapalı",
    "Yansıma çoksa farklı açıdan 1 foto daha",
    "Aynı parçayı 50–80 cm mesafeden, düz kadraj",
    "Bulanık / hareketli fotoğraf yüklemeyin",
    "Menteşe/vida çekiminde net odak şart",
  ],
  packs: [
    {
      title: "Standart (Hızlı Eleme)",
      bullets: [
        "4 ana panel: (Ön, Arka, Sağ Yan, Sol Yan)",
        "Tavan ve Bagaj kapağı",
      ],
      note: "Sadece dış yüzey analizi yapılır.",
    },
    {
      title: "Detaylı (Tam Analiz)",
      bullets: [
        "Tüm dış paneller",
        "Kritik detaylar: Kapı menteşeleri, Kaput vidaları",
        "İç direkler ve şase uçları",
      ],
      note: "Sök–tak şüphesi en iyi menteşe/vida/direk ile yakalanır.",
    },
  ],
};