import React from 'react';
import { colors, scaleStyle } from '../../theme';
import { S, useI18n } from '../../i18n';
import { usePressScale } from '../../hooks/usePressScale';
import { AnimatedTouchable } from '../AnimatedTouchable/AnimatedTouchable';
import { AppText } from '../AppText/AppText';
import { Icon } from '../Icon/Icon';
import { styles } from './LangToggle.styles';

export function LangToggle({ tone = 'light' }: { tone?: 'light' | 'onDark' }) {
  const { t, toggle } = useI18n();
  const { scale, onPressIn, onPressOut } = usePressScale({ pressed: 0.93, friction: 7, tension: 200 });
  const dark = tone === 'onDark';

  return (
    <AnimatedTouchable
      onPress={toggle}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={t(S.lang.switchTo)}
      hitSlop={8}
      style={[styles.btn, dark ? styles.btnDark : styles.btnLight, scaleStyle(scale)]}
    >
      <Icon name="globe" size={18} color={dark ? colors.white : colors.ink} />
      <AppText style={[styles.label, dark ? styles.labelDark : styles.labelLight]}>
        {t(S.lang.other)}
      </AppText>
    </AnimatedTouchable>
  );
}
