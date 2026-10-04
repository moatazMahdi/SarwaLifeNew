import React, { useCallback } from 'react';
import {
  Image,
  ImageSourcePropType,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, ProductKey, productColors, typography } from '../theme';
import { Icon } from '../components/Icon';
import { getProduct, SUPPORT_WHATSAPP } from '../data/products';
import { useFlow } from '../state/FlowContext';
import { S, useI18n } from '../i18n';

/**
 * Figma: المنتجات (section 1:351) — one screen per product (1:352 death, 1:411 sav,
 * 1:461 crit, 1:507 fcan, 1:554 mcan). All five share the layout below; only the hero
 * artwork, the title, the intro paragraph, the perk list and the perk-icon tint differ.
 * The hero gradient and both footer buttons are brand green on *every* product — the
 * per-product palette only shows up in the perk tiles.
 *
 * Geometry note: the Figma frame is 390×844 with a 47dp top safe area baked in, so every
 * vertical offset below is expressed relative to the safe-area inset rather than the raw
 * frame top (`dy` shifts the purely decorative layers by the same amount).
 */

const HERO_ART: Record<ProductKey, ImageSourcePropType> = {
  death: require('../assets/products/hero-death.png'),
  sav: require('../assets/products/hero-sav.png'),
  crit: require('../assets/products/hero-crit.png'),
  fcan: require('../assets/products/hero-fcan.png'),
  mcan: require('../assets/products/hero-mcan.png'),
};

/** Figma safe-area height the frame was laid out against. */
const FIGMA_TOP_INSET = 47;
/** Hero is 246 tall in the frame; the rest is driven by the real inset. */
const HERO_BELOW_INSET = 246 - FIGMA_TOP_INSET;
/** The body sheet slides up over the hero by this much. */
const BODY_OVERLAP = 52;

export function ProductDetailsScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const { setProduct } = useFlow();
  const insets = useSafeAreaInsets();
  const product = getProduct(route?.params?.product);
  const pc = productColors[product.key];
  // Decorative layers keep their Figma offsets, shifted by the real-vs-Figma inset delta.
  const dy = insets.top - FIGMA_TOP_INSET;

  const onCalc = () => {
    setProduct(product.key);
    navigation?.navigate('Quote', { product: product.key });
  };

  const onShare = useCallback(() => {
    // The sheet is composed at tap time, so it is written in the language on screen.
    Share.share({ message: `${t(product.title)}\n${t(product.short)}` }).catch(() => {});
  }, [product, t]);

  const onWhatsApp = useCallback(() => {
    Linking.openURL(`https://wa.me/${SUPPORT_WHATSAPP}`).catch(() => {});
  }, []);

  return (
    <View style={styles.screen}>
      {/* ------------------------------------------------------------------ hero */}
      <View style={[styles.hero, { height: insets.top + HERO_BELOW_INSET }]}>
        <LinearGradient
          colors={['#006957', '#054A3D']}
          useAngle
          angle={150}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Decoration: two soft radial glows + a faint watermark of the brand mark. */}
        <Glow
          id="pdGlowA"
          size={280}
          opacity={0.2}
          fade={0.68}
          style={[styles.glowA, { top: -160 + dy }]}
        />
        <Glow
          id="pdGlowB"
          size={220}
          opacity={0.12}
          fade={0.7}
          style={[styles.glowB, { top: 146 + dy }]}
        />
        <Image
          source={require('../assets/hero-watermark.png')}
          style={[styles.watermark, { top: -24 + dy }]}
          resizeMode="cover"
        />

        {/* RTL row: first child renders rightmost, so "back" sits on the physical right. */}
        <View style={[styles.topRow, { marginTop: insets.top + 5 }]}>
          <GlassButton onPress={() => navigation?.goBack()} label={t(S.product.a11y.back)}>
            {/* Pre-mirrored, so it points physically right — "back" only while the
                reading runs that way. `directional` turns it around under LTR. */}
            <Icon name="arrowRight" size={23} directional />
          </GlassButton>
          <GlassButton onPress={onShare} label={t(S.product.a11y.share)}>
            <Icon name="share" size={21} />
          </GlassButton>
        </View>

        <View style={styles.titleRow}>
          <View style={styles.heroTile}>
            <Image source={HERO_ART[product.key]} style={styles.heroArt} resizeMode="contain" />
          </View>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {t(product.title)}
          </Text>
        </View>
      </View>

      {/* ------------------------------------------------------------------ body */}
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.intro}>{t(product.intro)}</Text>

          <View style={styles.perks}>
            {product.perks.map((perk) => (
              // Keyed on the Arabic half, not the rendered one: a key that changes with the
              // language would remount every card on a switch.
              <View key={perk[0]} style={styles.perkCard}>
                <LinearGradient
                  colors={['#FFFFFF', '#FDFDFE']}
                  style={StyleSheet.absoluteFill}
                />
                <View style={[styles.perkTile, { backgroundColor: pc.tint }]}>
                  <Icon name="checkCircle" size={18} color={pc.primary} />
                </View>
                <Text style={styles.perkText}>{t(perk)}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* ---------------------------------------------------------------- foot */}
        <View style={[styles.foot, { paddingBottom: Math.max(insets.bottom, 12) + 13 }]}>
          <LinearGradient
            colors={['rgba(245,247,250,0)', 'rgba(245,247,250,0.85)']}
            style={styles.footFade}
            pointerEvents="none"
          />

          <Pressable
            onPress={onCalc}
            style={({ pressed }) => [styles.primaryWrap, pressed && styles.pressed]}
          >
            <LinearGradient
              colors={['#006957', '#054A3D']}
              useAngle
              angle={150}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={styles.primaryFill}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']}
                locations={[0, 0.55]}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <View style={styles.primaryHighlight} pointerEvents="none" />
              <View style={styles.primaryContent}>
                <Text style={styles.primaryLabel}>{t(S.product.cta.calc)}</Text>
                <View style={styles.primaryIcon}>
                  {/* Forward arrow: points left, which is forward in Arabic. `directional`
                      mirrors it to point right under English. */}
                  <Icon
                    name="arrowLeft"
                    width={13.25}
                    height={11.5833}
                    color={colors.white}
                    directional
                  />
                </View>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={onWhatsApp}
            style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
          >
            <Icon name="whatsapp" size={20} />
            <Text style={styles.secondaryLabel}>{t(S.product.cta.contact)}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* --------------------------------------------------------------------- pieces */

/**
 * 42×42 translucent control used for the hero's back / share buttons. Icon-only, so `label`
 * is what a screen reader announces — it is already written in the current language.
 */
function GlassButton({
  children,
  onPress,
  label,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  label?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.glassBtn, pressed && styles.glassBtnPressed]}
    >
      {children}
    </Pressable>
  );
}

