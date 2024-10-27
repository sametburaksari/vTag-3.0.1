import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface CancelSubscriptionModalProps {
  onClose: () => void;
}

export function CancelSubscriptionModal({ onClose }: CancelSubscriptionModalProps) {
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription cancellation
    console.log('Cancelling subscription:', { reason });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Aboneliği İptal Et</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800">Önemli Bilgi</p>
              <p className="text-sm text-amber-700 mt-1">
                İptal işlemi sonrası mevcut dönem sonuna kadar hizmet almaya devam edeceksiniz.
                İptal sonrası tüm verileriniz 30 gün boyunca saklanacaktır.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İptal Sebebi
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Seçiniz</option>
                <option value="price">Fiyat çok yüksek</option>
                <option value="features">İhtiyacım olan özellikler yok</option>
                <option value="unused">Yeterince kullanmıyorum</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
              <label className="text-sm text-gray-600">
                İptal koşullarını okudum ve onaylıyorum
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={!confirmed || !reason}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              İptal Et
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Vazgeç
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}