import React, { useCallback } from 'react';
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, radius, shadows, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SummaryCard, SummaryRow } from '../../components/SummaryCard';
import { Icon } from '../../components/Icon';
import { getProduct, money } from '../../data/products';
import { useFlow } from '../../state/FlowContext';
import { LRM } from '../../components/PhoneField';
import { useBackGuard } from '../../navigation/useBackGuard';
import { S, useI18n } from '../../i18n';

/**
 * Figma 2071:6472 — the end of the flow.
 *
 * No top bar and no back button: the policy is issued, so there is nothing behind this
 * screen left to return to. The three things the comp offers are the three things a user
 * actually wants at this moment — keep a copy, send a copy, leave — and "العودة للرئيسية"
 * is a text link rather than a third button because it is the one that ends the session.
 *
 * The comp lays a 5%-opacity calligraphic watermark behind the hero. It is a raster the
 * repo does not have, and it carries no meaning, so it is left out rather than faked with
 * a glyph that would land differently on every device.
 */
export function PolicyIssuedScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);

  // "SL-2026-123456" is a grouped run of Latin and digits dropped into an Arabic paragraph;
  // the mark pins it LTR so the user reads the same string back that the insurer stored.
  const policyNumber = flow.policyNumber ? LRM + flow.policyNumber : '—';

  const goHome = useCallback(() => {
    flow.reset();
    navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }, [flow, navigation]);

  // Android's back button is not covered by the screen's `gestureEnabled: false`, so without
  // this it popped back onto the payment step — of a policy that was already issued and
  // paid for, with "اصدار الوثيقة" still live and ready to issue a second one. Pointed at
  // the same exit the screen's own link uses rather than swallowed: the sale is finished,
  // so "back" and "home" are the same wish.
  useBackGuard(goHome);

  /**
   * The OS share sheet, nothing more. The screen used to open a dialogue promising to let
   * the user "choose who to send a copy to" — an address book this app does not have and
   * has no business having. The platform already owns that list, and the user already
   * knows how to use it.
   *
   * A rejection here is the user backing out of the sheet, which is not an error.
   */
  function share() {
    Share.share({ message: `${t(S.checkout.issued.shareBody)} ${policyNumber}` }).catch(() => {});
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={['top']} style={styles.hero}>
          <Seal />

          {/* The emoji trails the sentence, which under RTL puts it on the physical left —
              where the comp draws it. It is joined to the last word by a non-breaking
              space, and the line is held to one row whatever the OS text-size slider is
              set to: both are needed, because a wrap here leaves the 🎉 alone on a second
              line with nothing left to celebrate beside it. */}
          <Text style={styles.title} allowFontScaling={false}>
            {t(S.checkout.issued.title)}
          </Text>
          <Text style={styles.subtitle}>{t(S.checkout.issued.subtitle)}</Text>
        </SafeAreaView>

        <SummaryCard tone="plain">
          {/* The policy number is the one row the user will be asked to read back to a call
              centre, so it is the only black-card value the comp tints. */}
          <SummaryRow label={S.checkout.summary.policyNumber} value={policyNumber} accent />
          <SummaryRow label={S.checkout.summary.product} value={t(product.title)} />
          <SummaryRow
            label={S.checkout.summary.sumInsured}
            value={`${money(flow.quote.cover ?? 0)} ${t(S.common.currency)}`}
          />
          {/* The comp reads back the yearly premium, not the monthly one, because that is
              the figure that was just charged on the previous screen. */}
          <SummaryRow
            label={S.checkout.summary.yearlyPremium}
            value={money(flow.result?.yearly ?? 0)}
            unit={S.common.currency}
            strong
          />
        </SummaryCard>
      </ScrollView>

      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']} style={styles.footerInner}>
          {/* Both footer glyphs sit on the physical left of their label, so each is written
              last — `PrimaryButton` already renders label-then-icon. */}
          <PrimaryButton
            label={t(S.checkout.issued.download)}
            onPress={() =>
              Alert.alert(t(S.checkout.issued.downloadTitle), t(S.checkout.issued.downloadBody))
            }
            icon={<Icon name="download" size={21} color={colors.white} />}
          />

          <Pressable
            onPress={share}
            accessibilityRole="button"
            style={({ pressed }) => [styles.share, pressed && styles.pressed]}
          >
            <Text style={styles.shareLabel}>{t(S.checkout.issued.share)}</Text>
            <Icon name="shareNodes" size={20} color={colors.g7} />
          </Pressable>

          <Pressable onPress={goHome} accessibilityRole="button" hitSlop={8}>
            <Text style={styles.home}>{t(S.checkout.issued.home)}</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </View>
  );
}

/**
 * The success mark: a dark brand disc floating inside a pale ring of the same hue. The ring
 * is what gives the disc its lift — it is drawn as a filled circle rather than a border so
 * the soft gradient reads, which a 1px stroke could not carry.
 */
function Seal() {
  return (
    <LinearGradient
      colors={gradients.brandSoft.colors as unknown as [string, string, ...string[]]}
      useAngle
      angle={140}
      style={styles.sealRing}
    >
      <LinearGradient
        colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
        locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
        useAngle
        angle={145}
        style={styles.sealDisc}
      >
        <Icon name="checkBold" size={48} color={colors.white} />
      </LinearGradient>
    </LinearGradient>
  );
}

const RING = 120;
const DISC = 84;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 14, paddingBottom: 28, gap: 24 },

  hero: { alignItems: 'center', paddingTop: 18, gap: 24 },

  sealRing: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  sealDisc: {
    width: DISC,
    height: DISC,
    borderRadius: DISC / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // A tall, soft, downward shadow — what lifts the disc off the ring behind it. Android
    // flattens this to `elevation`, which is why the ring carries its own border too.
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 10,
  },

  // Matched to the failure screen's headline, and for the same reason: at 24 the sentence
  // broke across two lines on a 360dp screen, which here stranded the 🎉 on a line of its
  // own — a celebration mark with nothing left to celebrate next to it.
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

  share: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
  },
  shareLabel: { ...typography.btnLabelMd, color: colors.g7 },
  pressed: { opacity: 0.7 },

  home: {
    ...typography.authResend,
    color: colors.green,
    textAlign: 'center',
    paddingVertical: 6,
  },
});
