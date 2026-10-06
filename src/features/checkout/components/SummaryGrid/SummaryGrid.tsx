import React from 'react';
import { Row } from '../../../../shared/components';
import { styles } from './SummaryGrid.styles';

export function SummaryGrid({ children }: { children: React.ReactNode }) {
  return <Row style={styles.grid}>{children}</Row>;
}
