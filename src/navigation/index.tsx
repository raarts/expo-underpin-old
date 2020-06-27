import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useSelector } from 'react-redux';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ThemeProvider from '../underpin/ThemeProvider';
import { RootState } from '../store';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
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

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
