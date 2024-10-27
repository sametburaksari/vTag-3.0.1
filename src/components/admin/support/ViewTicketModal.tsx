import React from 'react';
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
  user: {
    id: string;
    name: string;
    email: string;
    type: 'individual' | 'corporate';
    company?: string;
  };
  messages: Message[];
}

interface ViewTicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onReply: () => void;
}

export function ViewTicketModal({ ticket, onClose, onReply }: ViewTicketModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{ticket.subject}</h3>
            <p className="text-sm text-gray-500">Talep No: {ticket.id}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Ticket Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Kullanıcı:</span>
                <span className="ml-2 font-medium">{ticket.user.name}</span>
              </div>
              <div>
                <span className="text-gray-500">E-posta:</span>
                <span className="ml-2">{ticket.user.email}</span>
              </div>
              {ticket.user.company && (
                <div>
                  <span className="text-gray-500">Firma:</span>
                  <span className="ml-2">{ticket.user.company}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500">Oluşturulma:</span>
                <span className="ml-2">{ticket.createdAt}</span>
              </div>
            </div>
          </div>

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
                      ? 'bg-gray-100'
                      : 'bg-indigo-50'
                  }`}
                >
                  <div className="text-sm mb-1">
                    <span className="font-medium">
                      {message.isAdmin ? 'Destek Ekibi' : ticket.user.name}
                    </span>
                    <span className="text-gray-500 ml-2">{message.createdAt}</span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
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

        <div className="p-4 border-t">
          <button
            onClick={onReply}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <MessageSquare className="w-4 h-4" />
            Yanıtla
          </button>
        </div>
      </div>
    </div>
  );
}