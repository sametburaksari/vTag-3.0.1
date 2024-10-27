import React from 'react';
import { QrCode, Eye, UserPlus, Gift, ExternalLink, Wallet, Share2, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function Dashboard() {
  // Mock data
  const profile = {
    name: 'Ali Yılmaz',
    title: 'Yazılım Geliştirici',
    department: 'Teknoloji',
    company: 'Tech Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    username: 'aliyilmaz'
  };

  const stats = [
    { label: 'Toplam Tarama', value: '1,234', icon: QrCode, color: 'bg-purple-500' },
    { label: 'Rehbere Kaydetme', value: '856', icon: UserPlus, color: 'bg-blue-500' },
    { label: 'Bilgi Erişimi', value: '2,467', icon: Eye, color: 'bg-green-500' }
  ];

  const advantages = [
    {
      id: '1',
      title: 'Premium LinkedIn',
      description: '%20 İndirim',
      expiryDate: '31.12.2024',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=500'
    },
    {
      id: '2',
      title: 'Ücretsiz Domain',
      description: '1 Yıl Ücretsiz',
      expiryDate: '31.12.2024',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500'
    }
  ];

  const profileUrl = `${window.location.origin}/profile/${profile.username}`;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hoş Geldin, {profile.name.split(' ')[0]}!</h1>
            <p className="text-indigo-100">Profilin son 24 saatte 127 kez görüntülendi</p>
          </div>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-2xl border-4 border-white/20"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-2xl mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Digital Card Preview */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="relative">
            <img src="/vtag-white.svg" alt="vTag" className="h-8 mb-8" />
            
            <div className="flex items-center gap-6 mb-8">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-xl border-2 border-white/20"
              />
              <div>
                <h3 className="text-xl font-bold">{profile.name}</h3>
                <p className="text-gray-400">{profile.title}</p>
                <p className="text-gray-400">{profile.company}</p>
              </div>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="bg-white p-3 rounded-xl mb-4">
                <QRCodeSVG value={profileUrl} size={120} />
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-sm">
                {profileUrl}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors">
                <Wallet className="w-5 h-5" />
                <span>Apple Cüzdan</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors">
                <Wallet className="w-5 h-5" />
                <span>Google Cüzdan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions & Advantages */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Hızlı İşlemler</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium">QR Kod</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium">Profil Paylaş</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Profili Görüntüle</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Advantages */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Avantajlarım</h3>
              <button className="text-sm text-indigo-600">Tümünü Gör</button>
            </div>
            <div className="space-y-4">
              {advantages.map((advantage) => (
                <div key={advantage.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={advantage.image}
                    alt={advantage.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{advantage.title}</h4>
                    <p className="text-sm text-gray-500">{advantage.description}</p>
                  </div>
                  <Gift className="w-5 h-5 text-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;