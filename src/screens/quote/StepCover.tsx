import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../theme';
import {
  CARDS_MAX,
  COVER_MAX,
  COVER_MIN,
  COVER_STEP,
  money,
  OPTIONALS,
  OptionalKey,
} from '../../data/products';
import { S, useI18n } from '../../i18n';
import { CoverSlider } from './CoverSlider';
import { CarePlusCard, OptionCard } from './parts';
import { useFooterInset } from './QuoteChrome';

type Props = {
  cover: number;
  onCover: (n: number) => void;
  optionals: OptionalKey[];
  onToggle: (key: OptionalKey) => void;
  cards: number;
  onCards: (n: number) => void;
};

/** Figma 2065:2867 — "التغطية". */
export function StepCover({ cover, onCover, optionals, onToggle, cards, onCards }: Props) {
  const { t } = useI18n();
  const bottom = useFooterInset();
  const egp = t(S.common.currency);

  return (
    <ScrollView
      contentContainerStyle={[styles.body, { paddingBottom: bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.coverBlock}>
        <Text style={styles.heading}>{t(S.quote.cover.heading)}</Text>

        <View style={styles.sliderCard}>
          {/* RTL: amount first → physically right, "ج.م" second → physically left. */}
          <View style={styles.valueRow}>
            <Text style={styles.value}>{money(cover)}</Text>
            <Text style={styles.valueUnit}>{egp}</Text>
          </View>

          <CoverSlider
            value={cover}
            min={COVER_MIN}
            max={COVER_MAX}
            step={COVER_STEP}
            onChange={onCover}
          />

          {/*
            The minimum is rendered first, so it lands at the row's reading start — the same
            end of the track the slider's fill grows from in either direction.
          */}
          <View style={styles.bounds}>
            <Text style={styles.bound}>{`${money(COVER_MIN)} ${egp}`}</Text>
            <Text style={styles.bound}>{`${money(COVER_MAX)} ${egp}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rule} />

      <View style={styles.optHeader}>
        <Text style={styles.optTitle}>{t(S.quote.cover.optionalsTitle)}</Text>
        <Text style={styles.optSubtitle}>{t(S.quote.cover.optionalsSubtitle)}</Text>
      </View>

      <View style={styles.cards}>
        {OPTIONALS.map((o) =>
          o.perCard ? (
            <CarePlusCard
              key={o.key}
              label={t(o.label)}
              on={optionals.includes(o.key)}
              onToggle={() => onToggle(o.key)}
              cards={cards}
              onCards={onCards}
              maxCards={CARDS_MAX}
            />
          ) : (
            <OptionCard
              key={o.key}
              label={t(o.label)}
              on={optionals.includes(o.key)}
              onToggle={() => onToggle(o.key)}
            />
          ),
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, paddingTop: 12, gap: 18 },
  coverBlock: { gap: 8 },
  heading: { ...typography.quoteHeading, color: colors.qInk, textAlign: 'auto' },

  // Figma 2065:3013
  sliderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: 'rgba(26,26,26,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6 },
  value: { ...typography.sliderValue, color: colors.green },
  valueUnit: { ...typography.sliderUnit, color: colors.qAmount },
  bounds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 2,
  },
  bound: { ...typography.sliderBound, color: colors.qGreySl },

  rule: { height: 1, backgroundColor: colors.qRule },

  optHeader: { gap: 6 },
  // A step below the cover question but above the card labels beneath it, so it takes the
  // same treatment as that question, one size down.
  optTitle: {
    ...typography.optTitle,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: colors.g7,
    textAlign: 'auto',
  },
  optSubtitle: { ...typography.optSubtitle, color: colors.qGreyT, textAlign: 'auto' },

  cards: { gap: 12 },
});
