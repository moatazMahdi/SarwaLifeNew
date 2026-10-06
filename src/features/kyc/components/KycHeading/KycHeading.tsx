import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { styles } from './KycHeading.styles';

type Props = { title: string; subtitle: string };

export function KycHeading({ title, subtitle }: Props) {
  return (
    <Box style={styles.block}>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subtitle}>{subtitle}</AppText>
    </Box>
  );
}
