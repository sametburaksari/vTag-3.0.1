import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateProfileModalProps {
  onClose: () => void;
}

export function CreateProfileModal({ onClose }: CreateProfileModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    template: 'modern',
    users: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile creation
    console.log('Creating profile:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">Yeni Profil</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profil Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Şablon
              </label>
              <select
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="modern">vTag Modern</option>
                <option value="classic">vTag Classic</option>
                <option value="hq">vTag HQ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Erişim İzni Olan Kullanıcılar
              </label>
              <select
                multiple
                value={formData.users}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  users: Array.from(e.target.selectedOptions, option => option.value)
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="1">Ali Yılmaz</option>
                <option value="2">Ayşe Demir</option>
                <option value="3">Mehmet Kaya</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Birden fazla seçim için Ctrl/Cmd tuşunu basılı tutun
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
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