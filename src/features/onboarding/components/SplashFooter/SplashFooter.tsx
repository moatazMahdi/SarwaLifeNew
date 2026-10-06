import React from 'react';
import { AppText, Box, Button, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './SplashFooter.styles';

export function SplashFooter({ onNext }: { onNext: () => void }) {
  const { t } = useI18n();

  return (
    <Box style={styles.footer}>
      <Button
        variant="light"
        label={t(S.common.next)}
        onPress={onNext}
        endIcon={
          <Icon name="arrowLeft" width={13.25} height={11.58} color={colors.green} directional />
        }
      />
      <AppText style={styles.legal}>{t(S.splash.legal)}</AppText>
    </Box>
  );
}
