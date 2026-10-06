import React from 'react';
import { Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { Side } from '../../constants';
import { IdSlot } from '../IdSlot/IdSlot';
import { KycHeading } from '../KycHeading/KycHeading';
import { styles } from './CaptureContent.styles';

type Props = { front?: string; back?: string; onCapture: (side: Side) => void };

export function CaptureContent({ front, back, onCapture }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.body}>
      <KycHeading title={t(S.kyc.title)} subtitle={t(S.kyc.capture.subtitle)} />
      <Box style={styles.slots}>
        <IdSlot label={t(S.kyc.capture.front)} uri={front} onPress={() => onCapture('front')} />
        <IdSlot label={t(S.kyc.capture.back)} uri={back} onPress={() => onCapture('back')} />
      </Box>
    </Box>
  );
}
