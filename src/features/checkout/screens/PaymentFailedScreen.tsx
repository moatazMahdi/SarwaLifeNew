import React from 'react';
import { ActionFooter, Button, Icon, Screen } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { S, useI18n } from '../../../shared/i18n';
import { PaymentFailedBody } from '../components';
import { usePaymentFailed } from '../hooks/usePaymentFailed';

export function PaymentFailedScreen(props: any) {
  const { t } = useI18n();
  const { product, methodLabel, amount, retry, changeMethod } = usePaymentFailed(props);

  return (
    <Screen background={colors.bg}>
      <PaymentFailedBody product={product} methodLabel={methodLabel} amount={amount} />
      <ActionFooter>
        <Button
          label={t(S.checkout.failed.retry)}
          onPress={retry}
          endIcon={<Icon name="retry" size={21} color={colors.white} />}
        />
        <Button variant="plain" label={t(S.checkout.failed.changeMethod)} onPress={changeMethod} />
      </ActionFooter>
    </Screen>
  );
}
