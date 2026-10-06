import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Button, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { FADE, footInset, styles } from './ProductFooter.styles';

type Props = { onCalc: () => void; onContact: () => void };

export function ProductFooter({ onCalc, onContact }: Props) {
  const { t } = useI18n();
  const { bottom } = useSafeAreaInsets();

  return (
    <Box style={[styles.foot, footInset(bottom)]}>
      <LinearGradient {...FADE} style={styles.fade} pointerEvents="none" />
      <Button
        variant="hero"
        label={t(S.product.cta.calc)}
        onPress={onCalc}
        endIcon={
          <Icon name="arrowLeft" width={13.25} height={11.5833} color={colors.white} directional />
        }
      />
      <Button
        variant="outline"
        label={t(S.product.cta.contact)}
        onPress={onContact}
        startIcon={<Icon name="whatsapp" size={20} />}
      />
    </Box>
  );
}
