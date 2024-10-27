import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Clock, ChevronRight, Eye, MessageSquare } from 'lucide-react';
import { ViewTicketModal } from '../../components/admin/support/ViewTicketModal';
import { ReplyTicketModal } from '../../components/admin/support/ReplyTicketModal';

interface Ticket {
  id: string;
  subject: string;
  message: string;
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
  messages: {
    id: string;
    message: string;
    createdAt: string;
    isAdmin: boolean;
    attachments?: string[];
  }[];
}

export function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalType, setModalType] = useState<'view' | 'reply' | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Mock data
  const tickets: Ticket[] = [
    {
      id: 'T1234',
      subject: 'Profil Güncelleme Sorunu',
      message: 'Profil fotoğrafımı güncelleyemiyorum...',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      createdAt: '2024-03-24 14:30',
      lastUpdate: '2024-03-24 15:45',
      user: {
        id: '1',
        name: 'Ali Yılmaz',
        email: 'ali@example.com',
        type: 'individual'
      },
      messages: [
        {
          id: '1',
          message: 'Profil fotoğrafımı güncelleyemiyorum. Hata alıyorum.',
          createdAt: '2024-03-24 14:30',
          isAdmin: false
        }
      ]
    },
    {
      id: 'T1233',
      subject: 'Kurumsal Plan Yükseltme',
      message: 'Kurumsal planımızı yükseltmek istiyoruz...',
      status: 'in_progress',
      priority: 'high',
      category: 'billing',
      createdAt: '2024-03-23 09:15',
      lastUpdate: '2024-03-23 11:30',
      user: {
        id: '2',
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        type: 'corporate',
        company: 'Tech Solutions'
      },
      messages: [
        {
          id: '1',
          message: 'Kurumsal planımızı yükseltmek istiyoruz. Bilgi alabilir miyim?',
          createdAt: '2024-03-23 09:15',
          isAdmin: false
        },
        {
          id: '2',
          message: 'Size hemen plan detaylarını iletiyorum...',
          createdAt: '2024-03-23 11:30',
          isAdmin: true
        }
      ]
    }
  ];

  const getStatusBadge = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            Yeni
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            İşleniyor
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Çözüldü
          </span>
        );
      case 'closed':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            Kapandı
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Yüksek
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Orta
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Düşük
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Destek Talepleri</h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Talep ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="open">Yeni</option>
            <option value="in_progress">İşleniyor</option>
            <option value="resolved">Çözüldü</option>
            <option value="closed">Kapandı</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Öncelikler</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>
        </div>
      </div>

      {/* Tickets */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Destek Talepleri</h2>
        </div>
        <div className="divide-y">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{ticket.subject}</h3>
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setModalType('view');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{ticket.message}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Oluşturulma: {ticket.createdAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Son güncelleme: {ticket.lastUpdate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {modalType === 'view' && selectedTicket && (
        <ViewTicketModal
          ticket={selectedTicket}
          onClose={() => {
            setModalType(null);
            setSelectedTicket(null);
          }}
          onReply={() => {
            setModalType('reply');
          }}
        />
      )}

      {modalType === 'reply' && selectedTicket && (
        <ReplyTicketModal
          ticket={selectedTicket}
          onClose={() => {
            setModalType(null);
            setSelectedTicket(null);
          }}
        />
      )}
    </div>
  );
}