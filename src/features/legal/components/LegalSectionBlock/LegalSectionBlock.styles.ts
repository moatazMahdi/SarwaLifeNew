import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  section: { marginTop: 24 },
  title: { ...typography.cardTitle, fontSize: 15, color: colors.ink, textAlign: 'auto' },
});
