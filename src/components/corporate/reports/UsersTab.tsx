import React from 'react';

interface UsersTabProps {
  userActivity: {
    user: string;
    views: number;
    qrScans: number;
    saves: number;
  }[];
}

export function UsersTab({ userActivity }: UsersTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Kullanıcı Aktiviteleri</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">Kullanıcı</th>
              <th className="pb-3">Görüntülenme</th>
              <th className="pb-3">QR Tarama</th>
              <th className="pb-3">Rehbere Eklenme</th>
            </tr>
          </thead>
          <tbody>
            {userActivity.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{user.user}</td>
                <td>{user.views.toLocaleString()}</td>
                <td>{user.qrScans.toLocaleString()}</td>
                <td>{user.saves.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}