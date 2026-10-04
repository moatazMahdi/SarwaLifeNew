import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  I18nManager,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../../theme';
import { S, useI18n } from '../../i18n';

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
};

/**
 * Figma draws a 12px track with a 14px thumb. That reads well in a static mock but is a
 * poor finger target, so the control is scaled up here: a 16px track and a 28px thumb
 * inside a 48px tall hit area (above the 44px minimum-target guideline).
 */
const TRACK_H = 16;
const THUMB = 28;
const TOUCH_H = 48;
/** Brand ring that blooms under the thumb while it is being dragged. */
const HALO = THUMB + 18;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Figma 2065:3013 — the design mirrors a stock LTR progress bar with
 * `-scale-y-100 rotate-180`, i.e. under Arabic the fill grows from the **right**.
 *
 * That is a *reading-order* fact, not a physical one: a slider always fills from the end the
 * language starts at, so under English it has to run left-to-right again. Everything below is
 * written against physical pixels — absolute `left`, and `PanResponder`'s `locationX`, both of
 * which stay physical because App.tsx sets `I18nManager.swapLeftAndRightInRTL(false)` — so the
 * mirroring has to be done by hand rather than left to Yoga. `MIRRORED` is read from
 * `I18nManager.isRTL` rather than the i18n context on purpose: it is the same flag the rest of
 * the tree was laid out against, so the track can never disagree with the labels around it
 * (the two only differ between a language change and the restart that follows it).
 *
 * Only the track geometry flips. The bounds captions under it are ordinary flow children in
 * `StepCover` and mirror on their own.
 */
const MIRRORED = I18nManager.isRTL;

export function CoverSlider({ value, min, max, step, onChange }: Props) {
  const { t } = useI18n();
  const [width, setWidth] = useState(0);
  const usable = Math.max(width - THUMB, 1);
  const grab = useRef(new Animated.Value(0)).current;

  // Kept in refs so the PanResponder (created once) always reads current values.
  const geo = useRef({ usable, min, max, step });
  geo.current = { usable, min, max, step };
  const startX = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const pan = useMemo(() => {
    const emit = (x: number) => {
      const g = geo.current;
      // The thumb centre sits at `x`. Under RTL the physical left edge is the maximum and
      // the right edge the minimum; under LTR the usual way round.
      const travelled = clamp(x - THUMB / 2, 0, g.usable) / g.usable;
      const ratio = MIRRORED ? 1 - travelled : travelled;
      const raw = g.min + ratio * (g.max - g.min);
      onChangeRef.current(clamp(Math.round(raw / g.step) * g.step, g.min, g.max));
    };
    const spring = (to: number) =>
      Animated.spring(grab, {
        toValue: to,
        friction: 8,
        tension: 220,
        useNativeDriver: true,
      }).start();
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // Claim the gesture before the enclosing ScrollView can steal it.
      onMoveShouldSetPanResponderCapture: (_e, g) => Math.abs(g.dx) > 2,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        startX.current = e.nativeEvent.locationX;
        spring(1);
        emit(startX.current);
      },
      onPanResponderMove: (_e, g) => emit(startX.current + g.dx),
      onPanResponderRelease: () => spring(0),
      onPanResponderTerminate: () => spring(0),
    });
  }, [grab]);

  function onLayout(e: LayoutChangeEvent) {
    setWidth(e.nativeEvent.layout.width);
  }

  const ratio = clamp((value - min) / (max - min), 0, 1);
  const thumbLeft = usable * (MIRRORED ? 1 - ratio : ratio);
  // The filled span always runs from the reading-start edge up to the thumb's centre.
  const fillEdge = thumbLeft + THUMB / 2;
  const fillSpan = MIRRORED ? { right: 0, left: fillEdge } : { left: 0, width: fillEdge };
  const scale = grab.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] });
  const haloOpacity = grab.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View
      onLayout={onLayout}
      {...pan.panHandlers}
      style={styles.touch}
      accessibilityRole="adjustable"
      accessibilityLabel={t(S.quote.cover.sliderA11y)}
      accessibilityValue={{ min, max, now: value }}
    >
      {/*
        `pointerEvents="none"` on every child is load-bearing: `locationX` is measured
        against the *touched* node, so grabbing the thumb would otherwise report 0–28
        (its own width) instead of a position along the track — which read as "max" and
        snapped the value to 300,000 on first touch.
      */}
      <View style={styles.track} pointerEvents="none" />
      <View style={[styles.fill, fillSpan]} pointerEvents="none" />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.halo,
          { left: thumbLeft - (HALO - THUMB) / 2, opacity: haloOpacity, transform: [{ scale }] },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.thumb, { left: thumbLeft, transform: [{ scale }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  touch: { height: TOUCH_H, justifyContent: 'center' },
  track: {
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    // Figma: #e2e2e2 @ 24% — pre-flattened so it renders identically on any backdrop.
    backgroundColor: 'rgba(226,226,226,0.24)',
  },
  // No `left`/`right` here: which edge the fill is pinned to depends on the reading
  // direction, so the span is supplied by the caller (see `fillSpan`).
  fill: {
    position: 'absolute',
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    backgroundColor: colors.green,
  },
  halo: {
    position: 'absolute',
    width: HALO,
    height: HALO,
    borderRadius: HALO / 2,
    backgroundColor: 'rgba(0,105,87,0.12)',
  },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
});
