import React, { useState } from 'react';
import { Building2, Users, Palette, Globe, AlertTriangle } from 'lucide-react';
import { ColorPicker } from '../../components/corporate/ColorPicker';

interface ThemeSettings {
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
  cardColor: string;
  cardTextColor: string;
  font: string;
}

export function Settings() {
  const [activeTab, setActiveTab] = useState('theme');
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: '#4F46E5',
    textColor: '#1F2937',
    backgroundColor: '#F9FAFB',
    cardColor: '#FFFFFF',
    cardTextColor: '#374151',
    font: 'Inter'
  });

  const fonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Montserrat',
    'Source Sans Pro'
  ];

  const handleColorChange = (key: keyof ThemeSettings, value: string) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'theme'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Palette className="w-4 h-4" />
            Tema Ayarları
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'company'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Firma Ayarları
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'users'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Kullanıcı Ayarları
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'domain'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Globe className="w-4 h-4" />
            Alan Adı
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'theme' && (
          <div className="p-6 space-y-8">
            {/* Color Settings */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Renk Ayarları</h3>
              <div className="grid grid-cols-2 gap-6">
                <ColorPicker
                  color={themeSettings.primaryColor}
                  onChange={(color) => handleColorChange('primaryColor', color)}
                  label="Ana Renk"
                />
                <ColorPicker
                  color={themeSettings.textColor}
                  onChange={(color) => handleColorChange('textColor', color)}
                  label="Yazı Rengi"
                />
                <ColorPicker
                  color={themeSettings.backgroundColor}
                  onChange={(color) => handleColorChange('backgroundColor', color)}
                  label="Arkaplan Rengi"
                />
                <ColorPicker
                  color={themeSettings.cardColor}
                  onChange={(color) => handleColorChange('cardColor', color)}
                  label="Kutu Rengi"
                />
                <ColorPicker
                  color={themeSettings.cardTextColor}
                  onChange={(color) => handleColorChange('cardTextColor', color)}
                  label="Kutu Yazı Rengi"
                />
              </div>
            </section>

            {/* Font Settings */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Yazı Tipi</h3>
              <div>
                <select
                  value={themeSettings.font}
                  onChange={(e) => handleColorChange('font', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {fonts.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
            </section>

            {/* Preview */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Önizleme</h3>
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: themeSettings.backgroundColor,
                  color: themeSettings.textColor,
                  fontFamily: themeSettings.font
                }}
              >
                <div
                  className="p-4 rounded-lg mb-4"
                  style={{
                    backgroundColor: themeSettings.cardColor,
                    color: themeSettings.cardTextColor
                  }}
                >
                  <h4 className="font-medium mb-2">Örnek Kutu</h4>
                  <p>Bu bir önizleme metnidir.</p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: themeSettings.primaryColor }}
                >
                  Örnek Buton
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="p-6 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Firma Bilgileri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Firma Adı
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vergi Numarası
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="p-6 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Kullanıcı Ayarları</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Otomatik Kullanıcı Onayı</label>
                    <p className="text-sm text-gray-500">
                      Yeni kullanıcılar otomatik olarak onaylansın
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-700">Çoklu Oturum</label>
                    <p className="text-sm text-gray-500">
                      Kullanıcılar birden fazla cihazda oturum açabilsin
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Oturum Süresi (dakika)
                  </label>
                  <input
                    type="number"
                    min="5"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="text-sm text-gray-700">
                      En az bir büyük harf zorunlu
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="text-sm text-gray-700">
                      En az bir rakam zorunlu
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="text-sm text-gray-700">
                      En az bir özel karakter zorunlu
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'domain' && (
          <div className="p-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Alan Adı Yönetimi</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Alan adı yönetimi için lütfen yönetici paneliyle iletişime geçin.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}