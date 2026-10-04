import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, shadows, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SummaryCard, SummaryRow } from '../../components/SummaryCard';
import { Icon } from '../../components/Icon';
import { getProduct, money } from '../../data/products';
import { useFlow } from '../../state/FlowContext';
import { METHOD_LABELS, settle } from './gateway';
import { useBackGuard } from '../../navigation/useBackGuard';
import { S, useI18n } from '../../i18n';

/**
 * The other half of the payment branch. Figma draws no frame for it, so it is built as the
 * exact mirror of the issued screen (2071:6472) — same medallion geometry, same read-back
 * card, same three-action footer — in the danger palette instead of the brand one. A user
 * who has just been told their payment failed should recognise the screen they were
 * expecting, not be handed an unfamiliar one.
 *
 * Nothing is reset here. The quote, the disclosures and the chosen method all survive, so
 * "إعادة المحاولة" re-runs the same charge rather than walking the user back through four
 * steps they already completed — which is what loses a sale that was one tap from closing.
 */
export function PaymentFailedScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = route?.params ?? {};
  const flow = useFlow();
  const product = getProduct(params.product ?? flow.productKey ?? undefined);
  const method = params.method ?? flow.paymentMethod;

  // The screen is registered `gestureEnabled: false`, which on Android takes away the swipe
  // and leaves the hardware button wired straight through to `goBack()` — landing the user
  // back on the payment step with the consent box cleared, behind an attempt the gateway
  // has already counted. Swallowed rather than redirected: the two buttons below are the
  // only two answers this screen has, and both are on the glass.
  useBackGuard();

  /**
   * Re-runs the same charge on the same method. `replace`, not `navigate`: the screen the
   * user is standing on reports an attempt that is now over, so it should not survive
   * behind the answer to the next one.
   */
  function retry() {
    flow.recordPaymentAttempt();
    if (settle(flow.paymentAttempts + 1) === 'failed') {
      navigation?.replace('PaymentFailed', params);
      return;
    }
    flow.issuePolicy();
    navigation?.replace('PolicyIssued', params);
  }

  function changeMethod() {
    // Back to step 4, which reads `flow.paymentMethod` as its initial state — so the method
    // that just failed is still selected and the user is changing it, not re-picking it.
    navigation?.navigate('CheckoutPayment', { product: product.key });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <SafeAreaView edges={['top']} style={styles.hero}>
          <Seal />

          {/* `allowFontScaling={false}` is the part that actually guarantees the single
              line. 21px clears it at scale 1 with room to spare, but the OS text-size
              slider goes to 1.3 on this phone and 2.0 on some others, and at that point
              the headline breaks mid-sentence and reads as two separate statements. Body
              copy still scales; this one line does not. Deliberately *not* clamped with
              `numberOfLines`: if a translation ever did outgrow the width, wrapping is a
              blemish and an ellipsised headline is a broken sentence. */}
          <Text style={styles.title} allowFontScaling={false}>
            {t(S.checkout.failed.title)}
          </Text>
          <Text style={styles.subtitle}>{t(S.checkout.failed.subtitle)}</Text>
        </SafeAreaView>

        <SummaryCard tone="plain">
          <SummaryRow label={S.checkout.summary.product} value={t(product.title)} />
          <SummaryRow
            label={S.checkout.summary.method}
            value={t(METHOD_LABELS[method] ?? S.checkout.methodNames.fallback)}
          />
          <SummaryRow
            label={S.checkout.summary.amountDue}
            value={money(params.amount ?? flow.result?.yearly ?? 0)}
            unit={S.common.currency}
            strong
          />
        </SummaryCard>
      </View>

      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']} style={styles.footerInner}>
          {/* The glyph is written last so it lands on the physical left of the label, the
              side the issued screen puts its icons on. */}
          <PrimaryButton
            label={t(S.checkout.failed.retry)}
            onPress={retry}
            icon={<Icon name="retry" size={21} color={colors.white} />}
          />

          <Pressable
            onPress={changeMethod}
            accessibilityRole="button"
            style={({ pressed }) => [styles.alt, pressed && styles.pressed]}
          >
            <Text style={styles.altLabel}>{t(S.checkout.failed.changeMethod)}</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </View>
  );
}

/** The issued screen's seal in the danger palette — flat tints, because a failure has no
 *  reason to be as richly drawn as a success. */
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
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: 14, gap: 24 },

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

  // 24px put "لم تتم عملية الدفع" over two lines on a 360dp screen once the system font
  // scale is above 1 — and a headline that breaks mid-sentence reads as two separate
  // statements. 21 clears it with room to spare at the scales people actually run.
  title: {
    ...typography.authTitle,
    fontSize: 21,
    lineHeight: 32,
    color: colors.ink,
    textAlign: 'center',
    paddingHorizontal: 8,
    marginBottom: -12,
  },
  subtitle: {
    ...typography.introText,
    fontSize: 14.5,
    lineHeight: 23.2,
    color: colors.g5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  footer: { backgroundColor: 'rgba(255,255,255,0.94)' },
  footerInner: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 10, gap: 12 },

  alt: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
  },
  altLabel: { ...typography.btnLabelMd, color: colors.g7 },
  pressed: { opacity: 0.7 },
});
