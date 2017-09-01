package com.athome;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
      return mCallbackManager;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
      FacebookSdk.sdkInitialize(getApplicationContext());
      // If you want to use AppEventsLogger to log events.
      AppEventsLogger.activateApp(this);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new RNGooglePlacesPackage(),
            new SnackbarPackage(),
                new FBSDKPackage(mCallbackManager),
                new LinearGradientPackage(),
                new ExtraDimensionsPackage(),
                new VectorIconsPackage()
          );
        }
    };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

}