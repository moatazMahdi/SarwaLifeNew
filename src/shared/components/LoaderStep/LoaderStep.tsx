import React from 'react';
import { colors, scaleStyle } from '../../theme';
import { usePop } from '../../hooks/usePop';
import { AnimatedBox } from '../AnimatedBox/AnimatedBox';
import { AppText } from '../AppText/AppText';
import { Icon } from '../Icon/Icon';
import { Row } from '../Row/Row';
import { styles } from './LoaderStep.styles';

type Props = { label: string; done: boolean; active: boolean };

export function LoaderStep({ label, done, active }: Props) {
  const scale = usePop(done);

  return (
    <Row style={styles.row}>
      <AnimatedBox
        style={[styles.dot, done && styles.dotDone, active && styles.dotActive, scaleStyle(scale)]}
      >
        {done ? <Icon name="check" size={13} color={colors.green} /> : null}
      </AnimatedBox>
      <AppText style={[styles.label, (done || active) && styles.labelOn]}>{label}</AppText>
    </Row>
  );
}
