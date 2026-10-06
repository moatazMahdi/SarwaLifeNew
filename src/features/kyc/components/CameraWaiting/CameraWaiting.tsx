import React from 'react';
import { ActivityIndicator } from 'react-native';
import { AppText, Box, Button, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { useCameraPrompt } from '../../hooks/useCameraPrompt';
import { styles } from './CameraWaiting.styles';

type Props = { hasPermission: boolean; requestPermission: () => Promise<boolean> };

export function CameraWaiting({ hasPermission, requestPermission }: Props) {
  const { t } = useI18n();
  const { blocked, openSettings } = useCameraPrompt(hasPermission, requestPermission);

  if (blocked) {
    return (
      <Box style={[styles.fill, styles.box]}>
        <Box style={styles.disc}>
          <Icon name="camera" size={30} color={colors.white} />
        </Box>
        <AppText style={styles.title}>{t(S.kyc.camera.needPermission)}</AppText>
        <AppText style={styles.hint}>{t(S.kyc.camera.deniedHint)}</AppText>
        <Button
          variant="gold"
          label={t(S.kyc.camera.openSettings)}
          onPress={openSettings}
          style={styles.cta}
        />
      </Box>
    );
  }

  return (
    <Box style={[styles.fill, styles.box]}>
      <ActivityIndicator color={colors.white} />
      <AppText style={styles.title}>
        {hasPermission ? t(S.kyc.camera.starting) : t(S.kyc.camera.needPermission)}
      </AppText>
    </Box>
  );
}
