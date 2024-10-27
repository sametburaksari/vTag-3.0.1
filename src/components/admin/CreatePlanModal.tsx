import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface CreatePlanModalProps {
  onClose: () => void;
}

interface PlanFeature {
  id: string;
  title: string;
  included: boolean;
  limit?: number | 'unlimited';
}

export function CreatePlanModal({ onClose }: CreatePlanModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    billingPeriod: 'monthly',
    features: [
      { id: '1', title: 'Dijital Kartvizit Oluşturma', included: true, limit: 1 },
      { id: '2', title: 'QR Kod Paylaşımı', included: true },
      { id: '3', title: 'Temel İstatistikler', included: true },
      { id: '4', title: 'Özel Alan Adı', included: false },
      { id: '5', title: 'Çoklu Profil', included: false },
      { id: '6', title: 'Detaylı Analitik', included: false },
      { id: '7', title: 'Ekip Yönetimi', included: false },
      { id: '8', title: 'API Erişimi', included: false },
      { id: '9', title: 'Öncelikli Destek', included: false },
    ] as PlanFeature[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle plan creation
    console.log('Creating plan:', formData);
    onClose();
  };

  const toggleFeature = (id: string) => {
    setFormData({
      ...formData,
      features: formData.features.map(feature =>
        feature.id === id ? { ...feature, included: !feature.included } : feature
      )
    });
  };

  const updateFeatureLimit = (id: string, limit: string) => {
    setFormData({
      ...formData,
      features: formData.features.map(feature =>
        feature.id === id
          ? { ...feature, limit: limit === 'unlimited' ? 'unlimited' : parseInt(limit) || undefined }
          : feature
      )
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Yeni Plan Oluştur</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Adı
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiyat
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faturalama Periyodu
                  </label>
                  <select
                    value={formData.billingPeriod}
                    onChange={(e) => setFormData({ ...formData, billingPeriod: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="monthly">Aylık</option>
                    <option value="yearly">Yıllık</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Özellikler</h4>
                <div className="space-y-4">
                  {formData.features.map((feature) => (
                    <div key={feature.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <label className="relative inline-flex items-center cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={feature.included}
                          onChange={() => toggleFeature(feature.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ms-3">{feature.title}</span>
                      </label>
                      {feature.included && (
                        <select
                          value={feature.limit === 'unlimited' ? 'unlimited' : feature.limit || ''}
                          onChange={(e) => updateFeatureLimit(feature.id, e.target.value)}
                          className="px-3 py-1.5 border rounded-lg text-sm"
                        >
                          <option value="">Limit Yok</option>
                          <option value="1">1</option>
                          <option value="3">3</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="unlimited">Sınırsız</option>
                        </select>
                      )}
                    </div>
                  ))}
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
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}