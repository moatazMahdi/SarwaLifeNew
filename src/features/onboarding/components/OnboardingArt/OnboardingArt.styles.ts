import { StyleSheet } from 'react-native';
import { Slide } from '../../constants';

export const artSize = (slide: Slide) => ({ width: slide.artWidth, height: slide.artHeight });

export const styles = StyleSheet.create({
  artWrap: { position: 'relative' },
  art: { width: '100%', height: '100%' },
});
