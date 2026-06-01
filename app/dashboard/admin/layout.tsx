'use client'

import Link from 'next/link'

import {
  usePathname,
  useRouter,
} from 'next/navigation'

import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  Users,
  X,
  UtensilsCrossed,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router =
    useRouter()

  const pathname =
    usePathname()

  const [
    mobile,
    setMobile,
  ] =
    useState(false)

  const [
    user,
    setUser,
  ] =
    useState({
      name:
        'Super Admin',

      email:
        'admin@email.com',
    })

  useEffect(() => {
    const stored =
      localStorage.getItem(
        'user',
      )

    if (stored) {
      const parsed =
        JSON.parse(
          stored,
        )

      setUser({
        name:
          parsed.fullName ||
          parsed.name,

        email:
          parsed.email,
      })
    }
  }, [])

  const menus = [
    {
      title:
        'Dashboard',

      href:
        '/dashboard/admin',

      icon:
        LayoutDashboard,
    },

    {
      title:
        'Pengguna',

      href:
        '/dashboard/admin/users',

      icon:
        Users,
    },

    {
      title:
        'Menu',

      href:
        '/dashboard/admin/menus',

      icon:
        UtensilsCrossed,
    },

    {
      title:
        'Pesanan',

      href:
        '/dashboard/admin/orders',

      icon:
        Package,
    },

    {
      title:
        'Pembayaran',

      href:
        '/dashboard/admin/payments',

      icon:
        CreditCard,
    },
  ]

  const logout =
    () => {
      localStorage.clear()

      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'

      router.replace(
        '/',
      )
    }

  return (
    <div className="min-h-screen bg-[#f7faf7]">

      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">

          <div className="flex items-center gap-10">

            <Link
              href="/dashboard/admin"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-white">

                <ShoppingBag />

              </div>

              <div>

                <h1 className="font-black">
                  PesanOnline
                </h1>

                <p className="text-xs text-gray-400">
                  Admin
                </p>

              </div>

            </Link>

            <nav className="hidden gap-2 lg:flex">

              {menus.map(
                (
                  menu,
                ) => {
                  const Icon =
                    menu.icon

                  const active =
                    pathname.startsWith(
                      menu.href,
                    )

                  return (
                    <Link
                      key={
                        menu.href
                      }
                      href={
                        menu.href
                      }
                      className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                        active
                          ? 'bg-green-600 text-white'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />

                      {
                        menu.title
                      }

                    </Link>
                  )
                },
              )}

            </nav>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center gap-3">

              <div className="text-right">

                <h3 className="text-sm font-bold">
                  {
                    user.name
                  }
                </h3>

                <p className="text-xs text-gray-400">
                  {
                    user.email
                  }
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 font-bold text-green-700">

                {user.name?.[0]}

              </div>

            </div>

            <button
              onClick={
                logout
              }
              className="hidden rounded-xl border p-3 text-red-500 hover:bg-red-50 lg:flex"
            >
              <LogOut />
            </button>

            <button
              onClick={() =>
                setMobile(
                  !mobile,
                )
              }
              className="rounded-xl border p-3 lg:hidden"
            >
              {mobile ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>

          </div>

        </div>

        {mobile && (
          <div className="border-t bg-white p-4 lg:hidden">

            <div className="space-y-2">

              {menus.map(
                (
                  menu,
                ) => {
                  const Icon =
                    menu.icon

                  return (
                    <Link
                      key={
                        menu.href
                      }
                      href={
                        menu.href
                      }
                      onClick={() =>
                        setMobile(
                          false,
                        )
                      }
                      className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-50"
                    >
                      <Icon />

                      {
                        menu.title
                      }

                    </Link>
                  )
                },
              )}

              <button
                onClick={
                  logout
                }
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600"
              >
                <LogOut />

                Logout

              </button>

            </div>

          </div>
        )}

      </header>

      <main className="mx-auto max-w-[1600px] p-6">
        {children}
      </main>

    </div>
  )
}