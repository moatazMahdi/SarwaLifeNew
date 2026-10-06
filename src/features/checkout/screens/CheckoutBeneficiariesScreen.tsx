import React from 'react';
import { Button } from '../../../shared/components';
import { S, useI18n } from '../../../shared/i18n';
import { GoldNote, HeirsCard, IssueHeading, IssueLayout, PolicyChip } from '../components';
import { useCheckoutBeneficiaries } from '../hooks/useCheckoutBeneficiaries';

export function CheckoutBeneficiariesScreen(props: any) {
  const { t } = useI18n();
  const { product, onBack, onNext } = useCheckoutBeneficiaries(props);

  return (
    <IssueLayout
      step={2}
      onBack={onBack}
      footer={<Button label={t(S.common.next)} onPress={onNext} />}
    >
      <IssueHeading
        title={S.checkout.beneficiaries.title}
        subtitle={S.checkout.beneficiaries.subtitle}
      />
      <PolicyChip product={product} compact />
      <HeirsCard />
      <GoldNote text={S.checkout.beneficiaries.note} />
    </IssueLayout>
  );
}
