import { Phrase, S } from '../../i18n';

/**
 * The seam where a real payment provider will be bolted on.
 *
 * There is no in-app wait any more. Paying means leaving the app for the provider's own
 * page and coming back with one of two answers, so the flow has exactly two destinations:
 * `PolicyIssued` or `PaymentFailed`. The three-step loader that used to stand between them
 * narrated work this app does not do — it was theatre over a `setTimeout`, and it made a
 * hand-off that takes the user out to a browser look like something happening in here.
 *
 * When the provider is wired up, `settle` becomes the callback that reads its result and
 * nothing else in the flow has to move.
 */

/**
 * How the receipt names the method the user chose. Phrases, not strings: this table is
 * built at module load, so the language it will be read in is not known yet.
 */
export const METHOD_LABELS: Record<string, Phrase> = {
  fawry: S.checkout.methodNames.fawry,
  card: S.checkout.methodNames.card,
  wallet: S.checkout.methodNames.wallet,
};

/**
 * `'firstAttemptFails'` walks a demo through both branches the flow has to support — the
 * failure screen once, then a retry on the same method that goes through. Set it to
 * `'alwaysSucceeds'` for a clean happy-path run.
 */
const GATEWAY_STUB: 'firstAttemptFails' | 'alwaysSucceeds' = 'firstAttemptFails';

/** @param attempt 1-based — the charge the user is making right now, not the ones before it. */
export function settle(attempt: number): 'paid' | 'failed' {
  return GATEWAY_STUB === 'alwaysSucceeds' || attempt > 1 ? 'paid' : 'failed';
}
