import React from 'react';
import { AppImage, AppText, Box, Icon, Touchable } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { DashedOutline } from '../DashedOutline/DashedOutline';
import { styles, tickSide } from './IdSlot.styles';

type Props = { label: string; uri?: string; onPress: () => void };

export function IdSlot({ label, uri, onPress }: Props) {
  const { t } = useI18n();
  const filled = !!uri;

  return (
    <Touchable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} — ${filled ? t(S.kyc.slot.retake) : t(S.kyc.slot.hint)}`}
      style={({ pressed }) => [styles.slot, pressed && styles.pressed]}
    >
      <DashedOutline color={filled ? colors.green : colors.g3} />
      {filled ? (
        <>
          <AppImage source={{ uri }} style={styles.shot} resizeMode="contain" />
          <Box style={[styles.tick, tickSide()]}>
            <Icon name="check" size={15} color={colors.white} />
          </Box>
        </>
      ) : (
        <Box style={styles.empty}>
          <Icon name="camera" size={38} color={colors.g4} />
          <AppText style={styles.label}>{label}</AppText>
          <AppText style={styles.hint}>{t(S.kyc.slot.hint)}</AppText>
        </Box>
      )}
    </Touchable>
  );
}
