import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingBottom: 16,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 2,
  },
  pageHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 54,
    height: 54,
  },
  tools: {
    alignItems: 'center',
    gap: 8,
  },
  greetingWrap: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  greeting: {
    ...typography.homeGreeting,
    color: '#6A6C6A',
    textAlign: 'auto',
  },
  tagline: {
    ...typography.homeTagline,
    color: colors.green,
    textAlign: 'auto',
    marginTop: 6,
  },
});
