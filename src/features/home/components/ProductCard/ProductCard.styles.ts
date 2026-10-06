import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconArt: {
    width: 37,
    height: 43,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    gap: 13,
  },
  text: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.3,
    color: colors.ink,
    textAlign: 'auto',
  },
  desc: {
    ...typography.cardBody,
    fontSize: 10,
    lineHeight: 17.25,
    color: colors.g5,
    textAlign: 'auto',
  },
  chevronBox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
