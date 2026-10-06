import { useCallback, useEffect, useRef, useState } from 'react';
import { Phrase, S, useI18n } from '../../../shared/i18n';

export const CODE_LEN = 6;
export const RESEND_SECONDS = 47;

export const DEMO_CODE = '412345';

const AUTOFILL_MS = 2200;

const AUTOVERIFY_MS = 550;

export const OTP_ERROR: Phrase = S.auth.otp.error;

const ATTEMPTS_BEFORE_RESEND = 3;

export function useOtpEntry(onSuccess: () => void) {
  const { t, n } = useI18n();
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<Phrase | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [left, setLeft] = useState(RESEND_SECONDS);

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

    setVerifying(false);
    setError(OTP_ERROR);
    setAttempts((tries) => tries + 1);
  }, [code]);

  useEffect(() => {
    if (left <= 0) return;
    const timer = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  const filled = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filled.current) return;
      filled.current = true;
      setCode((c) => (c.length === 0 ? DEMO_CODE : c));
    }, AUTOFILL_MS);
    return () => clearTimeout(timer);
  }, []);

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

    countdown: `${n(mm)}:${n(ss)}`,
    complete: code.length === CODE_LEN,
  };
}
