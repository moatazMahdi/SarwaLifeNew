import React from 'react';
import { AppText, Box, Scroll } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { ProductKey } from '../../../../shared/theme';
import { HOME_PRODUCTS } from '../../constants';
import { ProductCard } from '../ProductCard/ProductCard';
import { styles } from './ProductCatalog.styles';

export function ProductCatalog({ onSelect }: { onSelect: (key: ProductKey) => void }) {
  const { t } = useI18n();

  return (
    <Scroll contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <AppText style={styles.sectionTitle}>{t(S.home.sectionTitle)}</AppText>
      <Box style={styles.cards}>
        {HOME_PRODUCTS.map((p) => (
          <ProductCard key={p.key} item={p} onPress={() => onSelect(p.key)} />
        ))}
      </Box>
    </Scroll>
  );
}
