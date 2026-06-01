'use client'

import {
  useEffect,
  useState,
} from 'react'

import { toast } from 'sonner'

import { api } from '@/lib/api'

type Payment = {
  id: string

  paymentMethod:
    | 'QRIS'
    | 'TUNAI'

  paymentStatus:
    | 'PENDING'
    | 'PAID'
    | 'FAILED'

  createdAt: string

  order: {
    id: string
    orderCode: string
    totalPrice: number
  }
}

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState<Payment[]>([])

  const [loading, setLoading] =
    useState(true)

  const fetchPayments =
    async () => {
      try {
        const response =
          await api.get(
            '/payments/history',
            {
              params: {
                page: 1,
                limit: 20,
              },
            },
          )

        setPayments(
          response.data
            ?.data ??
            response.data,
        )
      } catch (
        error: any
      ) {
        console.log(
          error?.response,
        )

        toast.error(
          error?.response
            ?.data
            ?.message ||
            'Gagal mengambil pembayaran',
        )
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchPayments()
  }, [])

  const statusColor = (
    status: string,
  ) => {
    switch (
      status
    ) {
      case 'PAID':
        return 'bg-green-100 text-green-700'

      case 'FAILED':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-yellow-100 text-yellow-700'
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="mt-4 text-gray-500">
            Memuat pembayaran...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          Riwayat Pembayaran
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola transaksi pembayaran.
        </p>

      </div>

      <div className="overflow-hidden rounded-3xl border bg-white">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-50">

              <tr>

                <th className="px-6 py-5 text-left">
                  Order
                </th>

                <th className="px-6 py-5 text-left">
                  Metode
                </th>

                <th className="px-6 py-5 text-left">
                  Status
                </th>

                <th className="px-6 py-5 text-left">
                  Total
                </th>

                <th className="px-6 py-5 text-left">
                  Tanggal
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map(
                (
                  payment,
                ) => (
                  <tr
                    key={
                      payment.id
                    }
                    className="border-t"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {
                        payment
                          .order
                          ?.orderCode
                      }
                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                        {
                          payment.paymentMethod
                        }

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor(
                          payment.paymentStatus,
                        )}`}
                      >
                        {
                          payment.paymentStatus
                        }
                      </span>

                    </td>

                    <td className="px-6 py-5 font-bold text-green-700">

                      Rp{' '}

                      {Number(
                        payment
                          .order
                          ?.totalPrice,
                      ).toLocaleString(
                        'id-ID',
                      )}

                    </td>

                    <td className="px-6 py-5 text-gray-500">

                      {new Date(
                        payment.createdAt,
                      ).toLocaleString(
                        'id-ID',
                      )}

                    </td>

                  </tr>
                ),
              )}

            </tbody>

          </table>

          {payments.length ===
            0 && (
            <div className="py-20 text-center text-gray-500">
              Belum ada pembayaran.
            </div>
          )}

        </div>

      </div>

    </div>
  )
}