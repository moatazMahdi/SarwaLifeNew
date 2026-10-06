import React from 'react';
import { AppText } from '../AppText/AppText';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { Row } from '../Row/Row';
import { styles } from './InfoNote.styles';

export function InfoNote({ text }: { text: string }) {
  return (
    <Box style={styles.note}>
      <Box style={styles.bar} />
      <Row style={styles.row}>
        <Icon name="infoCircle" size={19} />
        <AppText style={styles.text}>{text}</AppText>
      </Row>
    </Box>
  );
}
