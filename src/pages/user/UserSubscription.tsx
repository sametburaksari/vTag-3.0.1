import React, { useState } from 'react';
import { Check, CreditCard, AlertTriangle } from 'lucide-react';
import { UpgradeModal } from '../../components/user/subscription/UpgradeModal';
import { PaymentHistoryModal } from '../../components/user/subscription/PaymentHistoryModal';
import { CancelSubscriptionModal } from '../../components/user/subscription/CancelSubscriptionModal';

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isCurrent: boolean;
}

export function UserSubscription() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalType, setModalType] = useState<'upgrade' | 'history' | 'cancel' | null>(null);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Ücretsiz',
      price: '0₺',
      features: [
        'Tek profil',
        'Temel istatistikler',
        'QR kod paylaşımı',
        'Sınırlı özellikler'
      ],
      isCurrent: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '49₺',
      features: [
        '3 profil',
        'Detaylı istatistikler',
        'Özel alan adı',
        'Öncelikli destek',
        'Tüm özellikler'
      ],
      isCurrent: false
    },
    {
      id: 'business',
      name: 'İşletme',
      price: '99₺',
      features: [
        'Sınırsız profil',
        'Gelişmiş analitik',
        'Çoklu alan adı',
        '7/24 destek',
        'API erişimi',
        'Özel entegrasyonlar'
      ],
      isCurrent: false
    }
  ];

  const currentPlan = plans.find(plan => plan.isCurrent);

  return (
    <div className="space-y-6">
      {/* Current Plan Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mevcut Plan: {currentPlan?.name}</h2>
            <p className="text-gray-600">Yenileme Tarihi: 15 Nisan 2024</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <button
              onClick={() => setModalType('history')}
              className="flex-1 md:flex-none px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Ödeme Geçmişi
            </button>
            <button
              onClick={() => setModalType('cancel')}
              className="flex-1 md:flex-none px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
            >
              İptal Et
            </button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Profil Kullanımı</h3>
            <p className="mt-2 text-2xl font-bold">2/3</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Alan Adı</h3>
            <p className="mt-2 text-2xl font-bold">1/1</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Depolama</h3>
            <p className="mt-2 text-2xl font-bold">4.2/5 GB</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              plan.isCurrent ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            {plan.isCurrent && (
              <div className="bg-indigo-600 text-white text-center text-sm py-1">
                Mevcut Plan
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/ay</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {!plan.isCurrent && (
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setModalType('upgrade');
                  }}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Yükselt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Warning */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800">Ödeme Bilgisi</h4>
          <p className="text-sm text-amber-700 mt-1">
            Aboneliğiniz otomatik olarak yenilenecektir. İptal etmek için en az 24 saat önceden iptal işlemi başlatmanız gerekmektedir.
          </p>
        </div>
      </div>

      {/* Modals */}
      {modalType === 'upgrade' && selectedPlan && (
        <UpgradeModal
          plan={selectedPlan}
          onClose={() => {
            setModalType(null);
            setSelectedPlan(null);
          }}
        />
      )}

      {modalType === 'history' && (
        <PaymentHistoryModal
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'cancel' && (
        <CancelSubscriptionModal
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}