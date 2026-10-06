import React from 'react';
import { AuthFormLayout, LoginIntro, PhoneForm } from '../components';
import { usePhoneStep } from '../hooks/usePhoneStep';

export function LoginPhoneScreen(props: any) {
  const { phone, canContinue, onContinue, onBack } = usePhoneStep(props, 'LoginOtp');

  return (
    <AuthFormLayout onBack={onBack}>
      <LoginIntro />
      <PhoneForm phone={phone} canContinue={canContinue} onContinue={onContinue} />
    </AuthFormLayout>
  );
}
