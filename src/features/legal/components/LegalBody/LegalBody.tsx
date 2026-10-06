import React from 'react';
import { AppText, Scroll } from '../../../../shared/components';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { styles } from './LegalBody.styles';

type Props = { intro: Phrase; children: React.ReactNode };

export function LegalBody({ intro, children }: Props) {
  const { t } = useI18n();

  return (
    <Scroll contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <AppText style={styles.updated}>{t(S.legal.updated)}</AppText>
      <AppText style={styles.intro}>{t(intro)}</AppText>
      {children}
    </Scroll>
  );
}
