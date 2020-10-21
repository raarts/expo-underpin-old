import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useSelector } from 'react-redux';
import { ActivityIndicator, Linking, Platform } from 'react-native';
import { StackHeaderMode } from '@react-navigation/stack/lib/typescript/src/types.d';
import AsyncStorage from '@react-native-community/async-storage';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../../types';
import RootBottomTabNavigator from './RootBottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ThemeProvider from '../underpin/ThemeProvider';
import { RootState } from '../store';
import RootMenuBarNavigator from './RootMenuBarNavigator';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function Navigation(): React.ReactElement {
  const { darkMode } = useSelector((state: RootState) => state.system);
  const [isReady, setIsReady] = React.useState(!__DEV__); // only in dev mode for the moment
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web') {
          if (initialUrl == null || initialUrl.startsWith('exp://')) {
            // Only restore state if there's no deep link and we're not on web
            const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
            const state = savedStateString ? JSON.parse(savedStateString) : undefined;

            if (state !== undefined) {
              setInitialState(state);
            }
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState().then();
    }
  }, [isReady]);

  const theme = {
    dark: darkMode === 'dark',
    colors: {
      primary: ThemeProvider.value('$navPrimary'),
      background: ThemeProvider.value('$navBackground'),
      card: ThemeProvider.value('$navCard'),
      text: ThemeProvider.value('$navText'),
      border: ThemeProvider.value('$navBorder'),
    },
  };
  if (!isReady) {
    return <ActivityIndicator />;
  }
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
      linking={LinkingConfiguration}
      theme={theme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [MenuOrTabNavigator, headerMode] = chooseMenuOrTab();
  return (
    <Stack.Navigator headerMode={headerMode} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={MenuOrTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function chooseMenuOrTab(): [() => React.ReactElement, StackHeaderMode] {
  if (Platform.OS === 'web') {
    return [RootMenuBarNavigator, 'none'];
  }
  return [RootBottomTabNavigator, 'none'];
}
