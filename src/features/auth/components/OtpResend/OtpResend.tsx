import React from 'react';
import { AppText, Row, Touchable } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './OtpResend.styles';

type Props = { canResend: boolean; countdown: string; onResend: () => void };

export function OtpResend({ canResend, countdown, onResend }: Props) {
  const { t } = useI18n();
  return (
    <Row style={styles.row}>
      <AppText style={styles.muted}>{t(S.auth.otp.noCode)}</AppText>
      {canResend ? (
        <Touchable onPress={onResend} hitSlop={8}>
          <AppText style={[styles.resend, styles.link]}>{` ${t(S.auth.otp.resend)}`}</AppText>
        </Touchable>
      ) : (
        <AppText style={styles.resend}>{` ${t(S.auth.otp.resendIn)} ${countdown}`}</AppText>
      )}
    </Row>
  );
}
