import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Box, Button } from '../../../../shared/components';
import { FADE, styles } from './DoneFooter.styles';

type Props = { label: string; onPress: () => void };

export function DoneFooter({ label, onPress }: Props) {
  return (
    <Box style={styles.footer}>
      <LinearGradient {...FADE} style={styles.fade} pointerEvents="none" />
      <Button label={label} onPress={onPress} />
    </Box>
  );
}
