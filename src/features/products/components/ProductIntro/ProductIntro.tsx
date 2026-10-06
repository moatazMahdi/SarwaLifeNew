import React from 'react';
import { AppText } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './ProductIntro.styles';

export function ProductIntro({ text }: { text: Phrase }) {
  const { t } = useI18n();
  return (
    <AppText variant="productIntro" style={styles.intro}>
      {t(text)}
    </AppText>
  );
}
