import React from 'react';
import { AppImage, AppText, Box, Row } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { LOGO } from '../../constants';
import { styles } from './SplashBrand.styles';

export function SplashBrand() {
  const { t } = useI18n();

  return (
    <Box style={styles.centerBlock}>
      <Box style={styles.logoTile}>
        <AppImage source={LOGO} style={styles.logo} resizeMode="contain" />
      </Box>
      <AppText style={styles.title}>{t(S.splash.title)}</AppText>
      <Row style={styles.trackRow}>
        <Box style={styles.trackLine} />
        <AppText style={styles.trackText}>S A R W A L I F E</AppText>
        <Box style={styles.trackLine} />
      </Row>
      <AppText style={styles.tagline} numberOfLines={1} allowFontScaling={false}>
        {t(S.splash.tagline)}
      </AppText>
    </Box>
  );
}
