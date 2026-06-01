'use client'

import Link from 'next/link'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  {
    label: 'Beranda',
    href: '#home',
  },
  {
    label: 'Layanan',
    href: '#features',
  },
  {
    label: 'Tentang',
    href: '#about',
  },
  {
    label: 'Kontak',
    href: '#contact',
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-green-100 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <ShoppingCart className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-green-700">
              PesanOnline
            </h1>

            <p className="text-xs text-gray-500">
              Pesan lebih cepat
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-gray-600 transition hover:text-green-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            Mulai Sekarang
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="rounded-lg p-2 transition hover:bg-green-50 md:hidden"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-green-700" />
          ) : (
            <Menu className="h-6 w-6 text-green-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto flex flex-col gap-5 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/login"
                className="rounded-xl border border-green-200 px-4 py-3 text-center text-sm font-medium"
              >
                Masuk
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}