/**
 * `react-native-linear-gradient` is linear-only, so the hero's two radial glows are drawn
 * as SVG circles with a RadialGradient fill.
 */
function Glow({
  id,
  size,
  opacity,
  fade,
  style,
}: {
  id: string;
  size: number;
  opacity: number;
  fade: number;
  style: object;
}) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} style={style} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={opacity} />
          <Stop offset={String(fade)} stopColor="#FFFFFF" stopOpacity={0} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={r} cy={r} r={r} fill={`url(#${id})`} />
    </Svg>
  );
}

/* --------------------------------------------------------------------- styles */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  hero: { overflow: 'hidden' },
  glowA: { position: 'absolute', left: -90 },
  glowB: { position: 'absolute', left: 240 },
  watermark: {
    position: 'absolute',
    left: 294,
    width: 130,
    height: 130,
    opacity: 0.07,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    height: 42,
  },
  glassBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassBtnPressed: { backgroundColor: 'rgba(255,255,255,0.28)' },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 22,
    marginTop: 20,
    minHeight: 58,
  },
  heroTile: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroArt: { width: 42, height: 41 },
  heroTitle: {
    ...typography.productTitle,
    color: colors.white,
    textAlign: 'auto',
    flex: 1,
  },

  body: {
    flex: 1,
    marginTop: -BODY_OVERLAP,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: -16 },
    shadowOpacity: 0.18,
    shadowRadius: 17,
  },
  bodyContent: {
    paddingHorizontal: 22,
    paddingTop: 23.75,
    paddingBottom: 28,
  },
  intro: {
    ...typography.productIntro,
    color: colors.g7,
    textAlign: 'auto',
    marginBottom: 18.25,
  },

  perks: { gap: 12 },
  perkCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    // Logical: the comp's 16 sits on the reading edge (physical right under RTL), where
    // the perk's tick mark goes, and the 14 opposite it. Mirrors under LTR.
    paddingStart: 16,
    paddingEnd: 14,
    paddingTop: 12.6,
    paddingBottom: 15.4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.br2,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2,
  },
  perkTile: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.4,
  },
  perkText: {
    ...typography.perkText,
    color: colors.g7,
    textAlign: 'auto',
    flex: 1,
  },

  foot: {
    backgroundColor: 'rgba(245,247,250,0.92)',
    borderTopWidth: 1,
    borderTopColor: colors.br2,
    paddingHorizontal: 22,
    paddingTop: 14,
  },
  footFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -22,
    height: 22,
  },

  primaryWrap: {
    height: 56,
    borderRadius: 17,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.42,
    shadowRadius: 13,
    elevation: 6,
  },
  primaryFill: {
    flex: 1,
    borderRadius: 17,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  primaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  primaryLabel: {
    ...typography.buttonLabel,
    color: colors.white,
  },
  primaryIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondary: {
    height: 52,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryLabel: {
    ...typography.btnLabelSm,
    color: colors.green,
  },

  pressed: { opacity: 0.9 },
});
