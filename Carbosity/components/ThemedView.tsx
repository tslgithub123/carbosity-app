import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialTheme } from '@/constants/MaterialTheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor || MaterialTheme.schemes.light.background, dark: darkColor || MaterialTheme.schemes.dark.background },
    'background'
  );

  return <View style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
}
