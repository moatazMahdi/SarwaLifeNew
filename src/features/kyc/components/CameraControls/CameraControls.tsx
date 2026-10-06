import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Button, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { useCameraCapture } from '../../hooks/useCameraCapture';
import { styles } from './CameraControls.styles';

type Props = { camera: ReturnType<typeof useCameraCapture>; onConfirm: () => void };

export function CameraControls({ camera, onConfirm }: Props) {
  const { t } = useI18n();

  if (camera.shot) {
    return (
      <Row style={styles.confirmRow}>
        <Button variant="gold" label={t(S.common.confirm)} onPress={onConfirm} />
        <Button variant="translucent" label={t(S.kyc.camera.retake)} onPress={camera.onRetake} />
      </Row>
    );
  }

  return (
    <Button
      variant="shutter"
      onPress={camera.onShutter}
      disabled={!camera.canShoot}
      accessibilityLabel={t(S.kyc.camera.shutter)}
      icon={
        <Box style={styles.shutter}>
          {camera.busy ? <ActivityIndicator color={colors.white} /> : null}
        </Box>
      }
    />
  );
}
