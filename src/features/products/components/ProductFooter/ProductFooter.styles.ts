import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const FADE = { colors: ['rgba(245,247,250,0)', 'rgba(245,247,250,0.85)'] };

export const footInset = (bottom: number) => ({ paddingBottom: Math.max(bottom, 12) + 13 });

export const styles = StyleSheet.create({
  foot: {
    backgroundColor: 'rgba(245,247,250,0.92)',
    borderTopWidth: 1,
    borderTopColor: colors.br2,
    paddingHorizontal: 22,
    paddingTop: 14,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -22,
    height: 22,
  },
});
