import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    seedLayoutDirection()

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "SarwaLife",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  /// Makes a fresh install come up right-to-left, before React Native reads the flag.
  ///
  /// The counterpart of `seedLayoutDirection()` in `MainApplication.kt`, and there for the
  /// same reason: Arabic is the product's first language, and `I18nProvider` cannot set the
  /// direction for the frame it is already rendering — React Native fixes a view's direction
  /// when it builds the view. Without this, the first launch after an install draws the whole
  /// app Arabic inside an LTR tree and only corrects itself on the second launch.
  ///
  /// Written straight to `UserDefaults` because that is precisely what `RCTI18nUtil` reads;
  /// going through the class would mean importing it this early for no gain. Seeded once, so
  /// that a later switch to English is not undone on every cold start.
  private func seedLayoutDirection() {
    let defaults = UserDefaults.standard
    guard !defaults.bool(forKey: "SarwaLife_directionSeeded") else { return }
    defaults.set(true, forKey: "RCTI18nUtil_allowRTL")
    defaults.set(true, forKey: "RCTI18nUtil_forceRTL")
    defaults.set(true, forKey: "SarwaLife_directionSeeded")
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
