import React from 'react';
import { S, useI18n } from '../../i18n';
import { AppText } from '../AppText/AppText';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Row } from '../Row/Row';
import { styles } from './AuthTopBar.styles';

export function AuthTopBar({ title, onBack }: { title?: string; onBack?: () => void }) {
  const { t } = useI18n();

  return (
    <Row style={styles.head}>
      <Button
        variant="round"
        onPress={onBack}
        accessibilityLabel={t(S.common.back)}
        icon={<Icon name="chevronBack" size={24} directional />}
      />
      {title ? (
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
      ) : null}
    </Row>
  );
}
