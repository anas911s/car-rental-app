import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/components/navigation/HomeScreen';
import CarsScreen from '@/components/navigation/CarsScreen';
import SettingsScreen from '@/components/navigation/SettingsScreen';
import InfoScreen from '@/components/navigation/InfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#FFA500',
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cars" component={CarsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFC148',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 10,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

