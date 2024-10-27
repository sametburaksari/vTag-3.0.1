import React, { useState } from 'react';
import { X, Upload, Building2, AlertTriangle, RefreshCw } from 'lucide-react';

interface CreateCompanyModalProps {
  onClose: () => void;
}

interface CompanyFormData {
  // Company Info
  name: string;
  industry: string;
  totalLicenses: string;
  contractEndDate: string;
  logo: File | null;
  // Admin Info
  adminName: string;
  adminUsername: string;
  adminEmail: string;
  adminPassword: string;
}

export function CreateCompanyModal({ onClose }: CreateCompanyModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    industry: '',
    totalLicenses: '',
    contractEndDate: '',
    logo: null,
    adminName: '',
    adminUsername: '',
    adminEmail: '',
    adminPassword: '',
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo dosyası 2MB\'dan küçük olmalıdır.');
        return;
      }
      setFormData({ ...formData, logo: file });
    }
  };

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, adminPassword: password });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle company creation
      console.log('Creating company:', formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">Yeni Firma Ekle</h3>
            <p className="text-sm text-gray-500">Adım {step}/2</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          {step === 1 ? (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-base font-medium mb-4">Firma Bilgileri</h4>
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
                      Firma Logosu
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Logo Yükle</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleLogoChange}
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
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-base font-medium mb-4">Firma Yöneticisi</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
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
                      value={formData.adminUsername}
                      onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.adminPassword}
                        onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={generatePassword}
                        className="px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Firma yöneticisi olarak belirlenen kişiye giriş bilgileri otomatik olarak e-posta ile gönderilecektir.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 p-4 border-t">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Geri
              </button>
            )}
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
              {step === 1 ? 'Devam Et' : 'Firma Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}