import { useCallback } from 'react';
import { Alert, Share } from 'react-native';
import { useBackGuard } from '../../../shared/hooks/useBackGuard';
import { S, useI18n } from '../../../shared/i18n';
import { LRM } from '../../../shared/utils/phone';
import { useCheckoutProduct } from './useCheckoutProduct';

export function usePolicyIssued({ navigation, route }: any) {
  const { t } = useI18n();
  const { flow, product } = useCheckoutProduct(route);
  const policyNumber = flow.policyNumber ? LRM + flow.policyNumber : '—';

  const goHome = useCallback(() => {
    flow.reset();
    navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }, [flow, navigation]);

  useBackGuard(goHome);

  return {
    product,
    policyNumber,
    cover: flow.quote.cover ?? 0,
    yearly: flow.result?.yearly ?? 0,
    goHome,
    share: () => {
      Share.share({ message: `${t(S.checkout.issued.shareBody)} ${policyNumber}` }).catch(() => {});
    },
    download: () =>
      Alert.alert(t(S.checkout.issued.downloadTitle), t(S.checkout.issued.downloadBody)),
  };
}
