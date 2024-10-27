import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginAsUserModalProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onClose: () => void;
}

export function LoginAsUserModal({ user, onClose }: LoginAsUserModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you would:
    // 1. Make an API call to impersonate the user
    // 2. Set necessary auth tokens/cookies
    // 3. Update global auth state
    console.log('Logging in as:', user.email);
    
    // Navigate to user dashboard
    navigate('/user/dashboard', { 
      state: { 
        impersonated: true,
        originalRole: 'admin'
      }
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Kullanıcı Olarak Giriş Yap</h3>
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
            <strong>{user.name}</strong> kullanıcısı olarak giriş yapmak üzeresiniz.
            Bu işlem log kayıtlarında tutulacaktır.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              Kullanıcı paneline yönlendirileceksiniz. İstediğiniz zaman admin paneline geri dönebilirsiniz.
            </p>
          </div>
          
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