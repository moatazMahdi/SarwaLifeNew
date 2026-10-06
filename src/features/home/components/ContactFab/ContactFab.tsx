import React from 'react';
import { Button, Icon } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { openSupportChat } from '../../../../shared/utils/support';
import { fabOffset } from './ContactFab.styles';

export function ContactFab({ bottom = 24 }: { bottom?: number }) {
  const { t } = useI18n();

  return (
    <Button
      variant="fab"
      label={t(S.home.contact)}
      onPress={openSupportChat}
      startIcon={<Icon name="whatsapp" size={22} />}
      style={fabOffset(bottom)}
    />
  );
}
