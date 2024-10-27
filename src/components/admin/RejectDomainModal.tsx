import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface RejectDomainModalProps {
  domain: {
    id: string;
    domain: string;
  };
  onClose: () => void;
}

export function RejectDomainModal({ domain, onClose }: RejectDomainModalProps) {
  const [reason, setReason] = useState('');

  const handleReject = () => {
    if (!reason.trim()) {
      alert('Lütfen bir red gerekçesi belirtin');
      return;
    }
    // Handle domain rejection
    console.log('Rejecting domain:', domain.id, 'Reason:', reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Alan Adı Reddi</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-medium">Alan Adı Reddi</p>
          </div>
          
          <p className="text-gray-600 mb-4">
            <strong>{domain.domain}</strong> alan adı talebini reddetmek üzeresiniz.
            Lütfen red gerekçesini belirtin:
          </p>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Red gerekçesini yazın..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
            rows={4}
            required
          />
          
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reddet
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