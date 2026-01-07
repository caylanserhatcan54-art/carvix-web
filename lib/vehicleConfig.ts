// web/lib/vehicleConfig.ts
export type VehicleType =
  | "car"
  | "electric_car"
  | "pickup"
  | "van_kamyonet"
  | "motorcycle"
  | "atv";

export type PackageType = "quick" | "detailed";

export type PartKey =
  // Genel
  | "GENEL_ON"
  | "GENEL_ARKA"
  | "GENEL_SAG"
  | "GENEL_SOL"
  | "GENEL_TAVAN"
  // Car/Pickup/Van paneller
  | "SOL_ON_KAPI"
  | "SOL_ARKA_KAPI"
  | "SAG_ON_KAPI"
  | "SAG_ARKA_KAPI"
  | "KAPUT"
  | "BAGAJ"
  | "SOL_ON_CAMURLUK"
  | "SOL_ARKA_CAMURLUK"
  | "SAG_ON_CAMURLUK"
  | "SAG_ARKA_CAMURLUK"
  // Sök-tak kritik
  | "KAPI_MENTESE"
  | "KAPI_VIDALARI"
  | "KAPI_DIREKLERI"
  | "KAPUT_MENTESE"
  | "KAPUT_VIDALARI"
  | "BAGAJ_MENTESE"
  | "BAGAJ_VIDALARI"
  // Moto/ATV
  | "SASE_KADRO"
  | "ALT_TAKIM"
  | "ON_SUSPANSIYON"
  | "ARKA_SUSPANSIYON"
  | "EGZOZ_BAGLANTI"
  | "SELE_ALTI"
  | "GRENAJ_VIDALARI"
  | "JANT_LASTIK";

export type PartMeta = {
  key: PartKey;
  label: string;
  group:
    | "genel"
    | "panel"
    | "tamper"
    | "moto_body"
    | "moto_frame"
    | "atv_frame"
    | "atv_suspension";
  recommended?: boolean;
};

export type VehicleConfig = {
  vehicleType: VehicleType;
  title: string;
  parts: PartMeta[];
  required: Record<PackageType, PartKey[]>;
  optional: Record<PackageType, PartKey[]>;
  supportsAudio: boolean;
};

const COMMON_GENERAL: PartMeta[] = [
  { key: "GENEL_ON", label: "Genel - Ön", group: "genel", recommended: true },
  { key: "GENEL_ARKA", label: "Genel - Arka", group: "genel", recommended: true },
  { key: "GENEL_SAG", label: "Genel - Sağ", group: "genel", recommended: true },
  { key: "GENEL_SOL", label: "Genel - Sol", group: "genel", recommended: true },
  { key: "GENEL_TAVAN", label: "Genel - Tavan", group: "genel" },
];

const CAR_PANEL: PartMeta[] = [
  { key: "SOL_ON_KAPI", label: "Sol Ön Kapı", group: "panel", recommended: true },
  { key: "SOL_ARKA_KAPI", label: "Sol Arka Kapı", group: "panel", recommended: true },
  { key: "SAG_ON_KAPI", label: "Sağ Ön Kapı", group: "panel", recommended: true },
  { key: "SAG_ARKA_KAPI", label: "Sağ Arka Kapı", group: "panel", recommended: true },
  { key: "KAPUT", label: "Kaput", group: "panel" },
  { key: "BAGAJ", label: "Bagaj", group: "panel" },
  { key: "SOL_ON_CAMURLUK", label: "Sol Ön Çamurluk", group: "panel" },
  { key: "SOL_ARKA_CAMURLUK", label: "Sol Arka Çamurluk", group: "panel" },
  { key: "SAG_ON_CAMURLUK", label: "Sağ Ön Çamurluk", group: "panel" },
  { key: "SAG_ARKA_CAMURLUK", label: "Sağ Arka Çamurluk", group: "panel" },
];

const CAR_TAMPER: PartMeta[] = [
  { key: "KAPI_MENTESE", label: "Kapı Menteşesi (yakın)", group: "tamper", recommended: true },
  { key: "KAPI_VIDALARI", label: "Kapı Vidaları (yakın)", group: "tamper" },
  { key: "KAPI_DIREKLERI", label: "Kapı Direkleri (yakın)", group: "tamper" },
  { key: "KAPUT_MENTESE", label: "Kaput Menteşesi (yakın)", group: "tamper" },
  { key: "KAPUT_VIDALARI", label: "Kaput Vidaları (yakın)", group: "tamper", recommended: true },
  { key: "BAGAJ_MENTESE", label: "Bagaj Menteşesi (yakın)", group: "tamper" },
  { key: "BAGAJ_VIDALARI", label: "Bagaj Vidaları (yakın)", group: "tamper" },
];

const MOTO_PARTS: PartMeta[] = [
  ...COMMON_GENERAL.filter(p => p.key !== "GENEL_TAVAN"),
  { key: "SASE_KADRO", label: "Şase / Kadro (yakın)", group: "moto_frame", recommended: true },
  { key: "EGZOZ_BAGLANTI", label: "Egzoz Bağlantı Noktaları", group: "moto_frame", recommended: true },
  { key: "SELE_ALTI", label: "Sele Altı / Bağlantılar", group: "moto_body", recommended: true },
  { key: "GRENAJ_VIDALARI", label: "Grenaj Vidaları", group: "moto_body" },
  { key: "JANT_LASTIK", label: "Jant / Lastik", group: "moto_body" },
];

