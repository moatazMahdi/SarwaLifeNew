This is a bare React Native CLI mobile application (no Expo). Prioritize mobile-first patterns, performance, and cross-platform compatibility. The app is **bilingual Arabic/English** and Arabic-first: Arabic is the default on a fresh install and lays out RTL, English lays out LTR. The language is owned by [src/shared/i18n/](src/shared/i18n/).

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

## Architecture (feature-based)

```
src/
  app/                 App.tsx (+ App.styles.ts) and navigation/RootNavigator.tsx
  features/<feature>/  onboarding · home · products · quote · auth · kyc · checkout · legal · faq
    screens/           route components: composition only, no styles, no logic
    hooks/             the screen's logic (useXxx), returned to the screen
    components/        <Name>/<Name>.tsx + <Name>/<Name>.styles.ts, ONE components/index.ts
    services/          integration stubs (gateway, demoOutcome)
    utils/ context/    pure helpers and React contexts used only by this feature
    constants.ts       feature constants, data tables and image sources
    index.ts           public surface: the screens the navigator registers
  shared/
    components/        same layout as above: one folder per component, ONE index.ts
    hooks/             shared logic (usePressScale, useBrandLoader, usePhoneEntry, useBackGuard…)
    utils/             pure helpers (phone.ts, support.ts)
    state/             FlowContext
    data/              product catalogue
    i18n/              I18nProvider, lang, strings.ts + ns/* (all copy)
    theme/             colors, gradients, typography, spacing, transforms (animated style helpers)
  assets/              images, icons, fonts: do NOT move (fonts are linked natively by path)
```

Component rules:
- **No raw RN primitives.** Use `Box`, `Row`, `Screen`, `AppText`, `Touchable`, `Scroll`, `AppImage`, `AppInput`, `SafeArea`, `KeyboardAvoid`, `AnimatedBox`, `AnimatedText`, `AnimatedTouchable` from `shared/components`. Only those primitive folders import `View`/`Text`/`Pressable`/`ScrollView`/`Image`/`TextInput`/`KeyboardAvoidingView`/`SafeAreaView`.
- **Styles never live in a `.tsx`.** Static styles go in `<Name>.styles.ts`. Dynamic ones (insets, colours, animated values) are functions exported from the same styles file (`dynamic.hero(top)`, `tileTint(tint)`, `scaleStyle(scale)`). Gradient configs are constants there too.
- **One `Button`** for every button-shaped control. Variants are a table in `Button.styles.ts` (`variantSpec`): `primary` (animated brand CTA, `loading`/`disabled`), `hero`, `brand`, `gradient`, `goldGlow` (gradient fills), `secondary`, `outline`, `plain`, `light`, `pill`, `chip`, `fab`, `badge`, `gold`, `translucent`, `ghost`, `link`, `counter`, and icon-only `glass`, `glassRound`, `icon`, `round`, `tool`, `shutter`. Labelled variants take `startIcon`/`endIcon`; icon-only variants take `icon`. Per-instance layout (flex, margin) goes in the caller's styles file via `style`. Add a variant instead of a new button component.
- **No code comments** anywhere in the app.
- ESLint enforces the primitive, StyleSheet-in-tsx and inline-style rules on all of `src/` (only the primitive folders are exempt). `npx eslint .` must stay at zero problems.

Dependency rules:
- `shared/` never imports from `features/`.
- A feature never imports another feature's internals. If two features need something, move it to `shared/`.
- Features import shared components through the barrel (`shared/components`). Inside `shared/components`, siblings import each other by direct path (`../Icon/Icon`) to avoid cycles.
- The navigator imports screens only through each feature's `index.ts`.
- Copy stays centralized in `shared/i18n` so shared components can use it without breaking the first rule.

## Navigation & Routing

- Uses **React Navigation** (`@react-navigation/native` + `@react-navigation/native-stack`). The stack is defined in [src/app/navigation/RootNavigator.tsx](src/app/navigation/RootNavigator.tsx).

