import React from 'react';
import { S, useI18n } from '../../i18n';
import { AppText } from '../AppText/AppText';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Row } from '../Row/Row';
import { SafeArea } from '../SafeArea/SafeArea';
import { styles } from './ScreenHeader.styles';

type Props = {
  title: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
};

export function ScreenHeader({ title, onBack, trailing }: Props) {
  const { t } = useI18n();

  return (
    <Box style={styles.head}>
      <SafeArea edges={['top']}>
        <Row style={styles.row}>
          <Button
            variant="icon"
            size={42}
            onPress={onBack}
            accessibilityLabel={t(S.common.back)}
            icon={<Icon name="chevronBack" size={22} directional />}
          />
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <Box style={styles.trailing}>{trailing}</Box>
        </Row>
      </SafeArea>
    </Box>
  );
}
