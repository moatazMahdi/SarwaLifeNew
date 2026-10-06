import React from 'react';
import { AppText, Box, Icon, Touchable } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './ConsentCheck.styles';

type Props = {
  agreed: boolean;
  onToggle: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
};

export function ConsentCheck({ agreed, onToggle, onTerms, onPrivacy }: Props) {
  const { t } = useI18n();
  return (
    <Touchable
      style={styles.consent}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: agreed }}
    >
      <Box style={[styles.box, agreed && styles.boxOn]}>
        {agreed ? <Icon name="check" size={14} color={colors.white} /> : null}
      </Box>
      <Box style={styles.text}>
        <AppText style={styles.line}>
          {t(S.kyc.review.consentPrefix)}{' '}
          <AppText style={styles.link} onPress={onTerms}>
            {t(S.kyc.review.terms)}
          </AppText>{' '}
          {t(S.kyc.review.consentAnd)}{' '}
          <AppText style={styles.link} onPress={onPrivacy}>
            {t(S.kyc.review.privacy)}
          </AppText>
        </AppText>
        <AppText style={styles.line}>{t(S.kyc.review.consentUse)}</AppText>
        <AppText style={styles.line}>{t(S.kyc.review.consentAuthority)}</AppText>
      </Box>
    </Touchable>
  );
}
