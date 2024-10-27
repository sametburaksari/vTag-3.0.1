import React, { useState } from 'react';
import { Search, Plus, LayoutGrid, List, QrCode, Eye, Edit2, Trash2, Building2 } from 'lucide-react';
import { CreateProfileModal } from '../../components/corporate/modals/CreateProfileModal';
import { DeleteProfileModal } from '../../components/corporate/modals/DeleteProfileModal';
import { SharedProfileFieldsModal } from '../../components/corporate/modals/SharedProfileFieldsModal';
import { QRModal } from '../../components/admin/QRModal';

interface Profile {
  id: string;
  name: string;
  username: string;
  template: string;
  views: number;
  preview: string;
  lastUpdated: string;
  status: 'active' | 'inactive';
  user: {
    name: string;
    email: string;
  };
}

type ModalType = 'create' | 'delete' | 'shared-fields' | 'qr' | null;

export function Profiles() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [profiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Satış Ekibi',
      username: 'satis-ekibi',
      template: 'vTag Modern',
      views: 1234,
      lastUpdated: '2 saat önce',
      status: 'active',
      preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      user: {
        name: 'Ali Yılmaz',
        email: 'ali@example.com'
      }
    },
    {
      id: '2',
      name: 'Pazarlama Ekibi',
      username: 'pazarlama-ekibi',
      template: 'vTag Classic',
      views: 567,
      lastUpdated: '1 gün önce',
      status: 'active',
      preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      user: {
        name: 'Ayşe Demir',
        email: 'ayse@example.com'
      }
    }
  ]);

  const handleAction = (type: ModalType, profile?: Profile) => {
    setSelectedProfile(profile || null);
    setModalType(type);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profiller</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAction('shared-fields')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Building2 className="w-4 h-4" />
            Ortak Profil Bilgileri
          </button>
          <button
            onClick={() => handleAction('create')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Yeni Profil
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Profil ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Profiles Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şablon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Görüntülenme
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Güncelleme
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
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={profile.preview}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{profile.name}</div>
                      <div className="text-sm text-gray-500">{profile.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {profile.template}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {profile.views}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {profile.lastUpdated}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    profile.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {profile.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => window.open(`/profile/${profile.username}`, '_blank')}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Görüntüle"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('qr', profile)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="QR Kod"
                    >
                      <QrCode className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('edit', profile)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Düzenle"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('delete', profile)}
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

      {/* Modals */}
      {modalType === 'create' && (
        <CreateProfileModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'delete' && selectedProfile && (
        <DeleteProfileModal
          profile={selectedProfile}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'shared-fields' && (
        <SharedProfileFieldsModal onClose={() => setModalType(null)} />
      )}

      {modalType === 'qr' && selectedProfile && (
        <QRModal
          profile={selectedProfile}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}