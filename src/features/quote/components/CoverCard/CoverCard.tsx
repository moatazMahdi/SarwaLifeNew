import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { COVER_MAX, COVER_MIN, COVER_STEP, money } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { CoverSlider } from '../CoverSlider/CoverSlider';
import { styles } from './CoverCard.styles';

type Props = { cover: number; onCover: (n: number) => void };

export function CoverCard({ cover, onCover }: Props) {
  const { t } = useI18n();
  const egp = t(S.common.currency);

  return (
    <Box style={styles.block}>
      <AppText style={styles.heading}>{t(S.quote.cover.heading)}</AppText>
      <Box style={styles.card}>
        <Row style={styles.valueRow}>
          <AppText style={styles.value}>{money(cover)}</AppText>
          <AppText style={styles.unit}>{egp}</AppText>
        </Row>
        <CoverSlider value={cover} min={COVER_MIN} max={COVER_MAX} step={COVER_STEP} onChange={onCover} />
        <Row style={styles.bounds}>
          <AppText style={styles.bound}>{`${money(COVER_MIN)} ${egp}`}</AppText>
          <AppText style={styles.bound}>{`${money(COVER_MAX)} ${egp}`}</AppText>
        </Row>
      </Box>
    </Box>
  );
}
