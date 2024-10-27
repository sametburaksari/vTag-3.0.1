import React, { useState } from 'react';
import { Cog, User, Building2, Upload, AlertTriangle, Save } from 'lucide-react';
import { SoftwareSettings } from '../../components/admin/settings/SoftwareSettings';
import { UserSettings } from '../../components/admin/settings/UserSettings';
import { CompanySettings } from '../../components/admin/settings/CompanySettings';

type TabType = 'software' | 'user' | 'company';

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('software');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSaving ? (
            <Save className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('software')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'software'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Cog className="w-4 h-4" />
            Yazılım Ayarları
          </button>
          <button
            onClick={() => setActiveTab('user')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'user'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="w-4 h-4" />
            Kullanıcı Ayarları
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
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'software' && <SoftwareSettings />}
        {activeTab === 'user' && <UserSettings />}
        {activeTab === 'company' && <CompanySettings />}
      </div>
    </div>
  );
}