import React from 'react';
import { AppText, Box, Button, Icon } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { openSupportChat } from '../../../../shared/utils/support';
import { styles } from './FaqContact.styles';

export function FaqContact() {
  const { t } = useI18n();
  return (
    <Box style={styles.tail}>
      <AppText style={styles.title}>{t(S.faq.noAnswer)}</AppText>
      <Button
        variant="gradient"
        label={t(S.faq.callMe)}
        onPress={openSupportChat}
        endIcon={<Icon name="whatsapp" size={18} />}
      />
    </Box>
  );
}
