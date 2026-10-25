export const QRIS_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1792161327/camhvfeu1lcm0ps8ieiz.jpg";

export const ADMIN_WHATSAPP = "085711172317";
export const ADMIN_WHATSAPP_URL = "https://wa.me/6285711172317";

export type Slug =
  | "pulsa"
  | "paket-data"
  | "e-wallet"
  | "pln"
  | "pdam"
  | "tv-internet"
  | "game"
  | "bpjs"
  | "multifinance";

export type Category = "Isi ulang" | "Tagihan rumah" | "Lainnya";

export type PriceItem = [string, number];

export type Service = {
  slug: Slug;
  title: string;
  category: Category;
  description: string;
  inputLabel: string;
  placeholder: string;
  auto?: boolean;
  bill?: boolean;
  providers: string[];
  items?: PriceItem[];
  byProvider?: Record<string, PriceItem[]>;
};

const rb = (value: number) => value.toLocaleString("id-ID");

const topUp = (pairs: [number, number][]): PriceItem[] =>
  pairs.map(([label, price]) => [rb(label), price]);

export const services: Record<Slug, Service> = {
  pulsa: {
    slug: "pulsa",
    title: "Pulsa",
    category: "Isi ulang",
    description: "Isi pulsa semua operator, masuk dalam hitungan detik.",
    inputLabel: "Nomor HP",
    placeholder: "08xx xxxx xxxx",
    auto: true,
    providers: ["Telkomsel", "Indosat", "XL", "Axis", "Tri (3)", "Smartfren"],
    byProvider: {
      Telkomsel: topUp([
        [5000, 6200],
        [10000, 11000],
        [20000, 20900],
        [25000, 25800],
        [50000, 50800],
        [100000, 100200],
      ]),
      Indosat: topUp([
        [5000, 6900],
        [10000, 12000],
        [20000, 21200],
        [25000, 26000],
        [50000, 51200],
        [100000, 100500],
      ]),
      XL: topUp([
        [5000, 6800],
        [10000, 11800],
        [25000, 26200],
        [50000, 51400],
        [100000, 101200],
      ]),
      Axis: topUp([
        [5000, 6800],
        [10000, 11500],
        [25000, 26000],
        [50000, 51200],
        [100000, 101000],
      ]),
      "Tri (3)": topUp([
        [5000, 6500],
        [10000, 12300],
        [20000, 21300],
        [25000, 26300],
        [50000, 51000],
        [100000, 100800],
      ]),
      Smartfren: topUp([
        [5000, 6000],
        [10000, 11000],
        [20000, 21200],
        [25000, 26000],
        [50000, 51500],
        [100000, 100900],
      ]),
    },
  },
  "paket-data": {
    slug: "paket-data",
    title: "Paket Data",
    category: "Isi ulang",
    description: "Kuota harian, mingguan, sampai bulanan.",
    inputLabel: "Nomor HP",
    placeholder: "08xx xxxx xxxx",
    auto: true,
    providers: ["Telkomsel", "Indosat", "XL", "Axis", "Tri (3)", "Smartfren"],
    items: [
      ["Harian 1GB · 1 hari", 5500],
      ["Mingguan 5GB · 7 hari", 22000],
      ["Bulanan 15GB · 30 hari", 65000],
      ["Bulanan 30GB · 30 hari", 98000],
      ["Unlimited Apps · 30 hari", 85000],
    ],
  },
  "e-wallet": {
    slug: "e-wallet",
    title: "E-Wallet",
    category: "Isi ulang",
    description: "Top up saldo DANA, OVO, GoPay, ShopeePay.",
    inputLabel: "Nomor terdaftar",
    placeholder: "08xx xxxx xxxx",
    providers: ["DANA", "OVO", "GoPay", "ShopeePay", "LinkAja"],
    items: topUp([
      [20000, 21500],
      [50000, 51500],
      [100000, 101500],
      [200000, 201500],
      [500000, 501500],
    ]),
  },
  pln: {
    slug: "pln",
    title: "Token & Tagihan PLN",
    category: "Tagihan rumah",
    description: "Token prabayar atau tagihan pascabayar.",
    inputLabel: "Nomor meter / ID pelanggan",
    placeholder: "11 atau 12 digit",
    providers: ["PLN Prabayar", "PLN Pascabayar"],
    items: [
      ["Token 20.000", 22500],
      ["Token 50.000", 52500],
      ["Token 100.000", 102500],
      ["Token 200.000", 202500],
      ["Token 500.000", 502500],
    ],
  },
  pdam: {
    slug: "pdam",
    title: "PDAM",
    category: "Tagihan rumah",
    description: "Bayar tagihan air dari rumah.",
    inputLabel: "ID pelanggan PDAM",
    placeholder: "Nomor pelanggan",
    bill: true,
    providers: ["PDAM Jakarta", "PDAM Bandung", "PDAM Surabaya", "PDAM lainnya"],
  },
  "tv-internet": {
    slug: "tv-internet",
    title: "TV & Internet",
    category: "Tagihan rumah",
    description: "Internet rumah dan TV berlangganan.",
    inputLabel: "ID pelanggan",
    placeholder: "Nomor pelanggan",
    bill: true,
    providers: ["IndiHome", "Biznet", "First Media", "MyRepublic", "Transvision"],
  },
  game: {
    slug: "game",
    title: "Top Up Game",
    category: "Lainnya",
    description: "Diamond dan voucher game favoritmu.",
    inputLabel: "User ID (Zone ID)",
    placeholder: "12345678 (1234)",
    providers: ["Mobile Legends", "Free Fire", "PUBG Mobile"],
    byProvider: {
      "Mobile Legends": [
        ["86 Diamonds", 24500],
        ["172 Diamonds", 48500],
        ["257 Diamonds", 72000],
        ["344 Diamonds", 97000],
        ["706 Diamonds", 198000],
        ["Weekly Diamond Pass", 34900],
      ],
      "Free Fire": [
        ["70 Diamonds", 10900],
        ["140 Diamonds", 21500],
        ["355 Diamonds", 51000],
        ["720 Diamonds", 101000],
        ["1450 Diamonds", 196000],
      ],
      "PUBG Mobile": [
        ["60 UC", 17500],
        ["325 UC", 80500],
        ["660 UC", 167000],
      ],
    },
  },
  bpjs: {
    slug: "bpjs",
    title: "BPJS Kesehatan",
    category: "Lainnya",
    description: "Iuran 1 sampai 3 bulan sekaligus.",
    inputLabel: "Nomor VA / No. kartu BPJS",
    placeholder: "88888xxxxxxxxxx",
    bill: true,
    providers: ["BPJS 1 bulan", "BPJS 2 bulan", "BPJS 3 bulan"],
  },
  multifinance: {
    slug: "multifinance",
    title: "Multifinance",
    category: "Lainnya",
    description: "Angsuran motor dan elektronik.",
    inputLabel: "Nomor kontrak",
    placeholder: "Nomor kontrak",
    bill: true,
    providers: ["Adira", "FIF", "BAF", "WOM Finance", "Home Credit"],
  },
};

