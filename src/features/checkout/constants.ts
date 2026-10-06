import type { IconName } from '../../assets/icons/iconXml';
import { Phrase, S } from '../../shared/i18n';
import type { Profile } from '../../shared/state/FlowContext';

export type Method = {
  key: string;
  label: Phrase;
  desc: Phrase;
  icon: IconName;
  brand?: 'fill' | 'inset';
};

export const METHODS: Method[] = [
  {
    key: 'fawry',
    label: S.checkout.payment.fawry,
    desc: S.checkout.payment.fawryDesc,
    icon: 'fawry',
    brand: 'fill',
  },
  {
    key: 'card',
    label: S.checkout.payment.card,
    desc: S.checkout.payment.cardDesc,
    icon: 'mastercard',
    brand: 'inset',
  },
  {
    key: 'wallet',
    label: S.checkout.payment.wallet,
    desc: S.checkout.payment.walletDesc,
    icon: 'wallet',
  },
];

export const METHOD_BADGE = 40;

export const MEDICAL_QUESTIONS: { key: string; text: Phrase }[] = [
  { key: 'chronic', text: S.checkout.medical.chronic },
  { key: 'critical', text: S.checkout.medical.critical },
  { key: 'surgery', text: S.checkout.medical.surgery },
];

export const EDIT_FIELDS: { key: keyof Profile; label: Phrase; numeric?: boolean }[] = [
  { key: 'fullName', label: S.checkout.personal.fullName },
  { key: 'nationalId', label: S.checkout.personal.nationalId, numeric: true },
  { key: 'governorate', label: S.checkout.personal.governorate },
  { key: 'city', label: S.checkout.personal.city },
  { key: 'age', label: S.checkout.personal.age, numeric: true },
  { key: 'maritalStatus', label: S.checkout.personal.maritalStatus },
];

export const SHEET_TRAVEL = 620;

export const SEAL = { ring: 120, disc: 84 };
