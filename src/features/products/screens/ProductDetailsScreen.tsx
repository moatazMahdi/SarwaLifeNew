import React from 'react';
import { Screen } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { PerkList, ProductFooter, ProductHero, ProductIntro, ProductSheet } from '../components';
import { useProductDetails } from '../hooks/useProductDetails';

export function ProductDetailsScreen(props: any) {
  const { product, palette, onBack, onCalc, onShare, onWhatsApp } = useProductDetails(props);

  return (
    <Screen background={colors.bg}>
      <ProductHero product={product} onBack={onBack} onShare={onShare} />
      <ProductSheet footer={<ProductFooter onCalc={onCalc} onContact={onWhatsApp} />}>
        <ProductIntro text={product.intro} />
        <PerkList perks={product.perks} palette={palette} />
      </ProductSheet>
    </Screen>
  );
}
