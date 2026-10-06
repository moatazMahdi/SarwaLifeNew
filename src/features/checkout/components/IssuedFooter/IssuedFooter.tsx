import React from 'react';
import { ActionFooter, AppText, Button, Icon, Touchable } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './IssuedFooter.styles';

type Props = { onDownload: () => void; onShare: () => void; onHome: () => void };

export function IssuedFooter({ onDownload, onShare, onHome }: Props) {
  const { t } = useI18n();
  return (
    <ActionFooter>
      <Button
        label={t(S.checkout.issued.download)}
        onPress={onDownload}
        endIcon={<Icon name="download" size={21} color={colors.white} />}
      />
      <Button
        variant="plain"
        label={t(S.checkout.issued.share)}
        onPress={onShare}
        endIcon={<Icon name="shareNodes" size={20} color={colors.g7} />}
        style={styles.share}
      />
      <Touchable onPress={onHome} accessibilityRole="button" hitSlop={8}>
        <AppText style={styles.home}>{t(S.checkout.issued.home)}</AppText>
      </Touchable>
    </ActionFooter>
  );
}
