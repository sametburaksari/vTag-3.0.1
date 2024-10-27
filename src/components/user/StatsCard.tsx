import React from 'react';
import { ArrowUp } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  trend: string;
}

export function StatsCard({ label, value, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-sm text-gray-600 mb-1">{label}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      <div className="flex items-center gap-1 text-sm text-green-600">
        <ArrowUp className="w-4 h-4" />
        <span>{trend}</span>
      </div>
    </div>
  );
}