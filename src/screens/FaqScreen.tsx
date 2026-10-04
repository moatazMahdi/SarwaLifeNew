import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, radius, shadows, typography } from '../theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { Icon } from '../components/Icon';
import { SUPPORT_WHATSAPP } from '../data/products';
import { useFlow } from '../state/FlowContext';
import { Phrase, S, useI18n } from '../i18n';

/**
 * Figma 2071:7047 — «الأسئلة الشائعة».
 *
 * Reached from the glyph beside the language switcher on home. It sits next to that one on
 * purpose: both are things you want *before* you commit to anything, and neither belongs
 * inside the buying flow where it would read as a hesitation the screen is inviting.
 *
 * The comp draws all six cards shut, so it specifies the questions and none of the answers.
 * Those are written in `i18n/ns/faq.ts` out of the app's own terms, with the source named on
 * each one — see the header comment there for why they were not simply composed.
 */
export function FaqScreen({ navigation }: any) {
  const { t } = useI18n();
  const { isLoggedIn } = useFlow();
  // The screen has no footer to hold the last card clear of the gesture bar, so the scroll
  // content carries the inset itself — otherwise "اطلب مستشاراً يتصل بك" ends its scroll
  // sitting under the system handle on a gesture-navigation phone.
  const insets = useSafeAreaInsets();

  // One index, not a set: opening a second question closes the first. With six cards on a
  // 732px body, letting them all stand open turns the screen into a wall of prose and costs
  // the user the overview that made the list worth having.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={t(S.faq.title)}
        onBack={() => navigation?.goBack()}
        // The comp wires this chip to the signup gate, which makes it a prompt rather than a
        // decoration — so it is only worth drawing while it is true.
        trailing={isLoggedIn ? undefined : <GuestBadge onPress={() => navigation?.navigate('LoginGate')} />}
      />

      <ScrollView
        contentContainerStyle={[styles.body, { paddingBottom: 28 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* RTL: the glyph is written last so it lands on the far edge from the reading
            start, where the comp draws it. */}
        <View style={styles.intro}>
          <Text style={styles.introText}>{t(S.faq.intro)}</Text>
          <Icon name="infoCircle" size={24} color={colors.green} />
        </View>

        <View style={styles.list}>
          {S.faq.items.map((item, i) => (
            // Keyed on the Arabic question, so switching language does not remount the list
            // and drop whichever card the user had open.
            <FaqRow
              key={item.q[0]}
              question={item.q}
              answer={item.a}
              open={open === i}
              onToggle={() => setOpen((cur) => (cur === i ? null : i))}
            />
          ))}
        </View>

        <View style={styles.tail}>
          <Text style={styles.tailTitle}>{t(S.faq.noAnswer)}</Text>
          {/* The comp points this at a "request a product" screen that does not exist in
              this build. Rather than leave a button that goes nowhere, it opens the same
              WhatsApp thread the contact button on home and the KYC failure screen already
              use — so the glyph is the WhatsApp mark and not the comp's headset, because a
              button should say where it is about to send you. */}
          <Pressable
            onPress={() => Linking.openURL(`https://wa.me/${SUPPORT_WHATSAPP}`).catch(() => {})}
            accessibilityRole="button"
            style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
          >
            <LinearGradient
              colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
              locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
              useAngle
              angle={145}
              style={styles.ctaFill}
            >
              <Text style={styles.ctaLabel}>{t(S.faq.callMe)}</Text>
              <Icon name="whatsapp" size={18} />
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

/* ------------------------------------------------------------------- one row */

function FaqRow({
  question,
  answer,
  open,
  onToggle,
}: {
  question: Phrase;
  answer: Phrase;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  const text = t(answer);

  /**
   * The answer's natural height, measured once off-layout.
   *
   * A height animation needs a number, and the only honest source for it is the text itself
   * — hard-coding one would clip the longest answer on a narrow screen and leave a gap under
   * the shortest. So the paragraph is laid out once at the real column width, absolutely
   * positioned and invisible so it costs the row nothing, and the copy is thrown away as
   * soon as it has reported back.
   *
   * `null` means "not measured yet", which is why the collapsed height is pinned to 0 rather
   * than left undefined: an unmeasured row must read as shut, not as momentarily open.
   */
  const [h, setH] = useState<number | null>(null);
  // Re-measured when the paragraph itself changes. The language switch restarts the app so
  // it cannot strand a stale number here, but the OS text-size slider does not.
  useEffect(() => setH(null), [text]);

  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      // A height cannot be driven natively, and this one is short enough that it does not
      // need to be. The chevron rides the same value rather than a second one, so the two
      // halves of the gesture cannot drift apart.
      useNativeDriver: false,
    }).start();
  }, [open, anim]);

  const height = anim.interpolate({ inputRange: [0, 1], outputRange: [0, h ?? 0] });
  const spin = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <LinearGradient
      colors={gradients.surface.colors as unknown as [string, string, ...string[]]}
      useAngle
      angle={180}
      style={styles.card}
    >
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={t(question)}
        accessibilityHint={t(open ? S.faq.a11yCollapse : S.faq.a11yExpand)}
        style={({ pressed }) => [styles.head, pressed && styles.pressed]}
      >
        {/* RTL: the question is written first so it takes the row's start, and the chevron
            trails it onto the far edge — exactly where the comp puts them. */}
        <Text style={styles.question}>{t(question)}</Text>
        <View style={styles.chevron}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Icon name="chevronDown" size={18} color={colors.g7} />
          </Animated.View>
        </View>
      </Pressable>

      <Animated.View style={[styles.answerClip, { height }]}>
        <View style={styles.answerPad}>
          <Text style={styles.answer}>{text}</Text>
        </View>
      </Animated.View>

      {h === null ? (
        <View style={styles.measure} pointerEvents="none" onLayout={(e) => setH(e.nativeEvent.layout.height)}>
          <View style={styles.answerPad}>
            <Text style={styles.answer}>{text}</Text>
          </View>
        </View>
      ) : null}
    </LinearGradient>
  );
}

