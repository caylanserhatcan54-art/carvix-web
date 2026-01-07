// web/lib/marketing.ts
export const BRAND = {
  name: "Carvix",
  tagline: "Aracı Görmeden Önce Riskini Gör.",
  subtagline:
    "Yapay zekâ destekli görsel analiz ile boya, sök–tak ve hasar şüphesini ekspertize gitmeden önce öğren.",
  disclaimerShort:
    "Bu rapor yapay zekâ destekli ön değerlendirmedir; resmî ekspertiz yerine geçmez.",
};

export const PRICING = {
  currency: "₺",
  amount: 129.9,
  planName: "Tek Analiz",
  planNote: "Misafir kullanım • 24 saat rapor erişimi • Sınırsız parça fotoğrafı",
  bullets: [
    "Parça bazlı rapor: Kapı/çamurluk/kaput/bagaj",
    "Boya / lokal boya şüphesi (karşılaştırmalı)",
    "Vida/menteşe/direklerde sök–tak şüphesi",
    "Hasar sınıflandırma (düşük/orta/yüksek)",
    "Hukuki bilgilendirme + güven skoru",
  ],
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
    q: "Bu ekspertiz mi?",
    a: "Hayır. Carvix, fotoğraflara dayalı yapay zekâ destekli ön analizdir. Ekspertiz yerine geçmez; ekspertize gitmeden önce risk elemesi yapar.",
  },
  {
    q: "Neden para vereyim, fotoğrafa ben de bakarım?",
    a: "Fotoğrafa bakmak başka, panelleri karşılaştırarak ölçmek başka. Carvix; ton/parlaklık/yansıma/doku farklarını kıyaslar, vida/menteşe izlerini sınıflandırır ve raporu standart formatta sunar.",
  },
  {
    q: "Hangi durumda daha doğru sonuç verir?",
    a: "En iyi sonuç: panel fotoğrafları (kapı/çamurluk/kaput/bagaj) + menteşe/vida/direk detayları. Sadece genel fotoğraflar boya/lokal boya için zayıftır.",
  },
  {
    q: "Doğruluk oranı nedir?",
    a: "Fotoğraf kalitesi ve parça kapsamına bağlı. Genel hasar tespiti genelde daha yüksek; boya/lokal boya ve sök–tak şüphesi için detay fotoğraf gereklidir. Rapor “OK / SUSPECTED / DETECTED” ve güven skoru ile gelir.",
  },
  {
    q: "Fotoğraflarım başkasıyla karışır mı?",
    a: "Hayır. Her analiz ayrı bir kimlik ile işlenir; rapor ve dosyalar birbirinden izole edilir.",
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
      title: "Minimum (Hızlı Eleme)",
      bullets: [
        "2 panel: (ör. SOL_ON_KAPI, SAG_ON_KAPI)",
        "1 kritik detay: (KAPI_MENTESE veya KAPUT_VIDALARI)",
        "Varsa 1 hasar yakın planı",
      ],
      note: "Boya karşılaştırması için en az 2 panel önerilir.",
    },
    {
      title: "Önerilen (En İyi Sonuç)",
      bullets: [
        "4 panel: 2 kapı + 2 çamurluk (mümkünse)",
        "Kaput/bagaj paneli (opsiyonel)",
        "2 kritik detay: menteşe + vida",
        "Hasar varsa: çizik/göçük yakın plan",
      ],
      note: "Sök–tak şüphesi en iyi menteşe/vida/direk ile yakalanır.",
    },
  ],
};
