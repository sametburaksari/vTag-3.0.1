import React, { useState } from 'react';
import { X, RefreshCw, Check, AlertTriangle } from 'lucide-react';

interface CheckDNSModalProps {
  domain: {
    id: string;
    domain: string;
  };
  onClose: () => void;
}

export function CheckDNSModal({ domain, onClose }: CheckDNSModalProps) {
  const [checking, setChecking] = useState(false);
  const [dnsStatus, setDnsStatus] = useState<'success' | 'error' | null>(null);

  const checkDNS = () => {
    setChecking(true);
    // Simulate DNS check
    setTimeout(() => {
      setDnsStatus(Math.random() > 0.5 ? 'success' : 'error');
      setChecking(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">DNS Kontrolü</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <h4 className="font-medium text-lg mb-2">{domain.domain}</h4>
            <p className="text-gray-600">
              DNS ayarlarının doğru yapılandırıldığını kontrol edin
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h5 className="font-medium mb-2">Gerekli DNS Kaydı</h5>
            <div className="bg-white p-3 rounded border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Tür:</span>
                  <span className="ml-2 font-medium">A</span>
                </div>
                <div>
                  <span className="text-gray-500">TTL:</span>
                  <span className="ml-2 font-medium">3600</span>
                </div>
                <div>
                  <span className="text-gray-500">Host:</span>
                  <span className="ml-2 font-medium">@</span>
                </div>
                <div>
                  <span className="text-gray-500">IP:</span>
                  <span className="ml-2 font-medium">45.158.57.25</span>
                </div>
              </div>
            </div>
          </div>

          {dnsStatus === 'success' && (
            <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-lg mb-6">
              <Check className="w-5 h-5" />
              <p>DNS ayarları doğru yapılandırılmış!</p>
            </div>
          )}

          {dnsStatus === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-red-50 text-red-800 rounded-lg mb-6">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <p className="font-medium">DNS ayarları hatalı!</p>
                <p className="text-sm mt-1">
                  Lütfen DNS kayıtlarınızı kontrol edip tekrar deneyin.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={checkDNS}
              disabled={checking}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {checking && <RefreshCw className="w-4 h-4 animate-spin" />}
              {checking ? 'Kontrol Ediliyor...' : 'DNS Kontrolü Yap'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}