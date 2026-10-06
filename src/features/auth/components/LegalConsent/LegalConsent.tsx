import React from 'react';
import { AppText } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './LegalConsent.styles';

type Props = { onTerms: () => void; onPrivacy: () => void };

export function LegalConsent({ onTerms, onPrivacy }: Props) {
  const { t } = useI18n();
  return (
    <AppText style={styles.legal}>
      {t(S.auth.signupPhone.legalPrefix)}{' '}
      <AppText style={styles.link} onPress={onTerms}>
        {t(S.auth.signupPhone.terms)}
      </AppText>{' '}
      {t(S.auth.signupPhone.legalAnd)}{' '}
      <AppText style={styles.link} onPress={onPrivacy}>
        {t(S.auth.signupPhone.privacy)}
      </AppText>
    </AppText>
  );
}
