import { useCallback, useEffect, useRef, useState } from 'react';
import { Phrase, S, useI18n } from '../../i18n';

export const CODE_LEN = 6;
export const RESEND_SECONDS = 47;

/**
 * There is no SMS gateway behind this build, so the "received" code is fixed. Entering it
 * by hand works exactly like the auto-filled path — and entering anything else is what
 * exercises the failure branch.
 *
 * This is the seam: replace `verify` below with the provider's call when there is one.
 */
export const DEMO_CODE = '412345';
/** How long the pretend SMS takes to arrive before it drops itself into the boxes. */
const AUTOFILL_MS = 2200;
/** Beat between a complete code and the automatic submit, so the user sees it land. */
const AUTOVERIFY_MS = 550;

/**
 * A `Phrase`, not a finished string: this is evaluated at module load, before a language is
 * known, so it is written at render instead.
 */
export const OTP_ERROR: Phrase = S.auth.otp.error;

/**
 * After this many rejected codes the resend link opens regardless of the countdown. Someone
 * who has mistyped three times is usually not mistyping at all — the SMS went to an old
 * handset, or never arrived — and making him watch out the rest of a 47-second timer before
 * he can ask for another one is the point where he closes the app.
 */
const ATTEMPTS_BEFORE_RESEND = 3;

/**
 * Everything the two OTP screens do that is not layout: the countdown, the stand-in SMS,
 * the automatic submit, and the wrong-code branch.
 *
 * It lives in one place because login and account creation draw the *same* screen — Figma
 * 2069:3845 and 2070:3956 differ only in the page header and where "تأكيد" leads. Two
 * copies of this logic would be two chances for the two screens to start behaving
 * differently, which is the sort of difference no one notices until a user reports it.
 */
export function useOtpEntry(onSuccess: () => void) {
  const { t, n } = useI18n();
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<Phrase | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [left, setLeft] = useState(RESEND_SECONDS);

  /** Typing is how a user answers the error, so it is also what dismisses it. */
  const onChangeText = useCallback((next: string) => {
    setCode(next);
    setError(null);
  }, []);

  const successRef = useRef(onSuccess);
  successRef.current = onSuccess;

  const verify = useCallback(() => {
    if (code === DEMO_CODE) {
      successRef.current();
      return;
    }
    // The digits are left in the boxes rather than wiped. A wrong code is usually one wrong
    // digit, and clearing all six makes the user retype the five he got right.
    setVerifying(false);
    setError(OTP_ERROR);
    setAttempts((tries) => tries + 1);
  }, [code]);

  /* ── resend countdown ── */
  useEffect(() => {
    if (left <= 0) return;
    const timer = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  /* ── auto-fill: stands in for the platform SMS retriever, which needs a real message ── */
  const filled = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filled.current) return;
      filled.current = true;
      setCode((c) => (c.length === 0 ? DEMO_CODE : c));
    }, AUTOFILL_MS);
    return () => clearTimeout(timer);
  }, []);

  /* ── auto-verify: a complete code submits itself ── */
  const verifyRef = useRef(verify);
  verifyRef.current = verify;
  useEffect(() => {
    if (code.length !== CODE_LEN) {
      setVerifying(false);
      return;
    }
    setVerifying(true);
    const timer = setTimeout(() => verifyRef.current(), AUTOVERIFY_MS);
    return () => clearTimeout(timer);
  }, [code]);

  const onResend = useCallback(() => {
    filled.current = false;
    setCode('');
    setError(null);
    setAttempts(0);
    setLeft(RESEND_SECONDS);
  }, []);

  const canResend = left <= 0 || attempts >= ATTEMPTS_BEFORE_RESEND;

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');

  return {
    code,
    onChangeText,
    verifying,
    error: error ? t(error) : null,
    verify,
    canResend,
    onResend,
    // A bare counter, so it takes the language's own digits — Arabic-Indic under `ar`. The
    // colon between two digit runs is a bidi "common separator", so the clock still reads
    // left-to-right inside the Arabic sentence without needing an LRM of its own.
    countdown: `${n(mm)}:${n(ss)}`,
    complete: code.length === CODE_LEN,
  };
}
