import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function useBackGuard(optOut?: () => void) {
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        optOut?.();

        return true;
      });
      return () => sub.remove();
    }, [optOut]),
  );
}
