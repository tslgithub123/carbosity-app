import React, { useEffect } from 'react';
import { View, StyleSheet, LogBox, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '.';
import ExploreScreen from './explore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import ElectricityHome from '../electricity';

const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);

export default function MyComponent() {
  const { colors } = useTheme();
  const tabBarColor = colors.card;
  const bgColor = colors.background;
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(bgColor);
      NavigationBar.setButtonStyleAsync('light');
    }
    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setBackgroundColorAsync(bgColor);
        NavigationBar.setButtonStyleAsync('dark');
      }
    };
  }, [tabBarColor]);

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: tabBarColor,
            elevation: 0,
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            style={{
              backgroundColor: bgColor,
              elevation: 0,
              borderTopWidth: 0,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 30 });
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;
              return typeof label === 'string' ? label : undefined;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialCommunityIcons
                  name="home"
                  size={24}
                  color={focused ? '#6200ee' : '#999'}
                />
              );
            },
          }}
        />
        {/* <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={focused ? '#03dac6' : '#999'}
                />
              );
            },
          }}
        /> */}
        <Tab.Screen
          name="Electricity"
          component={ElectricityHome}
          options={{
            headerShown: true,
            tabBarLabel: 'Electricity',
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={24}
                  color={focused ? '#e5e536' : '#999'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
