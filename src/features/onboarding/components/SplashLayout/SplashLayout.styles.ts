import { StyleSheet } from 'react-native';

const RING = 'rgba(255,255,255,0.055)';

export const FILL = {
  colors: ['#0C7A65', '#00705C', '#054A3D'],
  locations: [0, 0.42, 1],
  start: { x: 0.15, y: 0 },
  end: { x: 0.85, y: 1 },
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  watermark: {
    position: 'absolute',
    top: 120,
    left: -70,
    width: 340,
    height: 340,
    opacity: 0.05,
  },
  ringOuter: {
    position: 'absolute',
    top: '18%',
    alignSelf: 'center',
    width: 560,
    height: 560,
    borderRadius: 280,
    borderWidth: 1,
    borderColor: RING,
  },
  ringMid: {
    position: 'absolute',
    top: '26%',
    alignSelf: 'center',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: RING,
  },
  ringInner: {
    position: 'absolute',
    top: '33%',
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: RING,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
});
