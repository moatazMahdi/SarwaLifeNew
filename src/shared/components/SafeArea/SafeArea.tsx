import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SafeAreaProps = React.ComponentProps<typeof SafeAreaView>;

export function SafeArea(props: SafeAreaProps) {
  return <SafeAreaView {...props} />;
}
