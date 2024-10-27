import React, { useState } from 'react';
import { X, Plus, Trash2, AlertTriangle } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  fields: Field[];
}

interface Field {
  id: string;
  title: string;
  type: string;
  value: string;
  isRequired: boolean;
}

interface SharedProfileFieldsModalProps {
  onClose: () => void;
}

export function SharedProfileFieldsModal({ onClose }: SharedProfileFieldsModalProps) {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [categories] = useState<Category[]>([
    {
      id: '1',
      title: 'İletişim Bilgileri',
      fields: [
        { id: '1', title: 'Telefon', type: 'phone', value: '', isRequired: false },
        { id: '2', title: 'E-posta', type: 'email', value: '', isRequired: false },
        { id: '3', title: 'Adres', type: 'text', value: '', isRequired: false }
      ]
    },
    {
      id: '2',
      title: 'Sosyal Medya',
      fields: [
        { id: '4', title: 'LinkedIn', type: 'url', value: '', isRequired: false },
        { id: '5', title: 'Twitter', type: 'url', value: '', isRequired: false },
        { id: '6', title: 'Instagram', type: 'url', value: '', isRequired: false }
      ]
    },
    {
      id: '3',
      title: 'Firma Bilgileri',
      fields: [
        { id: '7', title: 'Departman', type: 'text', value: '', isRequired: false },
        { id: '8', title: 'Pozisyon', type: 'text', value: '', isRequired: false },
        { id: '9', title: 'Şube', type: 'text', value: '', isRequired: false }
      ]
    }
  ]);

  const handleFieldClick = (field: Field) => {
    setSelectedField(field);
  };

  const handleSave = () => {
    // API'ye kaydet
    console.log('Saving shared fields:', categories);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">Ortak Profil Bilgileri</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden p-6">
          <div className="flex gap-6 h-full">
            {/* Left Side - Categories and Fields */}
            <div className="w-1/2 overflow-y-auto">
              <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg mb-6">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">
                  Eklemek istediğiniz bilgiye tıklayarak detayları girebilirsiniz.
                </p>
              </div>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium dark:text-white mb-4">{category.title}</h4>
                    <div className="space-y-2">
                      {category.fields.map((field) => (
                        <button
                          key={field.id}
                          onClick={() => handleFieldClick(field)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            selectedField?.id === field.id
                              ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                              : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="font-medium">{field.title}</span>
                          {field.value && (
                            <span className="text-sm text-green-600 dark:text-green-400">
                              Eklenmiş
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Field Details */}
            <div className="w-1/2 border-l dark:border-gray-700 pl-6">
              {selectedField ? (
                <div className="space-y-4">
                  <h4 className="font-medium text-lg dark:text-white">
                    {selectedField.title} Bilgisi
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Değer
                    </label>
                    <input
                      type={selectedField.type}
                      value={selectedField.value}
                      onChange={(e) => {
                        setSelectedField({
                          ...selectedField,
                          value: e.target.value
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedField.isRequired}
                      onChange={(e) => {
                        setSelectedField({
                          ...selectedField,
                          isRequired: e.target.checked
                        });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label className="text-sm text-gray-600 dark:text-gray-300">
                      Bu alan zorunlu olsun
                    </label>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Düzenlemek için bir alan seçin
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}