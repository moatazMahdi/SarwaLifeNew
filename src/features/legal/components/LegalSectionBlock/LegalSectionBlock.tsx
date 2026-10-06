import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { useI18n } from '../../../../shared/i18n';
import type { LegalSection } from '../../../../shared/i18n/ns/legal';
import { LegalClause } from '../LegalClause/LegalClause';
import { styles } from './LegalSectionBlock.styles';

type Props = { section: LegalSection; index: number };

export function LegalSectionBlock({ section, index }: Props) {
  const { t, n } = useI18n();
  return (
    <Box style={styles.section}>
      <AppText style={styles.title}>{`${n(index + 1)}. ${t(section.title)}`}</AppText>
      {section.body.map((clause) => (
        <LegalClause key={clause[0]} clause={clause} />
      ))}
    </Box>
  );
}
