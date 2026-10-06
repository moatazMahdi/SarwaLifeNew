import { StyleSheet } from 'react-native';

export const bottomInset = (bottom: number) => ({ paddingBottom: 28 + bottom });

export const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
});
