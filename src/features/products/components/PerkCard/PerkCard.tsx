import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon, Row } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { SURFACE, styles, tileTint } from './PerkCard.styles';

type Props = {
  perk: Phrase;
  tint: string;
  primary: string;
};

export function PerkCard({ perk, tint, primary }: Props) {
  const { t } = useI18n();
  return (
    <Row style={styles.card}>
      <LinearGradient {...SURFACE} style={styles.fill} />
      <Box style={[styles.tile, tileTint(tint)]}>
        <Icon name="checkCircle" size={18} color={primary} />
      </Box>
      <AppText variant="perkText" style={styles.text}>
        {t(perk)}
      </AppText>
    </Row>
  );
}
