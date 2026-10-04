import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ageFromDob, OptionalKey, QuoteInput, QuoteResult } from '../data/products';
import { ProductKey } from '../theme';

export type Profile = {
  fullName: string;
  nationalId: string;
  address: string;
  birthDate: string;
  phone: string;
  // Read off the card alongside the above and shown on "راجع بياناتك" (Figma 2070:4463).
  governorate: string;
  city: string;
  /**
   * A bare count — "33", not "٣٣ سنة". The card gives a birth date, so the age is worked
   * out by this app rather than read off it, which makes it the one profile value that is
   * ours to format: screens write it with `n()` so it picks up Arabic-Indic digits under
   * `ar`, and pair it with a translated unit. Baked as a phrase it stayed Arabic-Indic in
   * English mode, which no other number in the app does.
   */
  age: string;
  maritalStatus: string;
};

export type MedicalAnswers = Record<string, boolean | null>;

export type Beneficiary = { id: string; name: string; relation: string; share: number };

type FlowState = {
  productKey: ProductKey | null;
  quote: Partial<QuoteInput>;
  result: QuoteResult | null;
  idFrontUri?: string;
  idBackUri?: string;
  selfieUri?: string;
  profile: Profile | null;
  isLoggedIn: boolean;
  legalHeirs: boolean;
  beneficiaries: Beneficiary[];
  medical: MedicalAnswers;
  paymentMethod: string | null;
  /**
   * How many times the gateway has been asked to charge this policy. A real integration
   * needs this for idempotency; here it is also what lets the stubbed gateway tell a first
   * attempt from a retry.
   */
  paymentAttempts: number;
  policyNumber: string | null;
};

const EMPTY: FlowState = {
  productKey: null,
  quote: {},
  result: null,
  profile: null,
  isLoggedIn: false,
  legalHeirs: true,
  beneficiaries: [],
  medical: {},
  paymentMethod: null,
  paymentAttempts: 0,
  policyNumber: null,
};

/** The demo card's date of birth, in the `DD/MM/YYYY` form the rest of the app reads. */
const DEMO_DOB = '15/07/1992';

/**
 * بيانات تجريبية تُحاكي ما يعود من قراءة بطاقة الرقم القومي.
 * القيم مطابقة لما ترسمه شاشة «راجع بياناتك» في فيجما (2070:4463).
 *
 * Two of these values used to contradict the two beside them, on the one screen in the app
 * that draws a green verified tick next to every row:
 *
 *   • `age` was the literal `'33'`. The card gives a birth date and the app derives the age
 *     from it everywhere else, so freezing the answer meant it was right in the year the comp
 *     was drawn and has been wrong since — 15/07/1992 is 34 today, and would have gone on
 *     drifting a year at a time. It is computed below instead, from the same `ageFromDob`
 *     the quote prices off, so the two can no longer disagree.
 *
 *   • `nationalId` was `'5465165416516'` — thirteen digits. An Egyptian national ID is
 *     fourteen, and every Egyptian knows it on sight, which makes a short one the first thing
 *     this audience would notice on a screen asking them to confirm their identity. It is
 *     also not an opaque serial: the card number *encodes* the two rows printed under it.
 *     The replacement spells them out — `2` (born in the 1900s), `920715` (15 July 1992),
 *     `17` (المنوفية), then the serial. Only the trailing check digit is arbitrary; the
 *     published checksum for this document is not something to invent.
 */
export const DEMO_PROFILE: Profile = {
  fullName: 'محمد جابر السيد محمد',
  nationalId: '29207151701458',
  address: 'مركز ومدينة السادات، المنوفية',
  birthDate: DEMO_DOB,
  phone: '',
  governorate: 'المنوفية',
  city: 'مركز ومدينة السادات',
  age: String(ageFromDob(DEMO_DOB)),
  maritalStatus: 'متزوج',
};