const ATV_PARTS: PartMeta[] = [
  ...COMMON_GENERAL.filter(p => p.key !== "GENEL_TAVAN"),
  { key: "SASE_KADRO", label: "Şase / Kadro (yakın)", group: "atv_frame", recommended: true },
  { key: "ALT_TAKIM", label: "Alt Takım (yakın)", group: "atv_frame", recommended: true },
  { key: "ON_SUSPANSIYON", label: "Ön Süspansiyon / Rot", group: "atv_suspension", recommended: true },
  { key: "ARKA_SUSPANSIYON", label: "Arka Süspansiyon", group: "atv_suspension" },
  { key: "GRENAJ_VIDALARI", label: "Grenaj Vidaları", group: "atv_frame" },
  { key: "JANT_LASTIK", label: "Jant / Lastik", group: "atv_frame" },
];

export const VEHICLE_CONFIG: Record<VehicleType, VehicleConfig> = {
  car: {
    vehicleType: "car",
    title: "Otomobil",
    parts: [...COMMON_GENERAL, ...CAR_PANEL, ...CAR_TAMPER],
    required: {
      quick: ["GENEL_ON", "GENEL_ARKA", "GENEL_SAG", "GENEL_SOL"],
      detailed: [
        "GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL",
        "SOL_ON_KAPI","SOL_ARKA_KAPI","SAG_ON_KAPI","SAG_ARKA_KAPI",
        "KAPUT_VIDALARI","KAPI_MENTESE"
      ],
    },
    optional: {
      quick: ["GENEL_TAVAN"],
      detailed: ["KAPUT","BAGAJ","KAPI_VIDALARI","KAPI_DIREKLERI","BAGAJ_VIDALARI","GENEL_TAVAN"],
    },
    supportsAudio: true,
  },

  electric_car: {
    vehicleType: "electric_car",
    title: "Elektrikli Otomobil",
    parts: [...COMMON_GENERAL, ...CAR_PANEL, ...CAR_TAMPER],
    required: {
      quick: ["GENEL_ON", "GENEL_ARKA", "GENEL_SAG", "GENEL_SOL"],
      detailed: [
        "GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL",
        "SOL_ON_KAPI","SOL_ARKA_KAPI","SAG_ON_KAPI","SAG_ARKA_KAPI",
        "KAPUT_VIDALARI","KAPI_MENTESE"
      ],
    },
    optional: {
      quick: ["GENEL_TAVAN"],
      detailed: ["KAPUT","BAGAJ","KAPI_VIDALARI","KAPI_DIREKLERI","BAGAJ_VIDALARI","GENEL_TAVAN"],
    },
    supportsAudio: false, // EV'de motor sesi analizi zayıf -> opsiyonel yapıyoruz
  },

  pickup: {
    vehicleType: "pickup",
    title: "Pickup",
    parts: [...COMMON_GENERAL, ...CAR_PANEL, ...CAR_TAMPER],
    required: {
      quick: ["GENEL_ON", "GENEL_ARKA", "GENEL_SAG", "GENEL_SOL"],
      detailed: [
        "GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL",
        "SOL_ON_KAPI","SOL_ARKA_KAPI","SAG_ON_KAPI","SAG_ARKA_KAPI",
        "KAPUT_VIDALARI","KAPI_MENTESE"
      ],
    },
    optional: {
      quick: ["GENEL_TAVAN"],
      detailed: ["KAPUT","BAGAJ","KAPI_VIDALARI","KAPI_DIREKLERI","BAGAJ_VIDALARI","GENEL_TAVAN"],
    },
    supportsAudio: true,
  },

  van_kamyonet: {
    vehicleType: "van_kamyonet",
    title: "Van / Kamyonet",
    parts: [...COMMON_GENERAL, ...CAR_PANEL, ...CAR_TAMPER],
    required: {
      quick: ["GENEL_ON", "GENEL_ARKA", "GENEL_SAG", "GENEL_SOL"],
      detailed: [
        "GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL",
        "SOL_ON_KAPI","SOL_ARKA_KAPI","SAG_ON_KAPI","SAG_ARKA_KAPI",
        "KAPUT_VIDALARI","KAPI_MENTESE"
      ],
    },
    optional: {
      quick: ["GENEL_TAVAN"],
      detailed: ["KAPUT","BAGAJ","KAPI_VIDALARI","KAPI_DIREKLERI","BAGAJ_VIDALARI","GENEL_TAVAN"],
    },
    supportsAudio: true,
  },

  motorcycle: {
    vehicleType: "motorcycle",
    title: "Motosiklet",
    parts: MOTO_PARTS,
    required: {
      quick: ["GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL"],
      detailed: ["GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL","SASE_KADRO","EGZOZ_BAGLANTI","SELE_ALTI"],
    },
    optional: {
      quick: ["JANT_LASTIK"],
      detailed: ["GRENAJ_VIDALARI","JANT_LASTIK"],
    },
    supportsAudio: true,
  },

  atv: {
    vehicleType: "atv",
    title: "ATV",
    parts: ATV_PARTS,
    required: {
      quick: ["GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL"],
      detailed: ["GENEL_ON","GENEL_ARKA","GENEL_SAG","GENEL_SOL","SASE_KADRO","ALT_TAKIM","ON_SUSPANSIYON"],
    },
    optional: {
      quick: ["JANT_LASTIK"],
      detailed: ["ARKA_SUSPANSIYON","GRENAJ_VIDALARI","JANT_LASTIK"],
    },
    supportsAudio: true,
  },
};
