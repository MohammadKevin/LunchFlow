'use client'

import { useEffect, useState } from 'react'

import { toast } from 'sonner'

import { api } from '@/lib/api'

type Order = {
  id: string
  orderNumber?: string
  total: number
  status: string
  createdAt: string

  items?: {
    quantity: number

    product: {
      name: string
    }
  }[]
}

const statusColor = (
  status: string,
) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-700'

    case 'CANCELLED':
      return 'bg-red-100 text-red-700'

    case 'PROCESSING':
      return 'bg-blue-100 text-blue-700'

    default:
      return 'bg-yellow-100 text-yellow-700'
  }
}

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([])

  const [loading, setLoading] =
    useState(true)

  const fetchOrders =
    async () => {
      try {
        const res =
          await api.get('/orders')

        setOrders(res.data)
      } catch {
        toast.error(
          'Gagal mengambil data order',
        )
      } finally {
        setLoading(false)
      }
    }

  const updateStatus =
    async (
      id: string,
      status: string,
    ) => {
      try {
        await api.patch(
          `/orders/${id}/status`,
          {
            status,
          },
        )

        toast.success(
          'Status berhasil diperbarui',
        )

        fetchOrders()
      } catch {
        toast.error(
          'Gagal update status',
        )
      }
    }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="mt-4 text-gray-500">
            Memuat pesanan...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-black">
          Kelola Pesanan
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor semua transaksi.
        </p>
      </div>

      {orders.length === 0 && (
        <div className="rounded-3xl border bg-white py-20 text-center">
          <p className="text-gray-500">
            Belum ada pesanan.
          </p>
        </div>
      )}

      <div className="grid gap-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <h2 className="text-xl font-bold">
                    {
                      order.orderNumber ||
                      order.id.slice(
                        0,
                        8,
                      )
                    }
                  </h2>

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${statusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                <p className="mt-2 text-gray-500">
                  {new Date(
                    order.createdAt,
                  ).toLocaleString(
                    'id-ID',
                  )}
                </p>

                <div className="mt-5 space-y-2">

                  {order.items?.map(
                    (
                      item,
                      index,
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="text-sm text-gray-700"
                      >
                        •{' '}
                        {
                          item.product
                            ?.name
                        }{' '}
                        ×{' '}
                        {
                          item.quantity
                        }
                      </div>
                    ),
                  )}

                </div>

              </div>

              <div className="text-right">

                <h3 className="text-3xl font-black text-green-600">
                  Rp{' '}
                  {Number(
                    order.total,
                  ).toLocaleString(
                    'id-ID',
                  )}
                </h3>

                <select
                  value={
                    order.status
                  }
                  onChange={(
                    e,
                  ) =>
                    updateStatus(
                      order.id,
                      e.target
                        .value,
                    )
                  }
                  className="mt-5 rounded-xl border px-4 py-3"
                >
                  <option value="PENDING">
                    Pending
                  </option>

                  <option value="CONFIRMED">
                    Confirmed
                  </option>

                  <option value="PROCESSING">
                    Processing
                  </option>

                  <option value="COMPLETED">
                    Completed
                  </option>

                  <option value="CANCELLED">
                    Cancelled
                  </option>

                </select>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}