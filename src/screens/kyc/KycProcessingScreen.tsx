import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { BrandLoader } from '../../components/BrandLoader';
import { DEMO_PROFILE, useFlow } from '../../state/FlowContext';
import { shouldFailKyc } from './demoOutcome';
import { S, useI18n } from '../../i18n';

/**
 * The wait after both sides of the ID have been shot, while the card is "read". Shares
 * `BrandLoader` with the quote's "بنحسب قسطك" screen so every pause in the app wears the
 * same face; only the checklist is about the card rather than the premium.
 *
 * The loader itself stays dumb — it takes finished strings — so the copy is written out
 * here and the quote flow's own use of it is untouched.
 */
export function KycProcessingScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = route?.params ?? {};
  const { setProfile, recordKycAttempt } = useFlow();

  return (
    <View style={styles.screen}>
      <BrandLoader
        headline={t(S.kyc.processing.headline)}
        subtitle={t(S.kyc.processing.subtitle)}
        steps={S.kyc.processing.steps.map(t)}
        onDone={() => {
          // The stand-in for the vendor's verdict — see `demoOutcome`. Counted even on the
          // passing path, so the retry after a rejection knows it is the second attempt.
          if (shouldFailKyc(params.phone, recordKycAttempt('id'))) {
            navigation?.replace('KycFailed', { ...params, stage: 'id' });
            return;
          }
          setProfile({ ...DEMO_PROFILE, phone: params.phone ?? '' });
          navigation?.replace('KycReview', params);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.green },
});
