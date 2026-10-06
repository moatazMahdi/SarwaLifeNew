import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { useI18n } from '../../../../shared/i18n';
import { Chip } from '../../constants';
import { chipPosition, styles } from './OnboardingChip.styles';

export function OnboardingChip({ chip }: { chip: Chip }) {
  const { t } = useI18n();

  return (
    <Row style={[styles.chip, chipPosition(chip)]}>
      <Box style={styles.dot} />
      <AppText style={styles.text} numberOfLines={1}>
        {t(chip.text)}
      </AppText>
    </Row>
  );
}
