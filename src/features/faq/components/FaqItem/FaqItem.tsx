import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedBox, AppText, Box, Icon, Touchable } from '../../../../shared/components';
import { colors, rotateStyle } from '../../../../shared/theme';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { useFaqItem } from '../../hooks/useFaqItem';
import { heightStyle, SURFACE, styles } from './FaqItem.styles';

type Props = {
  question: Phrase;
  answer: Phrase;
  open: boolean;
  onToggle: () => void;
};

export function FaqItem({ question, answer, open, onToggle }: Props) {
  const { t } = useI18n();
  const text = t(answer);
  const { needsMeasure, onMeasure, height, spin } = useFaqItem(open, text);

  return (
    <LinearGradient {...SURFACE} style={styles.card}>
      <Touchable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={t(question)}
        accessibilityHint={t(open ? S.faq.a11yCollapse : S.faq.a11yExpand)}
        style={({ pressed }) => [styles.head, pressed && styles.pressed]}
      >
        <AppText style={styles.question}>{t(question)}</AppText>
        <Box style={styles.chevron}>
          <AnimatedBox style={rotateStyle(spin)}>
            <Icon name="chevronDown" size={18} color={colors.g7} />
          </AnimatedBox>
        </Box>
      </Touchable>
      <AnimatedBox style={[styles.answerClip, heightStyle(height)]}>
        <Box style={styles.answerPad}>
          <AppText style={styles.answer}>{text}</AppText>
        </Box>
      </AnimatedBox>
      {needsMeasure ? (
        <Box style={styles.measure} pointerEvents="none" onLayout={onMeasure}>
          <Box style={styles.answerPad}>
            <AppText style={styles.answer}>{text}</AppText>
          </Box>
        </Box>
      ) : null}
    </LinearGradient>
  );
}
