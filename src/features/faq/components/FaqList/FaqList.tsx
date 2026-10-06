import React from 'react';
import { Box } from '../../../../shared/components';
import { S } from '../../../../shared/i18n';
import { FaqItem } from '../FaqItem/FaqItem';
import { styles } from './FaqList.styles';

type Props = { open: number | null; onToggle: (i: number) => void };

export function FaqList({ open, onToggle }: Props) {
  return (
    <Box style={styles.list}>
      {S.faq.items.map((item, i) => (
        <FaqItem
          key={item.q[0]}
          question={item.q}
          answer={item.a}
          open={open === i}
          onToggle={() => onToggle(i)}
        />
      ))}
    </Box>
  );
}
