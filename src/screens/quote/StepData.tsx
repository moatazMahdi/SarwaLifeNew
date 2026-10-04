import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, typography } from '../../theme';
import { FieldError } from '../../components/FieldError';
import { Icon } from '../../components/Icon';
import { NATIONALITIES } from '../../data/products';
import { S, useI18n } from '../../i18n';
import { useFooterInset } from './QuoteChrome';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type DobParts = { day: number | null; month: number | null; year: number | null };

export const EMPTY_DOB: DobParts = { day: null, month: null, year: null };

const pad = (n: number) => String(n).padStart(2, '0');

/** "DD/MM/YYYY" once all three fields are set — the shape `ageFromDob` expects. */
export function dobToString(d: DobParts): string {
  if (!d.day || !d.month || !d.year) return '';
  return `${pad(d.day)}/${pad(d.month)}/${d.year}`;
}

function daysInMonth(month: number | null, year: number | null) {
  if (!month) return 31;
  return new Date(year ?? 2000, month, 0).getDate();
}

/* ───────────────────────── date of birth ───────────────────────── */

/**
 * The date is typed, not picked.
 *
 * It used to be three dropdowns and a 58-row year sheet, which is four taps and a long
 * scroll to say something every user can type in six keystrokes. A birth date is the one
 * date a person never has to look up, so the wheel was buying nothing and costing the
 * longest interaction in the flow.
 *
 * The digits are the only thing the field actually stores; the slashes are painted on as
 * they are reached, so backspacing never has to step over a separator the user did not
 * type. Eight digits is the whole date, which is why nothing here needs a confirm.
 */

/**
 * An Arabic keyboard can send ٠-٩, and a Persian one ۰-۹. Both are typed into this field by
 * people who think of them as the same digits, so both are accepted and stored as Western —
 * everything downstream (`ageFromDob`, the `Date` constructor) parses only those.
 */
const EASTERN_DIGITS = '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹';

function toWesternDigits(s: string): string {
  return s.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (d) =>
    String(EASTERN_DIGITS.indexOf(d) % 10),
  );
}

/** Everything the field keeps: up to eight digits, DDMMYYYY. */
function digitsOf(text: string): string {
  return toWesternDigits(text).replace(/\D/g, '').slice(0, 8);
}

