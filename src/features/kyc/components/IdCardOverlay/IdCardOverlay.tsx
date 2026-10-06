import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Defs, Mask, Path, Rect } from 'react-native-svg';
import { colors } from '../../../../shared/theme';
import { ID_CARD, SCRIM } from '../../constants';
import { cornerPath } from '../../utils/cornerPath';
import { styles } from './IdCardOverlay.styles';

export function IdCardOverlay() {
  const { width, height } = useWindowDimensions();
  const cardW = Math.min(width - ID_CARD.inset * 2, ID_CARD.maxWidth);
  const cardH = cardW / ID_CARD.ratio;
  const cardX = (width - cardW) / 2;
  const cardY = height * ID_CARD.centerY - cardH / 2;
  const r = ID_CARD.radius;

  return (
    <Svg style={styles.fill} width={width} height={height} pointerEvents="none">
      <Defs>
        <Mask id="card">
          <Rect x={0} y={0} width={width} height={height} fill="#fff" />
          <Rect x={cardX} y={cardY} width={cardW} height={cardH} rx={r} ry={r} fill="#000" />
        </Mask>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={SCRIM} mask="url(#card)" />
      <Rect
        x={cardX}
        y={cardY}
        width={cardW}
        height={cardH}
        rx={r}
        ry={r}
        fill="none"
        stroke="rgba(201,162,75,0.45)"
        strokeWidth={1.5}
      />
      <Path
        d={cornerPath(cardX, cardY, cardW, cardH, r, cardW * 0.11)}
        fill="none"
        stroke={colors.gold}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </Svg>
  );
}
