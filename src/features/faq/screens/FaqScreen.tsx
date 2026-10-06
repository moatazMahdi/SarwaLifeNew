import React from 'react';
import { Screen, ScreenHeader } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { S, useI18n } from '../../../shared/i18n';
import { FaqBody, FaqContact, FaqIntro, FaqList, GuestBadge } from '../components';
import { useFaq } from '../hooks/useFaq';

export function FaqScreen(props: any) {
  const { t } = useI18n();
  const { isLoggedIn, open, toggle, onBack, onGuest } = useFaq(props);

  return (
    <Screen background={colors.bg}>
      <ScreenHeader
        title={t(S.faq.title)}
        onBack={onBack}
        trailing={isLoggedIn ? undefined : <GuestBadge onPress={onGuest} />}
      />
      <FaqBody>
        <FaqIntro />
        <FaqList open={open} onToggle={toggle} />
        <FaqContact />
      </FaqBody>
    </Screen>
  );
}
