import { StyleSheet } from 'react-native';

export const FADE = { colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)'] };

export const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 32,
    paddingTop: 14,
    paddingBottom: 34,
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  fade: { position: 'absolute', left: 0, right: 0, top: -22, height: 22 },
});
