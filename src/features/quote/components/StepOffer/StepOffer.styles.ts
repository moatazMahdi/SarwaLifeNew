import { StyleSheet } from 'react-native';

export const bottomInset = (bottom: number) => ({ paddingBottom: bottom });

export const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, paddingTop: 12, gap: 18 },
});
