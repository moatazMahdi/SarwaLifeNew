import { StyleSheet } from 'react-native';
import { typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
    gap: 22,
  },
  legal: {
    ...typography.footerNote,
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
  },
});
