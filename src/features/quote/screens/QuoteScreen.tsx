import React from 'react';
import { SafeArea, Screen } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import {
  PremiumLoader,
  QuoteActions,
  QuoteFooter,
  QuoteHeader,
  QuoteStepper,
  StepCover,
  StepData,
  StepOffer,
  StepTransition,
} from '../components';
import { useQuote } from '../hooks/useQuote';

export function QuoteScreen(props: any) {
  const q = useQuote(props);

  return (
    <Screen background={colors.bg}>
      <SafeArea edges={['top']}>
        <QuoteHeader onBack={q.onBack} />
        <QuoteStepper current={q.step} />
      </SafeArea>
      <StepTransition step={q.step} dir={q.dir}>
        {q.step === 1 ? (
          <StepData
            dob={q.dob}
            onDob={q.setDob}
            age={q.age}
            nationality={q.nationality}
            onNationality={q.setNationality}
            smoker={q.smoker}
            onSmoker={q.setSmoker}
          />
        ) : q.step === 2 ? (
          <StepCover
            cover={q.cover}
            onCover={q.setCover}
            optionals={q.optionals}
            onToggle={q.toggleOptional}
            cards={q.cards}
            onCards={q.setCards}
          />
        ) : (
          <StepOffer cover={q.cover} result={q.result} />
        )}
      </StepTransition>
      <QuoteFooter>
        <QuoteActions
          step={q.step}
          canContinue={q.step1Valid}
          onNext={q.onNext}
          onSave={q.onSave}
          onIssue={q.onIssue}
        />
      </QuoteFooter>
      {q.calculating ? <PremiumLoader onDone={q.onCalculated} /> : null}
    </Screen>
  );
}
