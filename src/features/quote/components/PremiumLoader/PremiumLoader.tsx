import React from 'react';
import { BrandLoader } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';

export function PremiumLoader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  return (
    <BrandLoader
      headline={t(S.quote.loader.headline)}
      subtitle={t(S.quote.loader.subtitle)}
      steps={[t(S.quote.loader.s1), t(S.quote.loader.s2), t(S.quote.loader.s3)]}
      onDone={onDone}
    />
  );
}
