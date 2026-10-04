import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../theme';
import { Icon } from './Icon';

/**
 * One line of red under a control that rejected what it was given.
 *
 * It lives in its own file rather than inside each field because the phone number, the OTP
 * and the ID scan all fail in the same way and should fail in the same voice — a user who
 * has already met this shape once on the phone screen should recognise it instantly on the
 * next one, instead of learning a new error style per step.
 *
 * Renders nothing for an empty message, so a caller can pass its state straight through
 * without guarding the call site.
 */
export function FieldError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.row} accessibilityLiveRegion="polite">
      {/* Mark first, so it takes the row's start under either direction. */}
      <Icon name="alertCircle" size={15} color={colors.bad} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // `flex-start`, not `center`: a message long enough to wrap should keep its mark beside
    // the first line rather than floating to the middle of the block.
    alignItems: 'flex-start',
    gap: 6,
  },
  text: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.bad,
    textAlign: 'auto',
    flex: 1,
  },
});
