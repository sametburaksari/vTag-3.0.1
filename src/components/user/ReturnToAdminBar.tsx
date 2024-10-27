import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function ReturnToAdminBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { impersonated, originalRole } = location.state || {};

  if (!impersonated) return null;

  const handleReturn = () => {
    // In a real app, you would:
    // 1. Make an API call to end impersonation
    // 2. Reset auth tokens/cookies
    // 3. Update global auth state
    
    // Navigate back to the original panel
    navigate(originalRole === 'admin' ? '/admin' : '/corporate');
  };

  return (
    <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">Kullanıcı görünümündesiniz</span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded">
          {originalRole === 'admin' ? 'Admin Panel' : 'Kurumsal Panel'}
        </span>
      </div>
      <button
        onClick={handleReturn}
        className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded hover:bg-white/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Geri Dön</span>
      </button>
    </div>
  );
}