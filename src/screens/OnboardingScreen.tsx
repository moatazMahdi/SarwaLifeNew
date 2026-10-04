import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { Icon } from '../components/Icon';
import { Phrase, S, useI18n } from '../i18n';

/**
 * Figma: Onboarding (node 1:88). Three slides, each laid out bottom-up:
 * illustration → 95px gap → (dots / headline / subtitle) → 56px gap → CTA.
 *
 * Slide order follows the Figma frame names (الاولي / الثانية / الثالثة), not the dot
 * states drawn on them — those are inconsistent in the comp.
 *
 * The comp also floats two big blurred colour blobs behind the content, a green one top
 * right and a gold one bottom left. They are gone: RN has no blur, so they were rebuilt as
 * SVG radial gradients, and an approximated blur is a stain rather than a glow — on a white
 * canvas it read as two tinted discs sitting behind the artwork instead of lighting it.
 * The illustrations carry the colour on these screens; the background stays white.
 *
 * `chips` are positioned inside the illustration box using the physical offsets from
 * Figma — App.tsx turns off RTL left/right swapping so they aren't mirrored.
 */

/**
 * Copy is held as `Phrase` pairs rather than finished strings: this table is built once at
 * module load, long before a language is known, so the choice has to be deferred to render.
 */
type Chip = { text: Phrase; top: number; left?: number; right?: number };

type Slide = {
  art: ImageSourcePropType;
  artWidth: number;
  artHeight: number;
  chips: Chip[];
  headline: Phrase;
  subtitle: Phrase;
  cta: Phrase;
};

const SLIDES: Slide[] = [
  {
    // Figma "الاولي" — image 5
    art: require('../assets/onboarding/ob1.png'),
    artWidth: 372,
    artHeight: 298,
    chips: [
      { text: S.onboarding.s1.chip, top: -28, right: 0 },
      { text: S.onboarding.noPaper, top: 240, left: 48 },
    ],
    headline: S.onboarding.s1.headline,
    subtitle: S.onboarding.s1.subtitle,
    cta: S.common.next,
  },
  {
    // Figma "الثانية" — image 4
    art: require('../assets/onboarding/ob2.png'),
    artWidth: 384,
    artHeight: 351,
    chips: [
      { text: S.onboarding.s2.chip, top: 85, right: 6 },
      { text: S.onboarding.noPaper, top: 353, left: 54 },
    ],
    headline: S.onboarding.s2.headline,
    subtitle: S.onboarding.s2.subtitle,
    cta: S.common.next,
  },
  {
    // Figma "الثالثة" — image 3. The comp draws this one at 304×282, noticeably smaller
    // than the two slides before it, which left the last screen looking emptier than the
    // ones that led to it. Scaled up by 1.22 to sit with its siblings — the ratio is kept
    // exactly, and the chip's offsets are scaled by the same factor so it stays on the
    // same point of the drawing.
    art: require('../assets/onboarding/ob3.png'),
    artWidth: 371,
    artHeight: 344,
    chips: [{ text: S.onboarding.s3.chip, top: 162, right: 18.75 }],
    headline: S.onboarding.s3.headline,
    subtitle: S.onboarding.s3.subtitle,
    cta: S.onboarding.start,
  },
];

export function OnboardingScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const step: number = route?.params?.step ?? 1;
  const slide = SLIDES[step - 1];
  const isLast = step === SLIDES.length;

  const goHome = () => navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  const goNext = () => (isLast ? goHome() : navigation?.navigate('Onboarding', { step: step + 1 }));

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        {/* Skip pill sits top-left; the last slide has no page header in the design. */}
        <View style={styles.header}>
          {!isLast ? (
            <Pressable style={styles.skipBtn} onPress={goHome}>
              <Text style={styles.skipLabel}>{t(S.onboarding.skip)}</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.content}>
          <View style={[styles.artWrap, { width: slide.artWidth, height: slide.artHeight }]}>
            <Image source={slide.art} style={styles.art} resizeMode="contain" />
            {slide.chips.map((chip) => (
              <View
                // The Arabic half, not the rendered one: a key that changes with the
                // language would remount every chip on a switch.
                key={chip.text[0]}
                style={[
                  styles.chip,
                  { top: chip.top },
                  chip.left !== undefined ? { left: chip.left } : null,
                  chip.right !== undefined ? { right: chip.right } : null,
                ]}
              >
                {/* RTL row: the dot is the first child, so it sits on the right. */}
                <View style={styles.chipDot} />
                <Text style={styles.chipText} numberOfLines={1}>
                  {t(chip.text)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.bottom}>
            <View style={styles.textBlock}>
              <View style={styles.dotsAndTitle}>
                {/* RTL `row` renders the first child rightmost, so the active indicator
                    starts on the right and advances leftwards, as in the comp. */}
                <View style={styles.dots}>
                  {SLIDES.map((s, i) => (
                    <View
                      key={s.headline[0]}
                      style={[styles.dot, i + 1 === step && styles.dotActive]}
                    />
                  ))}
                </View>
                <Text style={styles.headline}>{t(slide.headline)}</Text>
              </View>
              <Text style={styles.subtitle}>{t(slide.subtitle)}</Text>
            </View>

            <View style={styles.buttonWrap}>
              <PrimaryButton
                label={t(slide.cta)}
                onPress={goNext}
                // A "next" arrow points the way the reading runs, so it is drawn
                // pre-mirrored (physically left) for Arabic and flipped back under LTR.
                icon={
                  <Icon
                    name="arrowLeft"
                    width={13.25}
                    height={11.58}
                    color={colors.white}
                    directional
                  />
                }
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  safe: { flex: 1 },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // RTL: flex-end === physical left
    paddingHorizontal: 20,
  },
  skipBtn: {
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(26,29,38,0.28)',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: { ...typography.obSkip, color: '#000000', textAlign: 'center' },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 95,
  },

  artWrap: { position: 'relative' },
  art: { width: '100%', height: '100%' },

  chip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    height: 33.25,
    paddingHorizontal: 14,
    borderRadius: 16.625,
    backgroundColor: colors.white,
    shadowColor: 'rgba(26,29,38,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },
  chipDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.green },
  chipText: { ...typography.badgeLabel, color: colors.ink, textAlign: 'auto' },

  bottom: { width: '100%', gap: 56 },
  textBlock: { alignItems: 'center', gap: 20, paddingHorizontal: 20 },
  dotsAndTitle: { width: '100%', alignItems: 'center', gap: 10 },

  dots: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDE2E7' },
  dotActive: { width: 26, backgroundColor: colors.green },

  headline: {
    ...typography.obHeadline,
    color: colors.green,
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    ...typography.obSubtitle,
    color: '#444745',
    textAlign: 'center',
    width: '100%',
  },

  buttonWrap: {
    paddingHorizontal: 38,
    paddingBottom: 12,
  },
});
