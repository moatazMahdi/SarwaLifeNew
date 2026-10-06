import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export type ScrollProps = ScrollViewProps & { ref?: React.Ref<ScrollView> };

export function Scroll(props: ScrollProps) {
  return <ScrollView {...props} />;
}
