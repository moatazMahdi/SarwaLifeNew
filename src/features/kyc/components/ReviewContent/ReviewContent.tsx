import React from 'react';
import { Box, Scroll } from '../../../../shared/components';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { KycHeading } from '../KycHeading/KycHeading';
import { ReviewRow } from '../ReviewRow/ReviewRow';
import { styles } from './ReviewContent.styles';

type Props = { rows: [label: Phrase, value: string][] };

export function ReviewContent({ rows }: Props) {
  const { t } = useI18n();
  return (
    <Scroll contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <KycHeading title={t(S.kyc.review.title)} subtitle={t(S.kyc.review.subtitle)} />
      <Box style={styles.card}>
        {rows.map(([label, value], i) => (
          <ReviewRow key={label[0]} label={t(label)} value={value} first={i === 0} />
        ))}
      </Box>
    </Scroll>
  );
}
