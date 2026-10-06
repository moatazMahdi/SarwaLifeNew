import { Phrase, S } from '../i18n';

export const NSN_LEN = 11;

export const LRM = '‎';

export const PHONE_ERROR: Phrase = S.auth.phoneField.error;

export const PHONE_PLACEHOLDER = `${LRM}0100 000 0000`;

export function toNsn(raw: string) {
  return raw.replace(/[^0-9]/g, '').slice(0, NSN_LEN);
}

export function groupPhone(nsn: string) {
  const g = [nsn.slice(0, 4), nsn.slice(4, 7), nsn.slice(7, 11)];
  const grouped = g.filter(Boolean).join(' ');
  return grouped ? LRM + grouped : '';
}

export const isCompleteNsn = (nsn: string) => nsn.length === NSN_LEN && /^01[0125]/.test(nsn);

export function maskPhone(nsn: string) {
  const n = nsn || '01000000000';
  return `${LRM}${n.slice(0, 4)} •••• ${n.slice(-2)}`;
}
