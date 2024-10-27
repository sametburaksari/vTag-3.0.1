import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Phone, Mail, Globe, MapPin, Facebook, Twitter, Instagram, Linkedin, Building2, FileText } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  icon: string;
  status: 'active' | 'inactive';
}

interface Field {
  id: string;
  categoryId: string;
  title: string;
  icon: any;
  type: string;
  status: 'active' | 'inactive';
}

export function ProfileDetails() {
  const [categories] = useState<Category[]>([
    {
      id: '1',
      title: 'Kartvizit Bilgileri',
      icon: 'contact',
      status: 'active'
    },
    {
      id: '2',
      title: 'Sosyal Profiller',
      icon: 'social',
      status: 'active'
    },
    {
      id: '3',
      title: 'Firma Bilgileri',
      icon: 'company',
      status: 'active'
    }
  ]);

  const [fields] = useState<Field[]>([
    // Kartvizit Bilgileri
    { id: '1', categoryId: '1', title: 'Cep Telefonu', icon: Phone, type: 'phone', status: 'active' },
    { id: '2', categoryId: '1', title: 'İş Telefonu', icon: Phone, type: 'phone', status: 'active' },
    { id: '3', categoryId: '1', title: 'E-Posta Adresi', icon: Mail, type: 'email', status: 'active' },
    { id: '4', categoryId: '1', title: 'Web Sitesi', icon: Globe, type: 'url', status: 'active' },
    { id: '5', categoryId: '1', title: 'Adres', icon: MapPin, type: 'text', status: 'active' },
    
    // Sosyal Profiller
    { id: '6', categoryId: '2', title: 'Facebook', icon: Facebook, type: 'url', status: 'active' },
    { id: '7', categoryId: '2', title: 'X', icon: Twitter, type: 'url', status: 'active' },
    { id: '8', categoryId: '2', title: 'Instagram', icon: Instagram, type: 'url', status: 'active' },
    { id: '9', categoryId: '2', title: 'LinkedIn', icon: Linkedin, type: 'url', status: 'active' },
    
    // Firma Bilgileri
    { id: '10', categoryId: '3', title: 'Firma Unvanı', icon: Building2, type: 'text', status: 'active' },
    { id: '11', categoryId: '3', title: 'Vergi Dairesi', icon: FileText, type: 'text', status: 'active' },
    { id: '12', categoryId: '3', title: 'Vergi Numarası', icon: FileText, type: 'text', status: 'active' },
    { id: '13', categoryId: '3', title: 'Firma Telefonu', icon: Phone, type: 'phone', status: 'active' },
    { id: '14', categoryId: '3', title: 'Firma E-Posta', icon: Mail, type: 'email', status: 'active' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profil Detayları</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Kategori
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Category Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{category.title}</h3>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-indigo-600 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Alan Ekle
              </button>
            </div>

            {/* Fields List */}
            <div className="divide-y divide-gray-200">
              {fields
                .filter((field) => field.categoryId === category.id)
                .map((field) => (
                  <div key={field.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <field.icon className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{field.title}</p>
                          <p className="text-sm text-gray-500">{field.type}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-indigo-600 rounded">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}