// Mevcut ProfileCard bileşenine düzenleme butonu ekleyelim
import React from 'react';
import { QrCode, Eye, CreditCard, ChevronRight, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    role: string;
    company?: string;
    avatar: string;
    views: number;
  };
  onQrCode: () => void;
  onView: () => void;
  onDigitalCard: () => void;
}

export function ProfileCard({ profile, onQrCode, onView, onDigitalCard }: ProfileCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <p className="text-gray-500">{profile.role}</p>
            {profile.company && (
              <p className="text-sm text-gray-500">{profile.company}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Eye className="w-4 h-4" />
          <span>{profile.views} görüntülenme</span>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <button
            onClick={() => navigate(`/user/profiles/${profile.id}`)}
            className="w-full flex items-center justify-between p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              <span>Profili Düzenle</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onQrCode}
            className="w-full flex items-center justify-between p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              <span>QR Kod</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onView}
            className="w-full flex items-center justify-between p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Profili Görüntüle</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onDigitalCard}
            className="w-full flex items-center justify-between p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Dijital Kartvizit</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}