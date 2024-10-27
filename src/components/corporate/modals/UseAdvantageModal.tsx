import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, AlertTriangle } from 'lucide-react';

interface Advantage {
  id: string;
  title: string;
  description: string;
  type: 'link' | 'coupon';
  category: string;
}

interface UseAdvantageModalProps {
  advantage: Advantage;
  onClose: () => void;
}

export function UseAdvantageModal({ advantage, onClose }: UseAdvantageModalProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUse = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    if (advantage.type === 'link') {
      window.open('https://example.com/advantage-link', '_blank');
    } else {
      setCopied(true);
      navigator.clipboard.writeText('EXAMPLE-COUPON-CODE');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">Avantaj Kullan</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <h4 className="font-medium text-lg mb-2">{advantage.title}</h4>
            <p className="text-gray-600 dark:text-gray-400">{advantage.description}</p>
          </div>

          {advantage.type === 'coupon' && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Bu kupon kodu bir kez kullanılabilir. Kopyaladıktan sonra güvenli bir yere kaydetmeyi unutmayın.
              </p>
            </div>
          )}

          <button
            onClick={handleUse}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? (
              'İşleniyor...'
            ) : (
              <>
                {advantage.type === 'link' ? (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Avantajı Kullan
                  </>
                ) : (
                  <>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Kod Kopyalandı!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Kuponu Kopyala
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}