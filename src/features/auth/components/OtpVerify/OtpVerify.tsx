import React from 'react';
import { Box, Button, FieldError } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { useOtpEntry } from '../../hooks/useOtpEntry';
import { OtpInput } from '../OtpInput/OtpInput';
import { OtpIntro } from '../OtpIntro/OtpIntro';
import { OtpResend } from '../OtpResend/OtpResend';
import { styles } from './OtpVerify.styles';

type Props = { otp: ReturnType<typeof useOtpEntry>; masked: string };

export function OtpVerify({ otp, masked }: Props) {
  const { t } = useI18n();
  return (
    <>
      <OtpIntro masked={masked} />
      <Box style={styles.section}>
        <Box style={styles.codeBlock}>
          <OtpInput
            value={otp.code}
            onChangeText={otp.onChangeText}
            busy={otp.verifying}
            error={Boolean(otp.error)}
          />
          <FieldError message={otp.error} />
        </Box>
        <OtpResend canResend={otp.canResend} countdown={otp.countdown} onResend={otp.onResend} />
        <Button
          label={t(S.common.confirm)}
          loading={otp.verifying}
          disabled={!otp.complete}
          onPress={otp.verify}
        />
      </Box>
    </>
  );
}
