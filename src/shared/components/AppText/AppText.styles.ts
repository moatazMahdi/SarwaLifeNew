import { typography } from '../../theme';

export type TypographyVariant = keyof typeof typography;

export const variantStyle = (variant?: TypographyVariant, color?: string) => [
  variant ? typography[variant] : null,
  color ? { color } : null,
];
