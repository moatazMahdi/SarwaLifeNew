import React from 'react';
import { S, useI18n } from '../../../shared/i18n';
import { DoneCopy, DoneFooter, DoneLayout } from '../components';
import { useSignupDone } from '../hooks/useSignupDone';

export function SignupDoneScreen(props: any) {
  const { t } = useI18n();
  const { resuming, onStart } = useSignupDone(props);

  return (
    <DoneLayout>
      <DoneCopy />
      <DoneFooter
        label={t(resuming ? S.auth.signupDone.ctaResume : S.auth.signupDone.ctaStart)}
        onPress={onStart}
      />
    </DoneLayout>
  );
}
