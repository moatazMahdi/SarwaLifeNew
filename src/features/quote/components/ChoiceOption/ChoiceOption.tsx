import React from 'react';
import { AnimatedTouchable, AppText, Icon } from '../../../../shared/components';
import { colors, scaleStyle } from '../../../../shared/theme';
import { useChoicePress } from '../../hooks/useChoicePress';
import { fontSizeStyle, styles } from './ChoiceOption.styles';

type Props = { label: string; on: boolean; onPress: () => void; fontSize?: number };

export function ChoiceOption({ label, on, onPress, fontSize }: Props) {
  const { scale, onPressIn, onPressOut } = useChoicePress(on);

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="radio"
      accessibilityState={{ selected: on }}
      style={[styles.choice, on ? styles.on : styles.off, scaleStyle(scale)]}
    >
      {on ? (
        <>
          <Icon name="checkCircle" size={20} color={colors.green} />
          <AppText style={[styles.textOn, fontSizeStyle(fontSize)]}>{label}</AppText>
        </>
      ) : (
        <AppText style={[styles.textOff, fontSizeStyle(fontSize)]}>{label}</AppText>
      )}
    </AnimatedTouchable>
  );
}
