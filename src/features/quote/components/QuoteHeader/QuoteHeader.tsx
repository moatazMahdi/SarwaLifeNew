import React from 'react';
import { AppText, Box, Button, Icon, Row } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './QuoteHeader.styles';

export function QuoteHeader({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  return (
    <Row style={styles.head}>
      <Button
        variant="round"
        onPress={onBack}
        accessibilityLabel={t(S.common.back)}
        icon={<Icon name="chevronBack" size={24} directional />}
      />
      <Box style={styles.titleWrap}>
        <AppText style={styles.title}>{t(S.quote.chrome.title)}</AppText>
      </Box>
    </Row>
  );
}
