import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { S, useI18n } from '../i18n';

type Props = {
  title: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
};

/**
 * ترويسة موحّدة: زر الرجوع على اليمين (بداية السطر في RTL) والعنوان بجانبه.
 *
 * It used to be able to draw a progress rail of its own, from a `steps: string[]` of
 * already-translated captions. Nothing asks for that any more — the three flows each carry
 * their own stepper (`SignupStepper`, `IssueStepper`, `QuoteStepper`), all of which take
 * `Phrase` pairs and resolve the language at render. The old rail took finished strings,
 * which meant it also keyed its beads on them and remounted the lot on a language switch.
 */
export function ScreenHeader({ title, onBack, trailing }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.head}>
      <SafeAreaView edges={['top']}>
        <View style={styles.row}>
          {/* The arrow is the only thing in the button, so the word has to be supplied — an
              SVG announces as nothing at all, and this is the control a user leans on most. */}
          <IconButton size={42} onPress={onBack} accessibilityLabel={t(S.common.back)}>
            {/* The shared glyph rather than a typed "→": an arrow written as a character is
                fixed for ever, so it would go on pointing the Arabic way ("back" = right)
                after the app flips to English. `chevronBack` is the pre-mirrored path every
                other header uses, and `directional` turns it round under LTR. */}
            <Icon name="chevronBack" size={22} directional />
          </IconButton>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.trailing}>{trailing}</View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.br2,
    paddingBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.screenMargin,
    paddingTop: 10,
  },
  title: {
    ...typography.headerTitle,
    color: colors.ink,
    flex: 1,
    textAlign: 'auto',
  },
  trailing: {
    minWidth: 0,
  },
});
