import React from 'react';
import { GateIntro, GateLayout, GateOptions } from '../components';
import { useLoginGate } from '../hooks/useLoginGate';

export function LoginGateScreen(props: any) {
  const { yearly, onBack, onExisting, onNew } = useLoginGate(props);

  return (
    <GateLayout onBack={onBack}>
      <GateIntro yearly={yearly} />
      <GateOptions onExisting={onExisting} onNew={onNew} onBrowse={onBack} />
    </GateLayout>
  );
}
