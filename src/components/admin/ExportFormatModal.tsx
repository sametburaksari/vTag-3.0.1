import React from 'react';
import { X, FileSpreadsheet, FileText } from 'lucide-react';

interface ExportFormatModalProps {
  onClose: () => void;
  onExport: (format: 'csv' | 'xlsx') => void;
}

export function ExportFormatModal({ onClose, onExport }: ExportFormatModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Dışa Aktarma Formatı</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            <button
              onClick={() => onExport('xlsx')}
              className="w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium">Excel (.xlsx)</p>
                <p className="text-sm text-gray-500">Microsoft Excel uyumlu format</p>
              </div>
            </button>
            
            <button
              onClick={() => onExport('csv')}
              className="w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <FileText className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">CSV (.csv)</p>
                <p className="text-sm text-gray-500">Virgülle ayrılmış değerler</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}