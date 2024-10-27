import React from 'react';
import { Users, Building2, UserCircle, Gift, CreditCard, Eye, TrendingUp, AlertTriangle, Globe, Bell, ChevronRight } from 'lucide-react';

export function Dashboard() {
  // Quick Stats
  const quickStats = [
    { label: 'Toplam Kullanıcı', value: '12,543', trend: '+12%', icon: Users, color: 'blue' },
    { label: 'Aktif Profil', value: '15,678', trend: '+24%', icon: UserCircle, color: 'indigo' },
    { label: 'Toplam Firma', value: '234', trend: '+5%', icon: Building2, color: 'purple' },
    { label: 'Aylık Gelir', value: '₺124,500', trend: '+18%', icon: CreditCard, color: 'green' },
  ];

  // System Health
  const systemHealth = [
    { label: 'CPU Kullanımı', value: '45%', status: 'normal' },
    { label: 'Bellek Kullanımı', value: '65%', status: 'warning' },
    { label: 'Disk Kullanımı', value: '35%', status: 'normal' },
    { label: 'Sistem Yükü', value: '2.4', status: 'normal' },
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: '1',
      type: 'user',
      title: 'Yeni Kullanıcı Kaydı',
      description: 'Ali Yılmaz sisteme kaydoldu',
      time: '2 dakika önce',
      status: 'success'
    },
    {
      id: '2',
      type: 'company',
      title: 'Firma Planı Yükseltildi',
      description: 'Tech Solutions A.Ş. Enterprise plana yükseldi',
      time: '15 dakika önce',
      status: 'success'
    },
    {
      id: '3',
      type: 'system',
      title: 'Sistem Uyarısı',
      description: 'Yüksek CPU kullanımı tespit edildi',
      time: '1 saat önce',
      status: 'warning'
    }
  ];

  // Active Users by Platform
  const platformStats = [
    { platform: 'Web', users: 5234, percentage: 45 },
    { platform: 'iOS', users: 3456, percentage: 30 },
    { platform: 'Android', users: 2890, percentage: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* System Alerts */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800">Sistem Uyarıları</h4>
          <p className="text-sm text-amber-700 mt-1">
            Bellek kullanımı %65 seviyesine ulaştı. Sistem performansı etkilenebilir.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sistem Durumu</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              Detaylı Rapor
            </button>
          </div>
          <div className="space-y-4">
            {systemHealth.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className={`text-sm font-medium ${
                    metric.status === 'warning' ? 'text-amber-600' : 'text-gray-900'
                  }`}>{metric.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: metric.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Platform Kullanımı</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">
              Tüm İstatistikler
            </button>
          </div>
          <div className="space-y-6">
            {platformStats.map((platform, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium">{platform.platform}</span>
                    <span className="text-sm text-gray-500 ml-2">{platform.users.toLocaleString()} kullanıcı</span>
                  </div>
                  <span className="text-sm font-medium">{platform.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${platform.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Son Aktiviteler</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Tümünü Gör
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {activity.type === 'user' && <Users className="w-5 h-5 text-green-600" />}
                    {activity.type === 'company' && <Building2 className="w-5 h-5 text-green-600" />}
                    {activity.type === 'system' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Hızlı İşlemler</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Yeni Kullanıcı</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Firma Ekle</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Alan Adı Ekle</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Duyuru Oluştur</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}