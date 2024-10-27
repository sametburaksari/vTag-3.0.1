import React, { useState } from 'react';
import { Calendar, ArrowUp, ArrowDown, Eye, UserPlus, QrCode, Share2 } from 'lucide-react';

export function UserReports() {
  const [dateRange, setDateRange] = useState('30');

  // Hızlı istatistikler
  const quickStats = [
    { label: 'Profil Görüntülenme', value: '1,234', trend: '+12.5%', isPositive: true, icon: Eye },
    { label: 'Rehbere Eklenme', value: '856', trend: '+8.3%', isPositive: true, icon: UserPlus },
    { label: 'QR Tarama', value: '567', trend: '+15.7%', isPositive: true, icon: QrCode },
    { label: 'Bağlantı Paylaşımı', value: '234', trend: '-2.1%', isPositive: false, icon: Share2 }
  ];

  // Günlük etkileşimler
  const dailyInteractions = [
    { date: '20 Mart', views: 45, saves: 12, scans: 8 },
    { date: '21 Mart', views: 52, saves: 15, scans: 10 },
    { date: '22 Mart', views: 38, saves: 8, scans: 5 },
    { date: '23 Mart', views: 65, saves: 20, scans: 15 },
    { date: '24 Mart', views: 48, saves: 14, scans: 9 }
  ];

  // Coğrafi dağılım
  const geoDistribution = [
    { city: 'İstanbul', percentage: 45 },
    { city: 'Ankara', percentage: 25 },
    { city: 'İzmir', percentage: 15 },
    { city: 'Diğer', percentage: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Başlık ve Tarih Seçici */}
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
          </select>
          <button className="flex items-center gap-2 text-gray-600 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Özel Tarih
          </button>
        </div>
      </div>

      {/* Hızlı İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isPositive ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.trend}</span>
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Günlük Etkileşimler ve Coğrafi Dağılım */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Günlük Etkileşimler */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Günlük Etkileşimler</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Tarih</th>
                  <th className="pb-3">Görüntülenme</th>
                  <th className="pb-3">Kaydetme</th>
                  <th className="pb-3">QR Tarama</th>
                </tr>
              </thead>
              <tbody>
                {dailyInteractions.map((day, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3">{day.date}</td>
                    <td>{day.views}</td>
                    <td>{day.saves}</td>
                    <td>{day.scans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coğrafi Dağılım */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Coğrafi Dağılım</h2>
          <div className="space-y-4">
            {geoDistribution.map((city, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{city.city}</span>
                  <span className="text-sm font-medium">{city.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${city.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}