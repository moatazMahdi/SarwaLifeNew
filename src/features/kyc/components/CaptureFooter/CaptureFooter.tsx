import React from 'react';
import { Box, Button } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './CaptureFooter.styles';

type Props = { ready: boolean; onNext: () => void };

export function CaptureFooter({ ready, onNext }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.footer}>
      <Button label={t(S.common.next)} disabled={!ready} onPress={onNext} />
    </Box>
  );
}
