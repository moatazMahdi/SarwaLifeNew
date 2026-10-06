import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppImage, AppText, Box, Icon, RadialGlow, Row } from '../../../../shared/components';
import { money } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { HERO_WATERMARK } from '../../constants';
import { CountUpAmount } from '../CountUpAmount/CountUpAmount';
import { FILL, GLOW_GOLD, GLOW_WHITE, styles } from './OfferHero.styles';

type Props = { cover: number; yearly: number };

export function OfferHero({ cover, yearly }: Props) {
  const { t } = useI18n();
  const egp = t(S.common.currency);

  return (
    <Box style={styles.hero}>
      <LinearGradient {...FILL} style={styles.fill} />
      <RadialGlow id="offA" size={280} color={GLOW_WHITE} opacity={0.2} fade={0.68} midOpacity={0.3} style={styles.glowA} />
      <RadialGlow id="offB" size={220} color={GLOW_GOLD} opacity={0.26} fade={0.7} midOpacity={0.3} style={styles.glowB} />
      <AppImage source={HERO_WATERMARK} style={styles.watermark} resizeMode="cover" />
      <Box style={styles.highlight} />
      <Box style={styles.body}>
        <Box style={styles.top}>
          <AppText style={styles.caption}>{t(S.quote.offer.caption)}</AppText>
          <Row style={styles.amountRow}>
            <CountUpAmount value={yearly} />
            <AppText style={styles.unit}>{egp}</AppText>
          </Row>
        </Box>
        <Row style={styles.chip}>
          <Icon name="shieldSm" size={15} />
          <AppText style={styles.chipText}>{`${t(S.quote.offer.chip)} ${money(cover)} ${egp}`}</AppText>
        </Row>
      </Box>
    </Box>
  );
}
