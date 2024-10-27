import React, { useState } from 'react';
import { X, Upload, Building2, AlertTriangle } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  totalLicenses: number;
  contractEndDate: string;
  status: 'active' | 'inactive';
}

interface EditCompanyModalProps {
  company: Company;
  onClose: () => void;
}

export function EditCompanyModal({ company, onClose }: EditCompanyModalProps) {
  const [formData, setFormData] = useState({
    name: company.name,
    industry: company.industry,
    totalLicenses: company.totalLicenses.toString(),
    contractEndDate: company.contractEndDate,
    status: company.status,
    logo: null as File | null,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('Logo dosyası 2MB\'dan küçük olmalıdır.');
        return;
      }
      setFormData({ ...formData, logo: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle company update
    console.log('Updating company:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Firma Düzenle</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firma Adı
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
                  Sektör
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="technology">Teknoloji</option>
                  <option value="finance">Finans</option>
                  <option value="manufacturing">Üretim</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lisans Sayısı
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalLicenses}
                    onChange={(e) => setFormData({ ...formData, totalLicenses: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sözleşme Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.contractEndDate}
                    onChange={(e) => setFormData({ ...formData, contractEndDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durum
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firma Logosu
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="mx-auto h-20 w-20 rounded-lg object-cover"
                      />
                    ) : (
                      <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Logo Değiştir</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (max. 2MB)
                    </p>
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
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}