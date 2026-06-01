'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Utensils, 
  Tag, 
  Layers,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'

interface Category {
  id: string
  name: string
}

interface Menu {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  categoryId: string
  category?: { name: string }
  isAvailable: boolean
}

export default function AdminMenusPage() {
  // State Data
  const [menus, setMenus] = useState<Menu[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  // State Loader & Filter
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('')

  // State Modal Form Tambah Menu
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: '',
    isAvailable: true
  })

  // 1. Ambil Data Awal (Menus & Categories)
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [menusRes, categoriesRes] = await Promise.all([
        api.get('/menus'),
        api.get('/categories')
      ])
      setMenus(menusRes.data)
      setCategories(categoriesRes.data)
    } catch (error: any) {
      toast.error('Gagal memuat data dari server backend')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 2. Handle Perubahan Input Form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) || 0 : value
    }))
  }

  // 3. Aksi POST: Buat Menu Baru
  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.categoryId) {
      return toast.warning('Silakan pilih kategori terlebih dahulu')
    }

    try {
      setIsSubmitting(true)
      await api.post('/menus', formData)
      toast.success('Menu baru berhasil ditambahkan!')
      setIsModalOpen(false)
      // Reset Form
      setFormData({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        categoryId: '',
        isAvailable: true
      })
      fetchData() // Refresh data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal menambahkan menu baru')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 4. Aksi PATCH: Toggle Ketersediaan Menu
  const handleToggleAvailability = async (id: string) => {
    try {
      await api.patch(`/menus/${id}/toggle`)
      toast.success('Status ketersediaan produk diperbarui')
      
      // Optimistic UI Update lokal state
      setMenus(prev => prev.map(item => 
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      ))
    } catch (error: any) {
      toast.error('Gagal memperbarui status ketersediaan')
    }
  }

  // 5. Aksi DELETE: Hapus Menu
  const handleDeleteMenu = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk menu ini secara permanen?')) return

    try {
      await api.delete(`/menus/${id}`)
      toast.success('Menu berhasil dihapus')
      setMenus(prev => prev.filter(item => item.id !== id))
    } catch (error: any) {
      toast.error('Gagal menghapus produk menu')
    }
  }

  // 6. Filter Komputasi Lokal (Search & Category Dropdown)
  const filteredMenus = menus.filter(menu => {
    const matchesSearch = menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (menu.description && menu.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategoryFilter ? menu.categoryId === selectedCategoryFilter : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Katalog Menu Kuliner</h1>
          <p className="text-sm text-slate-500">Kelola daftar menu makanan, harga, stok ketersediaan, dan kategori.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-green-600/10 transition-all hover:bg-green-500 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Menu Baru</span>
        </button>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
          <input
            type="text"
            placeholder="Cari nama atau deskripsi hidangan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-xs outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-500/5"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Layers className="h-4 w-4 text-slate-400" />
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-green-500"
          >
            <option value="">Semua Kategori Produk</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RENDER CORE CONTENT DATA LIST */}
      {isLoading ? (
        <div className="flex h-64 flex-col items-center justify-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-xs font-medium text-slate-400">Sinkronisasi database katalog menu...</p>
        </div>
      ) : filteredMenus.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <Utensils className="h-8 w-8 text-slate-300 mb-2" />
          <h3 className="text-sm font-bold text-slate-700">Tidak ada produk menu ditemukan</h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1">Silakan tambah menu baru atau sesuaikan kata kunci pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMenus.map((menu) => (
            <div 
              key={menu.id} 
              className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                !menu.isAvailable ? 'border-slate-200/60 bg-slate-50/50' : 'border-slate-200/60'
              }`}
            >
              {/* Product Card Image Container */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                {menu.imageUrl ? (
                  <img 
                    src={menu.imageUrl} 
                    alt={menu.name} 
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      !menu.isAvailable && 'grayscale opacity-60'
                    }`}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
                    <Utensils className="h-10 w-10" />
                    <span className="text-[10px] mt-1 font-medium">No Preview Image</span>
                  </div>
                )}

                {/* Instant Stock Status Badge Layer */}
                <button
                  onClick={() => handleToggleAvailability(menu.id)}
                  className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-sm backdrop-blur-md border transition-all active:scale-95 ${
                    menu.isAvailable 
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                      : 'bg-red-50/90 border-red-200 text-red-700 hover:bg-red-100'
                  }`}
                  title="Klik untuk ubah status ketersediaan"
                >
                  {menu.isAvailable ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      <span>Tersedia</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3" />
                      <span>Habis</span>
                    </>
                  )}
                </button>
              </div>

              {/* Card Meta Content Details */}
              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                    <Tag className="h-2.5 w-2.5" />
                    {menu.category?.name || 'Kategori Umum'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-green-600 transition-colors">
                    {menu.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
                    {menu.description || 'Tidak ada deskripsi tambahan untuk menu hidangan ini.'}
                  </p>
                </div>

                {/* Card Footer: Price & Action Triggers */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Harga Menu</p>
                    <p className="text-base font-extrabold text-slate-900">
                      Rp {menu.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteMenu(menu.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                    title="Hapus Menu"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── POPUP DIALOG FORM MODAL: CREATEMENUDTO INTEGRATION ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Title Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-extrabold text-slate-900">Formulir Tambah Menu Baru</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Input Body Form */}
            <form onSubmit={handleCreateMenu} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Nama Menu Hidangan *</label>
                <div className="relative group">
                  <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Nasi Goreng Spesial Daging"
                    className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-xs outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Nominal Harga (IDR) *</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      value={formData.price || ''}
                      onChange={handleInputChange}
                      placeholder="Contoh: 25000"
                      className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-xs outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Kategori Menu *</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <select
                      name="categoryId"
                      required
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-xs outline-none transition-all focus:border-green-500 focus:bg-white"
                    >
                      <option value="">Pilih Kategori...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">URL Gambar Menu (Opsional)</label>
                <div className="relative group">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://link-gambar.com/gambar.jpg"
                    className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-xs outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Deskripsi Hidangan</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Jelaskan detail menu hidangan, rasa, atau detail porsi..."
                  className="min-h-[80px] w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 resize-none"
                />
              </div>

              {/* Modal Action Footer Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-xs font-bold text-white shadow-md shadow-green-600/10 transition-all hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Menyimpan Menu...</span>
                    </>
                  ) : (
                    <span>Simpan Ke Katalog</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}