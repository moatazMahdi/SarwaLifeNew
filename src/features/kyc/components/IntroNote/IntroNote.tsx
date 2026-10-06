import React from 'react';
import { AppText, Box, Icon, Row } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './IntroNote.styles';

export function IntroNote() {
  const { t } = useI18n();
  return (
    <Row style={styles.note}>
      <Box style={styles.bar} />
      <Icon name="lock" size={18} />
      <AppText style={styles.text}>{t(S.kyc.intro.note)}</AppText>
    </Row>
  );
}
