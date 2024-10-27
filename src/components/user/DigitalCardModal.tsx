import React from 'react';
import { X, QrCode, Wallet } from 'lucide-react';

interface DigitalCardModalProps {
  profile: {
    name: string;
    role?: string;
    company?: string;
    avatar: string;
    url: string;
  };
  onClose: () => void;
}

export function DigitalCardModal({ profile, onClose }: DigitalCardModalProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Dijital Kartvizit</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Digital Card Preview */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white mb-6">
            <img
              src="/vtag-white.svg"
              alt="vTag"
              className="h-6 mb-4"
            />
            
            <div className="flex items-center gap-4 mb-6">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-2 border-white"
              />
              <div>
                <h4 className="font-semibold">{profile.name}</h4>
                {profile.role && <p className="text-sm opacity-90">{profile.role}</p>}
                {profile.company && <p className="text-sm opacity-90">{profile.company}</p>}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg mb-2">
                <QrCode className="w-32 h-32 text-gray-900" />
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
                {profile.url}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleCopyLink}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Bağlantıyı Kopyala
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                <Wallet className="w-4 h-4" />
                <span>Apple Wallet</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Wallet className="w-4 h-4" />
                <span>Google Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}