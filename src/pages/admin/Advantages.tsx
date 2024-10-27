import React, { useState } from 'react';
import { Plus, LayoutGrid, List, Search, Filter, ExternalLink, Ticket, Building2, Eye, Edit2, Trash2 } from 'lucide-react';
import { CreateAdvantageModal } from '../../components/admin/CreateAdvantageModal';
import { EditAdvantageModal } from '../../components/admin/EditAdvantageModal';
import { DeleteAdvantageModal } from '../../components/admin/DeleteAdvantageModal';

interface Advantage {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'link' | 'coupon';
  category: string;
  companies?: {
    id: string;
    name: string;
  }[];
  status: 'active' | 'inactive';
  usageCount: number;
  remainingCoupons?: number;
  expiryDate?: string;
}

type ModalType = 'create' | 'edit' | 'delete' | null;
type ViewMode = 'grid' | 'list';

export function Advantages() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedAdvantage, setSelectedAdvantage] = useState<Advantage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const advantages: Advantage[] = [
    {
      id: '1',
      title: 'Premium LinkedIn Aboneliği',
      description: 'LinkedIn Premium Business aboneliğinde %20 indirim fırsatı',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=500',
      type: 'coupon',
      category: 'Profesyonel Gelişim',
      status: 'active',
      usageCount: 234,
      remainingCoupons: 766,
      expiryDate: '2024-12-31',
      companies: [
        { id: '1', name: 'Tech Solutions A.Ş.' }
      ]
    },
    {
      id: '2',
      title: 'Ücretsiz Domain',
      description: 'Yıllık .com domain kaydında %100 indirim',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500',
      type: 'link',
      category: 'Teknoloji',
      status: 'active',
      usageCount: 156
    }
  ];

  const handleAction = (type: ModalType, advantage?: Advantage) => {
    setSelectedAdvantage(advantage || null);
    setModalType(type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Avantajlar</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => handleAction('create')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Yeni Avantaj
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Avantaj ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="professional">Profesyonel Gelişim</option>
            <option value="technology">Teknoloji</option>
            <option value="education">Eğitim</option>
          </select>
        </div>
      </div>

      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage) => (
            <div key={advantage.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Image */}
              <div className="aspect-video relative">
                <img
                  src={advantage.image}
                  alt={advantage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    advantage.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {advantage.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  {advantage.type === 'link' ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <Ticket className="w-4 h-4" />
                  )}
                  <span>{advantage.type === 'link' ? 'Link' : 'Kupon'}</span>
                  {advantage.companies && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{advantage.companies.length} firma</span>
                      </div>
                    </>
                  )}
                </div>

                <h3 className="font-semibold mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{advantage.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{advantage.usageCount} kullanım</span>
                  {advantage.remainingCoupons && (
                    <span>{advantage.remainingCoupons} kupon kaldı</span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleAction('edit', advantage)}
                    className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                    title="Düzenle"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('delete', advantage)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avantaj
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tür
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanım
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {advantages.map((advantage) => (
                <tr key={advantage.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={advantage.image}
                        alt={advantage.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{advantage.title}</div>
                        <div className="text-sm text-gray-500">{advantage.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      {advantage.type === 'link' ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <Ticket className="w-4 h-4" />
                      )}
                      <span>{advantage.type === 'link' ? 'Link' : 'Kupon'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {advantage.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{advantage.usageCount} kullanım</div>
                    {advantage.remainingCoupons && (
                      <div className="text-sm text-gray-500">{advantage.remainingCoupons} kupon kaldı</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      advantage.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {advantage.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction('edit', advantage)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Düzenle"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction('delete', advantage)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {modalType === 'create' && (
        <CreateAdvantageModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'edit' && selectedAdvantage && (
        <EditAdvantageModal
          advantage={selectedAdvantage}
          onClose={() => setModalType(null)}
        />
      )}
      
      {modalType === 'delete' && selectedAdvantage && (
        <DeleteAdvantageModal
          advantage={selectedAdvantage}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}