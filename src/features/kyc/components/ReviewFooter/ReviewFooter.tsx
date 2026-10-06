import React from 'react';
import { Box, Button } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { ConsentCheck } from '../ConsentCheck/ConsentCheck';
import { styles } from './ReviewFooter.styles';

type Props = {
  agreed: boolean;
  onToggle: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onNext: () => void;
};

export function ReviewFooter({ agreed, onToggle, onTerms, onPrivacy, onNext }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.footer}>
      <ConsentCheck agreed={agreed} onToggle={onToggle} onTerms={onTerms} onPrivacy={onPrivacy} />
      <Button label={t(S.common.next)} disabled={!agreed} onPress={onNext} />
    </Box>
  );
}