export const serviceSlugs: Slug[] = [
  "pulsa",
  "paket-data",
  "e-wallet",
  "pln",
  "pdam",
  "tv-internet",
  "game",
  "bpjs",
  "multifinance",
];

export const categories: Category[] = ["Isi ulang", "Tagihan rumah", "Lainnya"];

export const quickServices: { slug: Slug; label: string }[] = [
  { slug: "pulsa", label: "Pulsa" },
  { slug: "paket-data", label: "Data" },
  { slug: "pln", label: "PLN" },
  { slug: "game", label: "Game" },
  { slug: "e-wallet", label: "E-Wallet" },
  { slug: "pdam", label: "Tagihan" },
];

export const operatorPrefixes: Record<string, string[]> = {
  Telkomsel: ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"],
  Indosat: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
  XL: ["0817", "0818", "0819", "0859", "0877", "0878"],
  Axis: ["0831", "0832", "0833", "0838"],
  "Tri (3)": ["0895", "0896", "0897", "0898", "0899"],
  Smartfren: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"],
};

const providerLogoClasses: Record<string, string> = {
  Telkomsel: "L-Telkomsel",
  Indosat: "L-Indosat",
  XL: "L-XL",
  Axis: "L-Axis",
  Smartfren: "L-Smartfren",
  DANA: "L-DANA",
  OVO: "L-OVO",
  GoPay: "L-GoPay",
  ShopeePay: "L-ShopeePay",
  LinkAja: "L-LinkAja",
  "PLN Prabayar": "L-PLN",
  "PLN Pascabayar": "L-PLN",
  Biznet: "L-Biznet",
  "First Media": "L-FirstMedia",
  Transvision: "L-Transvision",
  "Mobile Legends": "L-MobileLegends",
  Adira: "L-Adira",
  FIF: "L-FIF",
  "BCA Virtual Account": "L-BCA",
  "BRI Virtual Account": "L-BRI",
  "Mandiri Virtual Account": "L-Mandiri",
  QRIS: "L-QRIS",
  BPJS: "L-BPJS",
};

export function isSlug(value: string | null | undefined): value is Slug {
  return !!value && value in services;
}

export function formatRupiah(value: number): string {
  return `Rp${Math.round(value).toLocaleString("id-ID")}`;
}

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("62") ? `0${digits.slice(2)}` : digits;
}

export function detectOperator(raw: string): string | null {
  const number = normalizePhone(raw);
  const prefix = number.slice(0, 4);
  if (prefix.length < 4) return null;
  return Object.keys(operatorPrefixes).find((operator) =>
    operatorPrefixes[operator].includes(prefix),
  ) ?? null;
}

export function priceList(service: Service, provider: string | null): PriceItem[] {
  if (!provider) return service.items ?? [];
  return service.byProvider?.[provider] ?? service.items ?? [];
}

export function simulateBill(seed: string): number {
  const total = [...seed].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return 75000 + ((total * 137) % 250000);
}

export function providerLogoClass(name: string): string | null {
  if (providerLogoClasses[name]) return providerLogoClasses[name];
  const match = Object.keys(providerLogoClasses).find((key) => name.startsWith(key));
  return match ? providerLogoClasses[match] : null;
}
