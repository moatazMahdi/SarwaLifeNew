import React from 'react';
import { AppText, Row } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './AgePill.styles';

export function AgePill({ age }: { age: number }) {
  const { t, n } = useI18n();
  return (
    <Row style={styles.pill}>
      <AppText style={styles.caption}>{t(S.quote.data.age)}</AppText>
      <AppText style={styles.number}>{age > 0 ? n(age) : '—'}</AppText>
    </Row>
  );
}
