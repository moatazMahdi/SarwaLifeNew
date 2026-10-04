import React from 'react';
import { BrandLoader } from '../../components/BrandLoader';
import { S, useI18n } from '../../i18n';

/**
 * The quote flow's "calculating your premium" state, shown between quote step 2 and step 3.
 * The visual now lives in `BrandLoader`, which the account-creation waits share — what is
 * left here is just the quote's own copy.
 */
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
