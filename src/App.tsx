import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { setDarkMode, themeBuild } from './store/system';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import ViewportProvider from './underpin/ViewportProvider';
import ThemeProvider from './underpin/ThemeProvider';

export default function App(): React.ReactElement | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    store.dispatch(setDarkMode(colorScheme));
  }, [colorScheme]);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          onBeforeLift={(): void => {
            store.dispatch(themeBuild());
          }}
          persistor={persistor}
        >
          <ViewportProvider>
            <ThemeProvider>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </ThemeProvider>
          </ViewportProvider>
        </PersistGate>
      </Provider>
    </AppearanceProvider>
  );
}
