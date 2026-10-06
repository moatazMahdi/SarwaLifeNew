import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedTouchable, AppText, Box, Icon, Row } from '../../../../shared/components';
import { useGateRow } from '../../hooks/useGateRow';
import { PRIMARY_FILL, TILE_FILL, chevronColor, rowMotion, styles } from './GateRow.styles';

type Props = {
  label: string;
  icon: React.ReactNode;
  primary?: boolean;
  onPress: () => void;
};

export function GateRow({ label, icon, primary, onPress }: Props) {
  const { enter, scale, lift, onPressIn, onPressOut } = useGateRow(primary);

  const body = (
    <>
      {primary ? (
        <Box style={[styles.tile, styles.tileOn]}>{icon}</Box>
      ) : (
        <LinearGradient {...TILE_FILL} style={[styles.tile, styles.tileOff]}>
          {icon}
        </LinearGradient>
      )}
      <Row style={styles.mid}>
        <AppText style={[styles.label, primary && styles.labelOn]}>{label}</AppText>
        <Icon
          name="chevronEnd"
          width={7.25}
          height={12.75}
          color={chevronColor(primary)}
          directional
        />
      </Row>
    </>
  );

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[primary ? styles.shadow : null, rowMotion(enter, scale, lift)]}
    >
      {primary ? (
        <LinearGradient {...PRIMARY_FILL} style={styles.row}>
          {body}
        </LinearGradient>
      ) : (
        <Row style={[styles.row, styles.plain]}>{body}</Row>
      )}
    </AnimatedTouchable>
  );
}
