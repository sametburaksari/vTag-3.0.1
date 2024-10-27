import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { ProfileCard } from '../../components/user/ProfileCard';
import { CreateProfileModal } from '../../components/user/CreateProfileModal';
import { QRModal } from '../../components/admin/QRModal';
import { DigitalCardModal } from '../../components/user/DigitalCardModal';

export function UserProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [modalType, setModalType] = useState<'create' | 'qr' | 'digital-card' | null>(null);

  // Mock data
  const profiles = [
    {
      id: '1',
      name: 'Ali Yılmaz',
      role: 'Yazılım Geliştirici',
      company: 'Tech Solutions',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      views: 1234,
      username: 'aliyilmaz'
    },
    // Add more profiles as needed
  ];

  const handleCreateProfile = () => {
    setModalType('create');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profiller</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Profil ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create Profile Card */}
        <div 
          onClick={handleCreateProfile}
          className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100 border-2 border-dashed border-gray-200"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Plus className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">Yeni Profil</h3>
            <p className="text-sm text-gray-500">Yeni bir profil oluştur</p>
          </div>
        </div>

        {/* Profile Cards */}
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onQrCode={() => {
              setSelectedProfile(profile);
              setModalType('qr');
            }}
            onView={() => {
              window.open(`/profile/${profile.username}`, '_blank');
            }}
            onDigitalCard={() => {
              setSelectedProfile(profile);
              setModalType('digital-card');
            }}
          />
        ))}
      </div>

      {/* Modals */}
      {modalType === 'create' && (
        <CreateProfileModal onClose={() => setModalType(null)} />
      )}

      {modalType === 'qr' && selectedProfile && (
        <QRModal
          profile={selectedProfile}
          onClose={() => {
            setModalType(null);
            setSelectedProfile(null);
          }}
        />
      )}

      {modalType === 'digital-card' && selectedProfile && (
        <DigitalCardModal
          profile={{
            ...selectedProfile,
            url: `${window.location.origin}/profile/${selectedProfile.username}`
          }}
          onClose={() => {
            setModalType(null);
            setSelectedProfile(null);
          }}
        />
      )}
    </div>
  );
}

export default UserProfiles;