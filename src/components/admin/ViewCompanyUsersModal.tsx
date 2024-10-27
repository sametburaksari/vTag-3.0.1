import React from 'react';
import { X, UserPlus } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo?: string;
  totalLicenses: number;
  activeLicenses: number;
}

interface ViewCompanyUsersModalProps {
  company: Company;
  onClose: () => void;
}

export function ViewCompanyUsersModal({ company, onClose }: ViewCompanyUsersModalProps) {
  // Mock data - gerçek uygulamada API'den gelecek
  const users = [
    {
      id: '1',
      name: 'Ali Yılmaz',
      email: 'ali@example.com',
      role: 'Yönetici',
      status: 'active',
      lastLogin: '2 saat önce'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      role: 'Kullanıcı',
      status: 'active',
      lastLogin: '1 gün önce'
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                {getInitials(company.name)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{company.name} - Kullanıcılar</h3>
              <p className="text-sm text-gray-500">
                {company.activeLicenses}/{company.totalLicenses} lisans kullanımda
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 border-b">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <UserPlus className="w-4 h-4" />
            Yeni Kullanıcı
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-lg overflow-hidden">
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
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Son Giriş
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-medium">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}