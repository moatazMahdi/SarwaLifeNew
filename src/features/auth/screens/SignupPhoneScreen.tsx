import React from 'react';
import { S, useI18n } from '../../../shared/i18n';
import { AuthFormLayout, LegalConsent, PhoneForm, SignupIntro } from '../components';
import { usePhoneStep } from '../hooks/usePhoneStep';

export function SignupPhoneScreen(props: any) {
  const { t } = useI18n();
  const { phone, canContinue, onContinue, onBack, openTerms, openPrivacy } = usePhoneStep(
    props,
    'SignupOtp',
  );

  return (
    <AuthFormLayout title={t(S.auth.signupPhone.header)} onBack={onBack}>
      <SignupIntro />
      <PhoneForm phone={phone} canContinue={canContinue} onContinue={onContinue}>
        <LegalConsent onTerms={openTerms} onPrivacy={openPrivacy} />
      </PhoneForm>
    </AuthFormLayout>
  );
}
