import React from 'react';
import { X, Check } from 'lucide-react';

interface ApproveDomainModalProps {
  domain: {
    id: string;
    domain: string;
  };
  onClose: () => void;
}

export function ApproveDomainModal({ domain, onClose }: ApproveDomainModalProps) {
  const handleApprove = () => {
    // Handle domain approval
    console.log('Approving domain:', domain.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Alan Adı Onayı</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-green-600">
            <Check className="w-6 h-6" />
            <p className="font-medium">Alan Adı Onayı</p>
          </div>
          
          <p className="text-gray-600 mb-6">
            <strong>{domain.domain}</strong> alan adı talebini onaylamak istediğinizden emin misiniz?
            Onaylandıktan sonra alan adı aktif olarak kullanıma açılacaktır.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Onayla
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