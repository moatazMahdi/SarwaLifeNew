import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const DISC_GLOSS = {
  colors: ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)'],
  locations: [0, 0.55],
};

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  disc: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 10,
  },
  titleBlock: { marginTop: 48, gap: 8, alignSelf: 'stretch' },
  title: {
    ...typography.authTitle,
    fontSize: 22,
    lineHeight: 33,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: { ...typography.introText, color: 'rgba(255,255,255,0.82)', textAlign: 'center' },
  cta: { marginTop: 40 },
});
