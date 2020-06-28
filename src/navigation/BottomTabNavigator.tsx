import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../../types';
import ThemeProvider, { applyTheme } from '../underpin/ThemeProvider';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): React.ReactElement {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: ThemeProvider.value('$tintColor') }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  const styles = applyTheme(localStyles);
  return <Ionicons size={30} style={styles.icon} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen name="TabOneScreen" component={TabOneScreen} options={{ headerTitle: 'Tab One Title' }} />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={TabTwoScreen} options={{ headerTitle: 'Tab Two Title' }} />
    </TabTwoStack.Navigator>
  );
}

const styles = ThemeProvider.create({
  icon: {
    marginBottom: -3,
  },
});
const localStyles = styles;
