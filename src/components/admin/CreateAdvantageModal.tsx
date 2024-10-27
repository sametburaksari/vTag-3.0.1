import React, { useState } from 'react';
import { X, Upload, AlertTriangle } from 'lucide-react';
import { CompanySearchInput } from './CompanySearchInput';

interface Company {
  id: string;
  name: string;
}

interface CreateAdvantageModalProps {
  onClose: () => void;
}

export function CreateAdvantageModal({ onClose }: CreateAdvantageModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null,
    type: 'link',
    category: '',
    companies: [] as Company[],
    expiryDate: '',
    coupons: null as File | null,
    link: '',
    status: 'active'
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Görsel 2MB\'dan küçük olmalıdır.');
        return;
      }
      setFormData({ ...formData, image: file });
    }
  };

  const handleCouponsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, coupons: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle advantage creation
    console.log('Creating advantage:', formData);
    onClose();
  };

  const handleCompanyAdd = (company: Company) => {
    if (!formData.companies.find(c => c.id === company.id)) {
      setFormData({
        ...formData,
        companies: [...formData.companies, company]
      });
    }
  };

  const handleCompanyRemove = (companyId: string) => {
    setFormData({
      ...formData,
      companies: formData.companies.filter(c => c.id !== companyId)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Yeni Avantaj</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avantaj Adı
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Görsel
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {formData.image ? (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="mx-auto h-32 w-auto rounded"
                      />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Görsel Yükle</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">veya sürükleyip bırakın</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (max. 2MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avantaj Türü
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="link">Link</option>
                    <option value="coupon">Kupon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="professional">Profesyonel Gelişim</option>
                    <option value="technology">Teknoloji</option>
                    <option value="education">Eğitim</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firmalar
                </label>
                <CompanySearchInput
                  value=""
                  onChange={handleCompanyAdd}
                />
                {formData.companies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.companies.map((company) => (
                      <span
                        key={company.id}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {company.name}
                        <button
                          type="button"
                          onClick={() => handleCompanyRemove(company.id)}
                          className="p-0.5 hover:bg-gray-200 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {formData.type === 'link' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kuponlar
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>CSV Dosyası Yükle</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".csv"
                            onChange={handleCouponsChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        Her satırda bir kupon kodu olmalıdır
                      </p>
                      <button
                        type="button"
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Örnek Şablonu İndir
                      </button>
                    </div>
                  </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durum
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </select>
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
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}