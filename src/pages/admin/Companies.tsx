import React, { useState } from 'react';
import { Search, Plus, Building2, Users as UsersIcon, Download, Eye, Edit2, Trash2, LogIn } from 'lucide-react';
import { CreateCompanyModal } from '../../components/admin/CreateCompanyModal';
import { EditCompanyModal } from '../../components/admin/EditCompanyModal';
import { DeleteCompanyModal } from '../../components/admin/DeleteCompanyModal';
import { ExportFormatModal } from '../../components/admin/ExportFormatModal';
import { ViewCompanyUsersModal } from '../../components/admin/ViewCompanyUsersModal';
import { LoginAsCompanyModal } from '../../components/admin/LoginAsCompanyModal';

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  totalLicenses: number;
  activeLicenses: number;
  contractEndDate: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

type ModalType = 'create' | 'edit' | 'delete' | 'export' | 'users' | 'login' | null;

export function Companies() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Mock data - will be replaced with API call
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'Tech Solutions A.Ş.',
      industry: 'Teknoloji',
      totalLicenses: 50,
      activeLicenses: 42,
      contractEndDate: '2024-12-31',
      status: 'active',
      joinDate: '2024-03-10'
    },
    {
      id: '2',
      name: 'Global Finance Ltd.',
      industry: 'Finans',
      totalLicenses: 100,
      activeLicenses: 85,
      contractEndDate: '2024-12-31',
      status: 'active',
      joinDate: '2024-03-15'
    }
  ]);

  const handleAction = (type: ModalType, company?: Company) => {
    setSelectedCompany(company || null);
    setModalType(type);
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    console.log('Exporting companies in format:', format);
    setModalType(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kurumsal Firmalar</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleAction('export')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Dışa Aktar
          </button>
          <button
            onClick={() => handleAction('create')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Firma
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Firma ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Sektörler</option>
            <option value="technology">Teknoloji</option>
            <option value="finance">Finans</option>
            <option value="manufacturing">Üretim</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Firma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sektör
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lisans Kullanımı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sözleşme Bitiş
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
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <Building2 className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <span className="font-medium text-gray-900">{company.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{company.industry}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{company.activeLicenses}/{company.totalLicenses}</span>
                    <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(company.activeLicenses / company.totalLicenses) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{company.contractEndDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    company.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {company.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{company.joinDate}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleAction('users', company)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Kullanıcıları Görüntüle"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('login', company)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Firma Olarak Giriş Yap"
                    >
                      <LogIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('edit', company)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Düzenle"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('delete', company)}
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
        <CreateCompanyModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'edit' && selectedCompany && (
        <EditCompanyModal 
          company={selectedCompany} 
          onClose={() => setModalType(null)} 
        />
      )}
      
      {modalType === 'delete' && selectedCompany && (
        <DeleteCompanyModal 
          company={selectedCompany} 
          onClose={() => setModalType(null)} 
        />
      )}
      
      {modalType === 'export' && (
        <ExportFormatModal
          onClose={() => setModalType(null)}
          onExport={handleExport}
        />
      )}
      
      {modalType === 'users' && selectedCompany && (
        <ViewCompanyUsersModal
          company={selectedCompany}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'login' && selectedCompany && (
        <LoginAsCompanyModal
          company={selectedCompany}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}