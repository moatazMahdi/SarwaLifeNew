import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Stops Android's hardware back button from popping the screen that mounts this.
 *
 * `options={{ gestureEnabled: false }}` on a stack screen only takes away the *swipe*. It
 * says nothing about the physical button, which is still wired straight to `goBack()` — so
 * three screens in this app that were deliberately made one-way were one-way on iOS and
 * perfectly reversible on the Xiaomi this is built for:
 *
 *   • `PolicyIssued` — back landed on the payment step of a policy that had already been
 *     issued and paid for, where "اصدار الوثيقة" was still live and would issue a second one.
 *   • `PaymentFailed` — back landed on the same payment step with the consent box cleared,
 *     behind an attempt the gateway had already counted.
 *   • `KycFailed` — back landed on `KycVerifying`, a loader whose whole job is to re-run the
 *     check it had just reported on, so the rejection screen reappeared by itself a second
 *     later. The user could not get out of it except by pressing back fast enough to beat
 *     the timer.
 *
 * `optOut` is the screen's own answer to the button when it has one — `PolicyIssued` sends
 * it home, because a finished policy has somewhere sensible to go and a button that does
 * nothing at all reads as a frozen app. Omit it on the two failure screens: both carry two
 * labelled doors of their own, and silence is the honest reply to "undo this".
 *
 * Bound through `useFocusEffect` rather than a plain `useEffect`: a native-stack screen
 * stays mounted underneath whatever is pushed over it, and a listener that outlived focus
 * would keep swallowing the button on screens that want it.
 */
export function useBackGuard(optOut?: () => void) {
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        optOut?.();
        // `true` = handled. Without it the event falls through to the navigator, which pops.
        return true;
      });
      return () => sub.remove();
    }, [optOut]),
  );
}
