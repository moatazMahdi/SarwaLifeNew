import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const SURFACE = { colors: ['#FFFFFF', '#FDFDFE'] };

export const tileTint = (tint: string) => ({ backgroundColor: tint });

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  card: {
    alignItems: 'flex-start',
    gap: 11,
    paddingStart: 16,
    paddingEnd: 14,
    paddingTop: 12.6,
    paddingBottom: 15.4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.br2,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2,
  },
  tile: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.4,
  },
  text: {
    color: colors.g7,
    textAlign: 'auto',
    flex: 1,
  },
});
