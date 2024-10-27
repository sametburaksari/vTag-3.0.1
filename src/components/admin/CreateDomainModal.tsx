import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface CreateDomainModalProps {
  onClose: () => void;
}

export function CreateDomainModal({ onClose }: CreateDomainModalProps) {
  const [formData, setFormData] = useState({
    domain: '',
    profileId: '',
    companyId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle domain creation
    console.log('Creating domain:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Yeni Alan Adı</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alan Adı
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="ornek.sirketim.com"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil
                </label>
                <select
                  value={formData.profileId}
                  onChange={(e) => setFormData({ ...formData, profileId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Profil Seçin</option>
                  <option value="1">Kurumsal Profil</option>
                  <option value="2">Satış Ekibi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firma
                </label>
                <select
                  value={formData.companyId}
                  onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Firma Seçin</option>
                  <option value="1">Tech Solutions A.Ş.</option>
                  <option value="2">Global Finance Ltd.</option>
                </select>
              </div>
            </div>

            {/* DNS Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">DNS Ayarları</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Alan adınızı yönlendirmek için aşağıdaki A kaydını DNS yöneticinize eklemelisiniz:
                  </p>
                  <div className="mt-2 bg-white p-3 rounded-lg">
                    <code className="text-sm">
                      <span className="text-gray-500">Host:</span> <span className="text-indigo-600">@</span>
                      <span className="mx-4 text-gray-500">IP:</span> <span className="text-indigo-600">45.158.57.25</span>
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t">
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
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}