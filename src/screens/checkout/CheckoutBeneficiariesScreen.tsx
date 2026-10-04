import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { GoldNote, IssueHeading, IssueLayout } from '../../components/IssueLayout';
import { PolicyChip } from '../../components/PolicyChip';
import { Icon } from '../../components/Icon';
import { getProduct } from '../../data/products';
import { useFlow } from '../../state/FlowContext';
import { S, useI18n } from '../../i18n';

/**
 * Figma 2071:5689 — step 2 of "اصدار الوثيقة".
 *
 * The beneficiary is not a choice: these products pay out to the legal heirs under Egyptian
 * succession law, so the screen states that fact and moves on. The previous build offered an
 * add/remove beneficiary editor, which promised the user a decision the policy does not
 * actually give them. The card is drawn in its selected state because it is the only state.
 */
export function CheckoutBeneficiariesScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);

  return (
    <IssueLayout
      step={2}
      onBack={() => navigation?.goBack()}
      footer={
        <PrimaryButton
          label={t(S.common.next)}
          onPress={() => navigation?.navigate('CheckoutMedical', { product: product.key })}
        />
      }
    >
      <IssueHeading
        title={S.checkout.beneficiaries.title}
        subtitle={S.checkout.beneficiaries.subtitle}
      />

      <PolicyChip product={product} compact />

      <View style={styles.card}>
        {/* RTL: the text column is written first so it takes the row's start — physical
            right — and the seal settles against the far edge, as the comp draws it. */}
        <View style={styles.col}>
          <View style={styles.titleRow}>
            {/* Tile first: the comp puts it hard against the reading edge, ahead of the name. */}
            <View style={styles.tile}>
              <Icon name="people" size={24} color={colors.white} />
            </View>
            <Text style={styles.title}>{t(S.checkout.beneficiaries.heirs)}</Text>
          </View>

          <Text style={styles.desc}>{t(S.checkout.beneficiaries.heirsDesc)}</Text>
        </View>

        <Icon name="sealCheck" size={22} color={colors.green} />
      </View>

      <GoldNote>{S.checkout.beneficiaries.note}</GoldNote>
    </IssueLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.mint,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  col: { flex: 1, gap: 8 },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tile: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Figma asks for 19.58 leading on a 20px face, which clips the hamza on Android; the row
  // height is already pinned by the 46px tile, so the line box is given the room it needs.
  title: {
    ...typography.authOption,
    fontSize: 20,
    lineHeight: 28,
    color: colors.green,
    textAlign: 'auto',
    flex: 1,
  },
  desc: { ...typography.optLabel, color: colors.ink, textAlign: 'auto' },
});
