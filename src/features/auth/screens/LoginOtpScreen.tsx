import React from 'react';
import { AuthFormLayout, OtpVerify } from '../components';
import { useLoginOtp } from '../hooks/useLoginOtp';

export function LoginOtpScreen(props: any) {
  const { otp, masked, onBack } = useLoginOtp(props);

  return (
    <AuthFormLayout onBack={onBack}>
      <OtpVerify otp={otp} masked={masked} />
    </AuthFormLayout>
  );
}
