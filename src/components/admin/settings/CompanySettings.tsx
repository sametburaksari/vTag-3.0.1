import React, { useState } from 'react';

interface CompanySettingsData {
  allowCompanyRegistration: boolean;
  requireCompanyVerification: boolean;
  defaultLicenseCount: number;
  defaultTrialDays: number;
  allowDomainRegistration: boolean;
  maxDomainsPerCompany: number;
  maxUsersPerCompany: number;
  allowBulkUserImport: boolean;
  requireCompanyLogo: boolean;
  allowCustomBranding: boolean;
}

export function CompanySettings() {
  const [formData, setFormData] = useState<CompanySettingsData>({
    allowCompanyRegistration: true,
    requireCompanyVerification: true,
    defaultLicenseCount: 5,
    defaultTrialDays: 14,
    allowDomainRegistration: true,
    maxDomainsPerCompany: 3,
    maxUsersPerCompany: 50,
    allowBulkUserImport: true,
    requireCompanyLogo: true,
    allowCustomBranding: false
  });

  return (
    <div className="p-6 space-y-8">
      {/* Registration Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Firma Kayıt Ayarları</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Açık Firma Kaydı</label>
              <p className="text-sm text-gray-500">
                Firmaların kendi kendilerine kayıt olmasına izin ver
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowCompanyRegistration}
                onChange={(e) => setFormData({ ...formData, allowCompanyRegistration: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Firma Doğrulama</label>
              <p className="text-sm text-gray-500">
                Yeni firma kayıtları için doğrulama zorunlu olsun
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requireCompanyVerification}
                onChange={(e) => setFormData({ ...formData, requireCompanyVerification: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Varsayılan Lisans Sayısı
            </label>
            <input
              type="number"
              min="1"
              value={formData.defaultLicenseCount}
              onChange={(e) => setFormData({ ...formData, defaultLicenseCount: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deneme Süresi (gün)
            </label>
            <input
              type="number"
              min="0"
              value={formData.defaultTrialDays}
              onChange={(e) => setFormData({ ...formData, defaultTrialDays: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Domain Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Alan Adı Ayarları</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Alan Adı Kaydı</label>
              <p className="text-sm text-gray-500">
                Firmaların özel alan adı eklemesine izin ver
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowDomainRegistration}
                onChange={(e) => setFormData({ ...formData, allowDomainRegistration: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firma Başına Maksimum Alan Adı
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxDomainsPerCompany}
              onChange={(e) => setFormData({ ...formData, maxDomainsPerCompany: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* User Management Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kullanıcı Yönetimi</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firma Başına Maksimum Kullanıcı
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxUsersPerCompany}
              onChange={(e) => setFormData({ ...formData, maxUsersPerCompany: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Toplu Kullanıcı İçe Aktarma</label>
              <p className="text-sm text-gray-500">
                Firmaların toplu kullanıcı içe aktarmasına izin ver
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowBulkUserImport}
                onChange={(e) => setFormData({ ...formData, allowBulkUserImport: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Branding Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Marka Ayarları</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Firma Logosu Zorunlu</label>
              <p className="text-sm text-gray-500">
                Firma kaydı için logo yüklemeyi zorunlu tut
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requireCompanyLogo}
                onChange={(e) => setFormData({ ...formData, requireCompanyLogo: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Özel Marka</label>
              <p className="text-sm text-gray-500">
                Firmaların kendi markalarını kullanmasına izin ver
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowCustomBranding}
                onChange={(e) => setFormData({ ...formData, allowCustomBranding: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}