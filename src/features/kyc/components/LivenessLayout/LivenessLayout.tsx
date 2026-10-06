import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppImage, Box, Button, Icon, Row, SafeArea, Screen } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { LOGO } from '../../constants';
import { FILL, styles } from './LivenessLayout.styles';

type Props = { onBack: () => void; children: React.ReactNode };

export function LivenessLayout({ onBack, children }: Props) {
  const { t } = useI18n();
  return (
    <Screen background={colors.greenDD}>
      <LinearGradient {...FILL} style={styles.fill} />
      <AppImage source={LOGO} style={styles.watermark} resizeMode="contain" />
      <SafeArea style={styles.safe} edges={['top', 'bottom']}>
        <Row style={styles.head}>
          <Button
            variant="glassRound"
            onPress={onBack}
            accessibilityLabel={t(S.common.back)}
            icon={<Icon name="chevronBack" size={24} color={colors.white} directional />}
          />
        </Row>
        <Box style={styles.body}>{children}</Box>
      </SafeArea>
    </Screen>
  );
}
