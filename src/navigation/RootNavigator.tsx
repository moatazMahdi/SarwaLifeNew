import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { QuoteScreen } from '../screens/quote/QuoteScreen';
import { LoginGateScreen } from '../screens/auth/LoginGateScreen';
import { LoginPhoneScreen } from '../screens/auth/LoginPhoneScreen';
import { LoginOtpScreen } from '../screens/auth/LoginOtpScreen';
import { SignupPhoneScreen } from '../screens/auth/SignupPhoneScreen';
import { SignupOtpScreen } from '../screens/auth/SignupOtpScreen';
import { SignupDoneScreen } from '../screens/auth/SignupDoneScreen';
import { KycIntroScreen } from '../screens/kyc/KycIntroScreen';
import { KycCaptureScreen } from '../screens/kyc/KycCaptureScreen';
import { KycIdCameraScreen } from '../screens/kyc/KycIdCameraScreen';
import { KycProcessingScreen } from '../screens/kyc/KycProcessingScreen';
import { KycReviewScreen } from '../screens/kyc/KycReviewScreen';
import { LivenessIntroScreen } from '../screens/kyc/LivenessIntroScreen';
import { KycFaceScreen } from '../screens/kyc/KycFaceScreen';
import { KycVerifyingScreen } from '../screens/kyc/KycVerifyingScreen';
import { KycFailedScreen } from '../screens/kyc/KycFailedScreen';
import { CheckoutPersonalScreen } from '../screens/checkout/CheckoutPersonalScreen';
import { CheckoutBeneficiariesScreen } from '../screens/checkout/CheckoutBeneficiariesScreen';
import { CheckoutMedicalScreen } from '../screens/checkout/CheckoutMedicalScreen';
import { CheckoutPaymentScreen } from '../screens/checkout/CheckoutPaymentScreen';
import { PaymentFailedScreen } from '../screens/checkout/PaymentFailedScreen';
import { PolicyIssuedScreen } from '../screens/checkout/PolicyIssuedScreen';
import { LegalScreen } from '../screens/legal/LegalScreen';
import { FaqScreen } from '../screens/FaqScreen';

type SignupParams = { phone: string; product?: string };
type ProductParams = { product?: string } | undefined;
/** Carried verbatim from step 4 through the gateway, so a retry re-runs the same charge. */
type PaymentParams = { product?: string; method: string; amount: number; cycle: string };

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: { step: number };
  Home: ProductParams;
  ProductDetails: { product: string };
  Quote: { product: string };
  LoginGate: ProductParams;
  LoginPhone: ProductParams;
  LoginOtp: { phone: string; product?: string };
  SignupPhone: ProductParams;
  SignupOtp: { phone: string; product?: string };
  KycIntro: SignupParams;
  /** Both sides live on one screen, so this route carries no `side` of its own. */
  KycCapture: SignupParams;
  /** `side` picks which slot the shot is written back into. */
  KycIdCamera: SignupParams & { side: 'front' | 'back' };
  KycProcessing: SignupParams;
  KycReview: SignupParams;
  LivenessIntro: SignupParams;
  KycFace: SignupParams;
  KycVerifying: SignupParams;
  /** `stage` picks which of the two rejections the screen wears, and where retry goes. */
  KycFailed: SignupParams & { stage: 'id' | 'liveness' };
  SignupDone: SignupParams;
  CheckoutPersonal: ProductParams;
  CheckoutBeneficiaries: ProductParams;
  CheckoutMedical: ProductParams;
  CheckoutPayment: ProductParams;
  PaymentFailed: PaymentParams;
  PolicyIssued: PaymentParams | { product?: string } | undefined;
  Terms: { kind?: 'terms' | 'privacy' } | undefined;
  Privacy: { kind?: 'terms' | 'privacy' } | undefined;
  /** Reachable from home at any point, so it carries nothing in from where it was opened. */
  Faq: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Quote" component={QuoteScreen} />

        <Stack.Screen name="LoginGate" component={LoginGateScreen} />
        <Stack.Screen name="LoginPhone" component={LoginPhoneScreen} />
        <Stack.Screen name="LoginOtp" component={LoginOtpScreen} />
        <Stack.Screen name="SignupPhone" component={SignupPhoneScreen} />
        <Stack.Screen name="SignupOtp" component={SignupOtpScreen} />

        <Stack.Screen name="KycIntro" component={KycIntroScreen} />
        <Stack.Screen name="KycCapture" component={KycCaptureScreen} />
        {/* Opened over the capture screen, which stays mounted underneath holding the other
            side's preview. `animation: fade` because a camera sliding in from the edge
            shows a frame of black viewfinder travelling across the page. */}
        <Stack.Screen
          name="KycIdCamera"
          component={KycIdCameraScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="KycProcessing" component={KycProcessingScreen} />
        <Stack.Screen name="KycReview" component={KycReviewScreen} />
        <Stack.Screen name="LivenessIntro" component={LivenessIntroScreen} />
        <Stack.Screen name="KycFace" component={KycFaceScreen} />
        <Stack.Screen name="KycVerifying" component={KycVerifyingScreen} />
        {/* The back gesture is taken away for the same reason it is on the payment failure:
            behind this screen is a loader that would re-run the check it just reported on. */}
        <Stack.Screen
          name="KycFailed"
          component={KycFailedScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="SignupDone" component={SignupDoneScreen} />

        <Stack.Screen name="CheckoutPersonal" component={CheckoutPersonalScreen} />
        <Stack.Screen name="CheckoutBeneficiaries" component={CheckoutBeneficiariesScreen} />
        <Stack.Screen name="CheckoutMedical" component={CheckoutMedicalScreen} />
        <Stack.Screen name="CheckoutPayment" component={CheckoutPaymentScreen} />
        {/* Past the point of no return: the charge is settled either way, so the back
            gesture is taken away rather than left to undo a step the user cannot undo. */}
        <Stack.Screen
          name="PaymentFailed"
          component={PaymentFailedScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="PolicyIssued"
          component={PolicyIssuedScreen}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen name="Terms" component={LegalScreen} initialParams={{ kind: 'terms' }} />
        <Stack.Screen name="Privacy" component={LegalScreen} initialParams={{ kind: 'privacy' }} />
        <Stack.Screen name="Faq" component={FaqScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
