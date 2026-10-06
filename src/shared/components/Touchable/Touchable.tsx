import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

export type TouchableProps = PressableProps & { ref?: React.Ref<View> };

export function Touchable(props: TouchableProps) {
  return <Pressable {...props} />;
}
