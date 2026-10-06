import { toNsn } from '../../../shared/utils/phone';

export const KYC_FAIL_PHONE = '01010101010';

export const isKycFailPhone = (phone?: string) => toNsn(phone ?? '') === KYC_FAIL_PHONE;

export const shouldFailKyc = (phone: string | undefined, attempt: number) =>
  isKycFailPhone(phone) && attempt === 1;
