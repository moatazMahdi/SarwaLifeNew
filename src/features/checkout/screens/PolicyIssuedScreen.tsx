import React from 'react';
import { Screen } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { IssuedBody, IssuedFooter } from '../components';
import { usePolicyIssued } from '../hooks/usePolicyIssued';

export function PolicyIssuedScreen(props: any) {
  const p = usePolicyIssued(props);

  return (
    <Screen background={colors.bg}>
      <IssuedBody product={p.product} policyNumber={p.policyNumber} cover={p.cover} yearly={p.yearly} />
      <IssuedFooter onDownload={p.download} onShare={p.share} onHome={p.goHome} />
    </Screen>
  );
}
