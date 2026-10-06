export function useLivenessIntro({ navigation, route }: any) {
  const params = route?.params ?? {};
  return {
    onBack: () => navigation?.goBack(),
    onStart: () => navigation?.navigate('KycFace', params),
  };
}
