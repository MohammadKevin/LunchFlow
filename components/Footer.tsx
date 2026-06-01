'use client'

import Link from 'next/link'

import {
  MessageCircle,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'

const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Layanan', href: '#features' },
  { label: 'Tentang', href: '#about' },
  { label: 'Kontak', href: '#contact' },
]

const features = [
  'Pembayaran QRIS',
  'Pesanan Instan',
  'Pickup & Delivery',
  'Notifikasi WhatsApp',
]

const IconInstagram = ({
  className,
}: {
  className?: string
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      width="20"
      height="20"
      x="2"
      y="2"
      rx="5"
    />

    <path d="M16 11.37A4 4 0 1 1 12.63 8" />

    <line
      x1="17.5"
      x2="17.51"
      y1="6.5"
      y2="6.5"
    />
  </svg>
)

const IconWhatsApp = ({
  className,
}: {
  className?: string
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.6-.8-3.2-2.1-4.043-3.534-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497z" />
  </svg>
)

const socials = [
  {
    Icon: IconInstagram,
    href: '#',
    label: 'Instagram',
  },
  {
    Icon: IconWhatsApp,
    href: '#',
    label: 'WhatsApp',
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#08120D] text-white"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-green-500 to-transparent" />

      {/* CTA */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-green-400">
                Pesan lebih cepat
              </p>

              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Mulai terima pesanan
                <br />
                <span className="text-white/20">
                  dengan PesanOnline.
                </span>
              </h2>
            </div>

            <a
              href="mailto:pesanonline@gmail.com"
              className="group flex items-center gap-3 rounded-2xl bg-green-600 px-7 py-4 font-semibold transition hover:bg-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]"
            >
              Hubungi Kami

              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-[0_0_25px_rgba(34,197,94,0.35)]">
                <MessageCircle className="h-5 w-5" />
              </div>

              <span className="text-3xl font-black">
                PesanOnline
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              Platform pemesanan digital modern
              untuk restoran, kantin, UMKM,
              dan bisnis online.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map(
                ({
                  Icon,
                  href,
                  label,
                }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:border-green-500 hover:bg-green-500/10 hover:text-green-400"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="mb-5 text-sm font-bold text-white">
              Navigasi
            </h4>

            <div className="space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-white/50 transition hover:text-green-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Feature */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-sm font-bold">
              Fitur
            </h4>

            <div className="space-y-3">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-sm font-bold">
              Kontak
            </h4>

            <div className="space-y-4">
              <div className="flex gap-3 text-sm text-white/50">
                <Mail className="h-4 w-4 text-green-500" />
                pesanonline@gmail.com
              </div>

              <div className="flex gap-3 text-sm text-white/50">
                <Phone className="h-4 w-4 text-green-500" />
                +62 812 3456 7890
              </div>

              <div className="flex gap-3 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-green-500" />
                Indonesia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-2 px-6 py-5 text-center text-xs text-white/30 md:flex-row md:justify-between">
          <span>
            © 2026 PesanOnline
          </span>

          <span>
            Built with 💚 in Indonesia
          </span>
        </div>
      </div>
    </footer>
  )
}
