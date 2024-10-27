import { LucideIcon } from 'lucide-react';

export interface Contact {
  type: string;
  value: string;
  icon: LucideIcon;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  location: string;
  contacts: Contact[];
}