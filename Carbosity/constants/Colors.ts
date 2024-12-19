/**
 * Colors used throughout the app for light and dark modes.
 * You can also explore libraries like [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), or [Unistyles](https://reactnativeunistyles.vercel.app) for advanced theming.
 */

const tintColorLight = '#0a7ea4'; // Primary color for light mode
const tintColorDark = '#fff'; // Primary color for dark mode

export const Colors = {
  light: {
    text: '#11181C', // Default text color
    background: '#fff', // Background color for screens
    card: '#f8f8f8', // Tab bar and header background
    tint: tintColorLight, // Highlight color (e.g., active icons)
    icon: '#687076', // Default icon color
    tabIconDefault: '#687076', // Default tab icon color
    tabIconSelected: tintColorLight, // Focused tab icon color
    focusedIcon: '#6200ee'
  },
  dark: {
    text: '#ECEDEE', // Default text color
    background: '#151718', // Background color for screens
    card: '#121212', // Tab bar and header background
    tint: tintColorDark, // Highlight color (e.g., active icons)
    icon: '#9BA1A6', // Default icon color
    tabIconDefault: '#9BA1A6', // Default tab icon color
    tabIconSelected: tintColorDark, // Focused tab icon color
    focusedIcon: '#e5e536'
  },
};
