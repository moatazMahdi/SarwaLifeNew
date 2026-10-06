import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

export const TILE_FILL = {
  colors: [...gradients.brandSoft.colors],
  useAngle: true,
  angle: 140,
};

export const styles = StyleSheet.create({
  intro: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 24,
    alignItems: 'center',
  },
  tile: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  titleBlock: { gap: 8, alignSelf: 'stretch' },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'center' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'center' },
  subtitleStrong: { ...typography.bodyText, fontSize: 14.5, color: '#000000' },
});
