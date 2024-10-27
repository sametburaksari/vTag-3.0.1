import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface OverviewTabProps {
  metrics: {
    label: string;
    value: string;
    trend: string;
    isPositive: boolean;
  }[];
  profileViews: {
    profile: string;
    views: number;
    trend: string;
  }[];
}

export function OverviewTab({ metrics, profileViews }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Profile Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Profil Performansı</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">Profil</th>
                <th className="pb-3">Görüntülenme</th>
                <th className="pb-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {profileViews.map((profile, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3">{profile.profile}</td>
                  <td>{profile.views.toLocaleString()}</td>
                  <td className="text-green-600">{profile.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Ülke Dağılımı</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Türkiye</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Almanya</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">İngiltere</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Şehir Dağılımı</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">İstanbul</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Ankara</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">İzmir</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}