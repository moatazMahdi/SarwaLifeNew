import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors, typography } from '../theme';
import { Icon } from './Icon';

type Props = {
  headline: string;
  subtitle: string;
  steps: string[];
  /** How long each line stays "in progress" before it ticks. */
  stepMs?: number;
  onDone: () => void;
};

/**
 * The full-screen brand waiting state: green gradient, two radial glows, the ثروة
 * watermark and a ticking checklist. It started life inside the quote flow as
 * "بنحسب قسطك"; it now backs every multi-second wait in the app, so a pause always looks
 * the same no matter which step the user is on. Only the copy changes.
 */
export function BrandLoader({ headline, subtitle, steps, stepMs = 850, onDone }: Props) {
  const [index, setIndex] = useState(0);
  const spin = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin, fade]);

  useEffect(() => {
    if (index >= steps.length) {
      // Hold on the all-ticked state for a beat, then dissolve into whatever follows.
      const t = setTimeout(() => {
        Animated.timing(fade, {
          toValue: 0,
          duration: 260,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }).start(() => doneRef.current());
      }, 360);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), stepMs);
    return () => clearTimeout(t);
  }, [index, steps.length, stepMs, fade]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, { opacity: fade }]}>
      <LinearGradient
        colors={['#006957', '#054A3D']}
        useAngle
        angle={150}
        style={StyleSheet.absoluteFill}
      />
      <Glow id="loadA" size={320} opacity={0.2} fade={0.68} style={styles.glowA} />
      <Glow id="loadB" size={260} opacity={0.14} fade={0.7} style={styles.glowB} />
      <Image
        source={require('../assets/hero-watermark.png')}
        style={styles.watermark}
        resizeMode="contain"
      />

      <View style={styles.body}>
        <View style={styles.ringWrap}>
          <View style={styles.ringTrack} />
          <Animated.View style={[styles.ring, { transform: [{ rotate }] }]} />
        </View>

        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.list}>
          {/* Keyed by position, not by the caption. The list is a fixed three lines that
              never reorder, and each row owns a running animation — keying on the finished
              string would remount all three, mid-pop, if the language ever changed under
              them. The index is the one thing about a row here that is actually stable. */}
          {steps.map((s, i) => (
            <StepRow key={i} label={s} done={i < index} active={i === index} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

/** One checklist line; the bead pops as the step completes. */
function StepRow({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  const pop = useRef(new Animated.Value(done ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(pop, {
      toValue: done ? 1 : 0,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();
  }, [done, pop]);

  const scale = pop.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });

  return (
    <View style={styles.row}>
      <Animated.View
        style={[
          styles.dot,
          done && styles.dotDone,
          active && styles.dotActive,
          { transform: [{ scale }] },
        ]}
      >
        {done ? <Icon name="check" size={13} color={colors.green} /> : null}
      </Animated.View>
      <Text style={[styles.label, (done || active) && styles.labelOn]}>{label}</Text>
    </View>
  );
}

function Glow({
  id,
  size,
  opacity,
  fade,
  style,
}: {
  id: string;
  size: number;
  opacity: number;
  fade: number;
  style: object;
}) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} style={style} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={opacity} />
          <Stop offset={String(fade)} stopColor="#FFFFFF" stopOpacity={opacity * 0.35} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={r} cy={r} r={r} fill={`url(#${id})`} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.green, zIndex: 20 },
  glowA: { position: 'absolute', left: -110, top: -60 },
  glowB: { position: 'absolute', right: -90, bottom: -40 },
  watermark: {
    position: 'absolute',
    right: -34,
    top: 54,
    width: 190,
    height: 190,
    opacity: 0.09,
  },

  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 34 },

  ringWrap: { width: 86, height: 86, alignItems: 'center', justifyContent: 'center' },
  ringTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  ring: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: colors.goldL,
    borderRightColor: colors.goldL,
  },

  headline: {
    ...typography.greeting,
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    ...typography.introText,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    marginTop: 8,
  },

  list: { marginTop: 34, alignSelf: 'stretch', gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: { borderColor: colors.goldL },
  dotDone: { backgroundColor: colors.white, borderColor: colors.white },
  label: { ...typography.bodyText, color: 'rgba(255,255,255,0.5)', flex: 1, textAlign: 'auto' },
  labelOn: { color: colors.white },
});
