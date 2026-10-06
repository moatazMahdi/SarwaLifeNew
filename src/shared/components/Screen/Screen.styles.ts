import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fill: { flex: 1 },
});

export const backgroundStyle = (color?: string) => (color ? { backgroundColor: color } : null);
