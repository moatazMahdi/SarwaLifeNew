import React from 'react';
import { Box } from '../../../../shared/components';
import { METHODS } from '../../constants';
import { MethodOption } from '../MethodOption/MethodOption';
import { styles } from './MethodList.styles';

type Props = { value: string | null; onChange: (key: string) => void };

export function MethodList({ value, onChange }: Props) {
  return (
    <Box style={styles.list}>
      {METHODS.map((m) => (
        <MethodOption key={m.key} method={m} on={value === m.key} onPress={() => onChange(m.key)} />
      ))}
    </Box>
  );
}
