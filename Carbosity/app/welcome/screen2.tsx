import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Screen 2!</Text>
      <Button title="Next" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
