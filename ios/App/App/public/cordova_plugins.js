
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-geolocation.Coordinates",
          "file": "plugins/cordova-plugin-geolocation/www/Coordinates.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "Coordinates"
        ]
        },
      {
          "id": "cordova-plugin-request-location-accuracy.RequestLocationAccuracy",
          "file": "plugins/cordova-plugin-request-location-accuracy/www/ios/RequestLocationAccuracy.js",
          "pluginId": "cordova-plugin-request-location-accuracy",
        "clobbers": [
          "cordova.plugins.locationAccuracy"
        ]
        },
      {
          "id": "cordova-plugin-android-permissions.Permissions",
          "file": "plugins/cordova-plugin-android-permissions/www/permissions-dummy.js",
          "pluginId": "cordova-plugin-android-permissions",
        "clobbers": [
          "cordova.plugins.permissions"
        ]
        },
      {
          "id": "cordova-plugin-nativegeocoder.NativeGeocoder",
          "file": "plugins/cordova-plugin-nativegeocoder/www/NativeGeocoder.js",
          "pluginId": "cordova-plugin-nativegeocoder",
        "clobbers": [
          "nativegeocoder"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.geolocation",
          "file": "plugins/cordova-plugin-geolocation/www/geolocation.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "navigator.geolocation"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.Position",
          "file": "plugins/cordova-plugin-geolocation/www/Position.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "Position"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.PositionError",
          "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "PositionError"
        ]
        },
      {
          "id": "cordova-plugin-settings.settings",
          "file": "plugins/cordova-plugin-settings/www/settings.js",
          "pluginId": "cordova-plugin-settings",
        "merges": [
          "settings"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-android-permissions": "1.1.5",
      "cordova-plugin-geolocation": "4.1.0",
      "cordova-plugin-nativegeocoder": "3.5.1",
      "cordova-plugin-request-location-accuracy": "2.3.0",
      "cordova-plugin-settings": "1.0.1"
    };
    // BOTTOM OF METADATA
    });
    