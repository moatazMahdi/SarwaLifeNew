import React from 'react';
import { Image, ImageProps } from 'react-native';

export type AppImageProps = ImageProps & { ref?: React.Ref<Image> };

export function AppImage(props: AppImageProps) {
  return <Image {...props} />;
}
