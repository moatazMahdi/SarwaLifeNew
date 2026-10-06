import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ageFromDob, OptionalKey, QuoteInput, QuoteResult } from '../data/products';
import { ProductKey } from '../theme';

export type Profile = {
  fullName: string;
  nationalId: string;
  address: string;
  birthDate: string;
  phone: string;

  governorate: string;
  city: string;

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

const DEMO_DOB = '15/07/1992';

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

  clearCaptures: (what: 'id' | 'selfie') => void;

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
