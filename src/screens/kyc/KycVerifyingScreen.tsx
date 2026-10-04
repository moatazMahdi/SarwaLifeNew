import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme';
import { BrandLoader } from '../../components/BrandLoader';
import { useFlow } from '../../state/FlowContext';
import { shouldFailKyc } from './demoOutcome';
import { S, useI18n } from '../../i18n';

/**
 * The liveness wait, between the selfie and the finished account. Same `BrandLoader` as the
 * card-reading step; three beats at 2s plus the loader's own tail lands at ~6.5s, the pause
 * the flow calls for.
 */
export function KycVerifyingScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = route?.params ?? {};
  const { login, recordKycAttempt } = useFlow();

  return (
    <View style={styles.screen}>
      <BrandLoader
        headline={t(S.kyc.verifying.headline)}
        subtitle={t(S.kyc.verifying.subtitle)}
        steps={S.kyc.verifying.steps.map(t)}
        stepMs={2000}
        onDone={() => {
          // Same stand-in verdict as the card reader, counted against its own stage so the
          // demo number can be refused once here too — see `demoOutcome`.
          if (shouldFailKyc(params.phone, recordKycAttempt('liveness'))) {
            navigation?.replace('KycFailed', { ...params, stage: 'liveness' });
            return;
          }
          login(params.phone ?? '');
          navigation?.replace('SignupDone', params);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.green },
});
