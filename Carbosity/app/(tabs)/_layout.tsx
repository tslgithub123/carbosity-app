import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '.';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as NavigationBar from 'expo-navigation-bar';
import ElectricityHome from '../electricity';
import { Colors } from '@/constants/Colors';
import Settings from '../profile';
import useAuthStore from '@/store/useAuthStore';
import Profile from '../profile';
import Test from '../welcome/test';
import { MaterialTheme } from '@/constants/MaterialTheme';
import AddScreen from './add';
import LifestyleScreen from './lifestyle';

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  const theme = useTheme();
  const { user } = useAuthStore();

  // Dynamically get colors based on the MaterialTheme
  const headerColor = theme.dark ? MaterialTheme.schemes.dark.background : MaterialTheme.schemes.light.background;
  const tabBarBackgroundColor = theme.dark ? MaterialTheme.schemes.dark.background : MaterialTheme.schemes.light.background;
  const tabBarIconColor = theme.dark ? MaterialTheme.schemes.dark.onBackground : MaterialTheme.schemes.light.onBackground;
  const focusedTabBarIconColor = theme.dark ? MaterialTheme.schemes.dark.primary : MaterialTheme.schemes.light.primary;

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(tabBarBackgroundColor);
      NavigationBar.setButtonStyleAsync(theme.dark ? 'light' : 'dark');
    }
  }, [theme, tabBarBackgroundColor]);

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            style={{
              backgroundColor: tabBarBackgroundColor,
              elevation: 0,
              //borderTopWidth: 1, // Add border to separate tabs from screen
              //borderTopColor: theme.dark ? MaterialTheme.schemes.dark.outlineVariant : Colors.light.tint, // Set border color
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
            renderIcon={({ route, focused }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({
                  focused,
                  color: focused ? focusedTabBarIconColor : tabBarIconColor,
                  size: 30,
                });
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
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home-variant"
                size={24}
                color={focused ? focusedTabBarIconColor : tabBarIconColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            
            tabBarLabel: 'Add',
            
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color={focused ? focusedTabBarIconColor : tabBarIconColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lifestyle"
          component={LifestyleScreen}
          options={{
           
            tabBarLabel: 'Lifestyle',
            tabBarLabelStyle: {
              color: theme.dark ? Colors.dark.text : Colors.light.text,
            },
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="leaf"
                size={24}
                color={focused ? focusedTabBarIconColor : tabBarIconColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="My Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: headerColor,
            },
            headerTintColor: theme.colors.primary,
            tabBarLabel: user?.firstName || 'Profile',
            tabBarLabelStyle: {
              color: theme.dark ? Colors.dark.text : Colors.light.text,
            },
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={focused ? focusedTabBarIconColor : tabBarIconColor}
              />
            ),
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
