import React from 'react';
import { AppText, Icon, Row, Touchable } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './PaymentConsent.styles';

type Props = {
  agreed: boolean;
  onToggle: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
};

export function PaymentConsent({ agreed, onToggle, onTerms, onPrivacy }: Props) {
  const { t } = useI18n();
  return (
    <Row style={styles.consent}>
      <Touchable
        onPress={onToggle}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agreed }}
        style={[styles.box, agreed && styles.boxOn]}
      >
        {agreed ? <Icon name="check" size={14} color={colors.white} /> : null}
      </Touchable>
      <AppText style={styles.text}>
        {t(S.checkout.payment.consentPre)}{' '}
        <AppText style={styles.link} onPress={onTerms}>
          {t(S.checkout.payment.terms)}
        </AppText>{' '}
        {t(S.checkout.payment.consentAnd)}{' '}
        <AppText style={styles.link} onPress={onPrivacy}>
          {t(S.checkout.payment.privacy)}
        </AppText>
        {'\n'}
        {t(S.checkout.payment.consentPost)}
      </AppText>
    </Row>
  );
}
