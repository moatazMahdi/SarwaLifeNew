import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, shadows, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { IssueHeading, IssueLayout } from '../../components/IssueLayout';
import { SummaryBlock, SummaryCard, SummaryRow } from '../../components/SummaryCard';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../assets/icons/iconXml';
import { OPTIONALS, getProduct, money } from '../../data/products';
import { settle } from './gateway';
import { useFlow } from '../../state/FlowContext';
import { Phrase, S, useI18n } from '../../i18n';

/**
 * Figma 2071:6097 — step 4 of "اصدار الوثيقة": the last read-back, then the one decision
 * the screen actually asks for.
 *
 * The comp leaves step 3 lit on the rail and carries the medical screen's standfirst
 * ("أسئلة تتعلق بحالتك الصحية") over at the top — both are copy-paste leftovers from the
 * frame it was duplicated from. The rail is lit at 4 and the standfirst says what this
 * screen does; everything else is taken literally.
 */

type Method = {
  key: string;
  label: Phrase;
  desc: Phrase;
  icon: IconName;
  /**
   * A trademark rather than one of the app's own glyphs. Brand marks carry their own
   * colours and their own background, so they are laid on a plain tile and left untinted —
   * the soft brand gradient the generic glyphs sit on would stain them.
   */
  brand?: 'fill' | 'inset';
};

const METHODS: Method[] = [
  {
    key: 'fawry',
    label: S.checkout.payment.fawry,
    desc: S.checkout.payment.fawryDesc,
    icon: 'fawry',
    // Fawry's mark *is* a yellow tile, so it is bled to the badge's edges rather than
    // floated inside one.
    brand: 'fill',
  },
  {
    key: 'card',
    label: S.checkout.payment.card,
    desc: S.checkout.payment.cardDesc,
    icon: 'mastercard',
    brand: 'inset',
  },
  {
    key: 'wallet',
    label: S.checkout.payment.wallet,
    desc: S.checkout.payment.walletDesc,
    icon: 'wallet',
  },
];

