import React from 'react';
import { I18nManager, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { FlowProvider } from './src/state/FlowContext';
import { I18nProvider } from './src/i18n';

// Keep absolute `left`/`right` offsets physical. RN defaults this to `true`, which mirrors
// every absolute offset once RTL is on — so Figma values would land on the wrong side.
// Flex direction still flips, as it should.
//
// NB: this flag does NOT govern `textAlign`. On Android, RN swaps `textAlign: 'left'`/
// `'right'` whenever the node's layout direction is RTL, regardless of this setting — so
// `textAlign: 'right'` renders on the physical LEFT. Use `textAlign: 'auto'` for Arabic
// copy: it resolves to the writing-direction start (right under RTL) on both platforms.
I18nManager.swapLeftAndRightInRTL(false);

// RTL is no longer forced on here. The app is bilingual, so the layout direction follows the
// chosen language and `I18nProvider` owns that decision — it reads the stored choice (Arabic
// on a fresh install), lines `forceRTL` up with it, and restarts when the two disagree.
I18nManager.allowRTL(true);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <I18nProvider>
          <FlowProvider>
            <RootNavigator />
          </FlowProvider>
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
