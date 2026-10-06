import React from 'react';

export type SummaryTone = 'brand' | 'plain';

export const SummaryToneContext = React.createContext<SummaryTone>('brand');
