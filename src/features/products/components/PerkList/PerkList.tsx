import React from 'react';
import { Box } from '../../../../shared/components';
import { Phrase } from '../../../../shared/i18n';
import { PerkCard } from '../PerkCard/PerkCard';
import { styles } from './PerkList.styles';

type Props = {
  perks: Phrase[];
  palette: { tint: string; primary: string };
};

export function PerkList({ perks, palette }: Props) {
  return (
    <Box style={styles.list}>
      {perks.map((perk) => (
        <PerkCard key={perk[0]} perk={perk} tint={palette.tint} primary={palette.primary} />
      ))}
    </Box>
  );
}
