import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTile: {
    width: 150,
    height: 150,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  logo: {
    width: 108,
    height: 108,
  },
  title: {
    ...typography.headline,
    fontSize: 38,
    lineHeight: 56,
    color: colors.white,
    marginTop: 28,
  },
  trackRow: {
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  trackLine: {
    width: 26,
    height: 1,
    backgroundColor: 'rgba(201,162,75,0.7)',
  },
  trackText: {
    ...typography.subtitle,
    fontSize: 13,
    color: colors.goldL,
    letterSpacing: 4,
  },
  tagline: {
    ...typography.screenTitle,
    fontSize: 21,
    lineHeight: 32,
    color: colors.white,
    marginTop: 24,
  },
});
