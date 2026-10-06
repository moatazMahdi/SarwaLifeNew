import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './SignupIntro.styles';

export function SignupIntro() {
  const { t } = useI18n();
  return (
    <Box style={styles.intro}>
      <AppText style={styles.title}>{t(S.auth.signupPhone.title)}</AppText>
      <AppText style={styles.subtitle}>{t(S.auth.signupPhone.subtitle)}</AppText>
    </Box>
  );
}
