import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Defs, Ellipse, Mask, Rect } from 'react-native-svg';
import { FACE_OVAL, SCRIM } from '../../constants';
import { styles } from './FaceOverlay.styles';

export function FaceOverlay() {
  const { width, height } = useWindowDimensions();
  const ovalW = width * FACE_OVAL.width;
  const ovalH = height * FACE_OVAL.height;
  const ovalCy = height * FACE_OVAL.centerY;

  return (
    <Svg style={styles.fill} width={width} height={height} pointerEvents="none">
      <Defs>
        <Mask id="window">
          <Rect x={0} y={0} width={width} height={height} fill="#fff" />
          <Ellipse cx={width / 2} cy={ovalCy} rx={ovalW / 2} ry={ovalH / 2} fill="#000" />
        </Mask>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={SCRIM} mask="url(#window)" />
    </Svg>
  );
}
