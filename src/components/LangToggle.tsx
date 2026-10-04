import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors, typography } from '../theme';
import { Icon } from './Icon';
import { S, useI18n } from '../i18n';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * The language switcher.
 *
 * It wears the name of the language it moves *to* — "English" while the app is Arabic,
 * "العربية" while it is English. A globe alone cannot say which way it goes, and the one
 * person who needs this button is by definition the one who cannot read the screen it is
 * sitting on; the label has to be in the language they are reaching for.
 *
 * Flipping the language also flips the whole app's layout direction, which costs a restart,
 * so the press is deliberately weighty: the button dips rather than merely highlighting.
 */
export function LangToggle({ tone = 'light' }: { tone?: 'light' | 'onDark' }) {
  const { t, toggle } = useI18n();
  const press = useRef(new Animated.Value(0)).current;
  const dark = tone === 'onDark';

  const spring = (to: number) =>
    Animated.spring(press, {
      toValue: to,
      friction: 7,
      tension: 200,
      useNativeDriver: true,
    }).start();

  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.93] });

  return (
    <AnimatedPressable
      onPress={toggle}
      onPressIn={() => spring(1)}
      onPressOut={() => spring(0)}
      accessibilityRole="button"
      accessibilityLabel={t(S.lang.switchTo)}
      hitSlop={8}
      style={[styles.btn, dark ? styles.btnDark : styles.btnLight, { transform: [{ scale }] }]}
    >
      {/* The globe is written first so it takes the row's start under either direction; the
          label trails it, the way a leading icon does everywhere else in the app. */}
      <Icon name="globe" size={18} color={dark ? colors.white : colors.ink} />
      <Text style={[styles.label, dark ? styles.labelDark : styles.labelLight]}>
        {t(S.lang.other)}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  btnLight: { borderColor: '#F0F0F0', backgroundColor: colors.white },
  // On the splash gradient a white chip would shout louder than the logo, so the button
  // borrows the background instead of covering it.
  btnDark: { borderColor: 'rgba(255,255,255,0.28)', backgroundColor: 'rgba(255,255,255,0.12)' },

  // `textAlign: 'center'` and not `'auto'`: this label is a single word sized by its own
  // box, so there is no reading edge for it to align to.
  label: { ...typography.btnLabelSm, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  labelLight: { color: colors.ink },
  labelDark: { color: colors.white },
});
