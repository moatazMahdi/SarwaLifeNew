import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { MedicalChoice } from '../MedicalChoice/MedicalChoice';
import { styles } from './MedicalQuestion.styles';

type Props = { text: Phrase; value: boolean | null; onAnswer: (v: boolean) => void };

export function MedicalQuestion({ text, value, onAnswer }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.question}>
      <AppText style={styles.text}>{t(text)}</AppText>
      <Row style={styles.choices}>
        <MedicalChoice label={S.checkout.medical.yes} on={value === true} onPress={() => onAnswer(true)} />
        <MedicalChoice label={S.checkout.medical.no} on={value === false} onPress={() => onAnswer(false)} />
      </Row>
    </Box>
  );
}
