import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, productColors, typography } from '../theme';
import { ContactFab } from '../components/ContactFab';
import { Icon } from '../components/Icon';
import { LangToggle } from '../components/LangToggle';
import { PRODUCT_ART } from '../data/productArt';
import { Phrase, S, useI18n } from '../i18n';

/**
 * Figma: الرئسية الجديدة (node 1:273). The product icons are raster artwork in the
 * comp (a single sprite sheet cropped per card), not vectors — they're sliced out to
 * src/assets/products and rendered as images, so they match the design exactly.
 *
 * The artwork map lives in `data/productArt` because the issuance chip draws the same five
 * badges; sharing it is what stops that screen and this one ending up on different marks.
 */

const PRODUCTS: {
  key: keyof typeof productColors;
  art: ImageSourcePropType;
  title: Phrase;
  desc: Phrase;
}[] = [
  { key: 'death', art: PRODUCT_ART.death, ...S.products.death },
  { key: 'sav', art: PRODUCT_ART.sav, ...S.products.sav },
  { key: 'crit', art: PRODUCT_ART.crit, ...S.products.crit },
  { key: 'fcan', art: PRODUCT_ART.fcan, ...S.products.fcan },
  { key: 'mcan', art: PRODUCT_ART.mcan, ...S.products.mcan },
];

export function HomeScreen({ navigation }: any) {
  const { t } = useI18n();

  return (
    <View style={styles.screen}>
      {/* Header card — white sheet with rounded bottom corners */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          {/* Two children on a plain row, pushed apart: the logo takes the reading edge —
              physical right in Arabic, physical left in English — and the switcher takes the
              far one. Nothing is pinned to a side, so the header mirrors itself when the
              language changes. The menu button that used to sit here is gone: it opened the
              login gate, which the product cards already reach, so it was a second door onto
              a room the page is already standing in. */}
          <View style={styles.pageHeader}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            {/* The two page-level controls travel together on the far edge. The FAQ glyph is
                written first so it sits inboard of the switcher rather than on the very
                corner: the switcher is the one control a user may be hunting for without
                being able to read the screen, so it keeps the edge position it has had on
                every screen since the splash. */}
            <View style={styles.headerTools}>
              <Pressable
                onPress={() => navigation?.navigate('Faq')}
                accessibilityRole="button"
                accessibilityLabel={t(S.faq.title)}
                hitSlop={8}
                style={({ pressed }) => [styles.toolBtn, pressed && styles.toolPressed]}
              >
                <Icon name="faq" size={18} color={colors.ink} />
              </Pressable>
              <LangToggle />
            </View>
          </View>

          <View style={styles.greetingWrap}>
            <Text style={styles.greeting}>{t(S.home.greeting)}</Text>
            <Text style={styles.tagline}>{t(S.home.tagline)}</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t(S.home.sectionTitle)}</Text>

        <View style={styles.cards}>
          {PRODUCTS.map((p) => (
            <Pressable
              key={p.key}
              style={styles.card}
              onPress={() => navigation?.navigate('ProductDetails', { product: p.key })}
            >
              <View style={styles.iconTile}>
                <Image source={p.art} style={styles.iconArt} resizeMode="contain" />
              </View>
              <View style={styles.cardInner}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{t(p.title)}</Text>
                  <Text style={styles.cardDesc}>{t(p.desc)}</Text>
                </View>
                <View style={styles.chevronBox}>
                  <Icon name="chevronLeft" width={6.6} height={11.6} directional />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Outside the ScrollView so it stays put while the list moves under it. Insurance is
          bought from people at least as often as from screens, so the way to reach one is
          always on the glass rather than buried a tap deep. */}
      <ContactFab />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    backgroundColor: colors.white,
    paddingBottom: 16,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 2,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 54,
    height: 54,
  },
  headerTools: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // Deliberately the switcher's twin — same 40px height, same 1px #F0F0F0 hairline, same
  // white fill — so the pair reads as one control group rather than as a button that
  // wandered in. Square-ish rather than a pill because it carries a glyph and no label.
  toolBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolPressed: { opacity: 0.7 },
  greetingWrap: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  greeting: {
    ...typography.homeGreeting,
    color: '#6A6C6A',
    textAlign: 'auto',
  },
  tagline: {
    ...typography.homeTagline,
    color: colors.green,
    textAlign: 'auto',
    marginTop: 6,
  },

  body: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    // The floating contact button covers the tail of the list, so the last card is given
    // somewhere to scroll to rather than being left permanently half-hidden under it.
    paddingBottom: 96,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.ink,
    textAlign: 'auto',
    marginBottom: 13,
  },
  cards: {
    gap: 11,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Figma draws the artwork 43dp tall inside the 56dp tile.
  iconArt: {
    width: 37,
    height: 43,
  },
  cardInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  // The five product names are the only thing on this page a user is really choosing
  // between, so they carry the most weight the family has (Bold — Plex Arabic ships no
  // heavier cut) and are set a point and a half above the shared card token, tracked in
  // to keep the line compact at the new size.
  cardTitle: {
    ...typography.cardTitle,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.3,
    color: colors.ink,
    textAlign: 'auto',
  },
  cardDesc: {
    ...typography.cardBody,
    fontSize: 10,
    lineHeight: 17.25,
    color: colors.g5,
    textAlign: 'auto',
  },
  chevronBox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
