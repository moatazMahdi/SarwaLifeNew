import React from 'react';
import { AppText, Box, Button, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { useI18n } from '../../../../shared/i18n';
import { Slide } from '../../constants';
import { PageDots } from '../PageDots/PageDots';
import { styles } from './OnboardingPanel.styles';

type Props = { slide: Slide; step: number; total: number; onNext: () => void };

export function OnboardingPanel({ slide, step, total, onNext }: Props) {
  const { t } = useI18n();

  return (
    <Box style={styles.bottom}>
      <Box style={styles.textBlock}>
        <Box style={styles.dotsAndTitle}>
          <PageDots count={total} active={step} />
          <AppText style={styles.headline}>{t(slide.headline)}</AppText>
        </Box>
        <AppText style={styles.subtitle}>{t(slide.subtitle)}</AppText>
      </Box>
      <Box style={styles.buttonWrap}>
        <Button
          label={t(slide.cta)}
          onPress={onNext}
          endIcon={
            <Icon name="arrowLeft" width={13.25} height={11.58} color={colors.white} directional />
          }
        />
      </Box>
    </Box>
  );
}
