import React from 'react';
import { Button } from '../../../shared/components';
import { S, useI18n } from '../../../shared/i18n';
import { EditDetailsSheet, IssueHeading, IssueLayout, PersonalSummary, PolicyChip } from '../components';
import { useCheckoutPersonal } from '../hooks/useCheckoutPersonal';

export function CheckoutPersonalScreen(props: any) {
  const { t } = useI18n();
  const c = useCheckoutPersonal(props);

  return (
    <IssueLayout
      step={1}
      onBack={c.onBack}
      footer={<Button label={t(S.common.next)} onPress={c.onNext} />}
    >
      <PolicyChip product={c.product} cover={c.cover} monthly={c.monthly} />
      <IssueHeading title={S.checkout.personal.title} subtitle={S.checkout.personal.subtitle} />
      <PersonalSummary fields={c.fields} onEdit={c.openEdit} />
      <EditDetailsSheet
        visible={c.editing}
        profile={c.profile}
        onSave={c.saveProfile}
        onClose={c.closeEdit}
      />
    </IssueLayout>
  );
}
