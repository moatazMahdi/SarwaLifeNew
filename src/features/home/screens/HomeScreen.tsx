import React from 'react';
import { Screen } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { ContactFab, HomeHeader, ProductCatalog } from '../components';
import { useHome } from '../hooks/useHome';

export function HomeScreen(props: any) {
  const { openFaq, openProduct } = useHome(props);

  return (
    <Screen background={colors.bg}>
      <HomeHeader onFaq={openFaq} />
      <ProductCatalog onSelect={openProduct} />
      <ContactFab />
    </Screen>
  );
}
