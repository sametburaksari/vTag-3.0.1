import React from 'react';
import { Users, Building2, UserCircle, Gift, CreditCard, Eye, TrendingUp, AlertTriangle, Bell, ChevronRight } from 'lucide-react';

export function Dashboard() {
  // Quick Stats
  const quickStats = [
    { label: 'Toplam Kullanıcı', value: '45', trend: '+12%', icon: Users, color: 'blue' },
    { label: 'Aktif Profil', value: '12', trend: '+24%', icon: UserCircle, color: 'indigo' },
    { label: 'Kullanılan Lisans', value: '42/50', trend: '+5%', icon: Building2, color: 'purple' },
    { label: 'Aktif Avantaj', value: '8', trend: '+18%', icon: Gift, color: 'green' },
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: '1',
      type: 'user',
      title: 'Yeni Kullanıcı Eklendi',
      description: 'Ali Yılmaz sisteme eklendi',
      time: '2 dakika önce',
      status: 'success'
    },
    {
      id: '2',
      type: 'profile',
      title: 'Profil Güncellendi',
      description: 'Satış Ekibi profili güncellendi',
      time: '15 dakika önce',
      status: 'success'
    },
    {
      id: '3',
      type: 'system',
      title: 'Lisans Uyarısı',
      description: 'Lisans limitine yaklaşıldı (42/50)',
      time: '1 saat önce',
      status: 'warning'
    }
  ];

  // Active Users by Platform
  const platformStats = [
    { platform: 'Web', users: 25, percentage: 45 },
    { platform: 'iOS', users: 12, percentage: 30 },
    { platform: 'Android', users: 8, percentage: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* System Alerts */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800">Lisans Uyarısı</h4>
          <p className="text-sm text-amber-700 mt-1">
            Lisans limitine yaklaşıldı (42/50). İhtiyaç halinde yeni lisans satın alabilirsiniz.
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
                    {activity.type === 'profile' && <UserCircle className="w-5 h-5 text-green-600" />}
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
                <UserCircle className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Profil Oluştur</span>
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

      {/* Platform Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Platform Kullanımı</h2>
        <div className="space-y-6">
          {platformStats.map((platform, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-medium">{platform.platform}</span>
                  <span className="text-sm text-gray-500 ml-2">{platform.users} kullanıcı</span>
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
  );
}

export default Dashboard;