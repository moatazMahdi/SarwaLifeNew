import React from 'react';
import { AppImage, AppText, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { LOGO } from '../../constants';
import { styles } from './LoginIntro.styles';

export function LoginIntro() {
  const { t } = useI18n();
  return (
    <Box style={styles.intro}>
      <Box style={styles.logoClip}>
        <AppImage source={LOGO} style={styles.logo} />
      </Box>
      <Box style={styles.titleBlock}>
        <AppText style={styles.title}>{t(S.auth.loginPhone.title)}</AppText>
        <AppText style={styles.subtitle}>{t(S.auth.loginPhone.subtitle)}</AppText>
      </Box>
    </Box>
  );
}
