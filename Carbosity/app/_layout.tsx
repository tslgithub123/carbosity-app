import { useFonts } from 'expo-font';
import { Navigator, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemedView } from '@/components/ThemedView';
import { MaterialTheme } from '@/constants/MaterialTheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient()
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  
  const lightTheme = useMemo(
    () => ({
      colors: {
...MD3LightTheme,
        ...MaterialTheme.schemes.light,
      },
    }),
    []
  );

  const darkTheme = useMemo(
    () => ({
      ...MD3DarkTheme,
      colors: {
        ...MaterialTheme.schemes.dark,
      },
    }),
    []
  );

  const theme = useMemo(() => (colorScheme === 'dark' ? darkTheme : lightTheme), [colorScheme]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
      NavigationBar.setButtonStyleAsync(
        colorScheme === 'dark' ? 'light' : 'dark'
      );
    }
  }, [theme, colorScheme]);

  if (!fontsLoaded) {
    return null; // Wait for fonts to load
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <ThemedView style={{ flex: 1 }}>
          <Stack>
            {/* Index screen */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Welcome screens */}
            <Stack.Screen name="welcome/screen1" options={{ headerShown: false }} />
            <Stack.Screen name="welcome/screen2" options={{ headerShown: false }} />

            {/* Auth screens */}
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
            <Stack.Screen name="register/index" options={{ headerShown: false }} />

            {/* Settings screens */}
            <Stack.Screen name="profile/index" options={{ headerShown: false }} />

            {/* Not found screen */}
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemedView>
        <StatusBar style="auto" />
      </PaperProvider>
    </QueryClientProvider>
  );
}
