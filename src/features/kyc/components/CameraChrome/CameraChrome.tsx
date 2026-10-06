import React from 'react';
import { useWindowDimensions } from 'react-native';
import { AppText, Box, Button, Icon, Row, SafeArea } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { scrimHeight, styles } from './CameraChrome.styles';

type Props = {
  title: string;
  caption: string;
  onBack: () => void;
  children: React.ReactNode;
};

export function CameraChrome({ title, caption, onBack, children }: Props) {
  const { t } = useI18n();
  const { height } = useWindowDimensions();

  return (
    <>
      <Box style={[styles.bottomScrim, scrimHeight(height)]} pointerEvents="none" />
      <SafeArea style={styles.fill} edges={['top', 'bottom']}>
        <Row style={styles.head}>
          <Button
            variant="glassRound"
            onPress={onBack}
            accessibilityLabel={t(S.common.back)}
            icon={<Icon name="chevronBack" size={24} color={colors.white} directional />}
          />
          <AppText style={styles.title}>{title}</AppText>
        </Row>
        <Box style={styles.footer}>
          <AppText style={styles.caption}>{caption}</AppText>
          {children}
        </Box>
      </SafeArea>
    </>
  );
}
