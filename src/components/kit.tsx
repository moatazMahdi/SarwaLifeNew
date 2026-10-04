import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

/**
 * The three shared boxes the identity-intro screen is built from.
 *
 * This file used to carry four more — `SelectCard`, `ChoiceRow`, `InfoRow` and `Bullet` —
 * left over from an earlier build of the quote and issuance steps. Every screen that once
 * used them has since been redrawn against Figma with its own markup, so all four had no
 * caller left. They are deleted rather than kept "in case", because each one took its copy
 * as an already-translated `string` — the exact prop shape `Stepper.tsx` was deleted for.
 * A dead component with the wrong API is not neutral: it is the thing the next screen
 * reaches for, and it would quietly reintroduce captions that cannot survive a language
 * switch. Anything new here should take `Phrase` pairs and resolve them at render.
 */

/* ------------------------------------------------------------------ Card */

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.sectionRow}>
      {/* The bar is written first so it takes the row's start — physical right in Arabic,
          physical left in English — rather than being pinned to one side by hand. */}
      <View style={styles.sectionBar} />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

/* ------------------------------------------------------------ StickyFooter */

export function StickyFooter({ children }: { children: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

/* ------------------------------------------------------------------ styles */

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.card,
    padding: 16,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  sectionBar: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: colors.green,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.ink,
    textAlign: 'auto',
  },

  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenMargin,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.br2,
  },
});
