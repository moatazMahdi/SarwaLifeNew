import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { S, useI18n } from '../../i18n';

/**
 * Figma 2070:4653 — "تأكيد هويتك / التحقق من الحياة". The one dark screen in the flow: a
 * brand-green field, the face mark in a glass disc, and a gold CTA. Gold is the only
 * accent left with real contrast once the background is already brand green.
 */
export function LivenessIntroScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = route?.params ?? {};

  return (
    <View style={styles.screen}>
      {/* Figma paints a radial gradient centred near the top; a linear ramp through the
          same three stops reads the same on a phone-sized canvas and costs no extra layer. */}
      <LinearGradient
        colors={['#0C7A65', '#00705C', '#04463A']}
        locations={[0, 0.38, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* The watermark the comp fades to 5% behind the content. */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.watermark}
        resizeMode="contain"
      />

      <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
        <View style={styles.head}>
          <Pressable
            onPress={() => navigation?.goBack()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={t(S.common.back)}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            {/* Pre-mirrored, so it already points physically right under RTL;
                `directional` points it left again under LTR. */}
            <Icon name="chevronBack" size={24} color={colors.white} directional />
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={styles.disc}>
            <LinearGradient
              colors={['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']}
              locations={[0, 0.55]}
              style={StyleSheet.absoluteFill}
            />
            <Icon name="faceScan" size={94} color={colors.white} />
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>{t(S.kyc.liveness.title)}</Text>
            <Text style={styles.subtitle}>{t(S.kyc.liveness.subtitle)}</Text>
          </View>

          <Pressable
            onPress={() => navigation?.navigate('KycFace', params)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']}
              locations={[0, 0.55]}
              style={StyleSheet.absoluteFill}
            />
            {/* RTL: the label is written first so it takes the physical right and the
                camera glyph trails it, as the comp draws them. */}
            <Text style={styles.ctaLabel}>{t(S.kyc.liveness.cta)}</Text>
            <Icon name="camera" size={20} color={colors.white} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.greenDD },
  fill: { flex: 1 },
  watermark: {
    position: 'absolute',
    left: -60,
    top: 110,
    width: 270,
    height: 270,
    opacity: 0.05,
  },

  head: { height: 60, paddingHorizontal: 16, paddingTop: 8, flexDirection: 'row' },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },

  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  disc: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 10,
  },

  titleBlock: { marginTop: 48, gap: 8, alignSelf: 'stretch' },
  title: {
    ...typography.authTitle,
    fontSize: 22,
    lineHeight: 33,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: { ...typography.introText, color: 'rgba(255,255,255,0.82)', textAlign: 'center' },

  cta: {
    marginTop: 40,
    width: 227,
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 13,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaPressed: { opacity: 0.88 },
  ctaLabel: { ...typography.btnLabelMd, color: colors.white },
});
