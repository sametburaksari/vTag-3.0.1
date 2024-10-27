import { ProfileData } from '../types/profile';

export function generateVCard(data: ProfileData): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name}`,
    `TITLE:${data.title}`,
    `ORG:${data.company}`,
    `NOTE:${data.bio}`,
    `ADR:;;${data.location}`,
    ...data.contacts
      .filter(contact => contact.type === 'phone')
      .map(phone => `TEL:${phone.value}`),
    ...data.contacts
      .filter(contact => contact.type === 'email')
      .map(email => `EMAIL:${email.value}`),
    'END:VCARD'
  ];

  return vcard.join('\n');
}