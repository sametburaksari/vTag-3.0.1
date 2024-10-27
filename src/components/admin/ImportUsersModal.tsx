import React, { useState } from 'react';
import { X, Upload, Download, AlertTriangle } from 'lucide-react';

interface ImportUsersModalProps {
  onClose: () => void;
}

export function ImportUsersModal({ onClose }: ImportUsersModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'text/csv' || droppedFile?.name.endsWith('.xlsx')) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = () => {
    if (file) {
      // Handle file import
      console.log('Importing file:', file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Toplu Kullanıcı İçe Aktar</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* File Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center
              ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              ${file ? 'bg-green-50 border-green-500' : ''}
            `}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <Upload className="w-6 h-6 text-green-500" />
                <span className="font-medium text-green-600">{file.name}</span>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  CSV veya Excel dosyasını sürükleyip bırakın
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  veya
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">Dosya Seç</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}
          </div>

          {/* Template Download */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Doğru format için örnek şablonu indirin ve kullanın.
              </p>
              <button
                onClick={() => {/* Handle template download */}}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Download className="w-4 h-4" />
                <span>Şablonu İndir</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              onClick={handleImport}
              disabled={!file}
              className={`px-4 py-2 text-white rounded-lg
                ${file
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              İçe Aktar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}