import React from 'react';
import { Button, Icon } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { S, useI18n } from '../../../shared/i18n';
import { IssueHeading, IssueLayout, MethodList, PaymentConsent, PaymentSummary } from '../components';
import { useCheckoutPayment } from '../hooks/useCheckoutPayment';

export function CheckoutPaymentScreen(props: any) {
  const { t } = useI18n();
  const p = useCheckoutPayment(props);

  return (
    <IssueLayout
      step={4}
      onBack={p.onBack}
      footer={
        <>
          <PaymentConsent
            agreed={p.agreed}
            onToggle={p.toggleAgreed}
            onTerms={p.openTerms}
            onPrivacy={p.openPrivacy}
          />
          <Button
            label={t(S.checkout.payment.issue)}
            disabled={!p.canIssue}
            onPress={p.onIssue}
            endIcon={<Icon name="shieldCheck" size={21} color={colors.white} />}
          />
        </>
      }
    >
      <IssueHeading title={S.checkout.payment.title} subtitle={S.checkout.payment.subtitle} />
      <PaymentSummary product={p.product} cover={p.cover} covers={p.covers} yearly={p.yearly} />
      <IssueHeading
        title={S.checkout.payment.methodTitle}
        subtitle={S.checkout.payment.methodSubtitle}
      />
      <MethodList value={p.method} onChange={p.setMethod} />
    </IssueLayout>
  );
}
