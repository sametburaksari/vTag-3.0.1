import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { ProfileData } from '../../types/profile';

interface ClassicProfileProps {
  data: ProfileData;
}

export function ClassicProfile({ data }: ClassicProfileProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Kategorileri oluştur
  const categories = [
    {
      id: 'contact',
      title: 'İletişim',
      fields: data.contacts.filter(c => ['phone', 'email'].includes(c.type))
    },
    {
      id: 'social',
      title: 'Sosyal',
      fields: data.contacts.filter(c => ['linkedin', 'twitter', 'instagram'].includes(c.type))
    },
    {
      id: 'company',
      title: 'Firma',
      fields: data.contacts.filter(c => ['website'].includes(c.type))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <img src="/vtag-black.svg" alt="vTag" className="h-8" />
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex flex-row-reverse items-start justify-between gap-8">
          <img
            src={data.avatar}
            alt={data.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h1>
            <p className="text-gray-600 mb-1">{data.company}</p>
            <p className="text-gray-500">{data.title}</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="aspect-square bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center justify-center"
            >
              <span className="font-medium text-gray-900">{category.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setSelectedCategory(null)}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b flex flex-col items-center">
              <div className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
              <div className="w-full flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {categories.find(c => c.id === selectedCategory)?.title}
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
              {categories
                .find(c => c.id === selectedCategory)
                ?.fields.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <contact.icon className="w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">{contact.label}</p>
                      <p className="text-gray-900">{contact.value}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}