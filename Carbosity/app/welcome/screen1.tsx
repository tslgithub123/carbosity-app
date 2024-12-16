import { View, Text, Button, StyleSheet, Switch } from "react-native";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Screen 1!</Text>
      <IconButton icon="arrow-right" onPress={() => router.push("/welcome/screen2")} />
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
