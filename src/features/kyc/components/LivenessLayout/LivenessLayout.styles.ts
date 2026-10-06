import { StyleSheet } from 'react-native';

export const FILL = {
  colors: ['#0C7A65', '#00705C', '#04463A'],
  locations: [0, 0.38, 1],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 },
};

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  safe: { flex: 1 },
  watermark: {
    position: 'absolute',
    left: -60,
    top: 110,
    width: 270,
    height: 270,
    opacity: 0.05,
  },
  head: { height: 60, paddingHorizontal: 16, paddingTop: 8 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
});
