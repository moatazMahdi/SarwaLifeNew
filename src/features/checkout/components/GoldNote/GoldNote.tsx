import React from 'react';
import { AppText, Box, Icon, Row } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './GoldNote.styles';

export function GoldNote({ text }: { text: Phrase }) {
  const { t } = useI18n();
  return (
    <Row style={styles.note}>
      <Box style={styles.bar} />
      <Icon name="infoCircle" size={19} />
      <AppText style={styles.text}>{t(text)}</AppText>
    </Row>
  );
}
