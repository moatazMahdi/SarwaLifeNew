import React from 'react';
import { ActionFooter, Button, Icon, Screen } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { S, useI18n } from '../../../shared/i18n';
import { openSupportChat } from '../../../shared/utils/support';
import { KycFailedBody } from '../components';
import { useKycFailed } from '../hooks/useKycFailed';

export function KycFailedScreen(props: any) {
  const { t } = useI18n();
  const { copy, retry } = useKycFailed(props);

  return (
    <Screen background={colors.bg}>
      <KycFailedBody title={copy.title} subtitle={copy.subtitle} reasons={copy.reasons} />
      <ActionFooter>
        <Button
          label={t(copy.cta)}
          onPress={retry}
          endIcon={<Icon name="retry" size={21} color={colors.white} />}
        />
        <Button
          variant="plain"
          label={t(S.kyc.failed.support)}
          onPress={openSupportChat}
          startIcon={<Icon name="whatsapp" size={20} />}
        />
      </ActionFooter>
    </Screen>
  );
}
