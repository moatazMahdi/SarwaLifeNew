import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon, Row } from '../../../../shared/components';
import { money } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { FILL, styles } from './GatePremium.styles';

export function GatePremium({ yearly }: { yearly: number }) {
  const { t } = useI18n();
  return (
    <LinearGradient {...FILL} style={styles.premium}>
      <Box style={styles.tile}>
        <Icon name="money" size={22} />
      </Box>
      <AppText style={styles.label}>{t(S.auth.gate.premiumLabel)}</AppText>
      <Row style={styles.amountRow}>
        <AppText style={styles.value}>
          {money(yearly)}
          <AppText style={styles.unit}> {t(S.common.currency)}</AppText>
        </AppText>
        <AppText style={styles.cycle}>{t(S.common.yearly)}</AppText>
      </Row>
    </LinearGradient>
  );
}
