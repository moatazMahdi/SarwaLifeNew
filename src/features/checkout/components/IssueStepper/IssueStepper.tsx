import React from 'react';
import { Box, Row } from '../../../../shared/components';
import { S } from '../../../../shared/i18n';
import { IssueStep } from '../IssueStep/IssueStep';
import { styles } from './IssueStepper.styles';

export function IssueStepper({ current }: { current: number }) {
  return (
    <Box style={styles.card}>
      <Row style={styles.row}>
        {S.checkout.steps.map((label, i) => (
          <IssueStep key={label[0]} index={i} current={current} label={label} />
        ))}
      </Row>
    </Box>
  );
}
