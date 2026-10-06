import React from 'react';
import { Box, Card, SectionTitle } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { RuleRow } from '../RuleRow/RuleRow';
import { styles } from './RuleBlock.styles';

type Props = { title: string; items: readonly Phrase[]; ok: boolean };

export function RuleBlock({ title, items, ok }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.block}>
      <SectionTitle>{title}</SectionTitle>
      <Card style={styles.card}>
        {items.map((d, i) => (
          <RuleRow key={d[0]} text={t(d)} ok={ok} first={i === 0} />
        ))}
      </Card>
    </Box>
  );
}
