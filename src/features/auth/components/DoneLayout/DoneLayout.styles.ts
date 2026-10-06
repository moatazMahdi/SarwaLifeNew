import { StyleSheet } from 'react-native';

export const watermarkSize = (width: number) => {
  const w = width * (631 / 390);
  return { width: w, height: w * (547 / 631) };
};

export const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F7FA' },
  fill: { flex: 1 },
  watermark: { position: 'absolute', left: 0, top: -128, opacity: 0.05 },
});
