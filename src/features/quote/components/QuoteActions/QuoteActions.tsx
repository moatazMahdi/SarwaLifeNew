import React from 'react';
import { Box, Button, Icon, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './QuoteActions.styles';

type Props = {
  step: number;
  canContinue: boolean;
  onNext: () => void;
  onSave: () => void;
  onIssue: () => void;
};

export function QuoteActions({ step, canContinue, onNext, onSave, onIssue }: Props) {
  const { t } = useI18n();

  if (step === 3) {
    return (
      <Row style={styles.row}>
        <Button
          variant="secondary"
          label={t(S.quote.cta.save)}
          onPress={onSave}
          style={styles.save}
        />
        <Button
          variant="brand"
          label={t(S.quote.cta.issue)}
          onPress={onIssue}
          style={styles.issue}
        />
      </Row>
    );
  }

  return (
    <Box style={styles.one}>
      <Button
        label={step === 1 ? t(S.common.next) : t(S.quote.cta.calc)}
        disabled={step === 1 && !canContinue}
        onPress={onNext}
        endIcon={
          step === 1 ? (
            <Icon name="arrowLeft" width={13.25} height={11.58} color={colors.white} directional />
          ) : undefined
        }
      />
    </Box>
  );
}
