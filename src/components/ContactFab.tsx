import React from 'react';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { colors, typography } from '../theme';
import { Icon } from './Icon';
import { SUPPORT_WHATSAPP } from '../data/products';
import { S, useI18n } from '../i18n';

/**
 * The floating "تواصل معنا" button.
 *
 * It is pinned to the bottom of the home page rather than parked in a menu because the
 * moment someone wants a human is the moment they have stopped reading — and insurance is
 * bought from people at least as often as it is bought from screens.
 *
 * `end`/`bottom` rather than `left`/`right`, so it sits on the far edge from the reading
 * direction and mirrors with the language instead of pinning itself to one side of the glass.
 */
export function ContactFab({ bottom = 24 }: { bottom?: number }) {
  const { t } = useI18n();

  return (
    <Pressable
      onPress={() => Linking.openURL(`https://wa.me/${SUPPORT_WHATSAPP}`).catch(() => {})}
      accessibilityRole="button"
      style={({ pressed }) => [styles.fab, { bottom }, pressed && styles.pressed]}
    >
      {/* Mark first so it takes the row's start — the glyph is what the eye catches, the
          label is what confirms it. */}
      <Icon name="whatsapp" size={22} />
      <Text style={styles.label}>{t(S.home.contact)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    end: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 26,
    backgroundColor: colors.white,
    // The page behind it is already a field of white cards, so the button has to earn its
    // separation with a shadow rather than with its fill.
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  label: { ...typography.btnLabelSm, color: colors.ink, textAlign: 'auto' },
});
