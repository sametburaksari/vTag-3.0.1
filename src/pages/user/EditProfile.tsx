import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Eye, QrCode, Share2, Wallet, Save } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { DigitalCardModal } from '../../components/user/DigitalCardModal';
import { QRModal } from '../../components/admin/QRModal';

interface Profile {
  id: string;
  name: string;
  title: string;
  department: string;
  company: string;
  avatar: string;
  username: string;
  profileId: string;
  membershipType: string;
  expiryDate: string;
  stats: {
    scans: number;
    saves: number;
    redirects: number;
  };
}

export default function EditProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'profile' | 'details' | 'settings'>('profile');
  const [modalType, setModalType] = useState<'qr' | 'digital-card' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    department: '',
    username: ''
  });

  const generateProfileId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'vT3';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const profile: Profile = {
    id: id || '',
    name: 'Ali Yılmaz',
    title: 'Yazılım Geliştirici',
    department: 'Teknoloji',
    company: 'Tech Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    username: 'ali-yilmaz',
    profileId: generateProfileId(),
    membershipType: 'Pro',
    expiryDate: '2024-12-31',
    stats: {
      scans: 1234,
      saves: 856,
      redirects: 2467
    }
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    // API call to save profile
  };

  const profileUrl = `${window.location.origin}/profile/${profile.profileId}`;

  return (
    <div className="flex gap-6 min-h-[calc(100vh-10rem)]">
      {/* Sol Sütun */}
      <div className="w-1/5 space-y-6">
        {/* Profil Kartı */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Cover ve Avatar */}
          <div className="relative">
            <div className="h-24 bg-gray-100" />
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
          
          {/* Profil Bilgileri */}
          <div className="pt-10 p-4 text-center">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{profile.title}</p>
            
            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-3">
              <div>
                <div className="text-lg font-semibold text-indigo-600">{profile.stats.scans}</div>
                <div className="text-xs text-gray-500">Tarama</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-indigo-600">{profile.stats.saves}</div>
                <div className="text-xs text-gray-500">Kayıt</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-indigo-600">{profile.stats.redirects}</div>
                <div className="text-xs text-gray-500">Yönlendirme</div>
              </div>
            </div>

            <div className="w-full space-y-2 text-sm mt-4">
              <div className="flex justify-between py-2 border-t">
                <span className="text-gray-500">Üyelik</span>
                <span className="font-medium">{profile.membershipType}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="text-gray-500">Profil ID</span>
                <span className="font-medium">{profile.profileId}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="text-gray-500">Son Kullanım</span>
                <span className="font-medium">{profile.expiryDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-4">Hızlı İşlemler</h3>
          <div className="space-y-3">
            <button
              onClick={() => setModalType('qr')}
              className="w-full flex items-center gap-3 p-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <QrCode className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="font-medium">QR Kod</span>
            </button>
            <button
              onClick={() => window.open(profileUrl, '_blank')}
              className="w-full flex items-center gap-3 p-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">Profili Görüntüle</span>
            </button>
            <button
              onClick={() => setModalType('digital-card')}
              className="w-full flex items-center gap-3 p-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Share2 className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium">Dijital Kartvizit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Sekmeler */}
          <div className="border-b px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profil Bilgileri
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profil Ayarları
              </button>
            </div>
          </div>

          {/* Sekme İçeriği */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    defaultValue={profile.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unvan
                  </label>
                  <input
                    type="text"
                    defaultValue={profile.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Şirket
                  </label>
                  <input
                    type="text"
                    defaultValue={profile.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departman
                  </label>
                  <input
                    type="text"
                    defaultValue={profile.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Profil Bağlantısı</span>
                    {profile.membershipType !== 'Free' && (
                      <span className="text-xs text-indigo-600">Özelleştirilebilir</span>
                    )}
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      {window.location.origin}/profile/
                    </span>
                    <input
                      type="text"
                      defaultValue={profile.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={profile.membershipType === 'Free'}
                      className="flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  {profile.membershipType === 'Free' && (
                    <p className="mt-1 text-xs text-gray-500">
                      Profil bağlantınızı özelleştirmek için Pro veya daha üst bir pakete geçiş yapın
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <p>Profil Bilgileri içeriği burada yer alacak</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <p>Profil Ayarları içeriği burada yer alacak</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sağ Sütun */}
      <div className="w-1/5">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-4">Mobil Önizleme</h3>
          <div className="aspect-[9/16] bg-gray-100 rounded-lg">
            {/* Mobil önizleme içeriği */}
          </div>
        </div>
      </div>

      {/* Modallar */}
      {modalType === 'qr' && (
        <QRModal
          profile={profile}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'digital-card' && (
        <DigitalCardModal
          profile={{
            ...profile,
            url: profileUrl
          }}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}