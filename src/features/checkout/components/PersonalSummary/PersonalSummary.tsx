import React from 'react';
import { Button, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { SummaryField } from '../SummaryField/SummaryField';
import { SummaryGrid } from '../SummaryGrid/SummaryGrid';

type Props = { fields: [label: Phrase, value: string][]; onEdit: () => void };

export function PersonalSummary({ fields, onEdit }: Props) {
  const { t } = useI18n();
  return (
    <SummaryCard
      footer={
        <Button
          variant="chip"
          label={t(S.checkout.personal.edit)}
          onPress={onEdit}
          endIcon={<Icon name="docEdit" size={18} color={colors.goldTx} />}
        />
      }
    >
      <SummaryGrid>
        {fields.map(([label, value]) => (
          <SummaryField key={label[0]} label={label} value={value} />
        ))}
      </SummaryGrid>
    </SummaryCard>
  );
}
