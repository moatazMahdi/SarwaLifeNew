import React from 'react';
import {
  AppImage,
  AppText,
  Box,
  Button,
  Icon,
  LangToggle,
  Row,
  SafeArea,
} from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { LOGO } from '../../constants';
import { styles } from './HomeHeader.styles';

export function HomeHeader({ onFaq }: { onFaq: () => void }) {
  const { t } = useI18n();

  return (
    <Box style={styles.header}>
      <SafeArea edges={['top']}>
        <Row style={styles.pageHeader}>
          <AppImage source={LOGO} style={styles.logo} resizeMode="contain" />
          <Row style={styles.tools}>
            <Button
              variant="tool"
              onPress={onFaq}
              accessibilityLabel={t(S.faq.title)}
              icon={<Icon name="faq" size={18} color={colors.ink} />}
            />
            <LangToggle />
          </Row>
        </Row>
        <Box style={styles.greetingWrap}>
          <AppText style={styles.greeting}>{t(S.home.greeting)}</AppText>
          <AppText style={styles.tagline}>{t(S.home.tagline)}</AppText>
        </Box>
      </SafeArea>
    </Box>
  );
}
