import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { iconXml, IconName } from '../assets/icons/iconXml';
import { colors } from '../theme';
import { useI18n } from '../i18n';

type Props = {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  /**
   * Resolves `currentColor` inside the glyph (e.g. the per-product `checkCircle` tint).
   *
   * Defaults to the body ink, which is what every glyph drawn for a light surface wants, so a
   * call site on a white header can leave it out. One on a dark surface must pass its own —
   * a glyph that inherits the ink onto dark green paints itself invisible.
   */
  color?: string;
  /**
   * Marks a glyph whose meaning is tied to the reading direction — the row chevrons, the
   * "next" arrows, the "back" arrows. Each path is drawn the Arabic way (`arrowLeft` really
   * does point left, `chevronBack` really does point right) and is mirrored under LTR.
   *
   * Driven by the *language being rendered*, not by `I18nManager.isRTL`.
   *
   * Those two are the same number only in a settled app. A release build has no reload
   * module, so after a language switch the strings are English while the native tree is
   * still RTL — and `forceRTL` has already moved `I18nManager.isRTL` under it. Keying the
   * flip off that flag pointed every arrow the wrong way for the rest of the session:
   * Arabic with a right-pointing "next", English with a left-pointing one. The arrow sits
   * beside a word, and the word is what changes — so the word is what it follows.
   */
  directional?: boolean;
};

export function Icon({ name, size = 22, width, height, color = colors.ink, directional }: Props) {
  const { isRTL } = useI18n();
  const svg = (
    <SvgXml xml={iconXml[name]} width={width ?? size} height={height ?? size} color={color} />
  );
  if (!directional || isRTL) return svg;
  // SvgXml does not take a transform, so the flip goes on a wrapper.
  return <View style={styles.mirror}>{svg}</View>;
}

const styles = StyleSheet.create({
  mirror: { transform: [{ scaleX: -1 }] },
});