/** The gold "زائر" chip — the comp's way of telling a browsing visitor they are not in yet. */
function GuestBadge({ onPress }: { onPress: () => void }) {
  const { t } = useI18n();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={8}
      style={({ pressed }) => [styles.badge, pressed && styles.pressed]}
    >
      <Text style={styles.badgeLabel}>{t(S.faq.guest)}</Text>
      <View style={styles.badgeDot} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },

  intro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.card,
    backgroundColor: '#EAF3F0',
    ...shadows.card,
  },
  introText: {
    ...typography.bodyText,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.green,
    textAlign: 'auto',
    flex: 1,
  },

  list: { marginTop: 16, gap: 10 },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.br2,
    overflow: 'hidden',
    ...shadows.card,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 62,
    paddingStart: 18,
    paddingEnd: 16,
    paddingVertical: 14,
  },
  question: {
    ...typography.cardTitle,
    fontSize: 14.5,
    lineHeight: 21.75,
    color: colors.ink,
    textAlign: 'auto',
    flex: 1,
  },
  chevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // `overflow: 'hidden'` is what makes the height animation a reveal rather than a squash.
  answerClip: { overflow: 'hidden' },
  answerPad: { paddingStart: 18, paddingEnd: 16, paddingBottom: 16 },
  answer: {
    ...typography.cardBody,
    fontSize: 13,
    lineHeight: 21,
    color: colors.g5,
    textAlign: 'auto',
  },
  // Out of flow and invisible: it exists only long enough to report its height.
  measure: { position: 'absolute', start: 0, end: 0, opacity: 0 },

  tail: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.br2,
    backgroundColor: colors.white,
    gap: 15,
  },
  tailTitle: {
    ...typography.cardTitle,
    fontSize: 14,
    lineHeight: 21,
    color: colors.ink,
    textAlign: 'center',
  },
  cta: {
    height: 52,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 13,
    elevation: 6,
  },
  // The glyph is written last so it lands on the physical left of the label, the side every
  // other footer button in the app puts its icon on.
  ctaFill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  ctaLabel: { ...typography.cardTitle, fontSize: 14, lineHeight: 21, color: colors.white },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAD9B0',
    backgroundColor: 'rgba(201,162,75,0.14)',
  },
  badgeLabel: { ...typography.badgeLabel, color: '#9B7F3E', textAlign: 'center' },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold },

  pressed: { opacity: 0.7 },
});
