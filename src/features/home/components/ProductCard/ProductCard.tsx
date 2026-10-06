import React from 'react';
import { AppImage, AppText, Box, Icon, Row, Touchable } from '../../../../shared/components';
import { useI18n } from '../../../../shared/i18n';
import { HomeProduct } from '../../constants';
import { styles } from './ProductCard.styles';

type Props = { item: HomeProduct; onPress: () => void };

export function ProductCard({ item, onPress }: Props) {
  const { t } = useI18n();

  return (
    <Touchable style={styles.card} onPress={onPress}>
      <Box style={styles.iconTile}>
        <AppImage source={item.art} style={styles.iconArt} resizeMode="contain" />
      </Box>
      <Row style={styles.inner}>
        <Box style={styles.text}>
          <AppText style={styles.title}>{t(item.title)}</AppText>
          <AppText style={styles.desc}>{t(item.desc)}</AppText>
        </Box>
        <Box style={styles.chevronBox}>
          <Icon name="chevronLeft" width={6.6} height={11.6} directional />
        </Box>
      </Row>
    </Touchable>
  );
}
