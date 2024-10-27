import React, { useState } from 'react';
import { X, MessageSquare, Paperclip, Download } from 'lucide-react';

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
  messages: Message[];
}

interface ViewTicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export function ViewTicketModal({ ticket, onClose }: ViewTicketModalProps) {
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    console.log('Sending message:', { message: newMessage, files });
    setNewMessage('');
    setFiles([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold dark:text-white">{ticket.subject}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Talep No: {ticket.id}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Messages */}
          <div className="space-y-6">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.isAdmin
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : 'bg-indigo-50 dark:bg-indigo-900/50'
                  }`}
                >
                  <div className="text-sm mb-1">
                    <span className="font-medium dark:text-white">
                      {message.isAdmin ? 'Destek Ekibi' : 'Ben'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">{message.createdAt}</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{message.message}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                        >
                          <Paperclip className="w-4 h-4" />
                          <button className="hover:underline">
                            {attachment}
                          </button>
                          <Download className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
          <div className="mb-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                <Paperclip className="w-4 h-4" />
                {files.length > 0 ? `${files.length} dosya seçildi` : 'Dosya Ekle'}
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <MessageSquare className="w-4 h-4" />
              Yanıtla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}