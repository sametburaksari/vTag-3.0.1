import React from 'react';
import { X, Download, Check, AlertTriangle } from 'lucide-react';

interface PaymentHistoryModalProps {
  onClose: () => void;
}

export function PaymentHistoryModal({ onClose }: PaymentHistoryModalProps) {
  const payments = [
    {
      id: '1',
      date: '2024-03-15',
      amount: '49₺',
      plan: 'Pro Plan',
      status: 'success',
      invoice: 'INV-2024-001'
    },
    {
      id: '2',
      date: '2024-02-15',
      amount: '49₺',
      plan: 'Pro Plan',
      status: 'success',
      invoice: 'INV-2024-002'
    },
    {
      id: '3',
      date: '2024-01-15',
      amount: '49₺',
      plan: 'Pro Plan',
      status: 'failed',
      invoice: 'INV-2024-003'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Ödeme Geçmişi</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {payment.status === 'success' ? (
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{payment.plan}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{payment.amount}</span>
                  {payment.status === 'success' && (
                    <button
                      onClick={() => {/* Handle invoice download */}}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                      title="Faturayı İndir"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}