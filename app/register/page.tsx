'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Loader2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      // Menggunakan endpoint pendaftaran konvensional untuk pelanggan
      await api.post('/auth/register    ', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      toast.success('Pendaftaran akun berhasil!')
      router.push('/login')
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Pendaftaran akun gagal'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#fafcf9] text-slate-900 antialiased selection:bg-green-200 grid lg:grid-cols-12">
      
      {/* LEFT SIDE: Registration Form */}
      <section className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-white relative z-10 shadow-xl lg:shadow-none">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-green-600 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-12 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700 uppercase tracking-wider">
              Registrasi Pelanggan
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Buat Akun Anda
            </h1>
            <p className="text-sm text-slate-500">
              Bergabunglah bersama <span className="font-semibold text-green-600">LunchFlow</span> untuk menikmati layanan pemesanan kuliner terbaik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                Nama Lengkap
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nama lengkap Anda"
                  className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-xs bg-slate-50/50 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                Alamat Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="nama@email.com"
                  className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-xs bg-slate-50/50 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                Kata Sandi
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Minimal 6 karakter"
                  className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-11 text-xs bg-slate-50/50 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-green-600 text-xs font-bold text-white shadow-md shadow-green-600/10 transition-all hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memproses Akun...</span>
                </>
              ) : (
                <span>Daftar Akun Baru</span>
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-xs text-slate-500">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="font-bold text-green-600 hover:text-green-500 hover:underline transition-colors">
              Masuk Sekarang
            </Link>
          </p>
        </div>

        {/* Footer Meta */}
        <p className="text-center text-[10px] text-slate-400">
          &copy; 2026 LunchFlow & PesanOnline. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </section>

      {/* RIGHT SIDE: Premium Promotional Showcase Panel */}
      <section className="hidden lg:col-span-7 bg-[#041e10] relative lg:flex flex-col justify-between p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.15),transparent_60%)]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

        {/* Top Feature Tag */}
        <div className="flex justify-end relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-green-400" />
            <span>Pengalaman Transaksi Instan</span>
          </div>
        </div>

        {/* Marketing Center Text */}
        <div className="max-w-md mx-auto space-y-6 relative z-10 my-auto text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Pesan Hidangan <br />
            Favorit Tanpa Antre.
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
            Nikmati kemudahan memesan makanan harian secara digital, pelacakan status pesanan langsung dari dapur mitra, serta integrasi sistem pembayaran nontunai yang aman.
          </p>
          
          <div className="grid gap-3 pt-4 border-t border-white/5">
            {[
              'Metode Pembayaran QRIS & E-Wallet Instan',
              'Pelacakan Real-time Pesanan Anda',
              'Notifikasi Otomatis Melalui WhatsApp',
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Server Status */}
        <div className="flex items-center justify-between border-t border-white/5 pt-6 text-[10px] text-emerald-100/30 relative z-10">
          <span>Server Gateway: AWS Jakarta</span>
          <span>Security Compliance: End-to-End Encrypted</span>
        </div>
      </section>

    </main>
  )
}