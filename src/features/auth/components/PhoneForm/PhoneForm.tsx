import React from 'react';
import { Box, Button, PhoneField } from '../../../../shared/components';
import { usePhoneEntry } from '../../../../shared/hooks/usePhoneEntry';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './PhoneForm.styles';

type Props = {
  phone: ReturnType<typeof usePhoneEntry>;
  canContinue: boolean;
  onContinue: () => void;
  children?: React.ReactNode;
};

export function PhoneForm({ phone, canContinue, onContinue, children }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.section}>
      <PhoneField
        value={phone.value}
        onChange={phone.onChange}
        onBlurField={phone.onBlurField}
        error={phone.error}
        onSubmit={onContinue}
      />
      <Button label={t(S.common.continue)} disabled={!canContinue} onPress={onContinue} />
      {children}
    </Box>
  );
}
