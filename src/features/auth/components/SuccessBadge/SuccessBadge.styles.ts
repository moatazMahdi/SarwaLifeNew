import { StyleSheet } from 'react-native';
import { gradients } from '../../../../shared/theme';

export const POP_FILL = {
  colors: ['#F1F8F6', '#E7F2EE'],
  useAngle: true,
  angle: 140,
};

export const DISC_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  pop: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disc: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
  },
  gloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
