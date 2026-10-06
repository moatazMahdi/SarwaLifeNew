import React from 'react';
import { Scroll } from '../../../../shared/components';
import { NATIONALITIES } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { useFooterInset } from '../../hooks/useFooterInset';
import { DobParts } from '../../utils/dob';
import { AgePill } from '../AgePill/AgePill';
import { ChoiceOption } from '../ChoiceOption/ChoiceOption';
import { DobField } from '../DobField/DobField';
import { QuestionBlock } from '../QuestionBlock/QuestionBlock';
import { bottomInset, styles } from './StepData.styles';

type Props = {
  dob: DobParts;
  onDob: (next: DobParts) => void;
  age: number;
  nationality: string;
  onNationality: (n: string) => void;
  smoker: boolean | null;
  onSmoker: (v: boolean) => void;
};

export function StepData({ dob, onDob, age, nationality, onNationality, smoker, onSmoker }: Props) {
  const { t } = useI18n();
  const bottom = useFooterInset();

  return (
    <Scroll
      contentContainerStyle={[styles.body, bottomInset(bottom)]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <DobField dob={dob} onDob={onDob} age={age} />
      <AgePill age={age} />
      <QuestionBlock label={t(S.quote.data.nationality)}>
        {NATIONALITIES.map((nat) => (
          <ChoiceOption
            key={nat[0]}
            label={t(nat)}
            on={nationality === nat[0]}
            onPress={() => onNationality(nat[0])}
            fontSize={15}
          />
        ))}
      </QuestionBlock>
      <QuestionBlock label={t(S.quote.data.smoker)}>
        <ChoiceOption label={t(S.quote.data.yes)} on={smoker === true} onPress={() => onSmoker(true)} />
        <ChoiceOption label={t(S.quote.data.no)} on={smoker === false} onPress={() => onSmoker(false)} />
      </QuestionBlock>
    </Scroll>
  );
}
