import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export type AppInputRef = TextInput;

export type AppInputProps = TextInputProps & { ref?: React.Ref<AppInputRef> };

export function AppInput(props: AppInputProps) {
  return <TextInput {...props} />;
}
