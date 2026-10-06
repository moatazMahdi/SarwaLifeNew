import { useState } from 'react';
import { DEMO_PROFILE } from '../../../shared/state/FlowContext';
import { Phrase, S, useI18n } from '../../../shared/i18n';
import { useCheckoutProduct } from './useCheckoutProduct';

export function useCheckoutPersonal({ navigation, route }: any) {
  const { t, n } = useI18n();
  const { flow, product } = useCheckoutProduct(route);
  const profile = flow.profile ?? DEMO_PROFILE;
  const [editing, setEditing] = useState(false);

  const fields: [label: Phrase, value: string][] = [
    [S.checkout.personal.fullName, profile.fullName],
    [S.checkout.personal.nationalId, profile.nationalId],
    [S.checkout.personal.governorate, profile.governorate],
    [S.checkout.personal.city, profile.city],
    [S.checkout.personal.age, `${n(profile.age)} ${t(S.checkout.personal.years)}`],
    [S.checkout.personal.maritalStatus, profile.maritalStatus],
  ];

  return {
    product,
    profile,
    fields,
    cover: flow.quote.cover ?? 0,
    monthly: flow.result?.monthly ?? 0,
    editing,
    openEdit: () => setEditing(true),
    closeEdit: () => setEditing(false),
    saveProfile: flow.setProfile,
    onBack: () => navigation?.goBack(),
    onNext: () => navigation?.navigate('CheckoutBeneficiaries', { product: product.key }),
  };
}
