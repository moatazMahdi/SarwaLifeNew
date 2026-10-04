import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Icon } from '../../components/Icon';
import { useFlow } from '../../state/FlowContext';
import { S, useI18n } from '../../i18n';

/**
 * Figma 2070:5089 — "تم إنشاء حسابك! 🎉". The comp is deliberately bare: medallion, two
 * lines, one button. The summary card the old build showed here is gone — the data was
 * already confirmed on "راجع بياناتك", and repeating it buries the one action on offer.
 */
export function SignupDoneScreen({ navigation }: any) {
  const { t } = useI18n();
  const { productKey, result } = useFlow();
  const { width } = useWindowDimensions();

  /**
   * The button resumes whatever the account creation interrupted, so it names that thing
   * rather than the generic "لنبدأ" — a user who came here mid-issuance has not finished
   * starting anything, he is four steps into a policy and wants the fifth. The fallback
   * stays generic for the one path that really is a fresh start: an account made from the
   * gate with no quote behind it.
   */
  const resuming = Boolean(productKey && result);
  const cta = t(resuming ? S.auth.signupDone.ctaResume : S.auth.signupDone.ctaStart);

  function onStart() {
    if (productKey && result) {
      navigation?.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'CheckoutPersonal', params: { product: productKey } }],
      });
      return;
    }
    if (productKey) {
      navigation?.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'ProductDetails', params: { product: productKey } }],
      });
      return;
    }
    navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  // The comp draws the watermark 631 wide on a 390 frame; keeping the ratio holds the
  // crop on a narrower or wider phone.
  const markW = width * (631 / 390);

  return (
    <View style={styles.screen}>
      <Image
        source={require('../../assets/logo.png')}
        style={[styles.watermark, { width: markW, height: markW * (547 / 631) }]}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
        <View style={styles.body}>
          <LinearGradient
            colors={['#F1F8F6', '#E7F2EE']}
            useAngle
            angle={140}
            style={styles.pop}
          >
            <LinearGradient
              colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
              locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
              useAngle
              angle={145}
              style={styles.disc}
            >
              {/* The 1px inset highlight the comp lays along the disc's top edge. */}
              <View style={styles.discGloss} />
              <Icon name="checkBold" size={48} color={colors.white} />
            </LinearGradient>
          </LinearGradient>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>{t(S.auth.signupDone.title)}</Text>
            <Text style={styles.subtitle}>{t(S.auth.signupDone.subtitle)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          {/* The 22px white fade the comp floats above the bar, so the content slides
              under it rather than meeting a hard edge. */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)']}
            style={styles.footerFade}
            pointerEvents="none"
          />
          <PrimaryButton label={cta} onPress={onStart} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F7FA' },
  fill: { flex: 1 },
  watermark: { position: 'absolute', left: 0, top: -128, opacity: 0.05 },

  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 24 },
  pop: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disc: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
  },
  discGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  titleBlock: { gap: 8, alignSelf: 'stretch' },
  title: {
    ...typography.authTitle,
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: -0.4,
    color: colors.ink,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.introText,
    fontSize: 14.5,
    lineHeight: 23.2,
    color: '#6B7280',
    textAlign: 'center',
  },

  footer: {
    paddingHorizontal: 32,
    paddingTop: 14,
    paddingBottom: 34,
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  footerFade: { position: 'absolute', left: 0, right: 0, top: -22, height: 22 },
});
