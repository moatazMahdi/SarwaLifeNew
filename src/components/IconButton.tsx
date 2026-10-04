import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
  /**
   * What the control is, in words. Required in practice rather than by the type, because the
   * only thing inside this button is a `<Svg>` — there is no text for a screen reader to fall
   * back on, so without a label it is announced as an unnamed box. The back arrow in
   * `ScreenHeader` is the most-pressed control in the app and was exactly that.
   */
  accessibilityLabel?: string;
};

/**
 * A square, bordered tap target with a glyph in it — the header back arrow, and nothing else
 * at the moment.
 *
 * It used to render a bare `Pressable` with no press state, which made it the one control in
 * the app that stayed completely still when tapped. On a slow screen transition that reads as
 * a dropped tap, and the user presses again — so the dim is not decoration, it is the
 * acknowledgement every other button here already gives.
 */
export function IconButton({ children, onPress, size = 44, style, accessibilityLabel }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      // The glyph is 22px inside a 42px box, which already clears the 44dp minimum on its own;
      // the slop is for the thumb that lands just outside a corner of a control pinned to the
      // screen edge.
      hitSlop={6}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: radius.ibtn },
        style,
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.br2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Matched to the other pressables in the flow, so a tap feels the same wherever it lands.
  pressed: { opacity: 0.7 },
});
