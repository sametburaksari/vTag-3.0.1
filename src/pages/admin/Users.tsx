import React, { useState } from 'react';
import { Search, Plus, Edit2, LogIn, UserCircle, Trash2, Download, Upload, Building2 } from 'lucide-react';
import { CreateUserModal } from '../../components/admin/CreateUserModal';
import { EditUserModal } from '../../components/admin/EditUserModal';
import { DeleteUserModal } from '../../components/admin/DeleteUserModal';
import { ImportUsersModal } from '../../components/admin/ImportUsersModal';
import { LoginAsUserModal } from '../../components/admin/LoginAsUserModal';
import { ViewUserProfilesModal } from '../../components/admin/ViewUserProfilesModal';
import { ExportFormatModal } from '../../components/admin/ExportFormatModal';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  type: 'individual' | 'team';
  plan: string;
  company?: string;
  expiryDate: string;
  status: 'active' | 'inactive';
}

type ModalType = 'create' | 'edit' | 'delete' | 'import' | 'login' | 'profiles' | 'export' | null;

export function Users() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock data - gerçek uygulamada API'den gelecek
  const users: User[] = [
    {
      id: '1',
      name: 'Ali Yılmaz',
      email: 'ali@example.com',
      username: 'aliyilmaz',
      type: 'team',
      plan: 'Pro+',
      company: 'Tech Solutions',
      expiryDate: '2024-12-31',
      status: 'active'
    },
    // Diğer kullanıcılar...
  ];

  const handleAction = (type: ModalType, user?: User) => {
    setSelectedUser(user || null);
    setModalType(type);
  };

  const handleExport = (format: 'csv' | 'xlsx') => {
    // Export logic based on format
    console.log(`Exporting users in ${format} format...`);
    setModalType(null);
  };

  const handleBulkDelete = () => {
    // Bulk delete logic
    console.log('Deleting selected users:', selectedUsers);
    setSelectedUsers([]);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleAction('import')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4" />
            İçe Aktar
          </button>
          <button
            onClick={() => handleAction('export')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Dışa Aktar
          </button>
          <button
            onClick={() => handleAction('create')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Yeni Kullanıcı
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Tüm Planlar</option>
            <option>Ücretsiz</option>
            <option>Standart</option>
            <option>Pro+</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Tüm Durumlar</option>
            <option>Aktif</option>
            <option>Beklemede</option>
            <option>Devre Dışı</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map(u => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şirket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Kullanım
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-medium">
                      {getInitials(user.name)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.company ? (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{user.company}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">{user.plan}</td>
                <td className="px-6 py-4">{user.expiryDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'Aktif' : 'Devre Dışı'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleAction('edit', user)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Düzenle"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('login', user)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Giriş Yap"
                    >
                      <LogIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('profiles', user)}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Profiller"
                    >
                      <UserCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAction('delete', user)}
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

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedUsers.length} kullanıcı seçildi
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Seçilenleri Sil
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {modalType === 'create' && (
        <CreateUserModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'edit' && selectedUser && (
        <EditUserModal user={selectedUser} onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'delete' && selectedUser && (
        <DeleteUserModal user={selectedUser} onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'import' && (
        <ImportUsersModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'login' && selectedUser && (
        <LoginAsUserModal user={selectedUser} onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'profiles' && selectedUser && (
        <ViewUserProfilesModal user={selectedUser} onClose={() => setModalType(null)} />
      )}

      {modalType === 'export' && (
        <ExportFormatModal
          onClose={() => setModalType(null)}
          onExport={handleExport}
        />
      )}
    </div>
  );
}