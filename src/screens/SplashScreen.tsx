import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme';
import { LangToggle } from '../components/LangToggle';
import { Icon } from '../components/Icon';
import { S, useI18n } from '../i18n';

export function SplashScreen({ navigation }: any) {
  const { t } = useI18n();

  return (
    <LinearGradient
      colors={['#0C7A65', '#00705C', '#054A3D']}
      locations={[0, 0.42, 1]}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={styles.screen}
    >
      <Image source={require('../assets/logo.png')} style={styles.watermark} resizeMode="contain" />
      <View style={styles.ringOuter} pointerEvents="none" />
      <View style={styles.ringMid} pointerEvents="none" />
      <View style={styles.ringInner} pointerEvents="none" />

      <SafeAreaView style={styles.content} edges={['top', 'bottom']}>
        {/* The switcher sits on the very first screen because the one person who needs it is
            the one who cannot read the screen it is on — making them walk through an
            onboarding they can't read to reach it would be the wrong way round. It takes the
            far edge from the reading direction, the way it does on home, so it mirrors with
            the language rather than pinning itself to one side of the glass. */}
        <View style={styles.topRow}>
          <LangToggle tone="onDark" />
        </View>

        <View style={styles.centerBlock}>
          <View style={styles.logoTile}>
            <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.title}>{t(S.splash.title)}</Text>

          <View style={styles.trackRow}>
            <View style={styles.trackLine} />
            <Text style={styles.trackText}>S A R W A L I F E</Text>
            <View style={styles.trackLine} />
          </View>

          {/* One line, guaranteed by refusing the OS text-size slider rather than by
              `numberOfLines` alone. "حماية في متناول يدك" clears 316dp at 21px with room to
              spare, but the slider reaches 1.3 on this phone and 2.0 on others, and a clamped
              line that overflows is an *ellipsised* tagline — half a slogan, which is worse
              than a wrapped one. Same treatment as the two result-screen headlines. */}
          <Text style={styles.tagline} numberOfLines={1} allowFontScaling={false}>
            {t(S.splash.tagline)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.nextBtn} onPress={() => navigation?.navigate('Onboarding', { step: 1 })}>
            <Text style={styles.nextLabel}>{t(S.common.next)}</Text>
            {/* The shared glyph rather than a literal "←": an arrow typed as text is a
                fixed character, so it goes on pointing the Arabic way after the app flips
                to English. The path points left, which is "forward" in Arabic, and
                `directional` mirrors it to point right under English. */}
            <Icon
              name="arrowLeft"
              width={13.25}
              height={11.58}
              color={colors.green}
              directional
            />
          </Pressable>
          {/* Deliberately unclamped. This line used to be `numberOfLines={1}`, which the
              Arabic survives and the English does not: "Registered with the Financial
              Regulatory Authority under no. (...)" is about 65 characters and needs roughly
              360dp at 11px, against the 316dp this screen leaves between its margins. It was
              ellipsising at "…under no" — cutting off the registration number, which is the
              only part of a regulatory disclosure that carries any information. A second line
              costs 16dp out of a `flex: 1` centre block that has it to spare. */}
          <Text style={styles.legal}>{t(S.splash.legal)}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const RING = 'rgba(255,255,255,0.055)';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  watermark: {
    position: 'absolute',
    top: 120,
    left: -70,
    width: 340,
    height: 340,
    opacity: 0.05,
  },
  ringOuter: {
    position: 'absolute',
    top: '18%',
    alignSelf: 'center',
    width: 560,
    height: 560,
    borderRadius: 280,
    borderWidth: 1,
    borderColor: RING,
  },
  ringMid: {
    position: 'absolute',
    top: '26%',
    alignSelf: 'center',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: RING,
  },
  ringInner: {
    position: 'absolute',
    top: '33%',
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: RING,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  // `flex-end` on a column, not `right`: it resolves to the far edge from the reading
  // direction, so the chip is on the physical left in Arabic and the physical right in
  // English without either side being named.
  topRow: {
    alignSelf: 'flex-end',
    paddingTop: 4,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTile: {
    width: 150,
    height: 150,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  logo: {
    width: 108,
    height: 108,
  },
  title: {
    ...typography.headline,
    fontSize: 38,
    lineHeight: 56,
    color: colors.white,
    marginTop: 28,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  trackLine: {
    width: 26,
    height: 1,
    backgroundColor: 'rgba(201,162,75,0.7)',
  },
  trackText: {
    ...typography.subtitle,
    fontSize: 13,
    color: colors.goldL,
    letterSpacing: 4,
  },
  tagline: {
    ...typography.screenTitle,
    fontSize: 21,
    lineHeight: 32,
    color: colors.white,
    marginTop: 24,
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
    gap: 22,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: 286,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 6,
  },
  nextLabel: {
    ...typography.buttonLabel,
    color: colors.green,
  },
  legal: {
    ...typography.footerNote,
    fontSize: 11,
    // `footerNote` carries 20.4 against a 12px face — a ratio of 1.7, set for single lines.
    // Now that the English wraps, that leaves a visible gap between the two halves of one
    // sentence; 16 holds them together as a block.
    lineHeight: 16,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
  },
});