/** Paints the separators back in, as far as the digits have got. */
function withSlashes(d: string): string {
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/** Each part only once it is wholly typed, so a half-entered month is not read as a month. */
function partsOf(d: string): DobParts {
  return {
    day: d.length >= 2 ? Number(d.slice(0, 2)) || null : null,
    month: d.length >= 4 ? Number(d.slice(2, 4)) || null : null,
    year: d.length === 8 ? Number(d.slice(4)) || null : null,
  };
}

/** A date that exists — 31/02 and month 13 are caught here, not by the age check. */
function isRealDate({ day, month, year }: DobParts): boolean {
  if (!day || !month || !year) return false;
  if (month > 12 || day > daysInMonth(month, year)) return false;
  const thisYear = new Date().getFullYear();
  return year > thisYear - 110 && year <= thisYear;
}

type Props = {
  dob: DobParts;
  onDob: (next: DobParts) => void;
  age: number;
  nationality: string;
  onNationality: (n: string) => void;
  smoker: boolean | null;
  onSmoker: (v: boolean) => void;
};

/** Figma 2065:2460 — "بياناتك". */
export function StepData({
  dob,
  onDob,
  age,
  nationality,
  onNationality,
  smoker,
  onSmoker,
}: Props) {
  const { t, n } = useI18n();
  const bottom = useFooterInset();

  // The digits are seeded from whatever the flow already holds, so stepping back to this
  // screen returns the date the user typed rather than an empty field.
  const [digits, setDigits] = useState(() => dobToString(dob).replace(/\D/g, ''));

  function onType(text: string) {
    const next = digitsOf(text);
    setDigits(next);
    // Pushed up on every keystroke, not on blur: the age pill below reads from the flow,
    // and it should fill in the moment the last digit lands.
    onDob(partsOf(next));
  }

  const dobError = useMemo(() => {
    if (digits.length < 8) return null;
    if (!isRealDate(partsOf(digits))) return t(S.quote.data.dobInvalid);
    return age >= 18 && age <= 65 ? null : t(S.quote.data.dobAge);
  }, [digits, age, t]);

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.body, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* تاريخ الميلاد */}
        <View style={styles.block}>
          <Text style={styles.label}>{t(S.quote.data.dob)}</Text>
          <View style={[styles.field, !!dobError && styles.fieldBad]}>
            {/* The glyph is written last so it lands at the field's far end — physical left
                in Arabic — leaving the reading edge to the caret. */}
            <TextInput
              value={withSlashes(digits)}
              onChangeText={onType}
              placeholder={t(S.quote.data.dobHint)}
              placeholderTextColor={colors.qGrey}
              keyboardType="number-pad"
              // 10 = eight digits plus the two slashes this field paints in itself.
              maxLength={10}
              accessibilityLabel={t(S.quote.data.dob)}
              style={styles.fieldInput}
              // The `textAlign` *prop* is not RTL-swapped the way the style is, so the side
              // has to be chosen here: the caret belongs at the reading edge. The date
              // itself stays in Western digits in both languages — it is a grouped number
              // being typed on a number pad, like the phone field, not a count being read.
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <Icon name="calendar" size={20} color={colors.qGrey} />
          </View>
          <FieldError message={dobError} />
        </View>

        {/* العمر */}
        <View style={styles.agePill}>
          <Text style={styles.ageCaption}>{t(S.quote.data.age)}</Text>
          <Text style={styles.ageNumber}>{age > 0 ? n(age) : '—'}</Text>
        </View>

        {/* الجنسية — خيارَان جنب بعض، نفس نمط سؤال التدخين */}
        <View style={styles.block}>
          <Text style={styles.label}>{t(S.quote.data.nationality)}</Text>
          {/*
            RTL: مصري first → physically right, غير مصري second → physically left.
            The Arabic half is the stored answer, so the chips are keyed, compared and
            selected on `nat[0]` — switching language relabels them without clearing the
            choice, and the key does not move with the language.
          */}
          <View style={styles.row8}>
            {NATIONALITIES.map((nat) => (
              <Choice
                key={nat[0]}
                label={t(nat)}
                on={nationality === nat[0]}
                onPress={() => onNationality(nat[0])}
                fontSize={15}
              />
            ))}
          </View>
        </View>

        {/* هل أنت مدخّن؟ */}
        <View style={styles.block}>
          <Text style={styles.label}>{t(S.quote.data.smoker)}</Text>
          {/* RTL: نعم first → physically right, لا second → physically left. */}
          <View style={styles.row8}>
            <Choice
              label={t(S.quote.data.yes)}
              on={smoker === true}
              onPress={() => onSmoker(true)}
            />
            <Choice label={t(S.quote.data.no)} on={smoker === false} onPress={() => onSmoker(false)} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function Choice({
  label,
  on,
  onPress,
  fontSize,
}: {
  label: string;
  on: boolean;
  onPress: () => void;
  /** Overrides the 16px default for the longer labels (الجنسية). */
  fontSize?: number;
}) {
  const press = useRef(new Animated.Value(0)).current;
  const grow = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(grow, {
      toValue: on ? 1 : 0,
      friction: 9,
      tension: 160,
      useNativeDriver: true,
    }).start();
  }, [on, grow]);

  const spring = (to: number) =>
    Animated.spring(press, { toValue: to, friction: 9, tension: 220, useNativeDriver: true }).start();

  // A hair of lift on selection, on top of the press-in compression.
  const scale = Animated.add(
    press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] }),
    grow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.015], extrapolate: 'clamp' }),
  );

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => spring(1)}
      onPressOut={() => spring(0)}
      accessibilityRole="radio"
      accessibilityState={{ selected: on }}
      style={[styles.choice, on ? styles.choiceOn : styles.choiceOff, { transform: [{ scale }] }]}
    >
      {/*
        Deliberately no `numberOfLines`: on Android an RTL <Text> inside a flex row
        mis-measures under `numberOfLines={1}` and ellipsises labels that fit easily
        ("نعم" came out as "ن…"). The labels are sized to fit instead — the longest,
        "غير مصري" / "Non-Egyptian", is ~90px at 15 inside a ~118px box.
      */}
      {on ? (
        <>
          {/* RTL: the tick is rendered first so it sits physically right of the label. */}
          <Icon name="checkCircle" size={20} color={colors.green} />
          <Text style={[styles.choiceTextOn, !!fontSize && { fontSize }]}>{label}</Text>
        </>
      ) : (
        <Text style={[styles.choiceTextOff, !!fontSize && { fontSize }]}>{label}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, paddingTop: 12, gap: 24 },
  block: { gap: 8 },
  row8: { flexDirection: 'row', gap: 8 },
  pressed: { opacity: 0.75 },

  label: { ...typography.inputLabel, color: colors.qInk, textAlign: 'auto' },

  field: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldBad: { borderColor: colors.bad },
  fieldInput: {
    ...typography.inputValue,
    flex: 1,
    color: colors.qInk,
    // Android gives a bare TextInput its own vertical padding on top of the 56px box,
    // which pushes the baseline below the icon beside it.
    paddingVertical: 0,
  },

  // Figma: bg rgba(0,105,87,0.1), r15, pl16 / pr21 / pv12, row gap 8, centred.
  // The comp's pl/pr are written logically: under RTL `start` is the physical right, so
  // these are the same 16/21 the comp draws, and they mirror rather than stick under LTR.
  agePill: {
    backgroundColor: 'rgba(0,105,87,0.1)',
    borderRadius: 15,
    paddingEnd: 16,
    paddingStart: 21,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ageCaption: { ...typography.ageCaption, color: colors.qGreenInk },
  ageNumber: { ...typography.ageNumber, color: colors.qGreenInk },

  choice: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    // 8 rather than Figma's 12: "غير مصري" is the longest label and needs the room to
    // stay on one line next to the 20px tick.
    gap: 8,
  },
  choiceOff: {
    borderWidth: 1,
    borderColor: colors.qBorder,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  choiceOn: {
    borderWidth: 2,
    borderColor: colors.green,
    paddingHorizontal: 11, // 12 − the extra 1px of border, so the text stays put
  },
  // `flexShrink` rather than `flex: 1` — the label hugs the tick (Figma 2065:2460 puts
  // the pair at the row's start) instead of being stretched across the whole cell.
  choiceTextOn: {
    ...typography.choiceOn,
    color: colors.green,
    textAlign: 'auto',
    flexShrink: 1,
  },
  choiceTextOff: { ...typography.choiceOff, color: colors.qInk, textAlign: 'center' },
});
