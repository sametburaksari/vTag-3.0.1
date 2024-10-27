import React, { useState } from 'react';
import { X, Paperclip, Send } from 'lucide-react';

interface Message {
  id: string;
  message: string;
  createdAt: string;
  isAdmin: boolean;
  attachments?: string[];
}

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'general';
  createdAt: string;
  lastUpdate: string;
  user: {
    id: string;
    name: string;
    email: string;
    type: 'individual' | 'corporate';
    company?: string;
  };
  messages: Message[];
}

interface ReplyTicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export function ReplyTicketModal({ ticket, onClose }: ReplyTicketModalProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [newStatus, setNewStatus] = useState(ticket.status);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reply submission
    console.log('Submitting reply:', { message, files, newStatus });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">Yanıt: {ticket.subject}</h3>
            <p className="text-sm text-gray-500">Talep No: {ticket.id}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            {/* Status Update */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Talep Durumu
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Ticket['status'])}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ring-indigo-500"
              >
                <option value="open">Yeni</option>
                <option value="in_progress">İşleniyor</option>
                <option value="resolved">Çözüldü</option>
                <option value="closed">Kapandı</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mesaj
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={6}
                required
              />
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosya Ekle
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Dosya Yükle</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">veya sürükleyip bırakın</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF, DOC (max. 10MB)
                  </p>
                  {files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {files.length} dosya seçildi
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Send className="w-4 h-4" />
              Yanıtla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}