import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.countr.app',
  appName: 'CountR',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '297265865723-fsm2t4rchjvango6o89hgh0r2rhsdble.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    SplashScreen: {
      launchShowDuration: 3500,
      launchAutoHide: true,
      // backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    }
  },
  "android": {
    "allowMixedContent": true
  }
};

export default config;
