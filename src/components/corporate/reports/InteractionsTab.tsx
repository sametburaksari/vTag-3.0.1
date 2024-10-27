import React from 'react';
import { Phone, Mail, Globe, Share2 } from 'lucide-react';

interface InteractionsTabProps {
  interactionData: {
    type: string;
    total: number;
    conversion: number;
  }[];
}

export function InteractionsTab({ interactionData }: InteractionsTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Etkileşim Detayları</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">Bilgi Tipi</th>
              <th className="pb-3">Toplam Görüntülenme</th>
              <th className="pb-3">Dönüşüm Oranı</th>
              <th className="pb-3">Performans</th>
            </tr>
          </thead>
          <tbody>
            {interactionData.map((interaction, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {interaction.type === 'Telefon' && <Phone className="w-4 h-4 text-gray-400" />}
                    {interaction.type === 'E-posta' && <Mail className="w-4 h-4 text-gray-400" />}
                    {interaction.type === 'Website' && <Globe className="w-4 h-4 text-gray-400" />}
                    {interaction.type === 'LinkedIn' && <Share2 className="w-4 h-4 text-gray-400" />}
                    {interaction.type === 'Twitter' && <Share2 className="w-4 h-4 text-gray-400" />}
                    <span>{interaction.type}</span>
                  </div>
                </td>
                <td>{interaction.total.toLocaleString()}</td>
                <td>{interaction.conversion}%</td>
                <td>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${interaction.conversion}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}