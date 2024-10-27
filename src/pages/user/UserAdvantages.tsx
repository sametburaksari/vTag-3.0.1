import React, { useState } from 'react';
import { Search, Gift, ExternalLink, Ticket, Clock } from 'lucide-react';
import { UseAdvantageModal } from '../../components/corporate/modals/UseAdvantageModal';

interface Advantage {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'link' | 'coupon';
  category: string;
  expiryDate: string;
}

interface UsedAdvantage {
  id: string;
  advantageId: string;
  title: string;
  code?: string;
  usedAt: string;
  expiryDate: string;
  status: 'active' | 'expired';
}

export function UserAdvantages() {
  const [selectedAdvantage, setSelectedAdvantage] = useState<Advantage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const advantages: Advantage[] = [
    {
      id: '1',
      title: 'Premium LinkedIn Aboneliği',
      description: 'LinkedIn Premium Business aboneliğinde %20 indirim fırsatı',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=500',
      type: 'coupon',
      category: 'Profesyonel Gelişim',
      expiryDate: '2024-12-31'
    },
    {
      id: '2',
      title: 'Ücretsiz Domain',
      description: 'Yıllık .com domain kaydında %100 indirim',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500',
      type: 'link',
      category: 'Teknoloji',
      expiryDate: '2024-12-31'
    }
  ];

  const usedAdvantages: UsedAdvantage[] = [
    {
      id: '1',
      advantageId: '1',
      title: 'Premium LinkedIn Aboneliği',
      code: 'LINKEDIN20',
      usedAt: '2024-03-15',
      expiryDate: '2024-12-31',
      status: 'active'
    }
  ];

  return (
    <div className="flex gap-6">
      {/* Sol Sütun - Avantajlar */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Avantajlar</h1>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Avantaj ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {advantages.map((advantage) => (
            <div key={advantage.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={advantage.image}
                alt={advantage.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  {advantage.type === 'link' ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <Ticket className="w-4 h-4" />
                  )}
                  <span>{advantage.type === 'link' ? 'Link' : 'Kupon'}</span>
                  <span>•</span>
                  <span>{advantage.category}</span>
                </div>

                <h3 className="font-semibold mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{advantage.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Son: {advantage.expiryDate}</span>
                  </div>
                  <button
                    onClick={() => setSelectedAdvantage(advantage)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Kullan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Sütun - Kullanılan Avantajlar */}
      <div className="w-80">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold mb-4">Kullanılan Avantajlar</h2>
          <div className="space-y-4">
            {usedAdvantages.map((usedAdvantage) => (
              <div
                key={usedAdvantage.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <h3 className="font-medium">{usedAdvantage.title}</h3>
                {usedAdvantage.code && (
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-400" />
                    <code className="text-sm bg-white px-2 py-1 rounded border">
                      {usedAdvantage.code}
                    </code>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Son: {usedAdvantage.expiryDate}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    usedAdvantage.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {usedAdvantage.status === 'active' ? 'Aktif' : 'Süresi Doldu'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAdvantage && (
        <UseAdvantageModal
          advantage={selectedAdvantage}
          onClose={() => setSelectedAdvantage(null)}
        />
      )}
    </div>
  );
}