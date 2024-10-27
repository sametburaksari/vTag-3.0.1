import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CompanySearchInput } from './CompanySearchInput';

interface Company {
  id: string;
  name: string;
  industry: string;
}

interface CreateUserModalProps {
  onClose: () => void;
}

export function CreateUserModal({ onClose }: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    type: 'individual',
    plan: 'free',
    company: null as Company | null,
    password: '',
    expiryDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation
    console.log('Creating user:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Yeni Kullanıcı</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kullanıcı Türü
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="individual">Bireysel</option>
                  <option value="team">Ekip</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Abonelik Paketi
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="free">Ücretsiz</option>
                  <option value="standard">Standart</option>
                  <option value="pro">Pro+</option>
                </select>
              </div>
            </div>

            {formData.type === 'team' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket
                </label>
                <CompanySearchInput
                  value={formData.company?.name || ''}
                  onChange={(company) => setFormData({ ...formData, company })}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Son Kullanım Tarihi
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}