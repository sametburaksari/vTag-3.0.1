import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, UserCircle, Users as UsersIcon, LogIn } from 'lucide-react';
import { CreateTeamModal } from '../../components/corporate/modals/CreateTeamModal';
import { EditTeamModal } from '../../components/corporate/modals/EditTeamModal';
import { DeleteTeamModal } from '../../components/corporate/modals/DeleteTeamModal';
import { CreateUserModal } from '../../components/corporate/modals/CreateUserModal';
import { EditUserModal } from '../../components/corporate/modals/EditUserModal';
import { DeleteUserModal } from '../../components/corporate/modals/DeleteUserModal';
import { LoginAsUserModal } from '../../components/corporate/modals/LoginAsUserModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  team?: string;
  profiles: number;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  profiles: string[];
  status: 'active' | 'inactive';
}

type ModalType = 'create-user' | 'edit-user' | 'delete-user' | 'create-team' | 'edit-team' | 'delete-team' | 'login' | null;

export function Users() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [viewMode, setViewMode] = useState<'users' | 'teams'>('users');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Ali Yılmaz',
      email: 'ali@example.com',
      role: 'Yönetici',
      team: 'Satış Ekibi',
      profiles: 2,
      status: 'active',
      lastLogin: '2 saat önce'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      role: 'Kullanıcı',
      team: 'Pazarlama Ekibi',
      profiles: 1,
      status: 'active',
      lastLogin: '1 gün önce'
    }
  ]);

  const [teams] = useState<Team[]>([
    {
      id: '1',
      name: 'Satış Ekibi',
      description: 'Satış ve müşteri ilişkileri ekibi',
      memberCount: 12,
      profiles: ['Satış Ekibi Profili', 'Genel Profil'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Pazarlama Ekibi',
      description: 'Pazarlama ve iletişim ekibi',
      memberCount: 8,
      profiles: ['Pazarlama Ekibi Profili', 'Genel Profil'],
      status: 'active'
    }
  ]);

  const handleAction = (type: ModalType, user?: User, team?: Team) => {
    setSelectedUser(user || null);
    setSelectedTeam(team || null);
    setModalType(type);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('users')}
              className={`px-3 py-1.5 rounded ${
                viewMode === 'users'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Kullanıcılar
              </span>
            </button>
            <button
              onClick={() => setViewMode('teams')}
              className={`px-3 py-1.5 rounded ${
                viewMode === 'teams'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4" />
                Ekipler
              </span>
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleAction(viewMode === 'users' ? 'create-user' : 'create-team')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            {viewMode === 'users' ? 'Yeni Kullanıcı' : 'Yeni Ekip'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={viewMode === 'users' ? "Kullanıcı ara..." : "Ekip ara..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {viewMode === 'users' ? (
        // Users Table
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ekip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profiller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Giriş
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user.team}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <UserCircle className="w-4 h-4" />
                      <span>{user.profiles}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction('login', user)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Kullanıcı Olarak Giriş Yap"
                      >
                        <LogIn className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction('edit-user', user)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Düzenle"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction('delete-user', user)}
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
      ) : (
        // Teams Table
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ekip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Açıklama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Üye Sayısı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profiller
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
              {teams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <UsersIcon className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{team.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {team.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <UsersIcon className="w-4 h-4" />
                      <span>{team.memberCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {team.profiles.map((profile, index) => (
                        <span key={index} className="text-sm text-gray-500">
                          {profile}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      team.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {team.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction('edit-team', undefined, team)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="Düzenle"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction('delete-team', undefined, team)}
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
      )}

      {/* Modals */}
      {modalType === 'create-user' && (
        <CreateUserModal teams={teams} onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'edit-user' && selectedUser && (
        <EditUserModal
          user={selectedUser}
          teams={teams}
          onClose={() => setModalType(null)}
        />
      )}
      
      {modalType === 'delete-user' && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'login' && selectedUser && (
        <LoginAsUserModal
          user={selectedUser}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'create-team' && (
        <CreateTeamModal onClose={() => setModalType(null)} />
      )}
      
      {modalType === 'edit-team' && selectedTeam && (
        <EditTeamModal
          team={selectedTeam}
          onClose={() => setModalType(null)}
        />
      )}
      
      {modalType === 'delete-team' && selectedTeam && (
        <DeleteTeamModal
          team={selectedTeam}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}

export default Users;