import React, { useState } from 'react';
import { Upload, AlertTriangle, Users, Share2, Plug } from 'lucide-react';

type SettingsTab = 'general' | 'social' | 'integrations' | 'admins';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export function SoftwareSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [admins] = useState<Admin[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-03-20 14:30'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-03-19 16:45'
    }
  ]);

  return (
    <div className="flex h-full">
      {/* Side Tabs */}
      <div className="w-64 bg-white rounded-lg shadow-sm p-4 mr-6">
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left ${
              activeTab === 'general'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>Genel Ayarlar</span>
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left ${
              activeTab === 'social'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span>Sosyal Giriş</span>
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left ${
              activeTab === 'integrations'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Plug className="w-5 h-5" />
            <span>Entegrasyonlar</span>
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left ${
              activeTab === 'admins'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Yöneticiler</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* SEO Settings */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Ayarları</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Başlığı
                  </label>
                  <input
                    type="text"
                    defaultValue="vTag"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Açıklaması
                  </label>
                  <textarea
                    defaultValue="Dijital Kartvizit Yönetimi"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Başlık
                  </label>
                  <input
                    type="text"
                    defaultValue="vTag - Dijital Kartvizit Yönetimi"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Açıklama
                  </label>
                  <textarea
                    defaultValue="vTag ile dijital kartvizitinizi oluşturun, yönetin ve paylaşın."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                  />
                </div>
              </div>
            </section>

            {/* Logo Settings */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Logo Ayarları</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Logo Yükle</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG (max. 2MB)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Favicon
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Favicon Yükle</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/x-icon,image/png"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">ICO, PNG (max. 2MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            {/* Google Login */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Google ile Giriş</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Secret
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Facebook Login */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Facebook ile Giriş</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    App ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    App Secret
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            {/* OneSignal */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">OneSignal</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    App ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Pusher */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pusher</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      App ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secret
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cluster
                    </label>
                    <select
                      defaultValue="eu"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="mt1">US East (N. Virginia)</option>
                      <option value="eu">EU (Ireland)</option>
                      <option value="ap1">Asia Pacific (Singapore)</option>
                      <option value="ap2">Asia Pacific (Mumbai)</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="space-y-6">
            {/* Admin List */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Yöneticiler</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Yeni Yönetici
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yönetici
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Son Giriş
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          admin.role === 'super_admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role === 'super_admin' ? 'Süper Admin' : 'Admin'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          admin.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {admin.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {admin.lastLogin}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Düzenle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Permissions Info */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-amber-800">
                  Süper Admin rolüne sahip kullanıcılar tüm yetkilere sahiptir ve kısıtlanamaz.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}