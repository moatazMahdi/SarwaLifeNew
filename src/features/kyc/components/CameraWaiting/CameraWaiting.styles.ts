import { StyleSheet } from 'react-native';
import { typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  box: { alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 40 },
  disc: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  title: { ...typography.bodyText, color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
  hint: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  cta: {
    marginTop: 6,
    height: 48,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
});
