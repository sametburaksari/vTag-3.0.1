import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  user: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

export function DeleteUserModal({ user, onClose }: DeleteUserModalProps) {
  const handleDelete = () => {
    // Handle user deletion
    console.log('Deleting user:', user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">Kullanıcıyı Sil</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-medium">Bu işlem geri alınamaz!</p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            <strong>{user.name}</strong> kullanıcısını silmek istediğinizden emin misiniz?
            Bu işlem geri alınamaz ve kullanıcının tüm verileri kalıcı olarak silinecektir.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Evet, Sil
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}