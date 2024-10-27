import React, { useState } from 'react';
import { Search, Plus, Globe, AlertTriangle, Check, X as XIcon, ExternalLink, Trash2 } from 'lucide-react';
import { CreateDomainModal } from '../../components/admin/CreateDomainModal';
import { DeleteDomainModal } from '../../components/admin/DeleteDomainModal';
import { CheckDNSModal } from '../../components/admin/CheckDNSModal';
import { ApproveDomainModal } from '../../components/admin/ApproveDomainModal';
import { RejectDomainModal } from '../../components/admin/RejectDomainModal';

interface Domain {
  id: string;
  domain: string;
  profile: string;
  company: string;
  status: 'pending_dns' | 'pending_approval' | 'approved' | 'rejected';
  createdAt: string;
}

type ModalType = 'create' | 'delete' | 'check-dns' | 'approve' | 'reject' | null;

export function Domains() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const [domains] = useState<Domain[]>([
    {
      id: '1',
      domain: 'tech-solutions.com',
      profile: 'Satış Ekibi',
      company: 'Tech Solutions A.Ş.',
      status: 'pending_dns',
      createdAt: '2024-03-20'
    },
    {
      id: '2',
      domain: 'global-finance.com',
      profile: 'Kurumsal Profil',
      company: 'Global Finance Ltd.',
      status: 'pending_approval',
      createdAt: '2024-03-19'
    },
    {
      id: '3',
      domain: 'digital-ventures.com',
      profile: 'Pazarlama Ekibi',
      company: 'Digital Ventures Inc.',
      status: 'approved',
      createdAt: '2024-03-18'
    }
  ]);

  const handleAction = (type: ModalType, domain?: Domain) => {
    setSelectedDomain(domain || null);
    setModalType(type);
  };

  // Filtreleme işlemi
  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.profile.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || domain.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alan Adları</h1>
        <button
          onClick={() => handleAction('create')}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Yeni Alan Adı
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Alan adı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending_dns">DNS Bekliyor</option>
            <option value="pending_approval">Onay Bekliyor</option>
            <option value="approved">Onaylandı</option>
            <option value="rejected">Reddedildi</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alan Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Firma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kayıt Tarihi
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDomains.map((domain) => (
              <tr key={domain.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium">{domain.domain}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{domain.profile}</td>
                <td className="px-6 py-4 text-gray-500">{domain.company}</td>
                <td className="px-6 py-4">
                  {domain.status === 'pending_dns' && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      DNS Bekliyor
                    </span>
                  )}
                  {domain.status === 'pending_approval' && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Onay Bekliyor
                    </span>
                  )}
                  {domain.status === 'approved' && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Onaylandı
                    </span>
                  )}
                  {domain.status === 'rejected' && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Reddedildi
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">{domain.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {domain.status === 'pending_dns' && (
                      <button
                        onClick={() => handleAction('check-dns', domain)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="DNS Kontrol"
                      >
                        <Globe className="w-5 h-5" />
                      </button>
                    )}
                    {domain.status === 'pending_approval' && (
                      <>
                        <button
                          onClick={() => handleAction('approve', domain)}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Onayla"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAction('reject', domain)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Reddet"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {domain.status === 'approved' && (
                      <button
                        onClick={() => window.open(`https://${domain.domain}`, '_blank')}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Ziyaret Et"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleAction('delete', domain)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalType === 'create' && (
        <CreateDomainModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'delete' && selectedDomain && (
        <DeleteDomainModal
          domain={selectedDomain}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'check-dns' && selectedDomain && (
        <CheckDNSModal
          domain={selectedDomain}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'approve' && selectedDomain && (
        <ApproveDomainModal
          domain={selectedDomain}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'reject' && selectedDomain && (
        <RejectDomainModal
          domain={selectedDomain}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}