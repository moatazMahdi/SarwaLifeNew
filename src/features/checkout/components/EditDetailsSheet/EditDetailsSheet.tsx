import React from 'react';
import { Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AnimatedBox,
  AppText,
  Box,
  Button,
  KeyboardAvoid,
  Scroll,
  Touchable,
} from '../../../../shared/components';
import { opacityStyle } from '../../../../shared/theme';
import type { Profile } from '../../../../shared/state/FlowContext';
import { S, useI18n } from '../../../../shared/i18n';
import { EDIT_FIELDS } from '../../constants';
import { useEditSheet } from '../../hooks/useEditSheet';
import { EditField } from '../EditField/EditField';
import { sheetMotion, styles } from './EditDetailsSheet.styles';

type Props = {
  visible: boolean;
  profile: Profile;
  onSave: (next: Profile) => void;
  onClose: () => void;
};

export function EditDetailsSheet({ visible, profile, onSave, onClose }: Props) {
  const { t } = useI18n();
  const { bottom } = useSafeAreaInsets();
  const sheet = useEditSheet(visible, profile, onSave, onClose);

  if (!sheet.mounted) return null;

  return (
    <Modal
      visible
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType="none"
      onShow={sheet.animateIn}
      onRequestClose={onClose}
    >
      <AnimatedBox style={[styles.scrim, opacityStyle(sheet.anim)]}>
        <Touchable style={styles.fill} onPress={onClose} />
      </AnimatedBox>
      <KeyboardAvoid style={styles.anchor} pointerEvents="box-none">
        <AnimatedBox style={[styles.sheet, sheetMotion(bottom, sheet.translateY)]}>
          <Box style={styles.grabber} />
          <AppText style={styles.title}>{t(S.checkout.personal.editTitle)}</AppText>
          <AppText style={styles.subtitle}>{t(S.checkout.personal.editSubtitle)}</AppText>
          <Scroll
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {EDIT_FIELDS.map((f) => (
              <EditField
                key={f.key}
                label={t(f.label)}
                value={String(sheet.draft[f.key] ?? '')}
                numeric={f.numeric}
                onChange={(v) => sheet.setField(f.key, v)}
              />
            ))}
          </Scroll>
          <Box style={styles.actions}>
            <Button label={t(S.common.save)} onPress={sheet.save} />
            <Button variant="ghost" label={t(S.common.cancel)} onPress={onClose} />
          </Box>
        </AnimatedBox>
      </KeyboardAvoid>
    </Modal>
  );
}
