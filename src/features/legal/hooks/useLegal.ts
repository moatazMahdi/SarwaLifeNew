import { useCallback } from 'react';
import { S } from '../../../shared/i18n';
import { PRIVACY, TERMS } from '../constants';

export function useLegal({ navigation, route }: any) {
  const isPrivacy = route?.params?.kind === 'privacy';
  const onBack = useCallback(() => navigation?.goBack(), [navigation]);

  return {
    doc: isPrivacy ? S.legal.privacy : S.legal.terms,
    sections: isPrivacy ? PRIVACY : TERMS,
    onBack,
  };
}
