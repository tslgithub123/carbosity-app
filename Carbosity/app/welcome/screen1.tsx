import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function WelcomeScreen1() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  async function fetchUser() {
    try {
      const response = await fetch('http://192.168.1.47:8085/api/auth/test', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Log the raw response text
      const text = await response.text();
      console.log('Raw response:', text);
      
      // Try parsing the text manually
      const data = text;
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: 3, // Will retry failed requests 3 times
  });

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {isLoading ? (
        <ThemedText style={styles.text}>Loading...</ThemedText>
      ) : (
        <ThemedText style={styles.text}>
          {response }
        </ThemedText>
      )}
      <Button title="Next" onPress={() => router.replace("/welcome/screen2")} />
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
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
});