import React from 'react';
import { View, ViewProps } from 'react-native';

export type BoxProps = ViewProps & { ref?: React.Ref<View> };

export function Box(props: BoxProps) {
  return <View {...props} />;
}
