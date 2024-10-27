import React, { useState } from 'react';
import { Calendar, ArrowUp, ArrowDown, Users, Building2, UserCircle, Gift } from 'lucide-react';
import { SoftwareReports } from '../../components/admin/reports/SoftwareReports';
import { CorporateReports } from '../../components/admin/reports/CorporateReports';
import { UserReports } from '../../components/admin/reports/UserReports';
import { AdvantageReports } from '../../components/admin/reports/AdvantageReports';

type TabType = 'software' | 'corporate' | 'user' | 'advantage';

export function Reports() {
  const [activeTab, setActiveTab] = useState<TabType>('software');
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
        value: '156.7K',
        trend: '+15.2%',
        isPositive: true,
      },
      {
        label: 'Aktif Profil',
        value: '142.3K',
        trend: '+11.7%',
        isPositive: true,
      }
    ],
    corporate: [
      {
        label: 'Toplam Firma',
        value: '1,234',
        trend: '+5.5%',
        isPositive: true,
      },
      {
        label: 'Aktif Firma',
        value: '1,156',
        trend: '+3.3%',
        isPositive: true,
      },
      {
        label: 'Kullanılan Lisans',
        value: '8,234',
        trend: '+12.7%',
        isPositive: true,
      },
      {
        label: 'Ortalama Kullanım',
        value: '89%',
        trend: '+2.1%',
        isPositive: true,
      }
    ],
    user: [
      {
        label: 'Toplam Görüntülenme',
        value: '458.2K',
        trend: '+18.5%',
        isPositive: true,
      },
      {
        label: 'Ortalama Etkileşim',
        value: '2m 34s',
        trend: '+8.3%',
        isPositive: true,
      },
      {
        label: 'Rehbere Eklenme',
        value: '12.4K',
        trend: '+22.1%',
        isPositive: true,
      },
      {
        label: 'QR Tarama',
        value: '34.6K',
        trend: '+15.7%',
        isPositive: true,
      }
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
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
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b px-4">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('software')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'software'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              Yazılım Raporları
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'corporate'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Kurumsal Raporlar
            </button>
            <button
              onClick={() => setActiveTab('user')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'user'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              Kullanıcı Raporları
            </button>
          </nav>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics[activeTab].map((metric, index) => (
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

      {/* Tab Content */}
      {activeTab === 'software' && <SoftwareReports dateRange={dateRange} />}
      {activeTab === 'corporate' && <CorporateReports dateRange={dateRange} />}
      {activeTab === 'user' && <UserReports dateRange={dateRange} />}
    </div>
  );
}