## Localization (ar / en)

- All copy lives in [src/shared/i18n/strings.ts](src/shared/i18n/strings.ts) as `[arabic, english]` pairs under a per-screen namespace. Screens read it with `const { t } = useI18n()` and `t(S.namespace.key)` — phrases are passed as **values, not string keys**, so a typo is a compile error rather than a blank label found on a device.
- Keep the Arabic byte-identical to the Figma copy. It is both the design source of truth and the fallback: `t()` falls back to Arabic when an English string is empty.
- **The rollout is incremental.** Screens that still hold inline Arabic literals simply stay Arabic in English mode; nothing breaks. Converting a screen means adding its namespace to `strings.ts` and swapping its literals for `t(...)`.
- Switching language also flips the native layout direction, which **requires an app restart** — RN fixes a view's direction when it is created. `I18nProvider` handles this: it persists the choice, lines `I18nManager.forceRTL` up with it, and reloads. `DevSettings.reload()` only exists in dev builds; a release build shows a "reopen the app" alert instead, so add a native restart module before shipping.
- Never hardcode `flexDirection: 'row-reverse'` to achieve a physical order — it only works in one direction. Plain `row` mirrors correctly on its own; when a row must stay physically left-to-right in **both** languages (an OTP code, a phone number), branch on `I18nManager.isRTL` as [src/features/auth/components/OtpInput.tsx](src/features/auth/components/OtpInput.tsx) does.
- Glyphs that point *forward* in the reading direction (row chevrons, "next" arrows) are drawn pre-mirrored for Arabic. Render them with `<Icon ... directional />` so they flip back under LTR.
- Digits are bidi-neutral: a **grouped** number (`10 002 772 33`, `+20 10 •••• 33`) inside an RTL paragraph has its groups reordered right-to-left. Prefix such strings with the `LRM` constant from [src/shared/utils/phone.ts](src/shared/utils/phone.ts).

## Rules

- `ios/` and `android/` are real, hand-maintained native projects (not generated) — edit native config directly (Info.plist, AndroidManifest.xml, Podfile, build.gradle) when native behavior needs to change.
- After adding a library with native code, run `pod install` (iOS) and rebuild via `run-ios`/`run-android` — Metro alone won't pick up native linking changes.
- Prefer well-maintained community RN packages (check `npm` downloads/maintenance) since there's no Expo SDK curation layer here.
- The app font is **IBM Plex Sans Arabic**. The `.ttf` files live in `src/assets/fonts/` and are linked natively via `react-native.config.js` (`npx react-native-asset`). Plex Arabic ships only Regular/Medium/SemiBold/Bold — there is no ExtraBold or Black cut, so the `extraBold`/`black` aliases in `src/shared/theme/typography.ts` both resolve to Bold. Font changes need a **native rebuild**, not just a Metro reload.
- **Never use `textAlign: 'right'` on `<Text>`.** On Android, RN swaps `textAlign` `left`/`right` whenever the node's layout direction is RTL, so `'right'` renders on the physical **left**. This is independent of `I18nManager.swapLeftAndRightInRTL`, which only governs absolute `left`/`right` offsets. Use **`textAlign: 'auto'`** for Arabic copy — it resolves to the writing-direction start (physical right under RTL) on both platforms. The `textAlign="right"` **prop** on `<TextInput>` is *not* swapped and is fine as-is.
- Do not use `adjustsFontSizeToFit` — on Android it silently breaks text alignment, which matters everywhere in this RTL app.

<!-- openwolf:begin -->
# OpenWolf

This project uses OpenWolf for context management. Read and follow .wolf/OPENWOLF.md at session start. Check .wolf/cerebrum.md before generating code. Grep .wolf/anatomy.md for a file's path before reading it (never read the whole index).
<!-- openwolf:end -->
