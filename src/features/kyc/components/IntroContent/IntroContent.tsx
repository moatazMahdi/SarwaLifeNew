import React from 'react';
import { AppText, Scroll } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { IdIllustration } from '../IdIllustration/IdIllustration';
import { IntroNote } from '../IntroNote/IntroNote';
import { RuleBlock } from '../RuleBlock/RuleBlock';
import { styles } from './IntroContent.styles';

export function IntroContent() {
  const { t } = useI18n();
  return (
    <Scroll contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <IdIllustration />
      <AppText style={styles.headline}>{t(S.kyc.intro.headline)}</AppText>
      <AppText style={styles.subtitle}>{t(S.kyc.intro.subtitle)}</AppText>
      <RuleBlock title={t(S.kyc.intro.dosTitle)} items={S.kyc.intro.dos} ok />
      <RuleBlock title={t(S.kyc.intro.dontsTitle)} items={S.kyc.intro.donts} ok={false} />
      <IntroNote />
    </Scroll>
  );
}
