import React from 'react';
import { AppText, Box, Icon, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './HeirsCard.styles';

export function HeirsCard() {
  const { t } = useI18n();
  return (
    <Row style={styles.card}>
      <Box style={styles.col}>
        <Row style={styles.titleRow}>
          <Box style={styles.tile}>
            <Icon name="people" size={24} color={colors.white} />
          </Box>
          <AppText style={styles.title}>{t(S.checkout.beneficiaries.heirs)}</AppText>
        </Row>
        <AppText style={styles.desc}>{t(S.checkout.beneficiaries.heirsDesc)}</AppText>
      </Box>
      <Icon name="sealCheck" size={22} color={colors.green} />
    </Row>
  );
}
