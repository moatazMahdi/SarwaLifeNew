import React from 'react';
import { Box, Button, Icon, InfoNote } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { GateRow } from '../GateRow/GateRow';
import { styles } from './GateOptions.styles';

type Props = { onExisting: () => void; onNew: () => void; onBrowse: () => void };

export function GateOptions({ onExisting, onNew, onBrowse }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.section}>
      <Box style={styles.stack}>
        <Box style={styles.rows}>
          <GateRow
            primary
            label={t(S.auth.gate.existing)}
            icon={<Icon name="personCheck" size={24} />}
            onPress={onExisting}
          />
          <GateRow
            label={t(S.auth.gate.newCustomer)}
            icon={<Icon name="personPlus" size={24} />}
            onPress={onNew}
          />
        </Box>
        <InfoNote text={t(S.auth.gate.note)} />
      </Box>
      <Button variant="link" label={t(S.auth.gate.browse)} onPress={onBrowse} />
    </Box>
  );
}
