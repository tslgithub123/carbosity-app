import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export default function WelcomeScreen2() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const {setIsWelcomed} = useAuthStore();

  useEffect(() => {
    if (!user) {
      console.log('User not in store');
    } else {
      console.log('User: ', user);
    }
  }, [user, setUser]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Welcome to Screen 2!</ThemedText>
      <Button title="Next" onPress={() => {router.replace("/login")}} />
    </ThemedView>
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
