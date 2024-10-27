import React, { useState } from 'react';
import { X, CreditCard, AlertTriangle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
}

interface UpgradeModalProps {
  plan: Plan;
  onClose: () => void;
}

export function UpgradeModal({ plan, onClose }: UpgradeModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveCard: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log('Processing payment:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{plan.name} Planına Yükselt</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Toplam Tutar:</span>
              <span className="text-2xl font-bold text-indigo-600">{plan.price}</span>
            </div>
            <div className="text-sm text-gray-500">
              Bir sonraki fatura kesim tarihinizde yansıtılacaktır.
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                value={formData.nameOnCard}
                onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kart Numarası
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="•••• •••• •••• ••••"
                  required
                />
                <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Son Kullanma
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="AA/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="•••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.saveCard}
                onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-600">
                Kartımı sonraki ödemeler için kaydet
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Ödeme Yap
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}