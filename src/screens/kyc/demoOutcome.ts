import { toNsn } from '../../components/PhoneField';

/**
 * The demo's rejected identity.
 *
 * There is no OCR and no face-match service behind this build, so something has to decide
 * whether a scan "worked". Deciding it by phone number — rather than by a constant someone
 * has to edit and rebuild for — means both outcomes are reachable from the same binary:
 * sign up with any ordinary number and the flow runs clean, sign up with this one and the
 * rejection screens appear on cue. A walkthrough can show the happy path and the failure
 * path back to back without anybody touching the code between them.
 *
 * `01010101010` is deliberately synthetic — a valid Egyptian prefix (010) and the right
 * eleven digits, so it passes the field's own validation, but alternating enough that it
 * is quick to tap on a phone and impossible to mistake for a real customer's number.
 */
export const KYC_FAIL_PHONE = '01010101010';

/** Tolerates whatever formatting the caller has — the stored value is digits-only anyway. */
export const isKycFailPhone = (phone?: string) => toNsn(phone ?? '') === KYC_FAIL_PHONE;

/**
 * Whether this particular attempt should be rejected.
 *
 * Only the *first* try at each stage fails, even for the demo number. A number that failed
 * forever would be a dead end: the retry button on the rejection screen sends the user back
 * to re-shoot, the same number is still on the account, and he would loop through the same
 * refusal with no way forward — which is a worse demo than never showing the screen at all.
 * Failing once and passing on the retry is also the honest shape of the real thing: a bad
 * photograph, then a better one.
 */
export const shouldFailKyc = (phone: string | undefined, attempt: number) =>
  isKycFailPhone(phone) && attempt === 1;
