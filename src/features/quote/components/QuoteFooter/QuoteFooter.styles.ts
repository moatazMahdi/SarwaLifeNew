import { StyleSheet } from 'react-native';
import { FOOTER_FADE } from '../../constants';

export const FADE = {
  colors: ['rgba(245,247,250,0)', 'rgba(245,247,250,0.88)', 'rgba(245,247,250,1)'],
  locations: [0, 0.42, 1],
};

export const footInset = (bottom: number) => ({ paddingBottom: Math.max(bottom, 16) });

export const styles = StyleSheet.create({
  foot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: FOOTER_FADE,
  },
});
