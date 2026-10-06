import { useState } from 'react';
import { MEDICAL_QUESTIONS } from '../constants';
import { useCheckoutProduct } from './useCheckoutProduct';

export function useCheckoutMedical({ navigation, route }: any) {
  const { flow, product } = useCheckoutProduct(route);

  const [answers, setAnswers] = useState<Record<string, boolean | null>>(() =>
    Object.fromEntries(MEDICAL_QUESTIONS.map((q) => [q.key, flow.medical[q.key] ?? null])),
  );

  function answer(key: string, value: boolean) {
    setAnswers((a) => ({ ...a, [key]: value }));
    flow.setMedical(key, value);
  }

  return {
    answers,
    answer,
    complete: MEDICAL_QUESTIONS.every((q) => answers[q.key] !== null),
    onBack: () => navigation?.goBack(),
    onNext: () => navigation?.navigate('CheckoutPayment', { product: product.key }),
  };
}
