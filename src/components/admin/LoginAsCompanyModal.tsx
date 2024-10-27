import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginAsCompanyModalProps {
  company: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

export function LoginAsCompanyModal({ company, onClose }: LoginAsCompanyModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    console.log('Logging in as company:', company.id);
    onClose();
    // Firma paneline yönlendir
    navigate('/corporate');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Firma Olarak Giriş Yap</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-medium">Dikkat!</p>
          </div>
          
          <p className="text-gray-600 mb-6">
            <strong>{company.name}</strong> firması olarak giriş yapmak üzeresiniz.
            Bu işlem log kayıtlarında tutulacaktır ve firma yöneticisi tüm işlemlerinizi görebilecektir.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleLogin}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Giriş Yap
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