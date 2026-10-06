import React from 'react';
import { AppText, Icon, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './FaqIntro.styles';

export function FaqIntro() {
  const { t } = useI18n();
  return (
    <Row style={styles.intro}>
      <AppText style={styles.text}>{t(S.faq.intro)}</AppText>
      <Icon name="infoCircle" size={24} color={colors.green} />
    </Row>
  );
}
