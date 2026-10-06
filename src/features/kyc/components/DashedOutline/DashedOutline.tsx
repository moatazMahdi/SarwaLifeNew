import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { SLOT } from '../../constants';
import { styles } from './DashedOutline.styles';

export function DashedOutline({ color }: { color: string }) {
  return (
    <Svg style={styles.fill} width="100%" height="100%">
      <Rect
        x={1}
        y={1}
        width="98%"
        height={SLOT.height - 2}
        rx={SLOT.radius - 1}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="7 6"
      />
    </Svg>
  );
}
