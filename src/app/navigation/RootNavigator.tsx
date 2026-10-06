import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, OnboardingScreen } from '../../features/onboarding';
import { HomeScreen } from '../../features/home';
import { ProductDetailsScreen } from '../../features/products';
import { QuoteScreen } from '../../features/quote';
import {
  LoginGateScreen,
  LoginPhoneScreen,
  LoginOtpScreen,
  SignupPhoneScreen,
  SignupOtpScreen,
  SignupDoneScreen,
} from '../../features/auth';
import {
  KycIntroScreen,
  KycCaptureScreen,
  KycIdCameraScreen,
  KycProcessingScreen,
  KycReviewScreen,
  LivenessIntroScreen,
  KycFaceScreen,
  KycVerifyingScreen,
  KycFailedScreen,
} from '../../features/kyc';
import {
  CheckoutPersonalScreen,
  CheckoutBeneficiariesScreen,
  CheckoutMedicalScreen,
  CheckoutPaymentScreen,
  PaymentFailedScreen,
  PolicyIssuedScreen,
} from '../../features/checkout';
import { LegalScreen } from '../../features/legal';
import { FaqScreen } from '../../features/faq';

type SignupParams = { phone: string; product?: string };
type ProductParams = { product?: string } | undefined;

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

  KycCapture: SignupParams;

  KycIdCamera: SignupParams & { side: 'front' | 'back' };
  KycProcessing: SignupParams;
  KycReview: SignupParams;
  LivenessIntro: SignupParams;
  KycFace: SignupParams;
  KycVerifying: SignupParams;

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