type FlowContextValue = FlowState & {
  setProduct: (key: ProductKey) => void;
  patchQuote: (patch: Partial<QuoteInput>) => void;
  toggleOptional: (key: OptionalKey) => void;
  setResult: (r: QuoteResult | null) => void;
  setIdImage: (side: 'front' | 'back', uri: string) => void;
  setSelfie: (uri: string) => void;
  /**
   * Drops the captured images so a rejected scan is genuinely re-shot. Without this the
   * capture screen comes back with both slots still filled and "التالي" already lit, which
   * would send the same unreadable photographs through a second time.
   */
  clearCaptures: (what: 'id' | 'selfie') => void;
  /**
   * Counts this run at one of the two identity checks and hands back the attempt number,
   * 1 on the first pass. Deliberately not React state: the caller is a loader callback
   * firing seconds after mount, and it needs the count *now* to choose which screen to go
   * to — a `setState` would not have landed in time to be read back.
   */
  recordKycAttempt: (stage: 'id' | 'liveness') => number;
  setProfile: (p: Profile) => void;
  login: (phone: string) => void;
  setLegalHeirs: (v: boolean) => void;
  setBeneficiaries: (b: Beneficiary[]) => void;
  setMedical: (key: string, value: boolean) => void;
  setPaymentMethod: (m: string) => void;
  recordPaymentAttempt: () => void;
  issuePolicy: () => string;
  reset: () => void;
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FlowState>(EMPTY);

  const setProduct = useCallback((key: ProductKey) => {
    setState((s) => (s.productKey === key ? s : { ...s, productKey: key, quote: {}, result: null }));
  }, []);

  const patchQuote = useCallback((patch: Partial<QuoteInput>) => {
    setState((s) => ({ ...s, quote: { ...s.quote, ...patch } }));
  }, []);

  const toggleOptional = useCallback((key: OptionalKey) => {
    setState((s) => {
      const cur = s.quote.optionals ?? [];
      const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
      return { ...s, quote: { ...s.quote, optionals: next } };
    });
  }, []);

  const setResult = useCallback((r: QuoteResult | null) => setState((s) => ({ ...s, result: r })), []);

  const setIdImage = useCallback((side: 'front' | 'back', uri: string) => {
    setState((s) => ({ ...s, [side === 'front' ? 'idFrontUri' : 'idBackUri']: uri }));
  }, []);

  const setSelfie = useCallback((uri: string) => setState((s) => ({ ...s, selfieUri: uri })), []);

  const clearCaptures = useCallback((what: 'id' | 'selfie') => {
    setState((s) =>
      what === 'id'
        ? { ...s, idFrontUri: undefined, idBackUri: undefined }
        : { ...s, selfieUri: undefined },
    );
  }, []);

  // Nothing renders from this, so a ref keeps it out of the render cycle entirely.
  const kycAttempts = useRef({ id: 0, liveness: 0 });

  const recordKycAttempt = useCallback((stage: 'id' | 'liveness') => {
    kycAttempts.current[stage] += 1;
    return kycAttempts.current[stage];
  }, []);

  const setProfile = useCallback((p: Profile) => setState((s) => ({ ...s, profile: p })), []);

  const login = useCallback((phone: string) => {
    setState((s) => ({
      ...s,
      isLoggedIn: true,
      profile: s.profile ? { ...s.profile, phone } : { ...DEMO_PROFILE, phone },
    }));
  }, []);

  const setLegalHeirs = useCallback((v: boolean) => setState((s) => ({ ...s, legalHeirs: v })), []);

  const setBeneficiaries = useCallback(
    (b: Beneficiary[]) => setState((s) => ({ ...s, beneficiaries: b })),
    [],
  );

  const setMedical = useCallback((key: string, value: boolean) => {
    setState((s) => ({ ...s, medical: { ...s.medical, [key]: value } }));
  }, []);

  const setPaymentMethod = useCallback((m: string) => setState((s) => ({ ...s, paymentMethod: m })), []);

  const recordPaymentAttempt = useCallback(
    () => setState((s) => ({ ...s, paymentAttempts: s.paymentAttempts + 1 })),
    [],
  );

  const issuePolicy = useCallback(() => {
    const num = `SL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 899999)}`;
    setState((s) => ({ ...s, policyNumber: num }));
    return num;
  }, []);

  const reset = useCallback(() => {
    // The ref is outside `state`, so clearing the latter would otherwise leave a fresh run
    // carrying the previous one's attempt counts and skipping the rejection it should show.
    kycAttempts.current = { id: 0, liveness: 0 };
    setState(EMPTY);
  }, []);

  const value = useMemo<FlowContextValue>(
    () => ({
      ...state,
      setProduct,
      patchQuote,
      toggleOptional,
      setResult,
      setIdImage,
      setSelfie,
      clearCaptures,
      recordKycAttempt,
      setProfile,
      login,
      setLegalHeirs,
      setBeneficiaries,
      setMedical,
      setPaymentMethod,
      recordPaymentAttempt,
      issuePolicy,
      reset,
    }),
    [
      state,
      setProduct,
      patchQuote,
      toggleOptional,
      setResult,
      setIdImage,
      setSelfie,
      clearCaptures,
      recordKycAttempt,
      setProfile,
      login,
      setLegalHeirs,
      setBeneficiaries,
      setMedical,
      setPaymentMethod,
      recordPaymentAttempt,
      issuePolicy,
      reset,
    ],
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow(): FlowContextValue {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error('useFlow must be used inside <FlowProvider>');
  return ctx;
}
