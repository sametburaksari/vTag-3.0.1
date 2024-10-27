import React, { useState } from 'react';

interface UserSettingsData {
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSymbol: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
}

export function UserSettings() {
  const [formData, setFormData] = useState<UserSettingsData>({
    allowRegistration: true,
    requireEmailVerification: true,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumber: true,
    passwordRequireSymbol: true,
    sessionTimeout: 120,
    maxLoginAttempts: 5,
    lockoutDuration: 15
  });

  return (
    <div className="p-6 space-y-8">
      {/* Registration Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kayıt Ayarları</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Açık Kayıt</label>
              <p className="text-sm text-gray-500">
                Kullanıcıların kendi kendilerine kayıt olmasına izin ver
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowRegistration}
                onChange={(e) => setFormData({ ...formData, allowRegistration: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">E-posta Doğrulama</label>
              <p className="text-sm text-gray-500">
                Yeni kayıtlar için e-posta doğrulaması zorunlu olsun
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requireEmailVerification}
                onChange={(e) => setFormData({ ...formData, requireEmailVerification: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Password Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Şifre Politikası</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Şifre Uzunluğu
            </label>
            <input
              type="number"
              min="6"
              max="32"
              value={formData.passwordMinLength}
              onChange={(e) => setFormData({ ...formData, passwordMinLength: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.passwordRequireUppercase}
                onChange={(e) => setFormData({ ...formData, passwordRequireUppercase: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-700">
                En az bir büyük harf zorunlu
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.passwordRequireNumber}
                onChange={(e) => setFormData({ ...formData, passwordRequireNumber: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-700">
                En az bir rakam zorunlu
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.passwordRequireSymbol}
                onChange={(e) => setFormData({ ...formData, passwordRequireSymbol: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-700">
                En az bir özel karakter zorunlu
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Session Settings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Oturum Ayarları</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Oturum Zaman Aşımı (dakika)
            </label>
            <input
              type="number"
              min="5"
              value={formData.sessionTimeout}
              onChange={(e) => setFormData({ ...formData, sessionTimeout: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maksimum Giriş Denemesi
            </label>
            <input
              type="number"
              min="3"
              value={formData.maxLoginAttempts}
              onChange={(e) => setFormData({ ...formData, maxLoginAttempts: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hesap Kilitleme Süresi (dakika)
            </label>
            <input
              type="number"
              min="5"
              value={formData.lockoutDuration}
              onChange={(e) => setFormData({ ...formData, lockoutDuration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}