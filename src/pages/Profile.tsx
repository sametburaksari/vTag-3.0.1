import React from 'react';
import { useParams } from 'react-router-dom';
import { ClassicProfile } from '../components/profile/ClassicProfile';
import { Phone, Mail, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';

export function Profile() {
  const { username } = useParams();
  const isModern = username?.includes('modern');
  const isHQ = username?.includes('hq');

  // Mock data
  const profileData = {
    name: 'Ahmet Yılmaz',
    title: 'Yazılım Geliştirici',
    company: 'Tech Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Yazılım geliştirme ve dijital dönüşüm konularında 10+ yıl deneyim',
    location: 'İstanbul, Türkiye',
    contacts: [
      { type: 'phone', value: '+90 555 123 4567', icon: Phone, label: 'Telefon' },
      { type: 'email', value: 'ahmet@example.com', icon: Mail, label: 'E-posta' },
      { type: 'website', value: 'www.ahmetyilmaz.com', icon: Globe, label: 'Website' },
      { type: 'linkedin', value: 'in/ahmetyilmaz', icon: Linkedin, label: 'LinkedIn' },
      { type: 'twitter', value: '@ahmetyilmaz', icon: Twitter, label: 'Twitter' },
      { type: 'instagram', value: '@ahmetyilmaz', icon: Instagram, label: 'Instagram' }
    ]
  };

  if (isModern) {
    return <div>Modern Template (Yakında)</div>;
  }

  if (isHQ) {
    return <div>HQ Template (Yakında)</div>;
  }

  return <ClassicProfile data={profileData} />;
}