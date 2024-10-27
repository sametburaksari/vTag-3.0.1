import React from 'react';
import { Calendar } from 'lucide-react';

interface AdvantageCardProps {
  advantage: {
    id: string;
    title: string;
    description: string;
    image: string;
    expiryDate: string;
  };
}

export function AdvantageCard({ advantage }: AdvantageCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={advantage.image}
        alt={advantage.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-1">{advantage.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{advantage.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Son Kullanım: {advantage.expiryDate}</span>
        </div>
        <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Kullan
        </button>
      </div>
    </div>
  );
}