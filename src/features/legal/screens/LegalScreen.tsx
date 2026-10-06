import React from 'react';
import { Screen, ScreenHeader } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { useI18n } from '../../../shared/i18n';
import { LegalBody, LegalNote, LegalSectionBlock } from '../components';
import { useLegal } from '../hooks/useLegal';

export function LegalScreen(props: any) {
  const { t } = useI18n();
  const { doc, sections, onBack } = useLegal(props);

  return (
    <Screen background={colors.bg}>
      <ScreenHeader title={t(doc.title)} onBack={onBack} />
      <LegalBody intro={doc.intro}>
        {sections.map((s, i) => (
          <LegalSectionBlock key={s.title[0]} section={s} index={i} />
        ))}
        <LegalNote />
      </LegalBody>
    </Screen>
  );
}
