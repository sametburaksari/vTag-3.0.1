import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { ProfileData } from '../../types/profile';

interface ProfileHeaderProps {
  data: ProfileData;
  variant?: 'modern' | 'classic' | 'hq';
}

export function ProfileHeader({ data, variant = 'modern' }: ProfileHeaderProps) {
  const getHeaderStyle = () => {
    switch (variant) {
      case 'modern':
        return 'bg-gradient-to-br from-purple-500 to-pink-500 text-white';
      case 'hq':
        return 'bg-gradient-to-br from-slate-900 to-slate-800 text-white';
      default:
        return 'bg-white text-gray-800';
    }
  };

  return (
    <div className={`p-8 text-center ${getHeaderStyle()}`}>
      <img
        src={data.avatar}
        alt={data.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
      />
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      <p className="text-lg opacity-90 mb-2">{data.title}</p>
      
      <div className="flex items-center justify-center gap-4 mt-4 text-sm">
        {data.company && (
          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            <span>{data.company}</span>
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{data.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}