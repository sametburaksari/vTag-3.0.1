import React, { useState } from 'react';
import { Calendar, ArrowUp, ArrowDown, BarChart2, Users, Building2, Gift } from 'lucide-react';

interface TabProps {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

function Tab({ active, icon: Icon, label, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

export function Analytics() {
  const [activeTab, setActiveTab] = useState<'software' | 'corporate' | 'user'>('software');
  const [dateRange, setDateRange] = useState('30');

  const metrics = {
    software: [
      {
        label: 'Toplam Kullanıcı',
        value: '124.5K',
        trend: '+12.5%',
        isPositive: true,
      },
      {
        label: 'Aktif Kullanıcı',
        value: '98.2K',
        trend: '+8.3%',
        isPositive: true,
      },
      {
        label: 'Toplam Profil',
        value: '156.3K',
        trend: '+15.7%',
        isPositive: true,
      },
      {
        label: 'Aktif Profil',
        value: '134.8K',
        trend: '+10.2%',
        isPositive: true,
      }
    ],
    corporate: [
      {
        label: 'Toplam Firma',
        value: '1,234',
        trend: '+5.2%',
        isPositive: true,
      },
      {
        label: 'Aktif Firma',
        value: '987',
        trend: '+3.8%',
        isPositive: true,
      },
      {
        label: 'Kullanılan Lisans',
        value: '8,765',
        trend: '+12.4%',
        isPositive: true,
      },
      {
        label: 'Ortalama Kullanıcı',
        value: '8.9',
        trend: '-2.1%',
        isPositive: false,
      }
    ],
    user: [
      {
        label: 'Profil Görüntülenme',
        value: '458.2K',
        trend: '+18.5%',
        isPositive: true,
      },
      {
        label: 'Bilgi Tıklanma',
        value: '892.1K',
        trend: '+22.3%',
        isPositive: true,
      },
      {
        label: 'Rehbere Eklenme',
        value: '34.5K',
        trend: '+9.7%',
        isPositive: true,
      },
      {
        label: 'QR Tarama',
        value: '78.3K',
        trend: '+15.9%',
        isPositive: true,
      }
    ]
  };

  const getActiveMetrics = () => {
    switch (activeTab) {
      case 'software':
        return metrics.software;
      case 'corporate':
        return metrics.corporate;
      case 'user':
        return metrics.user;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Raporlar</h1>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7">Son 7 Gün</option>
            <option value="30">Son 30 Gün</option>
            <option value="90">Son 90 Gün</option>
            <option value="365">Son 1 Yıl</option>
          </select>
          <button className="flex items-center gap-2 text-gray-600 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Özel Tarih
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-4">
        <Tab
          active={activeTab === 'software'}
          icon={BarChart2}
          label="Yazılım Raporları"
          onClick={() => setActiveTab('software')}
        />
        <Tab
          active={activeTab === 'corporate'}
          icon={Building2}
          label="Kurumsal Raporlar"
          onClick={() => setActiveTab('corporate')}
        />
        <Tab
          active={activeTab === 'user'}
          icon={Users}
          label="Kullanıcı Raporları"
          onClick={() => setActiveTab('user')}
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getActiveMetrics().map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-1">{metric.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <div className={`flex items-center gap-1 text-sm ${
              metric.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.isPositive ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === 'software' && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Kullanıcı Artış Trendi</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-400">Grafik burada görüntülenecek</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Profil Oluşturma Trendi</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-400">Grafik burada görüntülenecek</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'corporate' && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Firma Kayıt Trendi</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-400">Grafik burada görüntülenecek</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Lisans Kullanım Analizi</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-400">Grafik burada görüntülenecek</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'user' && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Profil Görüntülenme Analizi</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-400">Grafik burada görüntülenecek</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Etkileşim Dağılımı</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-400">Grafik burada görüntülenecek</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          {activeTab === 'software' && 'Sistem Kullanım Detayları'}
          {activeTab === 'corporate' && 'Firma Aktivite Detayları'}
          {activeTab === 'user' && 'Kullanıcı Etkileşim Detayları'}
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {activeTab === 'software' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metrik</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Değer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Değişim</th>
                  </>
                )}
                {activeTab === 'corporate' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Firma</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktivite</th>
                  </>
                )}
                {activeTab === 'user' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profil</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Etkileşim</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detay</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">Sample Data</td>
                  <td className="px-6 py-4">Sample Data</td>
                  <td className="px-6 py-4">Sample Data</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;