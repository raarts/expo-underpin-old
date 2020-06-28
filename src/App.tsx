import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { setDarkMode } from './store/system';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import ViewportProvider from './underpin/ViewportProvider';
import ThemeProvider from './underpin/ThemeProvider';
import Navigation from './navigation';

// How to extend the RootNavigator concept to apply to multiple form factors and orientations
// import PortraitPhoneRootStackNavigator from './navigation/portrait/phone/RootStackNavigator';
// import PortraitTabletRootStackNavigator from './navigation/portrait/tablet/RootStackNavigator';
// import PortraitMonitorRootStackNavigator from './navigation/portrait/monitor/RootStackNavigator';
//
// import LandscapePhoneRootStackNavigator from './navigation/landscape/phone/RootStackNavigator';
// import LandscapeTabletRootStackNavigator from './navigation/landscape/tablet/RootStackNavigator';
// import LandscapeMonitorRootStackNavigator from './navigation/landscape/monitor/RootStackNavigator';
//
// const rootNavMatrix = {
//   portrait: {
//     phone: PortraitPhoneRootStackNavigator,
//     tablet: PortraitTabletRootStackNavigator,
//     monitor: PortraitMonitorRootStackNavigator,
//   },
//   landscape: {
//     phone: LandscapePhoneRootStackNavigator,
//     tablet: LandscapeTabletRootStackNavigator,
//     monitor: LandscapeMonitorRootStackNavigator,
//   },
// };

export default function App(): React.ReactElement | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    store.dispatch(setDarkMode(colorScheme));
  }, [colorScheme]);

  if (!isLoadingComplete) {
    return null;
  }

  // How to extend the RootNavigator concept to apply to multiple form factors and orientations
  // const { orientation, screenFormFactor } = useViewport();
  // const RootStackNavigator = rootNavMatrix[orientation][screenFormFactor];
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ViewportProvider>
            <ThemeProvider>
              <SafeAreaProvider>
                <Navigation />
                <StatusBar />
              </SafeAreaProvider>
            </ThemeProvider>
          </ViewportProvider>
        </PersistGate>
      </Provider>
    </AppearanceProvider>
  );
}
