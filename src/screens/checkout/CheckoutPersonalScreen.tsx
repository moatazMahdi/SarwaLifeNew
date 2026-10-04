import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { IssueLayout, IssueHeading } from '../../components/IssueLayout';
import { PolicyChip } from '../../components/PolicyChip';
import { SummaryCard, SummaryField, SummaryGrid } from '../../components/SummaryCard';
import { Icon } from '../../components/Icon';
import { getProduct } from '../../data/products';
import { EditDetailsSheet } from './EditDetailsSheet';
import { DEMO_PROFILE, useFlow } from '../../state/FlowContext';
import { Phrase, S, useI18n } from '../../i18n';

/**
 * Figma 2071:5466 — step 1 of "اصدار الوثيقة".
 *
 * The user reaches this screen having already priced a policy and proved who they are, so
 * the screen asks for nothing: it reads the quote back at the top and the verified ID data
 * underneath, every row ticked. The earlier build collected an email and an address here;
 * neither is in the comp and neither is needed to issue, so both are gone — a form field
 * in front of a user who has just finished a form is the thing most likely to lose them.
 */
export function CheckoutPersonalScreen({ navigation, route }: any) {
  const { t, n } = useI18n();
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);
  const p = flow.profile ?? DEMO_PROFILE;
  const [editing, setEditing] = useState(false);

  // Labels translate; the values are what was read off the ID card, so they stay as they
  // were captured whichever language the app is in. The age is the exception — it is a
  // number this app worked out, not a string the card carried, so it switches digit sets
  // and takes a translated unit.
  const fields: [label: Phrase, value: string][] = [
    [S.checkout.personal.fullName, p.fullName],
    [S.checkout.personal.nationalId, p.nationalId],
    [S.checkout.personal.governorate, p.governorate],
    [S.checkout.personal.city, p.city],
    [S.checkout.personal.age, `${n(p.age)} ${t(S.checkout.personal.years)}`],
    [S.checkout.personal.maritalStatus, p.maritalStatus],
  ];

  return (
    <IssueLayout
      step={1}
      onBack={() => navigation?.goBack()}
      footer={
        <PrimaryButton
          label={t(S.common.next)}
          onPress={() => navigation?.navigate('CheckoutBeneficiaries', { product: product.key })}
        />
      }
    >
      <PolicyChip
        product={product}
        cover={flow.quote.cover ?? 0}
        monthly={flow.result?.monthly ?? 0}
      />

      <IssueHeading
        title={S.checkout.personal.title}
        subtitle={S.checkout.personal.subtitle}
      />

      <SummaryCard
        footer={
          /* Opens the sheet rather than navigating back to "راجع بياناتك": that screen is
             four steps behind the user, and sending them there to fix a spelling means
             walking forward through liveness and the stepper all over again. */
          <Pressable
            onPress={() => setEditing(true)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.editPill, pressed && styles.pressed]}
          >
            {/* Label first so it takes the row's start under either direction. */}
            <Text style={styles.editLabel}>{t(S.checkout.personal.edit)}</Text>
            <Icon name="docEdit" size={18} color={colors.goldTx} />
          </Pressable>
        }
      >
        <SummaryGrid>
          {/* Keyed on the Arabic half, which does not move when the language does. */}
          {fields.map(([label, value]) => (
            <SummaryField key={label[0]} label={label} value={value} />
          ))}
        </SummaryGrid>
      </SummaryCard>

      <EditDetailsSheet
        visible={editing}
        profile={p}
        onSave={flow.setProfile}
        onClose={() => setEditing(false)}
      />
    </IssueLayout>
  );
}

const styles = StyleSheet.create({
  editPill: {
    // Stretched across the card, as the comp draws it — a full-width bar reads as the
    // card's own action, where a centred capsule read as a loose chip sitting under it.
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 40,
    paddingHorizontal: 18,
    // The comp's 1222 radius is just "fully round" written out; the pill is 40 tall, so
    // anything past 20 is the same shape.
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  editLabel: { ...typography.optSubtitle, fontSize: 14, lineHeight: 24, color: colors.goldTx },
  pressed: { opacity: 0.7 },
});
