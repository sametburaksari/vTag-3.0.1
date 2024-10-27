import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface UserReportsProps {
  dateRange: string;
}

export function UserReports({ dateRange }: UserReportsProps) {
  const metrics = [
    {
      label: 'Profil Görüntülenme',
      value: '124.5K',
      trend: '+12.5%',
      isPositive: true,
    },
    {
      label: 'Rehbere Eklenme',
      value: '3,234',
      trend: '+8.3%',
      isPositive: true,
    },
    {
      label: 'QR Tarama',
      value: '8,567',
      trend: '+15.7%',
      isPositive: true,
    },
    {
      label: 'Bilgi Tıklanma',
      value: '45.2K',
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

      {/* Profile Analytics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Kategori Etkileşimleri</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">İletişim Bilgileri</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Sosyal Medya</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Firma Bilgileri</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Cihaz Dağılımı</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Mobil</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Masaüstü</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Tablet</span>
                <span className="text-sm font-medium">5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Data */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Ülke Dağılımı</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Türkiye</span>
              </div>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Almanya</span>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">İngiltere</span>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Diğer</span>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Şehir Dağılımı (Türkiye)</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">İstanbul</span>
              </div>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ankara</span>
              </div>
              <span className="text-sm font-medium">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">İzmir</span>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Diğer</span>
              </div>
              <span className="text-sm font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Etkileşim Detayları</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Bilgi Tipi</th>
                <th className="pb-3">Görüntülenme</th>
                <th className="pb-3">Tıklanma</th>
                <th className="pb-3">Dönüşüm Oranı</th>
                <th className="pb-3">Rehbere Eklenme</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="py-3">Telefon</td>
                <td>12,345</td>
                <td>8,234</td>
                <td>67%</td>
                <td>2,345</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">E-posta</td>
                <td>10,234</td>
                <td>6,123</td>
                <td>59%</td>
                <td>1,890</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">LinkedIn</td>
                <td>8,567</td>
                <td>5,678</td>
                <td>66%</td>
                <td>1,234</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Website</td>
                <td>7,890</td>
                <td>4,567</td>
                <td>58%</td>
                <td>890</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}