import React, { useState } from 'react';
import { X, Eye, Link, Trash2, QrCode } from 'lucide-react';
import { QRModal } from './QRModal';
import { ProfileActionModal } from './ProfileActionModal';

interface Profile {
  id: string;
  name: string;
  username: string;
  template: string;
  views: number;
  preview: string;
  lastUpdated: string;
  status: 'active' | 'inactive';
}

interface ViewUserProfilesModalProps {
  user: {
    name: string;
    email: string;
  };
  onClose: () => void;
}

type ProfileModalType = 'qr' | 'delete' | null;

export function ViewUserProfilesModal({ user, onClose }: ViewUserProfilesModalProps) {
  const [profileModalType, setProfileModalType] = useState<ProfileModalType>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Mock data - gerçek uygulamada API'den gelecek
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'İş Profili',
      username: 'aliyilmaz',
      template: 'vTag Modern',
      views: 1234,
      lastUpdated: '2 saat önce',
      status: 'active',
      preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Kişisel Profil',
      username: 'aliyilmaz.personal',
      template: 'vTag Classic',
      views: 567,
      lastUpdated: '1 gün önce',
      status: 'active',
      preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    }
  ];

  const handleProfileAction = (type: ProfileModalType, profile: Profile) => {
    setSelectedProfile(profile);
    setProfileModalType(type);
  };

  const handleCloseProfileModal = () => {
    setSelectedProfile(null);
    setProfileModalType(null);
  };

  const handleCopyLink = (username: string) => {
    const url = `${window.location.origin}/profile/${username}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">{user.name} - Profiller</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profiles.map((profile) => (
                <div key={profile.id} className="bg-white border rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={profile.preview}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{profile.name}</h4>
                        <p className="text-sm text-gray-500">{profile.template}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>{profile.views} görüntülenme</span>
                      <span>{profile.lastUpdated}</span>
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => window.open(`/profile/${profile.username}`, '_blank')}
                        className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                        title="Görüntüle"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleCopyLink(profile.username)}
                        className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                        title="Bağlantıyı Kopyala"
                      >
                        <Link className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleProfileAction('qr', profile)}
                        className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                        title="QR Kod"
                      >
                        <QrCode className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleProfileAction('delete', profile)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Action Modals */}
      {selectedProfile && profileModalType === 'qr' && (
        <QRModal
          profile={selectedProfile}
          onClose={handleCloseProfileModal}
        />
      )}
      
      {selectedProfile && profileModalType === 'delete' && (
        <ProfileActionModal
          type="delete"
          profile={selectedProfile}
          onClose={handleCloseProfileModal}
        />
      )}
    </>
  );
}