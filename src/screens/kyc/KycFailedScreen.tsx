import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, shadows, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Icon } from '../../components/Icon';
import { SUPPORT_WHATSAPP } from '../../data/products';
import { useFlow } from '../../state/FlowContext';
import { useBackGuard } from '../../navigation/useBackGuard';
import { Phrase, S, useI18n } from '../../i18n';

export type KycStage = 'id' | 'liveness';

/**
 * The branch neither the ID scan nor the liveness check had before: the one where the
 * machine could not read what it was given.
 *
 * Built as the payment-failure screen's twin (same medallion, same danger palette, same
 * two-action footer) because by this point in the app that shape already means "this did
 * not work, here is the way out" — a user meeting it for the second time should not have to
 * learn it again.
 *
 * The important half is the list of reasons. "فشل التحقق" on its own sends someone back to
 * re-shoot exactly the photograph that just failed; naming the four things that actually go
 * wrong — glare, blur, a cropped corner, a dim room — is what turns a second attempt into a
 * different attempt.
 */
const COPY: Record<
  KycStage,
  {
    title: Phrase;
    subtitle: Phrase;
    reasons: readonly Phrase[];
    cta: Phrase;
    route: string;
  }
> = {
  id: { ...S.kyc.failed.id, route: 'KycCapture' },
  liveness: { ...S.kyc.failed.liveness, route: 'LivenessIntro' },
};

export function KycFailedScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = route?.params ?? {};
  const stage: KycStage = params.stage === 'liveness' ? 'liveness' : 'id';
  const copy = COPY[stage];
  const { clearCaptures } = useFlow();

  // `gestureEnabled: false` is registered on this route for a reason the Android back button
  // ignored: directly behind this screen is `KycVerifying`, a loader whose only job is to
  // re-run the check that just failed. Pressing back put the user back on it, and the same
  // rejection reappeared on its own a second and a half later — a loop with no way out
  // except pressing back fast enough to beat the timer. Swallowed, not redirected: the
  // retry below already drops the failed captures before it sends the user back to re-shoot,
  // which is the thing a bare "back" would skip.
  useBackGuard();

  function retry() {
    // The captures are dropped first, so the step the user lands on is genuinely empty. Left
    // in place, the ID screen would come back with both slots filled and the button already
    // lit, inviting him to resubmit the same photographs that just failed.
    clearCaptures(stage === 'id' ? 'id' : 'selfie');
    // `replace`, not `navigate`: this screen is a dead end once it has been acted on, and
    // leaving it on the stack would put it behind the back gesture of the retry.
    navigation?.replace(copy.route, params);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <SafeAreaView edges={['top']} style={styles.hero}>
          <Seal />
          <Text style={styles.title}>{t(copy.title)}</Text>
          <Text style={styles.subtitle}>{t(copy.subtitle)}</Text>
        </SafeAreaView>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t(S.kyc.failed.reasonsTitle)}</Text>
          {copy.reasons.map((reason) => (
            // RTL: the dot is written first so it takes the row's start under either
            // direction, the way a bullet does. Keyed on the Arabic half, so a language
            // change does not remount the list.
            <View key={reason[0]} style={styles.reason}>
              <View style={styles.dot} />
              <Text style={styles.reasonText}>{t(reason)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']} style={styles.footerInner}>
          {/* The glyph is written last so it lands on the physical left of the label, the
              side every other footer in the flow puts its icons on. */}
          <PrimaryButton
            label={t(copy.cta)}
            onPress={retry}
            icon={<Icon name="retry" size={21} color={colors.white} />}
          />

          {/* Two failures in a row usually means something the instructions cannot fix — a
              worn card, a damaged chip. The way out is a person, not a third attempt. */}
          <Pressable
            onPress={() => Linking.openURL(`https://wa.me/${SUPPORT_WHATSAPP}`).catch(() => {})}
            accessibilityRole="button"
            style={({ pressed }) => [styles.alt, pressed && styles.pressed]}
          >
            <Icon name="whatsapp" size={20} />
            <Text style={styles.altLabel}>{t(S.kyc.failed.support)}</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </View>
  );
}

/** The payment-failure seal, unchanged — flat danger tints, no gradient. */
function Seal() {
  return (
    <View style={styles.sealRing}>
      <View style={styles.sealDisc}>
        <Icon name="alertBold" size={48} color={colors.white} />
      </View>
    </View>
  );
}

const RING = 120;
const DISC = 84;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, gap: 24 },

  hero: { alignItems: 'center', gap: 24 },

  sealRing: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    backgroundColor: colors.badBg,
    borderWidth: 1,
    borderColor: colors.badBr,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  sealDisc: {
    width: DISC,
    height: DISC,
    borderRadius: DISC / 2,
    backgroundColor: colors.bad,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(239,68,68,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },

  title: {
    ...typography.authTitle,
    fontSize: 24,
    lineHeight: 36,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: -12,
  },
  subtitle: {
    ...typography.introText,
    fontSize: 14.5,
    lineHeight: 23.2,
    color: colors.g5,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.br,
    padding: 18,
    gap: 12,
  },
  cardTitle: { ...typography.cardTitle, color: colors.ink, textAlign: 'auto' },
  reason: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  // Nudged down to sit on the first line's optical centre rather than its top edge.
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.bad, marginTop: 8 },
  reasonText: {
    ...typography.cardBody,
    fontSize: 13,
    lineHeight: 21,
    color: colors.g5,
    textAlign: 'auto',
    flex: 1,
  },

  footer: { backgroundColor: 'rgba(255,255,255,0.94)' },
  footerInner: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 10, gap: 12 },

  alt: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
  },
  altLabel: { ...typography.btnLabelMd, color: colors.g7 },
  pressed: { opacity: 0.7 },
});
