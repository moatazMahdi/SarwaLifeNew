import React from 'react';
import { Box, Button } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './GuestBadge.styles';

export function GuestBadge({ onPress }: { onPress: () => void }) {
  const { t } = useI18n();
  return (
    <Button
      variant="badge"
      label={t(S.faq.guest)}
      onPress={onPress}
      endIcon={<Box style={styles.dot} />}
    />
  );
}
