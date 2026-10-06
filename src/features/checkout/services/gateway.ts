import { Phrase, S } from '../../../shared/i18n';

export const METHOD_LABELS: Record<string, Phrase> = {
  fawry: S.checkout.methodNames.fawry,
  card: S.checkout.methodNames.card,
  wallet: S.checkout.methodNames.wallet,
};

const GATEWAY_STUB: 'firstAttemptFails' | 'alwaysSucceeds' = 'firstAttemptFails';

export function settle(attempt: number): 'paid' | 'failed' {
  return GATEWAY_STUB === 'alwaysSucceeds' || attempt > 1 ? 'paid' : 'failed';
}
