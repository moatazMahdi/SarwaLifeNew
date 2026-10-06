import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppImage,
  AppText,
  Box,
  Button,
  Icon,
  RadialGlow,
  Row,
} from '../../../../shared/components';
import { Product } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { HERO_ART, HERO_WATERMARK } from '../../constants';
import { FILL, dynamic, styles } from './ProductHero.styles';

type Props = {
  product: Product;
  onBack: () => void;
  onShare: () => void;
};

export function ProductHero({ product, onBack, onShare }: Props) {
  const { t } = useI18n();
  const { top } = useSafeAreaInsets();

  return (
    <Box style={[styles.hero, dynamic.hero(top)]}>
      <LinearGradient {...FILL} style={styles.fill} />
      <RadialGlow
        id="pdGlowA"
        size={280}
        opacity={0.2}
        fade={0.68}
        style={[styles.glowA, dynamic.glowA(top)]}
      />
      <RadialGlow
        id="pdGlowB"
        size={220}
        opacity={0.12}
        fade={0.7}
        style={[styles.glowB, dynamic.glowB(top)]}
      />
      <AppImage
        source={HERO_WATERMARK}
        style={[styles.watermark, dynamic.watermark(top)]}
        resizeMode="cover"
      />
      <Row style={[styles.topRow, dynamic.topRow(top)]}>
        <Button
          variant="glass"
          onPress={onBack}
          accessibilityLabel={t(S.product.a11y.back)}
          icon={<Icon name="arrowRight" size={23} directional />}
        />
        <Button
          variant="glass"
          onPress={onShare}
          accessibilityLabel={t(S.product.a11y.share)}
          icon={<Icon name="share" size={21} />}
        />
      </Row>
      <Row style={styles.titleRow}>
        <Box style={styles.artTile}>
          <AppImage source={HERO_ART[product.key]} style={styles.art} resizeMode="contain" />
        </Box>
        <AppText variant="productTitle" style={styles.title} numberOfLines={2}>
          {t(product.title)}
        </AppText>
      </Row>
    </Box>
  );
}
