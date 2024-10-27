import React, { useState } from 'react';
import { Calendar, ArrowUp, ArrowDown, BarChart2, Users, UserCircle, Gift, FileText, Share2 } from 'lucide-react';
import { DateRangeModal } from '../../components/corporate/modals/DateRangeModal';

type TabType = 'overview' | 'profiles' | 'users' | 'interactions' | 'categories' | 'info';

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

export function Reports() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [dateRange, setDateRange] = useState('30');
  const [showDateModal, setShowDateModal] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<{start: string; end: string} | null>(null);

  // Kategori Dağılımı
  const categoryDistribution = [
    { category: 'Profesyonel Gelişim', count: 156, percentage: 35 },
    { category: 'Teknoloji', count: 134, percentage: 30 },
    { category: 'Eğitim', count: 89, percentage: 20 },
    { category: 'Diğer', count: 67, percentage: 15 }
  ];

  // Bilgi Kullanımı
  const infoUsage = [
    { type: 'İletişim Bilgileri', views: 12345, usage: 78 },
    { type: 'Sosyal Medya', views: 8765, usage: 65 },
    { type: 'Firma Bilgileri', views: 6543, usage: 45 },
    { type: 'Özel Alanlar', views: 3456, usage: 32 }
  ];

  const handleDateRangeApply = (startDate: string, endDate: string) => {
    setCustomDateRange({ start: startDate, end: endDate });
    setDateRange('custom');
    setShowDateModal(false);
  };

  const getDateRangeText = () => {
    if (dateRange === 'custom' && customDateRange) {
      return `${customDateRange.start} - ${customDateRange.end}`;
    }
    return `Son ${dateRange} Gün`;
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
            {customDateRange && <option value="custom">{getDateRangeText()}</option>}
          </select>
          <button 
            onClick={() => setShowDateModal(true)}
            className="flex items-center gap-2 text-gray-600 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Calendar className="w-4 h-4" />
            Özel Tarih
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-4 overflow-x-auto">
        <Tab
          active={activeTab === 'overview'}
          icon={BarChart2}
          label="Genel Bakış"
          onClick={() => setActiveTab('overview')}
        />
        <Tab
          active={activeTab === 'profiles'}
          icon={UserCircle}
          label="Profil Analizleri"
          onClick={() => setActiveTab('profiles')}
        />
        <Tab
          active={activeTab === 'users'}
          icon={Users}
          label="Kullanıcı Aktiviteleri"
          onClick={() => setActiveTab('users')}
        />
        <Tab
          active={activeTab === 'categories'}
          icon={FileText}
          label="Kategori Dağılımı"
          onClick={() => setActiveTab('categories')}
        />
        <Tab
          active={activeTab === 'info'}
          icon={Share2}
          label="Bilgi Kullanımı"
          onClick={() => setActiveTab('info')}
        />
      </div>

      {/* Category Distribution */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Kategori Dağılımı</h2>
            <div className="space-y-6">
              {categoryDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-gray-500 ml-2">{item.count} profil</span>
                    </div>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">En Aktif Kategoriler</h2>
              <div className="space-y-4">
                {categoryDistribution.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{item.category}</div>
                      <div className="text-sm text-gray-500">{item.count} profil</div>
                    </div>
                    <div className="text-green-600">+{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Kategori Etkileşimleri</h2>
              <div className="space-y-4">
                {categoryDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.category}</div>
                      <div className="text-xs text-gray-500">{item.count} etkileşim</div>
                    </div>
                    <div className="text-sm font-medium">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Usage */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Bilgi Kullanım Analizi</h2>
            <div className="space-y-6">
              {infoUsage.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{item.type}</span>
                      <span className="text-sm text-gray-500 ml-2">{item.views} görüntülenme</span>
                    </div>
                    <span className="text-sm font-medium">{item.usage}% kullanım</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${item.usage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">En Çok Görüntülenen Bilgiler</h2>
              <div className="space-y-4">
                {infoUsage.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{item.type}</div>
                      <div className="text-sm text-gray-500">{item.views} görüntülenme</div>
                    </div>
                    <div className="text-green-600">+{item.usage}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Bilgi Etkileşim Oranları</h2>
              <div className="space-y-4">
                {infoUsage.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.type}</div>
                      <div className="text-xs text-gray-500">{item.views} etkileşim</div>
                    </div>
                    <div className="text-sm font-medium">{item.usage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Range Modal */}
      {showDateModal && (
        <DateRangeModal
          onClose={() => setShowDateModal(false)}
          onApply={handleDateRangeApply}
        />
      )}
    </div>
  );
}