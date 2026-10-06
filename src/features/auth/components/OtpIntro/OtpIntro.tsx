import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { TILE_FILL, styles } from './OtpIntro.styles';

export function OtpIntro({ masked }: { masked: string }) {
  const { t } = useI18n();
  return (
    <Box style={styles.intro}>
      <LinearGradient {...TILE_FILL} style={styles.tile}>
        <Icon name="message" size={32} />
      </LinearGradient>
      <Box style={styles.titleBlock}>
        <AppText style={styles.title}>{t(S.auth.otp.title)}</AppText>
        <AppText style={styles.subtitle}>
          {t(S.auth.otp.sentTo)} <AppText style={styles.subtitleStrong}>{masked}</AppText>
        </AppText>
      </Box>
    </Box>
  );
}
