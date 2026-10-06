import React from 'react';
import { AuthFormLayout, OtpVerify } from '../components';
import { useSignupOtp } from '../hooks/useSignupOtp';

export function SignupOtpScreen(props: any) {
  const { otp, masked, onBack } = useSignupOtp(props);

  return (
    <AuthFormLayout onBack={onBack}>
      <OtpVerify otp={otp} masked={masked} />
    </AuthFormLayout>
  );
}
