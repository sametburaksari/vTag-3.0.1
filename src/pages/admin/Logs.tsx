import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

type LogLevel = 'error' | 'warning' | 'info' | 'success';
type LogCategory = 'auth' | 'system' | 'user' | 'profile' | 'company' | 'domain';

interface Log {
  id: string;
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  details: string;
  ip: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<LogCategory | 'all'>('all');

  // Mock data
  const logs: Log[] = [
    {
      id: '1',
      timestamp: '2024-03-20 14:30:45',
      level: 'error',
      category: 'auth',
      message: 'Başarısız giriş denemesi',
      details: 'Kullanıcı adı veya şifre hatalı',
      ip: '192.168.1.100',
      user: {
        id: '1',
        name: 'Ali Yılmaz',
        email: 'ali@example.com'
      }
    },
    {
      id: '2',
      timestamp: '2024-03-20 14:25:12',
      level: 'success',
      category: 'profile',
      message: 'Profil güncellendi',
      details: 'Profil bilgileri başarıyla güncellendi',
      ip: '192.168.1.101',
      user: {
        id: '2',
        name: 'Ayşe Demir',
        email: 'ayse@example.com'
      }
    },
    {
      id: '3',
      timestamp: '2024-03-20 14:20:00',
      level: 'warning',
      category: 'system',
      message: 'Yüksek CPU kullanımı',
      details: 'CPU kullanımı %85 seviyesine ulaştı',
      ip: 'localhost'
    }
  ];

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getLevelClass = (level: LogLevel) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Log Kayıtları</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Log ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as LogLevel | 'all')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Seviyeler</option>
            <option value="error">Hata</option>
            <option value="warning">Uyarı</option>
            <option value="info">Bilgi</option>
            <option value="success">Başarılı</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as LogCategory | 'all')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="auth">Kimlik Doğrulama</option>
            <option value="system">Sistem</option>
            <option value="user">Kullanıcı</option>
            <option value="profile">Profil</option>
            <option value="company">Firma</option>
            <option value="domain">Alan Adı</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zaman
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seviye
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mesaj
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getLevelIcon(log.level)}
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getLevelClass(log.level)}`}>
                      {log.level === 'error' && 'Hata'}
                      {log.level === 'warning' && 'Uyarı'}
                      {log.level === 'info' && 'Bilgi'}
                      {log.level === 'success' && 'Başarılı'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.category === 'auth' && 'Kimlik Doğrulama'}
                  {log.category === 'system' && 'Sistem'}
                  {log.category === 'user' && 'Kullanıcı'}
                  {log.category === 'profile' && 'Profil'}
                  {log.category === 'company' && 'Firma'}
                  {log.category === 'domain' && 'Alan Adı'}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.message}</p>
                    <p className="text-sm text-gray-500">{log.details}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.ip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.user ? (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                      <div className="text-sm text-gray-500">{log.user.email}</div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Sistem</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}