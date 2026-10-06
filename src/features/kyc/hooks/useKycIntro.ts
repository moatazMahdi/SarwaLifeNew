export function useKycIntro({ navigation, route }: any) {
  const params = route?.params ?? {};
  return {
    onBack: () => navigation?.goBack(),
    onStart: () => navigation?.navigate('KycCapture', params),
  };
}
