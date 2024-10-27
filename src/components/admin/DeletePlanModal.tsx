import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeletePlanModalProps {
  plan: {
    id: string;
    name: string;
    activeUsers: number;
  };
  onClose: () => void;
}

export function DeletePlanModal({ plan, onClose }: DeletePlanModalProps) {
  const handleDelete = () => {
    // Handle plan deletion
    console.log('Deleting plan:', plan.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Planı Sil</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-medium">Bu işlem geri alınamaz!</p>
          </div>
          
          <p className="text-gray-600 mb-4">
            <strong>{plan.name}</strong> planını silmek istediğinizden emin misiniz?
          </p>

          {plan.activeUsers > 0 && (
            <div className="p-4 bg-amber-50 rounded-lg mb-6">
              <p className="text-amber-800 text-sm">
                Bu planı kullanan <strong>{plan.activeUsers}</strong> aktif kullanıcı bulunmaktadır.
                Plan silindiğinde bu kullanıcılar varsayılan plana aktarılacaktır.
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Evet, Sil
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}