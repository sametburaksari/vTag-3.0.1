import React from 'react';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRModalProps {
  profile: {
    name: string;
    username: string;
  };
  onClose: () => void;
}

export function QRModal({ profile, onClose }: QRModalProps) {
  const profileUrl = `${window.location.origin}/profile/${profile.username}`;

  const handleDownload = () => {
    const svg = document.querySelector('.qr-code svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${profile.username}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">QR Kod - {profile.name}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-4 qr-code">
            <QRCodeSVG value={profileUrl} size={200} />
          </div>
          <p className="text-center text-sm text-gray-600 mb-4">
            Bu QR kodu tarayarak profile doğrudan erişebilirsiniz
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={profileUrl}
                readOnly
                className="flex-1 bg-transparent text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(profileUrl)}
                className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
              >
                Kopyala
              </button>
            </div>
            <button
              onClick={handleDownload}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              QR Kodu İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}