export function CheckoutPaymentScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);
  const result = flow.result;

  // The flow may be re-entered from the failure screen, which sends the user back to the
  // method they already picked rather than making them choose twice.
  const [method, setMethod] = useState<string | null>(flow.paymentMethod);
  const [agreed, setAgreed] = useState(false);

  const picked = OPTIONALS.filter((o) => (flow.quote.optionals ?? []).includes(o.key));
  const covers = picked.length
    ? picked.map((o) => t(o.label)).join(' + ')
    : t(S.checkout.payment.baseCover);

  /**
   * Paying happens outside the app — the provider's page takes over and hands the user
   * back with an answer. So there is nothing to show in between: the tap resolves straight
   * to one of the two outcome screens.
   *
   * `navigate`, not `push`: a user who fails, retries and succeeds should not be able to
   * swipe back through a stack of dead attempts.
   */
  function onIssue() {
    if (!method) return;
    flow.setPaymentMethod(method);
    flow.recordPaymentAttempt();

    const params = {
      product: product.key,
      method,
      amount: result?.yearly ?? 0,
      cycle: 'yearly' as const,
    };

    if (settle(flow.paymentAttempts + 1) === 'failed') {
      navigation?.navigate('PaymentFailed', params);
      return;
    }
    flow.issuePolicy();
    navigation?.navigate('PolicyIssued', params);
  }

  return (
    <IssueLayout
      step={4}
      onBack={() => navigation?.goBack()}
      footer={
        <>
          {/* The box is written first so it takes the row's start — physical right in
              Arabic, physical left in English. A checkbox belongs on the edge the sentence
              begins at: that is where the eye is before it starts reading, and it is the
              only part of this row the user has to act on. */}
          <View style={styles.consent}>
            <Pressable
              onPress={() => setAgreed((v) => !v)}
              hitSlop={10}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreed }}
              style={[styles.box, agreed && styles.boxOn]}
            >
              {agreed ? <Icon name="check" size={14} color={colors.white} /> : null}
            </Pressable>

            <Text style={styles.consentText}>
              {t(S.checkout.payment.consentPre)}{' '}
              <Text style={styles.consentLink} onPress={() => navigation?.navigate('Terms')}>
                {t(S.checkout.payment.terms)}
              </Text>{' '}
              {t(S.checkout.payment.consentAnd)}{' '}
              <Text style={styles.consentLink} onPress={() => navigation?.navigate('Privacy')}>
                {t(S.checkout.payment.privacy)}
              </Text>{'\n'}
              {t(S.checkout.payment.consentPost)}
            </Text>
          </View>

          <PrimaryButton
            label={t(S.checkout.payment.issue)}
            disabled={!method || !agreed}
            onPress={onIssue}
            icon={<Icon name="shieldCheck" size={21} color={colors.white} />}
          />
        </>
      }
    >
      <IssueHeading title={S.checkout.payment.title} subtitle={S.checkout.payment.subtitle} />

      <SummaryCard tone="plain">
        <SummaryRow label={S.checkout.summary.product} value={t(product.title)} />
        <SummaryRow
          label={S.checkout.summary.sumInsured}
          value={`${money(flow.quote.cover ?? 0)} ${t(S.common.currency)}`}
        />
        <SummaryBlock label={S.checkout.summary.covers} value={covers} />
        <SummaryRow
          label={S.checkout.summary.yearlyPremium}
          value={money(result?.yearly ?? 0)}
          unit={S.common.currency}
          strong
        />
      </SummaryCard>

      <IssueHeading
        title={S.checkout.payment.methodTitle}
        subtitle={S.checkout.payment.methodSubtitle}
      />

      <View style={styles.methods}>
        {METHODS.map((m) => {
          const on = method === m.key;
          return (
            <Pressable
              key={m.key}
              onPress={() => setMethod(m.key)}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              style={[styles.method, on && styles.methodOn]}
            >
              {/* RTL: badge first so it lands on the reading edge, then the label block,
                  then the radio at the far end — the order the comp renders. */}
              <MethodBadge method={m} />

              <View style={styles.methodText}>
                <Text style={styles.methodLabel}>{t(m.label)}</Text>
                <Text style={styles.methodDesc}>{t(m.desc)}</Text>
              </View>

              <View style={[styles.radio, on && styles.radioOn]}>
                {on ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </IssueLayout>
  );
}

/**
 * Three tiles of one size, drawn three ways.
 *
 * Fawry and Mastercard are trademarks and arrive with their own colour: Fawry's mark is
 * itself a yellow tile, so it fills the badge edge to edge, while Mastercard's two discs
 * float on white with room to breathe, the way the scheme's own guidelines set it. Only
 * the wallet — a category, not a brand — keeps the app's soft gradient and brand tint.
 */
function MethodBadge({ method }: { method: Method }) {
  if (method.brand === 'fill') {
    return (
      <View style={styles.brandBadge}>
        <Icon name={method.icon} size={BADGE} />
      </View>
    );
  }
  if (method.brand === 'inset') {
    return (
      <View style={[styles.brandBadge, styles.brandBadgeInset]}>
        {/* The mark is 48×30, so it is given a width and lets its own ratio set the height. */}
        <Icon name={method.icon} width={28} height={17.5} />
      </View>
    );
  }
  return (
    <LinearGradient
      colors={gradients.brandSoft.colors as unknown as [string, string, ...string[]]}
      useAngle
      angle={140}
      style={styles.badge}
    >
      <Icon name={method.icon} size={22} color={colors.green} />
    </LinearGradient>
  );
}

const BADGE = 40;

const styles = StyleSheet.create({
  methods: { gap: 12 },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    backgroundColor: colors.white,
  },
  // The comp draws only the resting row; selection thickens the same border rather than
  // flooding the row, so the three stay the same height however the user moves through them.
  methodOn: { borderWidth: 2, borderColor: colors.green, margin: -1 },

  methodText: { flex: 1, gap: 8 },
  methodLabel: { ...typography.optTitle, fontSize: 16, lineHeight: 17.25, color: '#000000', textAlign: 'auto' },
  methodDesc: { ...typography.helperText, fontSize: 14, lineHeight: 17.25, color: colors.g5, textAlign: 'auto' },

  badge: {
    width: BADGE,
    height: BADGE,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  brandBadge: {
    width: BADGE,
    height: BADGE,
    borderRadius: 11,
    // Clips the bled mark back to the tile's corners — without it Fawry's yellow would
    // square off the badge that every other row rounds.
    overflow: 'hidden',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  brandBadgeInset: { borderWidth: 1, borderColor: 'rgba(0,105,87,0.1)' },

  radio: {
    width: 29,
    height: 29,
    borderRadius: 14.5,
    borderWidth: 1.5,
    borderColor: colors.g3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.green, borderWidth: 2 },
  radioDot: { width: 15, height: 15, borderRadius: 7.5, backgroundColor: colors.green },

  consent: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  consentText: { ...typography.bodyText, color: colors.g7, textAlign: 'auto', flex: 1 },
  consentLink: { ...typography.linkText, color: colors.green, textDecorationLine: 'underline' },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.g3,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  boxOn: { backgroundColor: colors.green, borderColor: colors.green },
});
