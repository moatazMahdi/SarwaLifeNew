import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../theme';
import { Icon } from './Icon';
import { Phrase, S, useI18n } from '../i18n';

/**
 * Figma 2071:5475 — the four-step rail that sits at the top of every "اصدار الوثيقة" screen.
 *
 * The design numbers the steps 1→4 but lays them out with 1 at the physical right, which is
 * simply what an RTL row does to a list written in order. So the steps are written here in
 * their natural order and the row mirrors itself; nothing is reversed by hand.
 *
 * Three states per step, straight off the comp: a finished step is a filled brand disc with
 * a tick, the current step is the same disc showing its number inside a soft brand ring, and
 * a step still to come is a white disc with a grey number.
 */

/** The captions, in step order. Phrases rather than strings: the rail outlives a language
 *  switch, so the caption has to be resolved at render time. */
export const ISSUE_STEPS: readonly Phrase[] = S.checkout.steps;

export function IssueStepper({ current }: { current: number }) {
  const { t } = useI18n();
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {ISSUE_STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          // Keyed on the Arabic half: a key that changed with the language would remount
          // the whole rail on a switch. The step index stays in Western digits in both
          // languages — it is a position on a rail, not a figure the user reads out.
          return (
            <React.Fragment key={label[0]}>
              {i > 0 ? <View style={styles.line} /> : null}
              <View style={styles.step}>
                {done || active ? (
                  <LinearGradient
                    colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
                    locations={
                      gradients.brand.locations as unknown as [number, number, ...number[]]
                    }
                    useAngle
                    angle={145}
                    // Only the step you are on carries the ring; a finished one is a plain disc.
                    style={[styles.disc, active && styles.discRing]}
                  >
                    {done ? (
                      <Icon name="check" size={13} color={colors.white} />
                    ) : (
                      <Text style={styles.numOn}>{n}</Text>
                    )}
                  </LinearGradient>
                ) : (
                  <View style={[styles.disc, styles.discOff]}>
                    <Text style={styles.num}>{n}</Text>
                  </View>
                )}
                <Text style={[styles.label, (done || active) && styles.labelOn]}>{t(label)}</Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const DISC = 30;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 16,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },

  // The connector is a flex gap rather than the comp's fixed 56px, so the rail keeps its
  // proportions on a 360dp Xiaomi as well as the 402dp frame it was drawn at.
  line: {
    flex: 1,
    height: 2,
    borderRadius: 1.25,
    backgroundColor: colors.br,
    // Half the disc, so the rule meets the discs at their centre line.
    marginTop: DISC / 2 - 1,
    marginHorizontal: 6,
  },

  step: { alignItems: 'center', gap: 4, minWidth: 34 },
  disc: {
    width: DISC,
    height: DISC,
    borderRadius: DISC / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // The comp's 4px spread ring is a shadow with no blur and no offset, which Android drops;
  // a border of the same colour on an outer box reads identically and is cheaper.
  discRing: {
    borderWidth: 0,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 3,
  },
  discOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.br,
  },

  num: { ...typography.stepNum, color: colors.g4 },
  numOn: { ...typography.stepNum, color: colors.white },
  label: { ...typography.stepCaption, color: colors.g4, textAlign: 'center' },
  labelOn: { color: colors.green },
});
