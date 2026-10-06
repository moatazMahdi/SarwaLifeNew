import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Button, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { DISC_GLOSS, styles } from './LivenessHero.styles';

export function LivenessHero({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();
  return (
    <>
      <Box style={styles.disc}>
        <LinearGradient {...DISC_GLOSS} style={styles.fill} />
        <Icon name="faceScan" size={94} color={colors.white} />
      </Box>
      <Box style={styles.titleBlock}>
        <AppText style={styles.title}>{t(S.kyc.liveness.title)}</AppText>
        <AppText style={styles.subtitle}>{t(S.kyc.liveness.subtitle)}</AppText>
      </Box>
      <Button
        variant="goldGlow"
        label={t(S.kyc.liveness.cta)}
        onPress={onStart}
        endIcon={<Icon name="camera" size={20} color={colors.white} />}
        style={styles.cta}
      />
    </>
  );
}
