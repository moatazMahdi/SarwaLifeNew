package com.sarwalife.app

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.modules.i18nmanager.I18nUtil

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    seedLayoutDirection()
    loadReactNative(this)
  }

  /**
   * Makes a fresh install come up right-to-left, before React is loaded.
   *
   * Arabic is the product's first language, so the first frame has to be RTL. JavaScript
   * cannot arrange that on its own: `I18nProvider` does call `forceRTL(true)` on boot, but
   * React Native fixes a view's layout direction when it *builds* the view, so the flag only
   * bites on the next start — and a release build has no reload module to force one. The
   * first launch after an install therefore rendered the whole app Arabic inside an LTR
   * tree: rows mirrored, the logo on the wrong edge, every directional arrow backwards. It
   * came good on the second launch, which is the one a first-time user does not make.
   *
   * Seeded once, never re-applied: `forceRTL` persists into React Native's own preferences,
   * so a later switch to English must survive every cold start after it. The marker below is
   * what distinguishes "nobody has chosen yet" from "the user chose LTR".
   */
  private fun seedLayoutDirection() {
    val prefs = getSharedPreferences(BOOT_PREFS, Context.MODE_PRIVATE)
    if (prefs.getBoolean(KEY_DIRECTION_SEEDED, false)) return
    I18nUtil.instance.allowRTL(this, true)
    I18nUtil.instance.forceRTL(this, true)
    prefs.edit().putBoolean(KEY_DIRECTION_SEEDED, true).apply()
  }

  private companion object {
    const val BOOT_PREFS = "sarwa.boot"
    const val KEY_DIRECTION_SEEDED = "direction.seeded"
  }
}
