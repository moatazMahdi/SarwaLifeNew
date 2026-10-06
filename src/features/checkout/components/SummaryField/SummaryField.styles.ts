import { StyleSheet } from 'react-native';
import { typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  field: { width: '47%', gap: 4 },
  label: {
    ...typography.helperText,
    fontSize: 13,
    lineHeight: 17,
    color: '#8A8FA3',
    textAlign: 'auto',
  },
  value: {
    ...typography.optSubtitle,
    fontSize: 15.5,
    lineHeight: 23,
    color: '#000000',
    textAlign: 'auto',
  },
});
