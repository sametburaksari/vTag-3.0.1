import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X as XIcon, LayoutGrid, List } from 'lucide-react';
import { CreatePlanModal } from '../../components/admin/CreatePlanModal';
import { EditPlanModal } from '../../components/admin/EditPlanModal';
import { DeletePlanModal } from '../../components/admin/DeletePlanModal';

interface PlanFeature {
  id: string;
  title: string;
  included: boolean;
  limit?: number | 'unlimited';
}

interface Plan {
  id: string;
  name: string;
  price: string;
  billingPeriod: 'monthly' | 'yearly';
  features: PlanFeature[];
  activeUsers: number;
  status: 'active' | 'inactive';
}

type ModalType = 'create' | 'edit' | 'delete' | null;
type ViewMode = 'grid' | 'list';

export function Plans() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Mock data - gerçek uygulamada API'den gelecek
  const [plans] = useState<Plan[]>([
    {
      id: '1',
      name: 'vTag Ücretsiz',
      price: '0₺',
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
      ],
      activeUsers: 543,
      status: 'active'
    },
    {
      id: '2',
      name: 'vTag Standart',
      price: '49₺',
      billingPeriod: 'monthly',
      features: [
        { id: '1', title: 'Dijital Kartvizit Oluşturma', included: true, limit: 3 },
        { id: '2', title: 'QR Kod Paylaşımı', included: true },
        { id: '3', title: 'Temel İstatistikler', included: true },
        { id: '4', title: 'Özel Alan Adı', included: true, limit: 1 },
        { id: '5', title: 'Çoklu Profil', included: true, limit: 3 },
        { id: '6', title: 'Detaylı Analitik', included: false },
        { id: '7', title: 'Ekip Yönetimi', included: false },
        { id: '8', title: 'API Erişimi', included: false },
        { id: '9', title: 'Öncelikli Destek', included: false },
      ],
      activeUsers: 234,
      status: 'active'
    },
    {
      id: '3',
      name: 'vTag Pro+',
      price: '99₺',
      billingPeriod: 'monthly',
      features: [
        { id: '1', title: 'Dijital Kartvizit Oluşturma', included: true, limit: 10 },
        { id: '2', title: 'QR Kod Paylaşımı', included: true },
        { id: '3', title: 'Temel İstatistikler', included: true },
        { id: '4', title: 'Özel Alan Adı', included: true, limit: 3 },
        { id: '5', title: 'Çoklu Profil', included: true, limit: 10 },
        { id: '6', title: 'Detaylı Analitik', included: true },
        { id: '7', title: 'Ekip Yönetimi', included: true, limit: 5 },
        { id: '8', title: 'API Erişimi', included: true },
        { id: '9', title: 'Öncelikli Destek', included: true },
      ],
      activeUsers: 156,
      status: 'active'
    },
    {
      id: '4',
      name: 'vTag Firmalar',
      price: 'Özel',
      billingPeriod: 'yearly',
      features: [
        { id: '1', title: 'Dijital Kartvizit Oluşturma', included: true, limit: 'unlimited' },
        { id: '2', title: 'QR Kod Paylaşımı', included: true },
        { id: '3', title: 'Temel İstatistikler', included: true },
        { id: '4', title: 'Özel Alan Adı', included: true, limit: 'unlimited' },
        { id: '5', title: 'Çoklu Profil', included: true, limit: 'unlimited' },
        { id: '6', title: 'Detaylı Analitik', included: true },
        { id: '7', title: 'Ekip Yönetimi', included: true, limit: 'unlimited' },
        { id: '8', title: 'API Erişimi', included: true },
        { id: '9', title: 'Öncelikli Destek', included: true },
      ],
      activeUsers: 89,
      status: 'active'
    }
  ]);

  const handleAction = (type: ModalType, plan?: Plan) => {
    setSelectedPlan(plan || null);
    setModalType(type);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Abonelik Planları</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => handleAction('create')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Plan
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Plan Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-indigo-600">{plan.price}</span>
                      {plan.billingPeriod === 'monthly' && plan.price !== 'Özel' && (
                        <span className="text-gray-500 text-sm ml-1">/ay</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction('edit', plan)}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction('delete', plan)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    plan.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {plan.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                  <span className="text-gray-500">{plan.activeUsers} aktif kullanıcı</span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-6 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XIcon className="w-5 h-5 text-gray-300 mt-0.5" />
                    )}
                    <div>
                      <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                        {feature.title}
                      </span>
                      {feature.limit && (
                        <span className="text-sm text-gray-500 block">
                          {feature.limit === 'unlimited' ? 'Sınırsız' : `${feature.limit} adet`}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faturalama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktif Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{plan.name}</div>
                    <div className="text-sm text-gray-500">
                      {plan.features.filter(f => f.included).length} özellik aktif
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-semibold text-indigo-600">{plan.price}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {plan.billingPeriod === 'monthly' ? 'Aylık' : 'Yıllık'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {plan.activeUsers}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      plan.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction('edit', plan)}
                        className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction('delete', plan)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {modalType === 'create' && (
        <CreatePlanModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'edit' && selectedPlan && (
        <EditPlanModal 
          plan={selectedPlan} 
          onClose={() => setModalType(null)} 
        />
      )}
      
      {modalType === 'delete' && selectedPlan && (
        <DeletePlanModal 
          plan={selectedPlan} 
          onClose={() => setModalType(null)} 
        />
      )}
    </div>
  );
}