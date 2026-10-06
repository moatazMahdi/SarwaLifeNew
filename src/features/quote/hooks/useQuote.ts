import { useMemo, useState } from 'react';
import {
  COVER_DEFAULT,
  NATIONALITIES,
  OptionalKey,
  ageFromDob,
  calcPremium,
  getProduct,
} from '../../../shared/data/products';
import { useFlow } from '../../../shared/state/FlowContext';
import { DobParts, EMPTY_DOB, dobToString } from '../utils/dob';

export function useQuote({ navigation, route }: any) {
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [calculating, setCalculating] = useState(false);

  const [dob, setDob] = useState<DobParts>(EMPTY_DOB);
  const [nationality, setNationality] = useState(NATIONALITIES[0][0]);
  const [smoker, setSmoker] = useState<boolean | null>(null);
  const [cover, setCover] = useState<number>(flow.quote.cover ?? COVER_DEFAULT);
  const [optionals, setOptionals] = useState<OptionalKey[]>(flow.quote.optionals ?? []);
  const [cards, setCards] = useState(flow.quote.cards ?? 1);

  const dobStr = useMemo(() => dobToString(dob), [dob]);
  const age = useMemo(() => ageFromDob(dobStr), [dobStr]);

  const result = useMemo(
    () =>
      calcPremium(product, {
        dob: dobStr,
        age,
        nationality,
        smoker: !!smoker,
        cover,
        optionals,
        cards,
      }),
    [product, dobStr, age, nationality, smoker, cover, optionals, cards],
  );

  const step1Valid = age >= 18 && age <= 65 && smoker !== null;

  function goTo(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function toggleOptional(key: OptionalKey) {
    setOptionals((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  }

  function onBack() {
    if (step > 1) goTo(step - 1);
    else navigation?.goBack();
  }

  function onNext() {
    if (step === 1) {
      flow.setProduct(product.key);
      flow.patchQuote({ dob: dobStr, age, nationality, smoker: !!smoker });
      goTo(2);
      return;
    }
    flow.patchQuote({ cover, optionals, cards });
    flow.setResult(result);
    setCalculating(true);
  }

  function onSave() {
    flow.setResult(result);
  }

  function onIssue() {
    flow.patchQuote({ dob: dobStr, age, nationality, smoker: !!smoker, cover, optionals, cards });
    flow.setResult(result);
    navigation?.navigate('LoginGate', { product: product.key });
  }

  function onCalculated() {
    setCalculating(false);
    goTo(3);
  }

  return {
    step,
    dir,
    calculating,
    dob,
    setDob,
    age,
    nationality,
    setNationality,
    smoker,
    setSmoker,
    cover,
    setCover,
    optionals,
    toggleOptional,
    cards,
    setCards,
    result,
    step1Valid,
    onBack,
    onNext,
    onSave,
    onIssue,
    onCalculated,
  };
}
