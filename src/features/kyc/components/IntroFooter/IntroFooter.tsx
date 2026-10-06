import React from 'react';
import { Button, Icon, SafeArea, StickyFooter } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';

export function IntroFooter({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();
  return (
    <StickyFooter>
      <SafeArea edges={['bottom']}>
        <Button
          label={t(S.kyc.intro.cta)}
          onPress={onStart}
          endIcon={
            <Icon name="arrowLeft" width={13.25} height={11.58} color={colors.white} directional />
          }
        />
      </SafeArea>
    </StickyFooter>
  );
}
