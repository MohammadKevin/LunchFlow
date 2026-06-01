import Link from 'next/link'
import {
  Bell,
  CreditCard,
  MessageCircle,
  Truck,
  Zap,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafcf9] text-slate-900 antialiased selection:bg-green-200">
      
      {/* ── HERO SECTION ── */}
      <section id="home" className="relative overflow-hidden bg-[#041e10] py-20 lg:min-h-[90vh] lg:py-32 flex items-center">
        {/* Advanced Background Ornaments */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400 backdrop-blur-sm animate-fade-in">
                <Sparkles className="h-3.5 w-3.5 text-green-400" />
                <span>Sistem Pemesanan Terintegrasi v2.0</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.1]">
                Kendalikan Pesanan <br />
                <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-200 bg-clip-text text-transparent">
                  Tanpa Batas.
                </span>
              </h1>
              
              <p className="mx-auto lg:mx-0 max-w-2xl text-base text-emerald-100/70 sm:text-lg leading-relaxed">
                PesanOnline merevolusi cara bisnis lokal menerima pesanan, mengotomatisasi pembayaran digital, dan memantau pengiriman realtime lewat satu dashboard intuitif.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-green-500 px-8 py-4 font-bold text-neutral-950 transition-all duration-300 hover:bg-green-400 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Mulai Sekarang Gratis
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="#features"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-white/10"
                >
                  Eksplorasi Fitur
                </Link>
              </div>

              {/* Minimalist Stats Overlay */}
              <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                {[
                  { val: '10K+', label: 'Bisnis Aktif' },
                  { val: '99.9%', label: 'Uptime SLA' },
                  { val: '<5ms', label: 'Respon API' },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">{s.val}</p>
                    <p className="text-xs text-emerald-100/40 uppercase tracking-wider font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Dashboard Showcase */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-[2.5rem] blur-2xl opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
              
              <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-2 backdrop-blur-md shadow-2xl">
                <div className="rounded-[2.2rem] bg-[#02130a] p-6 sm:p-8 space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                        Live Monitoring
                      </span>
                      <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">248</h2>
                      <p className="text-xs text-slate-400 mt-1">Pesanan diproses saat ini</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                  </div>

                  {/* Micro Chart Simulator */}
                  <div className="space-y-2 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Beban Server</span>
                      <span className="text-green-400 font-medium">72% Optimal</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
                    </div>
                  </div>

                  {/* Operational Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 transition-colors hover:bg-white/[0.05]">
                      <p className="text-[11px] font-medium text-slate-400">Rata-rata Proses</p>
                      <p className="mt-1 text-xl font-bold text-white">4.8 <span className="text-xs font-normal text-slate-400">Min</span></p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 transition-colors hover:bg-white/[0.05]">
                      <p className="text-[11px] font-medium text-slate-400">Volume Hari Ini</p>
                      <p className="mt-1 text-xl font-bold text-green-400">Rp 4.2M</p>
                    </div>
                  </div>

                  {/* Mini Pills Showcase */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                      <CreditCard className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">QRIS Auto</p>
                        <p className="text-[10px] text-slate-500">Instant settlement</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                      <Bell className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">WhatsApp</p>
                        <p className="text-[10px] text-slate-500">Notifikasi otomatis</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURES: BENTO GRID DESIGN ── */}
      <section id="features" className="py-24 lg:py-32 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          
          <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700 uppercase tracking-wider">
              Kapabilitas Platform
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Satu Arsitektur. <br />
              <span className="text-green-600">Semua Kebutuhan Transaksi.</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Infrastruktur mutakhir yang dirancang khusus untuk menangani ribuan pesanan per detik dengan presisi tinggi.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            
            {/* Feature 1: Wide Bento Card */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Pesan Instan Khusus Pelanggan
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-100 text-green-700 font-semibold">Hot</span>
                </h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  Antarmuka ultra responsif yang memudahkan pelanggan Anda checkout produk dalam hitungan detik dari gawai apa pun.
                </p>
              </div>
            </div>

            {/* Feature 2: Standard Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Gerbang Pembayaran</h3>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                Integrasi penuh ekosistem QRIS, Virtual Account bank nasional, dan dompet digital tanpa kendala vendor luar.
              </p>
            </div>

            {/* Feature 3: Standard Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Agregator Kurir</h3>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                Manajemen logistik otomatis dari penjemputan paket hingga sistem tracking pelacakan kurir realtime.
              </p>
            </div>

            {/* Feature 4: Tall/Wide Bento Card depending on viewport */}
            <div className="md:col-span-3 lg:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-50 text-lime-600 mb-6 group-hover:scale-110 transition-transform">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Webhooks & Alur Realtime</h3>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                Sistem pemicu otomatis (*webhook*) yang secara instan mengirim kabar status pesanan ke pelanggan via WhatsApp dan tim admin internal Anda.
              </p>
            </div>

            {/* Feature 5: Dark Accented Bento Box */}
            <div className="md:col-span-2 lg:col-span-2 overflow-hidden rounded-3xl bg-[#041e10] p-8 shadow-inner text-white flex flex-col justify-between relative group">
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-green-500/10 blur-xl group-hover:bg-green-500/20 transition-colors" />
              <div>
                <h3 className="text-xl font-bold tracking-tight">Butuh Penyesuaian API Lebih Lanjut?</h3>
                <p className="mt-2 text-emerald-100/60 text-sm leading-relaxed">
                  Akses dokumentasi developer kami untuk integrasi ERP berskala enterprise secara menyeluruh.
                </p>
              </div>
              <Link href="#" className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-green-400 hover:text-green-300 transition-colors">
                Baca Dokumentasi API <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY US: MODERN split ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-16 lg:grid-cols-12">

            {/* Left Graphics Card Panel */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-zinc-950 rounded-[2.5rem] blur-xl opacity-10" />
              
              <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-slate-950 p-8 text-white space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Volume Bulanan', val: 'Rp 2.1M', sub: '+18.4% Kenaikan' },
                    { label: 'Pesanan Masuk', val: '84', sub: 'Hari ini' },
                    { label: 'Tingkat Retensi', val: '98.4%', sub: 'Metrik Kepuasan' },
                    { label: 'SLA Respon', val: '< 2 Detik', sub: 'Otomatis' },
                  ].map((m, idx) => (
                    <div key={idx} className="rounded-2xl bg-white/[0.03] p-4 border border-white/10 space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{m.label}</p>
                      <p className="text-lg font-bold tracking-tight text-white">{m.val}</p>
                      <p className="text-[10px] text-emerald-400 font-medium">{m.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex gap-4 items-start">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">Arsitektur Keamanan Berlapis</p>
                    <p className="text-xs text-emerald-100/50 mt-1">Mengadopsi enkripsi end-to-end berstandar PCI-DSS generasi terbaru.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700 uppercase tracking-wider">
                Keunggulan Mutlak
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Alasan Utama Industri <br />
                <span className="text-green-600">Beralih ke PesanOnline</span>
              </h2>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                Kami menghilangkan kompleksitas manajemen pesanan ritel tradisional dengan menyederhanakan alur kerja tim operasional Anda dari ujung ke ujung.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                {[
                  { icon: Zap, title: 'Inisiasi 5 Menit', desc: 'Sistem langsung siap pakai pasca registrasi awal.' },
                  { icon: ShieldCheck, title: 'Enkripsi Penuh', desc: 'Keamanan hak milik data transaksi Anda dijamin penuh.' },
                  { icon: TrendingUp, title: 'Siap Skala Masif', desc: 'Infrastruktur elastis mengikuti kurva pertumbuhan bisnis.' },
                  { icon: CheckCircle2, title: 'Bantuan CS 24/7', desc: 'Tim teknis profesional siap melayani kendala Anda kapan pun.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700 uppercase tracking-wider">
            Misi & Dampak
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Mendorong Pertumbuhan <br />
            <span className="text-green-600">Ekonomi Digital Finansial</span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-slate-500 leading-relaxed">
            PesanOnline berkomitmen mempercepat digitalisasi operasional UMKM hingga korporasi besar di Indonesia guna menghadirkan proses pemesanan yang inklusif, reliabel, dan mutakhir.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { num: '10K+', label: 'Mitra Usaha Terverifikasi' },
              { num: 'Rp 50M+', label: 'Volume Transaksi / Bulan' },
              { num: '4.9 ★', label: 'Indeks Kepuasan Pengguna' },
            ].map((s, idx) => (
              <div key={idx} className="rounded-2xl bg-white border border-slate-200/60 p-8 shadow-sm transition-transform hover:-translate-y-1">
                <p className="text-3xl font-extrabold text-green-600 tracking-tight sm:text-4xl">{s.num}</p>
                <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION: MODERN BANNER ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#041e10] via-[#0b331c] to-[#14532d] px-8 py-20 text-center shadow-2xl sm:px-16">
            
            {/* Background Glows */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-400/10 blur-3xl pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-green-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                Evaluasi Uji Coba 14 Hari Tanpa Risiko
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Siap Melipatgandakan <br />
                Efisiensi Bisnis Anda?
              </h2>

              <p className="mx-auto max-w-xl text-sm sm:text-base text-emerald-100/60 leading-relaxed">
                Bergabunglah bersama ribuan pengusaha inovatif yang telah mentransformasi sistem pemesanan konvensional mereka ke masa depan digital.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-8 py-4 font-bold text-neutral-950 transition-all hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/20 active:scale-95"
                >
                  Daftar Sekarang
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-green-500/30 hover:bg-white/10"
                >
                  Masuk ke Akun
                </Link>
              </div>

              <p className="text-[11px] text-emerald-100/30 font-medium tracking-wide">
                Tanpa verifikasi kartu kredit awal • Batalkan paket kapan saja
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}