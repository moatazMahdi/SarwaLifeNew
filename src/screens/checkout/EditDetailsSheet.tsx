import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  I18nManager,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import type { Profile } from '../../state/FlowContext';
import { Phrase, S, useI18n } from '../../i18n';

/**
 * "تعديل البيانات" on the confirmation step.
 *
 * The pill used to walk the user back to the KYC review screen — four screens behind them,
 * in a flow they had already finished — to change a spelling. They would then have to walk
 * forward again past liveness and the stepper. Correcting one field is a small act and it
 * belongs in a small surface, over the screen that asked the question.
 *
 * The sheet edits a copy and only writes it back on save, so dismissing it — by the
 * backdrop, the back button or "إلغاء" — genuinely discards. Nothing is committed to the
 * flow until the user says so.
 *
 * The entry and exit curves came from the quote flow's option picker, which is gone now
 * that the date of birth is typed rather than picked. They stay as they are: this is the
 * app's one remaining bottom sheet, and the rest of its motion was tuned against them.
 */

/** The editable fields, in the order the card reads them. */
const FIELDS: { key: keyof Profile; label: Phrase; numeric?: boolean }[] = [
  { key: 'fullName', label: S.checkout.personal.fullName },
  { key: 'nationalId', label: S.checkout.personal.nationalId, numeric: true },
  { key: 'governorate', label: S.checkout.personal.governorate },
  { key: 'city', label: S.checkout.personal.city },
  { key: 'age', label: S.checkout.personal.age, numeric: true },
  { key: 'maritalStatus', label: S.checkout.personal.maritalStatus },
];

const SHEET_TRAVEL = 620;

export function EditDetailsSheet({
  visible,
  profile,
  onSave,
  onClose,
}: {
  visible: boolean;
  profile: Profile;
  onSave: (next: Profile) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;

  // The modal has to outlive `visible` by one animation, or closing tears the sheet off
  // the screen instead of sliding it down.
  const [mounted, setMounted] = useState(visible);
  const opening = useRef(false);

  const [draft, setDraft] = useState<Profile>(profile);

  // Reseeded on every open, so a cancelled edit is not still sitting in the fields the
  // next time the sheet comes up.
  useEffect(() => {
    if (visible) setDraft(profile);
  }, [visible, profile]);

  const animateIn = useCallback(() => {
    if (!opening.current) return;
    opening.current = false;
    Animated.timing(anim, {
      toValue: 1,
      duration: 320,
      easing: Easing.bezier(0.05, 0.7, 0.1, 1),
      useNativeDriver: true,
    }).start();
  }, [anim]);

  useEffect(() => {
    if (visible) {
      anim.setValue(0);
      opening.current = true;
      setMounted(true);
      // Fallback for a reopen that lands mid-exit: the Modal never unmounted, so `onShow`
      // will not fire a second time.
      const timer = setTimeout(animateIn, 120);
      return () => clearTimeout(timer);
    }
    opening.current = false;
    Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      easing: Easing.bezier(0.3, 0, 0.8, 0.15),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setMounted(false);
    });
  }, [visible, anim, animateIn]);

  function save() {
    // Trimmed on the way out: a trailing space in a name is invisible on the card and
    // would travel all the way to the policy document.
    const cleaned = Object.fromEntries(
      Object.entries(draft).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]),
    ) as Profile;
    onSave(cleaned);
    onClose();
  }

  if (!mounted) return null;

  return (
    <Modal
      visible
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType="none"
      onShow={animateIn}
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.scrim, { opacity: anim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <KeyboardAvoidingView
        style={styles.anchor}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [
                {
                  translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [SHEET_TRAVEL, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.grabber} />
          <Text style={styles.title}>{t(S.checkout.personal.editTitle)}</Text>
          <Text style={styles.subtitle}>{t(S.checkout.personal.editSubtitle)}</Text>

          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {FIELDS.map((f) => (
              <View key={f.key} style={styles.field}>
                <Text style={styles.fieldLabel}>{t(f.label)}</Text>
                <TextInput
                  value={String(draft[f.key] ?? '')}
                  onChangeText={(v) => setDraft((d) => ({ ...d, [f.key]: v }))}
                  keyboardType={f.numeric ? 'number-pad' : 'default'}
                  placeholderTextColor={colors.qGrey}
                  style={styles.input}
                  // The `textAlign` *prop* is not RTL-swapped the way the style is, so it
                  // has to be chosen here: the caret belongs at the reading edge, which is
                  // the physical right in Arabic and the physical left in English.
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.actions}>
            <PrimaryButton label={t(S.common.save)} onPress={save} />
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              style={({ pressed }) => [styles.cancel, pressed && styles.pressed]}
            >
              <Text style={styles.cancelLabel}>{t(S.common.cancel)}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,20,18,0.42)',
  },
  anchor: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: '88%',
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.br,
  },

  title: { ...typography.authTitle, fontSize: 20, color: colors.ink, textAlign: 'auto', marginTop: 16 },
  subtitle: {
    ...typography.helperText,
    fontSize: 13,
    lineHeight: 19,
    color: colors.g5,
    textAlign: 'auto',
    marginTop: 4,
  },

  list: { flexGrow: 0, marginTop: 14 },
  listContent: { paddingBottom: 8, gap: 14 },

  field: { gap: 6 },
  fieldLabel: { ...typography.helperText, fontSize: 13, lineHeight: 17, color: '#8A8FA3', textAlign: 'auto' },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    ...typography.inputValue,
    color: colors.qInk,
  },

  actions: { paddingTop: 14, gap: 8 },
  cancel: { height: 46, alignItems: 'center', justifyContent: 'center' },
  cancelLabel: { ...typography.btnLabelMd, color: colors.g5 },
  pressed: { opacity: 0.7 },
});
