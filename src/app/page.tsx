import Link from "next/link";
import { CatalogGrid } from "@/components/CatalogGrid";
import { QuickOrder } from "@/components/QuickOrder";
import { WordRotator } from "@/components/WordRotator";

const faqs = [
  {
    question: "Harus bikin akun nggak?",
    answer: "Nggak usah. Cukup isi nomor tujuan, pilih nominal, bayar. Selesai.",
  },
  {
    question: "Metode bayar apa saja?",
    answer: "QRIS — bisa dari semua e-wallet dan m-banking.",
  },
  {
    question: "Pembayaran dicek manual?",
    answer:
      "Ya. Admin memverifikasi pembayaran QRIS secara manual. Setelah tombol Saya sudah bayar ditekan, status pesanan menjadi Sedang diproses.",
  },
  {
    question: "Masuknya berapa lama?",
    answer:
      "Setelah pembayaran terkonfirmasi, pesanan biasanya diproses dalam hitungan detik.",
  },
  {
    question: "Kalau gagal, uangku gimana?",
    answer: "Dana dikembalikan ke metode pembayaran awal. Simpan kode invoice kamu.",
  },
];

const testimonials = [
  {
    tag: "Token PLN",
    quote:
      "“Lupa beli token pas mau masak. Bayar QRIS, kodenya langsung muncul. Kompor nyala lagi.”",
    initial: "R",
    name: "Rina",
    role: "Ibu rumah tangga, Bekasi",
    tone: "white",
  },
  {
    tag: "Top Up Game",
    quote:
      "“Diamond masuk sebelum match berikutnya mulai. Harganya juga masuk akal buat kantong pelajar.”",
    initial: "D",
    name: "Dimas",
    role: "Mahasiswa, Yogyakarta",
    tone: "navy",
  },
  {
    tag: "Tagihan",
    quote:
      "“BPJS, PDAM, internet, semua saya bayar dari satu tempat. Tanggal jatuh tempo jadi nggak kelewat.”",
    initial: "A",
    name: "Pak Agus",
    role: "Pemilik warung, Bandung",
    tone: "sun",
  },
  {
    tag: "Paket Data",
    quote:
      "“Kuota habis di tengah meeting online. Dua menit kemudian udah join lagi.”",
    initial: "S",
    name: "Sari",
    role: "Freelancer, Surabaya",
    tone: "white",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 md:pt-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="up mb-6 inline-flex items-center gap-1.5 rounded-md border border-navy/15 bg-white px-3 py-1 text-sm font-bold">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
            </svg>
            Lagi butuh <WordRotator />
          </p>

          <h1 className="up d text-5xl font-extrabold leading-[1.05] md:text-7xl">
            Kuota abis? Santai, ada{" "}
            <span className="bg-sun px-2">Niranix.</span>
          </h1>

          <p
            className="up mt-6 max-w-lg text-lg text-navy/70"
            style={{ animationDelay: "0.25s" }}
          >
            Satu tempat buat semua urusan digital harian kamu: dari pulsa, token
            listrik, diamond game, sampai cicilan motor. Nggak perlu bikin akun,
            nggak pakai nunggu.
          </p>

          <div
            className="up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="#beli"
              className="rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:scale-[1.02]"
            >
              Gas Top Up →
            </Link>
            <Link
              href="#layanan"
              className="rounded-full border-2 border-navy px-7 py-4 font-bold transition hover:bg-white/60"
            >
              Cek Produk
            </Link>
          </div>

          <div className="up mt-10" style={{ animationDelay: "0.55s" }}>
            <p className="text-sm font-semibold text-navy/60">
              Scan QRIS dari yang kamu punya:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
              <span className="rounded-lg bg-navy px-3 py-1.5 text-sun">QRIS</span>
              {["DANA", "OVO", "GoPay", "ShopeePay", "m-banking"].map((method) => (
                <span
                  key={method}
                  className="rounded-lg border border-navy/15 bg-white px-3 py-1.5"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className="fl col-span-2 rounded-[2rem] bg-navy p-7 text-white shadow-[10px_10px_0_#FFE14F]"
            style={{ animationDelay: "0.3s, 1.2s" }}
          >
            <p className="flex items-center gap-1.5 text-sm font-bold text-sun">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
              </svg>
              Kecepatan proses
            </p>
            <p className="d mt-2 text-6xl font-extrabold md:text-7xl">3 detik</p>
            <p className="mt-2 text-white/70">
              Setelah pembayaran terverifikasi, saldo langsung nongol. Nggak pakai
              nunggu lama.
            </p>
          </div>

          <div
            className="fl rounded-[2rem] border-2 border-navy bg-sun p-6"
            style={{ animationDelay: "0.45s, 1.6s" }}
          >
            <p className="d text-4xl font-extrabold">24/7</p>
            <p className="mt-2 font-semibold">
              Jam 3 pagi butuh token? Kami melek.
            </p>
          </div>

          <div
            className="fl rounded-[2rem] bg-white p-6"
            style={{ animationDelay: "0.55s, 2s" }}
          >
            <p className="d text-4xl font-extrabold">Rp0</p>
            <p className="mt-2 font-semibold">
              Biaya daftar. Karena memang nggak perlu daftar.
            </p>
          </div>

          <div
            className="up col-span-2 flex items-center gap-4 rounded-[2rem] bg-white p-6"
            style={{ animationDelay: "0.65s" }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-xl font-bold text-sun">
              ✓
            </span>
            <p className="font-semibold">
              Ada kendala? Uangmu balik ke metode pembayaran awal, tanpa drama.
            </p>
          </div>
        </div>
      </section>

      <CatalogGrid />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-navy/50">
            Order kilat
          </p>
          <h2 className="d mt-2 text-4xl font-extrabold md:text-5xl">
            Tinggal ketik nomor, sisanya biar kami.
          </h2>
          <p className="mt-3 max-w-md text-navy/70">
            Simulasikan pesananmu di sini. Harga yang tampil adalah harga final,
            tanpa biaya tersembunyi.
          </p>
        </div>
        <QuickOrder />
      </section>

      <section id="cara" className="scroll-mt-20 bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="d text-4xl font-extrabold md:text-5xl">
            Semudah <span className="text-sun">1, 2, 3</span>
          </h2>
          <p className="mt-2 text-white/60">
            Bahkan lebih cepat dari bikin kopi sachet.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/15 p-7">
              <p className="d text-6xl font-extrabold text-sun">01</p>
              <h3 className="d mt-4 text-2xl font-bold">Tentukan kebutuhan</h3>
              <p className="mt-1 text-white/60">
                Mau pulsa, token, diamond, atau bayar tagihan.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 p-7">
              <p className="d text-6xl font-extrabold text-sun">02</p>
              <h3 className="d mt-4 text-2xl font-bold">Masukkan tujuan</h3>
              <p className="mt-1 text-white/60">
                Operator langsung kami kenali dari nomornya.
              </p>
            </div>
            <div className="rounded-3xl bg-sun p-7 text-navy">
              <p className="d text-6xl font-extrabold">03</p>
              <h3 className="d mt-4 text-2xl font-bold">Scan QRIS &amp; selesai</h3>
              <p className="mt-1 opacity-70">
                Bayar dari e-wallet atau m-banking, lalu tekan Saya sudah bayar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="qris" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-navy/50">
              Pembayaran
            </p>
            <h2 className="d mt-2 text-4xl font-extrabold md:text-5xl">
              Satu scan, <br className="sm:hidden" />
              semua beres.
            </h2>
          </div>
          <p className="max-w-sm text-navy/60">
            Nggak perlu pilih metode lain. QRIS bisa discan dari e-wallet atau
            m-banking apa pun.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-navy p-7 text-white md:col-span-2 md:row-span-2">
            <div
              className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-sun/15 transition duration-700 group-hover:scale-125"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-navy">
                QRIS
              </span>
              <p className="d mt-6 text-6xl font-extrabold md:text-8xl">
                QRIS<span className="text-sun">.</span>
              </p>
              <p className="mt-2 max-w-sm text-white/70">
                Satu kode untuk semua e-wallet dan m-banking. Nggak perlu transfer
                manual ke rekening.
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-2 text-xs font-semibold">
              {["DANA", "OVO", "GoPay", "ShopeePay", "m-banking"].map((method) => (
                <span key={method} className="rounded-full bg-white/10 px-3 py-1.5">
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-sun p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                Verifikasi
              </p>
              <h3 className="d mt-2 text-2xl font-extrabold">Dicek admin</h3>
              <p className="mt-2 text-sm opacity-70">
                Pembayaran QRIS diverifikasi manual sebelum pesanan diproses.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-full bg-navy/10 px-3 py-2 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-navy" />
              Status: Sedang diproses
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-navy/10 bg-white p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                Invoice
              </p>
              <h3 className="d mt-2 text-2xl font-extrabold">Simpan kode NRX-</h3>
            </div>
            <div className="mt-6">
              <p className="text-sm opacity-60">
                Lacak status dan detail pesanan kapan saja.
              </p>
              <Link
                href="/cek-transaksi/"
                className="mt-3 inline-block font-bold text-navy underline decoration-sun decoration-4 underline-offset-4"
              >
                Cek transaksi →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-bold uppercase tracking-widest text-navy/50">
              Dari pengguna
            </p>
            <h2 className="d mt-2 text-4xl font-extrabold md:text-5xl">
              Mereka udah
              <br />
              nggak ribet lagi.
            </h2>
            <p className="mt-4 text-navy/60">
              Cerita singkat dari orang yang pakai Niranix buat kebutuhan harian.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((item, index) => {
              const tone =
                item.tone === "navy"
                  ? "bg-navy text-white"
                  : item.tone === "sun"
                    ? "bg-sun"
                    : "bg-white";
              const tag =
                item.tone === "navy"
                  ? "bg-white/10"
                  : item.tone === "sun"
                    ? "bg-white/60"
                    : "bg-mist";
              const avatar =
                item.tone === "navy"
                  ? "bg-sun text-navy"
                  : "bg-navy text-sun";
              return (
                <figure
                  key={item.name}
                  className={`rounded-3xl p-6 ${tone} ${
                    index === 0 || index === 2 ? "sm:translate-y-8" : ""
                  }`}
                >
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${tag}`}>
                    {item.tag}
                  </span>
                  <blockquote className="mt-4 font-semibold leading-relaxed">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full font-bold ${avatar}`}
                    >
                      {item.initial}
                    </span>
                    <span>
                      <b className="block text-sm">{item.name}</b>
                      <span className="text-xs opacity-50">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 pb-20">
        <p className="text-sm font-bold uppercase tracking-widest text-navy/50">FAQ</p>
        <h2 className="d mt-2 text-4xl font-extrabold md:text-5xl">
          Masih ragu? Cek dulu
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="rounded-2xl bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-bold">
                {item.question}
                <span className="pl text-2xl leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 opacity-70">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-navy/60">
          Belum ketemu?{" "}
          <Link
            href="/bantuan/"
            className="font-bold text-navy underline decoration-sun decoration-4 underline-offset-4"
          >
            Buka pusat bantuan
          </Link>
        </p>
      </section>
    </main>
  );
}
