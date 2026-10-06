import React from 'react';
import { SvgXml } from 'react-native-svg';
import { iconXml, IconName } from '../../../assets/icons/iconXml';
import { colors } from '../../theme';
import { useI18n } from '../../i18n';
import { Box } from '../Box/Box';
import { styles } from './Icon.styles';

type Props = {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  directional?: boolean;
};

export function Icon({ name, size = 22, width, height, color = colors.ink, directional }: Props) {
  const { isRTL } = useI18n();
  const svg = (
    <SvgXml xml={iconXml[name]} width={width ?? size} height={height ?? size} color={color} />
  );
  if (!directional || isRTL) return svg;
  return <Box style={styles.mirror}>{svg}</Box>;
}
