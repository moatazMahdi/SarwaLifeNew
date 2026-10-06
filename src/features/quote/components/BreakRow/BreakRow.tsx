import React from 'react';
import { AppText, Row } from '../../../../shared/components';
import { styles } from './BreakRow.styles';

type Props = { label: string; amount: string; accent?: boolean };

export function BreakRow({ label, amount, accent }: Props) {
  return (
    <Row style={styles.row}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={[styles.amount, accent && styles.amountOn]}>{amount}</AppText>
    </Row>
  );
}
