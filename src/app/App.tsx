import React from 'react';
import { I18nManager, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from '../shared/i18n';
import { FlowProvider } from '../shared/state/FlowContext';
import { RootNavigator } from './navigation/RootNavigator';
import { styles } from './App.styles';

I18nManager.swapLeftAndRightInRTL(false);
I18nManager.allowRTL(true);

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
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
