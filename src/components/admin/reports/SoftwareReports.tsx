import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SoftwareReportsProps {
  dateRange: string;
}

export function SoftwareReports({ dateRange }: SoftwareReportsProps) {
  const metrics = [
    {
      label: 'Toplam Kullanıcı',
      value: '12,543',
      trend: '+12.5%',
      isPositive: true,
    },
    {
      label: 'Aktif Kullanıcı',
      value: '8,234',
      trend: '+8.3%',
      isPositive: true,
    },
    {
      label: 'Toplam Profil',
      value: '15,678',
      trend: '+15.7%',
      isPositive: true,
    },
    {
      label: 'Aktif Profil',
      value: '11,234',
      trend: '-2.1%',
      isPositive: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
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

      {/* System Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Sistem Performansı</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Ortalama Yanıt Süresi</span>
              <span className="text-sm font-medium">245ms</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Başarılı İstek Oranı</span>
              <span className="text-sm font-medium">99.9%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">CPU Kullanımı</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Bellek Kullanımı</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Tracking */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Hata Takibi</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Hata Tipi</th>
                <th className="pb-3">Sayı</th>
                <th className="pb-3">Son Görülme</th>
                <th className="pb-3">Durum</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="py-3">API Gateway Timeout</td>
                <td>23</td>
                <td>2 saat önce</td>
                <td><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">İnceleniyor</span></td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Database Connection Error</td>
                <td>12</td>
                <td>5 saat önce</td>
                <td><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Kritik</span></td>
              </tr>
              <tr className="border-t">
                <td className="py-3">File Upload Failed</td>
                <td>45</td>
                <td>1 gün önce</td>
                <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Çözüldü</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}