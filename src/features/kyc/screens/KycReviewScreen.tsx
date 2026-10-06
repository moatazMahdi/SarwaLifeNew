import React from 'react';
import { KycFlowLayout, ReviewContent, ReviewFooter } from '../components';
import { useKycReview } from '../hooks/useKycReview';

export function KycReviewScreen(props: any) {
  const { rows, agreed, toggleAgreed, onBack, onNext, openTerms, openPrivacy } = useKycReview(props);

  return (
    <KycFlowLayout step={2} onBack={onBack}>
      <ReviewContent rows={rows} />
      <ReviewFooter
        agreed={agreed}
        onToggle={toggleAgreed}
        onTerms={openTerms}
        onPrivacy={openPrivacy}
        onNext={onNext}
      />
    </KycFlowLayout>
  );
}
