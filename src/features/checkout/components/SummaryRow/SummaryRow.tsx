import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Icon, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { SummaryToneContext } from '../../context/summaryTone';
import { TICK_FILL, styles } from './SummaryRow.styles';

type Props = {
  label: Phrase;
  value: string;
  unit?: Phrase;
  verified?: boolean;
  strong?: boolean;
  accent?: boolean;
};

export function SummaryRow({ label, value, unit, verified, strong, accent }: Props) {
  const { t } = useI18n();
  const green = React.useContext(SummaryToneContext) === 'brand' || accent;
  return (
    <Row style={styles.row}>
      <AppText style={[styles.label, strong && styles.labelStrong]}>{t(label)}</AppText>
      <Row style={[styles.valueGroup, strong && styles.valueGroupStrong]}>
        <AppText
          style={[styles.value, green && styles.valueAccent, strong && styles.valueStrong]}
          numberOfLines={strong ? 1 : 2}
        >
          {value}
        </AppText>
        {unit ? <AppText style={[styles.unit, strong && styles.unitStrong]}>{t(unit)}</AppText> : null}
        {verified ? (
          <LinearGradient {...TICK_FILL} style={styles.tick}>
            <Icon name="check" size={9} color={colors.white} />
          </LinearGradient>
        ) : null}
      </Row>
    </Row>
  );
}
