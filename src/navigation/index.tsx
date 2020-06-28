import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { StackHeaderMode } from '@react-navigation/stack/lib/typescript/src/types.d';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../../types';
import RootBottomTabNavigator from './RootBottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ThemeProvider from '../underpin/ThemeProvider';
import { RootState } from '../store';
import RootMenuBarNavigator from './RootMenuBarNavigator';

export default function Navigation(): React.ReactElement {
  const { darkMode } = useSelector((state: RootState) => state.system);

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
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
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
