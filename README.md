# react-native-todo
Simple todo list using react native android
Inspired by iOS todo: https://github.com/hellokoding/todoapp-reactnative.

To use:
* Follow instructions under react-native etting Started Page: https://facebook.github.io/react-native/docs/getting-started.html
  Be sure to click the "Building Projects with Native Code" tab to follow instructions to install the emulator
* After cloning this project, run npm install in the project root
* Launch an Android virtual device. (In Android Studio, go to Tools->Android->AVD Manager and launch the device created after following getting-started instructions
* In a terminal window, run `npm start -- --reset-cache`  Keep that window up.
* In another window, run `react-native run-android` to start the app.

It is also useful to launch some debug tools:
* run `react-native log-android` in another terminal window to view log output (including console.logs)
* Frappe (https://github.com/niftylettuce/frappe) is helpful for shaking the device to launch the developer menu (and enable live reload)
* `npm install -g react-devtools` will install the react devtools. This allows running the command `react-devtools` to view the react inspector



