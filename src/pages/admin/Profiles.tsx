import React, { useState } from 'react';
import { Search, Filter, LayoutGrid, List, QrCode, Eye, Edit2, Trash2, Building2 } from 'lucide-react';
import { QRModal } from '../../components/admin/QRModal';
import { ProfileActionModal } from '../../components/admin/ProfileActionModal';

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
    company?: {
      name: string;
    }
  }
}

export function Profiles() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [actionType, setActionType] = useState<'edit' | 'delete' | 'qr' | null>(null);

  // Mock data
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Ali Yılmaz',
      username: 'aliyilmaz',
      template: 'vTag Modern',
      views: 1234,
      lastUpdated: '2 saat önce',
      status: 'active',
      preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      user: {
        name: 'Ali Yılmaz',
        email: 'ali@example.com',
        company: {
          name: 'Tech Solutions'
        }
      }
    }
  ];

  const handleAction = (type: 'edit' | 'delete' | 'qr', profile: Profile) => {
    setSelectedProfile(profile);
    setActionType(type);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profiller</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'
            }`}
          >
            <List className="w-5 h-5" />
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
              placeholder="Profil ara..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 text-center relative group">
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAction('qr', profile)}
                    className="p-1.5 bg-white text-gray-700 rounded-full shadow-sm hover:bg-gray-50"
                    title="QR Kod"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.open(`/profile/${profile.username}`, '_blank')}
                    className="p-1.5 bg-white text-gray-700 rounded-full shadow-sm hover:bg-gray-50"
                    title="Görüntüle"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('edit', profile)}
                    className="p-1.5 bg-white text-gray-700 rounded-full shadow-sm hover:bg-gray-50"
                    title="Düzenle"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('delete', profile)}
                    className="p-1.5 bg-white text-red-500 rounded-full shadow-sm hover:bg-red-50"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Profile Image */}
                <img
                  src={profile.preview}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />

                {/* Profile Info */}
                <h3 className="font-semibold text-lg mb-1">{profile.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{profile.template}</p>

                {/* Company Info */}
                {profile.user.company && (
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{profile.user.company.name}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span>{profile.views} görüntülenme</span>
                  <span>•</span>
                  <span>{profile.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Şirket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Görüntülenme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Güncelleme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        <div className="text-sm text-gray-500">{profile.template}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{profile.user.name}</div>
                    <div className="text-sm text-gray-500">{profile.user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {profile.user.company ? (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm">{profile.user.company.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Bireysel</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {profile.views}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {profile.lastUpdated}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction('qr', profile)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="QR Kod"
                      >
                        <QrCode className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => window.open(`/profile/${profile.username}`, '_blank')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Görüntüle"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction('edit', profile)}
                        className="p-1 text-gray-400 hover:text-gray-600"
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
      )}

      {/* Modals */}
      {selectedProfile && actionType === 'qr' && (
        <QRModal profile={selectedProfile} onClose={closeModal} />
      )}
      
      {selectedProfile && (actionType === 'edit' || actionType === 'delete') && (
        <ProfileActionModal
          type={actionType}
          profile={selectedProfile}
          onClose={closeModal}
        />
      )}
    </div>
  );
}