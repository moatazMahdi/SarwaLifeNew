import React from 'react';
import { Box } from '../../../../shared/components';
import { SummaryTone, SummaryToneContext } from '../../context/summaryTone';
import { styles } from './SummaryCard.styles';

type Props = { tone?: SummaryTone; children: React.ReactNode; footer?: React.ReactNode };

export function SummaryCard({ tone = 'brand', children, footer }: Props) {
  const rows = React.Children.toArray(children).filter(Boolean);
  return (
    <SummaryToneContext.Provider value={tone}>
      <Box style={[styles.card, tone === 'plain' && styles.cardPlain, footer ? styles.cardFooted : null]}>
        <Box style={styles.rows}>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <Box style={styles.rule} /> : null}
              {row}
            </React.Fragment>
          ))}
        </Box>
        {footer}
      </Box>
    </SummaryToneContext.Provider>
  );
}
