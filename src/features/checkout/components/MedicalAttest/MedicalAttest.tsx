import React from 'react';
import { AppText } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './MedicalAttest.styles';

export function MedicalAttest() {
  const { t } = useI18n();
  return <AppText style={styles.attest}>{t(S.checkout.medical.attest)}</AppText>;
}
