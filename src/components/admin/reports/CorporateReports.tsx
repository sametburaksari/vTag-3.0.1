import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CorporateReportsProps {
  dateRange: string;
}

export function CorporateReports({ dateRange }: CorporateReportsProps) {
  const metrics = [
    {
      label: 'Toplam Firma',
      value: '234',
      trend: '+5.2%',
      isPositive: true,
    },
    {
      label: 'Aktif Lisans',
      value: '1,543',
      trend: '+8.3%',
      isPositive: true,
    },
    {
      label: 'Ortalama Kullanıcı',
      value: '12.4',
      trend: '+3.7%',
      isPositive: true,
    },
    {
      label: 'Yenileme Oranı',
      value: '94%',
      trend: '-1.2%',
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

      {/* License Usage */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Lisans Kullanımı</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Firma</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Kullanılan/Toplam</th>
                <th className="pb-3">Kullanım Oranı</th>
                <th className="pb-3">Son Yenileme</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="py-3">Tech Solutions A.Ş.</td>
                <td>Enterprise</td>
                <td>45/50</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span>90%</span>
                  </div>
                </td>
                <td>2024-01-15</td>
              </tr>
              <tr className="border-t">
                <td className="py-3">Global Finance Ltd.</td>
                <td>Pro</td>
                <td>18/20</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span>90%</span>
                  </div>
                </td>
                <td>2024-02-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Industry Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Sektör Dağılımı</h2>
          <div className="space-y-4">
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
                <span className="text-sm text-gray-600">Finans</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Üretim</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Diğer</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Plan Dağılımı</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Enterprise</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Pro</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Standard</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}