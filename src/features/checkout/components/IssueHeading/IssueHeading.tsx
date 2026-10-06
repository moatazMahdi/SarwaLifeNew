import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './IssueHeading.styles';

type Props = { title: Phrase; subtitle?: Phrase };

export function IssueHeading({ title, subtitle }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.heading}>
      <AppText style={styles.title}>{t(title)}</AppText>
      {subtitle ? <AppText style={styles.subtitle}>{t(subtitle)}</AppText> : null}
    </Box>
  );
}
