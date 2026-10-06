import React from 'react';
import { colors } from '../../theme';
import { AppText } from '../AppText/AppText';
import { Icon } from '../Icon/Icon';
import { Row } from '../Row/Row';
import { styles } from './FieldError.styles';

export function FieldError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <Row style={styles.row} accessibilityLiveRegion="polite">
      <Icon name="alertCircle" size={15} color={colors.bad} />
      <AppText style={styles.text}>{message}</AppText>
    </Row>
  );
}
