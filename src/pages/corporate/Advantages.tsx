import React, { useState } from 'react';
import { Search, Gift, ExternalLink, Ticket } from 'lucide-react';

interface Advantage {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'link' | 'coupon';
  category: string;
  usageCount: number;
  remainingCoupons?: number;
  expiryDate: string;
}

export function Advantages() {
  const [advantages] = useState<Advantage[]>([
    {
      id: '1',
      title: 'Premium LinkedIn Aboneliği',
      description: 'LinkedIn Premium Business aboneliğinde %20 indirim fırsatı',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=500',
      type: 'coupon',
      category: 'Profesyonel Gelişim',
      usageCount: 234,
      remainingCoupons: 766,
      expiryDate: '2024-12-31'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Avantajlar</h1>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Avantaj ara..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Advantages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{advantage.usageCount} kullanım</span>
                {advantage.remainingCoupons && (
                  <span>{advantage.remainingCoupons} kupon kaldı</span>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <span>Son Kullanım: {advantage.expiryDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advantages;