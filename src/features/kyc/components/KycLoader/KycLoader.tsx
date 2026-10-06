import React from 'react';
import { BrandLoader, Screen } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';

type Props = {
  headline: string;
  subtitle: string;
  steps: string[];
  stepMs?: number;
  onDone: () => void;
};

export function KycLoader(props: Props) {
  return (
    <Screen background={colors.green}>
      <BrandLoader {...props} />
    </Screen>
  );
}
