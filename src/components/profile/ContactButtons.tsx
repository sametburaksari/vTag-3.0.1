import React from 'react';
import { Share2 } from 'lucide-react';
import { Contact } from '../../types/profile';

interface ContactButtonsProps {
  contacts: Contact[];
  variant?: 'modern' | 'classic' | 'hq';
}

export function ContactButtons({ contacts, variant = 'modern' }: ContactButtonsProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'modern':
        return 'bg-white/20 hover:bg-white/30 text-white';
      case 'hq':
        return 'bg-white/10 hover:bg-white/20 text-white';
      default:
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  const handleContact = (contact: Contact) => {
    let url = '';
    switch (contact.type) {
      case 'phone':
        url = `tel:${contact.value}`;
        break;
      case 'email':
        url = `mailto:${contact.value}`;
        break;
      case 'website':
        url = contact.value.startsWith('http') ? contact.value : `https://${contact.value}`;
        break;
      case 'linkedin':
        url = `https://linkedin.com/${contact.value}`;
        break;
      case 'twitter':
        url = `https://twitter.com/${contact.value}`;
        break;
      case 'instagram':
        url = `https://instagram.com/${contact.value}`;
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-3 p-6">
      {contacts.map((contact, index) => (
        <button
          key={index}
          onClick={() => handleContact(contact)}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-between transition-all ${getButtonStyle()}`}
        >
          <div className="flex items-center gap-3">
            <contact.icon className="w-5 h-5" />
            <span>{contact.value}</span>
          </div>
          <Share2 className="w-4 h-4 opacity-70" />
        </button>
      ))}
    </div>
  );
}