This is a bare React Native CLI mobile application (no Expo). Prioritize mobile-first patterns, performance, and cross-platform compatibility. The app is **bilingual Arabic/English** and Arabic-first: Arabic is the default on a fresh install and lays out RTL, English lays out LTR. The language is owned by [src/i18n/](src/i18n/).

## Commands

```bash
npx react-native start              # start the Metro dev server
npx react-native run-ios            # build & run on iOS (requires Xcode)
npx react-native run-android        # build & run on Android (requires Android Studio)
npx tsc --noEmit                    # typecheck
npx eslint .                        # lint
cd ios && bundle exec pod install   # install/update CocoaPods after native dep changes
```

Run typecheck (and lint, where feasible) before declaring any task done. Actual device/simulator runs may not be verifiable in every environment — if Xcode/Android Studio aren't installed, fall back to `tsc --noEmit` plus a Metro bundle smoke test:
```bash
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output /tmp/out.jsbundle
```

## Navigation & Routing

- Uses **React Navigation** (`@react-navigation/native` + `@react-navigation/native-stack`). The stack is defined in [src/navigation/RootNavigator.tsx](src/navigation/RootNavigator.tsx).
- Screens live under `src/screens/`, reusable UI under `src/components/`, design tokens under `src/theme/`.

## Localization (ar / en)

- All copy lives in [src/i18n/strings.ts](src/i18n/strings.ts) as `[arabic, english]` pairs under a per-screen namespace. Screens read it with `const { t } = useI18n()` and `t(S.namespace.key)` — phrases are passed as **values, not string keys**, so a typo is a compile error rather than a blank label found on a device.
- Keep the Arabic byte-identical to the Figma copy. It is both the design source of truth and the fallback: `t()` falls back to Arabic when an English string is empty.
- **The rollout is incremental.** Screens that still hold inline Arabic literals simply stay Arabic in English mode; nothing breaks. Converting a screen means adding its namespace to `strings.ts` and swapping its literals for `t(...)`.
- Switching language also flips the native layout direction, which **requires an app restart** — RN fixes a view's direction when it is created. `I18nProvider` handles this: it persists the choice, lines `I18nManager.forceRTL` up with it, and reloads. `DevSettings.reload()` only exists in dev builds; a release build shows a "reopen the app" alert instead, so add a native restart module before shipping.
- Never hardcode `flexDirection: 'row-reverse'` to achieve a physical order — it only works in one direction. Plain `row` mirrors correctly on its own; when a row must stay physically left-to-right in **both** languages (an OTP code, a phone number), branch on `I18nManager.isRTL` as [src/components/OtpInput.tsx](src/components/OtpInput.tsx) does.
- Glyphs that point *forward* in the reading direction (row chevrons, "next" arrows) are drawn pre-mirrored for Arabic. Render them with `<Icon ... directional />` so they flip back under LTR.
- Digits are bidi-neutral: a **grouped** number (`10 002 772 33`, `+20 10 •••• 33`) inside an RTL paragraph has its groups reordered right-to-left. Prefix such strings with the `LRM` constant from [src/screens/auth/LoginPhoneScreen.tsx](src/screens/auth/LoginPhoneScreen.tsx).

## Rules

- `ios/` and `android/` are real, hand-maintained native projects (not generated) — edit native config directly (Info.plist, AndroidManifest.xml, Podfile, build.gradle) when native behavior needs to change.
- After adding a library with native code, run `pod install` (iOS) and rebuild via `run-ios`/`run-android` — Metro alone won't pick up native linking changes.
- Prefer well-maintained community RN packages (check `npm` downloads/maintenance) since there's no Expo SDK curation layer here.
- The app font is **IBM Plex Sans Arabic**. The `.ttf` files live in `src/assets/fonts/` and are linked natively via `react-native.config.js` (`npx react-native-asset`). Plex Arabic ships only Regular/Medium/SemiBold/Bold — there is no ExtraBold or Black cut, so the `extraBold`/`black` aliases in `src/theme/typography.ts` both resolve to Bold. Font changes need a **native rebuild**, not just a Metro reload.
- **Never use `textAlign: 'right'` on `<Text>`.** On Android, RN swaps `textAlign` `left`/`right` whenever the node's layout direction is RTL, so `'right'` renders on the physical **left**. This is independent of `I18nManager.swapLeftAndRightInRTL`, which only governs absolute `left`/`right` offsets. Use **`textAlign: 'auto'`** for Arabic copy — it resolves to the writing-direction start (physical right under RTL) on both platforms. The `textAlign="right"` **prop** on `<TextInput>` is *not* swapped and is fine as-is.
- Do not use `adjustsFontSizeToFit` — on Android it silently breaks text alignment, which matters everywhere in this RTL app.
