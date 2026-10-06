import React from 'react';
import { AppText, Box, FailureSeal, SafeArea } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { ReasonsCard } from '../ReasonsCard/ReasonsCard';
import { styles } from './KycFailedBody.styles';

type Props = { title: Phrase; subtitle: Phrase; reasons: readonly Phrase[] };

export function KycFailedBody({ title, subtitle, reasons }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.body}>
      <SafeArea edges={['top']} style={styles.hero}>
        <FailureSeal />
        <AppText style={styles.title}>{t(title)}</AppText>
        <AppText style={styles.subtitle}>{t(subtitle)}</AppText>
      </SafeArea>
      <ReasonsCard reasons={reasons} />
    </Box>
  );
}
