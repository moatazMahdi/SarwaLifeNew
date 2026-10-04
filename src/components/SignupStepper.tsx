import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../theme';
import { Icon } from './Icon';
import { Phrase, S, useI18n } from '../i18n';

/**
 * Figma 2070:4149 — the four-bead progress card that rides above every account-creation
 * step. Step 1 is the right-most bead: the list is written in flow order and the row
 * reverses itself under RTL, so "الهوية" lands physically right in Arabic and physically
 * left in English without the labels being re-ordered by hand.
 *
 * The table is built at module load, long before a language is known, so it holds `Phrase`
 * pairs and the choice is deferred to render.
 */
const STEPS: Phrase[] = [
  S.kyc.steps.identity,
  S.kyc.steps.details,
  S.kyc.steps.verify,
  S.kyc.steps.security,
];

const BEAD = 30;
/** Figma pins three 56×2 connectors behind the beads rather than spacing them out. */
const LINE_H = 2;

type Props = {
  /** 1-based, 1..4. */
  current: number;
};

export function SignupStepper({ current }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.card}>
      <View style={styles.track}>
        {/* The connectors sit behind the beads, each one spanning the gap it bridges. A
            connector turns green once the step on its flow-start side is finished. */}
        <View style={styles.lines} pointerEvents="none">
          {/* Keyed on the Arabic half, not the rendered one: a key that changed with the
              language would remount every bead on a switch. */}
          {STEPS.slice(1).map((label, i) => (
            <View key={label[0]} style={[styles.line, i + 1 < current && styles.lineDone]} />
          ))}
        </View>

        {STEPS.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <View key={label[0]} style={styles.col}>
              {done || active ? (
                <LinearGradient
                  colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
                  locations={
                    gradients.brand.locations as unknown as [number, number, ...number[]]
                  }
                  useAngle
                  angle={145}
                  style={[styles.bead, active && styles.beadRing]}
                >
                  {done ? (
                    <Icon name="check" size={16} color={colors.white} />
                  ) : (
                    <Text style={styles.numOn}>{step}</Text>
                  )}
                </LinearGradient>
              ) : (
                <View style={[styles.bead, styles.beadOff]}>
                  <Text style={styles.numOff}>{step}</Text>
                </View>
              )}
              <Text style={[styles.label, (done || active) && styles.labelOn]}>{t(label)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 16,
  },
  track: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  /* Inset by half a bead at each end so the strip spans bead-centre to bead-centre; the
     three equal flex children then land exactly in the three gaps. */
  lines: {
    position: 'absolute',
    top: BEAD / 2 - LINE_H / 2,
    left: BEAD / 2,
    right: BEAD / 2,
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: LINE_H,
    borderRadius: LINE_H / 2,
    backgroundColor: colors.br,
  },
  lineDone: { backgroundColor: colors.green },

  col: { alignItems: 'center', width: 52 },
  bead: {
    width: BEAD,
    height: BEAD,
    borderRadius: BEAD / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Figma: `box-shadow: 0 0 0 4px rgba(0,105,87,0.13)`. A spread-only shadow has no RN
  // equivalent, so it is approximated with a soft halo at the same radius.
  beadRing: {
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    elevation: 3,
  },
  beadOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.br,
  },
  numOn: { ...typography.stepNum, color: colors.white },
  numOff: { ...typography.stepNum, color: colors.g4 },
  label: { ...typography.stepCaption, color: colors.g4, marginTop: 5, textAlign: 'center' },
  labelOn: { color: colors.green },
});
