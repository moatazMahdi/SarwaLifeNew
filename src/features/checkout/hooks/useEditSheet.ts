import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import type { Profile } from '../../../shared/state/FlowContext';
import { SHEET_TRAVEL } from '../constants';

export function useEditSheet(
  visible: boolean,
  profile: Profile,
  onSave: (next: Profile) => void,
  onClose: () => void,
) {
  const anim = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(visible);
  const opening = useRef(false);
  const [draft, setDraft] = useState<Profile>(profile);

  useEffect(() => {
    if (visible) setDraft(profile);
  }, [visible, profile]);

  const animateIn = useCallback(() => {
    if (!opening.current) return;
    opening.current = false;
    Animated.timing(anim, {
      toValue: 1,
      duration: 320,
      easing: Easing.bezier(0.05, 0.7, 0.1, 1),
      useNativeDriver: true,
    }).start();
  }, [anim]);

  useEffect(() => {
    if (visible) {
      anim.setValue(0);
      opening.current = true;
      setMounted(true);
      const timer = setTimeout(animateIn, 120);
      return () => clearTimeout(timer);
    }
    opening.current = false;
    Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      easing: Easing.bezier(0.3, 0, 0.8, 0.15),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setMounted(false);
    });
  }, [visible, anim, animateIn]);

  function save() {
    const cleaned = Object.fromEntries(
      Object.entries(draft).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]),
    ) as Profile;
    onSave(cleaned);
    onClose();
  }

  return {
    anim,
    mounted,
    draft,
    setField: (key: keyof Profile, value: string) => setDraft((d) => ({ ...d, [key]: value })),
    animateIn,
    save,
    translateY: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [SHEET_TRAVEL, 0],
      extrapolate: 'clamp',
    }),
  };
}
