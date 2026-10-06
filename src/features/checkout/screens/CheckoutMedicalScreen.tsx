import React from 'react';
import { Button } from '../../../shared/components';
import { S, useI18n } from '../../../shared/i18n';
import { GoldNote, IssueHeading, IssueLayout, MedicalAttest, MedicalQuestion } from '../components';
import { MEDICAL_QUESTIONS } from '../constants';
import { useCheckoutMedical } from '../hooks/useCheckoutMedical';

export function CheckoutMedicalScreen(props: any) {
  const { t } = useI18n();
  const { answers, answer, complete, onBack, onNext } = useCheckoutMedical(props);

  return (
    <IssueLayout
      step={3}
      onBack={onBack}
      footer={
        <>
          <MedicalAttest />
          <Button label={t(S.common.next)} disabled={!complete} onPress={onNext} />
        </>
      }
    >
      <IssueHeading title={S.checkout.medical.title} subtitle={S.checkout.medical.subtitle} />
      <GoldNote text={S.checkout.medical.note} />
      {MEDICAL_QUESTIONS.map((q) => (
        <MedicalQuestion
          key={q.key}
          text={q.text}
          value={answers[q.key]}
          onAnswer={(v) => answer(q.key, v)}
        />
      ))}
    </IssueLayout>
  );
}
