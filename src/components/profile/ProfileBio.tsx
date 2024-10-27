import React from 'react';

interface ProfileBioProps {
  bio: string;
  variant?: 'modern' | 'classic' | 'hq';
}

export function ProfileBio({ bio, variant = 'modern' }: ProfileBioProps) {
  const getBioStyle = () => {
    switch (variant) {
      case 'modern':
      case 'hq':
        return 'text-white/90';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="px-6 py-4 text-center">
      <p className={`leading-relaxed ${getBioStyle()}`}>{bio}</p>
    </div>
  );
}