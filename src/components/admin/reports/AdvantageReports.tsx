import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface AdvantageReportsProps {
  dateRange: string;
}

export function AdvantageReports({ dateRange }: AdvantageReportsProps) {
  const metrics = [
    {
      label: 'Toplam Avantaj',
      value: '156',
      trend: '+12.5%',
      isPositive: true,
    },
    {
      label: 'Aktif Avantaj',
      value: '124',
      trend: '+8.3%',
      isPositive: true,
    },
    {
      label: 'Toplam Kullanım',
      value: '12.4K',
      trend: '+15.7%',
      isPositive: true,
    },
    {
      label: 'Kupon Dönüşüm',
      value: '67%',
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

      {/* Category Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Kategori Dağılımı</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Profesyonel Gelişim</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Teknoloji</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Eğitim</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Tür Dağılımı</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Link</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Kupon</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Advantages */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Popüler Avantajlar</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Avantaj</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Tür</th>
                <th className="pb-3">Görüntülenme</th>
                <th className="pb-3">Kullanım</th>
                <th className="pb-3">Dönüşüm</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="py-3">Premium LinkedIn Aboneliği</td>
                <td>Profesyonel Gelişim</td>
                <td>Kupon</td>
                <td>12,345</td>
                <td>8,234</td>
                <td>67%</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Ücretsiz Domain</td>
                <td>Teknoloji</td>
                <td>Link</td>
                <td>10,234</td>
                <td>6,123</td>
                <td>59%</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Online Eğitim Paketi</td>
                <td>Eğitim</td>
                <td>Kupon</td>
                <td>8,567</td>
                <td>5,678</td>
                <td>66%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Firma Bazlı Kullanım</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Firma</th>
                <th className="pb-3">Aktif Avantaj</th>
                <th className="pb-3">Toplam Kullanım</th>
                <th className="pb-3">Ortalama Dönüşüm</th>
                <th className="pb-3">En Popüler Kategori</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="py-3">Tech Solutions A.Ş.</td>
                <td>12</td>
                <td>2,345</td>
                <td>72%</td>
                <td>Teknoloji</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Global Finance Ltd.</td>
                <td>8</td>
                <td>1,890</td>
                <td>65%</td>
                <td>Profesyonel Gelişim</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Education First</td>
                <td>6</td>
                <td>1,234</td>
                <td>58%</td>
                <td>Eğitim</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}